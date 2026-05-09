/**
 * vocabulary.ts — API từ vựng
 *
 * ── CŨ (Hangman + Flashcard — KHÔNG thay đổi) ──────────────────
 * GET /api/vocabulary/random
 *   ?limit=5        → số từ (default 5, max 20)
 *   ?group=flyers   → lọc group_tag (default "flyers")
 *   ?exclude=a,b,c  → bỏ qua từ này
 *   ?game=hangman   → chỉ lấy từ có game_hangman=1
 *
 * ── MỚI (Vocabulary Lesson) ────────────────────────────────────
 * GET  /api/vocabulary/topics     → Danh sách topics theo cert
 *   ?cert=flyers                  → cert level (cumulative: cert_order<=N)
 *
 * GET  /api/vocabulary/lesson     → 8 từ cho 1 session học
 *   ?topic=animals&cert=flyers    → topic + cert
 *   ?offset=0                     → bỏ qua N từ đầu (phân trang sessions)
 *
// POST /api/vocabulary/progress   → Cập nhật SRS sau khi luyện
//   body: { word_id, correct, session }
//
// GET  /api/vocabulary/passage/:topic/:part → Lấy đoạn văn JSON (animals-p1, vv)
//   (Phục vụ cho màn Use Hướng B)
// */

import { Hono } from "hono";
import { getSession } from "../lib/session";

// Static passage map — import thường (không có assert) cho Cloudflare Workers
import animals_p1 from "../../../content/Cambridge/vocabulary/animals-p1.json";
import animals_p2 from "../../../content/Cambridge/vocabulary/animals-p2.json";
import animals_p3 from "../../../content/Cambridge/vocabulary/animals-p3.json";
import animals_p4 from "../../../content/Cambridge/vocabulary/animals-p4.json";
import animals_p5 from "../../../content/Cambridge/vocabulary/animals-p5.json";
import animals_p6 from "../../../content/Cambridge/vocabulary/animals-p6.json";
import animals_p7 from "../../../content/Cambridge/vocabulary/animals-p7.json";
import family_p1  from "../../../content/Cambridge/vocabulary/family-p1.json";
import family_p2  from "../../../content/Cambridge/vocabulary/family-p2.json";
import family_p3  from "../../../content/Cambridge/vocabulary/family-p3.json";
import family_p4  from "../../../content/Cambridge/vocabulary/family-p4.json";
import family_p5  from "../../../content/Cambridge/vocabulary/family-p5.json";
import family_p6  from "../../../content/Cambridge/vocabulary/family-p6.json";
import family_p7  from "../../../content/Cambridge/vocabulary/family-p7.json";
import family_p8  from "../../../content/Cambridge/vocabulary/family-p8.json";

const LOCAL_PASSAGE_MAP: Record<string, object> = {
  "animals-p1": animals_p1,
  "animals-p2": animals_p2,
  "animals-p3": animals_p3,
  "animals-p4": animals_p4,
  "animals-p5": animals_p5,
  "animals-p6": animals_p6,
  "animals-p7": animals_p7,
  "family-p1":  family_p1,
  "family-p2":  family_p2,
  "family-p3":  family_p3,
  "family-p4":  family_p4,
  "family-p5":  family_p5,
  "family-p6":  family_p6,
  "family-p7":  family_p7,
  "family-p8":  family_p8,
};

// ── Cert map: string → cert_order number ─────────────────────────
const CERT_ORDER: Record<string, number> = {
  starters: 1,
  movers:   2,
  flyers:   3,
  ket:      4,
  pet:      5,
};

// ── SRS interval logic ───────────────────────────────────────────
// Ladder: 1 → 3 → 7 → 14 → 30 days (theo mastery_level)
const SRS_INTERVALS = [1, 3, 7, 14, 30]; // index = mastery_level - 1
const SECONDS_PER_DAY = 86_400;


// ── Env bindings ─────────────────────────────────────────────────
type Env = {
  DB: D1Database;
  SESSION: KVNamespace;
  CONTENT?: R2Bucket; // R2 binding tên "CONTENT" theo wrangler.json
};

export const vocabularyRoute = new Hono<{ Bindings: Env }>();

