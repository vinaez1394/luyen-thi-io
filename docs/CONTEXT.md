# 🧠 CONTEXT — luyen-thi-io
> ⚠️ AI PHẢI ĐỌC FILE NÀY TRƯỚC KHI BẮT ĐẦU BẤT KỲ TASK NÀO

---

## 1. DỰ ÁN LÀ GÌ?

**luyen-thi-io** là nền tảng luyện thi tiếng Anh Cambridge Flyers cho học sinh Việt Nam 9–12 tuổi.

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
Auth:       Google OAuth via Hono
Deploy:     Cloudflare Workers (wrangler)
DnD:        dnd-kit (KHÔNG dùng HTML5 DnD API)
Font:       Nunito (Google Fonts)
Theme:      CSS Custom Properties với data-theme attribute
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
│   │   │   ├── dashboard/  ← Trang chủ bé
│   │   │   ├── dream-box/  ← Hộp Quà Ước Mơ
│   │   │   └── ui/         ← Shared components
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── styles/
│   │       └── themes.css  ← 6 CSS themes
│   └── worker/             ← Hono backend
│       ├── index.ts
│       └── routes/
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

### JSON Schema chuẩn:

```json
{
  "id": "string",
  "title": "string",
  "skill": "listening | reading | writing",
  "level": "flyers | movers | ket | pet",
  "part": 1,
  "type": "multiple-choice",
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
- Quiz Engine (MC + DragDrop + FillBlank)
- Google OAuth + D1 setup
- Student dashboard (trang chủ bé)
- Dream Box + email approval
- Theme (3 cái) + Avatar (12 preset)
- 5–10 bài JSON Flyers

### Phase 2 (Sau MVP):
- Thanh toán PayOS
- Weekly Report email
- Admin CMS
- Dream Box 3 giai đoạn
- "Thử Thách Đặc Biệt" (star challenge mode)

### Phase 3 (Tương lai):
- Movers, KET, PET
- AI Speaking
- Mobile PWA

---

*Cập nhật: 2026-04-28*
