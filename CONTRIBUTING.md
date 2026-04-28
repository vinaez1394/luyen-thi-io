# 🤝 CONTRIBUTING — Hướng dẫn cộng tác

> Đọc file này TRƯỚC KHI bắt đầu làm bất cứ điều gì trong dự án.

---

## 📚 Tài liệu BẮT BUỘC đọc trước

| Thứ tự | File | Nội dung |
|--------|------|---------|
| 1️⃣ | [`docs/CONTEXT.md`](./docs/CONTEXT.md) | Stack, kiến trúc, schema, quy ước |
| 2️⃣ | [`docs/RULES.md`](./docs/RULES.md) | Những điều KHÔNG được làm |
| 3️⃣ | [`docs/HUONGDAN.md`](./docs/HUONGDAN.md) | Tổng quan dự án đầy đủ |
| 4️⃣ | [`plans/260428-1029-luyen-thi-io-mvp/plan.md`](./plans/260428-1029-luyen-thi-io-mvp/plan.md) | Danh sách 11 phases và tiến độ |

---

## 🌿 Quy tắc Git

### Branch strategy
```
main       ← Production. Chỉ owner merge vào đây.
dev        ← Branch tích hợp. Merge feature vào đây sau khi review.
feature/phase-XX-ten-phase  ← Mỗi người làm 1 branch riêng.
```

### Quy trình làm việc
```bash
# Bước 1: Cập nhật code mới nhất
git checkout dev
git pull origin dev

# Bước 2: Tạo branch riêng cho phase của mình
git checkout -b feature/phase-04-quiz-engine

# Bước 3: Làm việc, commit thường xuyên (mỗi task nhỏ = 1 commit)
git add .
git commit -m "feat(quiz): add MultipleChoice component"

# Bước 4: Khi xong, push lên GitHub
git push origin feature/phase-04-quiz-engine

# Bước 5: Tạo Pull Request vào dev trên GitHub
# → Assign cho owner review trước khi merge
```

### Commit message format
```
feat(scope): mô tả ngắn      ← Tính năng mới
fix(scope): mô tả ngắn       ← Sửa lỗi
chore(scope): mô tả ngắn     ← Setup, config
docs(scope): mô tả ngắn      ← Cập nhật tài liệu
style(scope): mô tả ngắn     ← CSS, UI

Ví dụ:
feat(quiz): add DragDrop component with dnd-kit
fix(auth): handle Google OAuth callback error
chore(db): add D1 schema migrations
docs(context): update skill level columns
```

---

## 📋 Nhận Phase để làm

### Xem phases còn trống
→ Vào tab **Issues** trên GitHub → tìm issue có label `phase` và chưa có người nhận.

### Claim một phase
→ Comment vào issue: `"Tôi nhận phase này"` → Owner sẽ assign cho bạn.

### Phân chia để tránh conflict
Mỗi phase có folder riêng — làm đúng phase của mình, không sửa file của phase khác.

| Phase | Folder chính | KHÔNG đụng vào |
|-------|-------------|----------------|
| 01 — Foundation | `src/worker/db/`, `wrangler.json` | `src/react-app/` |
| 02 — Themes | `src/react-app/styles/`, `components/ui/Theme*` | `worker/` |
| 03 — Auth | `src/worker/routes/auth.ts`, `pages/Login*` | `components/quiz/` |
| 04 — Quiz Core | `components/quiz/` (MC + FillBlank) | `styles/` |
| 05 — DnD | `components/quiz/DragDrop*` | `worker/routes/` |
| 06 — Audio | `components/quiz/Audio*`, `hooks/useAudio*` | `dashboard/` |
| 07 — Dashboard | `components/dashboard/`, `pages/Dashboard*` | `components/quiz/` |
| 08 — Dream Box | `components/dream-box/`, `worker/routes/dream.ts` | `dashboard/` |
| 09 — Avatar | `public/avatars/`, `components/ui/Avatar*` | `components/dream-box/` |
| 10 — Content | `content/flyers/` (JSON files) | `src/` |
| 11 — Polish | Tất cả (sửa lỗi) | — |

---

## 🤖 Hướng dẫn dùng AI (Antigravity) cộng tác

### Bắt đầu mỗi session
Nhắc AI đọc context:
> *"Đọc `docs/CONTEXT.md` và `docs/RULES.md`, sau đó đọc phase file tương ứng trong `plans/` trước khi bắt đầu."*

### Khi có conflict giữa 2 AI
1. Đặt cả 2 đoạn code cạnh nhau
2. Hỏi AI: *"Đây là 2 cách implement cùng 1 tính năng. Đọc CONTEXT.md và cho biết cách nào đúng hướng hơn và tại sao?"*
3. Người quyết định — không để AI tự merge

### AI KHÔNG được phép
- ❌ Tự ý thay đổi `docs/CONTEXT.md` hoặc `docs/RULES.md` (phải hỏi owner)
- ❌ Cài thêm package lớn mà không thông báo
- ❌ Sửa code của phase khác
- ❌ Push thẳng lên `main`

---

## 🔐 Bảo mật

### KHÔNG commit các file này
```
.env
.env.local
.dev.vars          ← Cloudflare local secrets
*.pem
*.key
```

### Secrets lưu ở đâu
- Local development: file `.dev.vars` (trong `.gitignore`)
- Production: Cloudflare Dashboard → Workers & Pages → Settings → Variables

### Template `.dev.vars` (copy và điền thông tin thật)
```bash
# Copy file mẫu
cp .dev.vars.example .dev.vars
# Điền thông tin vào .dev.vars (KHÔNG commit file này)
```

---

## ✅ Checklist trước khi tạo Pull Request

- [ ] Đã đọc `docs/CONTEXT.md` và `docs/RULES.md`?
- [ ] Branch đặt tên đúng format `feature/phase-XX-ten`?
- [ ] Không có màu hardcode (dùng `var(--color-*)`)
- [ ] Buttons có min-height 48px?
- [ ] TypeScript không có lỗi (`npm run build` pass)?
- [ ] Không commit file `.env` hoặc `.dev.vars`?
- [ ] Cập nhật `plan.md` đánh dấu phase đã xong?

---

*Có câu hỏi → mở Issue trên GitHub với label `question`.*
