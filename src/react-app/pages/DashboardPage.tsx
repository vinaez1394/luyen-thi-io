/**
 * DashboardPage.tsx — Trang Chủ Bé (sau khi đăng nhập)
 *
 * Layout (Phase Dashboard):
 *   1. WelcomeHeader (giữ nguyên)
 *   2. PathwayTabs: "Luyện Thi Lớp 6" | "Cambridge" (MỚI)
 *      Tab Lớp 6:
 *        - DreamBoxWidget + TodayMissions
 *        - SubjectProgressCard grid (toan, tieng-anh, tieng-viet, khoa-hoc)
 *        - LowScoreAlert (nếu có)
 *        - RecentAttemptsList
 *      Tab Cambridge:
 *        - Disabled nếu bé chưa enroll (greyed + tooltip)
 *        - SubjectProgressCard grid (reading, listening, writing, speaking, vocabulary)
 *        - RecentAttemptsList
 *   3. Footer shortcut (giữ nguyên)
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDashboard } from "../hooks/useDashboard";
import { WelcomeHeader } from "../components/dashboard/WelcomeHeader";
import { DreamBoxWidget } from "../components/dashboard/DreamBoxWidget";
import { TodayMissions } from "../components/dashboard/TodayMissions";
import { SubjectProgressCard } from "../components/dashboard/SubjectProgressCard";
import { RecentAttemptsList } from "../components/dashboard/RecentAttemptsList";
import "./DashboardPage.css";

// ============================================
// Helpers
// ============================================

/** Bé có enroll Cambridge không? Nếu selectedPathway = 'cambridge' → yes */
function hasCambridgeAccess(selectedPathway: string | null): boolean {
  return selectedPathway === "cambridge";
}

