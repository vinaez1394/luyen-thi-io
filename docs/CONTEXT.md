# 🧠 CONTEXT — Luyện Thi (luyenthi.io.vn)
> ⚠️ AI PHẢI ĐỌC FILE NÀY TRƯỚC KHI BẮT ĐẦU BẤT KỲ TASK NÀO

---

## 1. DỰ ÁN LÀ GÌ?

**Luyện Thi** (luyenthi.io.vn) là nền tảng luyện thi tiếng Anh Cambridge Flyers cho học sinh Việt Nam 9–12 tuổi.

- **Tên thương hiệu:** Luyện Thi
- **Domain:** luyenthi.io.vn
- **Repo/code name:** luyen-thi-io (giữ nguyên)
- **Slogan:** *"Học vui — Thi tự tin!"*
- **Model kinh doanh:** Freemium (xem mục 11)

Đây là dự án solo developer, vibe coding, deploy trên Cloudflare.

---

## 2. STACK KỸ THUẬT — KHÔNG THAY ĐỔI

```
Frontend:   React 19 + Vite (KHÔNG dùng Next.js)
Backend:    Hono on Cloudflare Workers
Database:   Cloudflare D1 (SQLite)
Storage:    Cloudflare R2 (audio, images, JSON content)
Cache:      Cloudflare KV
Email:      Resend.com
Auth:       Google OAuth via Hono (TÙY CHỌN — không bắt buộc khi vào app)
Deploy:     Cloudflare Workers (wrangler)
DnD:        dnd-kit (KHÔNG dùng HTML5 DnD API)
Font:       Nunito (Google Fonts)
Theme:      CSS Custom Properties với data-theme attribute
Router:     React Router DOM
```

---

## 3. CẤU TRÚC FILE DỰ ÁN

```
luyen-thi-io/
├── src/
│   ├── react-app/          ← Frontend React
│   │   ├── components/
│   │   │   ├── quiz/       ← Quiz Engine components
│   │   │   │   ├── QuizEngine.tsx        ← Router chính
│   │   │   │   ├── MultipleChoice.tsx
│   │   │   │   ├── DragDrop.tsx
│   │   │   │   ├── FillBlank.tsx
│   │   │   │   └── Matching.tsx
│   │   │   ├── dashboard/  ← Trang chủ bé (chỉ khi đăng nhập)
│   │   │   ├── dream-box/  ← Hộp Quà Ước Mơ
│   │   │   └── ui/         ← Shared components
│   │   ├── pages/
│   │   │   ├── HomePage.tsx      ← Trang chủ (KHÔNG cần login)
│   │   │   ├── LoginPage.tsx     ← Đăng nhập Google
│   │   │   ├── OnboardingPage.tsx← Setup hồ sơ lần đầu
│   │   │   ├── QuizPage.tsx      ← Làm bài (free/premium check)
│   │   │   └── DashboardPage.tsx ← Trang chủ bé (cần login)
│   │   ├── hooks/
│   │   └── styles/
│   │       └── themes.css  ← 6 CSS themes
│   └── worker/             ← Hono backend
│       ├── index.ts
│       ├── lib/
│       │   └── session.ts  ← Session management (KV)
│       └── routes/
│           ├── health.ts
│           ├── auth.ts     ← Google OAuth
│           ├── student.ts  ← Student profile
│           ├── quiz.ts     ← Quiz content API
│           └── admin.ts    ← Admin CMS API
├── content/                ← Nội dung bài học (JSON)
│   └── flyers/
│       ├── listening/      ← L001.json, L002.json...
│       └── reading/        ← RW001.json, RW002.json...
├── docs/
│   ├── BRIEF.md            ← Product vision đầy đủ
│   ├── CONTEXT.md          ← File này — AI đọc trước khi code
│   └── RULES.md            ← Quy tắc code
└── wrangler.json
```

---

## 4. KIẾN TRÚC QUIZ ENGINE

### Nguyên tắc cốt lõi: 1 Engine, nhiều chế độ

```
File JSON (content) ──▶ QuizEngine ──▶ Render đúng component
```

### Các loại bài tập (type trong JSON):

| type | Component | Mô tả |
|------|-----------|-------|
| `multiple-choice` | MultipleChoice | 4 lựa chọn, chọn 1 |
| `multiple-choice-image` | MultipleChoice | 4 lựa chọn có hình |
| `drag-drop-match` | DragDrop | Kéo thả matching |
| `drag-drop-fill` | DragDrop | Kéo từ vào chỗ trống |
| `fill-blank` | FillBlank | Gõ text vào ô trống |
| `matching` | Matching | Nối 2 cột |
| `audio-mc` | MultipleChoice | Nghe audio + chọn đáp án |

