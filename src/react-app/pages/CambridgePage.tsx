/**
 * CambridgePage.tsx — Trang /cambridge
 *
 * Layout mới:
 *  1. Header: Back + Hero title + progression bar
 *  2. Vocabulary Hero Banner — nổi bật, full-width, click → /cambridge/vocabulary
 *  3. Section "Luyện thi theo cấp độ":
 *     Grid 3 cột (desktop) / 2 cột (mobile), thứ tự: Starters → Movers → Flyers → KET → PET
 */

import { useNavigate } from "react-router-dom";
import { getCambridgeSubjects } from "../data/subjects";
import { getSubjectUrl } from "../utils/urlHelpers";
import "./CambridgePage.css";

/** Thứ tự hiển thị cấp độ Cambridge */
const CERT_ORDER: Record<string, number> = {
  starters: 1,
  movers:   2,
  flyers:   3,
  ket:      4,
  pet:      5,
  ielts:    6,
};

export function CambridgePage() {
  const navigate = useNavigate();

  // Sort đúng thứ tự Starters → Movers → Flyers → KET → PET
  const subjects = getCambridgeSubjects().sort(
    (a, b) => (CERT_ORDER[a.group] ?? 99) - (CERT_ORDER[b.group] ?? 99)
  );

  return (
    <div className="cambridge-page">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="cambridge-page__header">
        <button
          className="cambridge-page__back"
          onClick={() => navigate("/learn")}
          id="btn-cambridge-back"
        >
          ← Chọn lộ trình
        </button>
        <div className="cambridge-page__hero">
          <span className="cambridge-page__hero-flag">🇬🇧</span>
          <div>
            <h1 className="cambridge-page__title">Cambridge Certificates</h1>
            <p className="cambridge-page__subtitle">
              Lộ trình từ Pre-A1 đến B2 — học tuần tự từng cấp độ
            </p>
          </div>
        </div>

        {/* Level progression breadcrumb */}
        <div className="cambridge-page__progression">
          {["Starters", "Movers", "Flyers", "KET", "PET"].map((lv, i, arr) => (
            <span key={lv} className="cambridge-page__progression-step">
              <span>{lv}</span>
              {i < arr.length - 1 && <span className="cambridge-page__progression-arrow">→</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── Vocabulary Hero Banner ─────────────────────────── */}
      <button
        className="cambridge-vocab-banner"
        id="btn-cambridge-vocabulary"
        onClick={() => navigate("/cambridge/vocabulary")}
      >
        {/* Decorative blobs */}
        <span className="cambridge-vocab-banner__blob cambridge-vocab-banner__blob--1" aria-hidden="true" />
        <span className="cambridge-vocab-banner__blob cambridge-vocab-banner__blob--2" aria-hidden="true" />

        <div className="cambridge-vocab-banner__left">
          <span className="cambridge-vocab-banner__icon">📚</span>
          <div>
            <p className="cambridge-vocab-banner__eyebrow">✨ Mới · Học ngay hôm nay</p>
            <h2 className="cambridge-vocab-banner__title">Từ Vựng Cambridge</h2>
            <p className="cambridge-vocab-banner__desc">
              Hệ thống SRS thông minh · Học theo chủ đề · Starters → PET
            </p>
          </div>
        </div>

        <div className="cambridge-vocab-banner__right">
          <span className="cambridge-vocab-banner__tags">
            <span className="cambridge-vocab-banner__tag">🐾 Animals</span>
            <span className="cambridge-vocab-banner__tag">👨‍👩‍👧 Family</span>
            <span className="cambridge-vocab-banner__tag">+18 chủ đề</span>
          </span>
          <span className="cambridge-vocab-banner__cta">
            Học ngay <span className="cambridge-vocab-banner__cta-arrow">→</span>
          </span>
        </div>
      </button>

      {/* ── Exam Levels Grid ───────────────────────────────── */}
      <div className="cambridge-page__section-label">
        📝 Luyện thi theo cấp độ
      </div>

      <div className="cambridge-page__grid">
        {subjects.map((subject) => {
          const lessonCount = subject.lessons.length;
          const freeCount   = subject.lessons.filter((l) => l.is_free).length;

          return (
            <button
              key={subject.id}
              className={`cambridge-level-card${!subject.available ? " cambridge-level-card--soon" : ""}`}
              onClick={() => subject.available && navigate(getSubjectUrl(subject))}
              disabled={!subject.available}
              id={`btn-cambridge-${subject.group}`}
              style={{ "--subject-color": subject.color } as React.CSSProperties}
            >
              {/* Top: emoji + badge */}
              <div className="cambridge-level-card__top">
                <span className="cambridge-level-card__emoji">{subject.emoji}</span>
                {subject.available && (
                  <span className="cambridge-level-card__avail-badge">Có sẵn</span>
                )}
              </div>

              {/* Body */}
              <h3 className="cambridge-level-card__title">{subject.label}</h3>
              <p className="cambridge-level-card__desc">{subject.desc}</p>

              {subject.available ? (
                <p className="cambridge-level-card__meta">
                  {lessonCount} bài · {freeCount} miễn phí
                </p>
              ) : (
                <span className="cambridge-level-card__soon-badge">🚧 Sắp có</span>
              )}

              {subject.available && (
                <span className="cambridge-level-card__arrow">→</span>
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
