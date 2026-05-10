/**
 * useBlogPost.ts — Hook fetch nội dung 1 bài viết chi tiết
 *
 * Gọi /api/blog/:slug → nhận { slug, frontmatter, content }
 * Content là Markdown body (đã bóc frontmatter).
 * Tự động parse Table of Contents từ heading H2/H3.
 */

import { useState, useEffect, useMemo } from "react";
import type { BlogPostDetail, BlogFrontmatter, TocItem } from "../types/blog";

interface UseBlogPostState {
  post: BlogPostDetail | null;
  loading: boolean;
  error: string | null;
}

export interface UseBlogPostReturn {
  frontmatter: BlogFrontmatter | null;
  content: string;
  toc: TocItem[];
  loading: boolean;
  error: string | null;
}

// ─── Parse TOC từ Markdown content ───────────────────────────────────────────
// Quét các dòng ## và ### → sinh list TocItem với id slug-ified
export function parseToc(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: TocItem[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = slugifyHeading(text);
    items.push({ id, text, level });
  }

  return items;
}

// Chuyển text heading → id DOM an toàn (slug)
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Bỏ dấu tiếng Việt
    .replace(/[^a-z0-9\s-]/g, "")    // Chỉ giữ a-z, 0-9, space, -
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function useBlogPost(slug: string | undefined): UseBlogPostReturn {
  const [state, setState] = useState<UseBlogPostState>({
    post: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!slug) {
      setState({ post: null, loading: false, error: "Slug không hợp lệ" });
      return;
    }

    let cancelled = false;
    setState({ post: null, loading: true, error: null });

    fetch(`/api/blog/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 404 ? "Không tìm thấy bài viết" : "Lỗi tải bài viết");
        return r.json() as Promise<BlogPostDetail>;
      })
      .then((data) => {
        if (!cancelled) setState({ post: data, loading: false, error: null });
      })
      .catch((err: Error) => {
        if (!cancelled) setState({ post: null, loading: false, error: err.message });
      });

    return () => { cancelled = true; };
  }, [slug]);

  // Parse TOC mỗi khi content thay đổi
  const toc = useMemo(
    () => (state.post?.content ? parseToc(state.post.content) : []),
    [state.post?.content]
  );

  return {
    frontmatter: state.post?.frontmatter ?? null,
    content: state.post?.content ?? "",
    toc,
    loading: state.loading,
    error: state.error,
  };
}
