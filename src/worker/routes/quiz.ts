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
  const d = await import("../../../content/lop6/toan/toan-tu-duy-logic/MATH-THINKING-GRADE3-L1-P1.json", { assert: { type: "json" } });
  LOCAL_QUIZ_MAP["MATH-THINKING-GRADE3-L1-P1"] = d.default;
} catch { /* Production: dùng R2 */ }

try {
  const d = await import("../../../content/lop6/toan/toan-tu-duy-logic/MATH-THINKING-GRADE3-L1-P2.json", { assert: { type: "json" } });
  LOCAL_QUIZ_MAP["MATH-THINKING-GRADE3-L1-P2"] = d.default;
} catch { /* Production: dùng R2 */ }

try {
  const d = await import("../../../content/lop6/toan/toan-tu-duy-logic/MATH-THINKING-GRADE3-L1-P3.json", { assert: { type: "json" } });
  LOCAL_QUIZ_MAP["MATH-THINKING-GRADE3-L1-P3"] = d.default;
} catch { /* Production: dùng R2 */ }

try {
  const d = await import("../../../content/lop6/toan/toan-tu-duy-logic/MATH-THINKING-GRADE3-L1-P4.json", { assert: { type: "json" } });
  LOCAL_QUIZ_MAP["MATH-THINKING-GRADE3-L1-P4"] = d.default;
} catch { /* Production: dùng R2 */ }

try {
  const d = await import("../../../content/lop6/toan/toan-tu-duy-logic/MATH-THINKING-GRADE3-L1-P5.json", { assert: { type: "json" } });
  LOCAL_QUIZ_MAP["MATH-THINKING-GRADE3-L1-P5"] = d.default;
} catch { /* Production: dùng R2 */ }

try {
  const d = await import("../../../content/lop6/toan/toan-tu-duy-logic/MATH-THINKING-GRADE3-L1-P6.json", { assert: { type: "json" } });
  LOCAL_QUIZ_MAP["MATH-THINKING-GRADE3-L1-P6"] = d.default;
} catch { /* Production: dùng R2 */ }

try {
  const d = await import("../../../content/lop6/toan/toan-tu-duy-logic/MATH-THINKING-GRADE3-L1-P7.json", { assert: { type: "json" } });
  LOCAL_QUIZ_MAP["MATH-THINKING-GRADE3-L1-P7"] = d.default;
} catch { /* Production: dùng R2 */ }

try {
  const d = await import("../../../content/lop6/toan/toan-tu-duy-logic/MATH-THINKING-GRADE3-L1-P8.json", { assert: { type: "json" } });
  LOCAL_QUIZ_MAP["MATH-THINKING-GRADE3-L1-P8"] = d.default;
} catch { /* Production: dùng R2 */ }

try {
  const d = await import("../../../content/lop6/toan/toan-tu-duy-logic/MATH-THINKING-GRADE3-L1-P9.json", { assert: { type: "json" } });
  LOCAL_QUIZ_MAP["MATH-THINKING-GRADE3-L1-P9"] = d.default;
} catch { /* Production: dùng R2 */ }

try {
  const d = await import("../../../content/lop6/toan/toan-tu-duy-logic/MATH-THINKING-GRADE3-L1-P10.json", { assert: { type: "json" } });
  LOCAL_QUIZ_MAP["MATH-THINKING-GRADE3-L1-P10"] = d.default;
} catch { /* Production: dùng R2 */ }

try {
  const rw001 = await import("../../../content/Cambridge/flyers/RW001.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["RW001"] = rw001.default;
} catch { /* Production: dùng R2 */ }

// ⚠️ READING PASSAGE — Lớp 6 Tiếng Anh (Phase Reading)
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-EASY-GRADE3-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-EASY-GRADE3-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-EASY-GRADE4-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-EASY-GRADE4-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-EASY-GRADE5-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-EASY-GRADE5-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-MED-GRADE3-P1.json",  { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-MED-GRADE3-P1"]  = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-MED-GRADE4-P1.json",  { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-MED-GRADE4-P1"]  = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-MED-GRADE5-P1.json",  { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-MED-GRADE5-P1"]  = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-HARD-GRADE3-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-HARD-GRADE3-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-HARD-GRADE4-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-HARD-GRADE4-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-HARD-GRADE5-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-HARD-GRADE5-P1"] = d.default; } catch { /* R2 */ }
// ── Reading Passage P2 ──
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-EASY-GRADE3-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-EASY-GRADE3-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-EASY-GRADE4-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-EASY-GRADE4-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-EASY-GRADE5-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-EASY-GRADE5-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-MED-GRADE3-P2.json",  { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-MED-GRADE3-P2"]  = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-MED-GRADE4-P2.json",  { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-MED-GRADE4-P2"]  = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-MED-GRADE5-P2.json",  { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-MED-GRADE5-P2"]  = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-HARD-GRADE3-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-HARD-GRADE3-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-HARD-GRADE4-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-HARD-GRADE4-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/reading/READING-HARD-GRADE5-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["READING-HARD-GRADE5-P2"] = d.default; } catch { /* R2 */ }

