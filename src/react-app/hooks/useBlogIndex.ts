/**
 * useBlogIndex.ts — Hook nhẹ: chỉ fetch danh sách bài viết (không filter)
 *
 * Dùng cho BlogDetailPage để lấy:
 * - Related posts (cùng category)
 * - Title của prev/next post để hiển thị trong navigation
 */

import { useState, useEffect } from "react";
import type { BlogPostMeta } from "../types/blog";

interface UseBlogIndexReturn {
  posts: BlogPostMeta[];
  loading: boolean;
  getPostBySlug: (slug: string) => BlogPostMeta | undefined;
  getRelatedPosts: (currentSlug: string, category: string, limit?: number) => BlogPostMeta[];
}

export function useBlogIndex(): UseBlogIndexReturn {
  const [posts, setPosts] = useState<BlogPostMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blog/index")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { posts: BlogPostMeta[] }) => {
        if (!cancelled) {
          setPosts(data.posts ?? []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  function getPostBySlug(slug: string): BlogPostMeta | undefined {
    return posts.find((p) => p.slug === slug);
  }

  // Lấy tối đa `limit` bài cùng category, bỏ bài hiện tại, mới nhất trước
  function getRelatedPosts(currentSlug: string, category: string, limit = 5): BlogPostMeta[] {
    return posts
      .filter((p) => p.slug !== currentSlug && p.category === category)
      .sort((a, b) => (b.published_date ?? "").localeCompare(a.published_date ?? ""))
      .slice(0, limit);
  }

  return { posts, loading, getPostBySlug, getRelatedPosts };
}