// ── Auth helper (optional — guest được phép xem, không lưu progress) ──
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

// ─── GET /api/vocabulary/random (CŨ — KHÔNG SỬA) ────────────────────────────
vocabularyRoute.get("/random", async (c) => {
  const limitParam   = Number(c.req.query("limit")   ?? "5");
  const group        = c.req.query("group")           ?? "flyers";
  const excludeParam = c.req.query("exclude")         ?? "";
  const game         = c.req.query("game")            ?? "hangman";

  // Validate limit (1–20)
  const limit = Math.min(Math.max(1, limitParam), 20);

  // Danh sách từ cần exclude (đã có trong pendingWords)
  const excludeWords = excludeParam
    ? excludeParam.split(",").map((w) => w.trim().toLowerCase()).filter(Boolean)
    : [];

  try {
    // Tên cột game filter: game_hangman | game_flashcard | game_choice
    const gameCol = game === "flashcard"
      ? "game_flashcard"
      : game === "choice"
        ? "game_choice"
        : "game_hangman";

    // Query: lấy ngẫu nhiên từ DB, lọc theo group + game flag
    // SQLite không có RAND(), dùng ORDER BY RANDOM()
    let query: D1PreparedStatement;

    if (excludeWords.length > 0) {
      // Tạo placeholders cho exclude list
      const placeholders = excludeWords.map(() => "?").join(", ");
      query = c.env.DB.prepare(
        `SELECT word, translation_vi AS vi, ipa, group_tag AS sourceQuizId
         FROM vocabulary_bank
         WHERE group_tag = ?
           AND ${gameCol} = 1
           AND LOWER(word) NOT IN (${placeholders})
         ORDER BY RANDOM()
         LIMIT ?`
      ).bind(group, ...excludeWords, limit);
    } else {
      query = c.env.DB.prepare(
        `SELECT word, translation_vi AS vi, ipa, group_tag AS sourceQuizId
         FROM vocabulary_bank
         WHERE group_tag = ?
           AND ${gameCol} = 1
         ORDER BY RANDOM()
         LIMIT ?`
      ).bind(group, limit);
    }

    const { results } = await query.all<{
      word: string;
      vi: string;
      ipa: string | null;
      sourceQuizId: string;
    }>();

    // Map sang VocabWord format cho frontend
    const words = results.map((row) => ({
      word: row.word,
      vi: row.vi,
      ipa: row.ipa ?? undefined,
      sourceQuizId: row.sourceQuizId,
      correctSessions: 0,
      isMastered: false,
    }));

    return c.json({ ok: true, words, total: words.length });
  } catch (err) {
    console.error("[vocabulary/random] DB error:", err);
    return c.json({ ok: false, words: [], error: "DB error" }, 500);
  }
});

