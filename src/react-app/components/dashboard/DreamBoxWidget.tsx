/**
 * DreamBoxWidget.tsx — Mini Dream Box (Phase 07)
 *
 * Hiển thị mục tiêu hiện tại + progress bar sao
 * Nếu chưa có goal → prompt tạo goal
 *
 * Phase 07
 */

interface DreamBoxGoal {
  title: string;
  emoji: string;
  current: number;   // sao hiện tại
  target: number;    // sao cần
}

interface DreamBoxWidgetProps {
  goal: DreamBoxGoal | null;
  onSetGoal?: () => void;
}

export function DreamBoxWidget({ goal, onSetGoal }: DreamBoxWidgetProps) {
  if (!goal) {
    return (
      <div className="dreambox-widget dreambox-widget--empty">
        <div className="dreambox-widget__icon">📦</div>
        <div className="dreambox-widget__empty-text">
          <p className="dreambox-widget__empty-title">Hộp Quà Ước Mơ</p>
          <p className="dreambox-widget__empty-desc">
            Đặt mục tiêu và tích sao để mở quà đặc biệt!
          </p>
        </div>
        {onSetGoal && (
          <button
            className="btn btn-primary btn-sm"
            id="btn-dreambox-set-goal"
            onClick={onSetGoal}
          >
            Đặt mục tiêu
          </button>
        )}
      </div>
    );
  }

  const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
  const remaining = goal.target - goal.current;

  return (
    <div className="dreambox-widget">
      <div className="dreambox-widget__header">
        <span className="dreambox-widget__goal-emoji">{goal.emoji}</span>
        <div className="dreambox-widget__goal-info">
          <p className="dreambox-widget__label">📦 Hộp Quà Ước Mơ</p>
          <p className="dreambox-widget__goal-title">{goal.title}</p>
        </div>
        <div className="dreambox-widget__pct">{pct}%</div>
      </div>

      {/* Progress bar */}
      <div className="dreambox-widget__bar-wrap" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div
          className="dreambox-widget__bar-fill"
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="dreambox-widget__footer">
        <span className="dreambox-widget__stars">⭐ {goal.current.toLocaleString()} / {goal.target.toLocaleString()}</span>
        {remaining > 0 ? (
          <span className="dreambox-widget__remaining">Còn {remaining} sao nữa!</span>
        ) : (
          <span className="dreambox-widget__done">🎉 Đã đủ sao!</span>
        )}
      </div>
    </div>
  );
}
