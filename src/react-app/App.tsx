/**
 * App.tsx — Root component với React Router + AppLayout
 *
 * Routes (Phase IA):
 *   /                          → HomePage (PUBLIC)
 *   /learn                     → PathwaySelectionPage (chọn Cambridge | Lớp 6)
 *   /login                     → LoginPage
 *   /register                  → RegisterPage
 *
 *   /cambridge                 → CambridgePage (danh sách cấp độ Cambridge)
 *   /cambridge/:subjectSlug    → SubjectPage  (VD: /cambridge/flyers)
 *   /cambridge/:subjectSlug/:quizId → QuizPage (VD: /cambridge/flyers/rw001)
 *
 *   /cambridge/vocabulary         → VocabularyPage (topic dashboard)
 *   /cambridge/vocabulary/:topic  → VocabularyLesson (lesson: LEARN→PRACTICE→USE)
 *
 *   /lop6                      → Lop6Page (4 nhóm môn)
 *   /lop6/:subjectSlug         → SubjectPage  (VD: /lop6/toan)
 *   /lop6/:subjectSlug/:quizId → QuizPage (VD: /lop6/toan/math-l1-p1)
 *
 *   /quiz/:id                  → QuizPage (legacy internal tool — giữ lại)
 *   /onboarding                → OnboardingPage (protected)
 *   /dashboard                 → DashboardPage (protected)
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { ProtectedRoute } from "./components/ui/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";

import { HomePage }              from "./pages/HomePage";
import { LoginPage }             from "./pages/LoginPage";
import { RegisterPage }          from "./pages/RegisterPage";
import { OnboardingPage }        from "./pages/OnboardingPage";
import { QuizPage }              from "./pages/QuizPage";
import { SubjectPage }           from "./pages/SubjectPage";
import { DashboardPage }         from "./pages/DashboardPage";
import { PathwaySelectionPage }  from "./pages/PathwaySelectionPage";
import { CambridgePage }         from "./pages/CambridgePage";
import { Lop6Page }              from "./pages/Lop6Page";
import { ProfileSettingsPage }   from "./pages/ProfileSettingsPage";
import { KienThucPage }          from "./pages/KienThucPage";
import { BlogDetailPage }        from "./pages/BlogDetailPage";
import { VocabularyPage }        from "./pages/VocabularyPage";
import { VocabularyLesson }      from "./components/vocabulary/VocabularyLesson";

/**
 * HomeRoute — Redirect User đã login → /dashboard
 * Guest vẫn thấy Landing Page tại /
 */
function HomeRoute() {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return <Navigate to="/dashboard" replace />;
  return <HomePage />;
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              {/* ── PUBLIC ── */}
              <Route path="/"         element={<HomeRoute />} />
              <Route path="/learn"    element={<PathwaySelectionPage />} />
              <Route path="/login"    element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/kien-thuc"        element={<KienThucPage />} />
              <Route path="/kien-thuc/:slug"  element={<BlogDetailPage />} />

              {/* ── CAMBRIDGE PATHWAY ── */}
              <Route path="/cambridge"                          element={<CambridgePage />} />
              {/* Vocabulary routes TRƯỜC :subjectSlug để tránh match nhầm */}
              <Route path="/cambridge/vocabulary"              element={<VocabularyPage />} />
              <Route path="/cambridge/vocabulary/:topic"       element={<VocabularyLesson />} />
              <Route path="/cambridge/:subjectSlug"            element={<SubjectPage />} />
              <Route path="/cambridge/:subjectSlug/:quizId"    element={<QuizPage />} />

              {/* ── LỤP 6 PATHWAY ── */}
              <Route path="/lop6"                              element={<Lop6Page />} />
              <Route path="/lop6/:subjectSlug"                 element={<SubjectPage />} />
              <Route path="/lop6/:subjectSlug/:quizId"         element={<QuizPage />} />

              {/* ── LEGACY (internal quiz tool) ── */}
              <Route path="/quiz/:id" element={<QuizPage />} />

              {/* ── PROTECTED ── */}
              <Route path="/onboarding" element={
                <ProtectedRoute><OnboardingPage /></ProtectedRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute><DashboardPage /></ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
