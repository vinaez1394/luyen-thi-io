/**
 * LoginPage.tsx — Trang đăng nhập cho phụ huynh
 * Thiết kế: thân thiện, rõ ràng, không gây lo lắng
 */

import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./LoginPage.css";

export function LoginPage() {
  const { isLoggedIn, isLoading, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authError = searchParams.get("auth_error");

  // Nếu đã đăng nhập rồi → redirect
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate("/dashboard", { replace: true });
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="login-loading">
        <div className="login-spinner" />
      </div>
    );
  }

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="login-bg-blob login-bg-blob--1" />
      <div className="login-bg-blob login-bg-blob--2" />

      <div className="login-card animate-scaleIn">
        {/* Logo / Hero */}
        <div className="login-hero">
          <div className="login-hero__emoji">🎓</div>
          <h1 className="login-hero__title">luyen-thi.io</h1>
          <p className="login-hero__subtitle">
            Luyện thi Cambridge Flyers<br />
            cho bé yêu của bạn 🌟
          </p>
        </div>

        {/* Error message */}
        {authError && (
          <div className="login-error" role="alert">
            <span>⚠️</span>
            <span>
              {authError === "cancelled"
                ? "Đăng nhập bị hủy. Vui lòng thử lại!"
                : "Có lỗi xảy ra. Vui lòng thử lại!"}
            </span>
          </div>
        )}

        {/* Benefits */}
        <ul className="login-benefits">
          <li className="login-benefit">
            <span className="login-benefit__icon">📊</span>
            <span>Theo dõi tiến độ của bé mỗi tuần</span>
          </li>
          <li className="login-benefit">
            <span className="login-benefit__icon">✅</span>
            <span>Đúng format thi Cambridge thật</span>
          </li>
          <li className="login-benefit">
            <span className="login-benefit__icon">🎁</span>
            <span>Hộp Quà Ước Mơ tạo động lực</span>
          </li>
        </ul>

        {/* Login button */}
        <button
          id="btn-google-login"
          className="login-google-btn"
          onClick={loginWithGoogle}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>Đăng nhập bằng Google</span>
        </button>

        <p className="login-note">
          Miễn phí · Không cần thẻ tín dụng
        </p>

        <p className="login-privacy">
          Khi đăng nhập, bạn đồng ý với{" "}
          <a href="/privacy" target="_blank">Chính sách Bảo mật</a> của chúng tôi.
          Chúng tôi không bao giờ chia sẻ dữ liệu của bạn.
        </p>
      </div>
    </div>
  );
}
