/**
 * HangmanLauncher.tsx — Nút mở Hangman + màn hình kết quả
 *
 * V2: Kết nối DB — từ lấy từ D1 vocabulary_bank qua API
 *
 * Chiến lược chọn từ:
 * 1. Ưu tiên: từ user đã tra (tooltip) trong bài → pending review
 * 2. Bổ sung: fetch random từ D1 vocabulary_bank
 * 3. Fallback: từ hardcode nhỏ (nếu offline)
 */

import { useState } from "react";
import type { VocabWord } from "../../types/vocabulary";
import { HangmanGame } from "./HangmanGame";
import type { HangmanResult } from "./HangmanGame";
import { useHangmanWords } from "../../hooks/useHangmanWords";
import "./HangmanLauncher.css";

const HANGMAN_WORDS_PER_SESSION = 5;

// ─── Props ────────────────────────────────────────────────────────────────────
interface HangmanLauncherProps {
  pendingWords: VocabWord[];    // Từ chưa mastered từ hook useVocabulary
  isLoggedIn: boolean;
  onMarkCorrect: (word: string) => void;
  onStarsEarned: (stars: number) => void;
  /** Nhóm từ vựng cần lấy từ DB (default "flyers") */
  group?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────
export function HangmanLauncher({
  pendingWords,
  isLoggedIn,
  onMarkCorrect,
  onStarsEarned,
  group = "flyers",
}: HangmanLauncherProps) {
  const [gameOpen, setGameOpen] = useState(false);
  const [result, setResult]     = useState<HangmanResult | null>(null);

  // Hook kết nối DB — chọn 5 từ thông minh
  const { words, isLoading, source, refresh } = useHangmanWords({
    pendingWords,
    group,
    count: HANGMAN_WORDS_PER_SESSION,
  });

  const handleComplete = (res: HangmanResult) => {
    setResult(res);
    setGameOpen(false);
    if (isLoggedIn && res.starsEarned > 0) {
      onStarsEarned(res.starsEarned);
    }
  };

  // Label hiển thị nguồn từ
  const sourceLabel = source === "pending"
    ? `${pendingWords.filter((w) => !w.isMastered).length} từ cần ôn`
    : source === "db"
      ? "250 từ Cambridge Flyers"
      : "Từ vựng Cambridge";

  return (
    <>
      {/* Nút mở Hangman */}
      {!result && (
        <button
          className="hangman-launcher-btn"
          id="btn-open-hangman"
          onClick={() => setGameOpen(true)}
          disabled={isLoading}
        >
          <span className="hangman-launcher-btn__icon">🎯</span>
          <div className="hangman-launcher-btn__text">
            <strong>Chơi Hangman — Ôn từ vựng</strong>
            <span>
              {isLoading ? "Đang tải từ vựng..." : sourceLabel}
            </span>
          </div>
          <span className="hangman-launcher-btn__stars">+1/+2 ⭐</span>
        </button>
      )}

      {/* Kết quả sau khi chơi */}
      {result && (
        <div className="hangman-result animate-fadeIn">
          <div className="hangman-result__score">
            {result.starsEarned === 2 && "🌟🌟"}
            {result.starsEarned === 1 && "⭐"}
            {result.starsEarned === 0 && "💪"}
          </div>
          <div className="hangman-result__label">
            {result.correctWords.length}/{HANGMAN_WORDS_PER_SESSION} từ đúng
            {result.starsEarned > 0 && ` — +${result.starsEarned} ⭐`}
          </div>
          {result.wrongWords.length > 0 && (
            <div className="hangman-result__wrong">
              Cần ôn thêm: {result.wrongWords.join(", ")}
            </div>
          )}
          {!isLoggedIn && (
            <div className="hangman-result__guest">
              Đăng nhập để lưu ⭐ và tiến độ!
            </div>
          )}
          <button
            className="btn btn-outline btn-sm"
            onClick={() => {
              setResult(null);
              refresh(); // Chọn bộ từ mới từ DB
              setGameOpen(true);
            }}
          >
            Chơi lại (bộ từ mới)
          </button>
        </div>
      )}

      {/* Game modal */}
      {gameOpen && words.length > 0 && (
        <HangmanGame
          words={words}
          isLoggedIn={isLoggedIn}
          onComplete={handleComplete}
          onClose={() => setGameOpen(false)}
          onMarkCorrect={onMarkCorrect}
        />
      )}
    </>
  );
}
