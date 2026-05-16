/**
 * PrivacyPage.tsx — Chính Sách Bảo Mật
 * Route: /chinh-sach-bao-mat
 * Cập nhật: 2026-05-15
 */

import "./StaticPage.css";

const SECTIONS = [
  {
    icon: "📋",
    id: "thu-thap",
    title: "1. Thông tin chúng tôi thu thập",
    content: [
      {
        subtitle: "1.1 Thông tin bạn cung cấp trực tiếp",
        text: `Khi đăng ký tài khoản, chúng tôi thu thập:
• Họ tên hiển thị (có thể dùng biệt danh)
• Địa chỉ email (dùng để xác thực và thông báo)
• Lớp học hiện tại của bé (3–6)
• Lộ trình học đã chọn (Cambridge / Luyện Thi Lớp 6)

Khi đăng nhập qua Google, chúng tôi chỉ nhận email và tên từ Google — không truy cập bất kỳ dữ liệu nào khác trong tài khoản Google của bạn.`,
      },
      {
        subtitle: "1.2 Thông tin thu thập tự động",
        text: `Trong quá trình sử dụng, hệ thống tự động ghi lại:
• Kết quả các bài tập (điểm, số câu đúng/sai, thời gian)
• Streak học hàng ngày và tổng số sao tích lũy
• Thiết bị và trình duyệt sử dụng (để tối ưu hiển thị)
• Địa chỉ IP (để bảo mật phiên đăng nhập)

Chúng tôi KHÔNG sử dụng cookies theo dõi bên thứ ba hay pixel quảng cáo.`,
      },
    ],
  },
  {
    icon: "🎯",
    id: "su-dung",
    title: "2. Chúng tôi sử dụng thông tin như thế nào",
    content: [
      {
        subtitle: "",
        text: `Thông tin thu thập được dùng duy nhất cho các mục đích sau:

✅ Cung cấp dịch vụ luyện tập cá nhân hóa theo lớp và trình độ của bé
✅ Lưu tiến độ học (streak, sao, kết quả bài tập) theo thời gian
✅ Gửi báo cáo học tập hàng tuần cho phụ huynh (nếu bật)
✅ Gửi thông báo kỹ thuật quan trọng về tài khoản
✅ Cải thiện chất lượng bài tập và trải nghiệm người dùng

❌ Chúng tôi KHÔNG gửi email quảng cáo, marketing, hay spam
❌ Chúng tôi KHÔNG bán, cho thuê, hay chia sẻ thông tin với bên thứ ba vì mục đích thương mại`,
      },
    ],
  },
  {
    icon: "🔒",
    id: "bao-ve",
    title: "3. Bảo vệ dữ liệu",
    content: [
      {
        subtitle: "3.1 Biện pháp kỹ thuật",
        text: `• Toàn bộ dữ liệu truyền tải qua HTTPS (TLS 1.3)
• Mật khẩu được mã hóa bằng bcrypt — chúng tôi không thể đọc mật khẩu của bạn
• Database và storage được lưu trên Cloudflare (tuân thủ GDPR)
• Session token ngẫu nhiên, hết hạn sau 7 ngày không hoạt động`,
      },
      {
        subtitle: "3.2 Kiểm soát truy cập",
        text: `• Chỉ nhân viên có thẩm quyền mới có thể truy cập cơ sở dữ liệu
• Mọi truy cập admin đều được ghi log và kiểm tra định kỳ
• Không có bên thứ ba nào có quyền truy cập dữ liệu người dùng`,
      },
    ],
  },
  {
    icon: "👶",
    id: "tre-em",
    title: "4. Bảo vệ trẻ em",
    content: [
      {
        subtitle: "",
        text: `Luyện Thi được thiết kế dành cho học sinh từ 9–12 tuổi. Chúng tôi nhận thức rõ trách nhiệm đặc biệt khi phục vụ trẻ em:

• Tài khoản học sinh do phụ huynh/người giám hộ đăng ký và quản lý
• Bé không cần điền thông tin cá nhân nhạy cảm (số điện thoại, địa chỉ nhà,...)
• Không có tính năng nhắn tin giữa người dùng
• Không có quảng cáo hiển thị, đặc biệt không có quảng cáo nhắm vào trẻ em
• Phụ huynh có thể yêu cầu xem, chỉnh sửa hoặc xóa toàn bộ dữ liệu của bé bất kỳ lúc nào`,
      },
    ],
  },
  {
    icon: "📤",
    id: "chia-se",
    title: "5. Chia sẻ thông tin với bên thứ ba",
    content: [
      {
        subtitle: "",
        text: `Chúng tôi KHÔNG bán thông tin của bạn. Chúng tôi CHỈ chia sẻ dữ liệu với các nhà cung cấp dịch vụ kỹ thuật thiết yếu, theo hợp đồng bảo mật chặt chẽ:

• **Cloudflare** — Hosting, CDN, Database (GDPR compliant)
• **Google OAuth** — Đăng nhập bằng tài khoản Google (tùy chọn)
• **Resend.com** — Gửi email thông báo hệ thống

Tất cả đối tác này đều cam kết không sử dụng dữ liệu vào mục đích khác ngoài việc cung cấp dịch vụ cho Luyện Thi.`,
      },
    ],
  },
  {
    icon: "⚙️",
    id: "quyen",
    title: "6. Quyền của bạn",
    content: [
      {
        subtitle: "",
        text: `Bạn có toàn quyền kiểm soát dữ liệu cá nhân của mình:

🔍 **Quyền truy cập:** Xem tất cả thông tin chúng tôi có về bạn
✏️ **Quyền chỉnh sửa:** Cập nhật tên, lớp, lộ trình học tại trang /profile
🗑️ **Quyền xóa:** Yêu cầu xóa toàn bộ tài khoản và dữ liệu
📦 **Quyền xuất dữ liệu:** Nhận bản sao dữ liệu của bạn (CSV/JSON)
⛔ **Quyền phản đối:** Từ chối nhận email thông báo không khẩn cấp

Để thực hiện bất kỳ quyền nào, vui lòng liên hệ: **support@luyenthi.io.vn**
Chúng tôi xử lý yêu cầu trong vòng **7 ngày làm việc**.`,
      },
    ],
  },
  {
    icon: "🍪",
    id: "cookies",
    title: "7. Cookies và lưu trữ cục bộ",
    content: [
      {
        subtitle: "",
        text: `Chúng tôi sử dụng các loại lưu trữ sau:

• **Session Cookie** — Lưu trạng thái đăng nhập (tự xóa khi đóng trình duyệt hoặc sau 7 ngày)
• **localStorage** — Lưu lớp học và lộ trình để tải trang nhanh hơn (không gửi về server)
• **Cloudflare Cache** — Cache API để giảm thời gian phản hồi

Chúng tôi KHÔNG sử dụng:
• Google Analytics hay Facebook Pixel
• Cookies theo dõi giữa các website
• Bất kỳ công nghệ fingerprinting nào`,
      },
    ],
  },
  {
    icon: "🔄",
    id: "cap-nhat",
    title: "8. Cập nhật chính sách",
    content: [
      {
        subtitle: "",
        text: `Khi có thay đổi quan trọng trong Chính sách Bảo mật, chúng tôi sẽ:

• Cập nhật ngày "Có hiệu lực từ" ở đầu trang này
• Gửi email thông báo đến địa chỉ email đã đăng ký
• Hiển thị banner thông báo khi bạn đăng nhập lần đầu sau khi chính sách thay đổi

Việc tiếp tục sử dụng dịch vụ sau khi thay đổi được áp dụng đồng nghĩa với việc bạn chấp nhận chính sách mới.`,
      },
    ],
  },
];

