/**
 * student.ts — Route tạo student profile (Onboarding)
 * POST /api/student/profile → tạo student_profiles + student_stats
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
    displayName: string;
    avatarId: string;
    theme: string;
  }>();

  const displayName = body.displayName?.trim();
  if (!displayName || displayName.length < 2) {
    return c.json({ error: "Tên bé không hợp lệ" }, 400);
  }

  const validAvatars = ["cat","dog","rabbit","bear","fox","penguin","owl","elephant","lion","duck","frog","panda"];
  const avatarId = validAvatars.includes(body.avatarId) ? body.avatarId : "cat";

  const validThemes = ["purple","ocean","sakura","forest","night","sunset"];
  const theme = validThemes.includes(body.theme) ? body.theme : "purple";

  // Check nếu đã có profile rồi
  const existing = await c.env.DB.prepare(
    "SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1"
  ).bind(userId).first<{ id: string }>();

  if (existing) {
    return c.json({ error: "Hồ sơ đã tồn tại" }, 409);
  }

  // Tạo profile
  const profileId = crypto.randomUUID();

  await c.env.DB.prepare(
    `INSERT INTO student_profiles (id, user_id, display_name, avatar_id, theme)
     VALUES (?, ?, ?, ?, ?)`
  ).bind(profileId, userId, displayName, avatarId, theme).run();

  // Tạo student_stats trống
  await c.env.DB.prepare(
    `INSERT INTO student_stats (student_id) VALUES (?)`
  ).bind(profileId).run();

  return c.json({ ok: true, profileId });
});
