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
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, isLoggedIn, isLoading, logout } = useAuth();
  const { theme, themeInfo, setTheme } = useTheme();

  const [drawerOpen,    setDrawerOpen]    = useState(false);
  const [themeOpen,     setThemeOpen]     = useState(false);
  const [avatarOpen,    setAvatarOpen]    = useState(false);
  const [subjectOpen,   setSubjectOpen]   = useState(false);

  const themeRef        = useRef<HTMLDivElement>(null);
  const avatarRef       = useRef<HTMLDivElement>(null);
  const subjectRef      = useRef<HTMLDivElement>(null);
  const subjectCloseTimer = useRef<number | null>(null);

  const openSubjectMenu  = useCallback(() => {
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
  const totalStars  = 0; // Phase 07 sẽ load từ student_stats

  // Phân nhóm subjects theo pathway cho dropdown
  const cambridgeSubjects = SUBJECTS.filter((s) => s.pathway === "cambridge");
  const lop6Subjects      = SUBJECTS.filter((s) => s.pathway === "lop6");

  return (
    <>
      <header className="global-header" role="banner">
        <div className="global-header__inner">

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
                className={`global-header__nav-link global-header__nav-link--dropdown ${
                  subjectOpen ? "active" : ""
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

                    {/* Cambridge group */}
                    <div className="nav-subject-dropdown__group">
                      <span className="nav-subject-dropdown__group-label">
                        🇬🇧 Cambridge
                      </span>
                      {cambridgeSubjects.map((s) => (
                        <button
                          key={s.id}
                          className={`nav-subject-dropdown__item ${
                            !s.available ? "nav-subject-dropdown__item--soon" : ""
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

                    {/* Lớp 6 group */}
                    <div className="nav-subject-dropdown__group">
                      <span className="nav-subject-dropdown__group-label">
                        🏫 Thi Lớp 6
                      </span>
                      {lop6Subjects.map((s) => (
                        <button
                          key={s.id}
                          className={`nav-subject-dropdown__item ${
                            !s.available ? "nav-subject-dropdown__item--soon" : ""
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

          {/* ── Hamburger (Mobile) ── */}
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
            <div className="mobile-drawer__logo">
              <span style={{ fontSize: 24 }}>🎓</span>
              <span style={{ fontWeight: 900, color: "var(--color-primary)", fontSize: "var(--font-lg)" }}>
                Luyện Thi
              </span>
            </div>

            {/* Trang chủ */}
            <button
              className={`mobile-drawer__nav-link ${location.pathname === "/" ? "active" : ""}`}
              onClick={() => navigate("/")}
            >
              <span className="mobile-drawer__nav-icon">🏠</span> Trang chủ
            </button>

            {/* Lộ trình — expand trong drawer theo nhóm */}
            <div className="mobile-drawer__subject-group">
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

            <div className="mobile-drawer__subject-group" style={{ marginTop: "4px" }}>
              <div className="mobile-drawer__subject-label">🏫 Thi Lớp 6</div>
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

            {/* Tiến độ */}
            <button
              className={`mobile-drawer__nav-link ${location.pathname === "/dashboard" ? "active" : ""}`}
              onClick={() => { navigate("/dashboard"); setDrawerOpen(false); }}
            >
              <span className="mobile-drawer__nav-icon">📊</span> Tiến độ
            </button>

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
