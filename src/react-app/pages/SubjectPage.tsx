/**
 * SubjectPage.tsx — Trang hiển thị tất cả bài học của 1 môn
 * URL mới: /:pathway/:subjectSlug
 *   Cambridge: /cambridge/flyers
 *   Lớp 6:    /lop6/toan
 */

import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { findByPathwayGroup } from "../data/subjects";
import { getPathwayFromPathname, getLessonUrl, getPathwayUrl } from "../utils/urlHelpers";
import "./SubjectPage.css";

const SKILL_LABELS: Record<string, string> = {
  reading: "Đọc",
  listening: "Nghe",
  writing: "Viết",
  math: "Toán",
  mixed: "Tổng hợp",
};

const SKILL_COLORS: Record<string, string> = {
  reading: "badge-primary",
  listening: "badge-accent",
  writing: "badge-success",
  math: "badge-warning",
  mixed: "badge-primary",
};

export function SubjectPage() {
  const { subjectSlug = "" } = useParams<{ subjectSlug: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, loginWithGoogle } = useAuth();

  // Xác định pathway từ URL: "cambridge" hoặc "lop6"
  const pathway = getPathwayFromPathname(location.pathname);
  const subject = pathway ? findByPathwayGroup(pathway, subjectSlug) : null;

  // Môn không tồn tại hoặc chưa available
  if (!subject || !subject.available) {
    return (
      <div className="subject-page subject-page--not-found">
        <div style={{ fontSize: 64 }}>🔍</div>
        <h1>Môn học không tồn tại</h1>
        <p>Có thể môn này chưa ra mắt hoặc đường dẫn không đúng.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          ← Về trang chủ
        </button>
      </div>
    );
  }

  const handleStart = (slug: string, isFree: boolean) => {
    if (!isFree && !isLoggedIn) {
      loginWithGoogle();
      return;
    }
    if (subject && pathway) {
      navigate(getLessonUrl(subject, slug));
    }
  };

  // Back button — về trang lộ trình (/cambridge hoặc /lop6)
  const backLabel = pathway === "cambridge" ? "← Cambridge" : pathway === "lop6" ? "← Tất cả môn Lớp 6" : "← Trang chủ";
  const backUrl   = pathway ? getPathwayUrl(pathway) : "/";

  return (
    <div className="subject-page">

      {/* Header môn học */}
      <div
        className="subject-page__hero"
        style={{ "--subject-color": subject.color } as React.CSSProperties}
      >
        <button
          className="subject-page__back"
          onClick={() => navigate(backUrl)}
          id="btn-subject-back"
        >
          {backLabel}
        </button>
        <div className="subject-page__hero-emoji">{subject.emoji}</div>
        <h1 className="subject-page__hero-title">{subject.label}</h1>
        <p className="subject-page__hero-desc">{subject.desc}</p>
        <div className="subject-page__hero-stats">
          <span>{subject.lessons.length} bài học</span>
          <span>·</span>
          <span>
            {subject.lessons.filter((l) => l.is_free).length} bài miễn phí
          </span>
        </div>
      </div>

      {/* Danh sách bài học */}
      <div className="subject-page__lessons">
        {subject.lessons.length === 0 ? (
          <div className="subject-page__empty">
            <div style={{ fontSize: 48 }}>🚧</div>
            <p>Đang soạn bài — sắp ra mắt!</p>
            <button className="btn btn-outline" onClick={() => navigate(backUrl)}>
              Xem môn khác
            </button>
          </div>
        ) : (
          <div className="subject-lesson-grid">
            {subject.lessons.map((lesson, idx) => (
              <div
                key={lesson.id}
                className={`subject-lesson-card card card-hover card-interactive ${
                  !lesson.is_free && !isLoggedIn ? "subject-lesson-card--locked" : ""
                }`}
                onClick={() => handleStart(lesson.slug, lesson.is_free)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleStart(lesson.slug, lesson.is_free);
                }}
                id={`btn-lesson-${lesson.slug}`}
                style={{ "--subject-color": subject.color } as React.CSSProperties}
              >
                <div className="subject-lesson-card__number">{String(idx + 1).padStart(2, "0")}</div>
                <div className="subject-lesson-card__emoji">{lesson.emoji}</div>
                <div className="subject-lesson-card__content">
                  <div className="subject-lesson-card__tags">
                    <span className={`badge ${SKILL_COLORS[lesson.skill]}`}>
                      {SKILL_LABELS[lesson.skill]}
                    </span>
                    {lesson.part && (
                      <span className="badge badge-primary">Part {lesson.part}</span>
                    )}
                    {lesson.level && (
                      <span className="badge badge-primary">{lesson.level}</span>
                    )}
                    {lesson.is_free ? (
                      <span className="badge badge-success">Miễn phí</span>
                    ) : (
                      <span className="badge badge-warning">🔒 Premium</span>
                    )}
                  </div>
                  <h3 className="subject-lesson-card__title">{lesson.title}</h3>
                  <p className="subject-lesson-card__meta">{lesson.questions} câu hỏi</p>
                </div>
                <div className="subject-lesson-card__arrow">→</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
