/**
 * SubjectPage.tsx — v4 (Skill Tabs + Grade Card + Personalized Grade)
 *
 * URL: /:pathway/:subjectSlug
 *   Cambridge: /cambridge/flyers
 *   Lớp 6:    /lop6/tieng-anh
 *
 * Thay đổi v4:
 *   - Skill Tab Bar: auto-detect kỹ năng có bài, ẩn nếu subject chỉ có 1 kỹ năng
 *   - Grade Selector Card: đọc localStorage("student_grade"), contextual badge 🔥/🔄
 *   - Bỏ filter free/premium (chỉ lock icon trên card)
 *   - Grade tab "Tất cả" ẩn trong Grade Card (chỉ giữ 3-4 / 4-5 / 5-6)
 */

import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { findByPathwayGroup } from "../data/subjects";
import type { Lesson } from "../data/subjects";
import { getPathwayFromPathname, getLessonUrl, getPathwayUrl } from "../utils/urlHelpers";
import { Breadcrumb, useBreadcrumbs } from "../components/ui/Breadcrumb";
import "./SubjectPage.css";

// ─── Constants ───────────────────────────────────────────────────────────────

/** Kỹ năng meta — thứ tự quyết định thứ tự tab */
const SKILL_META: { key: string; label: string; emoji: string }[] = [
  { key: "reading",    label: "Reading",    emoji: "📖" },
  { key: "writing",   label: "Writing",    emoji: "✏️" },
  { key: "listening", label: "Listening",  emoji: "🎧" },
  { key: "vocabulary",label: "Vocabulary", emoji: "📝" },
  { key: "grammar",   label: "Grammar",    emoji: "📐" },
  { key: "math",      label: "Toán",       emoji: "🔢" },
  { key: "mixed",     label: "Tổng hợp",   emoji: "🎯" },
];

const SKILL_COLORS: Record<string, string> = {
  reading:    "badge-primary",
  listening:  "badge-accent",
  writing:    "badge-success",
  math:       "badge-warning",
  mixed:      "badge-primary",
  vocabulary: "badge-accent",
  grammar:    "badge-warning",
};

const DIFFICULTY_CONFIG: Record<string, { label: string; className: string; emoji: string }> = {
  easy:   { label: "Easy",   className: "badge-difficulty-easy",   emoji: "🟢" },
  medium: { label: "Medium", className: "badge-difficulty-medium", emoji: "🟡" },
  hard:   { label: "Hard",   className: "badge-difficulty-hard",   emoji: "🔴" },
};

type GradeTab   = "all" | "3-4" | "4-5" | "5-6";
type DiffFilter = "all" | "easy" | "medium" | "hard";

/** Thứ tự grade để so sánh higher/lower */
const GRADE_ORDER: Record<GradeTab, number> = { "all": 0, "3-4": 1, "4-5": 2, "5-6": 3 };

const GRADE_TABS_DISPLAY: { key: GradeTab; label: string }[] = [
  { key: "3-4", label: "Lớp 3–4" },
  { key: "4-5", label: "Lớp 4–5" },
  { key: "5-6", label: "Lớp 5–6" },
];

const DIFF_CHIPS: { key: DiffFilter; label: string; emoji: string }[] = [
  { key: "all",    label: "Mọi độ khó", emoji: "⚡" },
  { key: "easy",   label: "Easy",       emoji: "🟢" },
  { key: "medium", label: "Medium",     emoji: "🟡" },
  { key: "hard",   label: "Hard",       emoji: "🔴" },
];

