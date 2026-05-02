/**
 * SubjectPage.tsx — Trang hiển thị tất cả bài học của 1 môn
 * URL mới: /:pathway/:subjectSlug
 *   Cambridge: /cambridge/flyers
 *   Lớp 6:    /lop6/toan
 *
 * v3 — Grade Tabs + Filter Chips + Stats bar + Card grid (redesigned cards)
 */

import React, { useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { findByPathwayGroup } from "../data/subjects";
import type { Lesson } from "../data/subjects";
import { getPathwayFromPathname, getLessonUrl, getPathwayUrl } from "../utils/urlHelpers";
import { Breadcrumb, useBreadcrumbs } from "../components/ui/Breadcrumb";
import "./SubjectPage.css";

// ─── Constants ───────────────────────────────────────────────────────────────

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

const DIFFICULTY_CONFIG: Record<string, { label: string; className: string; emoji: string }> = {
  easy:   { label: "Easy",   className: "badge-difficulty-easy",   emoji: "🟢" },
  medium: { label: "Medium", className: "badge-difficulty-medium", emoji: "🟡" },
  hard:   { label: "Hard",   className: "badge-difficulty-hard",   emoji: "🔴" },
};

/** Tabs grade — cho cả Math lẫn Reading */
type GradeTab = "all" | "3-4" | "4-5" | "5-6";
type DiffFilter = "all" | "easy" | "medium" | "hard";
type FreeFilter = "all" | "free" | "premium";

const GRADE_TABS: { key: GradeTab; label: string }[] = [
  { key: "all",  label: "Tất cả" },
  { key: "3-4",  label: "Lớp 3–4" },
  { key: "4-5",  label: "Lớp 4–5" },
  { key: "5-6",  label: "Lớp 5–6" },
];

const DIFF_CHIPS: { key: DiffFilter; label: string; emoji: string }[] = [
  { key: "all",    label: "Mọi độ khó", emoji: "⚡" },
  { key: "easy",   label: "Easy",       emoji: "🟢" },
  { key: "medium", label: "Medium",     emoji: "🟡" },
  { key: "hard",   label: "Hard",       emoji: "🔴" },
];

const FREE_CHIPS: { key: FreeFilter; label: string; emoji: string }[] = [
  { key: "all",     label: "Tất cả",  emoji: "📚" },
  { key: "free",    label: "Miễn phí", emoji: "🎁" },
  { key: "premium", label: "Premium",  emoji: "⭐" },
];

// ─── Grade badge config (website-wide fixed colors) ──────────────────────────

/** Key: grade_target value → CSS class & label */
const GRADE_BADGE: Record<string, { className: string; label: string }> = {
  "3-4": { className: "badge-grade-34", label: "Lớp 3–4" },
  "4-5": { className: "badge-grade-45", label: "Lớp 4–5" },
  "5-6": { className: "badge-grade-56", label: "Lớp 5–6" },
};

// ─── Helper: check if a lesson matches a grade tab ───────────────────────────

function lessonMatchesGrade(lesson: Lesson, tab: GradeTab): boolean {
  if (tab === "all") return true;
  // Primary: grade_target — exact match
  if (lesson.grade_target) return lesson.grade_target === tab;
  // Fallback: grade_min/grade_max — exact boundary match (NOT overlap)
  if (lesson.grade_min != null && lesson.grade_max != null) {
    const [lo, hi] = tab.split("-").map(Number);
    return lesson.grade_min === lo && lesson.grade_max === hi;
  }
  // Bài không có thông tin grade → chỉ hiện ở tab "all"
  return false;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface StatsBarProps {
  total: number;
  free: number;
  recommended: number;
  avgMinutes: number;
  color: string;
}

function StatsBar({ total, free, recommended, avgMinutes, color }: StatsBarProps) {
  return (
    <div className="sp-stats-bar" style={{ "--subject-color": color } as React.CSSProperties}>
      <div className="sp-stats-bar__item">
        <span className="sp-stats-bar__value" style={{ color }}>{total}</span>
        <span className="sp-stats-bar__label">bài luyện</span>
      </div>
      <div className="sp-stats-bar__divider" />
      <div className="sp-stats-bar__item">
        <span className="sp-stats-bar__value" style={{ color }}>{free}</span>
        <span className="sp-stats-bar__label">miễn phí</span>
      </div>
      {recommended > 0 && (
        <>
          <div className="sp-stats-bar__divider" />
          <div className="sp-stats-bar__item">
            <span className="sp-stats-bar__value" style={{ color }}>{recommended}</span>
            <span className="sp-stats-bar__label">gợi ý</span>
          </div>
        </>
      )}
      {avgMinutes > 0 && (
        <>
          <div className="sp-stats-bar__divider" />
          <div className="sp-stats-bar__item">
            <span className="sp-stats-bar__value" style={{ color }}>~{avgMinutes}'</span>
            <span className="sp-stats-bar__label">mỗi bài</span>
          </div>
        </>
      )}
    </div>
  );
}

interface LessonCardProps {
  lesson: Lesson;
  isLoggedIn: boolean;
  subjectColor: string;
  onClick: () => void;
}

function LessonCard({ lesson, isLoggedIn, subjectColor, onClick }: LessonCardProps) {
  const isPremium = !lesson.is_free;
  const locked    = isPremium && !isLoggedIn;
  const diff      = lesson.difficulty ? DIFFICULTY_CONFIG[lesson.difficulty] : null;
  const grade     = lesson.grade_target ? GRADE_BADGE[lesson.grade_target] : null;

  // Chỉ lấy phần đầu trước " — " (VD: "Reading Comprehension — Easy — Grade 3-4" → "Reading Comprehension")
  const displayTitle = lesson.title.split(" — ")[0];

  return (
    <div
      className={[
        "sp-lesson-card",
        isPremium          ? "sp-lesson-card--premium"     : "",
        lesson.recommended ? "sp-lesson-card--recommended" : "",
      ].filter(Boolean).join(" ")}
      style={{ "--subject-color": subjectColor } as React.CSSProperties}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      id={`btn-lesson-${lesson.slug}`}
      aria-label={`${displayTitle}${locked ? " — yêu cầu đăng nhập" : ""}`}
    >
      {/* Header: grade badge (left) + skill badge (right) */}
      <div className="sp-lesson-card__header">
        {grade ? (
          <span className={`badge sp-grade-badge ${grade.className}`}>{grade.label}</span>
        ) : lesson.level ? (
          <span className="badge badge-primary sp-grade-badge">{lesson.level}</span>
        ) : (
          <span />
        )}
        <span className={`badge sp-grade-badge ${SKILL_COLORS[lesson.skill]}`}>
          {SKILL_LABELS[lesson.skill]}
        </span>
      </div>

      {/* Title — chỉ phần đầu */}
      <h3 className="sp-lesson-card__title">
        {lesson.recommended && <span className="sp-lesson-card__star">⭐</span>}
        {displayTitle}
      </h3>

      {/* Meta */}
      <div className="sp-lesson-card__meta">
        <span>{lesson.questions} câu hỏi</span>
        {lesson.est_minutes && <span>· ~{lesson.est_minutes} phút</span>}
      </div>

      {/* Footer: premium (left) + difficulty (right) */}
      <div className="sp-lesson-card__footer">
        {isPremium ? (
          <span className="badge sp-badge-premium">🔒 Premium</span>
        ) : (
          <span />
        )}
        {diff && (
          <span className={`badge sp-grade-badge ${diff.className}`}>{diff.emoji} {diff.label}</span>
        )}
      </div>

      {/* Lock overlay khi chưa đăng nhập */}
      {locked && (
        <div className="sp-lesson-card__lock-icon" aria-hidden>🔒</div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SubjectPage() {
  const { subjectSlug = "" } = useParams<{ subjectSlug: string }>();
  const location  = useLocation();
  const navigate  = useNavigate();
  const { isLoggedIn, loginWithGoogle } = useAuth();

  // ── Resolve subject ──
  const pathway = getPathwayFromPathname(location.pathname);
  const subject = pathway ? findByPathwayGroup(pathway, subjectSlug) : null;

  // ── Filter state ──
  const [activeGrade, setActiveGrade] = useState<GradeTab>("all");
  const [activeDiff,  setActiveDiff]  = useState<DiffFilter>("all");
  const [activeFree,  setActiveFree]  = useState<FreeFilter>("all");

  // ── Derived data ──
  const hasGradeTabs = useMemo(
    () => subject?.lessons.some((l) => l.grade_target || (l.grade_min != null && l.grade_max != null)) ?? false,
    [subject],
  );
  const hasDiffFilter = useMemo(
    () => subject?.lessons.some((l) => l.difficulty) ?? false,
    [subject],
  );

  const filtered = useMemo<Lesson[]>(() => {
    if (!subject) return [];
    const DIFF_ORDER: Record<string, number> = { easy: 0, medium: 1, hard: 2 };
    return subject.lessons
      .filter((l) => {
        if (!lessonMatchesGrade(l, activeGrade)) return false;
        if (activeDiff !== "all" && l.difficulty !== activeDiff) return false;
        if (activeFree === "free"    && !l.is_free) return false;
        if (activeFree === "premium" &&  l.is_free) return false;
        return true;
      })
      .sort((a, b) => {
        // 1. Recommended first
        if ((b.recommended ? 1 : 0) !== (a.recommended ? 1 : 0))
          return (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0);
        // 2. Easy → Medium → Hard
        const da = a.difficulty ? (DIFF_ORDER[a.difficulty] ?? 99) : 99;
        const db = b.difficulty ? (DIFF_ORDER[b.difficulty] ?? 99) : 99;
        if (da !== db) return da - db;
        // 3. ID alphabetical (P1 before P2)
        return a.id.localeCompare(b.id);
      });
  }, [subject, activeGrade, activeDiff, activeFree]);

  const stats = useMemo(() => {
    if (!subject) return { total: 0, free: 0, recommended: 0, avgMinutes: 0 };
    const all  = subject.lessons;
    const mins = all.filter((l) => l.est_minutes).map((l) => l.est_minutes as number);
    return {
      total:       all.length,
      free:        all.filter((l) => l.is_free).length,
      recommended: all.filter((l) => l.recommended).length,
      avgMinutes:  mins.length > 0 ? Math.round(mins.reduce((a, b) => a + b, 0) / mins.length) : 0,
    };
  }, [subject]);

  // ── Not found ──
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

  // ── Grade tab counts ──
  const gradeTabCounts = useMemo(() => {
    if (!subject) return {} as Record<GradeTab, number>;
    return {
      all:   subject.lessons.length,
      "3-4": subject.lessons.filter((l) => lessonMatchesGrade(l, "3-4")).length,
      "4-5": subject.lessons.filter((l) => lessonMatchesGrade(l, "4-5")).length,
      "5-6": subject.lessons.filter((l) => lessonMatchesGrade(l, "5-6")).length,
    } as Record<GradeTab, number>;
  }, [subject]);

  // ── Event handlers ──
  const handleStart = (lesson: Lesson) => {
    if (!lesson.is_free && !isLoggedIn) {
      loginWithGoogle();
      return;
    }
    navigate(getLessonUrl(subject, lesson.slug));
  };

  // ── Breadcrumbs ──
  const breadcrumbs = useBreadcrumbs(location.pathname, subject.label);

  return (
    <div className="subject-page">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbs} />

      {/* Hero — dùng class CSS đã định nghĩa */}
      <div className="subject-page__hero" style={{ "--subject-color": subject.color } as React.CSSProperties}>
        <div className="subject-page__hero-emoji">{subject.emoji}</div>
        <h1 className="subject-page__hero-title">{subject.label}</h1>
        <p className="subject-page__hero-desc">{subject.desc}</p>
        <div className="subject-page__hero-meta">
          <span>{stats.total} bài học</span>
          <span>·</span>
          <span>{stats.free} bài miễn phí</span>
        </div>
      </div>

      {/* Stats bar */}
      <StatsBar
        total={stats.total}
        free={stats.free}
        recommended={stats.recommended}
        avgMinutes={stats.avgMinutes}
        color={subject.color}
      />

      {/* Controls: grade tabs + filter chips + result count — wrap trong sp-controls */}
      <div className="sp-controls" style={{ "--subject-color": subject.color } as React.CSSProperties}>
        {/* Grade tabs */}
        {hasGradeTabs && (
          <div className="sp-grade-tabs">
            {GRADE_TABS.map((tab) => (
              <button
                key={tab.key}
                className={`sp-grade-tab${activeGrade === tab.key ? " sp-grade-tab--active" : ""}`}
                onClick={() => setActiveGrade(tab.key)}
              >
                {tab.label}
                <span className="sp-grade-tab__count">{gradeTabCounts[tab.key] ?? 0}</span>
              </button>
            ))}
          </div>
        )}

        {/* Filter chips */}
        <div className="sp-filter-row">
          {/* Difficulty chips */}
          {hasDiffFilter && (
            <div className="sp-filter-group">
              {DIFF_CHIPS.map((c) => (
                <button
                  key={c.key}
                  className={`sp-chip${activeDiff === c.key ? " sp-chip--active" : ""}`}
                  onClick={() => setActiveDiff(c.key)}
                >
                  {c.emoji} {c.label}
                </button>
              ))}
            </div>
          )}
          {/* Free/Premium chips */}
          <div className="sp-filter-group">
            {FREE_CHIPS.map((c) => (
              <button
                key={c.key}
                className={`sp-chip${activeFree === c.key ? " sp-chip--active" : ""}`}
                onClick={() => setActiveFree(c.key)}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Result count */}
        <div className="sp-result-count">
          {filtered.length < stats.total
            ? `${filtered.length} / ${stats.total} bài`
            : `${filtered.length} bài`}
        </div>
      </div>

      {/* Lesson grid — dùng sp-lessons wrapper */}
      <div className="sp-lessons">
        {filtered.length === 0 ? (
          <div className="subject-page__empty">
            <div style={{ fontSize: 48 }}>🔎</div>
            <p>Không có bài học nào phù hợp với bộ lọc hiện tại.</p>
            <button
              className="btn btn-outline"
              onClick={() => { setActiveGrade("all"); setActiveDiff("all"); setActiveFree("all"); }}
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="sp-lesson-grid">
            {filtered.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                isLoggedIn={isLoggedIn}
                subjectColor={subject.color}
                onClick={() => handleStart(lesson)}
              />
            ))}
          </div>
        )}

        {/* Back link */}
        <div style={{ marginTop: "var(--space-4)" }}>
          <button className="btn btn-ghost" onClick={() => navigate(pathway ? getPathwayUrl(pathway) : "/")}>
            ← Quay lại danh sách môn học
          </button>
        </div>
      </div>
    </div>
  );
}
