/**
 * HomeFlashcard.tsx — Widget Flashcard độc lập cho trang chủ
 *
 * Guest chơi miễn phí → sau game hiện GameLoginCTA
 * - Fetch từ D1 qua useHangmanWords (game=flashcard)
 * - Card preview hiển thị từ live từ DB
 */

import { useState } from "react";
import { FlashcardGame } from "./FlashcardGame";
import type { FlashcardResult } from "./FlashcardGame";
import { GameLoginCTA } from "./GameLoginCTA";
import { useHangmanWords } from "../../hooks/useHangmanWords";
import "./HomeFlashcard.css";

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
  const [open,   setOpen]   = useState(false);
  const [result, setResult] = useState<FlashcardResult | null>(null);

  const { words, isLoading, refresh } = useHangmanWords({
    pendingWords: [],
    group: "flyers",
    game: "flashcard",
    count: 5,
  });

  const handleOpen = () => {
    setResult(null);
    setOpen(true);
  };

  const handlePlayAgain = () => {
    setResult(null);
    refresh();
    setOpen(true);
  };

  const handleComplete = (res: FlashcardResult) => {
    setResult(res);
    setOpen(false);
    if (isLoggedIn && res.starsEarned > 0) {
      onStarsEarned?.(res.starsEarned);
    }
  };

  const previewWords = words.slice(0, 2);

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

          {/* Preview từ DB */}
          <div className="home-flashcard__preview">
            {isLoading ? (
              <span className="home-flashcard__loading">Đang tải từ vựng...</span>
            ) : (
              <>
                {previewWords.map((w) => (
                  <span key={w.word} className="home-flashcard__preview-word">
                    <span className="home-flashcard__preview-en">{w.word}</span>
                    <span className="home-flashcard__preview-vi">{w.vi}</span>
                  </span>
                ))}
                <span className="home-flashcard__preview-more">+248 thẻ...</span>
              </>
            )}
          </div>

          <button
            className="btn home-flashcard__btn"
            id="btn-home-flashcard"
            onClick={handleOpen}
            disabled={isLoading || words.length === 0}
          >
            🃏 Học ngay — Miễn phí
          </button>
        </div>

        {/* Right: card flip preview */}
        <div className="home-flashcard__visual" aria-hidden="true">
          <div className="home-flashcard__demo">
            {/* Front card */}
            <div className="home-flashcard__demo-card home-flashcard__demo-card--front">
              <span className="home-flashcard__demo-badge">EN</span>
              <span className="home-flashcard__demo-word">
                {isLoading ? "???" : (words[0]?.word ?? "word")}
              </span>
              <span className="home-flashcard__demo-flip">↩ lật thẻ</span>
            </div>
            {/* Shadow back card */}
            <div className="home-flashcard__demo-card home-flashcard__demo-card--back" aria-hidden="true">
              <span className="home-flashcard__demo-vi">
                {isLoading ? "..." : (words[0]?.vi ?? "")}
              </span>
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
            <button className="btn btn-outline btn-sm" onClick={handlePlayAgain}>
              Học lại (bộ mới)
            </button>
          </div>
        )
      )}

      {/* Game modal */}
      {open && words.length > 0 && (
        <FlashcardGame
          words={words}
          isLoggedIn={isLoggedIn}
          onComplete={handleComplete}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
