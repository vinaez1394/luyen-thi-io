/**
 * HangmanGame.tsx — Mini game ôn từ vựng sau bài học
 *
 * Luật chơi:
 * - 5 từ / session (chọn từ review list, fallback Cambridge word list)
 * - 6 lần đoán sai tối đa → fail 1 từ
 * - 5/5 đúng → +2 ⭐ | 4/5 đúng → +1 ⭐ | ≤3/5 → 0 ⭐
 * - Mastery: đúng 2 session khác nhau → từ "tốt nghiệp"
 */

import { useState, useEffect, useCallback } from "react";
import type { VocabWord } from "../../types/vocabulary";
import "./HangmanGame.css";

// ─── Hangman SVG stages ───────────────────────────────────────────────────────
const MAX_WRONG = 6;

function HangmanDrawing({ wrongCount }: { wrongCount: number }) {
  return (
    <svg
      className="hangman-svg"
      viewBox="0 0 200 220"
      aria-label={`Hình treo cổ: ${wrongCount}/${MAX_WRONG} lần sai`}
    >
      {/* Giá treo */}
      <line x1="20" y1="210" x2="180" y2="210" strokeWidth="4" className="hangman-line" />
      <line x1="60" y1="210" x2="60" y2="20"  strokeWidth="4" className="hangman-line" />
      <line x1="60" y1="20"  x2="130" y2="20"  strokeWidth="4" className="hangman-line" />
      <line x1="130" y1="20" x2="130" y2="45"  strokeWidth="4" className="hangman-line" />

      {/* Đầu */}
      {wrongCount >= 1 && (
        <circle cx="130" cy="60" r="15" strokeWidth="3" className="hangman-body" />
      )}
      {/* Thân */}
      {wrongCount >= 2 && (
        <line x1="130" y1="75" x2="130" y2="135" strokeWidth="3" className="hangman-body" />
      )}
      {/* Tay trái */}
      {wrongCount >= 3 && (
        <line x1="130" y1="90" x2="105" y2="115" strokeWidth="3" className="hangman-body" />
      )}
      {/* Tay phải */}
      {wrongCount >= 4 && (
        <line x1="130" y1="90" x2="155" y2="115" strokeWidth="3" className="hangman-body" />
      )}
      {/* Chân trái */}
      {wrongCount >= 5 && (
        <line x1="130" y1="135" x2="105" y2="165" strokeWidth="3" className="hangman-body" />
      )}
      {/* Chân phải */}
      {wrongCount >= 6 && (
        <line x1="130" y1="135" x2="155" y2="165" strokeWidth="3" className="hangman-body" />
      )}
    </svg>
  );
}

// ─── Keyboard ────────────────────────────────────────────────────────────────
const KEYBOARD_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["Z","X","C","V","B","N","M"],
];

// ─── Types ───────────────────────────────────────────────────────────────────
export interface HangmanResult {
  starsEarned: number;
  correctWords: string[];
  wrongWords: string[];
}

interface HangmanGameProps {
  words: VocabWord[];          // 5 từ đã chọn
  isLoggedIn: boolean;
  onComplete: (result: HangmanResult) => void;
  onClose: () => void;
  onMarkCorrect: (word: string) => void;
}