// ============================================
// DashboardPage
// ============================================
export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data, isLoading } = useDashboard();

  // Tab state: "lop6" mặc định (luôn ưu tiên)
  const [activeTab, setActiveTab] = useState<"lop6" | "cambridge">("lop6");

  // ── Loading ──
  if (isLoading || !data) {
    return (
      <div className="db-loading" role="status" aria-label="Đang tải...">
        <div className="db-loading__spinner" />
        <p className="db-loading__text">Đang tải dữ liệu...</p>
      </div>
    );
  }

  if (!user) return null;

  const ps             = data.progressSummary;
  const cambridgeOK    = hasCambridgeAccess(data.selectedPathway);
  const lowScoreAlert  = ps?.lowScoreAlert ?? null;
  const recentAttempts = ps?.recentAttempts ?? [];

  return (
    <div className="dashboard-page">

      {/* ── 1. Welcome Header (giữ nguyên) ── */}
      <section className="db-section db-section--welcome">
        <WelcomeHeader
          user={user}
          streak={data.streak}
          totalStars={data.totalStars}
          currentGrade={data.currentGrade}
        />
      </section>

      {/* ── 2. Pathway Tabs ── */}
      <div className="db-tabs" role="tablist" aria-label="Chọn lộ trình">
        {/* Tab Lớp 6 — LUÔN ĐẦU TIÊN */}
        <button
          role="tab"
          id="tab-lop6"
          aria-selected={activeTab === "lop6"}
          aria-controls="tabpanel-lop6"
          className={`db-tab ${activeTab === "lop6" ? "db-tab--active" : ""}`}
          onClick={() => setActiveTab("lop6")}
        >
          🏫 Luyện Thi Lớp 6
        </button>

        {/* Tab Cambridge — disable nếu bé chưa enroll */}
        <button
          role="tab"
          id="tab-cambridge"
          aria-selected={activeTab === "cambridge"}
          aria-controls="tabpanel-cambridge"
          aria-disabled={!cambridgeOK}
          className={`db-tab ${activeTab === "cambridge" ? "db-tab--active" : ""} ${!cambridgeOK ? "db-tab--disabled" : ""}`}
          onClick={() => { if (cambridgeOK) setActiveTab("cambridge"); }}
          title={!cambridgeOK ? "Bé chưa đăng ký lộ trình Cambridge" : undefined}
        >
          🇬🇧 Cambridge
          {!cambridgeOK && <span className="db-tab__lock">🔒</span>}
        </button>
      </div>

      {/* ── Tab Lớp 6 ── */}
      <div
        id="tabpanel-lop6"
        role="tabpanel"
        aria-labelledby="tab-lop6"
        hidden={activeTab !== "lop6"}
      >
        {/* DreamBox + TodayMissions */}
        <section className="db-section db-section--dreambox">
          <DreamBoxWidget goal={data.dreamGoal} />
        </section>
        <section className="db-section db-section--missions">
          <TodayMissions
            selectedPathway={data.selectedPathway}
            currentGrade={data.currentGrade}
            skills={data.skillLevels}
          />
        </section>

        {/* Subject Progress Grid */}
        {ps ? (
          <section className="db-section db-section--progress">
            <h2 className="db-section__title">
              📊 Tiến độ các môn
              {data.currentGrade && (
                <span className="db-section__grade-tag">🏫 Lớp {data.currentGrade}</span>
              )}
            </h2>

            {/* Grade missing warning */}
            {ps.gradeMissing && (
              <div className="db-grade-alert" role="alert">
                ⚠️ Hãy cập nhật lớp cho bé để tính tiến độ chính xác hơn →{" "}
                <button
                  className="db-grade-alert__link"
                  onClick={() => navigate("/onboarding")}
                >
                  Cập nhật ngay
                </button>
              </div>
            )}

            <div className="db-subject-grid">
              {Object.entries(ps.lop6).map(([subject, subjectData]) => (
                <SubjectProgressCard
                  key={subject}
                  subject={subject}
                  data={subjectData}
                  pathway="lop6"
                  onNavigate={(path) => navigate(path)}
                />
              ))}
            </div>

            {/* Low Score Alert */}
            {lowScoreAlert && lowScoreAlert.pathway === "lop6" && (
              <div className="db-low-alert" role="alert">
                <span className="db-low-alert__icon">🔔</span>
                <div className="db-low-alert__body">
                  <p className="db-low-alert__text">
                    Bé có 1 bài điểm thấp ({lowScoreAlert.bestPct}%) — nên ôn lại nhé!
                  </p>
                  <button
                    id={`btn-redo-${lowScoreAlert.quizId}`}
                    className="db-low-alert__btn"
                    onClick={() => navigate(`/${lowScoreAlert.pathway}/${lowScoreAlert.subject}/${lowScoreAlert.quizId.toLowerCase()}`)}
                  >
                    Làm lại bài → {lowScoreAlert.quizId}
                  </button>
                </div>
              </div>
            )}
          </section>
        ) : (
          /* API chưa sẵn sàng — hiển thị skeleton */
          <section className="db-section db-section--progress">
            <h2 className="db-section__title">📊 Tiến độ các môn</h2>
            <div className="db-skeleton-grid">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="db-skeleton-card" aria-hidden="true" />
              ))}
            </div>
          </section>
        )}

        {/* Recent Attempts */}
        <section className="db-section db-section--recent">
          <h2 className="db-section__title">🕐 Bài gần đây</h2>
          <RecentAttemptsList
            attempts={recentAttempts}
            activePathway="lop6"
          />
        </section>
      </div>

      {/* ── Tab Cambridge ── */}
      <div
        id="tabpanel-cambridge"
        role="tabpanel"
        aria-labelledby="tab-cambridge"
        hidden={activeTab !== "cambridge"}
      >
        {!cambridgeOK ? (
          <div className="db-cambridge-locked">
            <span className="db-cambridge-locked__icon">🔒</span>
            <h3 className="db-cambridge-locked__title">Chưa đăng ký Cambridge</h3>
            <p className="db-cambridge-locked__desc">
              Lộ trình Cambridge dành cho bé muốn thi chứng chỉ quốc tế.<br />
              Liên hệ để kích hoạt lộ trình này.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/learn")}
            >
              Khám phá lộ trình Cambridge
            </button>
          </div>
        ) : (
          <>
            {/* Subject Progress Grid — Cambridge */}
            {ps ? (
              <section className="db-section db-section--progress">
                <h2 className="db-section__title">📊 Tiến độ các kỹ năng</h2>
                <div className="db-subject-grid">
                  {Object.entries(ps.cambridge).map(([subject, subjectData]) => (
                    <SubjectProgressCard
                      key={subject}
                      subject={subject}
                      data={subjectData}
                      pathway="cambridge"
                      onNavigate={(path) => navigate(path)}
                    />
                  ))}
                </div>

                {/* Low Score Alert Cambridge */}
                {lowScoreAlert && lowScoreAlert.pathway === "cambridge" && (
                  <div className="db-low-alert" role="alert">
                    <span className="db-low-alert__icon">🔔</span>
                    <div className="db-low-alert__body">
                      <p className="db-low-alert__text">
                        Bé có 1 bài điểm thấp ({lowScoreAlert.bestPct}%) — nên ôn lại nhé!
                      </p>
                      <button
                        id={`btn-redo-${lowScoreAlert.quizId}`}
                        className="db-low-alert__btn"
                        onClick={() => navigate(`/cambridge/${lowScoreAlert.subject}/${lowScoreAlert.quizId.toLowerCase()}`)}
                      >
                        Làm lại bài → {lowScoreAlert.quizId}
                      </button>
                    </div>
                  </div>
                )}
              </section>
            ) : (
              <section className="db-section db-section--progress">
                <h2 className="db-section__title">📊 Tiến độ các kỹ năng</h2>
                <div className="db-skeleton-grid">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="db-skeleton-card" aria-hidden="true" />
                  ))}
                </div>
              </section>
            )}

            {/* Recent Attempts — Cambridge */}
            <section className="db-section db-section--recent">
              <h2 className="db-section__title">🕐 Bài gần đây</h2>
              <RecentAttemptsList
                attempts={recentAttempts}
                activePathway="cambridge"
              />
            </section>
          </>
        )}
      </div>

      {/* ── Footer ── */}
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
