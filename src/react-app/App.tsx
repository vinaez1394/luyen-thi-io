/**
 * App.tsx — Root component với React Router + AppLayout
 *
 * Routes:
 *   /                    -> HomePage (PUBLIC)
 *   /login               -> LoginPage (public)
 *   /:subject            -> SubjectPage (danh sách bài của môn)
 *   /:subject/:quizId    -> QuizPage (bài học cụ thể)
 *   /quiz/:id            -> QuizPage (URL cũ — backward-compat)
 *   /onboarding          -> OnboardingPage (protected)
 *   /dashboard           -> DashboardPage (protected) — Phase 07
 *
 * ĐỂ THÊM ROUTE MỚI: thêm <Route> vào Routes bên dưới
 * Thứ tự routes quan trọng: cụ thể trước, wildcard sau
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { ProtectedRoute } from "./components/ui/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { QuizPage } from "./pages/QuizPage";
import { SubjectPage } from "./pages/SubjectPage";

// Dashboard placeholder — sẽ thay thế ở Phase 07
function DashboardPlaceholder() {
  return (
    <div
      style={{
        minHeight: "60dvh",
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
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* AppLayout bọc toàn bộ app — GlobalHeader + Footer + MobileNav */}
        <AppLayout>
          <Routes>
            {/* ── PUBLIC ROUTES ── */}
            <Route path="/"        element={<HomePage />} />
            <Route path="/login"   element={<LoginPage />} />

            {/* ── Backward-compat URL cũ ── */}
            <Route path="/quiz/:id" element={<QuizPage />} />

            {/* ── PROTECTED ROUTES ── */}
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

            {/* ── SUBJECT ROUTES (PHẢI ĐẶT CUỐI — wildcard) ── */}
            {/* /toan-tu-duy         -> trang danh sách bài Toán Tư Duy */}
            {/* /toan-tu-duy/math-l1-p1 -> bài cụ thể */}
            <Route path="/:subject"          element={<SubjectPage />} />
            <Route path="/:subject/:quizId"  element={<QuizPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
