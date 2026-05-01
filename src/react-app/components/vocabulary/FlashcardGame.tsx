/**
 * FlashcardGame.tsx — Mini game học từ vựng bằng thẻ lật
 *
 * Luật chơi:
 * - 5 thẻ / session
 * - Mỗi thẻ: mặt trước = từ tiếng Anh + IPA, mặt sau = nghĩa tiếng Việt
 * - Sau khi lật → user đánh giá: "Biết rồi ✅" / "Chưa biết ❌"
 * - 5/5 = 2⭐ | 4/5 = 1⭐ | ≤3 = 0⭐
 */

import { useState, useCallback } from "react";
import type { VocabWord } from "../../types/vocabulary";
import "./FlashcardGame.css";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FlashcardResult {
  starsEarned: number;
  knownWords: string[];
  unknownWords: string[];
}

interface FlashcardGameProps {
  words: VocabWord[];
  isLoggedIn: boolean;
  onComplete: (result: FlashcardResult) => void;
  onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function FlashcardGame({
  words,
  isLoggedIn,
  onComplete,
  onClose,
}: FlashcardGameProps) {
  const [cardIndex,   setCardIndex]   = useState(0);
  const [isFlipped,   setIsFlipped]   = useState(false);
  const [knownWords,  setKnownWords]  = useState<string[]>([]);
  const [unknownWords,setUnknownWords]= useState<string[]>([]);
  const [phase,       setPhase]       = useState<"playing" | "done">("playing");

  const current = words[cardIndex];

  const handleFlip = useCallback(() => {
    if (phase !== "playing") return;
    setIsFlipped((f) => !f);
  }, [phase]);

  const handleRate = useCallback((known: boolean) => {
    if (!isFlipped) return; // Phải lật trước mới được đánh giá

    const newKnown   = known ? [...knownWords, current.word] : knownWords;
    const newUnknown = !known ? [...unknownWords, current.word] : unknownWords;

    if (cardIndex + 1 >= words.length) {
      // Xong tất cả thẻ
      const score      = newKnown.length;
      const starsEarned = score === 5 ? 2 : score === 4 ? 1 : 0;
      setKnownWords(newKnown);
      setUnknownWords(newUnknown);
      setPhase("done");
      onComplete({ starsEarned, knownWords: newKnown, unknownWords: newUnknown });
    } else {
      setKnownWords(newKnown);
      setUnknownWords(newUnknown);
      setIsFlipped(false);
      setTimeout(() => setCardIndex((i) => i + 1), 300); // Chờ flip-back animation
    }
  }, [isFlipped, cardIndex, current, knownWords, unknownWords, words.length, onComplete]);

  if (!current) return null;

  // Progress dots
  const dots = words.map((_, i) => {
    if (i < cardIndex)            return knownWords.includes(words[i].word) ? "known" : "unknown";
    if (i === cardIndex)          return "current";
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
          className={`fc-card-scene`}
          onClick={handleFlip}
          role="button"
          tabIndex={0}
          aria-label={isFlipped ? `Mặt sau: ${current.vi}` : `Mặt trước: ${current.word}`}
          onKeyDown={(e) => e.key === "Enter" && handleFlip()}
        >
          <div className={`fc-card ${isFlipped ? "fc-card--flipped" : ""}`}>
            {/* Mặt trước: từ tiếng Anh */}
            <div className="fc-card__front">
              <div className="fc-card__badge">EN</div>
              <div className="fc-card__word">{current.word}</div>
              {current.ipa && (
                <div className="fc-card__ipa">/{current.ipa}/</div>
              )}
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

        {/* Guest notice */}
        {!isLoggedIn && (
          <div className="fc-guest">ℹ️ Đăng nhập để lưu tiến độ & nhận sao</div>
        )}
      </div>
    </div>
  );
}