### JSON Schema chuẩn (bao gồm freemium fields):

```json
{
  "id": "string",
  "title": "string",
  "skill": "listening | reading | writing",
  "level": "flyers | movers | ket | pet",
  "part": 1,
  "type": "multiple-choice",
  "is_free": true,
  "audio_url": "string (optional)",
  "instructions_vi": "string (hướng dẫn tiếng Việt)",
  "questions": [
    {
      "id": "string",
      "prompt": "string",
      "options": [],
      "correct": "string | string[]",
      "explanation_vi": "string (giải thích sau khi nộp)"
    }
  ]
}
```

---

## 5. DATABASE SCHEMA (D1)

```sql
-- Người dùng (phụ huynh đăng ký)
users: id, email, name, google_id, subscription_tier, created_at

-- Hồ sơ học sinh
student_profiles: id, user_id, display_name, avatar_id, theme, created_at

-- Thống kê (indexed columns, KHÔNG dùng JSON_EXTRACT cho filter)
student_stats: student_id, total_stars, current_streak, longest_streak,
               lvl_listening_p1..p4, lvl_reading_p1..p4, lvl_writing_p1,
               preferences_json

-- Hộp Quà Ước Mơ
dream_goals: id, student_id, exam_id, goal_type, goal_target,
             reward_label, reward_image_key, status, approval_token,
             token_expires, current_progress, approved_at, achieved_at

-- Kết quả bài làm
quiz_attempts: id, student_id, quiz_id, skill, part_number, score,
               max_score, stars_earned, answers_json, time_spent,
               is_challenge, challenge_threshold, challenge_multiplier,
               stars_base, completed_at

-- Hoạt động hàng ngày (streak tracking)
daily_activity: student_id, date_key, sessions, stars

-- Subscription
subscriptions: id, user_id, plan, expires_at, payment_ref

-- Cấu hình nội dung bài học (Admin quản lý)
quiz_configs: quiz_id TEXT PRIMARY KEY,
              is_free INTEGER DEFAULT 0,   -- 0=premium, 1=free
              is_published INTEGER DEFAULT 1,
              sort_order INTEGER DEFAULT 0,
              created_at INTEGER,
              updated_at INTEGER
```

---

## 6. HỆ THỐNG ĐIỂM THƯỞNG

| Điểm số | Sao nhận |
|---------|---------|
| < 60%   | ⭐ 1    |
| 60–79%  | ⭐⭐ 2  |
| 80–89%  | ⭐⭐⭐ 3 |
| 90–100% | ⭐⭐⭐⭐⭐ 5 |
| Streak 3 ngày | Bonus ⭐⭐ |
| Streak 7 ngày | Bonus ⭐⭐⭐⭐⭐ |
| Full mock test | ⭐⭐⭐⭐⭐⭐⭐ 7 |

**Sao KHÔNG bao giờ hết hạn.**

> ⚠️ Khách (guest, chưa login): Làm được bài FREE nhưng **KHÔNG lưu điểm/sao**.
> Muốn lưu tiến độ → cần đăng nhập.

---

## 7. THEME SYSTEM

```css
/* 6 themes, đổi bằng data-theme attribute trên <html> */
/* VD: document.documentElement.setAttribute('data-theme', 'ocean') */

Themes: purple (default) | ocean | sakura | forest | night | sunset

/* Mọi màu sắc đều dùng CSS variables */
--color-primary, --color-secondary, --color-success,
--color-danger, --color-bg, --color-card, --color-text
```

---

## 8. EMAIL FLOW (Resend.com)

- Dream Box approval: Bé gửi → Email PH → PH click approve → dream_goals.status = 'approved'
- Weekly Report: Mỗi Chủ nhật cuối tuần, tự động gửi báo cáo tiến độ
- Token trong email: hạn 7 ngày, approve cũng được từ Parent Dashboard

---

## 9. 4 USP CHÍNH CỦA DỰ ÁN

1. **Báo cáo tuần tự động tiếng Việt** — phụ huynh biết con yếu phần nào
2. **Đúng format thi Cambridge + hướng dẫn tiếng Việt** — không bất ngờ phòng thi
3. **Chẩn đoán điểm yếu + gợi ý bài tự động** — học đúng chỗ
4. **Hộp Quà Ước Mơ** — kết nối ba mẹ và con, tạo động lực dài hạn

