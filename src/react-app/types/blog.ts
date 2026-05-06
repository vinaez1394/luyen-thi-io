/**
 * blog.ts — TypeScript types cho hệ thống Blog "Kiến Thức"
 *
 * Cấu trúc bài viết dựa trên Markdown với Frontmatter YAML.
 * Mỗi file .md trong content/blog/ sẽ được parse theo schema này.
 */

// ─── Tab phân loại độc giả ─────────────────────────────────────────────────
export type BlogTab = "kids" | "parents";

// ─── Môn học (Category) ────────────────────────────────────────────────────
export type BlogCategory = "toan" | "tieng-anh" | "other";

// ─── Frontmatter — Phần khai báo đầu file .md ──────────────────────────────
export interface BlogFrontmatter {
  /** ID duy nhất của bài viết, dùng làm slug URL */
  id: string;
  /** Tiêu đề bài viết (dùng cho <title> SEO) */
  title: string;
  /** Mô tả ngắn (dùng cho <meta description> SEO, ~150 ký tự) */
  description: string;
  /** Đối tượng đọc: "kids" (Tab Góc Bé) | "parents" (Tab Ba Mẹ) */
  tab: BlogTab;
  /** Môn học chính */
  category: BlogCategory;
  /** Phân môn nhỏ hơn (VD: "toan-tu-duy-logic", "flyers") */
  subcategory: string;
  /** Danh sách thẻ tag, VD: ["#ToanLogic", "#TrongCay"] */
  tags: string[];
  /** Tên tác giả */
  author: string;
  /** Ngày xuất bản (định dạng YYYY-MM-DD) */
  published_date: string;
  /**
   * Link ảnh bìa (lưu trên Cloudflare R2).
   * Nếu để trống "", hệ thống sẽ dùng ảnh mặc định theo category.
   */
  cover_image: string;
  /**
   * ID bài Quiz liên kết (lấy từ subjects.ts).
   * Dùng để hiển thị nút CTA "🎮 Thử thách ngay".
   * Để trống "" nếu không có quiz liên kết.
   */
  quiz_id: string;
  /** Slug của bài viết trước (dùng cho điều hướng ← Bài trước) */
  prev_post: string;
  /** Slug của bài viết tiếp theo (dùng cho điều hướng Bài tiếp →) */
  next_post: string;
  /** Thời gian đọc ước tính (phút) */
  reading_time: number;
  /** Cấp học phù hợp, VD: "3-5", "5-6" */
  grade_target: string;
  /** Bài nổi bật (hiển thị ưu tiên trên trang chủ blog) */
  is_featured: boolean;
}

// ─── Blog Post đầy đủ (Frontmatter + Nội dung) ────────────────────────────
export interface BlogPost extends BlogFrontmatter {
  /** Nội dung Markdown thô (sau khi bóc tách frontmatter) */
  content: string;
  /** Slug URL = id của bài viết */
  slug: string;
}

// ─── Blog Post Index (Dùng cho trang danh sách — KHÔNG chứa content) ───────
/** Chỉ lưu metadata, không lưu nội dung. Dùng để load danh sách nhanh. */
export type BlogPostMeta = Omit<BlogPost, "content">;

// ─── Blog Index File (blog-index.json) ────────────────────────────────────
export interface BlogIndex {
  /** Thời điểm tạo index (Unix timestamp) */
  generated_at: string;
  /** Tổng số bài viết */
  total: number;
  /** Danh sách metadata của tất cả bài viết */
  posts: BlogPostMeta[];
}

// ─── Ảnh bìa mặc định theo Category (Fallback Thumbnail) ──────────────────
export const FALLBACK_COVER_IMAGES: Record<BlogCategory | "default", string> = {
  toan: "/images/blog/cover-toan-default.svg",
  "tieng-anh": "/images/blog/cover-anh-default.svg",
  other: "/images/blog/cover-default.svg",
  default: "/images/blog/cover-default.svg",
};

// ─── Helper: lấy ảnh bìa (tự động fallback) ───────────────────────────────
export function getCoverImage(post: BlogPostMeta): string {
  if (post.cover_image && post.cover_image.trim() !== "") {
    return post.cover_image;
  }
  return FALLBACK_COVER_IMAGES[post.category] ?? FALLBACK_COVER_IMAGES.default;
}
