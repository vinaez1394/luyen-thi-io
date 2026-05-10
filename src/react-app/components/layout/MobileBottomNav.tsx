/**
 * MobileBottomNav.tsx — Fixed bottom navigation for mobile (≤768px)
 * 4 tabs: Home, Lessons, Progress, Profile
 * Ẩn tự động trên /quiz routes
 */

import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./MobileBottomNav.css";

const NAV_ITEMS = [
  { label: "Trang chủ", emoji: "🏠", path: "/",         id: "home" },
  { label: "Lộ trình",  emoji: "📚", path: "/learn",    id: "learn" },
  { label: "Tiến độ",  emoji: "📊", path: "/dashboard", id: "dashboard" },
  { label: "Hồ sơ",    emoji: "👤", path: "/profile",   id: "profile" },
] as const;

export function MobileBottomNav() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { isLoggedIn } = useAuth();

  // Ẩn trên quiz routes (xử lý trong AppLayout, nhưng double-check ở đây)
  if (location.pathname.startsWith("/quiz")) return null;

  return (
    <nav className="mobile-bottom-nav" aria-label="Navigation di động">
      {NAV_ITEMS.map((item) => {
        const isActive = location.pathname === item.path ||
          (item.path === "/dashboard" && location.pathname.startsWith("/dashboard"));

        // Dashboard + Profile → cần login
        const needsAuth = item.path === "/dashboard" || item.path === "/profile";

        return (
          <button
            key={item.id}
            className={`mobile-bottom-nav__item ${isActive ? "active" : ""}`}
            id={`btn-mobile-nav-${item.id}`}
            onClick={() => {
              if (needsAuth && !isLoggedIn) {
                navigate("/login");
              } else {
                navigate(item.path);
              }
            }}
            aria-label={item.label}
            aria-current={isActive ? "page" : undefined}
          >
            <span className="mobile-bottom-nav__icon">{item.emoji}</span>
            <span className="mobile-bottom-nav__label">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
