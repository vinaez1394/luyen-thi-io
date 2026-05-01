/**
 * HomeHangman.tsx — Widget Hangman độc lập cho trang chủ
 *
 * V3: Guest chơi miễn phí → sau game hiện GameLoginCTA
 * - Fetch từ D1 qua useHangmanWords
 * - Sau khi guest hoàn thành → CTA đăng nhập Google
 * - isLoggedIn: true → hiện kết quả thường (không cần CTA)
 */

import { useState } from "react";
import { HangmanGame } from "./HangmanGame";
import type { HangmanResult } from "./HangmanGame";
import { GameLoginCTA } from "./GameLoginCTA";
import { useHangmanWords } from "../../hooks/useHangmanWords";
import "./HomeHangman.css";

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
  const [open,   setOpen]   = useState(false);
  const [result, setResult] = useState<HangmanResult | null>(null);

  const { words, isLoading, refresh } = useHangmanWords({
    pendingWords: [],
    group: "flyers",
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

  const handleComplete = (res: HangmanResult) => {
    setResult(res);
    setOpen(false);
    if (isLoggedIn && res.starsEarned > 0) {
      onStarsEarned?.(res.starsEarned);
    }
  };

  const previewWords = words.slice(0, 3);

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

          {/* Live preview từ DB */}
          <div className="home-hangman__preview">
            {isLoading ? (
              <span className="home-hangman__loading">Đang tải từ vựng...</span>
            ) : (
              <>
                {previewWords.map((w) => (
                  <span key={w.word} className="home-hangman__preview-word">
                    <span className="home-hangman__preview-en">{w.word}</span>
                    <span className="home-hangman__preview-vi">{w.vi}</span>
                  </span>
                ))}
                <span className="home-hangman__preview-more">+247 từ...</span>
              </>
            )}
          </div>

          <button
            className="btn btn-primary"
            id="btn-home-hangman"
            onClick={handleOpen}
            disabled={isLoading || words.length === 0}
          >
            🎯 Chơi ngay — Miễn phí
          </button>
        </div>

        {/* Right: ASCII preview */}
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

          <div className="home-hangman__slots">
            {(isLoading ? "??????" : (words[0]?.word ?? "HANGMAN").toUpperCase())
              .split("")
              .map((c, i) => (
                <span
                  key={i}
                  className={`home-hangman__slot ${i < 2 ? "home-hangman__slot--shown" : ""}`}
                >
                  {i < 2 ? c : ""}
                </span>
              ))}
          </div>
          {!isLoading && words[0] && (
            <div className="home-hangman__hint-vi">{words[0].vi}</div>
          )}
        </div>
      </div>

      {/* Kết quả — Guest: CTA đăng nhập | Logged in: kết quả thường */}
      {result && (
        !isLoggedIn && onLogin ? (
          <GameLoginCTA
            starsEarned={result.starsEarned}
            correctCount={result.correctWords.length}
            totalCount={5}
            wrongWords={result.wrongWords}
            onLogin={onLogin}
            onPlayAgain={handlePlayAgain}
          />
        ) : (
          <div className="home-hangman__result animate-fadeIn">
            <span className="home-hangman__result-score">
              {result.starsEarned === 2 ? "🌟🌟" : result.starsEarned === 1 ? "⭐" : "💪"}
            </span>
            <span>
              {result.correctWords.length}/5 đúng
              {result.starsEarned > 0 && ` — +${result.starsEarned} ⭐`}
            </span>
            <button className="btn btn-outline btn-sm" onClick={handlePlayAgain}>
              Chơi lại (bộ từ mới)
            </button>
          </div>
        )
      )}

      {/* Game modal */}
      {open && words.length > 0 && (
        <HangmanGame
          words={words}
          isLoggedIn={isLoggedIn}
          onComplete={handleComplete}
          onClose={() => setOpen(false)}
          onMarkCorrect={() => {}}
        />
      )}
    </div>
  );
}
