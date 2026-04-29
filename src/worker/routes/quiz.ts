/**
 * quiz.ts — Route lấy và nộp bài quiz
 *
 * GET  /api/quiz/:quizId          → Lấy đề bài (check free/premium)
 * POST /api/quiz/:quizId/submit   → Nộp bài (guest OK, chỉ lưu nếu đã login)
 */

import { Hono } from "hono";
import { getSession } from "../lib/session";
import { gradeQuiz, calcPercentage, calcStars } from "../lib/scoring";
import { updateStarsAfterQuiz } from "../lib/stars";

// Static content map dùng cho local dev (khi chưa có R2)
// Production: dùng R2 bucket CONTENT
const LOCAL_QUIZ_MAP: Record<string, object> = {};

// Dynamic import trong dev mode (Vite tree-shakes trong production)
// ⚠️ MỖI KHI THÊM BÀI MỚI → thêm import tương ứng vào đây
try {
  const mathL1P1 = await import("../../../content/math/MATH-L1-P1.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["MATH-L1-P1"] = mathL1P1.default;
} catch { /* Production: dùng R2 */ }

try {
  const mathL1P2 = await import("../../../content/math/MATH-L1-P2.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["MATH-L1-P2"] = mathL1P2.default;
} catch { /* Production: dùng R2 */ }

try {
  const mathL1P3 = await import("../../../content/math/MATH-L1-P3.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["MATH-L1-P3"] = mathL1P3.default;
} catch { /* Production: dùng R2 */ }

try {
  const mathL1P5 = await import("../../../content/math/MATH-L1-P5.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["MATH-L1-P5"] = mathL1P5.default;
} catch { /* Production: dùng R2 */ }

try {
  const mathL1P6 = await import("../../../content/math/MATH-L1-P6.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["MATH-L1-P6"] = mathL1P6.default;
} catch { /* Production: dùng R2 */ }

try {
  const mathL1P7 = await import("../../../content/math/MATH-L1-P7.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["MATH-L1-P7"] = mathL1P7.default;
} catch { /* Production: dùng R2 */ }

try {
  const mathL1P8 = await import("../../../content/math/MATH-L1-P8.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["MATH-L1-P8"] = mathL1P8.default;
} catch { /* Production: dùng R2 */ }

try {
  const mathL1P9 = await import("../../../content/math/MATH-L1-P9.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["MATH-L1-P9"] = mathL1P9.default;
} catch { /* Production: dùng R2 */ }

try {
  const mathL1P10 = await import("../../../content/math/MATH-L1-P10.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["MATH-L1-P10"] = mathL1P10.default;
} catch { /* Production: dùng R2 */ }

try {
  const rw001 = await import("../../../content/flyers/RW001.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["RW001"] = rw001.default;
} catch { /* Production: dùng R2 */ }

type Env = {
  DB: D1Database;
  SESSION: KVNamespace;
  CONTENT?: R2Bucket; // R2 binding tên "CONTENT" theo wrangler.json
};

export const quizRoute = new Hono<{ Bindings: Env }>();

// ============================================
// Helper: Lấy session nếu có (không bắt buộc)
// ============================================
async function getOptionalSession(
  cookieHeader: string | null,
  env: Env
): Promise<string | null> {
  if (!cookieHeader) return null;
  const token = cookieHeader
    .split(";")
    .find((c) => c.trim().startsWith("session="))
    ?.split("=")[1]
    ?.trim();
  if (!token) return null;
  return getSession(env.SESSION, token);
}

// ============================================
// Helper: Load quiz JSON (từ R2 hoặc fallback static)
// ============================================
async function loadQuizJson(quizId: string, env: Env): Promise<object | null> {
  // Production: load từ R2 bucket CONTENT
  if (env.CONTENT) {
    const obj = await env.CONTENT.get(`quizzes/${quizId}.json`);
    if (obj) {
      const text = await obj.text();
      return JSON.parse(text);
    }
  }

  // Local dev fallback: dùng static import
  if (LOCAL_QUIZ_MAP[quizId]) {
    return LOCAL_QUIZ_MAP[quizId];
  }

  return null;
}

// ============================================
// GET /api/quiz/:quizId
// ============================================
quizRoute.get("/:quizId", async (c) => {
  const quizId = c.req.param("quizId");

  // Check quiz config (is_free)
  // try/catch: nếu bảng quiz_configs chưa tồn tại (local dev) → mặc định free
  let isFree = true;
  let isPublished = true;
  try {
    const config = await c.env.DB.prepare(
      "SELECT is_free, is_published FROM quiz_configs WHERE quiz_id = ? LIMIT 1"
    ).bind(quizId).first<{ is_free: number; is_published: number }>();

    if (config !== null) {
      isFree = config.is_free === 1;
      isPublished = config.is_published === 1;
    }
    // config === null → bài chưa cấu hình → coi là free + published (dev mode)
  } catch {
    // Bảng quiz_configs chưa migrate → local dev, bỏ qua check
    isFree = true;
    isPublished = true;
  }

  if (!isPublished) {
    return c.json({ error: "Bài này chưa được phát hành" }, 404);
  }

  // Nếu premium → check login
  if (!isFree) {
    const userId = await getOptionalSession(c.req.header("Cookie") ?? null, c.env);
    if (!userId) {
      return c.json(
        { error: "premium", message: "Bài này dành cho thành viên. Vui lòng đăng nhập!", loginUrl: "/login" },
        403
      );
    }
  }

  // Load quiz content
  const quizData = await loadQuizJson(quizId, c.env);
  if (!quizData) {
    return c.json({ error: "Không tìm thấy bài học này" }, 404);
  }

  return c.json(quizData);
});


// ============================================
// POST /api/quiz/:quizId/submit
// ============================================
quizRoute.post("/:quizId/submit", async (c) => {
  const quizId = c.req.param("quizId");

  // Parse body
  const body = await c.req.json<{
    answers: Record<string, string | string[]>;
    timeSpent: number;
  }>();

  // Load quiz để chấm điểm
  const quizData = await loadQuizJson(quizId, c.env) as {
    questions: Array<{ id: string; correct: string | string[] }>;
    skill: string;
    part: number;
  } | null;

  if (!quizData) {
    return c.json({ error: "Không tìm thấy bài học" }, 404);
  }

  // Chấm điểm
  const { correctCount, correctAnswers } = gradeQuiz(quizData.questions, body.answers);
  const total = quizData.questions.length;
  const percentage = calcPercentage(correctCount, total);
  const starsEarned = calcStars(percentage);

  // Check session (optional)
  const userId = await getOptionalSession(c.req.header("Cookie") ?? null, c.env);

  // Lưu vào DB chỉ khi đã login
  let saved = false;
  if (userId) {
    // Lấy studentId từ user
    const profile = await c.env.DB.prepare(
      "SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1"
    ).bind(userId).first<{ id: string }>();

    if (profile) {
      await updateStarsAfterQuiz({
        studentId: profile.id,
        starsEarned,
        quizId,
        skill: quizData.skill,
        partNumber: quizData.part,
        score: correctCount,
        maxScore: total,
        timeSpent: body.timeSpent ?? 0,
        answersJson: JSON.stringify(body.answers),
        env: c.env,
      });
      saved = true;
    }
  }

  return c.json({
    ok: true,
    saved,
    score: correctCount,
    maxScore: total,
    percentage,
    starsEarned,
    correctAnswers,
  });
});
