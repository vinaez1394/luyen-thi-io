# GitHub Issues — luyen-thi-io MVP
> Copy từng issue bên dưới và tạo trên GitHub với label tương ứng.
> Labels cần tạo: `phase`, `mvp`, `backend`, `frontend`, `content`, `infrastructure`

---

## Issue #1

**Title:** `[Phase 01] Foundation — D1 Schema + Wrangler Setup`
**Labels:** `phase`, `infrastructure`, `mvp`
**Assignees:** (để trống — ai nhận thì comment)

```
## Mục tiêu
Thiết lập xong infrastructure Cloudflare: D1 database với đầy đủ schema, R2 bucket, KV namespace.
Đây là nền móng của toàn bộ app — làm SAI ở đây = sửa rất đau sau.

## Công việc chính
- [ ] Cập nhật wrangler.json (thêm D1, R2, KV bindings)
- [ ] Tạo D1 database: `wrangler d1 create luyen-thi-db`
- [ ] Viết schema.sql đầy đủ (7 bảng)
- [ ] Apply schema lên D1
- [ ] Tạo R2 bucket: `wrangler r2 bucket create luyen-thi-content`
- [ ] Test route /api/health trả về { ok: true }

## Files sẽ tạo/sửa
- `wrangler.json`
- `src/worker/db/schema.sql`
- `src/worker/db/types.ts`
- `src/worker/routes/health.ts`

## Xem chi tiết
`plans/260428-1029-luyen-thi-io-mvp/phase-01-foundation.md`

## Tiêu chí hoàn thành
- `wrangler dev` chạy không lỗi
- `GET /api/health` trả về `{ ok: true }` và list tables
- 7 bảng tồn tại trong D1
```

---

## Issue #2

**Title:** `[Phase 02] Theme System + Design Tokens`
**Labels:** `phase`, `frontend`, `mvp`

```
## Mục tiêu
Xây dựng design system: 6 themes màu sắc, typography, spacing tokens.
Mọi màu sắc trong app đều phải qua CSS variables — không hardcode.

## Công việc chính
- [ ] Tạo themes.css với 6 themes (purple, ocean, sakura, forest, night, sunset)
- [ ] Tạo tokens.css (radius, spacing, typography, shadow)
- [ ] Tạo base.css (reset + font Nunito)
- [ ] ThemeProvider React context
- [ ] ThemePicker component (6 ô màu)

## Files sẽ tạo
- `src/react-app/styles/themes.css`
- `src/react-app/styles/tokens.css`
- `src/react-app/styles/base.css`
- `src/react-app/components/ui/ThemeProvider.tsx`
- `src/react-app/components/ui/ThemePicker.tsx`

## Lưu ý
- KHÔNG hardcode màu nào cả
- Font: Nunito từ Google Fonts
- Night theme là dark mode — check contrast

## Xem chi tiết
`plans/260428-1029-luyen-thi-io-mvp/phase-02-themes.md`
```

---

## Issue #3

**Title:** `[Phase 03] Auth — Google OAuth + Onboarding`
**Labels:** `phase`, `backend`, `frontend`, `mvp`

```
## Mục tiêu
Phụ huynh đăng nhập bằng Google → tạo user trong D1 → session → onboarding bé lần đầu.

## Công việc chính
- [ ] Route GET /api/auth/google (redirect Google)
- [ ] Route GET /api/auth/callback (exchange code, tạo user)
- [ ] Session management (JWT/KV)
- [ ] useAuth() hook
- [ ] LoginPage (nút Google lớn, đẹp)
- [ ] OnboardingPage (tên bé + avatar + theme)
- [ ] ProtectedRoute wrapper

## Env vars cần
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
SESSION_SECRET=...
```

## Xem chi tiết
`plans/260428-1029-luyen-thi-io-mvp/phase-03-auth.md`
```

---

## Issue #4

**Title:** `[Phase 04] Quiz Engine — Multiple Choice + Fill Blank`
**Labels:** `phase`, `frontend`, `backend`, `mvp`

```
## Mục tiêu
Core của app: QuizEngine đọc JSON từ R2 → render đúng dạng bài.
Phase này: Multiple Choice + Fill-in-blank.

## Công việc chính
### Backend
- [ ] GET /api/quiz/:quizId (đọc từ R2)
- [ ] POST /api/quiz/:quizId/submit (tính điểm + lưu D1)
- [ ] Logic tính sao (< 60% → 1 sao, 60–79% → 2, 80–89% → 3, 90%+ → 5)

