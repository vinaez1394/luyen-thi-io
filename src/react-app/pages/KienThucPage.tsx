/**
 * KienThucPage.tsx — Trang /kien-thuc
 *
 * Layout:
 * ┌─────────────────────────────────────────────────────┐
 * │  Hero Header (Tiêu đề + 2 Tabs: Ba Mẹ | Cho Bé)   │
 * ├──────────────┬──────────────────────────────────────┤
 * │  Sidebar     │  Tag Filter (horizontal scroll)       │
 * │  - Tất cả   │  ─────────────────────────────────── │
 * │  - Toán      │  Grid bài viết (2 cột → 1 cột mobile) │
 * │  - Tiếng Anh │                                       │
 * └──────────────┴──────────────────────────────────────┘
 */

import { useBlog } from "../hooks/useBlog";
import { BlogCard } from "../components/blog/BlogCard";
import type { BlogCategory } from "../types/blog";
import "./KienThucPage.css";

// ─── Cấu hình Categories cho Sidebar ────────────────────────────────────────
const CATEGORIES: { id: BlogCategory | "all"; label: string; emoji: string }[] = [
  { id: "all",        label: "Tất cả",       emoji: "📚" },
  { id: "toan",       label: "Toán Học",      emoji: "🧮" },
  { id: "tieng-anh",  label: "Tiếng Anh",     emoji: "🇬🇧" },
  { id: "other",      label: "Kỹ năng khác",  emoji: "💡" },
];

export function KienThucPage() {
  const blog = useBlog();

  return (
    <div className="kienthuc-page">

      {/* ── HERO HEADER ── */}
      <div className="kienthuc-page__hero">
        <div className="kienthuc-page__hero-inner">
          <div className="kienthuc-page__hero-text">
            <h1 className="kienthuc-page__hero-title">
              📖 Kho Kiến Thức
            </h1>
            <p className="kienthuc-page__hero-subtitle">
              Bài viết chuyên sâu về toán tư duy, tiếng Anh Cambridge, và luyện thi lớp 6
            </p>
          </div>

          {/* Search bar */}
          <div className="kienthuc-page__search-wrap">
            <input
              type="text"
              className="kienthuc-page__search"
              placeholder="🔍 Tìm bài viết..."
              value={blog.searchQuery}
              onChange={(e) => blog.setSearchQuery(e.target.value)}
              id="blog-search-input"
            />
          </div>
        </div>

        {/* ── 2 TABS ── */}
        <div className="kienthuc-page__tabs" role="tablist">
          <button
            className={`kienthuc-page__tab ${blog.activeTab === "kids" ? "kienthuc-page__tab--active" : ""}`}
            onClick={() => blog.setTab("kids")}
            role="tab"
            aria-selected={blog.activeTab === "kids"}
            id="tab-kids"
          >
            🦸 Góc Học Tập cho Bé
          </button>
          <button
            className={`kienthuc-page__tab ${blog.activeTab === "parents" ? "kienthuc-page__tab--active" : ""}`}
            onClick={() => blog.setTab("parents")}
            role="tab"
            aria-selected={blog.activeTab === "parents"}
            id="tab-parents"
          >
            👨‍👩‍👧 Dành cho Ba Mẹ
          </button>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="kienthuc-page__layout">

        {/* ── SIDEBAR ── */}
        <aside className="kienthuc-page__sidebar" aria-label="Danh mục bài viết">
          <p className="kienthuc-page__sidebar-title">📂 Danh mục</p>
          <nav>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`kienthuc-page__sidebar-item ${blog.activeCategory === cat.id ? "kienthuc-page__sidebar-item--active" : ""}`}
                onClick={() => blog.setCategory(cat.id)}
                id={`sidebar-cat-${cat.id}`}
              >
                <span className="kienthuc-page__sidebar-emoji">{cat.emoji}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── NỘI DUNG CHÍNH ── */}
        <div className="kienthuc-page__content">

          {/* Tag Filter */}
          {blog.availableTags.length > 0 && (
            <div className="kienthuc-page__tags-wrap">
              <div className="kienthuc-page__tags-scroll">
                {blog.activeTags.length > 0 && (
                  <button
                    className="kienthuc-page__tag kienthuc-page__tag--clear"
                    onClick={blog.clearTags}
                    id="btn-clear-tags"
                  >
                    ✕ Xóa bộ lọc
                  </button>
                )}
                {blog.availableTags.map((tag) => (
                  <button
                    key={tag}
                    className={`kienthuc-page__tag ${blog.activeTags.includes(tag) ? "kienthuc-page__tag--active" : ""}`}
                    onClick={() => blog.toggleTag(tag)}
                    id={`tag-filter-${tag.replace(/[^a-z0-9]/gi, "-")}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Số kết quả */}
          {!blog.loading && (
            <p className="kienthuc-page__result-count">
              {blog.totalFiltered === 0
                ? "Không có bài viết nào"
                : `${blog.totalFiltered} bài viết`}
            </p>
          )}

          {/* Loading */}
          {blog.loading && (
            <div className="kienthuc-page__loading" aria-live="polite">
              <div className="kienthuc-page__spinner" />
              <p>Đang tải bài viết...</p>
            </div>
          )}

          {/* Error */}
          {blog.error && !blog.loading && (
            <div className="kienthuc-page__error" role="alert">
              <span>😔</span>
              <p>{blog.error}</p>
              <button onClick={() => window.location.reload()} className="kienthuc-page__retry-btn">
                Thử lại
              </button>
            </div>
          )}

          {/* Empty state */}
          {!blog.loading && !blog.error && blog.totalFiltered === 0 && (
            <div className="kienthuc-page__empty">
              <span className="kienthuc-page__empty-emoji">📭</span>
              <p className="kienthuc-page__empty-title">Chưa có bài viết nào</p>
              <p className="kienthuc-page__empty-sub">
                {blog.activeTags.length > 0
                  ? "Thử xóa bộ lọc để xem nhiều bài hơn"
                  : "Nội dung đang được chuẩn bị, quay lại sớm nhé!"}
              </p>
              {blog.activeTags.length > 0 && (
                <button onClick={blog.clearTags} className="kienthuc-page__retry-btn">
                  Xóa bộ lọc
                </button>
              )}
            </div>
          )}

          {/* Grid bài viết */}
          {!blog.loading && !blog.error && blog.totalFiltered > 0 && (
            <div className="kienthuc-page__grid" role="feed" aria-label="Danh sách bài viết">
              {blog.filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onTagClick={blog.toggleTag}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
