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
import { RegisterPage } from "./pages/RegisterPage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { QuizPage } from "./pages/QuizPage";
import { SubjectPage } from "./pages/SubjectPage";
import { DashboardPage } from "./pages/DashboardPage";


export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* AppLayout bọc toàn bộ app — GlobalHeader + Footer + MobileNav */}
        <AppLayout>
          <Routes>
            {/* ── PUBLIC ROUTES ── */}
            <Route path="/"          element={<HomePage />} />
            <Route path="/login"     element={<LoginPage />} />
            <Route path="/register"  element={<RegisterPage />} />

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
                  <DashboardPage />
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
