/**
 * stars.ts — Cập nhật sao trong D1 sau khi nộp bài
 */

type Env = { DB: D1Database };

interface StarsUpdateParams {
  studentId: string;
  starsEarned: number;
  quizId: string;
  skill: string;
  partNumber: number;
  score: number;
  maxScore: number;
  timeSpent: number;
  answersJson: string;
  pathway: string | null;   // 'lop6' | 'cambridge' | null
  subject: string | null;   // 'toan' | 'tieng-anh' | 'reading' | ...
  isFree: number;           // 1 = free, 0 = premium
  env: Env;
}

export async function updateStarsAfterQuiz(params: StarsUpdateParams) {
  const {
    studentId, starsEarned, quizId, skill, partNumber,
    score, maxScore, timeSpent, answersJson, pathway, subject, isFree, env,
  } = params;

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // 1. Lưu quiz_attempts (bao gồm metadata mới: pathway, subject, is_free)
  await env.DB.prepare(
    `INSERT INTO quiz_attempts
     (id, student_id, quiz_id, skill, part_number, score, max_score, stars_earned,
      answers_json, time_spent, pathway, subject, is_free, completed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, unixepoch())`
  ).bind(
    crypto.randomUUID(), studentId, quizId, skill, partNumber,
    score, maxScore, starsEarned, answersJson, timeSpent,
    pathway, subject, isFree
  ).run();

  // 2. Cập nhật student_stats (total_stars)
  await env.DB.prepare(
    `UPDATE student_stats SET total_stars = total_stars + ? WHERE student_id = ?`
  ).bind(starsEarned, studentId).run();

  // 3. Cập nhật daily_activity (upsert)
  await env.DB.prepare(
    `INSERT INTO daily_activity (student_id, date_key, sessions, stars)
     VALUES (?, ?, 1, ?)
     ON CONFLICT(student_id, date_key) DO UPDATE SET
       sessions = sessions + 1,
       stars = stars + excluded.stars`
  ).bind(studentId, today, starsEarned).run();

  // 4. Cập nhật dream_goals nếu có goal stars
  await env.DB.prepare(
    `UPDATE dream_goals
     SET current_progress = current_progress + ?
     WHERE student_id = ? AND goal_type = 'stars' AND status = 'approved'`
  ).bind(starsEarned, studentId).run();

  // 5. Tính lại streak — đếm số ngày liên tiếp tính đến hôm nay
  // Lấy tất cả date_key có hoạt động của student, sắp xếp mới nhất trước
  const activityRows = await env.DB.prepare(
    `SELECT date_key FROM daily_activity
     WHERE student_id = ?
     ORDER BY date_key DESC`
  ).bind(studentId).all<{ date_key: string }>();

  const dates = activityRows.results.map((r) => r.date_key);

  // Đếm streak: bắt đầu từ hôm nay, kiểm tra từng ngày liên tiếp
  let streak = 0;
  const cursor = new Date(today);
  for (const d of dates) {
    const expected = cursor.toISOString().slice(0, 10);
    if (d === expected) {
      streak++;
      cursor.setDate(cursor.getDate() - 1); // lùi 1 ngày
    } else {
      break; // chuỗi bị đứt
    }
  }

  // Cập nhật current_streak và longest_streak (nếu đang phá kỷ lục)
  await env.DB.prepare(
    `UPDATE student_stats
     SET
       current_streak = ?,
       longest_streak = MAX(longest_streak, ?)
     WHERE student_id = ?`
  ).bind(streak, streak, studentId).run();
}
