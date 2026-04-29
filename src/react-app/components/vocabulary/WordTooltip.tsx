/**
 * WordTooltip.tsx — Component hiển thị từ có thể tra nghĩa
 *
 * Render annotated prompt: string | TextSegment[]
 * Các từ có tooltip -> gạch chân chấm chấm, click/tap -> popup
 * Hỗ trợ: 3 lượt miễn phí/bài, sau đó hiện cảnh báo trừ sao
 */

import { useState, useRef, useEffect, useCallback } from "react";
import type { TextSegment, AnnotatedPrompt } from "../../types/vocabulary";
import "./WordTooltip.css";

// ─── Props ────────────────────────────────────────────────────────────────────
export interface WordTooltipProps {
  /** prompt từ quiz JSON: string (cũ) hoặc TextSegment[] (mới) */
  prompt: AnnotatedPrompt;
  /** Số lượt tra còn miễn phí */
  remainingFree: number;
  /** Callback khi user tra từ */
  onLookup: (word: string, vi: string, ipa?: string) => { allowed: boolean; willCostStar: boolean };
  /** true = sau khi nộp bài, không đếm lượt */
  isReview?: boolean;
}

// ─── Popup ────────────────────────────────────────────────────────────────────
interface TooltipPopup {
  word: string;
  vi: string;
  ipa?: string;
  willCostStar: boolean;
  x: number;
  y: number;
}

// ─── Component ───────────────────────────────────────────────────────────────
export function WordTooltip({ prompt, remainingFree, onLookup, isReview }: WordTooltipProps) {
  const [popup, setPopup] = useState<TooltipPopup | null>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  // Đóng popup khi click ra ngoài
  useEffect(() => {
    if (!popup) return;
    const handle = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setPopup(null);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [popup]);

  const handleWordClick = useCallback(
    (seg: TextSegment, e: React.MouseEvent) => {
      if (!seg.tooltip) return;
      e.stopPropagation();
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      const { allowed, willCostStar } = isReview
        ? { allowed: true, willCostStar: false }
        : onLookup(seg.text, seg.tooltip.vi, seg.tooltip.ipa);
      if (!allowed) return;
      setPopup({
        word: seg.text,
        vi: seg.tooltip.vi,
        ipa: seg.tooltip.ipa,
        willCostStar,
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
    },
    [onLookup, isReview]
  );

  // ── Parse prompt: string → render as plain text
  if (typeof prompt === "string") {
    return <span className="word-tooltip">{prompt}</span>;
  }

  // ── Parse prompt: TextSegment[] → render với clickable words
  return (
    <span className="word-tooltip" ref={containerRef}>
      {prompt.map((seg, i) => {
        if (!seg.tooltip) {
          return <span key={i}>{seg.text}</span>;
        }
        return (
          <span
            key={i}
            className="word-tooltip__word"
            onClick={(e) => handleWordClick(seg, e)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleWordClick(seg, e as unknown as React.MouseEvent);
              }
            }}
            title="Click để xem nghĩa"
          >
            {seg.text}
          </span>
        );
      })}

      {/* Tooltip popup */}
      {popup && (
        <span
          className="word-tooltip__popup animate-fadeIn"
          style={{
            left: `${popup.x}px`,
            top: `${popup.y}px`,
          }}
          role="tooltip"
        >
          <button
            className="word-tooltip__popup-close"
            onClick={() => setPopup(null)}
            aria-label="Đóng"
          >
            ×
          </button>

          <div className="word-tooltip__popup-word">{popup.word}</div>

          {popup.ipa && (
            <div className="word-tooltip__popup-ipa">/{popup.ipa}/</div>
          )}

          <div className="word-tooltip__popup-vi">🇻🇳 {popup.vi}</div>

          {popup.willCostStar && (
            <div className="word-tooltip__popup-cost">⭐ −1 sao</div>
          )}

          {!isReview && remainingFree > 0 && (
            <div className="word-tooltip__popup-free">
              {remainingFree} lượt tra miễn phí còn lại
            </div>
          )}
        </span>
      )}
    </span>
  );
}

// ─── Render helper (dùng trong MultipleChoice, FillBlank v.v.) ────────────────
/**
 * renderPrompt — Render prompt với Word Tooltip support
 * Dùng thay cho {question.prompt} trong các quiz components
 */
export function renderPrompt(
  prompt: AnnotatedPrompt,
  remainingFree: number,
  onLookup: WordTooltipProps["onLookup"],
  isReview?: boolean
) {
  return (
    <WordTooltip
      prompt={prompt}
      remainingFree={remainingFree}
      onLookup={onLookup}
      isReview={isReview}
    />
  );
}
