/**
 * PathwaySelectionPage.tsx — Trang /learn
 * Bé chọn lộ trình: Cambridge hoặc Thi Lớp 6
 */

import { useNavigate } from "react-router-dom";
import "./PathwaySelectionPage.css";

export function PathwaySelectionPage() {
  const navigate = useNavigate();

  return (
    <div className="pathway-page">
      <div className="pathway-page__header">
        <h1 className="pathway-page__title">Bé muốn luyện gì hôm nay? 🎯</h1>
        <p className="pathway-page__subtitle">
          Chọn lộ trình phù hợp — mỗi lộ trình có chương trình riêng nhé!
        </p>
      </div>

      <div className="pathway-page__cards">

        {/* ── Luyện Thi Lớp 6 ── */}
        <button
          className="pathway-card pathway-card--lop6"
          onClick={() => navigate("/lop6")}
          id="btn-select-lop6"
        >
          <div className="pathway-card__flag">🏫</div>
          <div className="pathway-card__body">
            <h2 className="pathway-card__title">Luyện Thi Lớp 6</h2>
            <p className="pathway-card__desc">
              Ôn tập toàn diện các môn thi tuyển sinh lớp 6 THCS
            </p>
            <div className="pathway-card__levels">
              {["🧮 Toán", "📖 Tiếng Việt", "🌐 Tiếng Anh", "🔬 Khoa học"].map((m) => (
                <span key={m} className="pathway-card__level-badge">{m}</span>
              ))}
            </div>
            <span className="pathway-card__cta">Bắt đầu →</span>
          </div>
          <div className="pathway-card__glow pathway-card__glow--lop6" />
        </button>

        {/* ── Cambridge ── */}
        <button
          className="pathway-card pathway-card--cambridge"
          onClick={() => navigate("/cambridge")}
          id="btn-select-cambridge"
        >
          <div className="pathway-card__flag">🇬🇧</div>
          <div className="pathway-card__body">
            <h2 className="pathway-card__title">Chứng chỉ Cambridge</h2>
            <p className="pathway-card__desc">
              Luyện tiếng Anh quốc tế từ cơ bản đến nâng cao
            </p>
            <div className="pathway-card__levels">
              {["Starters", "Movers", "Flyers", "KET", "PET"].map((lv) => (
                <span key={lv} className="pathway-card__level-badge">{lv}</span>
              ))}
            </div>
            <span className="pathway-card__cta">Bắt đầu →</span>
          </div>
          <div className="pathway-card__glow pathway-card__glow--cambridge" />
        </button>

      </div>
    </div>
  );
}