// ─── Component ───────────────────────────────────────────────────────────────
export function HangmanGame({
  words,
  isLoggedIn,
  onComplete,
  onClose,
  onMarkCorrect,
}: HangmanGameProps) {
  const [wordIndex, setWordIndex]         = useState(0);
  const [guessed, setGuessed]             = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount]       = useState(0);
  const [correctWords, setCorrectWords]   = useState<string[]>([]);
  const [wrongWords, setWrongWords]       = useState<string[]>([]);
  const [phase, setPhase]                 = useState<"playing" | "word-result" | "done">("playing");
  const [wordResult, setWordResult]       = useState<"correct" | "wrong" | null>(null);

  const currentWord = words[wordIndex];
  const wordLetters = currentWord?.word.toUpperCase().split("") ?? [];
  const uniqueLetters = [...new Set(wordLetters.filter((l) => /[A-Z]/.test(l)))];

  // Tính toán xem đã thắng từ hiện tại chưa
  const isWordWon = uniqueLetters.every((l) => guessed.has(l));
  const isWordLost = wrongCount >= MAX_WRONG;

  // Keyboard handler
  const handleKey = useCallback(
    (letter: string) => {
      if (phase !== "playing" || guessed.has(letter)) return;
      const newGuessed = new Set(guessed).add(letter);
      setGuessed(newGuessed);

      if (!wordLetters.includes(letter)) {
        setWrongCount((c) => c + 1);
      }
    },
    [phase, guessed, wordLetters]
  );

  // Physical keyboard support
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      const l = e.key.toUpperCase();
      if (/^[A-Z]$/.test(l)) handleKey(l);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [handleKey]);

  // Kiểm tra kết quả từng từ
  useEffect(() => {
    if (phase !== "playing") return;
    if (isWordWon) {
      setWordResult("correct");
      setPhase("word-result");
      onMarkCorrect(currentWord.word);
      setTimeout(() => advanceWord(true), 1800);
    } else if (isWordLost) {
      setWordResult("wrong");
      setPhase("word-result");
      setTimeout(() => advanceWord(false), 1800);
    }
  }, [isWordWon, isWordLost, phase]);

  function advanceWord(correct: boolean) {
    const newCorrect = correct ? [...correctWords, currentWord.word] : correctWords;
    const newWrong   = !correct ? [...wrongWords, currentWord.word] : wrongWords;

    if (wordIndex + 1 >= words.length) {
      // Tất cả từ xong → tính kết quả
      const score = newCorrect.length;
      const starsEarned = score === 5 ? 2 : score === 4 ? 1 : 0;
      setCorrectWords(newCorrect);
      setWrongWords(newWrong);
      setPhase("done");
      onComplete({ starsEarned, correctWords: newCorrect, wrongWords: newWrong });
    } else {
      setCorrectWords(newCorrect);
      setWrongWords(newWrong);
      setWordIndex((i) => i + 1);
      setGuessed(new Set());
      setWrongCount(0);
      setWordResult(null);
      setPhase("playing");
    }
  }

  if (!currentWord) return null;

  return (
    <div className="hangman-overlay" role="dialog" aria-modal="true" aria-label="Hangman Game">
      <div className="hangman-modal">

        {/* Header */}
        <div className="hangman-header">
          <div className="hangman-header__title">🎯 Hangman</div>
          <div className="hangman-header__progress">
            {wordIndex + 1} / {words.length}
          </div>
          <button
            className="hangman-header__close"
            onClick={onClose}
            aria-label="Đóng game"
          >
            ×
          </button>
        </div>

        {/* Word result flash */}
        {phase === "word-result" && wordResult && (
          <div className={`hangman-flash hangman-flash--${wordResult} animate-fadeIn`}>
            {wordResult === "correct" ? "✅ Đúng rồi!" : `❌ Từ này là: ${currentWord.word}`}
            {currentWord.vi && (
              <div className="hangman-flash__vi">🇻🇳 {currentWord.vi}</div>
            )}
          </div>
        )}

        {phase === "playing" && (
          <>
            {/* Meaning hint */}
            <div className="hangman-hint">
              <span className="hangman-hint__label">Nghĩa:</span>
              <span className="hangman-hint__vi">{currentWord.vi}</span>
              {currentWord.ipa && (
                <span className="hangman-hint__ipa">/{currentWord.ipa}/</span>
              )}
            </div>

            {/* Drawing */}
            <HangmanDrawing wrongCount={wrongCount} />

            {/* Word slots */}
            <div className="hangman-word" aria-label={`Từ cần đoán: ${wordLetters.map((l) => (guessed.has(l) ? l : "_")).join(" ")}`}>
              {wordLetters.map((letter, i) => {
                if (letter === " ") return <span key={i} className="hangman-word__space" />;
                const isRevealed = guessed.has(letter);
                return (
                  <span
                    key={i}
                    className={`hangman-word__slot ${isRevealed ? "hangman-word__slot--revealed" : ""}`}
                  >
                    {isRevealed ? letter : ""}
                  </span>
                );
              })}
            </div>

            {/* Wrong letters */}
            {wrongCount > 0 && (
              <div className="hangman-wrong">
                Sai: {[...guessed].filter((l) => !wordLetters.includes(l)).join(", ")}
              </div>
            )}

            {/* Keyboard */}
            <div className="hangman-keyboard">
              {KEYBOARD_ROWS.map((row, ri) => (
                <div key={ri} className="hangman-keyboard__row">
                  {row.map((letter) => {
                    const isHit  = guessed.has(letter) && wordLetters.includes(letter);
                    const isMiss = guessed.has(letter) && !wordLetters.includes(letter);
                    return (
                      <button
                        key={letter}
                        className={[
                          "hangman-key",
                          isHit  ? "hangman-key--hit"  : "",
                          isMiss ? "hangman-key--miss" : "",
                        ].join(" ")}
                        onClick={() => handleKey(letter)}
                        disabled={guessed.has(letter)}
                        aria-label={letter}
                      >
                        {letter}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Guest notice */}
        {!isLoggedIn && (
          <div className="hangman-guest-notice">
            ℹ️ Đăng nhập để lưu tiến độ & nhận sao
          </div>
        )}
      </div>
    </div>
  );
}
