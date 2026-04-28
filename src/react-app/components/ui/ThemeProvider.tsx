/**
 * ThemeProvider.tsx
 * Quản lý theme hiện tại — lưu vào localStorage, apply lên <html>
 *
 * Cách dùng:
 *   <ThemeProvider><App /></ThemeProvider>
 *   const { theme, setTheme } = useTheme()
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeId =
  | "purple"
  | "ocean"
  | "sakura"
  | "forest"
  | "night"
  | "sunset";

export interface ThemeInfo {
  id: ThemeId;
  label: string;
  emoji: string;
  primary: string;   /* hex để preview color swatch */
  bg: string;
}

export const THEMES: ThemeInfo[] = [
  { id: "purple", label: "Tím Mộng Mơ",     emoji: "🔮", primary: "#6366F1", bg: "#F5F3FF" },
  { id: "ocean",  label: "Đại Dương Xanh",   emoji: "🌊", primary: "#0EA5E9", bg: "#F0F9FF" },
  { id: "sakura", label: "Hoa Anh Đào",      emoji: "🌸", primary: "#EC4899", bg: "#FFF0F9" },
  { id: "forest", label: "Rừng Xanh Tươi",  emoji: "🌿", primary: "#16A34A", bg: "#F0FDF4" },
  { id: "night",  label: "Bầu Trời Đêm",    emoji: "🌙", primary: "#818CF8", bg: "#0F172A" },
  { id: "sunset", label: "Hoàng Hôn Cam",   emoji: "🌅", primary: "#F97316", bg: "#FFF7ED" },
];

const STORAGE_KEY = "luyen-thi-theme";
const DEFAULT_THEME: ThemeId = "purple";

// =============================================
// Context
// =============================================
interface ThemeContextValue {
  theme: ThemeId;
  themeInfo: ThemeInfo;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

// =============================================
// Provider
// =============================================
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>(() => {
    // Load từ localStorage (user preference)
    const saved = localStorage.getItem(STORAGE_KEY) as ThemeId | null;
    if (saved && THEMES.some((t) => t.id === saved)) return saved;
    return DEFAULT_THEME;
  });

  // Apply theme lên <html data-theme="..."> khi mount và khi thay đổi
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = (id: ThemeId) => {
    setThemeState(id);
  };

  const themeInfo = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, themeInfo, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// =============================================
// Hook
// =============================================
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme phải dùng bên trong <ThemeProvider>");
  }
  return ctx;
}
