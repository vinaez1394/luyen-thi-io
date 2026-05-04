/**
 * WelcomeHeader.tsx — Avatar + tên bé + streak + sao
 *
 * Hiển thị:
 *  - Avatar emoji (từ avatar_id)
 *  - Tên bé + lời chào theo giờ
 *  - Streak 🔥
 *  - Tổng sao ⭐
 *
 * Phase 07
 */

import type { AuthUser } from "../../hooks/useAuth";

// ============================================
// Lời chào theo giờ
// ============================================
function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Chào buổi sáng";
  if (h < 17) return "Chào buổi chiều";
  if (h < 21) return "Chào buổi tối";
  return "Đêm khuya rồi đó";
}

// ============================================
// Avatar emoji map (dùng avatar_id)
// ============================================
const AVATAR_EMOJI: Record<string, string> = {
  cat:      "🐱",
  dog:      "🐶",
  rabbit:   "🐰",
  panda:    "🐼",
  fox:      "🦊",
  owl:      "🦉",
  penguin:  "🐧",
  unicorn:  "🦄",
  default:  "🐣",
};

function getAvatar(avatarId: string | undefined): string {
  if (!avatarId) return AVATAR_EMOJI.default;
  return AVATAR_EMOJI[avatarId] ?? AVATAR_EMOJI.default;
}

// ============================================
// Props
// ============================================
interface WelcomeHeaderProps {
  user:         AuthUser;
  streak:       number;
  totalStars:   number;
  currentGrade: number | null;  // Phase Dashboard: lớp hiện tại của bé
}

// ============================================
// Component
// ============================================
export function WelcomeHeader({ user, streak, totalStars, currentGrade }: WelcomeHeaderProps) {
  const displayName =
    user.profile?.display_name ?? user.name.split(" ").pop() ?? "bé";
  const avatar = getAvatar(user.profile?.avatar_id);
  const greeting = getGreeting();

  const gradeLabel = currentGrade ? `Lớp ${currentGrade}` : null;

  return (
    <div className="db-welcome">
      {/* Left: Avatar + greeting */}
      <div className="db-welcome__left">
        <div className="db-welcome__avatar" aria-hidden="true">
          {avatar}
        </div>
        <div className="db-welcome__text">
          <p className="db-welcome__greeting">{greeting},</p>
          <h1 className="db-welcome__name">{displayName}! 👋</h1>
          {gradeLabel ? (
            <p className="db-welcome__tagline">
              <span className="db-welcome__grade-badge">🏫 {gradeLabel}</span>
              · Hôm nay mình sẽ học gì nào?
            </p>
          ) : (
            <p className="db-welcome__tagline">Hôm nay mình sẽ học gì nào?</p>
          )}
        </div>
      </div>

      {/* Right: Stats */}
      <div className="db-welcome__stats">
        <div className="db-stat db-stat--streak">
          <span className="db-stat__icon">🔥</span>
          <span className="db-stat__value">{streak}</span>
          <span className="db-stat__label">ngày liên tiếp</span>
        </div>
        <div className="db-stat db-stat--stars">
          <span className="db-stat__icon">⭐</span>
          <span className="db-stat__value">{totalStars.toLocaleString()}</span>
          <span className="db-stat__label">sao đã tích</span>
        </div>
      </div>
    </div>
  );
}
