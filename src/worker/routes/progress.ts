/**
 * progress.ts — GET /api/student/progress-summary
 *
 * Tính toán server-side tóm tắt tiến độ học tập của bé theo từng môn/kỹ năng.
 * Kết quả dùng cho Dashboard 2-tab (Lớp 6 | Cambridge).
 *
 * Logic:
 *   - Dùng best attempt (điểm cao nhất) mỗi quiz để tính avg_score
 *   - Chỉ tính bài is_free=1 vào progress bar
 *   - Bài premium hiển thị riêng (locked_premium)
 *   - Badge chỉ hiện khi đã làm ≥ 5 bài free
 *   - 10 bài gần nhất cho "Recent Attempts"
 *   - Bài điểm thấp nhất (< 60%) cho "Low Score Alert"
 */

import { Hono } from "hono";
import { getSession, getSessionTokenFromCookie } from "../lib/session";

type Env = {
  DB: D1Database;
  SESSION: KVNamespace;
};

// ===================================================
// STATIC LOOKUP: tổng bài mỗi môn (nguồn truth từ subjects.ts)
// Cập nhật khi thêm bài mới vào subjects.ts
// ===================================================

interface SubjectMeta {
  totalFree:     number;  // số bài is_free = true
  lockedPremium: number;  // số bài is_free = false
  emoji:         string;
  label:         string;
}

const LOC6_SUBJECT_META: Record<string, SubjectMeta> = {
  "toan": {
    totalFree: 5, lockedPremium: 5,
    emoji: "🧮", label: "Toán Tư Duy",
  },
  "tieng-anh": {
    totalFree: 12, lockedPremium: 6,
    emoji: "🌐", label: "Tiếng Anh",
  },
  "tieng-viet": {
    totalFree: 0, lockedPremium: 0,
    emoji: "📖", label: "Tiếng Việt",
  },
  "khoa-hoc": {
    totalFree: 0, lockedPremium: 0,
    emoji: "🔬", label: "Khoa Học",
  },
};

const CAMBRIDGE_SUBJECT_META: Record<string, SubjectMeta> = {
  "reading": {
    totalFree: 3, lockedPremium: 0,
    emoji: "📖", label: "Reading",
  },
  "listening": {
    totalFree: 3, lockedPremium: 0,
    emoji: "🎧", label: "Listening",
  },
  "writing": {
    totalFree: 0, lockedPremium: 0,
    emoji: "✏️", label: "Writing",
  },
  "speaking": {
    totalFree: 0, lockedPremium: 0,
    emoji: "🗣️", label: "Speaking",
  },
  "vocabulary": {
    totalFree: 0, lockedPremium: 0,
    emoji: "📚", label: "Vocabulary",
  },
};

// ===================================================
// Types
// ===================================================

interface SubjectProgress {
  doneFree:      number;
  totalFree:     number;
  lockedPremium: number;
  avgScore:      number | null;  // null nếu < 5 bài
  badge:         "gioi" | "kha" | "can_on" | "pending";
  lastActivity:  number | null;  // unix timestamp
  emoji:         string;
  label:         string;
}

interface RecentAttempt {
  quizId:    string;
  title:     string;
  pathway:   string;
  subject:   string;
  bestPct:   number;
  doneAt:    number;
}



export interface ProgressSummaryResponse {
  lop6:           Record<string, SubjectProgress>;
  cambridge:      Record<string, SubjectProgress>;
  recentAttempts: RecentAttempt[];
  lowScoreAlert:  { quizId: string; pathway: string; subject: string; bestPct: number } | null;
  gradeMissing:   boolean;
}

// ===================================================
// Helper: tính badge từ avg score + số bài đã làm
// ===================================================
function calcBadge(doneFree: number, avgScore: number | null): SubjectProgress["badge"] {
  if (doneFree < 5 || avgScore === null) return "pending";
  if (avgScore >= 80) return "gioi";
  if (avgScore >= 60) return "kha";
  return "can_on";
}

