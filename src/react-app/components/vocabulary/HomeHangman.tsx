/**
 * HomeHangman.tsx — Widget Hangman độc lập cho trang chủ
 *
 * V4 fixes:
 * - Bỏ preview words trong card (user không muốn xem trước)
 * - Auto-reload bộ từ mới khi chơi lại (pendingOpen pattern)
 * - Pass isLoggedIn=true vào HangmanGame để không show notice bên trong
 *   (CTA đầy đủ đã được xử lý bởi GameLoginCTA bên ngoài)
 * - Card height: 100% cho equal-height với HomeFlashcard
 */

import { useState, useEffect } from "react";
import { HangmanGame } from "./HangmanGame";
import type { HangmanResult } from "./HangmanGame";
import { GameLoginCTA } from "./GameLoginCTA";
import { useHangmanWords } from "../../hooks/useHangmanWords";
import "./HomeHangman.css";

// Stable empty array — tránh infinite loop trong useHangmanWords
const EMPTY_WORDS = [] as const;

interface HomeHangmanProps {
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onStarsEarned?: (stars: number) => void;
}

export function HomeHangman({
  isLoggedIn = false,
  onLogin,
  onStarsEarned,
}: HomeHangmanProps) {
  const [open,        setOpen]        = useState(false);
  const [result,      setResult]      = useState<HangmanResult | null>(null);
  const [pendingOpen, setPendingOpen] = useState(false);

  const { words, isLoading, refresh } = useHangmanWords({
    pendingWords: EMPTY_WORDS as [],
    group: "flyers",
    count: 5,
  });

  // Auto-open khi load xong (sau khi click "Chơi lại")
  useEffect(() => {
    if (pendingOpen && !isLoading && words.length > 0) {
      setPendingOpen(false);
      setOpen(true);
    }
  }, [pendingOpen, isLoading, words.length]);

  const handleOpen = () => {
    setResult(null);
    setOpen(true);
  };

  const handlePlayAgain = () => {
    setResult(null);
    refresh();           // Fetch bộ từ mới từ DB
    setPendingOpen(true); // Auto-open khi words đã sẵn sàng
  };

  const handleComplete = (res: HangmanResult) => {
    setResult(res);
    setOpen(false);
    if (isLoggedIn && res.starsEarned > 0) {
      onStarsEarned?.(res.starsEarned);
    }
  };

  const isRefreshing = pendingOpen && isLoading;

  return (
    <div className="home-hangman">
      <div className="home-hangman__card">
        {/* Left: info */}
        <div className="home-hangman__info">
          <div className="home-hangman__label">🎮 Cambridge Flyers</div>
          <h3 className="home-hangman__title">Hangman — Đoán từ</h3>
          <p className="home-hangman__desc">
            Đoán đúng từ → nhận sao ⭐. Ôn từ vựng mỗi ngày!
          </p>

          {/* Stats — không hiện từ, chỉ hiện count */}
          <div className="home-hangman__stats">
            <span className="home-hangman__stat-badge">📚 250+ từ Cambridge</span>
            <span className="home-hangman__stat-badge">🎯 5 từ / lượt</span>
          </div>

          <button
            className="btn btn-primary"
            id="btn-home-hangman"
            onClick={handleOpen}
            disabled={isLoading || words.length === 0}
          >
            {isLoading ? "Đang tải..." : "🎯 Chơi ngay — Miễn phí"}
          </button>
        </div>

        {/* Right: ASCII hangman preview */}
        <div className="home-hangman__visual" aria-hidden="true">
          <svg viewBox="0 0 160 180" className="home-hangman__svg">
            <line x1="15" y1="165" x2="145" y2="165" strokeWidth="4" className="hh-line" />
            <line x1="50" y1="165" x2="50"  y2="15"  strokeWidth="4" className="hh-line" />
            <line x1="50" y1="15"  x2="105" y2="15"  strokeWidth="4" className="hh-line" />
            <line x1="105" y1="15" x2="105" y2="38"  strokeWidth="4" className="hh-line" />
            <circle cx="105" cy="50" r="12" strokeWidth="3" className="hh-body" />
            <line x1="105" y1="62" x2="105" y2="108" strokeWidth="3" className="hh-body" />
            <line x1="105" y1="75" x2="83"  y2="95"  strokeWidth="3" className="hh-body" />
          </svg>

          <div className="home-hangman__slots" aria-label="Từ cần đoán">
            {"_ _ _ _ _".split(" ").map((c, i) => (
              <span key={i} className="home-hangman__slot">{c}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Kết quả logged-in: hiện bên dưới card */}
      {result && isLoggedIn && (
        <div className="home-hangman__result animate-fadeIn">
          <span className="home-hangman__result-score">
            {result.starsEarned === 2 ? "🌟🌟" : result.starsEarned === 1 ? "⭐" : "💪"}
          </span>
          <span>
            {result.correctWords.length}/5 đúng
            {result.starsEarned > 0 && ` — +${result.starsEarned} ⭐`}
          </span>
          <button
            className="btn btn-outline btn-sm"
            onClick={handlePlayAgain}
            disabled={isRefreshing}
          >
            {isRefreshing ? "Đang tải..." : "Chơi lại (bộ từ mới)"}
          </button>
        </div>
      )}

      {/* Guest: login modal popup */}
      {result && !isLoggedIn && onLogin && (
        <GameLoginCTA
          starsEarned={result.starsEarned}
          showStars={true}
          correctCount={result.correctWords.length}
          totalCount={5}
          wrongWords={result.wrongWords}
          onLogin={onLogin}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {/* Game modal — isLoggedIn=true để không show notice bên trong */}
      {open && words.length > 0 && (
        <HangmanGame
          words={words}
          isLoggedIn={true}
          onComplete={handleComplete}
          onClose={() => setOpen(false)}
          onMarkCorrect={() => {}}
        />
      )}
    </div>
  );
}
