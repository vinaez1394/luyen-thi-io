/**
 * Breadcrumb.tsx — Component breadcrumb dùng chung
 *
 * Tự động build chuỗi: Trang chủ › Cambridge › Flyers (hoặc Lớp 6 › Toán)
 * Dùng trên SubjectPage và QuizLayout
 *
 * Usage:
 *   <Breadcrumb items={[
 *     { label: "Trang chủ", href: "/" },
 *     { label: "Cambridge", href: "/cambridge" },
 *     { label: "Flyers" },  // item cuối = current, không có href
 *   ]} />
 */

import { useNavigate } from "react-router-dom";
import "./Breadcrumb.css";

export interface BreadcrumbItem {
  label:   string;
  href?:   string;   // nếu không có = item hiện tại (không click được)
  emoji?:  string;
}

interface BreadcrumbProps {
  items:     BreadcrumbItem[];
  /** Nếu true, dùng dialog confirm trước khi navigate (trong QuizLayout) */
  onNavigate?: (href: string) => void;
}

export function Breadcrumb({ items, onNavigate }: BreadcrumbProps) {
  const navigate = useNavigate();

  const handleClick = (href: string) => {
    if (onNavigate) {
      onNavigate(href);  // delegated — QuizLayout dùng để show ExitConfirmDialog
    } else {
      navigate(href);
    }
  };

  return (
    <nav className="breadcrumb" aria-label="Vị trí hiện tại">
      <ol className="breadcrumb__list">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="breadcrumb__item">
              {!isLast && item.href ? (
                <button
                  className="breadcrumb__link"
                  onClick={() => handleClick(item.href!)}
                  aria-label={`Về ${item.label}`}
                >
                  {item.emoji && <span className="breadcrumb__emoji">{item.emoji}</span>}
                  {item.label}
                </button>
              ) : (
                <span
                  className={`breadcrumb__current ${isLast ? "breadcrumb__current--active" : ""}`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.emoji && <span className="breadcrumb__emoji">{item.emoji}</span>}
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className="breadcrumb__sep" aria-hidden="true">›</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/**
 * useBreadcrumbs — Hook tạo breadcrumb items từ pathname
 *
 * VD: "/cambridge/flyers" → [Home, Cambridge, Flyers]
 *     "/lop6/toan"        → [Home, Lớp 6, Toán & Tư duy]
 */
export function useBreadcrumbs(
  pathname: string,
  currentLabel?: string,
): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);

  const items: BreadcrumbItem[] = [
    { label: "Trang chủ", href: "/", emoji: "🏠" },
  ];

  if (segments[0] === "cambridge") {
    items.push({ label: "Cambridge", href: "/cambridge", emoji: "🇬🇧" });
    if (segments[1]) {
      items.push({ label: currentLabel ?? segments[1] });
    }
  } else if (segments[0] === "lop6") {
    items.push({ label: "Lớp 6", href: "/lop6", emoji: "🏫" });
    if (segments[1]) {
      items.push({ label: currentLabel ?? segments[1] });
    }
  }

  return items;
}
