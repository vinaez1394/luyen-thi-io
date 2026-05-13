/**
 * RecentAttemptsList.tsx — Danh sách 10 bài gần nhất của bé
 *
 * Hiển thị theo pathway đang active (lop6 hoặc cambridge).
 * Title & link được resolve từ subjects.ts (nguồn sự thật duy nhất).
 * Format: "R&W · Part 2 · Easy · Set 1: A Visit to the Zoo 🐵"
 */

import { useNavigate } from "react-router-dom";
import type { RecentAttempt } from "../../hooks/useDashboard";
import { SUBJECTS } from "../../data/subjects";
import "./RecentAttemptsList.css";

interface Props {
  attempts:       RecentAttempt[];
  activePathway:  "lop6" | "cambridge";
}

// ── Xây dựng lookup map: quizId → { title, slug, subjectSlug } ───────────────
interface LessonMeta { title: string; slug: string; subjectSlug: string; pathway: string; part?: number; difficulty?: string; }

const LESSON_MAP: Map<string, LessonMeta> = (() => {
  const map = new Map<string, LessonMeta>();
  for (const subject of SUBJECTS) {
    for (const lesson of subject.lessons ?? []) {
      map.set(lesson.id, {
        title:       lesson.title,
        slug:        lesson.slug ?? lesson.id.toLowerCase().replace(/_/g, "-"),
        subjectSlug: subject.group ?? subject.id,
        pathway:     subject.pathway,
        part:        (lesson as { part?: number }).part,
        difficulty:  (lesson as { difficulty?: string }).difficulty,
      });
    }
  }
  return map;
})();

// ── Resolve quiz ID → human-readable label ───────────────────────────────────
function resolveLabel(attempt: RecentAttempt): string {
  const quizId = attempt.quizId;

  // 1. Ưu tiên lookup từ subjects.ts (chính xác nhất)
  const meta = LESSON_MAP.get(quizId);
  if (meta) {
    // Cambridge Flyers Part 1/2 → "R&W · Part 1 · Easy · Set 1: General"
    const fwMatch = quizId.match(/^FW(\d+)-(EASY|MED|HARD)-(\d+)$/i);
    if (fwMatch) {
      const part  = fwMatch[1];
      const diff  = fwMatch[2] === "EASY" ? "Easy" : fwMatch[2] === "MED" ? "Medium" : "Hard";
      return `R&W · Part ${part} · ${diff} · ${meta.title}`;
    }

    // Listening Flyers L001, L002...
    if (/^L\d{3}$/i.test(quizId)) {
      return `Listening · ${meta.title}`;
    }

    // RW001, RW002... (legacy Reading & Writing)
    if (/^RW\d{3}$/i.test(quizId)) {
      return `R&W · ${meta.title}`;
    }

    // Lớp 6 Reading/Writing
    if (/^(READING|WRITING)/i.test(quizId)) {
      const diff = meta.difficulty ?? "";
      return `${attempt.subject === "writing" ? "Writing" : "Reading"} · ${diff ? diff.charAt(0).toUpperCase() + diff.slice(1) + " · " : ""}${meta.title}`;
    }

    // Lớp 6 Toán
    if (/^MATH-THINKING/i.test(quizId)) {
      return `Toán · ${meta.title}`;
    }

    // Generic fallback dùng title từ subjects.ts
    return meta.title;
  }

  // 2. Fallback parse thuần nếu không có trong subjects.ts
  const fwFallback = quizId.match(/^FW(\d+)-(EASY|MED|HARD)-(\d+)$/i);
  if (fwFallback) {
    const part   = fwFallback[1];
    const diff   = fwFallback[2] === "EASY" ? "Easy" : fwFallback[2] === "MED" ? "Medium" : "Hard";
    const setNum = parseInt(fwFallback[3], 10);
    return `R&W · Part ${part} · ${diff} · Set ${setNum}`;
  }

  const mathFallback = quizId.match(/^MATH(?:-THINKING)?-GRADE(\d+)-L(\d+)-P(\d+)$/i);
  if (mathFallback) return `Toán · Level ${mathFallback[2]} · Bài ${mathFallback[3]}`;

  const readFallback = quizId.match(/^READING-(EASY|MED|HARD)-GRADE(\d+)-P(\d+)$/i);
  if (readFallback) {
    const diff = readFallback[1] === "EASY" ? "Dễ" : readFallback[1] === "MED" ? "Trung bình" : "Khó";
    return `Reading ${diff} · Lớp ${readFallback[2]} · Bài ${readFallback[3]}`;
  }

  // Trả về raw ID nếu không parse được
  return quizId;
}

