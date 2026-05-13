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
import { useSubjects } from "../hooks/useSubjects";
import { Breadcrumb, useBreadcrumbs } from "../components/ui/Breadcrumb";
import "./SubjectPage.css";

// ─── Quiz score cache key helper ─────────────────────────────────────────────
const SKILL_PREF_KEY = (slug: string) => `sp_skill_${slug}`;
const PART_PREF_KEY  = (slug: string, skill: string) => `sp_part_${slug}_${skill}`;


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

const DIFFICULTY_CONFIG: Record<string, { label: string; shortLabel: string; className: string; emoji: string }> = {
  easy:   { label: "Easy",   shortLabel: "Easy", className: "badge-difficulty-easy",   emoji: "🟢" },
  medium: { label: "Medium", shortLabel: "Med",  className: "badge-difficulty-medium", emoji: "🟡" },
  hard:   { label: "Hard",   shortLabel: "Hard", className: "badge-difficulty-hard",   emoji: "🔴" },
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
  { key: "all",    label: "All Levels", emoji: "⚡" },
  { key: "easy",   label: "Easy",       emoji: "🟢" },
  { key: "medium", label: "Medium",     emoji: "🟡" },
  { key: "hard",   label: "Hard",       emoji: "🔴" },
];

// ─── Cambridge Part Metadata ────────────────────────────────────────────────
/** Part desc theo đề thi Flyers chính thức */
const CAMBRIDGE_PARTS: Record<string, Record<number, { desc: string }>> = {
  reading: {
    1: { desc: "Look and Read" },
    2: { desc: "Choose Word" },
    3: { desc: "Best Answer" },
    4: { desc: "Gap Fill" },
    5: { desc: "Write a Word" },
  },
  listening: {
    1: { desc: "Draw Lines" },
    2: { desc: "Listen & Write" },
    3: { desc: "Choose" },
    4: { desc: "Tick the Box" },
    5: { desc: "Listen & Color" },
  },
};

/** Cambridge: Reading tab → "Reading & Writing" */
function getCambridgeSkillMeta(skillKey: string): { label: string; emoji: string } {
  if (skillKey === "reading")   return { label: "Reading & Writing", emoji: "📖" };
  if (skillKey === "listening") return { label: "Listening",         emoji: "🎧" };
  return SKILL_META.find(s => s.key === skillKey) ?? { label: skillKey, emoji: "📚" };
}

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
  isCambridge?: boolean;
  score?: number;
  onClick: () => void;
}

