/**
 * GameLoginCTA.tsx — CTA đăng nhập sau khi guest chơi game
 *
 * Hiển thị:
 * - Kết quả (score + stars)
 * - Từ cần ôn thêm
 * - "Đăng nhập với Google để lưu ⭐" — nút Google to rõ
 * - "Chơi lại (không lưu)" — link mờ
 *
 * Dùng cho cả Hangman và Flashcard trên trang chủ.
 */

import "./GameLoginCTA.css";

interface GameLoginCTAProps {
  starsEarned: number;
  correctCount: number;
  totalCount: number;
  wrongWords?: string[];
  onLogin: () => void;
  onPlayAgain: () => void;
}

// Google SVG logo (inline — không cần external dep)
function GoogleIcon() {
  return (
    <svg className="game-cta__google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export function GameLoginCTA({
  starsEarned,
  correctCount,
  totalCount,
  wrongWords = [],
  onLogin,
  onPlayAgain,
}: GameLoginCTAProps) {
  const scoreEmoji =
    starsEarned === 2 ? "🌟🌟" :
    starsEarned === 1 ? "⭐"   :
    correctCount >= totalCount * 0.6 ? "💪" : "📚";

  return (
    <div className="game-cta animate-fadeIn">
      {/* Kết quả */}
      <div className="game-cta__result">
        <div className="game-cta__score-emoji">{scoreEmoji}</div>
        <div className="game-cta__score-text">
          {correctCount}/{totalCount} từ đúng
          {starsEarned > 0 && ` — +${starsEarned} ⭐`}
        </div>
        {wrongWords.length > 0 && (
          <div className="game-cta__wrong-words">
            Cần ôn: {wrongWords.slice(0, 4).join(", ")}
            {wrongWords.length > 4 && ` +${wrongWords.length - 4} từ`}
          </div>
        )}
      </div>

      <div className="game-cta__divider" />

      {/* Headline */}
      <div className="game-cta__headline">
        <strong>🎉 Đăng nhập để lưu kết quả!</strong>
        <p>Theo dõi tiến độ, nhận ⭐ thưởng và mở khóa 500+ bài luyện tập.</p>
      </div>

      {/* Nút Google */}
      <button
        className="game-cta__google-btn"
        id="btn-game-cta-google"
        onClick={onLogin}
        aria-label="Đăng nhập bằng Google"
      >
        <GoogleIcon />
        Đăng nhập với Google — Miễn phí
      </button>

      {/* Chơi lại mà không lưu */}
      <button className="game-cta__replay" onClick={onPlayAgain}>
        Chơi lại (không lưu kết quả)
      </button>
    </div>
  );
}
