/**
 * App.tsx — Root component với React Router
 * Routes:
 *   /         → redirect về /login hoặc /dashboard
 *   /login    → LoginPage (public)
 *   /onboarding → OnboardingPage (protected)
 *   /dashboard  → DashboardPage (protected) — Phase 07
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { ProtectedRoute } from "./components/ui/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { OnboardingPage } from "./pages/OnboardingPage";

// Dashboard placeholder — sẽ được thay thế ở Phase 07
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
      <p style={{ color: "var(--color-text-muted)" }}>
        Dashboard sẽ được build ở Phase 07
      </p>
      <button
        className="btn btn-outline"
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

// Root redirect — đọc cookie không được từ JS, dùng /api/auth/me
function RootRedirect() {
  return <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<RootRedirect />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected */}
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
