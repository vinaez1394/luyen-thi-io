/**
 * BlogDetailPage.tsx — Trang đọc bài viết /kien-thuc/:slug
 *
 * Layout:
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Breadcrumb: ← Kiến Thức / Toán Học / Bài Toán Trồng Cây  │
 * ├─────────────────────────────────────┬───────────────────────┤
 * │  ARTICLE                            │  TOC (sticky)         │
 * │  - Cover image (R2 hoặc placeholder)│  - H2 active          │
 * │  - H1 Title                         │    - H3               │
 * │  - Meta (ngày, thời gian, tags)     │                       │
 * │  - Markdown content                 │                       │
 * │  - Quiz CTA Box (nếu có quiz_id)    │                       │
 * │  - ← Bài trước | Bài tiếp →       │                       │
 * └─────────────────────────────────────┴───────────────────────┘
 */

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { useBlogPost, slugifyHeading } from "../hooks/useBlogPost";
import { useBlogIndex }               from "../hooks/useBlogIndex";
import { TableOfContents }            from "../components/blog/TableOfContents";
import { RelatedPosts }               from "../components/blog/RelatedPosts";
import { getCoverImage } from "../types/blog";
import "./BlogDetailPage.css";

// ─── Custom Markdown components ───────────────────────────────────────────────
// Tự thêm id cho heading để TOC link hoạt động
// Xử lý ảnh thiếu → hiển thị placeholder

const MarkdownComponents: Components = {
  // H2 — thêm id để TOC có thể scroll đến
  h2: ({ children, ...props }) => {
    const text = String(children ?? "");
    const id = slugifyHeading(text);
    return <h2 id={id} className="md-h2" {...props}>{children}</h2>;
  },
  // H3
  h3: ({ children, ...props }) => {
    const text = String(children ?? "");
    const id = slugifyHeading(text);
    return <h3 id={id} className="md-h3" {...props}>{children}</h3>;
  },
  // Ảnh — fallback placeholder nếu src rỗng hoặc lỗi
  img: ({ src, alt, ...props }) => {
    const isEmpty = !src || src.trim() === "" || src === "PLACEHOLDER";
    if (isEmpty) {
      return (
        <span className="md-img-placeholder" role="img" aria-label={alt ?? "Hình ảnh"}>
          <span className="md-img-placeholder__icon">🖼️</span>
          <span className="md-img-placeholder__text">
            {alt ? `[${alt}]` : "Đang cập nhật hình ảnh"}
          </span>
        </span>
      );
    }
    return (
      <img
        src={src}
        alt={alt ?? ""}
        className="md-img"
        loading="lazy"
        onError={(e) => {
          const el = e.currentTarget;
          el.style.display = "none";
          const placeholder = document.createElement("span");
          placeholder.className = "md-img-placeholder";
          placeholder.innerHTML = `<span class="md-img-placeholder__icon">🖼️</span><span class="md-img-placeholder__text">${alt ? `[${alt}]` : "Đang cập nhật hình ảnh"}</span>`;
          el.parentNode?.insertBefore(placeholder, el.nextSibling);
        }}
        {...props}
      />
    );
  },
  // Link — mở link ngoài trong tab mới
  a: ({ href, children, ...props }) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="md-link"
        {...props}
      >
        {children}
      </a>
    );
  },
  // Blockquote — styled callout
  blockquote: ({ children, ...props }) => (
    <blockquote className="md-blockquote" {...props}>{children}</blockquote>
  ),
  // Code block
  code: ({ children, className, ...props }) => {
    const isBlock = className?.startsWith("language-");
    if (isBlock) {
      return <code className={`md-code-block ${className ?? ""}`} {...props}>{children}</code>;
    }
    return <code className="md-code-inline" {...props}>{children}</code>;
  },
  // Table
  table: ({ children, ...props }) => (
    <div className="md-table-wrap">
      <table className="md-table" {...props}>{children}</table>
    </div>
  ),
};

// ─── Emoji theo category ──────────────────────────────────────────────────────
const CATEGORY_LABEL: Record<string, string> = {
  toan: "🧮 Toán Học",
  "tieng-anh": "🇬🇧 Tiếng Anh",
  other: "📖 Kiến Thức",
};

