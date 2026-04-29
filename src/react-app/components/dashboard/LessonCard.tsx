/**
 * LessonCard.tsx — Card bài học gợi ý
 *
 * Hiển thị: emoji skill, tên bài, level, số câu, free/premium
 * Click → navigate vào bài quiz
 *
 * Phase 07
 */

import type { Lesson } from "../../data/subjects";

// ============================================
// Props
// ============================================
interface LessonCardProps {
  lesson: Lesson & { subjectId: string };
  onClick: () => void;
  highlight?: boolean;    // highlight bài gợi ý mạnh nhất
}

// ============================================
// Skill color helpers
// ============================================
const SKILL_BADGE: Record<string, { bg: string; label: string }> = {
  reading:   { bg: "badge-primary", label: "Đọc" },
  listening: { bg: "badge-accent",  label: "Nghe" },
  writing:   { bg: "badge-success", label: "Viết" },
  math:      { bg: "badge-warning", label: "Toán" },
  mixed:     { bg: "badge-primary", label: "Tổng hợp" },
};

// ============================================
// LessonCard
// ============================================
export function LessonCard({ lesson, onClick, highlight = false }: LessonCardProps) {
  const badge = SKILL_BADGE[lesson.skill] ?? { bg: "badge-primary", label: lesson.skill };

  return (
    <div
      className={`lesson-rec-card${highlight ? " lesson-rec-card--highlight" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") onClick(); }}
      id={`btn-rec-${lesson.id}`}
      aria-label={`Học bài: ${lesson.title}`}
    >
      {/* Highlight badge */}
      {highlight && (
        <div className="lesson-rec-card__ribbon">⭐ Gợi ý hôm nay</div>
      )}

      {/* Emoji */}
      <div className="lesson-rec-card__emoji" aria-hidden="true">
        {lesson.emoji}
      </div>

      {/* Content */}
      <div className="lesson-rec-card__body">
        {/* Tags row */}
        <div className="lesson-rec-card__tags">
          <span className={`badge ${badge.bg}`}>{badge.label}</span>
          {lesson.level && (
            <span className="badge badge-primary">{lesson.level}</span>
          )}
          {lesson.is_free ? (
            <span className="badge badge-success">Miễn phí</span>
          ) : (
            <span className="badge badge-warning">🔒</span>
          )}
        </div>

        {/* Title */}
        <h3 className="lesson-rec-card__title">{lesson.title}</h3>

        {/* Meta */}
        <p className="lesson-rec-card__meta">
          {lesson.questions} câu hỏi
          {lesson.part ? ` · Part ${lesson.part}` : ""}
        </p>
      </div>

      {/* Arrow */}
      <div className="lesson-rec-card__arrow" aria-hidden="true">→</div>
    </div>
  );
}
