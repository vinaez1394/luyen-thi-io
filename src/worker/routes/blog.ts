/**
 * blog.ts — Route API cho hệ thống Blog "Kiến Thức"
 *
 * GET /api/blog/index       → Danh sách metadata bài viết (blog-index.json)
 * GET /api/blog/:slug       → Full content 1 bài viết (frontmatter + body)
 *
 * Chiến lược:
 *   - Production: Đọc từ Cloudflare R2 bucket (CONTENT)
 *   - Local Dev:  Đọc từ blog-posts-dev.json (sinh bởi npm run blog:index)
 */

import { Hono } from "hono";

// ─── Local Dev Fallback — Import JSON (Wrangler handles JSON fine) ────────────
// blog-index.json: metadata cho trang danh sách
// blog-posts-dev.json: full content cho trang detail
let LOCAL_BLOG_INDEX: object | null = null;
let LOCAL_BLOG_POSTS_DEV: Record<
  string,
  { frontmatter: object; content: string }
> | null = null;

try {
  const idx = await import("../../../content/blog/blog-index.json", {
    assert: { type: "json" },
  });
  LOCAL_BLOG_INDEX = idx.default;
} catch { /* Production: dùng R2 */ }

try {
  const dev = await import("../../../content/blog/blog-posts-dev.json", {
    assert: { type: "json" },
  });
  LOCAL_BLOG_POSTS_DEV = dev.default as Record<
    string,
    { frontmatter: object; content: string }
  >;
} catch { /* Production: dùng R2 */ }

// ─── R2 Key helpers ──────────────────────────────────────────────────────────
function getBlogIndexR2Key(): string {
  return "blog/blog-index.json";
}

function getBlogPostR2KeyCandidates(slug: string): string[] {
  return [
    `blog/posts/${slug}.md`,
    `blog/posts/toan/${slug}.md`,
    `blog/posts/tieng-anh/${slug}.md`,
    `blog/posts/other/${slug}.md`,
  ];
}

// ─── Parse Frontmatter + Content từ raw markdown ─────────────────────────────
function parseMarkdown(rawMd: string): { frontmatter: Record<string, unknown>; content: string } {
  const match = rawMd.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, content: rawMd.trim() };

  const yamlStr = match[1];
  const content = match[2].trim();
  const frontmatter: Record<string, unknown> = {};

  for (const line of yamlStr.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value: unknown = line.slice(colonIdx + 1).trim();

    if (typeof value === "string") {
      if (value.startsWith("[") && value.endsWith("]")) {
        value = value.slice(1, -1).split(",").map((v) => v.trim().replace(/^["']|["']$/g, ""));
      } else if (value === "true") value = true;
      else if (value === "false") value = false;
      else if (value !== "" && !isNaN(Number(value))) value = Number(value);
      else value = (value as string).replace(/^["']|["']$/g, "");
    }
    frontmatter[key] = value;
  }

  return { frontmatter, content };
}

// ─── Hono App ────────────────────────────────────────────────────────────────
export const blogRoutes = new Hono<{ Bindings: Env }>();

/**
 * GET /api/blog/index
 * Trả về toàn bộ metadata bài viết (không có content body).
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

  // Local dev
  if (LOCAL_BLOG_INDEX) return c.json(LOCAL_BLOG_INDEX);

  return c.json({ error: "Blog index not found. Run: npm run blog:index", total: 0, posts: [] }, 404);
});

/**
 * GET /api/blog/:slug
 * Trả về { slug, frontmatter, content } cho 1 bài viết.
 * content = Markdown body (đã bóc frontmatter).
 */
blogRoutes.get("/:slug", async (c) => {
  const slug = c.req.param("slug");

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return c.json({ error: "Invalid slug" }, 400);
  }

  // Production: đọc từ R2 (raw markdown) → parse tại đây
  if (c.env.CONTENT) {
    for (const r2Key of getBlogPostR2KeyCandidates(slug)) {
      const obj = await c.env.CONTENT.get(r2Key);
      if (obj) {
        const rawMd = await obj.text();
        const { frontmatter, content } = parseMarkdown(rawMd);
        return c.json({ slug, frontmatter, content });
      }
    }
  }

  // Local dev: dùng blog-posts-dev.json
  if (LOCAL_BLOG_POSTS_DEV && LOCAL_BLOG_POSTS_DEV[slug]) {
    const { frontmatter, content } = LOCAL_BLOG_POSTS_DEV[slug];
    return c.json({ slug, frontmatter, content });
  }

  return c.json({ error: `Blog post "${slug}" not found. Run: npm run blog:index` }, 404);
});
