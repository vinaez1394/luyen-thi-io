/**
 * SubjectProgressCard.tsx — Card hiển thị tiến độ 1 môn học
 *
 * Hiển thị:
 *   - Tên môn + emoji
 *   - Progress bar (doneFree / totalFree)
 *   - Badge chất lượng: 🟢 Giỏi / 🟡 Khá / 🔴 Cần ôn / ⏳ Chưa đủ dữ liệu
 *   - Số bài premium bị khóa
 */

import type { SubjectProgress } from "../../hooks/useDashboard";
import "./SubjectProgressCard.css";

interface Props {
  subject:  string;  // key, e.g. "toan", "tieng-anh"
  data:     SubjectProgress;
}

const BADGE_CONFIG = {
  gioi:    { label: "Giỏi",            color: "green",  icon: "🟢" },
  kha:     { label: "Khá",             color: "yellow", icon: "🟡" },
  can_on:  { label: "Cần ôn",          color: "red",    icon: "🔴" },
  pending: { label: "Chưa đủ dữ liệu", color: "gray",   icon: "⏳" },
} as const;

export function SubjectProgressCard({ data }: Props) {
  const pct      = data.totalFree > 0 ? Math.round((data.doneFree / data.totalFree) * 100) : 0;
  const badge    = BADGE_CONFIG[data.badge];
  const hasFree  = data.totalFree > 0;

  return (
    <div className="spc-card" role="article" aria-label={`Tiến độ môn ${data.label}`}>
      {/* Header */}
      <div className="spc-card__header">
        <span className="spc-card__emoji" aria-hidden="true">{data.emoji}</span>
        <div className="spc-card__meta">
          <span className="spc-card__label">{data.label}</span>
          {/* Badge */}
          <span
            className={`spc-badge spc-badge--${badge.color}`}
            title={data.badge === "pending" ? "Cần làm ≥ 5 bài để xem đánh giá" : undefined}
          >
            {badge.icon} {badge.label}
          </span>
        </div>
        {/* Avg score */}
        {data.avgScore !== null && (
          <span className="spc-card__avg">
            {data.avgScore.toFixed(0)}%
          </span>
        )}
      </div>

      {/* Progress bar */}
      {hasFree ? (
        <>
          <div className="spc-bar__wrap" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <div
              className={`spc-bar__fill spc-bar__fill--${badge.color}`}
              style={{ width: `${Math.min(pct, 100)}%` }}
            />
          </div>
          {/* Footer: done/total + locked */}
          <div className="spc-card__footer">
            <span className="spc-card__count">
              {data.doneFree}/{data.totalFree} bài miễn phí
            </span>
            {data.lockedPremium > 0 && (
              <span className="spc-card__locked">
                🔒 {data.lockedPremium} bài premium
              </span>
            )}
          </div>
        </>
      ) : (
        <p className="spc-card__empty">Sắp có bài học 🔜</p>
      )}
    </div>
  );
}
