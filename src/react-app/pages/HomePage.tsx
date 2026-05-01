/**
 * HomePage.tsx — Trang chủ PUBLIC (Landing Page cho Guest)
 *
 * ⚠️ User đã login → tự động redirect sang /dashboard (xử lý tại App.tsx HomeRoute)
 * File này CHỈ render cho Guest chưa đăng nhập.
 *
 * Thứ tự sections:
 *   1. HERO              — Headline + CTA
 *   2. PATHWAY SHOWCASE  — 2 lộ trình: Cambridge / Lớp 6
 *   3. SOCIAL PROOF      — 4 stats số liệu
 *   4. SAMPLE FREE LESSONS — Bài miễn phí thử ngay
 *   5. ÔN LUYỆN QUA TRÒ CHƠI — Hangman game
 *   6. FINAL CTA BANNER  — Kêu gọi đăng nhập
 */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  SUBJECTS,
  HOME_LESSONS,
  findSubject,
  getCambridgeSubjects,
  getLop6Subjects,
} from "../data/subjects";
import { HomeHangman } from "../components/vocabulary/HomeHangman";
import { HomeFlashcard } from "../components/vocabulary/HomeFlashcard";
import { getLessonUrl } from "../utils/urlHelpers";
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

// Thứ tự hiển thị các cấp độ Cambridge trong Pathway Showcase
const CAMBRIDGE_ORDER = ["starters", "movers", "flyers", "ket", "pet"];
// Thứ tự hiển thị các nhóm môn Lớp 6
const LOP6_ORDER = ["toan", "tieng-viet", "tieng-anh", "khoa-hoc"];

const LOP6_LABELS: Record<string, string> = {
  toan: "Toán",
  "tieng-viet": "Tiếng Việt",
  "tieng-anh": "Tiếng Anh",
  "khoa-hoc": "Khoa học",
};

const LOP6_EMOJIS: Record<string, string> = {
  toan: "🧮",
  "tieng-viet": "📖",
  "tieng-anh": "🌐",
  "khoa-hoc": "🔬",
};

