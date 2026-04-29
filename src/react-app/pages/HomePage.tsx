/**
 * HomePage.tsx — Trang chủ PUBLIC
 * Dữ liệu môn học/bài học đến từ: src/react-app/data/subjects.ts
 * Để thêm môn/bài: chỉnh sửa file subjects.ts, KHÔNG cần sửa file này
 *
 * Thứ tự sections:
 *   1. Hero
 *   2. Học hết sức (Chọn môn học — grid 3 cột)
 *   3. Chơi hết mình (Hangman + sắp có thêm game)
 *   4. Bài Luyện Tập (danh sách bài)
 */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { SUBJECTS, HOME_LESSONS } from "../data/subjects";
import { HomeHangman } from "../components/vocabulary/HomeHangman";
import "./HomePage.css";

const SKILL_COLORS: Record<string, string> = {
  reading: "badge-primary",
  listening: "badge-accent",
  writing: "badge-success",
  math: "badge-warning",
  mixed: "badge-primary",
};

const SKILL_LABELS: Record<string, string> = {
  reading: "Đọc",
  listening: "Nghe",
  writing: "Viết",
  math: "Toán",
  mixed: "Tổng hợp",
};

export function HomePage() {
  const { isLoggedIn, user, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  /** Điều hướng vào bài học theo URL: /:subject/:slug */
  const handleStartLesson = (subjectId: string, slug: string, isFree: boolean) => {
    if (!isFree && !isLoggedIn) {
      loginWithGoogle();
      return;
    }
    navigate(`/${subjectId}/${slug}`);
  };

  return (
    <div className="home-page">

      {/* ===== HERO ===== */}
      <section className="home-hero">
        <div className="home-hero__blob home-hero__blob--1" />
        <div className="home-hero__blob home-hero__blob--2" />

        <div className="home-hero__content animate-fadeIn">
          <h1 className="home-hero__title">
            Học vui —<br />
            <span className="home-hero__title-highlight">Thi tự tin!</span>
          </h1>
          <p className="home-hero__desc">
            Luyện thi thông minh, đúng format, hướng dẫn tiếng Việt.
            Miễn phí thử ngay — không cần đăng ký!
          </p>
          <div className="home-hero__ctas">
            <button
              className="btn btn-primary"
              id="btn-hero-start"
              onClick={() =>
                document.getElementById("subjects-section")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              🚀 Khám phá môn học
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
            { value: `${SUBJECTS.length}+`, label: "Môn học", emoji: "📚" },
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

      {/* ===== HỌC HẾT SỨC (đổi từ "Chinh Phục Môn Học") ===== */}
      <section className="home-subjects" id="subjects-section">
        <div className="home-subjects__header">
          <h2 className="home-subjects__title">💪 Học Hết Sức</h2>
          <p className="home-subjects__subtitle">
            Chọn môn học phù hợp — luyện đúng trọng tâm, thi tự tin hơn
          </p>
        </div>

        {/*
         * Grid 3 cột — thẻ tỉ lệ 4:3, kích thước đồng đều
         * Để thêm môn: vào src/react-app/data/subjects.ts → thêm vào SUBJECTS
         */}
        <div className="subject-grid">
          {SUBJECTS.map((subject) => (
            <div
              key={subject.id}
              className={[
                "subject-card",
                subject.available ? "subject-card--active" : "subject-card--soon",
              ].join(" ")}
              onClick={() => subject.available && navigate(`/${subject.id}`)}
              role={subject.available ? "button" : "presentation"}
              tabIndex={subject.available ? 0 : -1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && subject.available) navigate(`/${subject.id}`);
              }}
              id={`btn-subject-${subject.id}`}
              style={{ "--subject-color": subject.color } as React.CSSProperties}
              title={subject.available ? `Xem bài ${subject.label}` : "Sắp ra mắt"}
            >
              <div className="subject-card__emoji">{subject.emoji}</div>
              <div className="subject-card__body">
                <div className="subject-card__name">{subject.label}</div>
                <div className="subject-card__desc">{subject.desc}</div>
                <div className="subject-card__count">
                  {subject.available
                    ? subject.lessons.length > 0
                      ? `${subject.lessons.length} bài`
                      : "Sắp có bài"
                    : ""}
                </div>
              </div>
              {!subject.available && (
                <span className="badge badge-warning subject-card__soon-badge">Sắp có</span>
              )}
              {subject.available && (
                <div className="subject-card__arrow">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== CHƠI HẾT MÌNH (Hangman + game sắp tới) ===== */}
      <section className="home-games" id="games-section">
        <div className="home-games__header">
          <h2 className="home-games__title">🎮 Chơi Hết Mình</h2>
          <p className="home-games__subtitle">
            Ôn từ vựng qua trò chơi — vừa vui vừa nhớ lâu!
          </p>
        </div>

        <div className="home-games__grid">
          {/* Hangman */}
          <HomeHangman />

          {/* Sắp có */}
          <div className="home-game-coming">
            <div className="home-game-coming__icon">🃏</div>
            <div className="home-game-coming__name">Flashcard</div>
            <div className="home-game-coming__badge">Sắp có</div>
          </div>

          <div className="home-game-coming">
            <div className="home-game-coming__icon">🧩</div>
            <div className="home-game-coming__name">Word Match</div>
            <div className="home-game-coming__badge">Sắp có</div>
          </div>
        </div>
      </section>

      {/* ===== BÀI LUYỆN TẬP ===== */}
      {/*
       * Tự động lấy từ subjects.ts: các bài có showOnHome: true
       * Để thêm bài mới: vào subjects.ts, đặt showOnHome: true
       * Để ẩn bài khỏi đây: đặt showOnHome: false
       */}
      <section className="home-lessons" id="lessons-section">
        <div className="home-lessons__header">
          <h2 className="home-lessons__title">Bài Luyện Tập</h2>
          <p className="home-lessons__subtitle">
            {isLoggedIn
              ? `Xin chào, ${user?.profile?.display_name ?? user?.name}! 👋`
              : "Thử ngay miễn phí — không cần đăng ký"}
          </p>
        </div>

        <div className="lesson-grid">
          {HOME_LESSONS.map((lesson) => (
            <div
              key={`${lesson.subjectId}-${lesson.id}`}
              className={`lesson-card card card-hover card-interactive ${
                !lesson.is_free && !isLoggedIn ? "lesson-card--locked" : ""
              }`}
              onClick={() => handleStartLesson(lesson.subjectId, lesson.slug, lesson.is_free)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  handleStartLesson(lesson.subjectId, lesson.slug, lesson.is_free);
              }}
            >
              <div className="lesson-card__emoji">{lesson.emoji}</div>
              <div className="lesson-card__content">
                <div className="lesson-card__tags">
                  <span className={`badge ${SKILL_COLORS[lesson.skill]}`}>
                    {SKILL_LABELS[lesson.skill]}
                  </span>
                  {lesson.part && (
                    <span className="badge badge-primary">Part {lesson.part}</span>
                  )}
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
              {lesson.is_free && <div className="lesson-card__arrow">→</div>}
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

    </div>
  );
}
