/**
 * HomePage.tsx — Trang chủ PUBLIC (không cần login)
 * Hiển thị: giới thiệu + danh sách bài FREE để dùng thử
 * Freemium: khách có thể làm bài free, login để lưu điểm + bài premium
 */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./HomePage.css";

// Dữ liệu mẫu — Phase 04 sẽ load từ API thật
const FREE_SAMPLE_LESSONS = [
  {
    id: "RW001",
    title: "Reading Part 4 — Matching",
    skill: "reading",
    part: 4,
    type: "matching",
    questions: 6,
    is_free: true,
    emoji: "📖",
  },
  {
    id: "L001",
    title: "Listening Part 1 — Chọn đáp án",
    skill: "listening",
    part: 1,
    type: "multiple-choice",
    questions: 5,
    is_free: true,
    emoji: "🎧",
  },
  {
    id: "RW002",
    title: "Reading Part 3 — Điền từ",
    skill: "reading",
    part: 3,
    type: "fill-blank",
    questions: 5,
    is_free: true,
    emoji: "✍️",
  },
  {
    id: "L002",
    title: "Listening Part 4 — Nghe và nối",
    skill: "listening",
    part: 4,
    type: "drag-drop-match",
    questions: 5,
    is_free: false,
    emoji: "🎵",
  },
  {
    id: "RW003",
    title: "Reading Part 1 — Câu hỏi tranh",
    skill: "reading",
    part: 1,
    type: "multiple-choice-image",
    questions: 5,
    is_free: false,
    emoji: "🖼️",
  },
  {
    id: "L003",
    title: "Listening Part 2 — Điền thông tin",
    skill: "listening",
    part: 2,
    type: "fill-blank",
    questions: 5,
    is_free: false,
    emoji: "📝",
  },
];

const SKILL_COLORS: Record<string, string> = {
  reading: "badge-primary",
  listening: "badge-accent",
  writing: "badge-success",
};

export function HomePage() {
  const { isLoggedIn, user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleStartLesson = (lessonId: string, isFree: boolean) => {
    if (!isFree && !isLoggedIn) {
      // Paywall — mời đăng nhập
      loginWithGoogle();
      return;
    }
    // Phase 04 sẽ route đến /quiz/:id
    navigate(`/quiz/${lessonId}`);
  };

  return (
    <div className="home-page">
      {/* ===== HEADER NAV ===== */}
      <header className="home-header">
        <div className="home-header__logo">
          <span className="home-header__logo-icon">🎓</span>
          <span className="home-header__logo-text">Luyện Thi</span>
        </div>
        <div className="home-header__actions">
          {isLoggedIn ? (
            <button
              className="btn btn-primary btn-sm"
              id="btn-go-dashboard"
              onClick={() => navigate("/dashboard")}
            >
              Trang của bé →
            </button>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              id="btn-header-login"
              onClick={loginWithGoogle}
            >
              Đăng nhập
            </button>
          )}
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="home-hero">
        <div className="home-hero__blob home-hero__blob--1" />
        <div className="home-hero__blob home-hero__blob--2" />

        <div className="home-hero__content animate-fadeIn">
          <div className="home-hero__badge">
            <span>🇬🇧</span> Cambridge Flyers
          </div>
          <h1 className="home-hero__title">
            Học vui —<br />
            <span className="home-hero__title-highlight">Thi tự tin!</span>
          </h1>
          <p className="home-hero__desc">
            Luyện thi Cambridge Flyers đúng format, hướng dẫn tiếng Việt.
            Miễn phí thử ngay — không cần đăng ký!
          </p>
          <div className="home-hero__ctas">
            <button
              className="btn btn-primary"
              id="btn-hero-start"
              onClick={() => {
                document
                  .getElementById("lessons-section")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              🚀 Học thử miễn phí
            </button>
            {!isLoggedIn && (
              <button
                className="btn btn-outline"
                id="btn-hero-login"
                onClick={loginWithGoogle}
              >
                Đăng nhập để lưu điểm
              </button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="home-stats">
          {[
            { value: "7", label: "Dạng bài", emoji: "📚" },
            { value: "6", label: "Giao diện màu", emoji: "🎨" },
            { value: "⭐", label: "Hệ thống sao", emoji: "✨" },
          ].map((s) => (
            <div key={s.label} className="home-stat">
              <div className="home-stat__value">{s.value}</div>
              <div className="home-stat__label">
                {s.emoji} {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== LESSONS ===== */}
      <section className="home-lessons" id="lessons-section">
        <div className="home-lessons__header">
          <h2 className="home-lessons__title">Bài luyện tập</h2>
          <p className="home-lessons__subtitle">
            {isLoggedIn
              ? `Xin chào, ${user?.profile?.display_name ?? user?.name}! 👋`
              : "Thử ngay 3 bài miễn phí — không cần đăng ký"}
          </p>
        </div>

        <div className="lesson-grid">
          {FREE_SAMPLE_LESSONS.map((lesson) => (
            <div
              key={lesson.id}
              className={`lesson-card card card-hover card-interactive ${!lesson.is_free && !isLoggedIn ? "lesson-card--locked" : ""}`}
              onClick={() => handleStartLesson(lesson.id, lesson.is_free)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleStartLesson(lesson.id, lesson.is_free);
              }}
            >
              <div className="lesson-card__emoji">{lesson.emoji}</div>
              <div className="lesson-card__content">
                <div className="lesson-card__tags">
                  <span className={`badge ${SKILL_COLORS[lesson.skill]}`}>
                    {lesson.skill === "reading" ? "Đọc" : lesson.skill === "listening" ? "Nghe" : "Viết"}
                  </span>
                  <span className="badge badge-primary">Part {lesson.part}</span>
                  {lesson.is_free ? (
                    <span className="badge badge-success">Miễn phí</span>
                  ) : (
                    <span className="badge badge-warning">🔒 Premium</span>
                  )}
                </div>
                <h3 className="lesson-card__title">{lesson.title}</h3>
                <p className="lesson-card__meta">{lesson.questions} câu hỏi</p>
              </div>
              {!lesson.is_free && !isLoggedIn && (
                <div className="lesson-card__lock">
                  <span>🔒</span>
                  <span>Đăng nhập để học</span>
                </div>
              )}
              {lesson.is_free && (
                <div className="lesson-card__arrow">→</div>
              )}
            </div>
          ))}
        </div>

        {!isLoggedIn && (
          <div className="home-cta-banner">
            <div className="home-cta-banner__text">
              <strong>Lưu điểm, theo dõi tiến độ, mở khóa bài premium</strong>
              <span>— Đăng nhập bằng Google, miễn phí!</span>
            </div>
            <button
              className="btn btn-primary"
              id="btn-cta-banner-login"
              onClick={loginWithGoogle}
            >
              Đăng nhập ngay
            </button>
          </div>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="home-footer">
        <p>© 2026 Luyện Thi · luyenthi.io.vn · Học vui, Thi tự tin! 🌟</p>
      </footer>
    </div>
  );
}
