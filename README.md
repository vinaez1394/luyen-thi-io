# luyen-thi-io 🎓

Nền tảng luyện thi Cambridge Flyers cho học sinh Việt Nam 9–12 tuổi.

## 📚 Đọc trước khi làm bất cứ điều gì

| Thứ tự | File | Mục đích |
|--------|------|---------|
| 1️⃣ | [docs/HUONGDAN.md](./docs/HUONGDAN.md) | **Đọc đầu tiên** — Tổng quan toàn bộ dự án |
| 2️⃣ | [docs/CONTEXT.md](./docs/CONTEXT.md) | Stack, kiến trúc, schema, quy ước (AI đọc file này) |
| 3️⃣ | [docs/RULES.md](./docs/RULES.md) | Quy tắc bắt buộc, những điều KHÔNG được làm |
| 4️⃣ | [CONTRIBUTING.md](./CONTRIBUTING.md) | Hướng dẫn cộng tác, Git workflow |
| 5️⃣ | [plans/.../plan.md](./plans/260428-1029-luyen-thi-io-mvp/plan.md) | 11 phases và tiến độ |

## 🚀 Tech Stack

- **Frontend:** React 19 + Vite
- **Backend:** Hono on Cloudflare Workers
- **Database:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare R2
- **Email:** Resend.com
- **Deploy:** Cloudflare Workers

## 🛠️ Chạy local

```bash
npm install
npm run dev
```

## 🤝 Cộng tác

Xem [CONTRIBUTING.md](./CONTRIBUTING.md) để biết cách nhận phase và quy trình làm việc.

## 📋 Tiến độ

Xem [GitHub Issues](../../issues) để biết phase nào đang trống và claim.
