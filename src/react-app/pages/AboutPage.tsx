/**
 * AboutPage.tsx — Về Chúng Tôi
 * Route: /ve-chung-toi
 */

import { useNavigate } from "react-router-dom";
import "./StaticPage.css";

const MILESTONES = [
  { year: "2025", event: "Ý tưởng ra đời — nhận thấy khoảng trống về nền tảng luyện thi tiếng Anh Cambridge dành riêng cho học sinh Việt Nam" },
  { year: "Q1 2026", event: "Ra mắt phiên bản đầu tiên với Cambridge Flyers Reading & Writing — 6 dạng bài, hơn 80 bộ đề" },
  { year: "Q2 2026", event: "Mở rộng sang Luyện Thi Lớp 6 — Toán Tư Duy & Tiếng Anh Reading/Writing" },
  { year: "2026+", event: "Movers, KET, PET, Listening AI, Báo Cáo Tuần — đang xây dựng 🚀" },
];

const VALUES = [
  {
    icon: "🎯",
    title: "Đúng trình độ",
    desc: "Bài tập được phân theo Lớp và Độ khó (Easy → Medium → Hard) để mỗi bé luôn được thách thức vừa đủ — không quá dễ, không quá khó.",
  },
  {
    icon: "🆓",
    title: "Bắt đầu miễn phí",
    desc: "6 dạng bài Cambridge Flyers hoàn toàn miễn phí, không cần đăng ký. Phụ huynh và bé có thể trải nghiệm thực tế trước khi quyết định.",
  },
  {
    icon: "🏆",
    title: "Bám sát chuẩn Cambridge",
    desc: "Tất cả bài tập được xây dựng dựa trên khung năng lực Cambridge CEFR chính thức — đúng format đề thi, đúng từ vựng, đúng cấu trúc ngữ pháp.",
  },
  {
    icon: "📊",
    title: "Theo dõi tiến độ",
    desc: "Hệ thống tự động ghi nhận kết quả, phân tích điểm mạnh-yếu và gợi ý bài tiếp theo phù hợp với từng bé.",
  },
  {
    icon: "🌟",
    title: "Học vui — ghi nhớ lâu",
    desc: "Gamification với hệ thống Sao thưởng, Streak hàng ngày và mini-game Hangman từ vựng giúp bé học mà như chơi.",
  },
  {
    icon: "🔒",
    title: "An toàn — minh bạch",
    desc: "Dữ liệu bé được bảo vệ tuyệt đối. Không quảng cáo bên thứ ba. Không bán thông tin. Phụ huynh kiểm soát hoàn toàn tài khoản.",
  },
];

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="static-page">
      {/* Hero */}
      <section className="static-hero">
        <div className="static-hero__content">
          <span className="static-hero__badge">✈️ Cambridge · 🏫 Luyện Thi Lớp 6</span>
          <h1 className="static-hero__title">
            Về <span className="highlight">Luyện Thi</span>
          </h1>
          <p className="static-hero__desc">
            Nền tảng luyện tập tiếng Anh Cambridge và Thi Lớp 6 được thiết kế riêng cho học sinh Việt Nam từ 9–12 tuổi.
            Chúng tôi tin rằng mỗi đứa trẻ đều có thể đạt được ước mơ — nếu được luyện đúng cách, đúng lúc.
          </p>
        </div>
      </section>

      <div className="static-body">

        {/* Sứ mệnh */}
        <section className="static-section">
          <div className="static-section__icon">🎯</div>
          <h2 className="static-section__title">Sứ mệnh của chúng tôi</h2>
          <p className="static-section__text">
            Luyện Thi ra đời với một mục tiêu đơn giản: <strong>giúp mỗi bé Việt Nam được luyện tập đúng dạng đề Cambridge thực tế</strong>,

          </p>
          <p className="static-section__text">
            Chúng tôi xây dựng nội dung bám sát khung thi Cambridge CEFR — từ cách đặt câu hỏi, từ vựng sử dụng, đến cấu trúc ngữ pháp —
            để bé làm quen với đúng những gì sẽ gặp trong phòng thi thật.
          </p>
        </section>

        {/* Giá trị cốt lõi */}
        <section className="static-section">
          <div className="static-section__icon">💡</div>
          <h2 className="static-section__title">Giá trị cốt lõi</h2>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="value-card">
                <div className="value-card__icon">{v.icon}</div>
                <h3 className="value-card__title">{v.title}</h3>
                <p className="value-card__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Chúng tôi là ai */}
        <section className="static-section">
          <div className="static-section__icon">👥</div>
          <h2 className="static-section__title">Chúng tôi là ai?</h2>
          <p className="static-section__text">
            Luyện Thi được xây dựng bởi những người yêu trẻ và tâm huyết với sự nghiệp giáo dục,
            với niềm tin chung rằng <strong>công nghệ có thể giúp việc học trở nên cá nhân hóa và hiệu quả hơn</strong>.
          </p>
          <p className="static-section__text">
            Thay vì lớp học đông 30–40 học sinh với cùng một giáo án, mỗi bé dùng Luyện Thi được nhận bài tập
            phù hợp với lớp, trình độ và lộ trình riêng của mình.
          </p>
          <div className="about-stats">
            <div className="about-stat">
              <span className="about-stat__number">80+</span>
              <span className="about-stat__label">Bộ đề Cambridge Flyers</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__number">6</span>
              <span className="about-stat__label">Dạng bài Part 1–6</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__number">250+</span>
              <span className="about-stat__label">Từ vựng Cambridge</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__number">9–12</span>
              <span className="about-stat__label">Tuổi phù hợp</span>
            </div>
          </div>
        </section>

        {/* Hành trình */}
        <section className="static-section">
          <div className="static-section__icon">🗺️</div>
          <h2 className="static-section__title">Hành trình phát triển</h2>
          <div className="timeline">
            {MILESTONES.map((m, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-item__dot" />
                <div className="timeline-item__content">
                  <span className="timeline-item__year">{m.year}</span>
                  <p className="timeline-item__event">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="static-cta">
          <h2 className="static-cta__title">Hãy cùng bé bắt đầu hành trình! 🚀</h2>
          <p className="static-cta__desc">6 dạng bài Cambridge Flyers miễn phí — không cần đăng ký</p>
          <div className="static-cta__buttons">
            <button className="btn btn-primary" onClick={() => navigate("/")}>
              Thử ngay miễn phí
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/lien-he")}>
              Liên hệ chúng tôi
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
