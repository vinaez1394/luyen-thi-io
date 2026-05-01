/**
 * HomeFlashcard.tsx — Widget Flashcard độc lập cho trang chủ
 *
 * V2 fixes:
 * - Bỏ preview words trong card
 * - Auto-reload bộ từ mới khi chơi lại (pendingOpen pattern)
 * - Pass isLoggedIn=true vào FlashcardGame để không show notice bên trong
 * - Card height: 100% cho equal-height với HomeHangman
 */

import { useState, useEffect } from "react";
import { FlashcardGame } from "./FlashcardGame";
import type { FlashcardResult } from "./FlashcardGame";
import { GameLoginCTA } from "./GameLoginCTA";
import { useHangmanWords } from "../../hooks/useHangmanWords";
import "./HomeFlashcard.css";

// Stable empty array — tránh infinite loop
const EMPTY_WORDS = [] as const;

interface HomeFlashcardProps {
  isLoggedIn?: boolean;
  onLogin?: () => void;
  onStarsEarned?: (stars: number) => void;
}

export function HomeFlashcard({
  isLoggedIn = false,
  onLogin,
  onStarsEarned,
}: HomeFlashcardProps) {
  const [open,        setOpen]        = useState(false);
  const [result,      setResult]      = useState<FlashcardResult | null>(null);
  const [pendingOpen, setPendingOpen] = useState(false);

  const { words, isLoading, refresh } = useHangmanWords({
    pendingWords: EMPTY_WORDS as [],
    group: "flyers",
    game: "flashcard",
    count: 5,
  });

  // Auto-open khi load xong (sau khi click "Học lại")
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
    refresh();            // Fetch bộ từ mới từ DB
    setPendingOpen(true);  // Auto-open khi words sẵn sàng
  };

  const handleComplete = (res: FlashcardResult) => {
    setResult(res);
    setOpen(false);
    if (isLoggedIn && res.starsEarned > 0) {
      onStarsEarned?.(res.starsEarned);
    }
  };

  const isRefreshing = pendingOpen && isLoading;

  return (
    <div className="home-flashcard">
      <div className="home-flashcard__card">
        {/* Left: info */}
        <div className="home-flashcard__info">
          <div className="home-flashcard__label">🃏 Cambridge Flyers</div>
          <h3 className="home-flashcard__title">Flashcard — Học từ</h3>
          <p className="home-flashcard__desc">
            Lật thẻ xem nghĩa → đánh giá bản thân → ghi nhớ hiệu quả!
          </p>

          {/* Stats — không hiện từ, chỉ hiện count */}
          <div className="home-flashcard__stats">
            <span className="home-flashcard__stat-badge">📚 250+ thẻ từ vựng</span>
            <span className="home-flashcard__stat-badge">🃏 5 thẻ / lượt</span>
          </div>

          <button
            className="btn home-flashcard__btn"
            id="btn-home-flashcard"
            onClick={handleOpen}
            disabled={isLoading || words.length === 0}
          >
            {isLoading ? "Đang tải..." : "🃏 Học ngay — Miễn phí"}
          </button>
        </div>

        {/* Right: demo card stack visual */}
        <div className="home-flashcard__visual" aria-hidden="true">
          <div className="home-flashcard__demo">
            <div className="home-flashcard__demo-card home-flashcard__demo-card--front">
              <span className="home-flashcard__demo-badge">EN</span>
              <span className="home-flashcard__demo-word">word</span>
              <span className="home-flashcard__demo-flip">↩ lật thẻ</span>
            </div>
            <div className="home-flashcard__demo-card home-flashcard__demo-card--back" aria-hidden="true">
              <span className="home-flashcard__demo-vi">nghĩa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Kết quả — Guest: CTA | Logged in: kết quả thường */}
      {result && (
        !isLoggedIn && onLogin ? (
          <GameLoginCTA
            starsEarned={result.starsEarned}
            correctCount={result.knownWords.length}
            totalCount={5}
            wrongWords={result.unknownWords}
            onLogin={onLogin}
            onPlayAgain={handlePlayAgain}
          />
        ) : (
          <div className="home-flashcard__result animate-fadeIn">
            <span>
              {result.starsEarned === 2 ? "🌟🌟" : result.starsEarned === 1 ? "⭐" : "💪"}
            </span>
            <span>
              {result.knownWords.length}/5 đã biết
              {result.starsEarned > 0 && ` — +${result.starsEarned} ⭐`}
            </span>
            <button
              className="btn btn-outline btn-sm"
              onClick={handlePlayAgain}
              disabled={isRefreshing}
            >
              {isRefreshing ? "Đang tải..." : "Học lại (bộ mới)"}
            </button>
          </div>
        )
      )}

      {/* Game modal — isLoggedIn=true để không show notice bên trong */}
      {open && words.length > 0 && (
        <FlashcardGame
          words={words}
          isLoggedIn={true}
          onComplete={handleComplete}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
