/**
 * subjects.ts — Worker route cho quiz catalog
 *
 * GET /api/subjects?pathway=cambridge&subject=flyers
 * → Trả về danh sách bài học từ D1 (cached trong KV 30 phút)
 *
 * GET /api/subjects/all
 * → Toàn bộ catalog (cho Admin Dashboard)
 *
 * POST /api/subjects/cache/invalidate
 * → Xóa KV cache cho 1 subject (để bài mới xuất hiện ngay)
 */

import { Hono } from "hono";

const CACHE_TTL = 60 * 30; // 30 phút (giây)

type Env = {
  DB: D1Database;
  CACHE: KVNamespace;
  SESSION: KVNamespace;
};

export const subjectsRoute = new Hono<{ Bindings: Env }>();

// ── GET /api/subjects ──────────────────────────────────────────────────
subjectsRoute.get("/", async (c) => {
  const pathway = c.req.query("pathway") ?? "cambridge";
  const subject = c.req.query("subject");

  const cacheKey = subject
    ? `subjects:${pathway}:${subject}`
    : `subjects:${pathway}:all`;

  // 1. Check KV cache
  if (c.env.CACHE) {
    const cached = await c.env.CACHE.get(cacheKey, { type: "json" });
    if (cached) {
      return c.json(cached, 200, {
        "Cache-Control": "public, max-age=300", // browser cache 5'
        "X-Cache": "HIT",
      });
    }
  }

  // 2. Query D1
  let query = `
    SELECT * FROM quiz_catalog
    WHERE pathway = ? AND is_published = 1
  `;
  const params: string[] = [pathway];

  if (subject) {
    query += " AND subject_slug = ?";
    params.push(subject);
  }

  query += " ORDER BY subject_slug, sort_order, quiz_id";

  const { results } = await c.env.DB.prepare(query).bind(...params).all();

  // 3. Lưu vào KV
  if (c.env.CACHE) {
    await c.env.CACHE.put(cacheKey, JSON.stringify(results), {
      expirationTtl: CACHE_TTL,
    });
  }

  return c.json(results, 200, {
    "Cache-Control": "public, max-age=300",
    "X-Cache": "MISS",
  });
});

// ── GET /api/subjects/all — Cho Admin Dashboard ────────────────────────
subjectsRoute.get("/all", async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT * FROM quiz_catalog ORDER BY pathway, subject_slug, sort_order
  `).all();
  return c.json(results);
});

// ── POST /api/subjects/cache/invalidate ──────────────────────────
// Dùng để xóa KV cache ngay khi thêm bài mới (không chờ 30 phút)
subjectsRoute.post("/cache/invalidate", async (c) => {
  const body = await c.req.json<{ pathway?: string; subject?: string }>().catch(() => ({} as { pathway?: string; subject?: string }));

  // Xóa các keys liên quan
  const keysToDelete = [];
  if (body.pathway && body.subject) {
    keysToDelete.push(`subjects:${body.pathway}:${body.subject}`);
    keysToDelete.push(`subjects:${body.pathway}:all`);
  } else if (c.env.CACHE) {
    // Invalidate tất cả (dùng cho batch insert)
    // KV không có wildcard delete — cần list keys trước
    const listed = await c.env.CACHE.list({ prefix: "subjects:" });
    for (const key of listed.keys) {
      await c.env.CACHE.delete(key.name);
    }
    return c.json({ ok: true, deleted: listed.keys.length });
  }

  if (c.env.CACHE) {
    for (const key of keysToDelete) {
      await c.env.CACHE.delete(key);
    }
  }

  return c.json({ ok: true, deleted: keysToDelete });
});