export function PrivacyPage() {
  return (
    <div className="static-page">
      {/* Hero */}
      <section className="static-hero static-hero--privacy">
        <div className="static-hero__content">
          <span className="static-hero__badge">🔐 An toàn · Minh bạch · Đáng tin</span>
          <h1 className="static-hero__title">
            Chính Sách <span className="highlight">Bảo Mật</span>
          </h1>
          <p className="static-hero__desc">
            Chúng tôi cam kết bảo vệ quyền riêng tư của bạn và các con. Tài liệu này giải thích rõ ràng
            những gì chúng tôi thu thập, tại sao, và bạn có quyền kiểm soát như thế nào.
          </p>
          <div className="privacy-meta">
            <span className="privacy-meta__item">📅 Có hiệu lực từ: 15/05/2026</span>
            <span className="privacy-meta__item">🔄 Cập nhật lần cuối: 15/05/2026</span>
          </div>
        </div>
      </section>

      <div className="static-body">

        {/* Quick nav */}
        <section className="privacy-toc static-section">
          <h2 className="privacy-toc__title">📑 Mục lục nhanh</h2>
          <div className="privacy-toc__links">
            {SECTIONS.map(s => (
              <a key={s.id} href={`#${s.id}`} className="privacy-toc__link">
                {s.icon} {s.title.split(". ")[1]}
              </a>
            ))}
          </div>
        </section>

        {/* Intro */}
        <section className="static-section privacy-intro">
          <p className="static-section__text">
            Luyện Thi (<strong>luyenthi.io.vn</strong>) là nền tảng luyện tập học thuật dành cho học sinh Việt Nam
            từ 9–12 tuổi. Chúng tôi hiểu rằng khi bạn giao phó dữ liệu của con em mình cho chúng tôi,
            đó là một trách nhiệm vô cùng lớn. Chính sách này áp dụng cho toàn bộ dịch vụ tại luyenthi.io.vn.
          </p>
        </section>

        {/* Content sections */}
        {SECTIONS.map(section => (
          <section key={section.id} id={section.id} className="static-section privacy-section">
            <div className="static-section__icon">{section.icon}</div>
            <h2 className="static-section__title">{section.title}</h2>
            {section.content.map((c, i) => (
              <div key={i} className="privacy-subsection">
                {c.subtitle && <h3 className="privacy-subsection__title">{c.subtitle}</h3>}
                <div className="privacy-subsection__text">
                  {c.text.split("\n").map((line, j) => (
                    line.trim() === "" ? <br key={j} /> : (
                      <p key={j} className={line.startsWith("•") || line.startsWith("✅") || line.startsWith("❌") || line.startsWith("🔍") || line.startsWith("✏️") || line.startsWith("🗑️") || line.startsWith("📦") || line.startsWith("⛔") ? "privacy-bullet" : ""}>
                        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                      </p>
                    )
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}

        {/* Contact */}
        <section className="static-section privacy-contact">
          <div className="static-section__icon">📬</div>
          <h2 className="static-section__title">9. Liên hệ về quyền riêng tư</h2>
          <p className="static-section__text">
            Nếu bạn có bất kỳ câu hỏi, lo ngại hay yêu cầu nào liên quan đến quyền riêng tư và dữ liệu cá nhân, vui lòng liên hệ:
          </p>
          <div className="privacy-contact-info">
            <div className="privacy-contact-info__item">
              <span>📧</span>
              <a href="mailto:support@luyenthi.io.vn">support@luyenthi.io.vn</a>
            </div>
            <div className="privacy-contact-info__item">
              <span>⏱️</span>
              <span>Phản hồi trong vòng 7 ngày làm việc</span>
            </div>
            <div className="privacy-contact-info__item">
              <span>🌐</span>
              <a href="/lien-he">Trang Liên Hệ</a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
