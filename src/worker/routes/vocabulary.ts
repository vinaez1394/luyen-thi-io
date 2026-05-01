/**
 * vocabulary.ts — API lấy từ vựng từ D1 vocabulary_bank
 *
 * GET /api/vocabulary/random
 *   ?limit=5          → số từ cần lấy (default 5, max 20)
 *   ?group=flyers     → lọc theo group_tag (default "flyers")
 *   ?exclude=a,b,c    → bỏ qua các từ này (tránh trùng với pending)
 *   ?game=hangman     → chỉ lấy từ có game_hangman = 1 (default true)
 */

import { Hono } from "hono";

type Env = {
  DB: D1Database;
};

export const vocabularyRoute = new Hono<{ Bindings: Env }>();

// ─── GET /api/vocabulary/random ───────────────────────────────────────────────
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