// ===================================================
// Route
// ===================================================
export const progressRoute = new Hono<{ Bindings: Env }>();

progressRoute.get("/progress-summary", async (c) => {
  // Auth: bắt buộc đăng nhập
  const cookieHeader = c.req.header("Cookie") ?? null;
  const token = getSessionTokenFromCookie(cookieHeader);
  if (!token) return c.json({ error: "Chưa đăng nhập" }, 401);

  const userId = await getSession(c.env.SESSION, token);
  if (!userId) return c.json({ error: "Session hết hạn" }, 401);

  // Lấy student profile (cần student_id + current_grade)
  const profile = await c.env.DB.prepare(
    "SELECT id, current_grade, selected_pathway FROM student_profiles WHERE user_id = ? LIMIT 1"
  ).bind(userId).first<{ id: string; current_grade: number | null; selected_pathway: string | null }>();

  if (!profile) return c.json({ error: "Chưa có hồ sơ" }, 404);

  const studentId   = profile.id;
  const gradeMissing = profile.current_grade === null;

  // ─── Query 1: Best attempt per quiz (tính avg_score, done_count theo subject) ───
  // Chỉ tính bài is_free = 1 (bài miễn phí)
  const summaryRows = await c.env.DB.prepare(`
    WITH best_per_quiz AS (
      SELECT
        quiz_id,
        pathway,
        subject,
        MAX(CAST(score AS REAL) / NULLIF(max_score, 0) * 100) AS best_pct,
        MAX(completed_at) AS last_done
      FROM quiz_attempts
      WHERE student_id = ?
        AND is_free = 1
        AND pathway IS NOT NULL
        AND subject IS NOT NULL
      GROUP BY quiz_id, pathway, subject
    )
    SELECT
      pathway,
      subject,
      COUNT(*)                    AS done_count,
      ROUND(AVG(best_pct), 1)     AS avg_score,
      MAX(last_done)              AS last_activity
    FROM best_per_quiz
    GROUP BY pathway, subject
  `).bind(studentId).all<{
    pathway:       string;
    subject:       string;
    done_count:    number;
    avg_score:     number | null;
    last_activity: number | null;
  }>();

  // Build lookup map: "pathway:subject" → row
  const summaryMap = new Map<string, typeof summaryRows.results[0]>();
  for (const row of summaryRows.results) {
    summaryMap.set(`${row.pathway}:${row.subject}`, row);
  }

  // ─── Build Lớp 6 subject progress ───
  const lop6: Record<string, SubjectProgress> = {};
  for (const [subject, meta] of Object.entries(LOC6_SUBJECT_META)) {
    const row       = summaryMap.get(`lop6:${subject}`);
    const doneFree  = row?.done_count  ?? 0;
    const avgScore  = row?.avg_score   ?? null;
    const lastAct   = row?.last_activity ?? null;
    lop6[subject]   = {
      doneFree,
      totalFree:     meta.totalFree,
      lockedPremium: meta.lockedPremium,
      avgScore:      doneFree >= 5 ? avgScore : null,
      badge:         calcBadge(doneFree, avgScore),
      lastActivity:  lastAct,
      emoji:         meta.emoji,
      label:         meta.label,
    };
  }

  // ─── Build Cambridge subject progress ───
  const cambridge: Record<string, SubjectProgress> = {};
  for (const [subject, meta] of Object.entries(CAMBRIDGE_SUBJECT_META)) {
    const row       = summaryMap.get(`cambridge:${subject}`);
    const doneFree  = row?.done_count  ?? 0;
    const avgScore  = row?.avg_score   ?? null;
    const lastAct   = row?.last_activity ?? null;
    cambridge[subject] = {
      doneFree,
      totalFree:     meta.totalFree,
      lockedPremium: meta.lockedPremium,
      avgScore:      doneFree >= 5 ? avgScore : null,
      badge:         calcBadge(doneFree, avgScore),
      lastActivity:  lastAct,
      emoji:         meta.emoji,
      label:         meta.label,
    };
  }

  // ─── Query 2: 10 bài gần nhất ───
  const recentRows = await c.env.DB.prepare(`
    SELECT
      quiz_id,
      pathway,
      subject,
      CAST(score AS REAL) / NULLIF(max_score, 0) * 100 AS pct,
      completed_at
    FROM quiz_attempts
    WHERE student_id = ?
      AND pathway IS NOT NULL
      AND subject IS NOT NULL
    ORDER BY completed_at DESC
    LIMIT 10
  `).bind(studentId).all<{
    quiz_id:      string;
    pathway:      string;
    subject:      string;
    pct:          number;
    completed_at: number;
  }>();

  const recentAttempts: RecentAttempt[] = recentRows.results.map((r) => ({
    quizId:   r.quiz_id,
    title:    r.quiz_id,      // Frontend tự resolve title từ quiz_id
    pathway:  r.pathway,
    subject:  r.subject,
    bestPct:  Math.round(r.pct ?? 0),
    doneAt:   r.completed_at,
  }));

  // ─── Query 3: Bài điểm thấp nhất (free, < 60%, đã làm) ───
  const lowScoreRow = await c.env.DB.prepare(`
    WITH best_per_quiz AS (
      SELECT
        quiz_id,
        pathway,
        subject,
        MAX(CAST(score AS REAL) / NULLIF(max_score, 0) * 100) AS best_pct
      FROM quiz_attempts
      WHERE student_id = ?
        AND is_free = 1
        AND pathway IS NOT NULL
        AND subject IS NOT NULL
      GROUP BY quiz_id, pathway, subject
    )
    SELECT quiz_id, pathway, subject, best_pct
    FROM best_per_quiz
    WHERE best_pct < 60
    ORDER BY best_pct ASC
    LIMIT 1
  `).bind(studentId).first<{
    quiz_id:  string;
    pathway:  string;
    subject:  string;
    best_pct: number;
  }>();

  const lowScoreAlert = lowScoreRow
    ? { quizId: lowScoreRow.quiz_id, pathway: lowScoreRow.pathway, subject: lowScoreRow.subject, bestPct: Math.round(lowScoreRow.best_pct) }
    : null;

  // ─── Response ───
  const response: ProgressSummaryResponse = {
    lop6,
    cambridge,
    recentAttempts,
    lowScoreAlert,
    gradeMissing,
  };

  return c.json(response);
});

