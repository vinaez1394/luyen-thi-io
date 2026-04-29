/**
 * AppLayout.tsx — Global layout wrapper
 *
 * Bọc toàn bộ app: Header (sticky top) + Footer (ẩn trên /quiz) + Mobile Bottom Nav
 * Quiz pages dùng thêm QuizLayout bên trong QuizPage
 */

import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { GlobalHeader } from "./GlobalHeader";
import { GlobalFooter } from "./GlobalFooter";
import { MobileBottomNav } from "./MobileBottomNav";
import "./AppLayout.css";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  // Quiz routes: an GlobalFooter va MobileBottomNav
  // - URL cu: /quiz/MATH-L1-P1
  // - URL moi: /toan-tu-duy/math-l1-p1
  // Nhan dien URL moi bang cach kiem tra segment thu 2 co dang slug khong
  const pathParts = location.pathname.split("/").filter(Boolean);
  const isQuizRoute =
    location.pathname.startsWith("/quiz") ||
    (pathParts.length === 2 &&
      !["login", "dashboard", "onboarding", "profile", "lessons", "about", "contact", "privacy"].includes(
        pathParts[0]
      ));

  return (
    <div className={`app-layout ${isQuizRoute ? "app-layout--quiz" : ""}`}>
      {/* Sticky top bar — luôn hiện */}
      <GlobalHeader />

      {/* Nội dung trang */}
      <main
        className="app-layout__main"
        id="main-content"
        role="main"
        aria-label="Nội dung chính"
      >
        {children}
      </main>

      {/* Footer — ẩn trên quiz routes */}
      {!isQuizRoute && <GlobalFooter />}

      {/* Mobile Bottom Nav — ẩn trên quiz routes */}
      {!isQuizRoute && <MobileBottomNav />}
    </div>
  );
}
