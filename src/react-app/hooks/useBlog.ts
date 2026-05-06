/**
 * useBlog.ts — Custom hook cho hệ thống Blog "Kiến Thức"
 *
 * Fetch blog-index.json từ /api/blog/index
 * Cung cấp state: posts, filtered posts, active tab, active category, active tags
 */

import { useState, useEffect, useMemo } from "react";
import type { BlogPostMeta, BlogTab, BlogCategory } from "../types/blog";

interface UseBlogState {
  posts: BlogPostMeta[];
  loading: boolean;
  error: string | null;
}

interface UseBlogFilters {
  activeTab: BlogTab;
  activeCategory: BlogCategory | "all";
  activeTags: string[];
  searchQuery: string;
}

export interface UseBlogReturn {
  // Data
  allPosts: BlogPostMeta[];
  filteredPosts: BlogPostMeta[];
  loading: boolean;
  error: string | null;
  // Filters
  activeTab: BlogTab;
  activeCategory: BlogCategory | "all";
  activeTags: string[];
  searchQuery: string;
  // Derived
  availableTags: string[];
  totalFiltered: number;
  // Actions
  setTab: (tab: BlogTab) => void;
  setCategory: (cat: BlogCategory | "all") => void;
  toggleTag: (tag: string) => void;
  clearTags: () => void;
  setSearchQuery: (q: string) => void;
}

export function useBlog(): UseBlogReturn {
  const [state, setState] = useState<UseBlogState>({
    posts: [],
    loading: true,
    error: null,
  });

  const [filters, setFilters] = useState<UseBlogFilters>({
    activeTab: "kids",
    activeCategory: "all",
    activeTags: [],
    searchQuery: "",
  });

  // Fetch danh sách bài viết từ Worker API
  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    fetch("/api/blog/index")
      .then((r) => {
        if (!r.ok) throw new Error("Không thể tải danh sách bài viết");
        return r.json() as Promise<{ posts: BlogPostMeta[]; total: number }>;
      })
      .then((data) => {
        if (!cancelled) {
          setState({ posts: data.posts ?? [], loading: false, error: null });
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setState({ posts: [], loading: false, error: err.message });
        }
      });

    return () => { cancelled = true; };
  }, []);

  // ─── Lọc bài viết theo tab + category + tags + search ──────────────────────
  const filteredPosts = useMemo(() => {
    return state.posts.filter((post) => {
      // Filter 1: Tab (kids / parents)
      if (post.tab !== filters.activeTab) return false;

      // Filter 2: Category (all / toan / tieng-anh / other)
      if (filters.activeCategory !== "all" && post.category !== filters.activeCategory) return false;

      // Filter 3: Tags (phải chứa TẤT CẢ các tag đang active)
      if (filters.activeTags.length > 0) {
        const postTags = post.tags ?? [];
        const hasAllTags = filters.activeTags.every((t) => postTags.includes(t));
        if (!hasAllTags) return false;
      }

      // Filter 4: Search (tìm trong title + description)
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const inTitle = post.title?.toLowerCase().includes(q);
        const inDesc = post.description?.toLowerCase().includes(q);
        if (!inTitle && !inDesc) return false;
      }

      return true;
    });
  }, [state.posts, filters]);

  // ─── Lấy danh sách tags từ các bài đã lọc theo tab + category ──────────────
  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    state.posts
      .filter((p) => p.tab === filters.activeTab &&
        (filters.activeCategory === "all" || p.category === filters.activeCategory))
      .forEach((p) => (p.tags ?? []).forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [state.posts, filters.activeTab, filters.activeCategory]);

  // ─── Actions ─────────────────────────────────────────────────────────────────
  function setTab(tab: BlogTab) {
    setFilters((f) => ({ ...f, activeTab: tab, activeCategory: "all", activeTags: [] }));
  }

  function setCategory(cat: BlogCategory | "all") {
    setFilters((f) => ({ ...f, activeCategory: cat, activeTags: [] }));
  }

  function toggleTag(tag: string) {
    setFilters((f) => ({
      ...f,
      activeTags: f.activeTags.includes(tag)
        ? f.activeTags.filter((t) => t !== tag)
        : [...f.activeTags, tag],
    }));
  }

  function clearTags() {
    setFilters((f) => ({ ...f, activeTags: [] }));
  }

  function setSearchQuery(q: string) {
    setFilters((f) => ({ ...f, searchQuery: q }));
  }

  return {
    allPosts: state.posts,
    filteredPosts,
    loading: state.loading,
    error: state.error,
    activeTab: filters.activeTab,
    activeCategory: filters.activeCategory,
    activeTags: filters.activeTags,
    searchQuery: filters.searchQuery,
    availableTags,
    totalFiltered: filteredPosts.length,
    setTab,
    setCategory,
    toggleTag,
    clearTags,
    setSearchQuery,
  };
}