// ─── Component chính ──────────────────────────────────────────────────────────
export function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { frontmatter, content, toc, loading, error } = useBlogPost(slug);

  // Fetch blog index nhẹ để lấy title prev/next + related posts
  const { getPostBySlug, getRelatedPosts } = useBlogIndex();

  // ── Cập nhật document title (SEO) ──
  useEffect(() => {
    if (frontmatter?.title) {
      document.title = `${frontmatter.title} | Kiến Thức — Luyện Thi`;
    }
    return () => {
      document.title = "Kho Kiến Thức | Luyện Thi";
    };
  }, [frontmatter?.title]);

  // ── LOADING ──
  if (loading) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail__loading">
          <div className="blog-detail__spinner" />
          <p>Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  // ── ERROR ──
  if (error || !frontmatter) {
    return (
      <div className="blog-detail-page">
        <div className="blog-detail__error">
          <span className="blog-detail__error-emoji">😔</span>
          <h2>Không tìm thấy bài viết</h2>
          <p>{error ?? "Bài viết này không tồn tại hoặc đã bị xóa."}</p>
          <button
            className="blog-detail__back-btn"
            onClick={() => navigate("/kien-thuc")}
            id="btn-back-to-blog"
          >
            ← Quay lại Kiến Thức
          </button>
        </div>
      </div>
    );
  }

  const coverImg = getCoverImage(frontmatter);
  const hasCover = frontmatter.cover_image && frontmatter.cover_image.trim() !== "";

  return (
    <div className="blog-detail-page">

      {/* ── Breadcrumb ── */}
      <div className="blog-detail__breadcrumb">
        <button onClick={() => navigate("/kien-thuc")} className="blog-detail__breadcrumb-link" id="btn-breadcrumb-blog">
          📖 Kiến Thức
        </button>
        <span className="blog-detail__breadcrumb-sep">›</span>
        <span className="blog-detail__breadcrumb-cat">
          {CATEGORY_LABEL[frontmatter.category] ?? frontmatter.category}
        </span>
        <span className="blog-detail__breadcrumb-sep">›</span>
        <span className="blog-detail__breadcrumb-current">{frontmatter.title}</span>
      </div>

      {/* ── Main layout ── */}
      <div className="blog-detail__layout">

        {/* ─── ARTICLE ─── */}
        <article className="blog-detail__article">

          {/* Ảnh bìa */}
          <div className={`blog-detail__cover ${!hasCover ? "blog-detail__cover--placeholder" : ""}`}>
            <img
              src={coverImg}
              alt={frontmatter.title}
              className="blog-detail__cover-img"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>

          {/* Header bài viết */}
          <header className="blog-detail__header">
            {/* Tags */}
            <div className="blog-detail__tags">
              {(frontmatter.tags ?? []).map((tag) => (
                <button
                  key={tag}
                  className="blog-detail__tag"
                  onClick={() => navigate(`/kien-thuc?tag=${encodeURIComponent(tag)}`)}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Tiêu đề H1 */}
            <h1 className="blog-detail__title">{frontmatter.title}</h1>

            {/* Mô tả */}
            <p className="blog-detail__description">{frontmatter.description}</p>

            {/* Meta row */}
            <div className="blog-detail__meta">
              <span className="blog-detail__meta-item">
                📅 {new Date(frontmatter.published_date).toLocaleDateString("vi-VN", {
                  day: "2-digit", month: "long", year: "numeric",
                })}
              </span>
              <span className="blog-detail__meta-sep">·</span>
              <span className="blog-detail__meta-item">⏱ {frontmatter.reading_time} phút đọc</span>
              {frontmatter.grade_target && (
                <>
                  <span className="blog-detail__meta-sep">·</span>
                  <span className="blog-detail__meta-item">🎯 Lớp {frontmatter.grade_target}</span>
                </>
              )}
              {frontmatter.author && (
                <>
                  <span className="blog-detail__meta-sep">·</span>
                  <span className="blog-detail__meta-item">✍️ {frontmatter.author}</span>
                </>
              )}
            </div>
          </header>

          {/* ── Markdown Content ── */}
          <div className="blog-detail__content prose">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={MarkdownComponents}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* ── Quiz CTA ── */}
          {frontmatter.quiz_id && (
            <div className="blog-detail__quiz-cta" id="blog-quiz-cta">
              <div className="blog-detail__quiz-cta-inner">
                <span className="blog-detail__quiz-cta-emoji">🎮</span>
                <div>
                  <p className="blog-detail__quiz-cta-title">Thử thách ngay!</p>
                  <p className="blog-detail__quiz-cta-sub">
                    Bài tập thực hành để củng cố kiến thức vừa học
                  </p>
                </div>
                <button
                  className="blog-detail__quiz-btn"
                  onClick={() => navigate(`/quiz/${frontmatter.quiz_id}`)}
                  id={`btn-quiz-${frontmatter.quiz_id}`}
                >
                  Làm bài →
                </button>
              </div>
            </div>
          )}

          {/* ── Điều hướng ← Bài trước | Bài tiếp → ── */}
          <nav className="blog-detail__nav" aria-label="Điều hướng bài viết">
            {frontmatter.prev_post ? (() => {
              const prevMeta = getPostBySlug(frontmatter.prev_post);
              return (
                <button
                  className="blog-detail__nav-btn blog-detail__nav-btn--prev"
                  onClick={() => navigate(`/kien-thuc/${frontmatter.prev_post}`)}
                  id="btn-prev-post"
                >
                  <span className="blog-detail__nav-arrow">←</span>
                  <span className="blog-detail__nav-label">
                    <span className="blog-detail__nav-hint">Bài trước</span>
                    {prevMeta?.title && (
                      <span className="blog-detail__nav-title">{prevMeta.title}</span>
                    )}
                  </span>
                </button>
              );
            })() : (
              <div /> /* spacer */
            )}

            <button
              className="blog-detail__nav-all"
              onClick={() => navigate("/kien-thuc")}
              id="btn-nav-back-all"
            >
              📚 Tất cả bài viết
            </button>

            {frontmatter.next_post ? (() => {
              const nextMeta = getPostBySlug(frontmatter.next_post);
              return (
                <button
                  className="blog-detail__nav-btn blog-detail__nav-btn--next"
                  onClick={() => navigate(`/kien-thuc/${frontmatter.next_post}`)}
                  id="btn-next-post"
                >
                  <span className="blog-detail__nav-label">
                    <span className="blog-detail__nav-hint">Bài tiếp</span>
                    {nextMeta?.title && (
                      <span className="blog-detail__nav-title">{nextMeta.title}</span>
                    )}
                  </span>
                  <span className="blog-detail__nav-arrow">→</span>
                </button>
              );
            })() : (
              <div /> /* spacer */
            )}
          </nav>
        </article>

        {/* ─── TOC Sidebar ─── */}
        <aside className="blog-detail__toc-sidebar" aria-label="Mục lục">
          <TableOfContents items={toc} />
          {/* Related posts — hiển thị sau khi index load xong */}
          <RelatedPosts
            posts={getRelatedPosts(slug ?? "", frontmatter.category)}
            currentSlug={slug ?? ""}
          />
        </aside>

      </div>
    </div>
  );
}
