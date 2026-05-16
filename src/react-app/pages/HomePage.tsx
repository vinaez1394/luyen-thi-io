/**
 * HomePage.tsx — Trang chủ PUBLIC (Landing Page cho Guest)
 *
 * ⚠️ User đã login → tự động redirect sang /dashboard (xử lý tại App.tsx HomeRoute)
 * File này CHỈ render cho Guest chưa đăng nhập.
 *
 * Thứ tự sections (v2 — 2026-05-16):
 *   1. HERO              — Headline lớn + 2 lộ trình + tagline + CTA
 *   2. PATHWAY SHOWCASE  — 2 card (chỉ hiện level đang có)
 *   3. SLIDE ẢNH UI      — Carousel placeholder (ảnh sẽ bổ sung sau)
 *   4. THỬ NGAY MIỄN PHÍ — 6 thẻ Flyers Part 1–6
 *   5. ÔN LUYỆN QUA TRÒ CHƠI — Hangman + Flashcard + Vocabulary
 *   6. FINAL CTA BANNER  — Trust signals + Đăng nhập
 *
 * Popup logic:
 *   - Lần đầu (popup_seen chưa có): hiện PathwayPopup
 *   - Lần sau (popup_seen = true, chưa login): hiện StickyPathwayBanner
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  findSubject,
  getCambridgeSubjects,
  getLop6Subjects,
} from "../data/subjects";
import { HomeHangman } from "../components/vocabulary/HomeHangman";
import { HomeFlashcard } from "../components/vocabulary/HomeFlashcard";
import { getLessonUrl } from "../utils/urlHelpers";
import { PathwayPopup, StickyPathwayBanner } from "../components/layout/PathwayPopup";
import "./HomePage.css";

/** Bài đầu tiên của 6 Part Flyers R&W — dùng cho section Thử Ngay Miễn Phí */
const FLYERS_PREVIEW = [
  {
    id: "FW1-EASY-001",
    slug: "fw1-easy-001",
    part: 1,
    title: "Part 1 — Look and Read",
    desc: "Nối từ với hình ảnh đúng chủ đề",
    questions: 10,
    image_url: "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-EASY-01-things-around-us.jpg",
    subjectId: "flyers",
  },
  {
    id: "FW2-EASY-001",
    slug: "fw2-easy-001",
    part: 2,
    title: "Part 2 — Dialogue",
    desc: "Điền vào hội thoại cho phù hợp",
    questions: 5,
    image_url: "https://cdn.luyenthi.io.vn/Cambridge/FLYER-RW-P2-EASY-01-a-visit-to-the-zoo.jpg",
    subjectId: "flyers",
  },
  {
    id: "FW3-MED-001",
    slug: "fw3-med-001",
    part: 3,
    title: "Part 3 — Read and Complete",
    desc: "Đọc câu chuyện và điền từ còn thiếu",
    questions: 6,
    image_url: "https://cdn.luyenthi.io.vn/Cambridge/FLYER-R%26W-P3-MED-01-a-camping-adventure.jpg",
    subjectId: "flyers",
  },
  {
    id: "FW4-MED-001",
    slug: "fw4-med-001",
    part: 4,
    title: "Part 4 — Read and Complete",
    desc: "Đọc đoạn văn và chọn từ đúng",
    questions: 10,
    image_url: "https://cdn.luyenthi.io.vn/Cambridge/FLYER-R%26W-P4-MED-01-LIVING%20IN%20SPACE.jpeg",
    subjectId: "flyers",
  },
  {
    id: "FW5-EASY-001",
    slug: "fw5-easy-001",
    part: 5,
    title: "Part 5 — Look and Read",
    desc: "Đọc hướng dẫn và viết câu trả lời",
    questions: 7,
    image_url: "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P5-EASY-01-sports-day-at-school.jpg",
    subjectId: "flyers",
  },
  {
    id: "FW6-MED-001",
    slug: "fw6-med-001",
    part: 6,
    title: "Part 6 — Read and Write",
    desc: "Đọc nhật ký và điền thông tin",
    questions: 6,
    image_url: "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P6-MED-01-a-trip-to-the-mountains.jpg",
    subjectId: "flyers",
  },
];

