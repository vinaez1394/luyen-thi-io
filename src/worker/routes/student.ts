/**
 * student.ts — Routes cho student (Onboarding + Stars)
 * POST /api/student/profile → tạo student_profiles + student_stats
 * POST /api/student/stars   → cộng dồn sao sau khi chơi Hangman (Phase 05)
 * Phase 04: thêm currentGrade + selectedPathway
 */

import { Hono } from "hono";
import { getSession, getSessionTokenFromCookie } from "../lib/session";

type Env = {
  DB: D1Database;
  SESSION: KVNamespace;
};

export const studentRoute = new Hono<{ Bindings: Env }>();

// =============================================
// POST /api/student/profile — Tạo hồ sơ bé
// =============================================
studentRoute.post("/profile", async (c) => {
  // Auth check
  const cookieHeader = c.req.header("Cookie") ?? null;
  const token = getSessionTokenFromCookie(cookieHeader);
  if (!token) return c.json({ error: "Chưa đăng nhập" }, 401);

  const userId = await getSession(c.env.SESSION, token);
  if (!userId) return c.json({ error: "Session hết hạn, vui lòng đăng nhập lại" }, 401);

  // Parse body
  const body = await c.req.json<{
    displayName:      string;
    avatarId:         string;
    theme:            string;
    currentGrade?:    number | null;    // Phase 04: lớp bé đang học (3,4,5)
    selectedPathway?: string | null;    // Phase 04: "cambridge" | "lop6"
  }>();

  const displayName = body.displayName?.trim();
  if (!displayName || displayName.length < 2) {
    return c.json({ error: "Tên bé không hợp lệ" }, 400);
  }

  const validAvatars = ["cat","dog","rabbit","bear","fox","penguin","owl","elephant","lion","duck","frog","panda"];
  const avatarId = validAvatars.includes(body.avatarId) ? body.avatarId : "cat";

  const validThemes = ["purple","ocean","sakura","forest","night","sunset"];
  const theme = validThemes.includes(body.theme) ? body.theme : "purple";

  // Validate currentGrade: chỉ chấp nhận 3, 4, 5
  const validGrades = [3, 4, 5];
  const currentGrade: number | null = body.currentGrade && validGrades.includes(body.currentGrade)
    ? body.currentGrade
    : null;

  // Validate selectedPathway
  const validPathways = ["cambridge", "lop6"];
  const selectedPathway: string | null = body.selectedPathway && validPathways.includes(body.selectedPathway)
    ? body.selectedPathway
    : null;

  // Check nếu đã có profile rồi
  const existing = await c.env.DB.prepare(
    "SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1"
  ).bind(userId).first<{ id: string }>();

  if (existing) {
    return c.json({ error: "Hồ sơ đã tồn tại" }, 409);
  }

  // Tạo profile (kể cả 2 field mới)
  const profileId = crypto.randomUUID();

  await c.env.DB.prepare(
    `INSERT INTO student_profiles (id, user_id, display_name, avatar_id, theme, current_grade, selected_pathway)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(profileId, userId, displayName, avatarId, theme, currentGrade, selectedPathway).run();

  // Tạo student_stats trống
  await c.env.DB.prepare(
    `INSERT INTO student_stats (student_id) VALUES (?)`
  ).bind(profileId).run();

  return c.json({ ok: true, profileId });
});

// =============================================
// PATCH /api/student/profile — Cập nhật hồ sơ bé
// Cho phép update: display_name, avatar_id, current_grade, selected_pathway
// =============================================
studentRoute.patch("/profile", async (c) => {
  const cookieHeader = c.req.header("Cookie") ?? null;
  const token = getSessionTokenFromCookie(cookieHeader);
  if (!token) return c.json({ error: "Chưa đăng nhập" }, 401);

  const userId = await getSession(c.env.SESSION, token);
  if (!userId) return c.json({ error: "Session hết hạn" }, 401);

  const body = await c.req.json<{
    displayName?:     string;
    avatarId?:        string;
    currentGrade?:    number | null;
    selectedPathway?: string | null;
  }>();

  const profile = await c.env.DB.prepare(
    "SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1"
  ).bind(userId).first<{ id: string }>();

  if (!profile) return c.json({ error: "Chưa có hồ sơ" }, 404);

  const updates: string[] = [];
  const bindings: (string | number | null)[] = [];

  if (body.displayName !== undefined) {
    const name = (body.displayName ?? "").trim();
    if (name.length < 2) return c.json({ error: "Tên bé cần ít nhất 2 ký tự" }, 400);
    updates.push("display_name = ?"); bindings.push(name);
  }
  if (body.avatarId !== undefined) {
    const valid = ["cat","dog","rabbit","bear","fox","penguin","owl","elephant","lion","duck","frog","panda"];
    updates.push("avatar_id = ?"); bindings.push(valid.includes(body.avatarId) ? body.avatarId : "cat");
  }
  if (body.currentGrade !== undefined) {
    const g = [3,4,5].includes(body.currentGrade as number) ? body.currentGrade : null;
    updates.push("current_grade = ?"); bindings.push(g);
  }
  if (body.selectedPathway !== undefined) {
    const p = ["cambridge","lop6"].includes(body.selectedPathway as string) ? body.selectedPathway : null;
    updates.push("selected_pathway = ?"); bindings.push(p);
  }

  if (updates.length === 0) return c.json({ error: "Không có gì để cập nhật" }, 400);

  bindings.push(profile.id);
  await c.env.DB.prepare(
    `UPDATE student_profiles SET ${updates.join(", ")} WHERE id = ?`
  ).bind(...bindings).run();

  return c.json({ ok: true });
});

// =============================================
// GET /api/student/dashboard — Lấy data cho DashboardPage
// Trả về: currentGrade, selectedPathway, streak, totalStars, skillLevels, dreamGoal
// =============================================
studentRoute.get("/dashboard", async (c) => {
  // Auth check
  const cookieHeader = c.req.header("Cookie") ?? null;
  const token = getSessionTokenFromCookie(cookieHeader);
  if (!token) return c.json({ error: "Chưa đăng nhập" }, 401);

  const userId = await getSession(c.env.SESSION, token);
  if (!userId) return c.json({ error: "Session hết hạn" }, 401);

  // Query profile + stats (JOIN)
  const row = await c.env.DB.prepare(`
    SELECT
      sp.id            AS profileId,
      sp.display_name  AS displayName,
      sp.avatar_id     AS avatarId,
      sp.theme,
      sp.current_grade AS currentGrade,
      sp.selected_pathway AS selectedPathway,
      ss.total_stars   AS totalStars,
      ss.current_streak AS streak,
      ss.lvl_listening_p1, ss.lvl_listening_p2,
      ss.lvl_reading_p1,   ss.lvl_reading_p2,
      ss.lvl_writing_p1,
      ss.last_quiz_id  AS lastQuizId
    FROM student_profiles sp
    LEFT JOIN student_stats ss ON ss.student_id = sp.id
    WHERE sp.user_id = ?
    LIMIT 1
  `).bind(userId).first<{
    profileId:        string;
    displayName:      string;
    avatarId:         string;
    theme:            string;
    currentGrade:     number | null;
    selectedPathway:  string | null;
    totalStars:       number;
    streak:           number;
    lvl_listening_p1: number;
    lvl_listening_p2: number;
    lvl_reading_p1:   number;
    lvl_reading_p2:   number;
    lvl_writing_p1:   number;
    lastQuizId:       string | null;
  }>();

  if (!row) return c.json({ error: "Chưa có hồ sơ" }, 404);

  // Skill levels (từ các cột lvl_*)
  const skillLevels = [
    { skill: "listening", level: Math.round((row.lvl_listening_p1 + row.lvl_listening_p2) / 2), quizzesDone: 0 },
    { skill: "reading",   level: Math.round((row.lvl_reading_p1   + row.lvl_reading_p2)   / 2), quizzesDone: 0 },
    { skill: "writing",   level: row.lvl_writing_p1 ?? 0, quizzesDone: 0 },
  ];

  // Dream goal (lấy goal đang active)
  const goal = await c.env.DB.prepare(`
    SELECT exam_id, reward_label, goal_target, current_progress
    FROM dream_goals
    WHERE student_id = ? AND status = 'approved'
    ORDER BY created_at DESC
    LIMIT 1
  `).bind(row.profileId).first<{
    exam_id:          string;
    reward_label:     string;
    goal_target:      number;
    current_progress: number;
  }>();

  const EXAM_EMOJI: Record<string, string> = {
    flyers:  "🦋",
    movers:  "🐿️",
    starters:"🌟",
    ket:     "🎓",
    lop6:    "🏫",
  };

  const dreamGoal = goal ? {
    title:   goal.reward_label,
    emoji:   EXAM_EMOJI[goal.exam_id] ?? "🎯",
    current: goal.current_progress,
    target:  goal.goal_target,
  } : null;

  return c.json({
    currentGrade:    row.currentGrade,
    selectedPathway: row.selectedPathway,
    streak:          row.streak ?? 0,
    totalStars:      row.totalStars ?? 0,
    skillLevels,
    dreamGoal,
    todayLessons:    [],   // Phase future — hiện trả về rỗng
  });
});


// POST /api/student/stars — Cộng sao từ Hangman hoặc Flashcard
// =============================================
studentRoute.post("/stars", async (c) => {
  // Auth check
  const cookieHeader = c.req.header("Cookie") ?? null;
  const token = getSessionTokenFromCookie(cookieHeader);
  if (!token) return c.json({ error: "Chưa đăng nhập" }, 401);

  const userId = await getSession(c.env.SESSION, token);
  if (!userId) return c.json({ error: "Session hết hạn" }, 401);

  // Parse body
  const body = await c.req.json<{
    stars:   number;
    source:  string;
    quiz_id: string;
  }>();

  // Validate stars
  const stars = Math.floor(body.stars ?? 0);
  if (stars < 1 || stars > 2) {
    return c.json({ error: "Số sao không hợp lệ (1–2)" }, 400);
  }

  // Validate source — cho phép hangman, flashcard
  const VALID_SOURCES = ["hangman", "flashcard"];
  if (!VALID_SOURCES.includes(body.source)) {
    return c.json({ error: "Source không hợp lệ" }, 400);
  }

  // Lấy student profile
  const profile = await c.env.DB.prepare(
    "SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1"
  ).bind(userId).first<{ id: string }>();

  if (!profile) return c.json({ error: "Chưa có hồ sơ" }, 404);

  const studentId = profile.id;
  const today = new Date().toISOString().slice(0, 10);

  // 1. Cộng dồn sao vào student_stats (đúng bảng)
  await c.env.DB.prepare(
    `UPDATE student_stats SET total_stars = COALESCE(total_stars, 0) + ? WHERE student_id = ?`
  ).bind(stars, studentId).run();

  // 2. Lưu last_quiz_id vào student_stats (cho HomeHangman)
  const quizId = (body.quiz_id ?? "").trim().slice(0, 64);
  if (quizId) {
    await c.env.DB.prepare(
      `UPDATE student_stats SET last_quiz_id = ? WHERE student_id = ?`
    ).bind(quizId, studentId).run();
  }

  // 3. Cập nhật daily_activity (upsert)
  await c.env.DB.prepare(
    `INSERT INTO daily_activity (student_id, date_key, sessions, stars)
     VALUES (?, ?, 1, ?)
     ON CONFLICT(student_id, date_key) DO UPDATE SET
       sessions = sessions + 1,
       stars = stars + excluded.stars`
  ).bind(studentId, today, stars).run();

  // 4. Tính lại streak
  const activityRows = await c.env.DB.prepare(
    `SELECT date_key FROM daily_activity WHERE student_id = ? ORDER BY date_key DESC`
  ).bind(studentId).all<{ date_key: string }>();

  const dates = activityRows.results.map((r) => r.date_key);
  let streak = 0;
  const cursor = new Date(today);
  for (const d of dates) {
    const expected = cursor.toISOString().slice(0, 10);
    if (d === expected) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  await c.env.DB.prepare(
    `UPDATE student_stats SET current_streak = ?, longest_streak = MAX(longest_streak, ?) WHERE student_id = ?`
  ).bind(streak, streak, studentId).run();

  return c.json({ ok: true, starsAdded: stars });
});
