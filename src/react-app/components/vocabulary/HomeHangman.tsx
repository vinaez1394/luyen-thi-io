/**
 * HomeHangman.tsx — Widget Hangman độc lập cho trang chủ
 *
 * V2: Kết nối D1 vocabulary_bank qua /api/vocabulary/random
 * - Fetch 5 từ ngẫu nhiên từ 250 từ Flyers mỗi session
 * - Preview 3 từ mẫu từ DB (live, không hardcode)
 * - Tự refresh bộ từ khi chơi lại
 */

import { useState } from "react";
import { HangmanGame } from "./HangmanGame";
import type { HangmanResult } from "./HangmanGame";
import { useHangmanWords } from "../../hooks/useHangmanWords";
import "./HomeHangman.css";

// ─── Component ────────────────────────────────────────────────────────────────
export function HomeHangman() {
  const [open,   setOpen]   = useState(false);
  const [result, setResult] = useState<HangmanResult | null>(null);

  // Kết nối DB — không có pendingWords vì đây là widget standalone trang chủ
  const { words, isLoading, refresh } = useHangmanWords({
    pendingWords: [],  // Trang chủ không có quiz context
    group: "flyers",
    count: 5,
  });

  const handleOpen = () => {
    setResult(null);
    setOpen(true);
  };

  const handlePlayAgain = () => {
    setResult(null);
    refresh(); // Lấy bộ từ mới từ DB
    setOpen(true);
  };

  const handleComplete = (res: HangmanResult) => {
    setResult(res);
    setOpen(false);
  };

  // Preview 3 từ đầu từ DB (live)
  const previewWords = words.slice(0, 3);

  return (
    <div className="home-hangman">
      {/* Card preview */}
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
            🎯 Chơi ngay
          </button>
        </div>

        {/* Right: ASCII hangman preview */}
        <div className="home-hangman__visual" aria-hidden="true">
          <svg viewBox="0 0 160 180" className="home-hangman__svg">
            {/* Giá treo */}
            <line x1="15" y1="165" x2="145" y2="165" strokeWidth="4" className="hh-line" />
            <line x1="50" y1="165" x2="50"  y2="15"  strokeWidth="4" className="hh-line" />
            <line x1="50" y1="15"  x2="105" y2="15"  strokeWidth="4" className="hh-line" />
            <line x1="105" y1="15" x2="105" y2="38"  strokeWidth="4" className="hh-line" />
            {/* Hình người (đang đoán dở — 3/6) */}
            <circle cx="105" cy="50" r="12" strokeWidth="3" className="hh-body" />
            <line x1="105" y1="62" x2="105" y2="108" strokeWidth="3" className="hh-body" />
            <line x1="105" y1="75" x2="83"  y2="95"  strokeWidth="3" className="hh-body" />
          </svg>

          {/* Hiển thị chữ cái của từ preview đầu tiên từ DB */}
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

      {/* Kết quả sau khi chơi */}
      {result && (
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
      )}

      {/* Game modal */}
      {open && words.length > 0 && (
        <HangmanGame
          words={words}
          isLoggedIn={false}   // trang chủ không check login cho game
          onComplete={handleComplete}
          onClose={() => setOpen(false)}
          onMarkCorrect={() => {}}  // trang chủ không lưu mastery
        />
      )}
    </div>
  );
}
