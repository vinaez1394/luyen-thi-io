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
  env: Env;
}

export async function updateStarsAfterQuiz(params: StarsUpdateParams) {
  const {
    studentId, starsEarned, quizId, skill, partNumber,
    score, maxScore, timeSpent, answersJson, env,
  } = params;

  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // 1. Lưu quiz_attempts
  await env.DB.prepare(
    `INSERT INTO quiz_attempts
     (id, student_id, quiz_id, skill, part_number, score, max_score, stars_earned, answers_json, time_spent, completed_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, unixepoch())`
  ).bind(
    crypto.randomUUID(), studentId, quizId, skill, partNumber,
    score, maxScore, starsEarned, answersJson, timeSpent
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
}
