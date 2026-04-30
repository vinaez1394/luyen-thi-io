/**
 * DashboardPage.tsx — Trang Chủ Bé (sau khi đăng nhập)
 *
 * Layout:
 *   1. WelcomeHeader (avatar + tên + streak + sao)
 *   2. DreamBoxWidget (hộp quà ước mơ)
 *   3. TodayMissions (nhiệm vụ hôm nay — Phase 04, cá nhân hóa theo pathway/grade)
 *   4. SkillMap (kỹ năng theo level)
 *   5. RecommendedLessons (gợi ý classic)
 *
 * Data:
 *   - user: từ useAuth()
 *   - streak, stars, skills, goal, todayLessons: từ useDashboard()
 *
 * Phase 04 — Personalized Dashboard
 */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDashboard } from "../hooks/useDashboard";
import { WelcomeHeader } from "../components/dashboard/WelcomeHeader";
import { DreamBoxWidget } from "../components/dashboard/DreamBoxWidget";
import { SkillMap } from "../components/dashboard/SkillMap";
import { RecommendedLessons } from "../components/dashboard/RecommendedLessons";
import { TodayMissions } from "../components/dashboard/TodayMissions";
import "./DashboardPage.css";

// ============================================
// DashboardPage
// ============================================
export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading } = useDashboard();

  // ── Loading ──
  if (isLoading || !data) {
    return (
      <div className="db-loading" role="status" aria-label="Đang tải...">
        <div className="db-loading__spinner" />
        <p className="db-loading__text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Guard: ProtectedRoute đã xử lý — chỉ render null để tránh crash
  if (!user) return null;

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

      {/* ── 3. Nhiệm vụ hôm nay (Phase 04) ── */}
      <section className="db-section db-section--missions">
        <TodayMissions
          selectedPathway={data.selectedPathway}
          currentGrade={data.currentGrade}
          skills={data.skillLevels}
        />
      </section>

      {/* ── 4. Skill Map ── */}
      <section className="db-section db-section--skills">
        <SkillMap skills={data.skillLevels} />
      </section>

      {/* ── 5. Recommended Lessons ── */}
      <section className="db-section db-section--recs">
        <RecommendedLessons skills={data.skillLevels} />
      </section>

      {/* ── Shortcut: chọn lộ trình ── */}
      <div className="db-footer">
        <button
          className="btn btn-outline btn-sm"
          id="btn-db-go-learn"
          onClick={() => navigate("/learn")}
        >
          📚 Chọn lộ trình học
        </button>
      </div>

    </div>
  );
}
