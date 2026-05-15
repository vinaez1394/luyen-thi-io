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

// ⚠️ CAMBRIDGE FLYERS Part 1 — Word Bank Engine (FW1-*)
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-EASY-001.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-EASY-001"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-EASY-002.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-EASY-002"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-EASY-003.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-EASY-003"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-EASY-004.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-EASY-004"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-MED-001.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-MED-001"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-MED-002.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-MED-002"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-MED-003.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-MED-003"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-MED-004.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-MED-004"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-MED-005.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-MED-005"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-HARD-001.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-HARD-001"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-HARD-002.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-HARD-002"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-HARD-003.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-HARD-003"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-HARD-004.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-HARD-004"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part1/FW1-HARD-005.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW1-HARD-005"] = d.default; } catch { /* R2 */ }

// ⚠️ CAMBRIDGE FLYERS Part 2 — Conversation Matching Engine (FW2-*)
try { const d = await import("../../../content/Cambridge/flyers/part2/FW2-EASY-001.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW2-EASY-001"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part2/FW2-EASY-002.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW2-EASY-002"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part2/FW2-EASY-003.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW2-EASY-003"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part2/FW2-EASY-004.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW2-EASY-004"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part2/FW2-EASY-005.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW2-EASY-005"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part2/FW2-MED-001.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW2-MED-001"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part2/FW2-MED-002.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW2-MED-002"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part2/FW2-MED-003.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW2-MED-003"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part2/FW2-MED-004.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW2-MED-004"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part2/FW2-MED-005.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW2-MED-005"] = d.default; } catch { /* R2 */ }

// ⚠️ CAMBRIDGE FLYERS Part 3 — Story Fill-in-Blank Engine (FW3-*)
try { const d = await import("../../../content/Cambridge/flyers/part3/FW3-MED-001.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW3-MED-001"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part3/FW3-MED-002.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW3-MED-002"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part3/FW3-MED-003.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW3-MED-003"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part3/FW3-MED-004.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW3-MED-004"] = d.default; } catch { /* R2 */ }

// ⚠️ CAMBRIDGE FLYERS Part 4 — Multiple-Choice Cloze Engine (FW4-*)
try { const d = await import("../../../content/Cambridge/flyers/part4/FW4-MED-001.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW4-MED-001"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part4/FW4-MED-002.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW4-MED-002"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part4/FW4-MED-003.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW4-MED-003"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part4/FW4-MED-004.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW4-MED-004"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part4/FW4-MED-005.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW4-MED-005"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part4/FW4-MED-006.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW4-MED-006"] = d.default; } catch { /* R2 */ }

// ⚠️ CAMBRIDGE FLYERS Part 5 — Story Read + Free-Text Fill (FW5-*)
try { const d = await import("../../../content/Cambridge/flyers/part5/FW5-EASY-001.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW5-EASY-001"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part5/FW5-EASY-002.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW5-EASY-002"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part5/FW5-EASY-003.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW5-EASY-003"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part5/FW5-EASY-004.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW5-EASY-004"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part5/FW5-EASY-005.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW5-EASY-005"] = d.default; } catch { /* R2 */ }

// ⚠️ CAMBRIDGE FLYERS Part 6 — Diary/Email/Letter Read + Inline ONE-Word Fill (FW6-*)
try { const d = await import("../../../content/Cambridge/flyers/part6/FW6-MED-001.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW6-MED-001"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part6/FW6-MED-002.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW6-MED-002"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part6/FW6-MED-003.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW6-MED-003"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part6/FW6-MED-004.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW6-MED-004"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/part6/FW6-MED-005.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW6-MED-005"] = d.default; } catch { /* R2 */ }

// ⚠️ CAMBRIDGE FLYERS Part 7 — Write a Story (3 Pictures) (FW7-*)
try { const d = await import("../../../content/Cambridge/flyers/part7/FW7-MED-001.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW7-MED-001"] = d.default; } catch { /* R2 */ }

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
  // Cambridge Flyers — Listening (L001, L002, L003...)
  if (/^L\d{3}$/.test(quizId)) {
    return `quizzes/cambridge/flyers/listening/${quizId}.json`;
  }
  // Cambridge Flyers — R&W Part 1 Word Bank (FW1-*)
  if (/^FW1-/.test(quizId)) {
    return `quizzes/cambridge/flyers/part1/${quizId}.json`;
  }
  // Cambridge Flyers — R&W Part 2 Conversation Matching (FW2-*)
  if (/^FW2-/.test(quizId)) {
    return `quizzes/cambridge/flyers/part2/${quizId}.json`;
  }
  // Cambridge Flyers — R&W Part 3 Story Fill-in-Blank (FW3-*)
  if (/^FW3-/.test(quizId)) {
    return `quizzes/cambridge/flyers/part3/${quizId}.json`;
  }
  // Cambridge Flyers — R&W Part 4 Multiple-Choice Cloze (FW4-*)
  if (/^FW4-/.test(quizId)) {
    return `quizzes/cambridge/flyers/part4/${quizId}.json`;
  }
  // Cambridge Flyers — R&W Part 5 Story Read + Free-Text Fill (FW5-*)
  if (/^FW5-/.test(quizId)) {
    return `quizzes/cambridge/flyers/part5/${quizId}.json`;
  }
  // Cambridge Flyers — R&W Part 6 Diary + Inline ONE-Word Fill (FW6-*)
  if (/^FW6-/.test(quizId)) {
    return `quizzes/cambridge/flyers/part6/${quizId}.json`;
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
  // Cambridge — Listening (Flyers)
  if (/^L\d{3}$/i.test(quizId)) {
    return { pathway: "cambridge", subject: "listening" };
  }
  // Cambridge — Flyers Part 1 Word Bank (FW1-*)
  if (/^FW1-/i.test(quizId)) {
    return { pathway: "cambridge", subject: "flyers" };
  }
  // Cambridge — Flyers Part 2 Conversation Matching (FW2-*)
  if (/^FW2-/i.test(quizId)) {
    return { pathway: "cambridge", subject: "flyers" };
  }
  // Cambridge — Flyers Part 3–6 (FW3-*, FW4-*, FW5-*, FW6-*)
  if (/^FW[3456]-/i.test(quizId)) {
    return { pathway: "cambridge", subject: "flyers" };
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
    // Part 7 only — essay không được gửi (privacy)
    wordCount?: number;
    starsEarned?: number;
  }>();

  // Load quiz để chấm điểm
  // Quiz có 4 cấu trúc:
  //   A. { questions: [...] }                          — MCQ / Flyers Part 1
  //   B. { sections: [{ questions: [...] }] }          — Reading / Writing
  //   C. { answers: ["F","A",...], conversation: [...] } — Flyers Part 2
  //   D. { answers: ["F","A",...] }                   — Flyers Part 2 (general)
  const quizRaw = await loadQuizJson(quizId, c.env) as {
    type?: string;
    questions?: Array<{ id: string; correct: string | string[] }>;
    sections?: Array<{ questions?: Array<{ id: string; correct: string | string[] }> }>;
    answers?: string[];  // Flyers Part 2: mảng đáp án đúng theo thứ tự
    skill?: string;
    part?: number;
  } | null;

  if (!quizRaw) {
    return c.json({ error: "Không tìm thấy bài học" }, 404);
  }

  // Normalize: flatten questions từ mọi cấu trúc
  let questions: Array<{ id: string; correct: string | string[] }> = [
    ...(quizRaw.questions ?? []),
    ...(quizRaw.sections ?? []).flatMap(s => s.questions ?? []),
  ];

  // Flyers Part 2: answers là array string ["F","A",...]
  // → normalize thành questions format: { id: "q1", correct: "F" }
  if (
    questions.length === 0 &&
    Array.isArray(quizRaw.answers) &&
    quizRaw.answers.length > 0 &&
    typeof quizRaw.answers[0] === "string"
  ) {
    questions = quizRaw.answers.map((ans, i) => ({
      id: `q${i + 1}`,
      correct: ans,
    }));
  }

  // flyers-part6 và flyers-part7 dùng cấu trúc riêng, không có `questions`
  if (questions.length === 0 && quizRaw.type !== "flyers-part6" && quizRaw.type !== "flyers-part7") {
    return c.json({ error: "Bài học không có câu hỏi" }, 422);
  }

  // ===== Chấm điểm riêng cho flyers-part5 (normalize + accepted_answers) =====
  if (quizRaw.type === "flyers-part5") {
    const fp5Quiz = quizRaw as unknown as {
      type: string;
      questions: Array<{
        number: number;
        accepted_answers: string[];
      }>;
      skill?: string;
      part?: number;
    };

    function normalizeAns(s: string): string {
      return s.toLowerCase().trim()
        .replace(/^(a|an|the)\s+/i, "")
        .replace(/\s+/g, " ");
    }

    let fp5Correct = 0;
    const fp5CorrectAnswers: Record<string, string> = {};
    for (const q of fp5Quiz.questions) {
      const key = `q${q.number}`;
      const userAns = String(body.answers[key] ?? "");
      const nUser = normalizeAns(userAns);
      const matched = q.accepted_answers.some(a => normalizeAns(a) === nUser);
      if (matched) fp5Correct++;
      fp5CorrectAnswers[key] = q.accepted_answers[0] ?? "";
    }

    const fp5Total = fp5Quiz.questions.length;
    const fp5Pct = Math.round((fp5Correct / fp5Total) * 100);
    const fp5Stars = calcStars(fp5Pct);

    const userId2 = await getOptionalSession(c.req.header("Cookie") ?? null, c.env);
    let saved2 = false;
    if (userId2) {
      const profile2 = await c.env.DB.prepare(
        "SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1"
      ).bind(userId2).first<{ id: string }>();
      if (profile2) {
        const meta2 = detectQuizMeta(quizId);
        let quizIsFree2 = 1;
        try {
          const cfg2 = await c.env.DB.prepare(
            "SELECT is_free FROM quiz_configs WHERE quiz_id = ? LIMIT 1"
          ).bind(quizId).first<{ is_free: number }>();
          if (cfg2 !== null) quizIsFree2 = cfg2.is_free;
        } catch { /* fallback free */ }

        await updateStarsAfterQuiz({
          studentId: profile2.id,
          starsEarned: fp5Stars,
          quizId,
          skill: fp5Quiz.skill ?? "reading",
          partNumber: fp5Quiz.part ?? 5,
          score: fp5Correct,
          maxScore: fp5Total,
          timeSpent: body.timeSpent ?? 0,
          answersJson: JSON.stringify(body.answers),
          pathway: meta2.pathway,
          subject: meta2.subject,
          isFree: quizIsFree2,
          env: c.env,
        });
        saved2 = true;
      }
    }
    return c.json({
      ok: true,
      saved: saved2,
      score: fp5Correct,
      maxScore: fp5Total,
      percentage: fp5Pct,
      starsEarned: fp5Stars,
      correctAnswers: fp5CorrectAnswers,
    });
  }

  // ===== Chấm điểm riêng cho flyers-part6 (inline blanks, 1 word, normalize) =====
  if (quizRaw.type === "flyers-part6") {
    const fp6Quiz = quizRaw as unknown as {
      type: string;
      segments: Array<{
        type: string;
        number?: number;
        accepted_answers?: string[];
      }>;
      skill?: string;
      part?: number;
    };

    function normalizeAns6(s: string): string {
      return s.toLowerCase().trim().replace(/\s+/g, " ");
    }

    const blanks = fp6Quiz.segments.filter(s => s.type === "blank") as Array<{
      type: "blank"; number: number; accepted_answers: string[];
    }>;

    let fp6Correct = 0;
    const fp6CorrectAnswers: Record<string, string> = {};
    for (const blank of blanks) {
      const key = `q${blank.number}`;
      const userAns = String(body.answers[key] ?? "");
      const nUser = normalizeAns6(userAns);
      const matched = blank.accepted_answers.some(a => normalizeAns6(a) === nUser);
      if (matched) fp6Correct++;
      fp6CorrectAnswers[key] = blank.accepted_answers[0] ?? "";
    }

    const fp6Total = blanks.length;
    const fp6Pct = Math.round((fp6Correct / fp6Total) * 100);
    const fp6Stars = calcStars(fp6Pct);

    const userId6 = await getOptionalSession(c.req.header("Cookie") ?? null, c.env);
    let saved6 = false;
    if (userId6) {
      const profile6 = await c.env.DB.prepare(
        "SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1"
      ).bind(userId6).first<{ id: string }>();
      if (profile6) {
        const meta6 = detectQuizMeta(quizId);
        let quizIsFree6 = 1;
        try {
          const cfg6 = await c.env.DB.prepare(
            "SELECT is_free FROM quiz_configs WHERE quiz_id = ? LIMIT 1"
          ).bind(quizId).first<{ is_free: number }>();
          if (cfg6 !== null) quizIsFree6 = cfg6.is_free;
        } catch { /* fallback free */ }

        await updateStarsAfterQuiz({
          studentId: profile6.id,
          starsEarned: fp6Stars,
          quizId,
          skill: fp6Quiz.skill ?? "reading",
          partNumber: fp6Quiz.part ?? 6,
          score: fp6Correct,
          maxScore: fp6Total,
          timeSpent: body.timeSpent ?? 0,
          answersJson: JSON.stringify(body.answers),
          pathway: meta6.pathway,
          subject: meta6.subject,
          isFree: quizIsFree6,
          env: c.env,
        });
        saved6 = true;
      }
    }
    return c.json({
      ok: true,
      saved: saved6,
      score: fp6Correct,
      maxScore: fp6Total,
      percentage: fp6Pct,
      starsEarned: fp6Stars,
      correctAnswers: fp6CorrectAnswers,
    });
  }
  // ===========================================================================

  // ===== Chấm điểm riêng cho flyers-part7 (Write a Story) =====
  // Body: { wordCount, starsEarned, timeSpent } — essay KHÔNG được gửi lên (privacy)
  if (quizRaw.type === "flyers-part7") {
    const wordCount   = Number(body.wordCount   ?? 0);
    const clientStars = Math.min(3, Math.max(0, Number(body.starsEarned ?? 0)));
    // Server validate: 0 sao nếu chưa đủ 20 từ
    const validStars  = wordCount >= 20 ? clientStars : 0;

    const userId7 = await getOptionalSession(c.req.header("Cookie") ?? null, c.env);
    let saved7 = false;

    if (userId7) {
      const profile7 = await c.env.DB.prepare(
        "SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1"
      ).bind(userId7).first<{ id: string }>();

      if (profile7) {
        const meta7 = detectQuizMeta(quizId);
        await updateStarsAfterQuiz({
          studentId:   profile7.id,
          starsEarned: validStars,
          quizId,
          skill:       "writing",
          partNumber:  7,
          score:       wordCount >= 20 ? 1 : 0,
          maxScore:    1,
          timeSpent:   body.timeSpent ?? 0,
          answersJson: JSON.stringify({ wordCount, starsEarned: validStars }),
          pathway:     meta7.pathway,
          subject:     meta7.subject,
          isFree:      1,
          env:         c.env,
        });
        saved7 = true;
      }
    }

    return c.json({ ok: true, saved: saved7, wordCount, starsEarned: validStars });
  }
  // ===========================================================================
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