const GRADE_BADGE: Record<string, { className: string; label: string }> = {
  "3-4": { className: "badge-grade-34", label: "Lớp 3–4" },
  "4-5": { className: "badge-grade-45", label: "Lớp 4–5" },
  "5-6": { className: "badge-grade-56", label: "Lớp 5–6" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function lessonMatchesGrade(lesson: Lesson, tab: GradeTab): boolean {
  if (tab === "all") return true;
  if (lesson.grade_target) return lesson.grade_target === tab;
  if (lesson.grade_min != null && lesson.grade_max != null) {
    const [lo, hi] = tab.split("-").map(Number);
    return lesson.grade_min === lo && lesson.grade_max === hi;
  }
  return false;
}

/** Đọc grade user từ localStorage → map sang GradeTab */
function getUserGradeTab(): GradeTab {
  try {
    const raw = localStorage.getItem("student_grade");
    const g = raw ? parseInt(raw, 10) : null;
    if (g === 3) return "3-4";
    if (g === 4) return "4-5";
    if (g === 5) return "5-6";
  } catch {
    // localStorage không khả dụng
  }
  return "5-6"; // fallback: grade cao nhất
}

function getGradeContext(tab: GradeTab, userTab: GradeTab): "own" | "higher" | "lower" {
  const diff = GRADE_ORDER[tab] - GRADE_ORDER[userTab];
  if (diff === 0) return "own";
  if (diff > 0)  return "higher";
  return "lower";
}

// ─── Sub-components ──────────────────────────────────────────────────────────


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

  // Chỉ lấy phần đầu trước " — " để tiêu đề gọn hơn
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
        <span className={`badge sp-grade-badge ${SKILL_COLORS[lesson.skill] ?? "badge-primary"}`}>
          {SKILL_META.find(s => s.key === lesson.skill)?.label ?? lesson.skill}
        </span>
      </div>

      {/* Title */}
      <h3 className="sp-lesson-card__title">
        {lesson.recommended && <span className="sp-lesson-card__star">⭐</span>}
        {displayTitle}
      </h3>

      {/* Meta */}
      <div className="sp-lesson-card__meta">
        <span>{lesson.questions} câu hỏi</span>
        {lesson.est_minutes && <span>· ~{lesson.est_minutes} phút</span>}
      </div>

      {/* Footer: lock/premium (left) + difficulty (right) */}
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

  const pathway = getPathwayFromPathname(location.pathname);
  const subject = pathway ? findByPathwayGroup(pathway, subjectSlug) : null;

  // ── Khởi tạo grade từ localStorage ngay lần đầu render ──
  const initialGradeTab = useMemo(() => getUserGradeTab(), []);
  const [userGradeTab]  = useState<GradeTab>(initialGradeTab);

  // ── Filter state ──
  const [activeSkill, setActiveSkill] = useState<string>("");
  const [activeGrade, setActiveGrade] = useState<GradeTab>(initialGradeTab);
  const [activeDiff,  setActiveDiff]  = useState<DiffFilter>("all");

  // ── Available skills (chỉ những skill có bài) ──
  const availableSkills = useMemo(() => {
    if (!subject) return [];
    const skillSet = new Set<string>(
      subject.lessons.map(l => l.skill as string).filter(Boolean)
    );
    return SKILL_META.filter(s => skillSet.has(s.key));
  }, [subject]);

  // ── Set default skill khi load subject (chỉ 1 lần) ──
  useEffect(() => {
    if (availableSkills.length > 0 && !activeSkill) {
      setActiveSkill(availableSkills[0].key);
    }
  }, [availableSkills, activeSkill]);

  // ── Đếm bài theo từng skill (cho badge count trên tab) ──
  const lessonCountBySkill = useMemo(() => {
    if (!subject) return {} as Record<string, number>;
    const counts: Record<string, number> = {};
    for (const l of subject.lessons) {
      if (l.skill) counts[l.skill] = (counts[l.skill] ?? 0) + 1;
    }
    return counts;
  }, [subject]);

  // ── Đếm bài theo grade cho mỗi tab (hiện khi cần) ──
  const lessonCountByGrade = useMemo(() => {
    if (!subject) return {} as Record<GradeTab, number>;
    const counts: Partial<Record<GradeTab, number>> = {};
    for (const tab of GRADE_TABS_DISPLAY) {
      counts[tab.key] = subject.lessons
        .filter(l => activeSkill ? l.skill === activeSkill : true)
        .filter(l => lessonMatchesGrade(l, tab.key))
        .length;
    }
    return counts as Record<GradeTab, number>;
  }, [subject, activeSkill]);

  // ── Lesson list sau khi filter ──
  const filtered = useMemo<Lesson[]>(() => {
    if (!subject) return [];
    const DIFF_ORDER: Record<string, number> = { easy: 0, medium: 1, hard: 2 };
    return subject.lessons
      .filter(l => activeSkill ? l.skill === activeSkill : true)
      .filter(l => lessonMatchesGrade(l, activeGrade))
      .filter(l => activeDiff === "all" || l.difficulty === activeDiff)
      .sort((a, b) => {
        if ((b.recommended ? 1 : 0) !== (a.recommended ? 1 : 0))
          return (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0);
        const da = a.difficulty ? (DIFF_ORDER[a.difficulty] ?? 99) : 99;
        const db = b.difficulty ? (DIFF_ORDER[b.difficulty] ?? 99) : 99;
        if (da !== db) return da - db;
        return a.id.localeCompare(b.id);
      });
  }, [subject, activeSkill, activeGrade, activeDiff]);

  // ── Stats ──
  const stats = useMemo(() => {
    if (!subject) return { total: 0, free: 0, recommended: 0, avgMinutes: 0 };
    const all  = subject.lessons;
    const mins = all.filter(l => l.est_minutes).map(l => l.est_minutes as number);
    return {
      total:       all.length,
      free:        all.filter(l => l.is_free).length,
      recommended: all.filter(l => l.recommended).length,
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

  // ── Event handlers ──
  const handleStart = (lesson: Lesson) => {
    if (!lesson.is_free && !isLoggedIn) {
      loginWithGoogle();
      return;
    }
    navigate(getLessonUrl(subject, lesson.slug));
  };

  // ── Khi đổi Skill Tab: reset grade về grade user, reset difficulty ──
  const handleSkillChange = (skillKey: string) => {
    setActiveSkill(skillKey);
    setActiveGrade(userGradeTab);
    setActiveDiff("all");
  };

  // ── Grade context message ──
  const gradeContext = activeGrade !== "all" ? getGradeContext(activeGrade, userGradeTab) : null;

  // ── Breadcrumbs ──
  const breadcrumbs = useBreadcrumbs(location.pathname, subject.label);

  // ── Hiển thị Skill Tabs chỉ khi có > 1 kỹ năng ──
  const showSkillTabs = availableSkills.length > 1;

  return (
    <div className="subject-page">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbs} />

      {/* Hero */}
      <div className="subject-page__hero" style={{ "--subject-color": subject.color } as React.CSSProperties}>
        {/* Pathway badge — hiện rõ người dùng đang ở lộ trình nào */}
        <div className="subject-page__hero-pathway-badge">
          {pathway === "lop6" ? "🏫 Luyện Thi Lớp 6" : "🇬🇧 Cambridge"}
        </div>
        <div className="subject-page__hero-emoji">{subject.emoji}</div>
        <h1 className="subject-page__hero-title">
          {pathway === "lop6" ? `Môn ${subject.label.replace(" — Luyện Thi Lớp 6", "")}` : subject.label}
        </h1>
        <p className="subject-page__hero-desc">
          {pathway === "lop6"
            ? `Luyện thi tuyển sinh lớp 6 — ${availableSkills.map(s => s.label).join(" · ")} (${stats.total} bài)`
            : subject.desc}
        </p>
      </div>


      {/* ── Skill Tab Bar (chỉ hiện khi > 1 skill) ── */}
      {showSkillTabs && (
        <div
          className="sp-skill-tabs"
          style={{ "--subject-color": subject.color } as React.CSSProperties}
          role="tablist"
          aria-label="Chọn kỹ năng"
        >
          {availableSkills.map(skill => (
            <button
              key={skill.key}
              role="tab"
              aria-selected={activeSkill === skill.key}
              className={`sp-skill-tab${activeSkill === skill.key ? " sp-skill-tab--active" : ""}`}
              onClick={() => handleSkillChange(skill.key)}
              id={`tab-skill-${skill.key}`}
            >
              <span className="sp-skill-tab__emoji">{skill.emoji}</span>
              <span className="sp-skill-tab__label">{skill.label}</span>
              <span className="sp-skill-tab__count">{lessonCountBySkill[skill.key] ?? 0}</span>
            </button>
          ))}
        </div>
      )}

      {/* ── Controls wrapper ── */}
      <div
        className="sp-controls"
        style={{ "--subject-color": subject.color } as React.CSSProperties}
      >
        {/* ── Grade Selector Card ── */}
        <div className="sp-grade-card">
          <span className="sp-grade-card__label">🏫 Chọn lớp</span>
          <div className="sp-grade-card__pills">
            {GRADE_TABS_DISPLAY.map(tab => {
              const ctx = getGradeContext(tab.key, userGradeTab);
              const count = lessonCountByGrade[tab.key] ?? 0;
              return (
                <button
                  key={tab.key}
                  className={[
                    "sp-grade-pill",
                    activeGrade === tab.key ? "sp-grade-pill--active" : "",
                    `sp-grade-pill--${ctx}`,
                  ].filter(Boolean).join(" ")}
                  onClick={() => setActiveGrade(tab.key)}
                  id={`btn-grade-${tab.key.replace("-", "")}`}
                  title={
                    ctx === "higher" ? "Thử thách lớp cao hơn 🔥"
                    : ctx === "lower"  ? "Ôn lại kiến thức 🔄"
                    : "Lớp của bạn"
                  }
                >
                  <span className="sp-grade-pill__label">{tab.label}</span>
                  <span className={`sp-grade-pill__ctx ${ctx === "own" ? "sp-grade-pill__ctx--own" : ""}`}>
                    {ctx === "higher" && "🔥"}
                    {ctx === "lower"  && "🔄"}
                    {ctx === "own"    && "✓ Của bạn"}
                  </span>
                  {count > 0 && (
                    <span className="sp-grade-pill__count">{count}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Contextual hint khi chọn grade khác */}
          {gradeContext && gradeContext !== "own" && (
            <p className="sp-grade-card__hint">
              {gradeContext === "higher"
                ? "💪 Bạn đang xem bài lớp cao hơn — thử sức nào!"
                : "🔄 Bạn đang ôn lại kiến thức lớp dưới — ôn luyện thật kỹ nhé!"}
            </p>
          )}
        </div>

        {/* ── Difficulty chips ── */}
        <div className="sp-filter-row">
          <div className="sp-filter-group">
            {DIFF_CHIPS.map(c => (
              <button
                key={c.key}
                className={`sp-chip${activeDiff === c.key ? " sp-chip--active" : ""}`}
                onClick={() => setActiveDiff(c.key)}
                id={`btn-diff-${c.key}`}
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

      {/* Lesson grid */}
      <div className="sp-lessons">
        {filtered.length === 0 ? (
          <div className="subject-page__empty">
            <div style={{ fontSize: 48 }}>🔎</div>
            <p>Không có bài học nào phù hợp với bộ lọc hiện tại.</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setActiveGrade(userGradeTab);
                setActiveDiff("all");
              }}
            >
              Xóa bộ lọc
            </button>
          </div>
        ) : (
          <div className="sp-lesson-grid">
            {filtered.map(lesson => (
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
