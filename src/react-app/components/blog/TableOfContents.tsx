/**
 * TableOfContents.tsx — Mục lục bài viết (TOC)
 *
 * Hiển thị danh sách H2/H3 với highlight heading đang hiển thị.
 * Dùng IntersectionObserver để auto-highlight.
 */

import { useEffect, useState } from "react";
import type { TocItem } from "../../types/blog";
import "./TableOfContents.css";

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // ─── Theo dõi heading nào đang hiển thị ─────────────────────────────────
  useEffect(() => {
    if (items.length === 0) return;

    const headingEls = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        // Lấy heading đang hiển thị cao nhất trên màn hình
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px", // Header height offset
        threshold: 0,
      }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="toc" aria-label="Mục lục bài viết">
      <p className="toc__title">📋 Mục lục</p>
      <ol className="toc__list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`toc__item toc__item--h${item.level} ${activeId === item.id ? "toc__item--active" : ""}`}
          >
            <a
              href={`#${item.id}`}
              className="toc__link"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  const offset = 80; // Header height
                  const top = el.getBoundingClientRect().top + window.scrollY - offset;
                  window.scrollTo({ top, behavior: "smooth" });
                  setActiveId(item.id);
                }
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
