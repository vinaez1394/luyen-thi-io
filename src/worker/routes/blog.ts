/**
 * blog.ts — Route API cho hệ thống Blog "Kiến Thức"
 *
 * GET /api/blog/index       → Lấy danh sách tất cả bài viết (blog-index.json)
 * GET /api/blog/:slug       → Lấy nội dung chi tiết 1 bài viết (.md → JSON)
 *
 * Chiến lược giống quiz.ts:
 *   - Production: Đọc từ Cloudflare R2 bucket (CONTENT)
 *   - Local Dev: Đọc trực tiếp từ source code (dynamic import)
 */

import { Hono } from "hono";

// ─── Local Dev Fallback (dynamic import) ────────────────────────────────────
// Trong production, dùng R2. Local dev sẽ đọc file .md trực tiếp.
// blog-index.json được sinh tự động bởi scripts/build-blog-index.mjs
let LOCAL_BLOG_INDEX: object | null = null;
const LOCAL_BLOG_POSTS: Record<string, string> = {};

try {
  const idx = await import("../../../content/blog/blog-index.json", {
    assert: { type: "json" },
  });
  LOCAL_BLOG_INDEX = idx.default;
} catch { /* Production: dùng R2 */ }

// ─── R2 Key helpers ──────────────────────────────────────────────────────────
function getBlogIndexR2Key(): string {
  return "blog/blog-index.json";
}

function getBlogPostR2Key(slug: string): string {
  // Slug = id của bài viết (không có extension)
  // Category được detect từ index để build đúng path
  return `blog/posts/${slug}.md`;
}

// ─── Hono App ────────────────────────────────────────────────────────────────
export const blogRoutes = new Hono<{ Bindings: Env }>();

/**
 * GET /api/blog/index
 * Trả về toàn bộ metadata bài viết (không có content).
 * Dùng cho trang danh sách, sidebar, filter Tags.
 */
blogRoutes.get("/index", async (c) => {
  // Production: đọc từ R2
  if (c.env.CONTENT) {
    const obj = await c.env.CONTENT.get(getBlogIndexR2Key());
    if (obj) {
      const text = await obj.text();
      return c.json(JSON.parse(text));
    }
  }

  // Local dev fallback
  if (LOCAL_BLOG_INDEX) {
    return c.json(LOCAL_BLOG_INDEX);
  }

  return c.json(
    {
      error: "Blog index not found. Run: npm run blog:index",
      total: 0,
      posts: [],
    },
    404
  );
});

/**
 * GET /api/blog/:slug
 * Trả về nội dung đầy đủ 1 bài viết (Markdown raw text).
 * Frontend sẽ dùng react-markdown để render.
 */
blogRoutes.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  // Validate slug (chỉ cho phép ký tự an toàn)
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return c.json({ error: "Invalid slug" }, 400);
  }

  // Production: đọc từ R2
  if (c.env.CONTENT) {
    const r2Key = getBlogPostR2Key(slug);
    const obj = await c.env.CONTENT.get(r2Key);
    if (obj) {
      const markdown = await obj.text();
      return c.json({ slug, markdown, source: "r2" });
    }
    // Thử tìm trong các thư mục con (toan/, tieng-anh/)
    for (const subdir of ["toan", "tieng-anh", "other"]) {
      const key = `blog/posts/${subdir}/${slug}.md`;
      const obj2 = await c.env.CONTENT.get(key);
      if (obj2) {
        const markdown = await obj2.text();
        return c.json({ slug, markdown, source: "r2" });
      }
    }
  }

  // Local dev fallback: Cache để tránh đọc file nhiều lần
  if (LOCAL_BLOG_POSTS[slug]) {
    return c.json({ slug, markdown: LOCAL_BLOG_POSTS[slug], source: "local" });
  }

  // Thử dynamic import cho local dev
  const subdirs = ["toan", "tieng-anh", "other"];
  for (const subdir of subdirs) {
    try {
      const mod = await import(
        `../../../content/blog/${subdir}/${slug}.md?raw`
      );
      LOCAL_BLOG_POSTS[slug] = mod.default;
      return c.json({ slug, markdown: mod.default, source: "local" });
    } catch { /* thử thư mục tiếp */ }
  }

  return c.json({ error: `Blog post "${slug}" not found` }, 404);
});
