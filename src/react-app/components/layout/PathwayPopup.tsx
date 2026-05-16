/**
 * PathwayPopup.tsx — Popup chọn lộ trình khi guest vào lần đầu
 *
 * Logic:
 *   - Lần 1: localStorage('popup_seen') chưa có → show popup
 *   - Lần 2+: localStorage('popup_seen') = true → show StickyPathwayBanner thay thế
 *   - Đã login → không show gì
 */

import { useNavigate } from "react-router-dom";
import "./PathwayPopup.css";

interface PathwayPopupProps {
  onDismiss: () => void;
}

export function PathwayPopup({ onDismiss }: PathwayPopupProps) {
  const navigate = useNavigate();

  const handleChoose = (path: string) => {
    localStorage.setItem("popup_seen", "true");
    navigate(path);
  };

  const handleDismiss = () => {
    localStorage.setItem("popup_seen", "true");
    onDismiss();
  };

  return (
    <div className="pathway-popup-overlay" onClick={handleDismiss}>
      <div
        className="pathway-popup"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Chọn lộ trình học"
      >
        {/* Header */}
        <div className="pathway-popup__header">
          <h2 className="pathway-popup__title">Mục tiêu của bé là gì? 🎯</h2>
        </div>

        {/* 2 Cards chính */}
        <div className="pathway-popup__cards">
          {/* Luyện Thi Lớp 6 */}
          <button
            className="pp-card pp-card--lop6"
            id="btn-popup-lop6"
            onClick={() => handleChoose("/lop6")}
          >
            {/* Header: icon + title cùng hàng */}
            <div className="pp-card__header">
              <span className="pp-card__flag">🏫</span>
              <h3 className="pp-card__title">Luyện Thi vào Lớp 6</h3>
            </div>
            <div className="pp-card__badges">
              {/* Hàng 1 */}
              <span className="pp-card__badge pp-card__badge--toan">🧮 Toán</span>
              <span className="pp-card__badge pp-card__badge--tieng-anh">🌐 Tiếng Anh</span>
              <div className="pp-card__badges-break" />
              {/* Hàng 2 */}
              <span className="pp-card__badge pp-card__badge--tieng-viet">📖 Tiếng Việt</span>
              <span className="pp-card__badge pp-card__badge--khoa-hoc">🔬 Khoa học</span>
            </div>
            <span className="pp-card__cta">Vào luyện ngay →</span>
            {/* Illustration */}
            <img
              src="https://cdn.luyenthi.io.vn/illustrations/lop6-card.png?v=2"
              alt=""
              className="pp-card__illus"
              aria-hidden="true"
            />
          </button>

          {/* Cambridge */}
          <button
            className="pp-card pp-card--cambridge"
            id="btn-popup-cambridge"
            onClick={() => handleChoose("/cambridge")}
          >
            {/* Header: icon + title cùng hàng */}
            <div className="pp-card__header">
              <span className="pp-card__flag">🇬🇧</span>
              <h3 className="pp-card__title">Chứng chỉ Cambridge</h3>
            </div>
            <div className="pp-card__badges">
              {/* Hàng 1 */}
              <span className="pp-card__badge pp-card__badge--starters">⭐ Starters</span>
              <span className="pp-card__badge pp-card__badge--movers">🧤 Movers</span>
              <div className="pp-card__badges-break" />
              {/* Hàng 2 */}
              <span className="pp-card__badge pp-card__badge--flyers">✈️ Flyers</span>
              <span className="pp-card__badge pp-card__badge--ket">📘 KET</span>
              <span className="pp-card__badge pp-card__badge--pet">📗 PET</span>
            </div>
            <span className="pp-card__cta">Vào luyện ngay →</span>
            {/* Illustration */}
            <img
              src="https://cdn.luyenthi.io.vn/illustrations/cambridge-card.png?v=2"
              alt=""
              className="pp-card__illus"
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Vocabulary option */}
        <div className="pathway-popup__vocab">
          <span className="pathway-popup__vocab-label">📖 Học từ vựng chuẩn Cambridge</span>
          <button
            className="pathway-popup__vocab-btn"
            id="btn-popup-vocab"
            onClick={() => handleChoose("/cambridge/vocabulary")}
          >
            Ôn từ vựng ngay →
          </button>
        </div>

        {/* Footer: login + dismiss */}
        <div className="pathway-popup__footer">
          <span className="pathway-popup__footer-text">
            Đã có tài khoản?{" "}
            <button
              className="pathway-popup__login-link"
              id="btn-popup-login"
              onClick={() => handleChoose("/login")}
            >
              Đăng nhập
            </button>
          </span>
          <button
            className="pathway-popup__close"
            id="btn-popup-close"
            onClick={handleDismiss}
            aria-label="Đóng popup"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   StickyPathwayBanner — hiển thị cho guest quay lại
   (popup_seen = true nhưng chưa login)
═══════════════════════════════════════════════════════ */

interface StickyPathwayBannerProps {
  onDismiss: () => void;
}

export function StickyPathwayBanner({ onDismiss }: StickyPathwayBannerProps) {
  const navigate = useNavigate();

  return (
    <div className="sticky-banner" role="banner" aria-label="Chọn lộ trình học">
      <div className="sticky-banner__inner">
        <span className="sticky-banner__label">🎯 Chọn lộ trình:</span>
        <div className="sticky-banner__btns">
          <button
            className="sticky-banner__btn sticky-banner__btn--lop6"
            id="btn-sticky-lop6"
            onClick={() => navigate("/lop6")}
          >
            🏫 Luyện Thi Lớp 6
          </button>
          <button
            className="sticky-banner__btn sticky-banner__btn--cambridge"
            id="btn-sticky-cambridge"
            onClick={() => navigate("/cambridge")}
          >
            🇬🇧 Cambridge
          </button>
          <button
            className="sticky-banner__btn sticky-banner__btn--login"
            id="btn-sticky-login"
            onClick={() => navigate("/login")}
          >
            Đăng nhập
          </button>
        </div>
        <button
          className="sticky-banner__close"
          id="btn-sticky-close"
          onClick={onDismiss}
          aria-label="Ẩn thanh thông báo"
        >
          ×
        </button>
      </div>
    </div>
  );
}
