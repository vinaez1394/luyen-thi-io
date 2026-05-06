/**
 * GlobalHeader.tsx — App-wide sticky top navigation
 *
 * Bao gồm: Logo, Nav links (với dropdown "Môn học"), Stars, Theme,
 *          Avatar + dropdown, Hamburger + Drawer (mobile)
 *
 * ĐỂ THÊM/SỬA MENU: chỉnh sửa NAV_LINKS bên dưới
 * ĐỂ THÊM MÔN HỌC VÀO DROPDOWN: chỉnh sửa src/react-app/data/subjects.ts
 */

import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTheme, THEMES } from "../ui/ThemeProvider";
import type { ThemeId } from "../ui/ThemeProvider";
import { SUBJECTS } from "../../data/subjects";
import { getSubjectUrl } from "../../utils/urlHelpers";
import "./GlobalHeader.css";


// ─── Component ───────────────────────────────────────────────────────────────
export function GlobalHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn, isLoading, logout } = useAuth();
  const { theme, themeInfo, setTheme } = useTheme();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [subjectOpen, setSubjectOpen] = useState(false);

  const themeRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const subjectRef = useRef<HTMLDivElement>(null);
  const subjectCloseTimer = useRef<number | null>(null);

  const openSubjectMenu = useCallback(() => {
    if (subjectCloseTimer.current) clearTimeout(subjectCloseTimer.current);
    setSubjectOpen(true);
  }, []);

  const closeSubjectMenu = useCallback(() => {
    subjectCloseTimer.current = window.setTimeout(() => setSubjectOpen(false), 120);
  }, []);

  // Đóng tất cả dropdowns khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (themeRef.current && !themeRef.current.contains(e.target as Node)) setThemeOpen(false);
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) setAvatarOpen(false);
      if (subjectRef.current && !subjectRef.current.contains(e.target as Node)) setSubjectOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Đóng drawer & dropdowns khi route thay đổi
  useEffect(() => {
    setDrawerOpen(false);
    setSubjectOpen(false);
  }, [location.pathname]);

  const displayName = user?.profile?.display_name ?? user?.name ?? "Bé";

  // Load stars + streak + currentGrade từ API (chỉ khi đăng nhập)
  // GlobalHeader luôn mount → đây là nơi DUY NHẤT write localStorage("student_grade") cho mọi trang
  const [totalStars, setTotalStars] = useState(0);
  const [streak, setStreak] = useState(0);

  // Grade badge — set trực tiếp từ API response, không qua localStorage lazy read
  const [gradeBadge, setGradeBadge] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      setTotalStars(0);
      setStreak(0);
      setGradeBadge(null);
      return;
    }

    let cancelled = false;

    const fetchDashboard = () =>
      fetch("/api/student/dashboard", { credentials: "include" })
        .then((r) => r.ok ? r.json() : null)
        .then((d: { totalStars?: number; streak?: number; currentGrade?: number } | null) => {
          if (cancelled) return;
          if (d?.totalStars  != null) setTotalStars(d.totalStars);
          if (d?.streak      != null) setStreak(d.streak);

          // ── Sync currentGrade vào localStorage + state ──
          if (d?.currentGrade != null && d.currentGrade >= 3 && d.currentGrade <= 6) {
            const gradeStr = String(d.currentGrade);
            try { localStorage.setItem("student_grade", gradeStr); } catch { /* ignore */ }
            setGradeBadge(`Lớp ${d.currentGrade}`);
            // Thông báo cho SubjectPage và các component khác cập nhật lại grade
            window.dispatchEvent(new Event("grade:updated"));
          } else {
            // API không trả currentGrade → fallback sang localStorage (onboarding chưa xong)
            try {
              const raw = localStorage.getItem("student_grade");
              const g = raw ? parseInt(raw, 10) : null;
              setGradeBadge(g && g >= 3 && g <= 6 ? `Lớp ${g}` : null);
            } catch { setGradeBadge(null); }
          }
        })
        .catch(() => {});

    fetchDashboard();

    // Refresh khi kiếm được sao
    window.addEventListener("stars:updated", fetchDashboard);
    return () => {
      cancelled = true;
      window.removeEventListener("stars:updated", fetchDashboard);
    };
  }, [isLoggedIn]);


  // Chỉ hiển thị môn đang có bài (available: true) — môn chưa có tự động ẩn
  const cambridgeSubjects = SUBJECTS.filter((s) => s.pathway === "cambridge" && s.available);
  const lop6Subjects = SUBJECTS.filter((s) => s.pathway === "lop6" && s.available);


  return (
    <>
      <header className="global-header" role="banner">
        <div className="global-header__inner">

          {/* ── Hamburger (Mobile) — LEFT of logo ── */}
          <button
            className="global-header__hamburger"
            id="btn-header-hamburger"
            onClick={() => setDrawerOpen(true)}
            aria-label="Mở menu"
            aria-expanded={drawerOpen}
          >
            <div className="hamburger__line" />
            <div className="hamburger__line" />
            <div className="hamburger__line" />
          </button>

          {/* ── Logo ── */}
          <button
            className="global-header__logo"
            id="btn-header-logo"
            onClick={() => navigate("/")}
            aria-label="Về trang chủ"
          >
            <span className="global-header__logo-icon">🎓</span>
            <span className="global-header__logo-text">Luyện Thi</span>
          </button>

          {/* ── Desktop Nav ── */}
          <nav className="global-header__nav" aria-label="Navigation chính">

            {/* Trang chủ */}
            <button
              className={`global-header__nav-link ${location.pathname === "/" ? "active" : ""}`}
              id="btn-nav-home"
              onClick={() => navigate("/")}
            >
              <span>🏠</span> Trang chủ
            </button>

            {/* Môn học — với dropdown hover */}
            <div
              ref={subjectRef}
              className="global-header__nav-dropdown-wrapper"
              onMouseEnter={openSubjectMenu}
              onMouseLeave={closeSubjectMenu}
            >
              <button
                className={`global-header__nav-link global-header__nav-link--dropdown ${subjectOpen ? "active" : ""
                  }`}
                id="btn-nav-mon-hoc"
                onClick={() => navigate("/")}
                aria-haspopup="true"
                aria-expanded={subjectOpen}
              >
                <span>📚</span> Môn học
                <span className={`nav-dropdown-chevron ${subjectOpen ? "open" : ""}`}>▾</span>
              </button>

              {/* Dropdown panel — phân nhóm theo pathway */}
              {subjectOpen && (
                <div
                  className="nav-subject-dropdown"
                  role="menu"
                  onMouseEnter={openSubjectMenu}
                  onMouseLeave={closeSubjectMenu}
                >
                  <div className="nav-subject-dropdown__inner-card">

                    {/* Lớp 6 group — LUÔN XẾP TRƯỚC */}
                    <div className="nav-subject-dropdown__group">
                      <span className="nav-subject-dropdown__group-label">
                        🏫 Luyện Thi Lớp 6
                      </span>
                      {lop6Subjects.map((s) => (
                        <button
                          key={s.id}
                          className={`nav-subject-dropdown__item ${!s.available ? "nav-subject-dropdown__item--soon" : ""
                            }`}
                          role="menuitem"
                          id={`btn-nav-subject-${s.id}`}
                          onClick={() => { if (s.available) { navigate(getSubjectUrl(s)); setSubjectOpen(false); } }}
                          style={{ "--subject-color": s.color } as React.CSSProperties}
                        >
                          <span className="nav-subject-dropdown__emoji">{s.emoji}</span>
                          <div className="nav-subject-dropdown__info">
                            <span className="nav-subject-dropdown__name">{s.label}</span>
                            <span className="nav-subject-dropdown__desc">{s.desc}</span>
                          </div>
                          {!s.available && (
                            <span className="nav-subject-dropdown__soon-badge">Sắp có</span>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="nav-subject-dropdown__divider" />

                    {/* Cambridge group */}
                    <div className="nav-subject-dropdown__group">
                      <span className="nav-subject-dropdown__group-label">
                        🇬🇧 Cambridge
                      </span>
                      {cambridgeSubjects.map((s) => (
                        <button
                          key={s.id}
                          className={`nav-subject-dropdown__item ${!s.available ? "nav-subject-dropdown__item--soon" : ""
                            }`}
                          role="menuitem"
                          id={`btn-nav-subject-${s.id}`}
                          onClick={() => { if (s.available) { navigate(getSubjectUrl(s)); setSubjectOpen(false); } }}
                          style={{ "--subject-color": s.color } as React.CSSProperties}
                        >
                          <span className="nav-subject-dropdown__emoji">{s.emoji}</span>
                          <div className="nav-subject-dropdown__info">
                            <span className="nav-subject-dropdown__name">{s.label}</span>
                            <span className="nav-subject-dropdown__desc">{s.desc}</span>
                          </div>
                          {!s.available && (
                            <span className="nav-subject-dropdown__soon-badge">Sắp có</span>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="nav-subject-dropdown__divider" />
                    <button
                      className="nav-subject-dropdown__see-all"
                      onClick={() => { navigate("/learn"); setSubjectOpen(false); }}
                    >
                      Xem tất cả lộ trình →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Kiến Thức Blog */}
            <button
              className={`global-header__nav-link ${location.pathname.startsWith("/kien-thuc") ? "active" : ""}`}
              id="btn-nav-kienthuc"
              onClick={() => navigate("/kien-thuc")}
            >
              <span>📖</span> Kiến Thức
            </button>

            {/* Tiến độ */}
            <button
              className={`global-header__nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
              id="btn-nav-dashboard"
              onClick={() => navigate("/dashboard")}
            >
              <span>📊</span> Tiến độ
            </button>

          </nav>

          {/* ── Spacer ── */}
          <div className="global-header__spacer" />

          {/* ── Stars (desktop, logged in) ── */}
          {isLoggedIn && (
            <div className="global-header__stars" title="Tổng ngôi sao của bé">
              <span className="global-header__stars-icon">⭐</span>
              <span>{totalStars}</span>
            </div>
          )}

          {/* ── Theme Switcher ── */}
          <div ref={themeRef} style={{ position: "relative" }}>
            <button
              className="global-header__theme-btn"
              id="btn-header-theme"
              onClick={() => { setThemeOpen((o) => !o); setAvatarOpen(false); }}
              title="Đổi giao diện màu"
              aria-label="Đổi giao diện"
            >
              {themeInfo.emoji}
            </button>
            {themeOpen && (
              <div className="theme-dropdown" role="menu">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    className={`theme-option ${theme === t.id ? "selected" : ""}`}
                    role="menuitem"
                    onClick={() => { setTheme(t.id as ThemeId); setThemeOpen(false); }}
                    title={t.label}
                  >
                    <div className="theme-option__swatch" style={{ background: t.primary }} />
                    <span className="theme-option__label">{t.emoji}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Grade badge (desktop standalone icon) ── */}
          {isLoggedIn && gradeBadge && (
            <div
              className="gh-grade-icon"
              title={`Lớp học của bé: ${gradeBadge}`}
              onClick={() => navigate("/profile")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter") navigate("/profile"); }}
            >
              <span className="gh-grade-icon__emoji">🏫</span>
              <span className="gh-grade-icon__label">{gradeBadge}</span>
            </div>
          )}

          {/* ── Auth Area ── */}
          {!isLoading && (
            <div className="global-header__auth">
              {isLoggedIn ? (
                <div ref={avatarRef} style={{ position: "relative" }}>
                  <button
                    className="global-header__avatar-btn"
                    id="btn-header-avatar"
                    onClick={() => { setAvatarOpen((o) => !o); setThemeOpen(false); }}
                    aria-label="Menu tài khoản"
                    aria-expanded={avatarOpen}
                  >
                    <div className="global-header__avatar-emoji">
                      {displayName[0]?.toUpperCase() ?? "B"}
                    </div>
                    <span className="global-header__avatar-name">{displayName}</span>
                  </button>

                  {avatarOpen && (
                    <div className="avatar-dropdown" role="menu">
                      <button
                        className="avatar-dropdown__item"
                        role="menuitem"
                        id="btn-avatar-profile"
                        onClick={() => { navigate("/dashboard"); setAvatarOpen(false); }}
                      >
                        <span>🏠</span> Trang của bé
                      </button>
                      <button
                        className="avatar-dropdown__item"
                        role="menuitem"
                        id="btn-avatar-settings"
                        onClick={() => { navigate("/profile"); setAvatarOpen(false); }}
                      >
                        <span>⚙️</span> Cài đặt
                      </button>
                      <div className="avatar-dropdown__divider" />
                      <button
                        className="avatar-dropdown__item avatar-dropdown__item--danger"
                        role="menuitem"
                        id="btn-avatar-logout"
                        onClick={() => { logout(); setAvatarOpen(false); }}
                      >
                        <span>🚪</span> Đăng xuất
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  className="btn btn-primary btn-sm"
                  id="btn-header-register"
                  to="/register"
                >
                  Đăng ký
                </Link>
              )}
            </div>
          )}


        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {drawerOpen && (
        <>
          <div
            className="mobile-drawer-overlay"
            onClick={() => setDrawerOpen(false)}
            role="presentation"
          />
          <nav className="mobile-drawer" aria-label="Menu di động">
            {/* Header drawer: Logo + nút đóng (X) */}
            <div className="mobile-drawer__header">
              <div className="mobile-drawer__logo">
                <span style={{ fontSize: 24 }}>🎓</span>
                <span style={{ fontWeight: 900, color: "var(--color-primary)", fontSize: "var(--font-lg)" }}>
                  Luyện Thi
                </span>
              </div>
              <button
                className="mobile-drawer__close-btn"
                id="btn-drawer-close"
                onClick={() => setDrawerOpen(false)}
                aria-label="Đóng menu"
              >
                ✕
              </button>
            </div>


            {/* ── User stats: 3 pills thả ngay dưới header, không có khung ── */}
            {isLoggedIn && (
              <div className="mobile-drawer__stats-row">
                {gradeBadge && (
                  <span className="mobile-drawer__user-stat mobile-drawer__user-stat--grade">
                    🏫 {gradeBadge}
                  </span>
                )}
                <span className="mobile-drawer__user-stat mobile-drawer__user-stat--stars">
                  ⭐ {totalStars}
                </span>
                {streak > 0 && (
                  <span className="mobile-drawer__user-stat mobile-drawer__user-stat--streak">
                    🔥 {streak} ngày
                  </span>
                )}
              </div>
            )}

            {/* Lộ trình — Lớp 6 LUÔN XẾP TRƯỚC trong drawer */}
            <div className="mobile-drawer__subject-group">
              <div className="mobile-drawer__subject-label">🏫 Luyện Thi Lớp 6</div>
              {lop6Subjects.map((s) => (
                <button
                  key={s.id}
                  className={`mobile-drawer__nav-link mobile-drawer__nav-link--subject ${!s.available ? "mobile-drawer__nav-link--soon" : ""}`}
                  onClick={() => { if (s.available) { navigate(getSubjectUrl(s)); setDrawerOpen(false); } }}
                  style={{ "--subject-color": s.color } as React.CSSProperties}
                >
                  <span className="mobile-drawer__nav-icon">{s.emoji}</span>
                  {s.label}
                  {!s.available && <span className="mobile-drawer__soon-badge">Sắp có</span>}
                </button>
              ))}
            </div>

            <div className="mobile-drawer__subject-group" style={{ marginTop: "4px" }}>
              <div className="mobile-drawer__subject-label">🇬🇧 Cambridge</div>
              {cambridgeSubjects.map((s) => (
                <button
                  key={s.id}
                  className={`mobile-drawer__nav-link mobile-drawer__nav-link--subject ${!s.available ? "mobile-drawer__nav-link--soon" : ""}`}
                  onClick={() => { if (s.available) { navigate(getSubjectUrl(s)); setDrawerOpen(false); } }}
                  style={{ "--subject-color": s.color } as React.CSSProperties}
                >
                  <span className="mobile-drawer__nav-icon">{s.emoji}</span>
                  {s.label}
                  {!s.available && <span className="mobile-drawer__soon-badge">Sắp có</span>}
                </button>
              ))}
            </div>

            {/* Tiến độ */}
            <button
              className={`mobile-drawer__nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
              onClick={() => { navigate("/dashboard"); setDrawerOpen(false); }}
            >
              <span className="mobile-drawer__nav-icon">📊</span> Tiến độ
            </button>

            {/* ——— Theme Switcher ——— */}
            <div className="mobile-drawer__divider" />
            <div className="mobile-drawer__theme-section">
              <div className="mobile-drawer__theme-label">
                🎨 Đổi giao diện màu
              </div>
              <div className="mobile-drawer__theme-grid">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    className={`mobile-drawer__theme-btn${theme === t.id ? " selected" : ""}`}
                    onClick={() => setTheme(t.id as ThemeId)}
                    title={t.label}
                    aria-label={t.label}
                  >
                    <div
                      className="mobile-drawer__theme-swatch"
                      style={{ background: t.primary }}
                    />
                    <span className="mobile-drawer__theme-emoji">{t.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ height: 1, background: "var(--color-border)", margin: "8px 0" }} />

            {isLoggedIn ? (
              <button
                className="mobile-drawer__nav-link"
                id="btn-drawer-logout"
                style={{ color: "var(--color-danger)" }}
                onClick={() => { logout(); setDrawerOpen(false); }}
              >
                <span className="mobile-drawer__nav-icon">🚪</span> Đăng xuất
              </button>
            ) : (
              <Link
                className="btn btn-primary"
                id="btn-drawer-register"
                style={{ marginTop: "auto" }}
                to="/register"
                onClick={() => setDrawerOpen(false)}
              >
                Đăng ký / Đăng nhập
              </Link>
            )}
          </nav>
        </>
      )}
    </>
  );
}
