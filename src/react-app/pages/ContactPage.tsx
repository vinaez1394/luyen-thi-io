/**
 * ContactPage.tsx — Liên Hệ
 * Route: /lien-he
 */

import { useState } from "react";
import "./StaticPage.css";

const CONTACT_METHODS = [
  {
    icon: "📧",
    title: "Email hỗ trợ",
    value: "support@luyenthi.io.vn",
    desc: "Phản hồi trong vòng 24 giờ (ngày làm việc)",
    href: "mailto:support@luyenthi.io.vn",
  },
  {
    icon: "💬",
    title: "Fanpage Facebook",
    value: "fb.com/luyenthi.io.vn",
    desc: "Trao đổi nhanh, cập nhật tính năng mới",
    href: "https://facebook.com/luyenthi.io.vn",
  },
  {
    icon: "📍",
    title: "Địa chỉ",
    value: "Việt Nam",
    desc: "Đội ngũ làm việc từ xa toàn quốc",
    href: null,
  },
];

const FAQ = [
  {
    q: "Tôi có thể dùng miễn phí không?",
    a: "Có. 6 dạng bài Cambridge Flyers (Part 1–6) hoàn toàn miễn phí, không cần đăng ký. Bạn có thể trải nghiệm ngay tại trang chủ.",
  },
  {
    q: "Nền tảng phù hợp với bé mấy tuổi?",
    a: "Luyện Thi phù hợp với học sinh từ 9–12 tuổi, đang học lớp 3–6. Cambridge Flyers dành cho bé muốn thi chứng chỉ A2. Luyện Thi Lớp 6 dành cho bé đang chuẩn bị thi tuyển sinh lớp 6.",
  },
  {
    q: "Bài tập có sát đề thi thật không?",
    a: "Có. Tất cả bài tập được xây dựng dựa trên khung thi Cambridge chính thức (CEFR) và tham khảo đề thi thật từ Cambridge Assessment English. Format câu hỏi, từ vựng, và độ khó đều được kiểm duyệt bởi giáo viên có chứng chỉ Cambridge.",
  },
  {
    q: "Tôi quên mật khẩu thì làm thế nào?",
    a: "Bạn có thể dùng chức năng \"Quên mật khẩu\" ở trang đăng nhập, hoặc liên hệ email support@luyenthi.io.vn để được hỗ trợ khôi phục tài khoản.",
  },
  {
    q: "Tôi muốn báo lỗi bài tập sai đáp án?",
    a: "Cảm ơn bạn! Vui lòng gửi email về support@luyenthi.io.vn với tiêu đề \"[Báo lỗi]\" kèm ID bài tập và câu hỏi cụ thể. Chúng tôi sẽ xem xét và sửa trong 48 giờ.",
  },
  {
    q: "Có thể dùng trên điện thoại không?",
    a: "Có. Luyện Thi được thiết kế mobile-first, hoạt động tốt trên mọi thiết bị. Không cần tải app — truy cập trực tiếp qua trình duyệt.",
  },
];

export function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mở email client với nội dung đã điền sẵn
    const body = encodeURIComponent(
      `Họ tên: ${form.name}\nEmail: ${form.email}\n\nNội dung:\n${form.message}`
    );
    const subject = encodeURIComponent(`[Liên hệ Luyện Thi] ${form.subject || "Hỗ trợ chung"}`);
    window.location.href = `mailto:support@luyenthi.io.vn?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="static-page">
      {/* Hero */}
      <section className="static-hero static-hero--contact">
        <div className="static-hero__content">
          <span className="static-hero__badge">📬 Luôn lắng nghe</span>
          <h1 className="static-hero__title">
            <span className="highlight">Liên Hệ</span> Chúng Tôi
          </h1>
          <p className="static-hero__desc">
            Có thắc mắc, góp ý hay muốn hợp tác? Chúng tôi luôn sẵn sàng lắng nghe — phản hồi trong 24 giờ.
          </p>
        </div>
      </section>

      <div className="static-body">

        {/* Contact methods */}
        <section className="static-section">
          <div className="contact-methods">
            {CONTACT_METHODS.map((c, i) => (
              <div key={i} className="contact-method-card">
                <div className="contact-method-card__icon">{c.icon}</div>
                <div className="contact-method-card__body">
                  <h3 className="contact-method-card__title">{c.title}</h3>
                  {c.href ? (
                    <a href={c.href} className="contact-method-card__value" target="_blank" rel="noreferrer">
                      {c.value}
                    </a>
                  ) : (
                    <span className="contact-method-card__value">{c.value}</span>
                  )}
                  <p className="contact-method-card__desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section className="static-section">
          <div className="static-section__icon">✉️</div>
          <h2 className="static-section__title">Gửi tin nhắn</h2>
          {sent ? (
            <div className="contact-sent">
              <div className="contact-sent__icon">✅</div>
              <h3 className="contact-sent__title">Cảm ơn bạn!</h3>
              <p className="contact-sent__desc">Ứng dụng email đã được mở. Gửi email để chúng tôi nhận được tin nhắn của bạn.</p>
              <button className="btn btn-outline" onClick={() => setSent(false)}>Gửi tin nhắn khác</button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="contact-form__row">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Họ và tên *</label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    placeholder="Nguyễn Văn A"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Chủ đề</label>
                <select
                  id="contact-subject"
                  className="form-input"
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                >
                  <option value="">-- Chọn chủ đề --</option>
                  <option value="Hỗ trợ tài khoản">Hỗ trợ tài khoản</option>
                  <option value="Báo lỗi bài tập">Báo lỗi bài tập</option>
                  <option value="Góp ý nội dung">Góp ý nội dung</option>
                  <option value="Hợp tác / Đối tác">Hợp tác / Đối tác</option>
                  <option value="Thanh toán / Gói dịch vụ">Thanh toán / Gói dịch vụ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Nội dung *</label>
                <textarea
                  id="contact-message"
                  className="form-input form-textarea"
                  placeholder="Mô tả chi tiết vấn đề hoặc câu hỏi của bạn..."
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary contact-form__submit">
                📨 Gửi tin nhắn
              </button>
            </form>
          )}
        </section>

        {/* FAQ */}
        <section className="static-section">
          <div className="static-section__icon">❓</div>
          <h2 className="static-section__title">Câu hỏi thường gặp</h2>
          <div className="faq-list">
            {FAQ.map((item, i) => (
              <div
                key={i}
                className={`faq-item ${openFaq === i ? "faq-item--open" : ""}`}
              >
                <button
                  className="faq-item__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  id={`faq-btn-${i}`}
                >
                  <span>{item.q}</span>
                  <span className="faq-item__chevron">{openFaq === i ? "▲" : "▼"}</span>
                </button>
                {openFaq === i && (
                  <div className="faq-item__answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
