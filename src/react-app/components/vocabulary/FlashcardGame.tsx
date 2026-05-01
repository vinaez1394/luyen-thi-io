/**
 * FlashcardGame.tsx — Mini game học từ vựng bằng thẻ lật
 *
 * V2 changes:
 * - Thêm nút 🔊 phát âm (Web Speech API) — gọi khi hiện mặt trước
 * - Bỏ cơ chế thưởng sao (starsEarned luôn = 0, không hiện trong UI)
 * - starsEarned giữ trong FlashcardResult để tương thích ngược
 *
 * Luật chơi:
 * - 5 thẻ / session
 * - Mặt trước: từ tiếng Anh + IPA + nút 🔊
 * - Mặt sau: nghĩa tiếng Việt
 * - Sau khi lật → đánh giá: "Biết rồi ✅" / "Chưa biết ❌"
 */

import { useState, useCallback, useEffect } from "react";
import type { VocabWord } from "../../types/vocabulary";
import "./FlashcardGame.css";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FlashcardResult {
  starsEarned: number; // Luôn = 0 (bỏ cơ chế sao cho flashcard)
  knownWords: string[];
  unknownWords: string[];
}

interface FlashcardGameProps {
  words: VocabWord[];
  isLoggedIn: boolean;
  onComplete: (result: FlashcardResult) => void;
  onClose: () => void;
}

// ─── Pronunciation (Web Speech API) ──────────────────────────────────────────
function speak(word: string) {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel(); // Hủy bất kỳ âm nào đang phát
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang  = "en-US";
  utterance.rate  = 0.82;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}

// ─── Component ────────────────────────────────────────────────────────────────
export function FlashcardGame({
  words,
  isLoggedIn,
  onComplete,
  onClose,
}: FlashcardGameProps) {
  const [cardIndex,    setCardIndex]    = useState(0);
  const [isFlipped,    setIsFlipped]    = useState(false);
  const [knownWords,   setKnownWords]   = useState<string[]>([]);
  const [unknownWords, setUnknownWords] = useState<string[]>([]);
  const [phase,        setPhase]        = useState<"playing" | "done">("playing");
  const [isSpeaking,   setIsSpeaking]   = useState(false);

  const current = words[cardIndex];

  // Tự động phát âm khi sang thẻ mới
  useEffect(() => {
    if (current && phase === "playing" && !isFlipped) {
      // Nhỏ delay để animation card xuất hiện trước
      const t = setTimeout(() => speak(current.word), 350);
      return () => clearTimeout(t);
    }
  }, [cardIndex, phase]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFlip = useCallback(() => {
    if (phase !== "playing") return;
    setIsFlipped((f) => !f);
  }, [phase]);

  const handleSpeak = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Không flip card khi bấm phát âm
    if (!current) return;
    setIsSpeaking(true);
    speak(current.word);
    setTimeout(() => setIsSpeaking(false), 900);
  }, [current]);

  const handleRate = useCallback((known: boolean) => {
    if (!isFlipped) return;

    const newKnown   = known ? [...knownWords, current.word] : knownWords;
    const newUnknown = !known ? [...unknownWords, current.word] : unknownWords;

    if (cardIndex + 1 >= words.length) {
      setKnownWords(newKnown);
      setUnknownWords(newUnknown);
      setPhase("done");
      // starsEarned = 0 — bỏ cơ chế sao cho flashcard
      onComplete({ starsEarned: 0, knownWords: newKnown, unknownWords: newUnknown });
    } else {
      setKnownWords(newKnown);
      setUnknownWords(newUnknown);
      setIsFlipped(false);
      setTimeout(() => setCardIndex((i) => i + 1), 300);
    }
  }, [isFlipped, cardIndex, current, knownWords, unknownWords, words.length, onComplete]);

  if (!current) return null;

  const dots = words.map((_, i) => {
    if (i < cardIndex)   return knownWords.includes(words[i].word) ? "known" : "unknown";
    if (i === cardIndex) return "current";
    return "pending";
  });

  return (
    <div className="fc-overlay" role="dialog" aria-modal="true" aria-label="Flashcard Game">
      <div className="fc-modal">

        {/* Header */}
        <div className="fc-header">
          <div className="fc-header__title">🃏 Flashcard</div>
          <div className="fc-header__progress">
            {cardIndex + 1} / {words.length}
          </div>
          <button className="fc-header__close" onClick={onClose} aria-label="Đóng">×</button>
        </div>

        {/* Progress dots */}
        <div className="fc-dots">
          {dots.map((status, i) => (
            <span key={i} className={`fc-dot fc-dot--${status}`} />
          ))}
        </div>

        {/* Instruction */}
        <p className="fc-instruction">
          {!isFlipped ? "Bấm vào thẻ để xem nghĩa 👆" : "Bạn có biết từ này không?"}
        </p>

        {/* 3D Flip Card */}
        <div
          className="fc-card-scene"
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          aria-label={isFlipped ? `Mặt sau: ${current.vi}` : `Mặt trước: ${current.word}`}
          onKeyDown={(e) => e.key === "Enter" && handleFlip()}
        >
          <div className={`fc-card ${isFlipped ? "fc-card--flipped" : ""}`}>
            {/* Mặt trước: từ tiếng Anh + IPA + 🔊 */}
            <div className="fc-card__front">
              <div className="fc-card__badge">EN</div>
              <div className="fc-card__word">{current.word}</div>
              {current.ipa && (
                <div className="fc-card__ipa">/{current.ipa}/</div>
              )}

              {/* Nút phát âm — không flip card */}
              <button
                className={`fc-card__speak ${isSpeaking ? "fc-card__speak--active" : ""}`}
                onClick={handleSpeak}
                aria-label={`Phát âm từ ${current.word}`}
                title="Nghe phát âm"
              >
                🔊
              </button>

              <div className="fc-card__tap-hint">Bấm để lật ↩</div>
            </div>

            {/* Mặt sau: nghĩa tiếng Việt */}
            <div className="fc-card__back">
              <div className="fc-card__badge fc-card__badge--vi">🇻🇳 VI</div>
              <div className="fc-card__meaning">{current.vi}</div>
              <div className="fc-card__word-small">{current.word}</div>
            </div>
          </div>
        </div>

        {/* Rate buttons — chỉ hiện sau khi lật */}
        <div className={`fc-actions ${isFlipped ? "fc-actions--visible" : ""}`}>
          <button
            className="fc-btn fc-btn--unknown"
            onClick={() => handleRate(false)}
            disabled={!isFlipped}
            aria-label="Chưa biết từ này"
          >
            <span className="fc-btn__icon">😅</span>
            <span>Chưa biết</span>
          </button>
          <button
            className="fc-btn fc-btn--known"
            onClick={() => handleRate(true)}
            disabled={!isFlipped}
            aria-label="Biết từ này rồi"
          >
            <span className="fc-btn__icon">✅</span>
            <span>Biết rồi!</span>
          </button>
        </div>

        {/* Guest notice — chỉ hiện khi không có isLoggedIn (trong quiz page) */}
        {!isLoggedIn && (
          <div className="fc-guest">ℹ️ Đăng nhập để lưu tiến độ & nhận thưởng</div>
        )}
      </div>
    </div>
  );
}