// ===================================================
// GET /api/student/quiz-scores
// Trả về { scores: { [quizId]: bestPct } } cho tất cả bài đã làm
// Dùng bởi SubjectPage để hiển thị % hoàn thành trên card bài học
// ===================================================
progressRoute.get("/quiz-scores", async (c) => {
  const cookieHeader = c.req.header("Cookie") ?? null;
  const token = getSessionTokenFromCookie(cookieHeader);
  if (!token) return c.json({ scores: {} });

  const userId = await getSession(c.env.SESSION, token);
  if (!userId) return c.json({ scores: {} });

  const profile = await c.env.DB.prepare(
    "SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1"
  ).bind(userId).first<{ id: string }>();

  if (!profile) return c.json({ scores: {} });

  const rows = await c.env.DB.prepare(`
    SELECT
      quiz_id,
      MAX(CAST(score AS REAL) / NULLIF(max_score, 0) * 100) AS best_pct
    FROM quiz_attempts
    WHERE student_id = ?
      AND score IS NOT NULL
      AND max_score IS NOT NULL
      AND max_score > 0
    GROUP BY quiz_id
  `).bind(profile.id).all<{ quiz_id: string; best_pct: number }>();

  const scores: Record<string, number> = {};
  for (const row of rows.results) {
    scores[row.quiz_id] = Math.round(row.best_pct ?? 0);
  }

  return c.json({ scores });
});