// ── Resolve quiz ID → URL navigate ───────────────────────────────────────────
function getQuizLink(attempt: RecentAttempt): string {
  const quizId = attempt.quizId;
  const meta   = LESSON_MAP.get(quizId);

  if (meta) {
    // Cambridge → /cambridge/:subjectSlug/:slug
    if (meta.pathway === "cambridge") {
      return `/cambridge/${meta.subjectSlug}/${meta.slug}`;
    }
    // Lớp 6 → /lop6/:subjectSlug/:slug
    return `/lop6/${meta.subjectSlug}/${meta.slug}`;
  }

  // Fallback parse
  if (/^FW\d+-(EASY|MED|HARD)-\d+$/i.test(quizId)) {
    return `/cambridge/flyers/${quizId.toLowerCase()}`;
  }
  if (/^L\d{3}$/i.test(quizId)) {
    return `/cambridge/flyers/${quizId.toLowerCase()}`;
  }
  if (/^RW\d+$/i.test(quizId)) {
    return `/cambridge/flyers/${quizId.toLowerCase()}`;
  }
  if (/^MATH/i.test(quizId)) {
    return `/lop6/toan/${quizId.toLowerCase().replace(/_/g, "-")}`;
  }
  if (/^READING/i.test(quizId)) {
    return `/lop6/tieng-anh/${quizId.toLowerCase().replace(/_/g, "-")}`;
  }
  if (/^WRITING/i.test(quizId)) {
    return `/lop6/tieng-anh/${quizId.toLowerCase().replace(/_/g, "-")}`;
  }

  return "/learn";
}

// ── Format timestamp unix → "X ngày trước" / "Hôm nay" ─────────────────────
function relativeTime(unixSec: number): string {
  const diff = Math.floor(Date.now() / 1000) - unixSec;
  if (diff < 86400)   return "Hôm nay";
  if (diff < 172800)  return "Hôm qua";
  const days = Math.floor(diff / 86400);
  if (days < 30) return `${days} ngày trước`;
  return `${Math.floor(days / 30)} tháng trước`;
}

// ── Score → color class ───────────────────────────────────────────────────────
function scoreClass(pct: number): string {
  if (pct >= 80) return "ral--score-green";
  if (pct >= 60) return "ral--score-yellow";
  return "ral--score-red";
}

// ── Component ─────────────────────────────────────────────────────────────────
export function RecentAttemptsList({ attempts, activePathway }: Props) {
  const navigate = useNavigate();

  // Filter theo pathway active
  const filtered = attempts.filter((a) => a.pathway === activePathway);

  if (filtered.length === 0) {
    return (
      <div className="ral-empty">
        <span className="ral-empty__icon">📭</span>
        <p className="ral-empty__text">
          Chưa có bài nào trong lộ trình này.<br />
          <span className="ral-empty__cta">Bắt đầu học ngay nhé!</span>
        </p>
      </div>
    );
  }

  return (
    <ul className="ral-list" role="list" aria-label="Bài gần đây">
      {filtered.map((attempt) => (
        <li key={`${attempt.quizId}-${attempt.doneAt}`} className="ral-item">
          <button
            className="ral-row"
            id={`btn-recent-${attempt.quizId}`}
            onClick={() => navigate(getQuizLink(attempt))}
            title={`Làm lại: ${resolveLabel(attempt)}`}
          >
            {/* Score circle */}
            <div className={`ral-score ${scoreClass(attempt.bestPct)}`}>
              <span className="ral-score__pct">{attempt.bestPct}%</span>
            </div>

            {/* Info */}
            <div className="ral-info">
              <span className="ral-info__title">{resolveLabel(attempt)}</span>
              <span className="ral-info__meta">{relativeTime(attempt.doneAt)}</span>
            </div>

            {/* Arrow */}
            <span className="ral-arrow" aria-hidden="true">›</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
