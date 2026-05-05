/**
 * CollapsibleBlock.tsx — Accordion thu gọn/mở
 *
 * Dùng cho WritingEngine: Hướng dẫn + Ví dụ mẫu mặc định ĐÓNG.
 * User click "▼ Xem" để mở, click "▲ Đóng" để đóng lại.
 */

import { useState } from "react";

interface CollapsibleBlockProps {
  /** Tiêu đề thanh accordion (VD: "📖 Hướng dẫn làm bài") */
  title: string;
  children: React.ReactNode;
  /** Mặc định đóng (false) */
  defaultOpen?: boolean;
  className?: string;
}

export function CollapsibleBlock({
  title,
  children,
  defaultOpen = false,
  className = "",
}: CollapsibleBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`collapsible-block ${className}`}>
      <button
        className={`collapsible-block__toggle ${isOpen ? "collapsible-block__toggle--open" : ""}`}
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        type="button"
      >
        <span className="collapsible-block__title">{title}</span>
        <span className="collapsible-block__icon" aria-hidden="true">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      <div
        className={`collapsible-block__body ${isOpen ? "collapsible-block__body--open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="collapsible-block__inner">
          {children}
        </div>
      </div>
    </div>
  );
}
