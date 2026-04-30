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
// POST /api/student/stars — Cộng sao Hangman
// Phase 05: gọi từ QuizPage sau onHangmanStarsEarned
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

  // Validate
  const stars = Math.floor(body.stars ?? 0);
  if (stars < 1 || stars > 2) {
    return c.json({ error: "Số sao không hợp lệ (1–2)" }, 400);
  }
  if (body.source !== "hangman") {
    return c.json({ error: "Source không hợp lệ" }, 400);
  }

  // Lấy student profile
  const profile = await c.env.DB.prepare(
    "SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1"
  ).bind(userId).first<{ id: string }>();

  if (!profile) return c.json({ error: "Chưa có hồ sơ" }, 404);

  // Cộng dồn sao vào student_profiles (total_stars)
  await c.env.DB.prepare(
    `UPDATE student_profiles SET total_stars = COALESCE(total_stars, 0) + ? WHERE id = ?`
  ).bind(stars, profile.id).run();

  // Lưu last_quiz_id vào student_stats (cho HomeHangman)
  const quizId = (body.quiz_id ?? "").trim().slice(0, 64);
  if (quizId) {
    await c.env.DB.prepare(
      `UPDATE student_stats SET last_quiz_id = ? WHERE student_id = ?`
    ).bind(quizId, profile.id).run();
  }

  return c.json({ ok: true, starsAdded: stars });
});