// Thứ tự hiển thị các nhóm môn Lớp 6: hàng 1 = Toán + Tiếng Anh, hàng 2 = Tiếng Việt + Khoa học
const LOP6_ROW1 = ["toan", "tieng-anh"];
const LOP6_ROW2 = ["tieng-viet", "khoa-hoc"];
const LOP6_ORDER = [...LOP6_ROW1, ...LOP6_ROW2];

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

/** Stats cân bằng 2 lộ trình */
const STATS = [
  { emoji: "🎯", value: "2", label: "Lộ trình thi" },
  { emoji: "📚", value: "80+", label: "Bộ đề Cambridge" },
  { emoji: "🏫", value: "50+", label: "Bài Luyện Thi Lớp 6" },
  { emoji: "📖", value: "250+", label: "Từ vựng Cambridge" },
];

/** Placeholder slides (ảnh sẽ bổ sung sau) */
const UI_SLIDES = [
  { label: "📝 Bài tập Reading Flyers", bg: "#e8f0fe", img_url: "https://cdn.luyenthi.io.vn/illustrations/slider-homepage-1.jpg" }, // Dán link ảnh 1 vào img_url
  { label: "🎮 Hangman từ vựng", bg: "#fce8f3", img_url: "https://cdn.luyenthi.io.vn/illustrations/slider-homepage-2.jpg" }, // Dán link ảnh 2 vào img_url
  { label: "📊 Màn hình kết quả", bg: "#e8fdf0", img_url: "https://cdn.luyenthi.io.vn/illustrations/slider-homepage-3.jpg" }, // Dán link ảnh 3 vào img_url
];