---

## 10. GIAI ĐOẠN PHÁT TRIỂN

### MVP (Đang làm):
- Trang chủ (không cần login) + danh sách bài free
- Quiz Engine (MC + DragDrop + FillBlank)
- Google OAuth (tùy chọn, để lưu tiến độ)
- Student dashboard (trang chủ bé, sau đăng nhập)
- Dream Box + email approval
- Theme (6 cái) + Avatar (12 preset)
- 5–10 bài JSON Flyers (một số free, một số premium)
- Admin panel cơ bản (toggle free/premium)

### Phase 2 (Sau MVP):
- Thanh toán PayOS
- Weekly Report email
- Admin CMS đầy đủ
- Dream Box 3 giai đoạn
- "Thử Thách Đặc Biệt" (star challenge mode)

### Phase 3 (Tương lai):
- Movers, KET, PET
- AI Speaking
- Mobile PWA

---

## 11. 🆕 FREEMIUM MODEL — KIẾN TRÚC

> Quyết định ngày 2026-04-28: Không bắt buộc login khi vào app.

### User Flow:

```
Vào luyenthi.io.vn
       ↓
HomePage (public) — xem danh sách tất cả bài
       ↓
Chọn bài luyện
       ├── Bài is_free = 1 → Làm bài ngay
       │       ↓
       │   Kết thúc bài
       │       ├── Chưa login → Hiện kết quả + CTA "Đăng nhập để lưu điểm"
       │       └── Đã login → Lưu quiz_attempts, cộng sao bình thường
       │
       └── Bài is_free = 0 (premium)
               ↓
           Chưa login → Paywall overlay: "Đăng nhập / Đăng ký để học"
           Đã login nhưng free tier → Upsell premium
           Đã login + premium → Làm bài bình thường
```

### Access Control Rules:

| Bài | Guest | Free User | Premium User |
|-----|-------|-----------|-------------|
| is_free = 1 | ✅ Làm được, không lưu | ✅ Làm + lưu điểm | ✅ Làm + lưu điểm |
| is_free = 0 | ❌ Paywall | ❌ Upsell | ✅ Làm + lưu điểm |
| Dashboard | ❌ Redirect login | ✅ | ✅ |
| Dream Box | ❌ Redirect login | ✅ | ✅ |
| Streak/Sao | ❌ Không lưu | ✅ | ✅ |

### API Middleware Logic:

```typescript
// Với mọi GET /api/quiz/:id
// 1. Lấy quiz config từ D1 (is_free)
// 2. Nếu is_free = 1 → trả data cho tất cả (kể cả guest)
// 3. Nếu is_free = 0 → require auth + check subscription

// Với POST /api/quiz/:id/submit
// 1. Nếu không có session → trả { ok: true, saved: false } (không lưu DB)
// 2. Nếu có session → lưu quiz_attempts bình thường
```

### Admin Panel — Quiz Config:

Admin vào `/admin` (protected bằng admin flag trong users):

- **Danh sách tất cả bài** (quiz_id, title, skill, part)
- **Toggle Free/Premium** — nút switch cho từng bài
- **Toggle Published/Draft** — ẩn bài chưa hoàn thiện
- **Sort order** — kéo thả thứ tự hiển thị

### Database — Bảng `quiz_configs` (thêm mới):

```sql
CREATE TABLE IF NOT EXISTS quiz_configs (
  quiz_id      TEXT PRIMARY KEY,
  is_free      INTEGER DEFAULT 0,     -- 0=premium, 1=free
  is_published INTEGER DEFAULT 1,     -- 0=draft, 1=published
  sort_order   INTEGER DEFAULT 0,
  created_at   INTEGER DEFAULT (unixepoch()),
  updated_at   INTEGER DEFAULT (unixepoch())
);
```

> Admin chạy lệnh migrate để thêm bảng này sau phase-01.

---

## 12. RULES KHI CODE

- KHÔNG force login ở landing page / bài free
- Paywall chỉ hiện khi: (1) bài premium + chưa login, hoặc (2) bài premium + free user
- Khi guest submit bài free → trả kết quả nhưng KHÔNG insert vào quiz_attempts
- Admin routes (`/api/admin/*`) phải check `users.is_admin = 1`
- KHÔNG hardcode danh sách bài free trong code — luôn đọc từ `quiz_configs`

---

*Cập nhật: 2026-04-28 — Thêm Freemium Model (mục 11, 12)*