### Frontend
- [ ] QuizEngine.tsx (đọc type → render đúng component)
- [ ] QuizHeader.tsx (progress bar + timer)
- [ ] InstructionBanner.tsx (hướng dẫn tiếng Việt)
- [ ] MultipleChoice.tsx (4 options, click chọn)
- [ ] FillBlank.tsx (text input)
- [ ] QuizResultScreen.tsx (sao bay animation + dream box update)

## Lưu ý quan trọng
- Tất cả buttons ≥ 48px height
- Màn hình kết quả: "Còn X sao nữa là đến [tên phần thưởng]!"

## Xem chi tiết
`plans/260428-1029-luyen-thi-io-mvp/phase-04-quiz-core.md`
```

---

## Issue #5

**Title:** `[Phase 05] Quiz Engine — Drag & Drop`
**Labels:** `phase`, `frontend`, `mvp`

```
## Mục tiêu
Thêm kéo thả vào Quiz Engine. PHẢI dùng dnd-kit, hoạt động trên mobile iOS Safari.

## ⚠️ Bắt buộc
`npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`
KHÔNG dùng HTML5 DnD API native.

## Công việc chính
- [ ] DragDropFill.tsx (kéo từ vào chỗ trống trong câu)
- [ ] DragDropMatch.tsx (nối 2 cột)
- [ ] Test trên iPhone Safari + Android Chrome

## Xem chi tiết
`plans/260428-1029-luyen-thi-io-mvp/phase-05-quiz-dnd.md`
```

---

## Issue #6

**Title:** `[Phase 06] Quiz Engine — Audio Player + Exam Timer`
**Labels:** `phase`, `frontend`, `mvp`

```
## Mục tiêu
AudioPlayer cho bài Listening (phát 2 lần như Cambridge) + Timer đếm ngược.

## Công việc chính
- [ ] AudioPlayer.tsx (play/pause, progress bar, 2-lần giới hạn)
- [ ] QuizTimer.tsx (countdown, cảnh báo đỏ khi < 10% thời gian)
- [ ] ModeSelector.tsx (Practice vs Exam mode)
- [ ] Load audio từ R2 URL

## Cloudflare Workers AI cho audio (thay voice actor)
Thêm vào wrangler.json: `"ai": { "binding": "AI" }`
Sau đó dùng: `c.env.AI.run('@cf/tts-1', { text: "...", lang: "en-GB" })`

## Xem chi tiết
`plans/260428-1029-luyen-thi-io-mvp/phase-06-quiz-audio.md`
```

---

## Issue #7

**Title:** `[Phase 07] Student Dashboard — Trang Chủ Bé`
**Labels:** `phase`, `frontend`, `backend`, `mvp`

```
## Mục tiêu
Trang đầu tiên bé thấy sau login: sao, streak, dream box mini, skill map, gợi ý bài hôm nay.

## Công việc chính
### Backend
- [ ] GET /api/student/:id/dashboard (1 JOIN query đủ data)
- [ ] GET /api/student/:id/recommendations (gợi ý bài theo skill thấp nhất)

### Frontend
- [ ] WelcomeHeader.tsx (avatar + tên + streak + sao)
- [ ] DreamBoxWidget.tsx (progress bar mini)
- [ ] SkillMap.tsx (3 kỹ năng, dạng progress bars)
- [ ] RecommendedLessons.tsx (grid 2-3 bài gợi ý)
- [ ] LessonCard.tsx (card bài học clickable)

## Tiêu chí
- Dashboard load < 500ms
- Đẹp với tất cả 6 themes

## Xem chi tiết
`plans/260428-1029-luyen-thi-io-mvp/phase-07-dashboard.md`
```

---

## Issue #8

**Title:** `[Phase 08] Dream Box + Email Approval Flow`
**Labels:** `phase`, `frontend`, `backend`, `mvp`

```
## Mục tiêu
Hộp Quà Ước Mơ: bé chọn phần thưởng → gửi email PH → PH confirm → Dream Box active.

## Env vars cần thêm
```
RESEND_API_KEY=re_...
FROM_EMAIL=no-reply@luyen-thi-io.vn
APP_URL=https://luyen-thi-io.workers.dev
```

## Công việc chính
### Backend
- [ ] POST /api/dream/create (tạo goal + generate token + gửi email)
- [ ] GET /api/dream/approve/:token (verify + update status)
- [ ] GET /api/dream/reject/:token (reject + redirect)
- [ ] Email HTML template đẹp (responsive)

