/**
 * FlashcardLauncher.tsx — Nút mở Flashcard + màn hình kết quả
 *
 * Tương tự HangmanLauncher nhưng cho game Flashcard.
 * Dùng useHangmanWords với game="flashcard" để lấy từ DB.
 */

import { useState } from "react";
import { FlashcardGame } from "./FlashcardGame";
import type { FlashcardResult } from "./FlashcardGame";
import { useHangmanWords } from "../../hooks/useHangmanWords";
import type { VocabWord } from "../../types/vocabulary";
import "./FlashcardLauncher.css";

const FLASHCARD_WORDS_PER_SESSION = 5;

// ─── Props ────────────────────────────────────────────────────────────────────
interface FlashcardLauncherProps {
  pendingWords: VocabWord[];   // Từ chưa mastered từ hook useVocabulary
  isLoggedIn: boolean;
  onStarsEarned: (stars: number) => void;
  /** Nhóm từ vựng (default "flyers") */
  group?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────
export function FlashcardLauncher({
  pendingWords,
  isLoggedIn,
  onStarsEarned,
  group = "flyers",
}: FlashcardLauncherProps) {
  const [gameOpen, setGameOpen] = useState(false);
  const [result,   setResult]   = useState<FlashcardResult | null>(null);

  const { words, isLoading, refresh } = useHangmanWords({
    pendingWords,
    group,
    game: "flashcard",
    count: FLASHCARD_WORDS_PER_SESSION,
  });

  const handleComplete = (res: FlashcardResult) => {
    setResult(res);
    setGameOpen(false);
    if (isLoggedIn && res.starsEarned > 0) {
      onStarsEarned(res.starsEarned);
    }
  };

  const sourceLabel = pendingWords.filter((w) => !w.isMastered).length > 0
    ? `${pendingWords.filter((w) => !w.isMastered).length} từ cần ôn`
    : "250 từ Cambridge Flyers";

  return (
    <>
      {/* Nút mở Flashcard */}
      {!result && (
        <button
          className="fc-launcher-btn"
          id="btn-open-flashcard"
          onClick={() => setGameOpen(true)}
          disabled={isLoading}
        >
          <span className="fc-launcher-btn__icon">🃏</span>
          <div className="fc-launcher-btn__text">
            <strong>Flashcard — Học từ vựng</strong>
            <span>{isLoading ? "Đang tải..." : sourceLabel}</span>
          </div>
          <span className="fc-launcher-btn__stars">+1/+2 ⭐</span>
        </button>
      )}

      {/* Kết quả sau khi chơi */}
      {result && (
        <div className="fc-launcher-result animate-fadeIn">
          <div className="fc-launcher-result__score">
            {result.starsEarned === 2 && "🌟🌟"}
            {result.starsEarned === 1 && "⭐"}
            {result.starsEarned === 0 && "💪"}
          </div>
          <div className="fc-launcher-result__label">
            {result.knownWords.length}/{FLASHCARD_WORDS_PER_SESSION} từ đã biết
            {result.starsEarned > 0 && ` — +${result.starsEarned} ⭐`}
          </div>
          {result.unknownWords.length > 0 && (
            <div className="fc-launcher-result__unknown">
              Cần học thêm: {result.unknownWords.join(", ")}
            </div>
          )}
          {!isLoggedIn && (
            <div className="fc-launcher-result__guest">
              Đăng nhập để lưu ⭐ và tiến độ!
            </div>
          )}
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              setResult(null);
              refresh();
              setGameOpen(true);
            }}
          >
            Học lại (bộ từ mới)
          </button>
        </div>
      )}

      {/* Game modal */}
      {gameOpen && words.length > 0 && (
        <FlashcardGame
          words={words}
          isLoggedIn={isLoggedIn}
          onComplete={handleComplete}
          onClose={() => setGameOpen(false)}
        />
      )}
    </>
  );
}
