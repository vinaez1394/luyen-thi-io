/**
 * RegisterPage.tsx — Trang đăng ký tài khoản mới
 * Thiết kế: nổi bật, khích lệ, nhấn mạnh miễn phí & nhanh chóng
 */

import { useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./RegisterPage.css";

// Map error code → thông báo tiếng Việt
const ERROR_MESSAGES: Record<string, string> = {
  cancelled: "Bạn đã hủy đăng ký. Thử lại nhé!",
  token_failed: "Google không xác nhận được tài khoản. Vui lòng thử lại.",
  invalid_client: "Cấu hình xác thực bị lỗi. Liên hệ hỗ trợ.",
  config_missing: "Hệ thống chưa cấu hình xong. Thử lại sau ít phút.",
  server_error: "Máy chủ gặp sự cố. Vui lòng thử lại.",
  db_failed: "Không thể tạo tài khoản. Vui lòng thử lại.",
};

export function RegisterPage() {
  const { isLoggedIn, isLoading, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authError = searchParams.get("auth_error");
  const errorMsg = authError ? (ERROR_MESSAGES[authError] ?? "Có lỗi xảy ra. Vui lòng thử lại!") : null;

  // Đã đăng nhập → redirect dashboard
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="register-loading">
        <div className="register-spinner" />
      </div>
    );
  }

  return (
    <div className="register-page">
      {/* Background decorations */}
      <div className="reg-blob reg-blob--1" />
      <div className="reg-blob reg-blob--2" />
      <div className="reg-blob reg-blob--3" />

      <div className="register-card animate-scaleIn">

        {/* ── Header ── */}
        <div className="reg-header">
          <div className="reg-badge">✨ Miễn phí mãi mãi</div>
          <h1 className="reg-title">Tạo tài khoản<br />cho bé yêu 🌟</h1>
          <p className="reg-subtitle">
            Học thông minh · Thi tự tin · Không cần thẻ tín dụng
          </p>
        </div>

        {/* ── Error Banner ── */}
        {errorMsg && (
          <div className="reg-error" role="alert">
            <span>⚠️</span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* ── Google Sign-up (Primary CTA) ── */}
        <div className="reg-google-section">
          <button
            id="btn-register-google"
            className="reg-google-btn"
            onClick={loginWithGoogle}
          >
            {/* Google Logo SVG */}
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            <span>Đăng ký nhanh với Google</span>
            <span className="reg-google-arrow">→</span>
          </button>
          <p className="reg-google-note">
            🔒 An toàn · Không lưu mật khẩu · 30 giây là xong
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="reg-divider">
          <span className="reg-divider__line" />
          <span className="reg-divider__text">Quyền lợi khi đăng ký</span>
          <span className="reg-divider__line" />
        </div>

        {/* ── Benefits grid ── */}
        <ul className="reg-benefits">
          <li className="reg-benefit">
            <span className="reg-benefit__icon">📊</span>
            <div>
              <strong>Theo dõi tiến độ</strong>
              <p>Xem bé tiến bộ từng tuần, từng tháng</p>
            </div>
          </li>
          <li className="reg-benefit">
            <span className="reg-benefit__icon">🏆</span>
            <div>
              <strong>Hệ thống sao & thành tích</strong>
              <p>Tạo động lực học tập qua phần thưởng</p>
            </div>
          </li>
          <li className="reg-benefit">
            <span className="reg-benefit__icon">🎯</span>
            <div>
              <strong>Đúng format Cambridge</strong>
              <p>Luyện đúng dạng đề thi thật, không lạc đề</p>
            </div>
          </li>
          <li className="reg-benefit">
            <span className="reg-benefit__icon">🎁</span>
            <div>
              <strong>Hộp Quà Ước Mơ</strong>
              <p>Phần thưởng bí ẩn khi đạt mục tiêu</p>
            </div>
          </li>
        </ul>

        {/* ── Footer links ── */}
        <div className="reg-footer">
          <p className="reg-footer__text">
            Đã có tài khoản?{" "}
            <Link to="/login" className="reg-footer__link">
              Đăng nhập ngay
            </Link>
          </p>
          <p className="reg-privacy">
            Khi đăng ký, bạn đồng ý với{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Chính sách Bảo mật
            </a>{" "}
            của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
}
