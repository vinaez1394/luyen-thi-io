/**
 * App.tsx — Root component với React Router
 *
 * Routes:
 *   /           → HomePage (PUBLIC — không cần login)
 *   /login      → LoginPage (public)
 *   /onboarding → OnboardingPage (protected)
 *   /dashboard  → DashboardPage (protected) — Phase 07
 *   /quiz/:id   → QuizPage (free bài: public; premium: protected)
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { ProtectedRoute } from "./components/ui/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { OnboardingPage } from "./pages/OnboardingPage";

// Dashboard placeholder — sẽ thay thế ở Phase 07
function DashboardPlaceholder() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-3)",
        padding: "var(--space-4)",
      }}
    >
      <div style={{ fontSize: "64px" }}>🎉</div>
      <h1 style={{ fontSize: "var(--font-2xl)", color: "var(--color-primary)", fontWeight: "900" }}>
        Đăng nhập thành công!
      </h1>
      <p style={{ color: "var(--color-text-muted)" }}>Dashboard sẽ được build ở Phase 07</p>
      <button
        className="btn btn-outline"
        id="btn-dashboard-logout"
        onClick={() => {
          fetch("/api/auth/logout", { method: "POST" }).then(() => {
            window.location.href = "/";
          });
        }}
      >
        Đăng xuất
      </button>
    </div>
  );
}

// Quiz placeholder — sẽ thay thế ở Phase 04
function QuizPlaceholder() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-3)",
        padding: "var(--space-4)",
      }}
    >
      <div style={{ fontSize: "64px" }}>📝</div>
      <h1 style={{ fontSize: "var(--font-xl)", color: "var(--color-primary)", fontWeight: "900" }}>
        Quiz Engine đang được xây dựng...
      </h1>
      <p style={{ color: "var(--color-text-muted)" }}>Phase 04 sẽ hoàn thiện tính năng này!</p>
      <a href="/" className="btn btn-outline">← Về trang chủ</a>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* ===== PUBLIC ROUTES (không cần login) ===== */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/quiz/:id" element={<QuizPlaceholder />} />

          {/* ===== PROTECTED ROUTES (cần login) ===== */}
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <OnboardingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPlaceholder />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
