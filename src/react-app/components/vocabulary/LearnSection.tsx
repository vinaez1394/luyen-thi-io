/**
 * LearnSection.tsx — LEARN phase: xem 8 từ lần lượt
 *
 * Layout: WordCard với emoji/ảnh + word + IPA + cert badge + nghĩa + example
 * Navigation: dot indicators + Prev/Next + audio button
 * Sau khi xem hết từ cuối → nút "Bắt đầu luyện tập" xuất hiện
 */
import { useState, useCallback } from "react";
import type { LessonWord } from "../../types/vocabulary";
import { CertBadge } from "./CertBadge";
import { speakWord, isSpeechSupported } from "../../utils/speakWord";

interface LearnSectionProps {
  words:          LessonWord[];
  onComplete:     () => void;         // Callback khi user xong LEARN
}

export function LearnSection({ words, onComplete }: LearnSectionProps) {
  const [currentIdx, setCurrentIdx]       = useState(0);
  const [seenAll,    setSeenAll]          = useState(false);
  const [speaking,   setSpeaking]         = useState(false);
  const [flipped,    setFlipped]          = useState(false);   // flip card để xem nghĩa

  const current = words[currentIdx];
  const total   = words.length;
  const isLast  = currentIdx === total - 1;
  const isFirst = currentIdx === 0;

  // ── Navigation ────────────────────────────────────────────────────────────
  const goNext = useCallback(() => {
    if (isLast) {
      setSeenAll(true);
    } else {
      setCurrentIdx(i => i + 1);
      setFlipped(false);
    }
  }, [isLast]);

  const goPrev = useCallback(() => {
    if (!isFirst) {
      setCurrentIdx(i => i - 1);
      setFlipped(false);
    }
  }, [isFirst]);

  const goToIndex = useCallback((idx: number) => {
    setCurrentIdx(idx);
    setFlipped(false);
  }, []);

  // ── Audio ─────────────────────────────────────────────────────────────────
  const handleSpeak = useCallback(async () => {
    if (!current) return;

    if (current.audio_url) {
      // Nếu có file MP3, phát file đó
      const audio = new Audio(current.audio_url);
      setSpeaking(true);
      audio.onended = () => setSpeaking(false);
      audio.onerror = () => setSpeaking(false);
      await audio.play().catch(() => setSpeaking(false));
    } else {
      // Fallback: Web Speech API
      setSpeaking(true);
      speakWord(current.word);
      // Estimate duration dựa vào độ dài từ
      const duration = Math.max(600, current.word.length * 100);
      setTimeout(() => setSpeaking(false), duration);
    }
  }, [current]);

  if (!current) return null;

  // Media: ảnh hoặc emoji
  const hasImage = Boolean(current.image_url);

  return (
    <div className="learn-section">
      {/* Dot progress indicators */}
      <div className="learn-dots" role="tablist" aria-label="Vocabulary words">
        {words.map((w, i) => (
          <button
            key={w.id}
            role="tab"
            aria-selected={i === currentIdx}
            aria-label={`Word ${i + 1}: ${w.word}`}
            className={`learn-dot${i === currentIdx ? " learn-dot--active" : ""}${i < currentIdx ? " learn-dot--seen" : ""}`}
            onClick={() => goToIndex(i)}
          />
        ))}
      </div>

      {/* Word counter */}
      <p className="learn-counter">
        <span className="learn-counter__current">{currentIdx + 1}</span>
        <span className="learn-counter__sep">/</span>
        <span className="learn-counter__total">{total}</span>
      </p>

      {/* WordCard — outer sets perspective, inner rotates */}
      <div
        className={`learn-card${flipped ? " learn-card--flipped" : ""}`}
        onClick={() => setFlipped(f => !f)}
        role="button"
        tabIndex={0}
        aria-label={`Click to ${flipped ? "hide" : "see"} the Vietnamese meaning`}
        onKeyDown={e => e.key === "Enter" && setFlipped(f => !f)}
      >
        {/* Inner — rotates on flip */}
        <div className="learn-card__inner">

          {/* Front */}
          <div className="learn-card__front">
            {/* Media */}
            <div className="learn-card__media">
              {hasImage ? (
                <img
                  src={current.image_url!}
                  alt={current.word}
                  className="learn-card__image"
                  loading="lazy"
                />
              ) : (
                <span className="learn-card__emoji" aria-hidden="true">
                  {current.emoji}
                </span>
              )}
            </div>

            {/* Word + IPA + cert badge */}
            <div className="learn-card__word-area">
              <h2 className="learn-card__word">{current.word}</h2>
              <div className="learn-card__meta">
                {current.ipa && (
                  <span className="learn-card__ipa">/{current.ipa}/</span>
                )}
                <CertBadge cert={current.certificate} size="sm" />
              </div>
            </div>

            {/* Hint to flip */}
            <p className="learn-card__hint">👆 Tap to flip</p>
          </div>

          {/* Back */}
          <div className="learn-card__back">
            <div className="learn-card__media">
              {current.image_url ? (
                <img
                  src={current.image_url}
                  alt={current.word}
                  className="learn-card__image"
                  loading="lazy"
                />
              ) : (
                <span className="learn-card__emoji" aria-hidden="true">
                  {current.emoji}
                </span>
              )}
            </div>

            <h2 className="learn-card__word">{current.word}</h2>
            <p className="learn-card__translation">{current.translation_vi}</p>

            {current.word_type && (
              <span className="learn-card__type">{current.word_type}</span>
            )}

            {current.example_en && (
              <div className="learn-card__example">
                <p className="learn-card__example-en">"{current.example_en}"</p>
                {current.example_vi && (
                  <p className="learn-card__example-vi">{current.example_vi}</p>
                )}
              </div>
            )}
          </div>

        </div>{/* /learn-card__inner */}
      </div>

      {/* Controls */}
      <div className="learn-controls">
        {/* Audio button */}
        <button
          className={`learn-btn learn-btn--audio${speaking ? " learn-btn--speaking" : ""}`}
          onClick={e => { e.stopPropagation(); handleSpeak(); }}
          disabled={speaking || !isSpeechSupported()}
          aria-label={`Pronounce ${current.word}`}
          title="Listen to pronunciation"
        >
          {speaking ? "🔊" : "🔈"}
        </button>

        {/* Prev */}
        <button
          className="learn-btn learn-btn--nav"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Previous word"
        >
          ← Previous
        </button>

        {/* Next / Finish */}
        {isLast ? (
          seenAll ? (
            <button
              className="learn-btn learn-btn--primary learn-btn--pulse"
              onClick={onComplete}
            >
              🎉 Start Practice!
            </button>
          ) : (
            <button
              className="learn-btn learn-btn--next"
              onClick={goNext}
            >
              Got it ✓
            </button>
          )
        ) : (
          <button
            className="learn-btn learn-btn--next"
            onClick={goNext}
            aria-label="Next word"
          >
            Next →
          </button>
        )}
      </div>

      {/* Bắt đầu luyện khi seenAll nhưng chưa ở cuối */}
      {seenAll && !isLast && (
        <div className="learn-seen-all">
          <button className="learn-btn learn-btn--primary" onClick={onComplete}>
            🎉 Start Practice!
          </button>
        </div>
      )}
    </div>
  );
}