export function HomePage() {
  const { isLoggedIn, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleStartLesson = (subjectId: string, slug: string, isFree: boolean) => {
    if (!isFree && !isLoggedIn) {
      loginWithGoogle();
      return;
    }
    const subject = findSubject(subjectId);
    if (subject) {
      navigate(getLessonUrl(subject, slug));
    }
  };

  // Data cho Pathway Showcase
  const cambridgeSubjects = getCambridgeSubjects();
  const lop6Subjects = getLop6Subjects();

  const cambridgeSorted = CAMBRIDGE_ORDER
    .map((g) => cambridgeSubjects.find((s) => s.group === g))
    .filter(Boolean);

  const lop6Sorted = LOP6_ORDER
    .map((g) => lop6Subjects.find((s) => s.group === g))
    .filter(Boolean);

  // Chỉ lấy bài free cho section Sample Free Lessons
  const freeLessons = HOME_LESSONS.filter((l) => l.is_free);

  return (
    <div className="home-page">

      {/* ===== SECTION 1: HERO ===== */}
      <section className="home-hero">
        <div className="home-hero__blob home-hero__blob--1" />
        <div className="home-hero__blob home-hero__blob--2" />

        <div className="home-hero__content animate-fadeIn">
          <h1 className="home-hero__title">
            <span className="home-hero__title-emphasis">LUYỆN</span> đúng nơi —{" "}
            <span className="home-hero__title-highlight">THI</span> đúng chỗ
          </h1>
          <p className="home-hero__desc">
            Bài luyện Cambridge và Thi vào Lớp 6 được cá nhân hóa theo trình độ.
            Bắt đầu miễn phí, không cần đăng ký.
          </p>
          <div className="home-hero__ctas">
            <button
              className="btn btn-primary"
              id="btn-hero-try"
              onClick={() =>
                document.getElementById("free-lessons-section")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              🚀 Thử ngay miễn phí
            </button>
            <button
              className="btn btn-outline"
              id="btn-hero-login"
              onClick={loginWithGoogle}
            >
              Đăng nhập để lưu tiến độ
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="home-stats">
          {[
            { value: `${SUBJECTS.length}+`, label: "Môn học", emoji: "📚" },
            { value: "2", label: "Lộ trình thi", emoji: "🎯" },
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

      {/* ===== SECTION 2: PATHWAY SHOWCASE ===== */}
      <section className="home-pathways" id="pathway-section">
        <div className="home-pathways__header">
          <h2 className="home-pathways__title">📚 Chọn Lộ Trình Của Bé</h2>
          <p className="home-pathways__subtitle">
            Hai hướng luyện thi độc lập — cá nhân hóa theo mục tiêu
          </p>
        </div>

        <div className="pathway-grid">
          {/* Cambridge Card */}
          <div
            className="pathway-card pathway-card--cambridge"
            role="button"
            tabIndex={0}
            id="btn-pathway-cambridge"
            onClick={() => navigate("/cambridge")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/cambridge")}
          >
            <div className="pathway-card__header">
              <span className="pathway-card__flag">🇬🇧</span>
              <div>
                <h3 className="pathway-card__title">Chứng chỉ Cambridge</h3>
                <p className="pathway-card__subtitle">Starters → Movers → Flyers → KET → PET</p>
              </div>
            </div>

            <div className="pathway-card__levels">
              {cambridgeSorted.map((s) => s && (
                <span
                  key={s.id}
                  className={`pathway-level-badge ${s.available ? "pathway-level-badge--active" : "pathway-level-badge--soon"}`}
                >
                  {s.emoji} {s.label.replace("Cambridge ", "")}
                </span>
              ))}
            </div>

            <div className="pathway-card__footer">
              <span className="pathway-card__cta">Xem lộ trình →</span>
              <span className="pathway-card__age">🧒 9–14 tuổi</span>
            </div>
          </div>

          {/* Lớp 6 Card */}
          <div
            className="pathway-card pathway-card--lop6"
            role="button"
            tabIndex={0}
            id="btn-pathway-lop6"
            onClick={() => navigate("/lop6")}
            onKeyDown={(e) => e.key === "Enter" && navigate("/lop6")}
          >
            <div className="pathway-card__header">
              <span className="pathway-card__flag">🏫</span>
              <div>
                <h3 className="pathway-card__title">Thi vào Lớp 6</h3>
                <p className="pathway-card__subtitle">4 nhóm môn — Lớp 3 đến Lớp 5</p>
              </div>
            </div>

            <div className="pathway-card__levels">
              {LOP6_ORDER.map((group) => {
                const subj = lop6Sorted.find((s) => s?.group === group);
                const isAvailable = subj?.available ?? false;
                return (
                  <span
                    key={group}
                    className={`pathway-level-badge ${isAvailable ? "pathway-level-badge--active" : "pathway-level-badge--soon"}`}
                  >
                    {LOP6_EMOJIS[group]} {LOP6_LABELS[group]}
                  </span>
                );
              })}
            </div>

            <div className="pathway-card__footer">
              <span className="pathway-card__cta">Xem lộ trình →</span>
              <span className="pathway-card__age">🧒 Lớp 3–5</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECTION 3: SOCIAL PROOF ===== */}
      <section className="home-social-proof" aria-label="Số liệu">
        <div className="social-proof-grid">
          {[
            { emoji: "📚", value: "500+", label: "Bài luyện tập" },
            { emoji: "🎯", value: "2",    label: "Lộ trình thi" },
            { emoji: "🏅", value: "Lớp 3–5", label: "Phù hợp theo lớp" },
            { emoji: "🆓", value: "Miễn phí", label: "Để thử ngay" },
          ].map((item) => (
            <div key={item.label} className="social-proof-item">
              <div className="social-proof-item__emoji">{item.emoji}</div>
              <div className="social-proof-item__value">{item.value}</div>
              <div className="social-proof-item__label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 4: SAMPLE FREE LESSONS ===== */}
      <section className="home-lessons" id="free-lessons-section">
        <div className="home-lessons__header">
          <h2 className="home-lessons__title">🎒 Thử Ngay Miễn Phí</h2>
          <p className="home-lessons__subtitle">
            Không cần đăng ký — bắt đầu luyện tập ngay!
          </p>
        </div>

        <div className="lesson-grid">
          {freeLessons.map((lesson) => (
            <div
              key={`${lesson.subjectId}-${lesson.id}`}
              className="lesson-card card card-hover card-interactive"
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
                  <span className="badge badge-success">Miễn phí</span>
                </div>
                <h3 className="lesson-card__title">{lesson.title}</h3>
                <p className="lesson-card__meta">{lesson.questions} câu hỏi</p>
              </div>
              <div className="lesson-card__arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SECTION 5: ÔN LUYỆN QUA TRÒ CHƠI ===== */}
      <section className="home-games" id="games-section">
        <div className="home-games__header">
          <h2 className="home-games__title">🎮 Ôn Luyện Qua Trò Chơi</h2>
          <p className="home-games__subtitle">
            Chơi miễn phí — đăng nhập để lưu kết quả và nhận ⭐
          </p>
        </div>

        <div className="home-games__grid">
          <HomeHangman
            isLoggedIn={isLoggedIn}
            onLogin={loginWithGoogle}
          />
          <HomeFlashcard
            isLoggedIn={isLoggedIn}
            onLogin={loginWithGoogle}
          />
        </div>
      </section>

      {/* ===== SECTION 6: FINAL CTA BANNER ===== */}
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

    </div>
  );
}
