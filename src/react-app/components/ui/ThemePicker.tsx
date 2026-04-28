/**
 * ThemePicker.tsx
 * Grid 6 ô tròn để chọn theme — đổi màu ngay lập tức
 *
 * Cách dùng:
 *   <ThemePicker />
 *   <ThemePicker compact />   ← chỉ hiện swatches, không có label
 */

import { THEMES, useTheme, type ThemeId } from "./ThemeProvider";
import "./ThemePicker.css";

interface ThemePickerProps {
  compact?: boolean;
}

export function ThemePicker({ compact = false }: ThemePickerProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`theme-picker ${compact ? "theme-picker--compact" : ""}`}>
      {!compact && (
        <p className="theme-picker__label">Chọn giao diện yêu thích ✨</p>
      )}
      <div className="theme-picker__grid">
        {THEMES.map((t) => (
          <button
            key={t.id}
            type="button"
            id={`theme-btn-${t.id}`}
            className={`theme-swatch ${theme === t.id ? "theme-swatch--active" : ""}`}
            style={{
              "--swatch-color": t.primary,
              "--swatch-bg": t.bg,
            } as React.CSSProperties}
            onClick={() => setTheme(t.id as ThemeId)}
            title={t.label}
            aria-label={`Chủ đề ${t.label}`}
            aria-pressed={theme === t.id}
          >
            <span className="theme-swatch__emoji">{t.emoji}</span>
            {theme === t.id && (
              <span className="theme-swatch__check" aria-hidden>✓</span>
            )}
          </button>
        ))}
      </div>
      {!compact && (
        <p className="theme-picker__current">
          Đang dùng: <strong>{THEMES.find((t) => t.id === theme)?.label}</strong>
        </p>
      )}
    </div>
  );
}
