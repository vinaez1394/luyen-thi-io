/**
 * ReadingPassage.tsx — Collapsible passage panel
 *
 * Expanded: Hiện đoạn văn đầy đủ + nút "Thu gọn ▲" ở cuối
 * Collapsed: Compact bar với title rút gọn + nút "Mở lại ▼"
 * Tooltip: click vào từ gạch chân → popup (dùng WordTooltip chuẩn)
 */

import type { ReadingPassageData } from "../../types/reading";
import { WordTooltip } from "../vocabulary/WordTooltip";
import type { WordTooltipProps } from "../vocabulary/WordTooltip";

// ============================================
// Props
// ============================================
interface ReadingPassageProps {
  passage:             ReadingPassageData;
  isOpen:              boolean;
  onToggle:            () => void;
  sectionTitle:        string;
  vocabRemainingFree?: number;
  onVocabLookup?:      WordTooltipProps["onLookup"];
  isReview?:           boolean;
}

// Fallback noop nếu không có onVocabLookup (bài chưa login)
const DEFAULT_LOOKUP: WordTooltipProps["onLookup"] = () => ({ allowed: true, willCostStar: false });

// ============================================
// ReadingPassage
// ============================================
export function ReadingPassage({
  passage,
  isOpen,
  onToggle,
  sectionTitle,
  vocabRemainingFree = 3,
  onVocabLookup,
  isReview,
}: ReadingPassageProps) {

  const snippet = passage.raw_text
    ? passage.raw_text.slice(0, 50) + "…"
    : sectionTitle;

  // --- Collapsed ---
  if (!isOpen) {
    return (
      <div className="re-passage re-passage--collapsed">
        <button
          className="re-passage__collapsed-bar"
          onClick={onToggle}
          aria-label="Expand passage"
        >
          <span className="re-passage__collapsed-label">
            📄 {snippet}
          </span>
          <span className="re-passage__open-btn">Show ▼</span>
        </button>
      </div>
    );
  }

  // --- Expanded ---
  return (
    <div className="re-passage">
      <div className="re-passage__content">
        <div className="re-passage__badge">📄 Passage</div>
        <div className="re-passage__text">
          <WordTooltip
            prompt={passage.text_segments}
            remainingFree={vocabRemainingFree}
            onLookup={onVocabLookup ?? DEFAULT_LOOKUP}
            isReview={isReview}
          />
        </div>
      </div>

      {/* Nút thu gọn ở cuối đoạn văn */}
      <div className="re-passage__toggle">
        <button
          className="re-passage__toggle-btn"
          onClick={onToggle}
          aria-label="Collapse passage"
        >
          Collapse passage ▲
        </button>
      </div>
    </div>
  );
}
