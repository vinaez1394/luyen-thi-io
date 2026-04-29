/**
 * DashboardPage.tsx — Trang Chủ Bé (sau khi đăng nhập)
 *
 * Layout:
 *   1. WelcomeHeader (avatar + tên + streak + sao)
 *   2. DreamBoxWidget (hộp quà ước mơ)
 *   3. SkillMap (kỹ năng theo level)
 *   4. RecommendedLessons (gợi ý hôm nay)
 *
 * Data:
 *   - user: từ useAuth()
 *   - streak, stars, skills, goal: từ useDashboard() → /api/student/dashboard
 *
 * Phase 07
 */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDashboard } from "../hooks/useDashboard";
import { WelcomeHeader } from "../components/dashboard/WelcomeHeader";
import { DreamBoxWidget } from "../components/dashboard/DreamBoxWidget";
import { SkillMap } from "../components/dashboard/SkillMap";
import { RecommendedLessons } from "../components/dashboard/RecommendedLessons";
import "./DashboardPage.css";

// ============================================
// DashboardPage
// ============================================
export function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading } = useDashboard();
  const navigate = useNavigate();

  // ── Loading ──
  if (isLoading || !data) {
    return (
      <div className="db-loading" role="status" aria-label="Đang tải...">
        <div className="db-loading__spinner" />
        <p className="db-loading__text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  // ── Guard: user phải tồn tại (ProtectedRoute xử lý rồi nhưng guard thêm) ──
  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="dashboard-page">

      {/* ── 1. Welcome Header ── */}
      <section className="db-section db-section--welcome">
        <WelcomeHeader
          user={user}
          streak={data.streak}
          totalStars={data.totalStars}
        />
      </section>

      {/* ── 2. Dream Box ── */}
      <section className="db-section db-section--dreambox">
        <DreamBoxWidget goal={data.dreamGoal} />
      </section>

      {/* ── 3. Skill Map ── */}
      <section className="db-section db-section--skills">
        <SkillMap skills={data.skillLevels} />
      </section>

      {/* ── 4. Recommended Lessons ── */}
      <section className="db-section db-section--recs">
        <RecommendedLessons skills={data.skillLevels} />
      </section>

      {/* ── Shortcut: về trang chủ ── */}
      <div className="db-footer">
        <button
          className="btn btn-outline btn-sm"
          id="btn-db-go-home"
          onClick={() => navigate("/")}
        >
          📚 Xem tất cả bài học
        </button>
      </div>

    </div>
  );
}
