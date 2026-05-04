/**
 * RecentAttemptsList.tsx — Danh sách 10 bài gần nhất của bé
 *
 * Hiển thị theo pathway đang active (lop6 hoặc cambridge).
 * Mỗi row: quiz title, subject, score bar, thời gian.
 */

import { useNavigate } from "react-router-dom";
import type { RecentAttempt } from "../../hooks/useDashboard";
import "./RecentAttemptsList.css";

interface Props {
  attempts:       RecentAttempt[];
  activePathway:  "lop6" | "cambridge";
}

// Resolve quiz ID → link navigate
function getQuizLink(quizId: string): string {
  if (/^MATH-L\d+-P\d+$/i.test(quizId))  return `/lop6/toan/${quizId.toLowerCase().replace(/_/g, "-")}`;
  if (/^READING/i.test(quizId))            return `/lop6/tieng-anh/${quizId.toLowerCase()}`;
  if (/^RW/i.test(quizId))                 return `/cambridge/flyers/reading/${quizId.toLowerCase()}`;
  if (/^L\d{3}$/i.test(quizId))           return `/cambridge/flyers/listening/${quizId.toLowerCase()}`;
  return "/learn";
}

// Resolve quiz ID → human-readable title
function resolveTitle(quizId: string): string {
  // MATH-L1-P3 → Toán Tư Duy — Bài 3
  const mathMatch = quizId.match(/^MATH-L(\d+)-P(\d+)$/i);
  if (mathMatch) return `Toán — Level ${mathMatch[1]} · Bài ${mathMatch[2]}`;

  // READING-EASY-GRADE3-P1 → Reading Dễ Lớp 3 · Bài 1
  const readMatch = quizId.match(/^READING-(EASY|MED|HARD)-GRADE(\d+)-P(\d+)$/i);
  if (readMatch) {
    const diff = readMatch[1] === "EASY" ? "Dễ" : readMatch[1] === "MED" ? "Trung bình" : "Khó";
    return `Reading ${diff} · Lớp ${readMatch[2]} · Bài ${readMatch[3]}`;
  }

  // RW001 → Cambridge Reading · 001
  const rwMatch = quizId.match(/^RW(\d+)$/i);
  if (rwMatch) return `Cambridge Reading · #${rwMatch[1]}`;

  return quizId;
}

// Format timestamp unix → "X ngày trước" / "Hôm nay"
function relativeTime(unixSec: number): string {
  const diff = Math.floor(Date.now() / 1000) - unixSec;
  if (diff < 86400)   return "Hôm nay";
  if (diff < 172800)  return "Hôm qua";
  const days = Math.floor(diff / 86400);
  if (days < 30) return `${days} ngày trước`;
  return `${Math.floor(days / 30)} tháng trước`;
}

// Score → color class
function scoreClass(pct: number): string {
  if (pct >= 80) return "ral--score-green";
  if (pct >= 60) return "ral--score-yellow";
  return "ral--score-red";
}

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
            onClick={() => navigate(getQuizLink(attempt.quizId))}
          >
            {/* Score circle */}
            <div className={`ral-score ${scoreClass(attempt.bestPct)}`}>
              <span className="ral-score__pct">{attempt.bestPct}%</span>
            </div>

            {/* Info */}
            <div className="ral-info">
              <span className="ral-info__title">{resolveTitle(attempt.quizId)}</span>
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