// ─── GET /api/vocabulary/topics ──────────────────────────────────────────────
// Trả về danh sách topics + số từ + tiến độ học sinh (nếu đã đăng nhập)
vocabularyRoute.get("/topics", async (c) => {
  const certParam = c.req.query("cert") ?? "flyers";
  const certOrder = CERT_ORDER[certParam.toLowerCase()] ?? 3;

  try {
    const userId = await getOptionalSession(
      c.req.header("Cookie") ?? null,
      c.env
    );

    // Lấy danh sách topics + word count (cumulative theo cert_order)
    const { results: topicRows } = await c.env.DB.prepare(
      `SELECT topic,
              COUNT(*) AS total_words
       FROM vocabulary_bank
       WHERE topic IS NOT NULL
         AND is_active = 1
         AND cert_order <= ?
       GROUP BY topic
       ORDER BY topic ASC`
    ).bind(certOrder).all<{ topic: string; total_words: number }>();

    if (!topicRows.length) {
      return c.json({ ok: true, cert: certParam, cert_order: certOrder, topics: [] });
    }

    // Nếu đã đăng nhập → lấy thêm tiến độ từng topic
    let progressMap: Record<string, { mastered: number; seen: number; review_due: number }> = {};

    if (userId) {
      const topicList = topicRows.map(r => r.topic);
      const placeholders = topicList.map(() => "?").join(",");

      const { results: progressRows } = await c.env.DB.prepare(
        `SELECT vb.topic,
                SUM(CASE WHEN sv.mastery_level >= 2 THEN 1 ELSE 0 END) AS mastered,
                COUNT(sv.id) AS seen,
                SUM(CASE WHEN sv.next_review_at IS NOT NULL
                          AND sv.next_review_at <= unixepoch()
                         THEN 1 ELSE 0 END) AS review_due
         FROM vocabulary_bank vb
         LEFT JOIN student_vocabulary sv
           ON sv.word_id = vb.id AND sv.student_id = ?
         WHERE vb.topic IN (${placeholders})
           AND vb.cert_order <= ?
           AND vb.is_active = 1
         GROUP BY vb.topic`
      ).bind(userId, ...topicList, certOrder).all<{
        topic: string;
        mastered: number;
        seen: number;
        review_due: number;
      }>();

      for (const row of progressRows) {
        progressMap[row.topic] = {
          mastered:    row.mastered    ?? 0,
          seen:        row.seen        ?? 0,
          review_due:  row.review_due  ?? 0,
        };
      }
    }

    // Topic emoji map (đại diện cho toàn bộ topic)
    const TOPIC_EMOJI: Record<string, string> = {
      animals:    "🐾",
      body:       "🫀",
      clothes:    "👕",
      colours:    "🎨",
      family:     "👨‍👩‍👧",
      food:       "🍎",
      health:     "💊",
      home:       "🏠",
      places:     "🏙️",
      school:     "🏫",
      sports:     "⚽",
      time:       "⏰",
      transport:  "🚗",
      weather:    "🌤️",
      work:       "💼",
      hobbies:    "🎨",
    };

    const topics = topicRows.map(row => ({
      key:             row.topic,
      label:           row.topic.charAt(0).toUpperCase() + row.topic.slice(1),
      emoji:           TOPIC_EMOJI[row.topic] ?? "📚",
      total_words:     row.total_words,
      student_mastered: progressMap[row.topic]?.mastered    ?? 0,
      student_seen:    progressMap[row.topic]?.seen         ?? 0,
      review_due:      progressMap[row.topic]?.review_due   ?? 0,
    }));

    return c.json({ ok: true, cert: certParam, cert_order: certOrder, topics });

  } catch (err) {
    console.error("[vocabulary/topics] error:", err);
    return c.json({ ok: false, error: "DB error" }, 500);
  }
});

