/**
 * HangmanGame.tsx — Mini game ôn từ vựng sau bài học
 *
 * V2 Flow:
 * "playing" → đoán từ bằng bàn phím
 * "word-result" → hiện từ to + nghĩa + 🔊 + nút "Tiếp tục" (không auto-advance)
 * "summary" → hiện 5 từ (màu xanh/đỏ) + 🔊 + nút "Hoàn thành"
 *
 * onComplete chỉ gọi SAU KHI user xem xong summary và click "Hoàn thành"
 */

import { useState, useEffect, useCallback, useRef } from "react";
import type { VocabWord } from "../../types/vocabulary";
import "./HangmanGame.css";

// ─── Pronunciation ───────────────────────────────────────────────────────────
function speak(word: string, rate = 0.82) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(word);
  u.lang  = "en-US";
  u.rate  = rate;
  u.pitch = 1.0;
  window.speechSynthesis.speak(u);
}

// ─── Hangman SVG ──────────────────────────────────────────────────────────────
const MAX_WRONG = 6;

function HangmanDrawing({ wrongCount }: { wrongCount: number }) {
  return (
    <svg className="hangman-svg" viewBox="0 0 200 220"
      aria-label={`Hangman drawing: ${wrongCount}/${MAX_WRONG} mistakes`}>
      <line x1="20" y1="210" x2="180" y2="210" strokeWidth="4" className="hangman-line" />
      <line x1="60" y1="210" x2="60"  y2="20"  strokeWidth="4" className="hangman-line" />
      <line x1="60" y1="20"  x2="130" y2="20"  strokeWidth="4" className="hangman-line" />
      <line x1="130" y1="20" x2="130" y2="45"  strokeWidth="4" className="hangman-line" />
      {wrongCount >= 1 && <circle cx="130" cy="60" r="15" strokeWidth="3" className="hangman-body" />}
      {wrongCount >= 2 && <line x1="130" y1="75"  x2="130" y2="135" strokeWidth="3" className="hangman-body" />}
      {wrongCount >= 3 && <line x1="130" y1="90"  x2="105" y2="115" strokeWidth="3" className="hangman-body" />}
      {wrongCount >= 4 && <line x1="130" y1="90"  x2="155" y2="115" strokeWidth="3" className="hangman-body" />}
      {wrongCount >= 5 && <line x1="130" y1="135" x2="105" y2="165" strokeWidth="3" className="hangman-body" />}
      {wrongCount >= 6 && <line x1="130" y1="135" x2="155" y2="165" strokeWidth="3" className="hangman-body" />}
    </svg>
  );
}

// ─── Keyboard rows ────────────────────────────────────────────────────────────
const KEYBOARD_ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["Z","X","C","V","B","N","M"],
];

// ─── Types ────────────────────────────────────────────────────────────────────
export interface HangmanResult {
  starsEarned: number;
  correctWords: string[];
  wrongWords: string[];
}

interface WordRecord {
  word: VocabWord;
  correct: boolean;
}

