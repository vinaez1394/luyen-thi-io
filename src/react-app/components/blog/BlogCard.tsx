/**
 * BlogCard.tsx — Thẻ hiển thị 1 bài viết trong danh sách Blog
 *
 * Hiển thị: Ảnh bìa (với fallback theo category), Tiêu đề, Mô tả, Tags, Thời gian đọc
 */

import { useNavigate } from "react-router-dom";
import type { BlogPostMeta } from "../../types/blog";
import { getCoverImage } from "../../types/blog";
import "./BlogCard.css";

interface BlogCardProps {
  post: BlogPostMeta;
  onTagClick?: (tag: string) => void;
}

// ─── Emoji đại diện cho từng Category ────────────────────────────────────────
const CATEGORY_EMOJI: Record<string, string> = {
  toan: "🧮",
  "tieng-anh": "🇬🇧",
  other: "📖",
};

export function BlogCard({ post, onTagClick }: BlogCardProps) {
  const navigate = useNavigate();
  const coverImg = getCoverImage(post);
  const categoryEmoji = CATEGORY_EMOJI[post.category] ?? "📖";

  function handleClick() {
    navigate(`/kien-thuc/${post.slug}`);
  }

  return (
    <article
      className={`blog-card ${post.is_featured ? "blog-card--featured" : ""}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      id={`blog-card-${post.slug}`}
      aria-label={`Đọc bài: ${post.title}`}
    >
      {/* Ảnh bìa */}
      <div className="blog-card__cover">
        <img
          src={coverImg}
          alt={post.title}
          className="blog-card__cover-img"
          loading="lazy"
          onError={(e) => {
            // Fallback nếu ảnh R2 không load được
            const target = e.currentTarget;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.setAttribute("data-fallback", "true");
              const emoji = document.createElement("span");
              emoji.className = "blog-card__cover-emoji";
              emoji.textContent = categoryEmoji;
              parent.appendChild(emoji);
            }
          }}
        />

        {/* Badge nổi bật */}
        {post.is_featured && (
          <span className="blog-card__featured-badge">⭐ Nổi bật</span>
        )}

        {/* Badge Tab */}
        <span className={`blog-card__tab-badge blog-card__tab-badge--${post.tab}`}>
          {post.tab === "kids" ? "🦸 Cho Bé" : "👨‍👩‍👧 Ba Mẹ"}
        </span>
      </div>

      {/* Nội dung */}
      <div className="blog-card__body">
        {/* Category breadcrumb */}
        <div className="blog-card__meta-top">
          <span className="blog-card__category">
            {categoryEmoji} {post.subcategory || post.category}
          </span>
          <span className="blog-card__reading-time">
            ⏱ {post.reading_time} phút
          </span>
        </div>

        {/* Tiêu đề */}
        <h3 className="blog-card__title">{post.title}</h3>

        {/* Mô tả */}
        <p className="blog-card__desc">{post.description}</p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="blog-card__tags">
            {post.tags.slice(0, 4).map((tag) => (
              <button
                key={tag}
                className="blog-card__tag"
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick?.(tag);
                }}
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="blog-card__footer">
          <span className="blog-card__date">
            {new Date(post.published_date).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
          {post.quiz_id && (
            <span className="blog-card__has-quiz" title="Có bài tập thực hành">
              🎮 Có Quiz
            </span>
          )}
          <span className="blog-card__arrow">Đọc ngay →</span>
        </div>
      </div>
    </article>
  );
}