// ─── GET /api/vocabulary/lesson ──────────────────────────────────────────────
// Trả về 8 từ cho 1 session học, ưu tiên từ "đến hạn ôn" → "chưa thành thạo"
vocabularyRoute.get("/lesson", async (c) => {
  const topic     = c.req.query("topic");
  const certParam = c.req.query("cert") ?? "flyers";
  const offset    = Number(c.req.query("offset") ?? "0");
  const certOrder = CERT_ORDER[certParam.toLowerCase()] ?? 3;
  const LIMIT     = 8;

  if (!topic) {
    return c.json({ ok: false, error: "topic is required" }, 400);
  }

  try {
    const userId = await getOptionalSession(
      c.req.header("Cookie") ?? null,
      c.env
    );

    // Tổng số từ của topic (để tính total_sessions)
    const countRow = await c.env.DB.prepare(
      `SELECT COUNT(*) AS cnt
       FROM vocabulary_bank
       WHERE topic = ? AND cert_order <= ? AND is_active = 1`
    ).bind(topic, certOrder).first<{ cnt: number }>();

    const totalWords    = countRow?.cnt ?? 0;
    const totalSessions = Math.ceil(totalWords / LIMIT);
    const sessionNumber = Math.floor(offset / LIMIT) + 1;

    // Lấy 8 từ — nếu đã đăng nhập: ưu tiên đến hạn ôn trước
    // Nếu guest: lấy theo thứ tự cert_order ASC
    let wordRows: Array<{
      id: string; word: string; certificate: string; cert_order: number;
      translation_vi: string; ipa: string | null; word_type: string | null;
      example_en: string | null; example_vi: string | null;
      emoji: string | null; image_url: string | null; audio_url: string | null;
    }>;

    if (userId) {
      // Đã đăng nhập: ưu tiên review_due → mastery_level thấp → RANDOM
      const { results } = await c.env.DB.prepare(
        `SELECT vb.id, vb.word, vb.certificate, vb.cert_order,
                vb.translation_vi, vb.ipa, vb.word_type,
                vb.example_en, vb.example_vi,
                vb.emoji, vb.image_url, vb.audio_url,
                COALESCE(sv.mastery_level, 0) AS mastery_level,
                sv.next_review_at
         FROM vocabulary_bank vb
         LEFT JOIN student_vocabulary sv
           ON sv.word_id = vb.id AND sv.student_id = ?
         WHERE vb.topic = ?
           AND vb.cert_order <= ?
           AND vb.is_active = 1
         ORDER BY
           CASE WHEN sv.next_review_at IS NOT NULL
                 AND sv.next_review_at <= unixepoch() THEN 0 ELSE 1 END ASC,
           COALESCE(sv.mastery_level, 0) ASC,
           RANDOM()
         LIMIT ? OFFSET ?`
      ).bind(userId, topic, certOrder, LIMIT, offset).all();
      wordRows = results as typeof wordRows;
    } else {
      // Guest: thứ tự cert_order ASC (học từ dễ → khó)
      const { results } = await c.env.DB.prepare(
        `SELECT id, word, certificate, cert_order,
                translation_vi, ipa, word_type,
                example_en, example_vi,
                emoji, image_url, audio_url
         FROM vocabulary_bank
         WHERE topic = ?
           AND cert_order <= ?
           AND is_active = 1
         ORDER BY cert_order ASC, id ASC
         LIMIT ? OFFSET ?`
      ).bind(topic, certOrder, LIMIT, offset).all();
      wordRows = results as typeof wordRows;
    }

    // Map mastery từ student_vocabulary nếu đã đăng nhập
    const words = wordRows.map(row => ({
      id:             row.id,
      word:           row.word,
      certificate:    row.certificate,
      cert_order:     row.cert_order,
      translation_vi: row.translation_vi,
      ipa:            row.ipa            ?? null,
      word_type:      row.word_type      ?? "noun",
      example_en:     row.example_en     ?? null,
      example_vi:     row.example_vi     ?? null,
      emoji:          row.emoji          ?? "📖",
      image_url:      row.image_url      ?? null,
      audio_url:      row.audio_url      ?? null,
      mastery_level:  0,
      next_review_at: null as number | null,
    }));

    return c.json({
      ok:             true,
      topic,
      cert:           certParam,
      cert_order:     certOrder,
      session_number: sessionNumber,
      total_sessions: totalSessions,
      total_words:    totalWords,
      words,
    });

  } catch (err) {
    console.error("[vocabulary/lesson] error:", err);
    return c.json({ ok: false, error: "DB error" }, 500);
  }
});

// Cert order map dùng cho passage filtering
const PASSAGE_CERT_ORDER: Record<string, number> = {
  starters: 1,
  movers:   2,
  flyers:   3,
  ket:      4,
  pet:      5,
};

// ─── GET /api/vocabulary/passage/:topic/:part ────────────────────────────────
// Lấy passage JSON cho phần USE (hướng B)
// Query param: ?cert=starters|movers|flyers (default: flyers)
// Trả 404 nếu passage.level > cert của học sinh (để frontend thử part khác)
vocabularyRoute.get("/passage/:topic/:part", async (c) => {
  const topic      = c.req.param("topic");
  const part       = c.req.param("part");
  const certParam  = c.req.query("cert") ?? "flyers";
  const certOrder  = PASSAGE_CERT_ORDER[certParam.toLowerCase()] ?? 3;
  const passageId  = `${topic}-p${part}`;

  let passageData: Record<string, unknown> | null = null;

  // Production: load từ R2 bucket CONTENT
  if (c.env.CONTENT) {
    const r2Key = `Cambridge/vocabulary/${passageId}.json`;
    const obj = await c.env.CONTENT.get(r2Key);
    if (obj) {
      const text = await obj.text();
      passageData = JSON.parse(text) as Record<string, unknown>;
    }
  }

  // Local dev fallback
  if (!passageData && LOCAL_PASSAGE_MAP[passageId]) {
    passageData = LOCAL_PASSAGE_MAP[passageId] as Record<string, unknown>;
  }

  if (!passageData) {
    return c.json({ error: "Passage not found" }, 404);
  }

  // Cert filtering: bỏ qua passage quá khó so với cert của học sinh
  // passage.level mặc định "flyers" nếu không có field
  const passageLevel  = (passageData["level"] as string | undefined) ?? "flyers";
  const passageCertOrder = PASSAGE_CERT_ORDER[passageLevel.toLowerCase()] ?? 3;

  if (passageCertOrder > certOrder) {
    // Passage này khó hơn cert của học sinh → trả 404 để frontend thử part khác
    return c.json({ error: "Passage level too high for this cert" }, 404);
  }

  return c.json(passageData);
});

