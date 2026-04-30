/**
 * CambridgePage.tsx — Trang /cambridge
 * Danh sách các cấp độ Cambridge theo thứ tự: Starters → Movers → Flyers → KET → PET → IELTS
 */

import { useNavigate } from "react-router-dom";
import { getCambridgeSubjects } from "../data/subjects";
import { getSubjectUrl } from "../utils/urlHelpers";
import "./CambridgePage.css";

export function CambridgePage() {
  const navigate  = useNavigate();
  const subjects  = getCambridgeSubjects();

  return (
    <div className="cambridge-page">

      {/* Header */}
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

        {/* Level progression */}
        <div className="cambridge-page__progression">
          {["Starters", "Movers", "Flyers", "KET", "PET"].map((lv, i, arr) => (
            <span key={lv} className="cambridge-page__progression-step">
              <span>{lv}</span>
              {i < arr.length - 1 && <span className="cambridge-page__progression-arrow">→</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Grid cấp độ */}
      <div className="cambridge-page__grid">
        {subjects.map((subject) => {
          const lessonCount = subject.lessons.length;
          const freeCount   = subject.lessons.filter((l) => l.is_free).length;

          return (
            <button
              key={subject.id}
              className={`cambridge-level-card ${!subject.available ? "cambridge-level-card--soon" : ""}`}
              onClick={() => subject.available && navigate(getSubjectUrl(subject))}
              disabled={!subject.available}
              id={`btn-cambridge-${subject.group}`}
              style={{ "--subject-color": subject.color } as React.CSSProperties}
            >
              <div className="cambridge-level-card__emoji">{subject.emoji}</div>
              <div className="cambridge-level-card__body">
                <h3 className="cambridge-level-card__title">{subject.label}</h3>
                <p className="cambridge-level-card__desc">{subject.desc}</p>
                {subject.available ? (
                  <p className="cambridge-level-card__meta">
                    {lessonCount} bài · {freeCount} miễn phí
                  </p>
                ) : (
                  <span className="cambridge-level-card__soon-badge">🚧 Sắp có</span>
                )}
              </div>
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
