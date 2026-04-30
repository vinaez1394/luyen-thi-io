/**
 * StreakBadge.tsx — Hiển thị streak 🔥 kèm animation khi streak > 7 ngày
 *
 * Phase 07
 */

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  const isHot = streak >= 7;
  const isOnFire = streak >= 14;

  return (
    <div className={`streak-badge${isHot ? " streak-badge--hot" : ""}${isOnFire ? " streak-badge--fire" : ""}`}>
      <span className={`streak-badge__flame${isOnFire ? " streak-badge__flame--animate" : ""}`}>
        🔥
      </span>
      <div className="streak-badge__body">
        <span className="streak-badge__num">{streak}</span>
        <span className="streak-badge__label">ngày liên tiếp</span>
      </div>
      {isHot && (
        <span className="streak-badge__tag">
          {isOnFire ? "Siêu nhiệt! 🌋" : "Đang bốc! 💪"}
        </span>
      )}
    </div>
  );
}
