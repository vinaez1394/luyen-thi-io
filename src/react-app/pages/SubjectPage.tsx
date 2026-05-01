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
import { Breadcrumb, useBreadcrumbs } from "../components/ui/Breadcrumb";
import "./SubjectPage.css";

const SKILL_LABELS: Record<string, string> = {
  reading:   "Reading",
  listening: "Listening",
  writing:   "Writing",
  math:      "Math",
  mixed:     "Mixed",
};

const SKILL_COLORS: Record<string, string> = {
  reading:   "badge-primary",
  listening: "badge-accent",
  writing:   "badge-success",
  math:      "badge-warning",
  mixed:     "badge-primary",
};

const DIFFICULTY_CONFIG: Record<string, { label: string; className: string }> = {
  easy:   { label: "Easy",   className: "badge-difficulty-easy" },
  medium: { label: "Medium", className: "badge-difficulty-medium" },
  hard:   { label: "Hard",   className: "badge-difficulty-hard" },
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
        <h1>Subject not found</h1>
        <p>This subject may not be available yet or the URL is incorrect.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          ← Back to Home
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

  // Breadcrumb trail và back button
  const backUrl      = pathway ? getPathwayUrl(pathway) : "/";
  const breadcrumbs  = useBreadcrumbs(location.pathname, subject?.label);

  return (
    <div className="subject-page">

      {/* Breadcrumb */}
      <div className="subject-page__breadcrumb-bar">
        <Breadcrumb items={breadcrumbs} />
      </div>

      {/* Header môn học */}
      <div
        className="subject-page__hero"
        style={{ "--subject-color": subject.color } as React.CSSProperties}
      >
        <div className="subject-page__hero-emoji">{subject.emoji}</div>
        <h1 className="subject-page__hero-title">{subject.label}</h1>
        <p className="subject-page__hero-desc">{subject.desc}</p>
        <div className="subject-page__hero-stats">
          <span>{subject.lessons.length} lessons</span>
          <span>·</span>
          <span>
            {subject.lessons.filter((l) => l.is_free).length} free
          </span>
        </div>
      </div>

      {/* Danh sách bài học */}
      <div className="subject-page__lessons">
        {subject.lessons.length === 0 ? (
          <div className="subject-page__empty">
            <div style={{ fontSize: 48 }}>🚧</div>
            <p>Coming soon — lessons are being prepared!</p>
            <button className="btn btn-outline" onClick={() => navigate(backUrl)}>
              Browse other subjects
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
                    {lesson.difficulty && DIFFICULTY_CONFIG[lesson.difficulty] && (
                      <span className={`badge ${DIFFICULTY_CONFIG[lesson.difficulty].className}`}>
                        {DIFFICULTY_CONFIG[lesson.difficulty].label}
                      </span>
                    )}
                    {lesson.part && (
                      <span className="badge badge-primary">Part {lesson.part}</span>
                    )}
                    {lesson.level && (
                      <span className="badge badge-primary">{lesson.level}</span>
                    )}
                    {lesson.is_free ? (
                      <span className="badge badge-success">Free</span>
                    ) : (
                      <span className="badge badge-warning">🔒 Premium</span>
                    )}
                  </div>
                  <h3 className="subject-lesson-card__title">{lesson.title}</h3>
                  <p className="subject-lesson-card__meta">{lesson.questions} questions</p>
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
