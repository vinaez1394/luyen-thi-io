/**
 * ReadingPassage.tsx — Collapsible passage panel
 *
 * Expanded: Hiện đoạn văn đầy đủ + nút "Thu gọn ▲" ở cuối
 * Collapsed: Compact bar với title rút gọn + nút "Mở lại ▼"
 * Hỗ trợ tooltip inline (hover để xem nghĩa tiếng Việt + IPA)
 */

import type { ReadingPassageData, TextSegment } from "../../types/reading";

// ============================================
// Props
// ============================================
interface ReadingPassageProps {
  passage:      ReadingPassageData;
  isOpen:       boolean;
  onToggle:     () => void;
  sectionTitle: string;
}

// ============================================
// AnnotatedText — render text_segments với tooltip
// ============================================
function AnnotatedText({ segments }: { segments: TextSegment[] }) {
  return (
    <>
      {segments.map((seg, i) => {
        // Từ được tô (0) common — điền sẵn làm mẫu
        if (seg.highlight) {
          return (
            <span key={i} className="re-passage__highlight">
              {seg.text}
            </span>
          );
        }

        // Từ có tooltip
        if (seg.tooltip) {
          return (
            <span key={i} className="re-tooltip-wrap">
              <span className="re-tooltip-trigger">{seg.text}</span>
              <span className="re-tooltip-box">
                🇻🇳 {seg.tooltip.vi}
                {seg.tooltip.ipa && (
                  <> &nbsp;|&nbsp; /{seg.tooltip.ipa}/&nbsp;</>
                )}
              </span>
            </span>
          );
        }

        // Text thông thường
        return <span key={i}>{seg.text}</span>;
      })}
    </>
  );
}

// ============================================
// ReadingPassage
// ============================================
export function ReadingPassage({
  passage,
  isOpen,
  onToggle,
  sectionTitle,
}: ReadingPassageProps) {

  // Lấy snippet cho collapsed bar (40 ký tự đầu của raw_text)
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
          aria-label="Mở lại đoạn văn"
        >
          <span className="re-passage__collapsed-label">
            📄 {snippet}
          </span>
          <span className="re-passage__open-btn">Mở lại ▼</span>
        </button>
      </div>
    );
  }

  // --- Expanded ---
  return (
    <div className="re-passage">
      <div className="re-passage__content">
        <div className="re-passage__badge">📄 Đoạn văn</div>
        <div className="re-passage__text">
          <AnnotatedText segments={passage.text_segments} />
        </div>
      </div>

      {/* Nút thu gọn ở cuối đoạn văn */}
      <div className="re-passage__toggle">
        <button
          className="re-passage__toggle-btn"
          onClick={onToggle}
          aria-label="Thu gọn đoạn văn"
        >
          Thu gọn đoạn văn ▲
        </button>
      </div>
    </div>
  );
}