function LessonCard({ lesson, isLoggedIn, subjectColor, isCambridge, score, onClick }: LessonCardProps) {
  const isPremium = !lesson.is_free;
  const locked    = isPremium && !isLoggedIn;
  const diff      = lesson.difficulty ? DIFFICULTY_CONFIG[lesson.difficulty] : null;
  const grade     = lesson.grade_target ? GRADE_BADGE[lesson.grade_target] : null;

  // Color-code % badge theo mức độ
  const scoreBadgeClass =
    score === undefined  ? "" :
    score >= 80  ? "sp-score-badge--done" :   // xanh lá
    score >= 50  ? "sp-score-badge--partial" : // vàng
    "sp-score-badge--low";                     // đỏ

  // Chỉ lấy phần đầu trước " — " để tiêu đề gọn hơn
  const displayTitle = lesson.title.split(" — ")[0];

  return (
    <div
      className={[
        "sp-lesson-card",
        locked ? "sp-lesson-card--premium" : "",
        lesson.recommended ? "sp-lesson-card--recommended" : "",
        score !== undefined ? "sp-lesson-card--attempted" : "",
      ].filter(Boolean).join(" ")}
      style={{ "--subject-color": subjectColor } as React.CSSProperties}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      id={`btn-lesson-${lesson.slug}`}
      aria-label={`${displayTitle}${locked ? " — yêu cầu đăng nhập" : ""}`}
    >
      {/* % Hoàn thành badge — top-right absolute */}
      {score !== undefined && (
        <span className={`sp-score-badge ${scoreBadgeClass}`}>
          {score}%
        </span>
      )}
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
        <span>{lesson.questions} {isCambridge ? "questions" : "câu hỏi"}</span>
        {lesson.est_minutes && <span>· ~{lesson.est_minutes} {isCambridge ? "min" : "phút"}</span>}
      </div>

      {/* Footer: lock/premium (left) + difficulty (right) */}
      <div className="sp-lesson-card__footer">
        {isPremium ? (
          <span className="badge sp-badge-premium">
            🔒{" "}
            <span className="sp-badge-text--full">Premium</span>
            <span className="sp-badge-text--short">Pre</span>
          </span>
        ) : (
          <span />
        )}
        {diff && (
          <span className={`badge sp-grade-badge ${diff.className}`}>
            {diff.emoji}{" "}
            <span className="sp-badge-text--full">{diff.label}</span>
            <span className="sp-badge-text--short">{diff.shortLabel}</span>
          </span>
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
  const { isLoggedIn } = useAuth();

  const pathway = getPathwayFromPathname(location.pathname);
  const subjectMeta = pathway ? findByPathwayGroup(pathway, subjectSlug) : null;
  const { lessons: apiLessons } = useSubjects({ 
    pathway: pathway || "", 
    subject: subjectSlug 
  });

  const subject = useMemo(() => {
    if (!subjectMeta) return null;
    return {
      ...subjectMeta,
      lessons: apiLessons.length > 0 ? apiLessons : subjectMeta.lessons
    };
  }, [subjectMeta, apiLessons]);

  // ── Khởi tạo grade từ localStorage ngay lần đầu render ──
  const initialGradeTab = useMemo(() => getUserGradeTab(), []);
  const [userGradeTab, setUserGradeTab] = useState<GradeTab>(initialGradeTab);

  // ── Filter state ──
  const isCambridge = pathway === "cambridge";

  const [activeSkill,      setActiveSkill]      = useState<string>("");
  const [activeGrade,      setActiveGrade]      = useState<GradeTab>(initialGradeTab);
  const [activeDiff,       setActiveDiff]       = useState<DiffFilter>("all");
  const [activePart,       setActivePart]       = useState<number | null>(null);
  // Track xem user đã chủ động đổi grade chưa (nếu đã đổi thì không auto-reset khi API về)
  const [gradeManuallySet, setGradeManuallySet] = useState(false);

  // ── Quiz scores: { [quizId]: bestPct } ──
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

  // Fetch quiz scores khi component mount (chỉ khi đã login)
  useEffect(() => {
    if (!isLoggedIn) return;
    fetch("/api/student/quiz-scores", { credentials: "include" })
      .then(r => r.ok ? r.json() : { scores: {} })
      .then((data: { scores: Record<string, number> }) => {
        setQuizScores(data.scores ?? {});
      })
      .catch(() => { /* không hiện lỗi — badge chỉ là UI phụ */ });
  }, [isLoggedIn]);

  // ── Sync grade khi GlobalHeader fetch xong và dispatch 'grade:updated' ──
  useEffect(() => {
    const onGradeUpdated = () => {
      const fresh = getUserGradeTab();
      setUserGradeTab(fresh);
      // Chỉ reset activeGrade nếu user chưa chủ động chọn
      if (!gradeManuallySet) {
        setActiveGrade(fresh);
      }
    };
    window.addEventListener("grade:updated", onGradeUpdated);
    return () => window.removeEventListener("grade:updated", onGradeUpdated);
  }, [gradeManuallySet]);

  // ── Cambridge: auto-select Part khi đổi skill — khôi phục từ sessionStorage nếu có ──
  useEffect(() => {
    if (!isCambridge || !subject || !activeSkill) return;
    const parts = [...new Set(
      subject.lessons
        .filter(l => l.skill === activeSkill)
        .map(l => l.part)
        .filter((p): p is number => p != null)
    )].sort((a, b) => a - b);

    // Ưu tiên khôi phục part đã chọn từ sessionStorage
    const savedPart = sessionStorage.getItem(PART_PREF_KEY(subjectSlug, activeSkill));
    const savedPartNum = savedPart ? parseInt(savedPart, 10) : null;
    const restoredPart = savedPartNum && parts.includes(savedPartNum) ? savedPartNum : (parts[0] ?? null);
    setActivePart(restoredPart);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCambridge, activeSkill]);

  // ── Lưu activePart vào sessionStorage khi user chọn ──
  useEffect(() => {
    if (!isCambridge || !activeSkill || activePart === null) return;
    sessionStorage.setItem(PART_PREF_KEY(subjectSlug, activeSkill), String(activePart));
  }, [isCambridge, subjectSlug, activeSkill, activePart]);

  // ── Available skills (chỉ những skill có bài) ──
  const availableSkills = useMemo(() => {
    if (!subject) return [];
    const skillSet = new Set<string>(
      subject.lessons.map(l => l.skill as string).filter(Boolean)
    );
    return SKILL_META.filter(s => skillSet.has(s.key));
  }, [subject]);

  // ── Set default skill khi load subject — ưu tiên sessionStorage ──
  useEffect(() => {
    if (availableSkills.length > 0 && !activeSkill) {
      // Khôi phục skill đã chọn trước đó (nếu có)
      const saved = sessionStorage.getItem(SKILL_PREF_KEY(subjectSlug));
      const valid = availableSkills.find(s => s.key === saved);
      setActiveSkill(valid ? valid.key : availableSkills[0].key);
    }
  }, [availableSkills, activeSkill, subjectSlug]);

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
      // Cambridge: lọc theo Part; Lớp 6: lọc theo Grade
      .filter(l => isCambridge
        ? (activePart === null || l.part === activePart)
        : lessonMatchesGrade(l, activeGrade)
      )
      .filter(l => activeDiff === "all" || l.difficulty === activeDiff)
      .sort((a, b) => {
        if ((b.recommended ? 1 : 0) !== (a.recommended ? 1 : 0))
          return (b.recommended ? 1 : 0) - (a.recommended ? 1 : 0);
        // Cambridge: sort theo Part number trước
        const pa = a.part ?? 99, pb = b.part ?? 99;
        if (pa !== pb) return pa - pb;
        const da = a.difficulty ? (DIFF_ORDER[a.difficulty] ?? 99) : 99;
        const db = b.difficulty ? (DIFF_ORDER[b.difficulty] ?? 99) : 99;
        if (da !== db) return da - db;
        return a.id.localeCompare(b.id);
      });
  }, [subject, activeSkill, activeGrade, activeDiff, isCambridge, activePart]);

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
      navigate("/register");
      return;
    }
    navigate(getLessonUrl(subject, lesson.slug));
  };

  // ── Khi đổi Skill Tab: reset grade về grade user, reset difficulty — lưu vào sessionStorage ──
  const handleSkillChange = (skillKey: string) => {
    // Tab "Vocabulary" trong Cambridge → navigate sang VocabularyPage
    if (skillKey === "vocabulary" && pathway === "cambridge") {
      const certParam = subjectSlug ?? "flyers";
      navigate(`/cambridge/vocabulary?cert=${certParam}`);
      return;
    }
    setActiveSkill(skillKey);
    setActivePart(null); // reset Part khi đổi Skill
    sessionStorage.setItem(SKILL_PREF_KEY(subjectSlug), skillKey);
    setActiveGrade(userGradeTab);
    setActiveDiff("all");
    setGradeManuallySet(false);
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
        {/* Pathway badge — CHỈ hiện cho Lớp 6, Cambridge không cần */}
        {pathway !== "cambridge" && (
          <div className="subject-page__hero-pathway-badge">
            {pathway === "lop6" ? "🏫 Luyện Thi Lớp 6" : "🇬🇧 Cambridge"}
          </div>
        )}

        {/* Cambridge: emoji + title cùng hàng */}
        {isCambridge ? (
          <div className="subject-page__hero-inline">
            <span className="subject-page__hero-emoji subject-page__hero-emoji--inline">
              {subject.emoji}
            </span>
            <h1 className="subject-page__hero-title">
              {subject.label}
            </h1>
          </div>
        ) : (
          <>
            <div className="subject-page__hero-emoji">{subject.emoji}</div>
            <h1 className="subject-page__hero-title">
              {pathway === "lop6" ? `Môn ${subject.label.replace(" — Luyện Thi Lớp 6", "")}` : subject.label}
            </h1>
          </>
        )}

        <p className="subject-page__hero-desc">
          {pathway === "lop6"
            ? `Luyện thi tuyển sinh lớp 6 — ${availableSkills.map(s => s.label).join(" · ")} (${stats.total} bài)`
            : subject.desc}
        </p>
      </div>


      {/* ── Skill Tab Bar (chỉ hiện khi > 1 skill) ── */}
      {showSkillTabs && (
        <div
          className={`sp-skill-tabs${isCambridge ? " sp-skill-tabs--cambridge" : ""}`}
          style={{ "--subject-color": subject.color } as React.CSSProperties}
          role="tablist"
          aria-label="Chọn kỹ năng"
        >
          {availableSkills.map(skill => {
            const meta = isCambridge ? getCambridgeSkillMeta(skill.key) : skill;
            return (
              <button
                key={skill.key}
                role="tab"
                aria-selected={activeSkill === skill.key}
                className={`sp-skill-tab${activeSkill === skill.key ? " sp-skill-tab--active" : ""}`}
                onClick={() => handleSkillChange(skill.key)}
                id={`tab-skill-${skill.key}`}
              >
                <span className="sp-skill-tab__emoji">{meta.emoji}</span>
                <span className="sp-skill-tab__label">{meta.label}</span>
                <span className="sp-skill-tab__count">{lessonCountBySkill[skill.key] ?? 0}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* ── Controls wrapper ── */}
      <div
        className="sp-controls"
        style={{ "--subject-color": subject.color } as React.CSSProperties}
      >
        {/* ── Grade Selector Card — CHỈ hiện cho Lớp 6 pathway ── */}
        {!isCambridge && (
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
                    onClick={() => { setActiveGrade(tab.key); setGradeManuallySet(true); }}
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
                      {ctx === "own"    && (
                        <>
                          <span className="sp-grade-pill__ctx-symbol">✓</span>
                          <span className="sp-grade-pill__ctx-label"> Của bạn</span>
                        </>
                      )}
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
        )}

        {/* ── Part Navigation — CHỈ hiện cho Cambridge pathway ── */}
        {isCambridge && activeSkill && (
          <div className="sp-part-nav">
            <span className="sp-part-nav__label">📌 Choose a Part</span>
            <div className="sp-part-pills">
              {Object.entries(CAMBRIDGE_PARTS[activeSkill] ?? {}).map(([numStr, meta]) => {
                const partNum = Number(numStr);
                const count = subject.lessons.filter(
                  l => l.skill === activeSkill && l.part === partNum
                ).length;
                const isActive  = activePart === partNum;
                const isEmpty   = count === 0;
                return (
                  <button
                    key={partNum}
                    className={[
                      "sp-part-pill",
                      isActive ? "sp-part-pill--active"  : "",
                      isEmpty  ? "sp-part-pill--empty"   : "",
                    ].filter(Boolean).join(" ")}
                    onClick={() => !isEmpty && setActivePart(isActive ? null : partNum)}
                    id={`btn-part-${partNum}`}
                    aria-pressed={isActive}
                    title={isEmpty ? "Chưa có nội dung" : meta.desc}
                  >
                    <span className="sp-part-pill__num">Part {partNum}</span>
                    <span className="sp-part-pill__desc">{meta.desc}</span>
                    {!isEmpty && (
                      <span className="sp-part-pill__count">{count} lesson{count !== 1 ? "s" : ""}</span>
                    )}
                    {isEmpty && (
                      <span className="sp-part-pill__soon">Coming soon</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

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
          {(() => {
            const unit = isCambridge ? "lesson" : "bài";
            const total = stats.total;
            const shown = filtered.length;
            return shown < total
              ? `${shown} / ${total} ${unit}${isCambridge && total !== 1 ? "s" : ""}`
              : `${shown} ${unit}${isCambridge && shown !== 1 ? "s" : ""}`;
          })()}
        </div>
      </div>

      {/* Lesson grid */}
      <div className="sp-lessons">
        {filtered.length === 0 ? (
          <div className="subject-page__empty">
            <div style={{ fontSize: 48 }}>🔎</div>
            <p>{isCambridge ? "No lessons match the current filter." : "Không có bài học nào phù hợp với bộ lọc hiện tại."}</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setActiveGrade(userGradeTab);
                setActiveDiff("all");
              }}
            >
              {isCambridge ? "Clear Filters" : "Xóa bộ lọc"}
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
                isCambridge={isCambridge}
                score={quizScores[lesson.id]}
                onClick={() => handleStart(lesson)}
              />
            ))}
          </div>
        )}

        {/* Back link */}
        <div style={{ marginTop: "var(--space-4)" }}>
          <button className="btn btn-ghost" onClick={() => navigate(pathway ? getPathwayUrl(pathway) : "/")}>
            {isCambridge ? "← Back to Cambridge" : "← Quay lại danh sách môn học"}
          </button>
        </div>
      </div>
    </div>
  );
}
