/**
 * RelatedPosts.tsx — Widget "Bài viết liên quan" trong sidebar
 *
 * Hiển thị tối đa 5 bài cùng category, mới nhất trước.
 * Đặt bên dưới TableOfContents trong TOC sidebar.
 */

import { useNavigate } from "react-router-dom";
import type { BlogPostMeta } from "../../types/blog";
import "./RelatedPosts.css";

// Emoji icon theo category
const CATEGORY_EMOJI: Record<string, string> = {
  toan: "🧮",
  "tieng-anh": "🇬🇧",
  other: "📖",
};

interface RelatedPostsProps {
  posts: BlogPostMeta[];
  currentSlug: string;
}

export function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
  const navigate = useNavigate();

  if (posts.length === 0) return null;

  return (
    <div className="related-posts">
      <p className="related-posts__title">🔗 Bài viết liên quan</p>
      <ul className="related-posts__list">
        {posts.map((post) => {
          const emoji = CATEGORY_EMOJI[post.category] ?? "📖";
          const isActive = post.slug === currentSlug; // không bao giờ true vì filter rồi

          return (
            <li
              key={post.slug}
              className={`related-posts__item ${isActive ? "related-posts__item--active" : ""}`}
            >
              <button
                className="related-posts__link"
                onClick={() => navigate(`/kien-thuc/${post.slug}`)}
                id={`btn-related-${post.slug}`}
              >
                <span className="related-posts__emoji">{emoji}</span>
                <span className="related-posts__text">
                  <span className="related-posts__post-title">{post.title}</span>
                  <span className="related-posts__meta">
                    ⏱ {post.reading_time} phút
                    {post.published_date && (
                      <> · {new Date(post.published_date).toLocaleDateString("vi-VN", { day: "2-digit", month: "numeric" })}</>
                    )}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