export function HomePage() {
  const { isLoggedIn, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // ── Popup / Banner state ──
  const [showPopup, setShowPopup] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    if (isLoggedIn) return; // Đã login → không cần popup/banner
    const seen = localStorage.getItem("popup_seen");
    if (!seen) {
      setShowPopup(true);
    } else {
      setShowBanner(true);
    }
  }, [isLoggedIn]);

  // Auto-advance slide
  useEffect(() => {
    const t = setInterval(() => setSlideIdx(i => (i + 1) % UI_SLIDES.length), 3500);
    return () => clearInterval(t);
  }, []);

  // ── Data cho Pathway Showcase ──
  const cambridgeSubjects = getCambridgeSubjects();
  const lop6Subjects = getLop6Subjects();

  const lop6Sorted = LOP6_ORDER
    .map(g => lop6Subjects.find(s => s.group === g))
    .filter(s => s?.available);

  return (
    <>
      {/* ── Popup (lần đầu) ── */}
      {showPopup && !isLoggedIn && (
        <PathwayPopup onDismiss={() => setShowPopup(false)} />
      )}

      {/* ── Sticky Banner (lần 2+) ── */}
      {showBanner && !isLoggedIn && (
        <StickyPathwayBanner onDismiss={() => setShowBanner(false)} />
      )}

      <div className={`home-page ${showBanner && !isLoggedIn ? "home-page--has-banner" : ""}`}>

        {/* ══════════════════════════════════════════════
            SECTION 1: HERO
        ══════════════════════════════════════════════ */}
        <section className="home-hero">
          <div className="home-hero__blob home-hero__blob--1" />
          <div className="home-hero__blob home-hero__blob--2" />

          <div className="home-hero__content animate-fadeIn">
            {/* Brand headline */}
            <div className="home-hero__brand">
              <span className="home-hero__brand-text">LUYỆN THI</span>
            </div>

            {/* 2 lộ trình */}
            <div className="home-hero__pathways">
              <div className="home-hero__pathway">
                <span className="home-hero__pathway-icon">🇬🇧</span>
                <span className="home-hero__pathway-text">
                  Cambridge: <em>Starters · Movers · Flyers · KET · PET</em>
                </span>
              </div>
              <div className="home-hero__pathway">
                <span className="home-hero__pathway-icon">🏫</span>
                <span className="home-hero__pathway-text">
                  Luyện Thi Vào Lớp 6: <em>Toán · Tiếng Anh · Tiếng Việt · Khoa Học</em>
                </span>
              </div>
            </div>

            {/* Tagline phụ */}
            <p className="home-hero__tagline">
              ✨ Đúng dạng đề &nbsp;·&nbsp; Đúng trình độ &nbsp;·&nbsp; Miễn phí thử ngay
            </p>

            {/* CTAs */}
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
                id="btn-hero-register"
                onClick={loginWithGoogle}
              >
                Tạo tài khoản miễn phí — theo dõi tiến độ bé
              </button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="home-stats">
            {STATS.map((s) => (
              <div key={s.label} className="home-stat">
                <div className="home-stat__value">{s.value}</div>
                <div className="home-stat__label">
                  {s.emoji} {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 2: PATHWAY SHOWCASE (chỉ available)
        ══════════════════════════════════════════════ */}
        <section className="home-pathways" id="pathway-section">
          <div className="home-pathways__header">
            <h2 className="home-pathways__title">📚 Chọn Lộ Trình Của Bé</h2>
            <p className="home-pathways__subtitle">
              Hai hướng luyện thi độc lập — cá nhân hóa theo mục tiêu
            </p>
          </div>

          <div className="pathway-grid">
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
                {/* Hiện TẤT CẢ môn Lớp 6 nhưng chỉ bold cái available */}
                {/* Hàng 1: Toán, Tiếng Anh */}
                {LOP6_ROW1.map((group) => {
                  const subj = lop6Sorted.find(s => s?.group === group);
                  return (
                    <span
                      key={group}
                      className={`pathway-level-badge ${subj ? "pathway-level-badge--active" : "pathway-level-badge--muted"}`}
                    >
                      {LOP6_EMOJIS[group]} {LOP6_LABELS[group]}
                    </span>
                  );
                })}
                {/* Xuống hàng */}
                <div className="pathway-levels__break" />
                {/* Hàng 2: Tiếng Việt, Khoa học */}
                {LOP6_ROW2.map((group) => {
                  const subj = lop6Sorted.find(s => s?.group === group);
                  return (
                    <span
                      key={group}
                      className={`pathway-level-badge ${subj ? "pathway-level-badge--active" : "pathway-level-badge--muted"}`}
                    >
                      {LOP6_EMOJIS[group]} {LOP6_LABELS[group]}
                    </span>
                  );
                })}
              </div>

              <div className="pathway-card__footer">
                <span className="pathway-card__cta">Xem lộ trình →</span>
              </div>

              {/* Minh họa trang trí — absolute góc phải dưới */}
              <img
                src="https://cdn.luyenthi.io.vn/illustrations/lop6-card.png?v=2"
                alt=""
                className="pathway-card__illus"
                aria-hidden="true"
              />
            </div>

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
                {/* Hàng 1: Starters, Movers */}
                {["starters", "movers"].map((group) => {
                  const subj = cambridgeSubjects.find(s => s.group === group);
                  const isActive = subj?.available ?? false;
                  return (
                    <span
                      key={group}
                      className={`pathway-level-badge ${isActive ? "pathway-level-badge--active" : "pathway-level-badge--muted"}`}
                    >
                      {subj?.emoji ?? ""} {group.charAt(0).toUpperCase() + group.slice(1)}
                    </span>
                  );
                })}
                {/* Xuống hàng */}
                <div className="pathway-levels__break" />
                {/* Hàng 2: Flyers, KET, PET */}
                {["flyers", "ket", "pet"].map((group) => {
                  const subj = cambridgeSubjects.find(s => s.group === group);
                  const isActive = subj?.available ?? false;
                  return (
                    <span
                      key={group}
                      className={`pathway-level-badge ${isActive ? "pathway-level-badge--active" : "pathway-level-badge--muted"}`}
                    >
                      {subj?.emoji ?? ""} {group.charAt(0).toUpperCase() + group.slice(1)}
                    </span>
                  );
                })}
              </div>

              <div className="pathway-card__footer">
                <span className="pathway-card__cta">Xem lộ trình →</span>
              </div>

              {/* Minh họa trang trí — absolute góc phải dưới */}
              <img
                src="https://cdn.luyenthi.io.vn/illustrations/cambridge-card.png?v=2"
                alt=""
                className="pathway-card__illus"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 3: SLIDE ẢNH UI (placeholder)
        ══════════════════════════════════════════════ */}
        <section className="home-ui-slides" aria-label="Giao diện bài tập">
          <div className="home-ui-slides__header">
            <h2 className="home-ui-slides__title">🖼️ Trải nghiệm bài tập thực tế</h2>
            <p className="home-ui-slides__subtitle">
              Giao diện thân thiện · Phản hồi tức thì · Giải thích rõ ràng sau mỗi câu
            </p>
          </div>

          <div className="ui-slides-track">
            {UI_SLIDES.map((slide, i) => (
              <div
                key={i}
                className={`ui-slide ${slideIdx === i ? "ui-slide--active" : ""}`}
                style={{ background: slide.bg }}
              >
                {slide.img_url ? (
                  <img src={slide.img_url} alt={slide.label} className="ui-slide__img" />
                ) : (
                  <div className="ui-slide__placeholder">
                    <span className="ui-slide__label">{slide.label}</span>
                    <span className="ui-slide__hint">📸 Ảnh sẽ được cập nhật</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="ui-slides-dots">
            {UI_SLIDES.map((_, i) => (
              <button
                key={i}
                className={`ui-slide-dot ${slideIdx === i ? "ui-slide-dot--active" : ""}`}
                onClick={() => setSlideIdx(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 4: THỬ NGAY MIỄN PHÍ (giữ nguyên)
        ══════════════════════════════════════════════ */}
        <section className="home-lessons" id="free-lessons-section">
          <div className="home-lessons__header">
            <h2 className="home-lessons__title">🎒 Thử Ngay Miễn Phí</h2>
            <p className="home-lessons__subtitle">
              6 dạng bài Cambridge Flyers — không cần đăng ký!
            </p>
          </div>

          <div className="lesson-grid">
            {FLYERS_PREVIEW.map((lesson) => {
              const subject = findSubject(lesson.subjectId);
              return (
                <div
                  key={lesson.id}
                  className="lesson-card flyers-preview-card card card-hover card-interactive"
                  onClick={() => {
                    if (subject) navigate(getLessonUrl(subject, lesson.slug));
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && subject)
                      navigate(getLessonUrl(subject, lesson.slug));
                  }}
                >
                  {/* Thumbnail ảnh — không badge */}
                  <div className="flyers-preview-card__thumb">
                    <img
                      src={lesson.image_url}
                      alt={lesson.title}
                      className="flyers-preview-card__img"
                      loading="lazy"
                    />
                  </div>

                  {/* Chỉ để tiêu đề */}
                  <div className="lesson-card__content">
                    <h3 className="lesson-card__title">{lesson.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 5: ÔN LUYỆN QUA TRÒ CHƠI
            (sau Thử Miễn Phí)
        ══════════════════════════════════════════════ */}
        <section className="home-games" id="games-section">
          <div className="home-games__header">
            <h2 className="home-games__title">🎮 Ôn Luyện Qua Trò Chơi</h2>
            <p className="home-games__subtitle">
              Chơi miễn phí — đăng nhập để lưu kết quả và nhận ⭐
            </p>
          </div>

          <div className="home-games__grid">
            {/* Vocabulary card — TRƯỚC (span full width trên desktop) */}
            <div
              className="home-games__vocab-card card card-interactive"
              role="button"
              tabIndex={0}
              id="btn-games-vocabulary"
              onClick={() => navigate("/cambridge/vocabulary")}
              onKeyDown={(e) => e.key === "Enter" && navigate("/cambridge/vocabulary")}
            >
              <div className="home-games__vocab-icon">📖</div>
              <div>
                <h3 className="home-games__vocab-title">Từ Vựng Cambridge</h3>
                <p className="home-games__vocab-desc">
                  250+ từ Starters · Movers · Flyers — luyện theo chủ đề, ghi nhớ lâu hơn
                </p>
              </div>
              <span className="home-games__vocab-cta">Ôn từ vựng ngay →</span>
            </div>

            <HomeHangman isLoggedIn={isLoggedIn} onLogin={loginWithGoogle} />
            <HomeFlashcard isLoggedIn={isLoggedIn} onLogin={loginWithGoogle} />
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 6: FINAL CTA BANNER
        ══════════════════════════════════════════════ */}
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

          {/* Trust signals */}
          <div className="home-cta-banner__trust">
            <span>🔒 Không quảng cáo</span>
            <span>·</span>
            <span>📋 Bám sát đề thi Cambridge</span>
            <span>·</span>
            <span>🛡️ Bảo mật dữ liệu</span>
          </div>
        </div>

      </div>
    </>
  );
}