interface HangmanGameProps {
  words: VocabWord[];
  isLoggedIn: boolean;
  onComplete: (result: HangmanResult) => void;
  onClose: () => void;
  onMarkCorrect: (word: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function HangmanGame({
  words,
  isLoggedIn,
  onComplete,
  onClose,
  onMarkCorrect,
}: HangmanGameProps) {
  const [wordIndex,    setWordIndex]    = useState(0);
  const [guessed,      setGuessed]      = useState<Set<string>>(new Set());
  const [wrongCount,   setWrongCount]   = useState(0);
  const [correctWords, setCorrectWords] = useState<string[]>([]);
  const [wrongWords,   setWrongWords]   = useState<string[]>([]);
  const [wordRecords,  setWordRecords]  = useState<WordRecord[]>([]);
  const [phase,        setPhase]        = useState<"playing" | "word-result" | "summary">("playing");
  const [wordResult,   setWordResult]   = useState<"correct" | "wrong" | null>(null);
  const [summaryData,  setSummaryData]  = useState<HangmanResult | null>(null);
  const [isSpeaking,   setIsSpeaking]   = useState(false);
  const continueRef = useRef<HTMLButtonElement>(null);

  const currentWord  = words[wordIndex];
  const wordLetters  = currentWord?.word.toUpperCase().split("") ?? [];
  const uniqueLetters = [...new Set(wordLetters.filter((l) => /[A-Z]/.test(l)))];
  const isWordWon    = uniqueLetters.every((l) => guessed.has(l));
  const isWordLost   = wrongCount >= MAX_WRONG;
  const isLastWord   = wordIndex + 1 >= words.length;

  // ─── Phát âm helper ──────────────────────────────────────────────────────
  const handleSpeak = useCallback((word: string) => {
    setIsSpeaking(true);
    speak(word);
    setTimeout(() => setIsSpeaking(false), 900);
  }, []);

  // ─── Keyboard handler ─────────────────────────────────────────────────────
  const handleKey = useCallback((letter: string) => {
    if (phase !== "playing" || guessed.has(letter)) return;
    const newGuessed = new Set(guessed).add(letter);
    setGuessed(newGuessed);
    if (!wordLetters.includes(letter)) {
      setWrongCount((c) => c + 1);
    }
  }, [phase, guessed, wordLetters]);

  // ─── Physical keyboard ────────────────────────────────────────────────────
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (phase === "word-result") continueToNext();
        if (phase === "summary" && summaryData) handleFinish();
        return;
      }
      const l = e.key.toUpperCase();
      if (/^[A-Z]$/.test(l)) handleKey(l);
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, [phase, handleKey, summaryData]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Detect word win/loss ─────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "playing") return;
    if (isWordWon) {
      const result = "correct";
      setWordResult(result);
      setPhase("word-result");
      onMarkCorrect(currentWord.word);
      // Auto-phát âm từ vừa đoán đúng
      setTimeout(() => speak(currentWord.word), 150);
    } else if (isWordLost) {
      const result = "wrong";
      setWordResult(result);
      setPhase("word-result");
      // Phát âm để nghe từ bị thua
      setTimeout(() => speak(currentWord.word), 150);
    }
  }, [isWordWon, isWordLost, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  // Focus "Tiếp tục" button khi vào word-result
  useEffect(() => {
    if (phase === "word-result") {
      setTimeout(() => continueRef.current?.focus(), 100);
    }
  }, [phase]);

  // ─── Advance to next word ─────────────────────────────────────────────────
  function continueToNext() {
    const correct    = wordResult === "correct";
    const newCorrect = correct   ? [...correctWords, currentWord.word] : correctWords;
    const newWrong   = !correct  ? [...wrongWords,   currentWord.word] : wrongWords;
    const newRecords = [...wordRecords, { word: currentWord, correct }];

    setCorrectWords(newCorrect);
    setWrongWords(newWrong);
    setWordRecords(newRecords);

    if (isLastWord) {
      // Xong tất cả → sang summary
      const score       = newCorrect.length;
      const starsEarned = score === 5 ? 2 : score === 4 ? 1 : 0;
      const result: HangmanResult = { starsEarned, correctWords: newCorrect, wrongWords: newWrong };
      setSummaryData(result);
      setPhase("summary");
    } else {
      // Sang từ tiếp theo
      setWordIndex((i) => i + 1);
      setGuessed(new Set());
      setWrongCount(0);
      setWordResult(null);
      setPhase("playing");
    }
  }

  // ─── Finish & close ───────────────────────────────────────────────────────
  function handleFinish() {
    if (summaryData) {
      onComplete(summaryData); // Closes popup + shows CTA
    }
  }

  if (!currentWord && phase === "playing") return null;

  return (
    <div className="hangman-overlay" role="dialog" aria-modal="true" aria-label="Hangman Game">
      <div className="hangman-modal">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div className="hangman-header">
          <div className="hangman-header__title">🎯 Hangman</div>
          <div className="hangman-header__progress">
            {phase === "summary" ? `${summaryData?.correctWords.length ?? 0}/5 ✓` : `${wordIndex + 1} / ${words.length}`}
          </div>
          <button className="hangman-header__close" onClick={onClose} aria-label="Close game">×</button>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            PHASE: playing
        ══════════════════════════════════════════════════════════════════ */}
        {phase === "playing" && (
          <>
            {/* Meaning hint */}
            <div className="hangman-hint">
              <span className="hangman-hint__label">Meaning:</span>
              <span className="hangman-hint__vi">{currentWord.vi}</span>
              {currentWord.ipa && (
                <span className="hangman-hint__ipa">/{currentWord.ipa}/</span>
              )}
            </div>

            {/* Drawing */}
            <HangmanDrawing wrongCount={wrongCount} />

            {/* Word slots */}
            <div className="hangman-word"
              aria-label={`Word to guess: ${wordLetters.map((l) => (guessed.has(l) ? l : "_")).join(" ")}`}>
              {wordLetters.map((letter, i) => {
                if (letter === " ") return <span key={i} className="hangman-word__space" />;
                const isRevealed = guessed.has(letter);
                return (
                  <span key={i}
                    className={`hangman-word__slot ${isRevealed ? "hangman-word__slot--revealed" : ""}`}>
                    {isRevealed ? letter : ""}
                  </span>
                );
              })}
            </div>

            {/* Wrong letters */}
            {wrongCount > 0 && (
              <div className="hangman-wrong">
                Wrong: {[...guessed].filter((l) => !wordLetters.includes(l)).join(", ")}
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
                      <button key={letter}
                        className={["hangman-key", isHit ? "hangman-key--hit" : "", isMiss ? "hangman-key--miss" : ""].join(" ")}
                        onClick={() => handleKey(letter)}
                        disabled={guessed.has(letter)}
                        aria-label={letter}>
                        {letter}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            PHASE: word-result — Hiện từ + nghĩa + phát âm + nút Tiếp tục
        ══════════════════════════════════════════════════════════════════ */}
        {phase === "word-result" && currentWord && (
          <div className={`hangman-reveal hangman-reveal--${wordResult} animate-fadeIn`}>
            {/* Result icon */}
            <div className="hangman-reveal__icon">
              {wordResult === "correct" ? "✅" : "❌"}
            </div>

            {/* Big word + 🔊 */}
            <div className="hangman-reveal__word-row">
              <span className="hangman-reveal__word">{currentWord.word}</span>
              <button
                className={`hangman-reveal__speak ${isSpeaking ? "hangman-reveal__speak--active" : ""}`}
                onClick={() => handleSpeak(currentWord.word)}
                aria-label={`Pronounce ${currentWord.word}`}
                title="Listen to pronunciation"
              >
                🔊
              </button>
            </div>

            {/* IPA */}
            {currentWord.ipa && (
              <div className="hangman-reveal__ipa">/{currentWord.ipa}/</div>
            )}

            {/* Vietnamese */}
            <div className="hangman-reveal__vi">🇻🇳 {currentWord.vi}</div>

            {/* Continue button */}
            <button
              ref={continueRef}
              className="hangman-reveal__continue"
              onClick={continueToNext}
              id="btn-hangman-continue"
            >
              {isLastWord ? "See results →" : "Continue →"}
              <span className="hangman-reveal__enter-hint">or press Enter</span>
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            PHASE: summary — Danh sách 5 từ đã chơi
        ══════════════════════════════════════════════════════════════════ */}
        {phase === "summary" && summaryData && (
          <div className="hangman-summary animate-fadeIn">
            {/* Score header */}
            <div className="hangman-summary__score">
              <span className="hangman-summary__score-num">
                {summaryData.correctWords.length}<span>/5</span>
              </span>
              <span className="hangman-summary__score-label">correct</span>
              {summaryData.starsEarned > 0 && (
                <span className="hangman-summary__stars">
                  +{summaryData.starsEarned} ⭐
                </span>
              )}
            </div>

            {/* Word list */}
            <div className="hangman-summary__list">
              {wordRecords.map((rec, i) => (
                <div
                  key={i}
                  className={`hangman-summary__item hangman-summary__item--${rec.correct ? "correct" : "wrong"}`}
                >
                  <span className="hangman-summary__status">
                    {rec.correct ? "✅" : "❌"}
                  </span>
                  <div className="hangman-summary__info">
                    <span className="hangman-summary__word">{rec.word.word}</span>
                    <span className="hangman-summary__vi">{rec.word.vi}</span>
                  </div>
                  <button
                    className="hangman-summary__speak"
                    onClick={() => handleSpeak(rec.word.word)}
                    aria-label={`Pronounce ${rec.word.word}`}
                    title="Listen to pronunciation"
                  >
                    🔊
                  </button>
                </div>
              ))}
            </div>

            {/* Finish button */}
            <button
              className="hangman-summary__finish"
              onClick={handleFinish}
              id="btn-hangman-finish"
            >
              Done ✓
            </button>

            {/* Guest notice */}
            {!isLoggedIn && (
              <div className="hangman-guest-notice">
                ℹ️ Sign in to save results & earn ⭐
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
