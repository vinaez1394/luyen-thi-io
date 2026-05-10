/**
 * Lop6Page.tsx — Trang /lop6
 * 4 nhóm môn học song song: Toán / Tiếng Việt / Tiếng Anh / Khoa học
 */

import { useNavigate } from "react-router-dom";
import { getLop6Subjects } from "../data/subjects";
import { getSubjectUrl } from "../utils/urlHelpers";
import "./Lop6Page.css";

export function Lop6Page() {
  const navigate = useNavigate();
  const subjects = getLop6Subjects();

  return (
    <div className="lop6-page">

      {/* Header */}
      <div className="lop6-page__header">
        <button
          className="lop6-page__back"
          onClick={() => navigate("/learn")}
          id="btn-lop6-back"
        >
          ← Chọn lộ trình
        </button>
        <div className="lop6-page__hero">
          <span className="lop6-page__hero-icon">🏫</span>
          <div>
            <h1 className="lop6-page__title">Thi vào Lớp 6</h1>
            <p className="lop6-page__subtitle">
              Ôn tập 4 môn thi tuyển sinh — học theo trình độ của bé
            </p>
          </div>
        </div>
      </div>

      {/* Grid 4 nhóm môn */}
      <div className="lop6-page__grid">
        {subjects.map((subject) => {
          const lessonCount = subject.lessons.length;
          const freeCount   = subject.lessons.filter((l) => l.is_free).length;

          return (
            <button
              key={subject.id}
              className={`lop6-subject-card ${!subject.available ? "lop6-subject-card--soon" : ""}`}
              onClick={() => subject.available && navigate(getSubjectUrl(subject))}
              disabled={!subject.available}
              id={`btn-lop6-${subject.group}`}
              style={{ "--subject-color": subject.color } as React.CSSProperties}
            >
              <div className="lop6-subject-card__top">
                <span className="lop6-subject-card__emoji">{subject.emoji}</span>
                {!subject.available && (
                  <span className="lop6-subject-card__soon">Sắp có</span>
                )}
              </div>
              <h3 className="lop6-subject-card__title">{subject.label}</h3>
              <p className="lop6-subject-card__desc">{subject.desc}</p>
              {subject.available ? (
                <p className="lop6-subject-card__meta">
                  {lessonCount} bài · {freeCount} miễn phí
                </p>
              ) : (
                <p className="lop6-subject-card__meta lop6-subject-card__meta--soon">
                  Đang chuẩn bị nội dung...
                </p>
              )}
              {subject.available && (
                <span className="lop6-subject-card__cta">Vào học →</span>
              )}
              <div className="lop6-subject-card__bg-glow" />
            </button>
          );
        })}
      </div>

    </div>
  );
}
