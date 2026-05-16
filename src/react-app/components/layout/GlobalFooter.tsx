/**
 * GlobalFooter.tsx — App-wide footer
 * Ẩn tự động trên quiz routes (AppLayout xử lý)
 */

import { useNavigate } from "react-router-dom";
import "./GlobalFooter.css";

export function GlobalFooter() {
  const navigate = useNavigate();

  return (
    <footer className="global-footer" role="contentinfo">
      <div className="global-footer__inner">
        {/* Logo + Slogan */}
        <div className="global-footer__brand">
          <span className="global-footer__logo">🎓 Luyện Thi</span>
          <span className="global-footer__slogan">Học vui — Thi tự tin! 🌟</span>
        </div>

        {/* Links */}
        <nav className="global-footer__links" aria-label="Footer links">
          <button
            className="global-footer__link"
            id="btn-footer-about"
          onClick={() => navigate("/ve-chung-toi")}
          >
            Về chúng tôi
          </button>
          <span className="global-footer__sep">·</span>
          <button
            className="global-footer__link"
            id="btn-footer-contact"
          onClick={() => navigate("/lien-he")}
          >
            Liên hệ
          </button>
          <span className="global-footer__sep">·</span>
          <button
            className="global-footer__link"
            id="btn-footer-privacy"
          onClick={() => navigate("/chinh-sach-bao-mat")}
          >
            Chính sách bảo mật
          </button>
        </nav>

        {/* Copyright */}
        <p className="global-footer__copy">
          © 2026 Luyện Thi · luyenthi.io.vn
        </p>
      </div>
    </footer>
  );
}