// ─── POST /api/vocabulary/progress ───────────────────────────────────────────
// Cập nhật kết quả PRACTICE/USE — tính SRS interval mới
// Auth bắt buộc (guest không lưu được)
vocabularyRoute.post("/progress", async (c) => {
  // Auth check
  const userId = await getOptionalSession(
    c.req.header("Cookie") ?? null,
    c.env
  );
  if (!userId) {
    return c.json({ ok: false, error: "Bạn cần đăng nhập để lưu tiến độ." }, 401);
  }

  let body: { word_id?: string; correct?: boolean; session?: string };
  try {
    body = await c.req.json();
  } catch {
    return c.json({ ok: false, error: "Invalid JSON body" }, 400);
  }

  const { word_id, correct } = body;
  if (!word_id || correct === undefined) {
    return c.json({ ok: false, error: "word_id and correct are required" }, 400);
  }

  try {
    const now = Math.floor(Date.now() / 1000);

    // Lấy record hiện tại (nếu có)
    const existing = await c.env.DB.prepare(
      `SELECT mastery_level, correct_count, seen_count, interval_days
       FROM student_vocabulary
       WHERE student_id = ? AND word_id = ?`
    ).bind(userId, word_id).first<{
      mastery_level: number;
      correct_count: number;
      seen_count:    number;
      interval_days: number;
    }>();

    // Tính mastery và interval mới
    const currentMastery  = existing?.mastery_level ?? 0;
    const currentCorrect  = existing?.correct_count ?? 0;
    const currentSeen     = existing?.seen_count    ?? 0;

    let newMastery:  number;
    let newInterval: number;
    let nextReview:  number;

    if (correct) {
      // Tăng mastery (tối đa 4 = maintenance level cao nhất)
      newMastery  = Math.min(currentMastery + 1, 4);
      newInterval = SRS_INTERVALS[Math.min(newMastery - 1, SRS_INTERVALS.length - 1)];
      nextReview  = now + newInterval * SECONDS_PER_DAY;
    } else {
      // Sai → reset về mastery=0, interval=1 ngày
      newMastery  = 0;
      newInterval = 1;
      nextReview  = now + SECONDS_PER_DAY;
    }

    // Upsert vào student_vocabulary
    await c.env.DB.prepare(
      `INSERT INTO student_vocabulary
         (student_id, word_id, mastery_level, correct_count, seen_count,
          interval_days, next_review_at, last_seen_at, first_seen_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(student_id, word_id) DO UPDATE SET
         mastery_level  = excluded.mastery_level,
         correct_count  = excluded.correct_count,
         seen_count     = excluded.seen_count,
         interval_days  = excluded.interval_days,
         next_review_at = excluded.next_review_at,
         last_seen_at   = excluded.last_seen_at`
    ).bind(
      userId,
      word_id,
      newMastery,
      correct ? currentCorrect + 1 : currentCorrect,
      currentSeen + 1,
      newInterval,
      nextReview,
      now,
      existing ? undefined : now   // first_seen_at: chỉ set khi insert mới
    ).run();

    return c.json({
      ok:             true,
      word_id,
      new_mastery:    newMastery,
      interval_days:  newInterval,
      next_review_at: nextReview,
    });

  } catch (err) {
    console.error("[vocabulary/progress] error:", err);
    return c.json({ ok: false, error: "DB error" }, 500);
  }
});