// ⚠️ WRITING — Lớp 6 Tiếng Anh (Phase Writing — 9 bài)
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-HARD-GRADE3-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-HARD-GRADE3-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-HARD-GRADE3-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-HARD-GRADE3-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-HARD-GRADE3-P3.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-HARD-GRADE3-P3"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-HARD-GRADE4-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-HARD-GRADE4-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-HARD-GRADE4-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-HARD-GRADE4-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-HARD-GRADE4-P3.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-HARD-GRADE4-P3"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-HARD-GRADE5-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-HARD-GRADE5-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-HARD-GRADE5-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-HARD-GRADE5-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-HARD-GRADE5-P3.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-HARD-GRADE5-P3"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-MED-GRADE4-P1.json",  { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-MED-GRADE4-P1"]  = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-MED-GRADE4-P2.json",  { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-MED-GRADE4-P2"]  = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-MED-GRADE4-P3.json",  { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-MED-GRADE4-P3"]  = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-EASY-GRADE3-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-EASY-GRADE3-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-EASY-GRADE3-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-EASY-GRADE3-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-EASY-GRADE3-P3.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-EASY-GRADE3-P3"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-EASY-GRADE4-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-EASY-GRADE4-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-EASY-GRADE4-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-EASY-GRADE4-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-EASY-GRADE4-P3.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-EASY-GRADE4-P3"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-EASY-GRADE5-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-EASY-GRADE5-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-EASY-GRADE5-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-EASY-GRADE5-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-EASY-GRADE5-P3.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-EASY-GRADE5-P3"] = d.default; } catch { /* R2 */ }

try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-MED-GRADE3-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-MED-GRADE3-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-MED-GRADE3-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-MED-GRADE3-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-MED-GRADE3-P3.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-MED-GRADE3-P3"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-MED-GRADE5-P1.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-MED-GRADE5-P1"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-MED-GRADE5-P2.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-MED-GRADE5-P2"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/lop6/tieng-anh/writing/WRITING-MED-GRADE5-P3.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["WRITING-MED-GRADE5-P3"] = d.default; } catch { /* R2 */ }

type Env = {
  DB: D1Database;
  SESSION: KVNamespace;
  CONTENT?: R2Bucket; // R2 binding tên "CONTENT" theo wrangler.json
};

/**
 * Ánh xạ quiz ID → đúng đường dẫn trong R2 — theo đúng SITEMAP
 *
 * cấu trúc: quizzes/<pathway>/<group>/<id>.json
 *
 * Lớp 6 / Toán Tư Duy:        MATH-L1-P1   → quizzes/lop6/toan/MATH-L1-P1.json
 * Cambridge / Flyers / Reading: RW001        → quizzes/cambridge/flyers/reading/RW001.json
 * Cambridge / Flyers / Listening: L001       → quizzes/cambridge/flyers/listening/L001.json
 * Cambridge / Movers (tương lai): MOV-R001   → quizzes/cambridge/movers/reading/MOV-R001.json
 */
function getR2Key(quizId: string): string {
  // Lớp 6 — Toán Tư Duy (MATH-THINKING-GRADE3-L1-P1 …)
  if (/^MATH-THINKING-GRADE\d+-L\d+-P\d+$/.test(quizId)) {
    return `quizzes/lop6/toan/toan-tu-duy-logic/${quizId}.json`;
  }
  // Lớp 6 — Tiếng Anh Reading (READING-EASY-GRADE3-P1, READING-MED-GRADE4-P1, ...)
  if (/^READING-(EASY|MED|HARD)-GRADE\d+-P\d+$/.test(quizId)) {
    return `quizzes/lop6/tieng-anh/reading/${quizId}.json`;
  }
  // LỜp 6 — Tiếng Anh Writing (WRITING-EASY-GRADE3-P1, WRITING-MED-GRADE4-P1, ...)
  if (/^WRITING-(EASY|MED|HARD)-GRADE\d+-P\d+$/.test(quizId)) {
    return `quizzes/lop6/tieng-anh/writing/${quizId}.json`;
  }
  // Cambridge Flyers — Reading / Writing (RW001, RW2-001, RW3-001...)
  if (/^RW/.test(quizId)) {
    return `quizzes/cambridge/flyers/reading/${quizId}.json`;
  }
  // Cambridge Flyers — Listening (L001, L002, L003...)
  if (/^L\d{3}$/.test(quizId)) {
    return `quizzes/cambridge/flyers/listening/${quizId}.json`;
  }
  // Fallback — không nên xảy ra
  console.warn(`[quiz] Unknown quizId format: "${quizId}" — using flat path. Add rule to getR2Key().`);
  return `quizzes/${quizId}.json`;
}

/**
 * detectQuizMeta — Detect pathway, subject, is_free từ quiz ID
 *
 * Quiz ID patterns:
 *   MATH-L1-P1        → lop6 / toan
 *   READING-*-GRADE*  → lop6 / tieng-anh
 *   RW*, RW2-*, RW3-* → cambridge / reading
 *   L001-L003         → cambridge / listening
 *
 * is_free: tra cứu từ quiz_configs table (nếu không có → mặc định free=1)
 */
function detectQuizMeta(quizId: string): { pathway: string | null; subject: string | null } {
  // Lớp 6 — Toán Tư Duy
  if (/^MATH-THINKING-GRADE\d+-L\d+-P\d+$/i.test(quizId)) {
    return { pathway: "lop6", subject: "toan" };
  }
  // Lớp 6 — Tiếng Anh Reading
  if (/^READING-(EASY|MED|HARD)-GRADE\d+-P\d+$/i.test(quizId)) {
    return { pathway: "lop6", subject: "tieng-anh" };
  }
  // Lớp 6 — Tiếng Anh Writing
  if (/^WRITING-(EASY|MED|HARD)-GRADE\d+-P\d+$/i.test(quizId)) {
    return { pathway: "lop6", subject: "tieng-anh" };
  }
  // Cambridge — Reading/Writing (Flyers)
  if (/^RW/i.test(quizId)) {
    return { pathway: "cambridge", subject: "reading" };
  }
  // Cambridge — Listening (Flyers)
  if (/^L\d{3}$/i.test(quizId)) {
    return { pathway: "cambridge", subject: "listening" };
  }
  // Không xác định được
  return { pathway: null, subject: null };
}

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
  // Production: load từ R2 bucket CONTENT theo đúng hierarchy
  if (env.CONTENT) {
    const r2Key = getR2Key(quizId);
    const obj = await env.CONTENT.get(r2Key);
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
  // Quiz có 2 cấu trúc:
  //   A. { questions: [...] }           — Math / Cambridge Flyers cũ
  //   B. { sections: [{ questions: [...] }] } — Reading / Writing mới
  // Ta normalize về mảng questions phẳng trước khi chấm.
  const quizRaw = await loadQuizJson(quizId, c.env) as {
    questions?: Array<{ id: string; correct: string | string[] }>;
    sections?: Array<{ questions?: Array<{ id: string; correct: string | string[] }> }>;
    skill?: string;
    part?: number;
  } | null;

  if (!quizRaw) {
    return c.json({ error: "Không tìm thấy bài học" }, 404);
  }

  // Flatten questions từ cả 2 cấu trúc
  const questions: Array<{ id: string; correct: string | string[] }> = [
    ...(quizRaw.questions ?? []),
    ...(quizRaw.sections ?? []).flatMap(s => s.questions ?? []),
  ];

  if (questions.length === 0) {
    return c.json({ error: "Bài học không có câu hỏi" }, 422);
  }

  // Chấm điểm
  const { correctCount, correctAnswers } = gradeQuiz(questions, body.answers);
  const total = questions.length;
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
      // Detect metadata cho dashboard progress tracking
      const meta = detectQuizMeta(quizId);

      // is_free: tra cứu từ quiz_configs (fallback = 1 nếu chưa config)
      let quizIsFree = 1;
      try {
        const cfg = await c.env.DB.prepare(
          "SELECT is_free FROM quiz_configs WHERE quiz_id = ? LIMIT 1"
        ).bind(quizId).first<{ is_free: number }>();
        if (cfg !== null) quizIsFree = cfg.is_free;
      } catch { /* quiz_configs chưa migrate → mặc định free */ }

      await updateStarsAfterQuiz({
        studentId: profile.id,
        starsEarned,
        quizId,
        skill: quizRaw.skill ?? "reading",
        partNumber: quizRaw.part ?? 1,
        score: correctCount,
        maxScore: total,
        timeSpent: body.timeSpent ?? 0,
        answersJson: JSON.stringify(body.answers),
        pathway: meta.pathway,
        subject: meta.subject,
        isFree: quizIsFree,
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
