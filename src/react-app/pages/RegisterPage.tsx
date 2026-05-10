/**
 * RegisterPage.tsx — Trang đăng ký tài khoản mới
 * Hỗ trợ: Google OAuth (nhanh) + Email + mã xác nhận (thủ công)
 */

import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./RegisterPage.css";

// ─── Error messages ────────────────────────────────────────────
const ERROR_MESSAGES: Record<string, string> = {
  cancelled:      "Bạn đã hủy đăng ký. Thử lại nhé!",
  token_failed:   "Google không xác nhận được. Vui lòng thử lại.",
  invalid_client: "Cấu hình xác thực bị lỗi. Liên hệ hỗ trợ.",
  config_missing: "Hệ thống chưa sẵn sàng. Thử lại sau ít phút.",
  server_error:   "Máy chủ gặp sự cố. Vui lòng thử lại.",
  db_failed:      "Không thể tạo tài khoản. Vui lòng thử lại.",
  email_exists:   "Email này đã được đăng ký. Hãy đăng nhập!",
  code_invalid:   "Mã xác nhận sai hoặc đã hết hạn. Thử lại!",
  email_failed:   "Không gửi được email. Kiểm tra lại địa chỉ email.",
};

// ─── Step type ─────────────────────────────────────────────────
type Step = "choose" | "email-input" | "email-verify";