### Frontend
- [ ] DreamBoxSetupPage.tsx (flow 3 bước)
- [ ] PresetImageGrid.tsx (50 ảnh curated)
- [ ] GoalTypePicker.tsx (sao / khiên / hoàn thành)
- [ ] DreamBoxFull.tsx (trang chi tiết + journey map)

## Lưu ý
- 1 dream goal active tại 1 thời điểm
- Token hạn 7 ngày
- PH approve cũng được từ Parent Dashboard (không chỉ email)

## Xem chi tiết
`plans/260428-1029-luyen-thi-io-mvp/phase-08-dreambox.md`
```

---

## Issue #9

**Title:** `[Phase 09] Avatar Pack + Profile Page`
**Labels:** `phase`, `frontend`, `mvp`

```
## Mục tiêu
12 SVG avatars dễ thương + trang hồ sơ bé có thể đổi avatar và theme.

## Công việc chính
- [ ] 12 SVG avatars (cartoon style, consistent)
  Mèo, Chó, Thỏ, Cáo, Gấu Panda, Kỳ Lân, Ếch, Sư Tử, Cánh Cụt, Bướm, Robot, Phi Hành Gia
- [ ] PUT /api/student/:id/profile (update avatar, theme)
- [ ] ProfilePage.tsx
- [ ] AvatarGrid.tsx (4x3 grid, click = chọn ngay)
- [ ] AvatarDisplay.tsx (dùng ở nhiều nơi, size sm/md/lg)

## Lưu ý
- Dùng SVG (không vỡ ảnh, load nhanh)
- Click avatar → cập nhật ngay cả header (optimistic update)

## Xem chi tiết
`plans/260428-1029-luyen-thi-io-mvp/phase-09-avatar.md`
```

---

## Issue #10

**Title:** `[Phase 10] Content — 10 Bài JSON Flyers Đầu Tiên`
**Labels:** `phase`, `content`, `mvp`

```
## Mục tiêu
Soạn 10 bài học JSON chất lượng cao. KHÔNG copy từ đề thi Cambridge thật.

## 10 bài cần tạo
Reading (5 bài):
- RW4-001, RW4-002: multiple-choice (Reading Part 4)
- RW3-001, RW3-002: drag-drop-fill (Reading Part 3)
- RW1-001: matching (Reading Part 1)

Listening (5 bài):
- L4-001, L4-002: audio-mc (Listening Part 4)
- L2-001, L2-002: audio-fill (Listening Part 2)
- L1-001: audio-mc (Listening Part 1)

## Công việc chính
- [ ] Soạn 5 bài Reading JSON
- [ ] Soạn 5 bài Listening script + generate audio (Workers AI)
- [ ] Validate JSON (script tự động)
- [ ] Upload lên R2
- [ ] Tạo index.json danh sách bài

## Có thể làm bất kỳ lúc nào (không phụ thuộc phase khác)

## Xem chi tiết
`plans/260428-1029-luyen-thi-io-mvp/phase-10-content.md`
```

---

## Issue #11

**Title:** `[Phase 11] Polish + Mobile Test + Launch Ready`
**Labels:** `phase`, `frontend`, `mvp`

```
## Mục tiêu
Kiểm tra toàn bộ trên thiết bị thật, sửa lỗi, thêm micro-animations, chuẩn bị launch.

## Công việc chính
- [ ] Test iPhone Safari, Android Chrome, iPad, Desktop
- [ ] Tất cả buttons ≥ 48px (chạy script scan)
- [ ] Dashboard load < 500ms
- [ ] Animation: sao bay vào Dream Box, confetti khi 90%+
- [ ] Không có console error trên production
- [ ] Mời 5–10 phụ huynh dùng thử beta

## Done = Sẵn sàng invite beta users 🚀

## Xem chi tiết
`plans/260428-1029-luyen-thi-io-mvp/phase-11-polish.md`
```

---

## Cách tạo Issues trên GitHub

1. Vào GitHub repo → tab **Issues**
2. Click **New Issue**
3. Copy title và body từng issue ở trên
4. Thêm labels tương ứng
5. Để Assignees trống (ai muốn làm thì comment "Tôi nhận phase này")

## Labels cần tạo
```
phase        → màu xanh lam
mvp          → màu đỏ
backend      → màu cam
frontend     → màu tím
content      → màu xanh lá
infrastructure → màu xám
question     → màu vàng
bug          → màu đỏ đậm
```