export function RegisterPage() {
  const { isLoggedIn, isLoading, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const authError  = searchParams.get("auth_error");
  const errorMsg   = authError ? (ERROR_MESSAGES[authError] ?? "Có lỗi xảy ra!") : null;

  // ── State ──────────────────────────────────────────────────
  const [step,        setStep]        = useState<Step>("choose");
  const [email,       setEmail]       = useState("");
  const [name,        setName]        = useState("");
  const [code,        setCode]        = useState("");
  const [sending,     setSending]     = useState(false);
  const [verifying,   setVerifying]   = useState(false);
  const [localError,  setLocalError]  = useState<string | null>(null);
  const [countdown,   setCountdown]   = useState(0);

  // ── Redirect nếu đã đăng nhập ─────────────────────────────
  useEffect(() => {
    if (!isLoading && isLoggedIn) navigate("/dashboard", { replace: true });
  }, [isLoggedIn, isLoading, navigate]);

  // ── Countdown resend ──────────────────────────────────────
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  // ── Send verification code ────────────────────────────────
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!email.trim()) { setLocalError("Vui lòng nhập email!"); return; }
    if (!name.trim())  { setLocalError("Vui lòng nhập tên bé!"); return; }

    setSending(true);
    try {
      const res = await fetch("/api/auth/email/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), name: name.trim() }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (data.ok) {
        setStep("email-verify");
        setCountdown(60);
      } else {
        setLocalError(ERROR_MESSAGES[data.error ?? ""] ?? data.error ?? "Gửi mã thất bại!");
      }
    } catch {
      setLocalError("Lỗi kết nối. Kiểm tra mạng và thử lại.");
    } finally {
      setSending(false);
    }
  };

  // ── Verify code ───────────────────────────────────────────
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (code.trim().length !== 6) { setLocalError("Mã xác nhận gồm 6 chữ số!"); return; }

    setVerifying(true);
    try {
      const res = await fetch("/api/auth/email/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), code: code.trim() }),
      });
      const data = await res.json() as { ok?: boolean; error?: string; redirect?: string };
      if (data.ok) {
        window.location.assign(data.redirect ?? "/onboarding");
      } else {
        setLocalError(ERROR_MESSAGES[data.error ?? ""] ?? "Mã sai hoặc hết hạn!");
      }
    } catch {
      setLocalError("Lỗi kết nối. Thử lại!");
    } finally {
      setVerifying(false);
    }
  };

  if (isLoading) return <div className="register-loading"><div className="register-spinner" /></div>;

  return (
    <div className="register-page">
      <div className="reg-blob reg-blob--1" />
      <div className="reg-blob reg-blob--2" />
      <div className="reg-blob reg-blob--3" />

      <div className="register-card animate-scaleIn">

        {/* ── Header ── */}
        <div className="reg-header">
          <h1 className="reg-title">
            {step === "email-verify" ? "Kiểm tra email 📬" : "Tạo tài khoản 🌟"}
          </h1>
          <p className="reg-subtitle">
            {step === "email-verify"
              ? `Mã 6 số đã được gửi tới ${email}`
              : "Học thông minh · Thi tự tin · Không cần thẻ tín dụng"}
          </p>
        </div>

        {/* ── Error (từ OAuth redirect) ── */}
        {(errorMsg || localError) && (
          <div className="reg-error" role="alert">
            <span>⚠️</span>
            <span>{localError ?? errorMsg}</span>
          </div>
        )}

        {/* ═══════════════════════════════════════════
            STEP 1: CHOOSE METHOD
        ═══════════════════════════════════════════ */}
        {step === "choose" && (
          <>
            {/* Google button */}
            <div className="reg-google-section">
              <button
                id="btn-register-google"
                className="reg-google-btn"
                onClick={loginWithGoogle}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Đăng ký nhanh với Google</span>
              </button>
              <p className="reg-google-note">🔒 An toàn · Không lưu mật khẩu · 30 giây là xong</p>
            </div>

            {/* Divider */}
            <div className="reg-divider">
              <span className="reg-divider__line" />
              <span className="reg-divider__text">hoặc đăng ký bằng email</span>
              <span className="reg-divider__line" />
            </div>

            {/* Email quick start button */}
            <button
              className="reg-email-start-btn"
              onClick={() => setStep("email-input")}
            >
              ✉️ Đăng ký bằng Email
            </button>
          </>
        )}

        {/* ═══════════════════════════════════════════
            STEP 2: EMAIL FORM
        ═══════════════════════════════════════════ */}
        {step === "email-input" && (
          <form className="reg-email-form" onSubmit={handleSendCode} noValidate>
            <div className="reg-field">
              <label className="reg-label" htmlFor="reg-name">Tên bé 👶</label>
              <input
                id="reg-name"
                className="reg-input"
                type="text"
                placeholder="Ví dụ: Bé Nam, Nguyễn Hà My..."
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
                maxLength={50}
                required
              />
            </div>

            <div className="reg-field">
              <label className="reg-label" htmlFor="reg-email">Email phụ huynh 📧</label>
              <input
                id="reg-email"
                className="reg-input"
                type="email"
                placeholder="vidu@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                inputMode="email"
                required
              />
              <p className="reg-field-hint">Chúng tôi sẽ gửi mã xác nhận 6 số vào email này</p>
            </div>

            <button
              type="submit"
              className="reg-submit-btn"
              disabled={sending}
            >
              {sending ? "⏳ Đang gửi mã..." : "Gửi mã xác nhận →"}
            </button>

            <button type="button" className="reg-back-btn" onClick={() => { setStep("choose"); setLocalError(null); }}>
              ← Quay lại
            </button>
          </form>
        )}

        {/* ═══════════════════════════════════════════
            STEP 3: VERIFY CODE
        ═══════════════════════════════════════════ */}
        {step === "email-verify" && (
          <form className="reg-email-form" onSubmit={handleVerifyCode} noValidate>
            <div className="reg-field">
              <label className="reg-label" htmlFor="reg-code">Mã xác nhận 6 số 🔑</label>
              <input
                id="reg-code"
                className="reg-input reg-input--code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                placeholder="• • • • • •"
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
                autoFocus
                autoComplete="one-time-code"
                required
              />
              <p className="reg-field-hint">Mã có hiệu lực trong 5 phút</p>
            </div>

            <button
              type="submit"
              className="reg-submit-btn"
              disabled={verifying || code.length !== 6}
            >
              {verifying ? "⏳ Đang xác nhận..." : "Xác nhận & Tạo tài khoản ✓"}
            </button>

            <button
              type="button"
              className="reg-resend-btn"
              disabled={countdown > 0 || sending}
              onClick={handleSendCode as unknown as React.MouseEventHandler}
            >
              {countdown > 0 ? `Gửi lại sau ${countdown}s` : "Gửi lại mã"}
            </button>

            <button type="button" className="reg-back-btn" onClick={() => { setStep("email-input"); setLocalError(null); setCode(""); }}>
              ← Đổi email
            </button>
          </form>
        )}

        {/* ── Footer ── */}
        <div className="reg-footer">
          <p className="reg-footer__text">
            Đã có tài khoản?{" "}
            <Link to="/login" className="reg-footer__link">Đăng nhập ngay</Link>
          </p>
          <p className="reg-privacy">
            Khi đăng ký, bạn đồng ý với{" "}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">Chính sách Bảo mật</a>{" "}
            của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
}
