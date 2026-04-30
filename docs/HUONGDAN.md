# 📘 HƯỚNG DẪN DỰ ÁN — luyen-thi-io
> Tài liệu tổng quan đầy đủ cho owner, cộng tác viên và AI.
> Cập nhật lần cuối: 2026-04-30 | IA Restructure (Phase 01-06) hoàn thành — Dual Pathway, Onboarding, Game Integration

---

## 🎯 DỰ ÁN LÀ GÌ?

**luyen-thi-io** là nền tảng luyện tập cho học sinh Việt Nam 9–12 tuổi, hỗ trợ **2 lộ trình học**:
- 🇬🇧 **Cambridge** — Starters → Movers → Flyers → KET → PET
- 🏫 **Thi Lớp 6** — Toán Tư Duy / Tiếng Việt / Tiếng Anh / Khoa học

### Vấn đề giải quyết
- Trẻ em không được luyện đúng format thi → vào phòng thi bị bất ngờ
- Phụ huynh bận rộn không biết con đang tiến bộ thế nào
- Các nền tảng nước ngoài không có hướng dẫn tiếng Việt

### Đối tượng
- **Cambridge:** Phụ huynh có con 9–12 tuổi chuẩn bị thi Flyers
- **Lớp 6:** Học sinh lớp 4–5 chuẩn bị thi tuyển sinh lớp 6
- **Phụ:** Giáo viên giao bài tập cho học sinh

---

## 🏆 4 USP CỐT LÕI (Tại sao phụ huynh trả tiền)

| # | Tính năng | Thông điệp |
|---|-----------|-----------|
| 🥇 | **Báo cáo tuần tự động tiếng Việt** | *"Biết chính xác con yếu phần nào mỗi cuối tuần"* |
| 🥈 | **Đúng format thi + hướng dẫn tiếng Việt** | *"Vào phòng thi như đã từng làm rồi"* |
| 🥉 | **Chẩn đoán điểm yếu tự động** | *"Học đúng chỗ, không lãng phí thời gian"* |
| 🏅 | **Hộp Quà Ước Mơ** | *"Kết nối ba mẹ và con, tạo động lực dài hạn"* |

---

## 🗺️ SITEMAP CHI TIẾT (Cập nhật 2026-04-30 — IA Restructure)

### Cấu trúc URL

```
luyenthi.io.vn/
│
├── /                          ← Trang chủ (HomePage)
│   ├── Hero section
│   ├── HomeHangman widget     ← Game Hangman nhanh (Cambridge word list)
│   └── Danh sách bài nổi bật  ← showOnHome: true
│
├── /learn                     ← Chọn lộ trình học (PathwaySelectionPage)
│   ├── Card: 🇬🇧 Cambridge
│   └── Card: 🏫 Thi Lớp 6
│
├── /login                     ← Đăng nhập (LoginPage)
├── /register                  ← Đăng ký email (RegisterPage)
├── /onboarding                ← [Auth Required] Thiết lập hồ sơ bé (OnboardingPage)
│   Step 1: Nhập tên
│   Step 2: Chọn avatar (12 preset)
│   Step 3: Chọn lớp (3 / 4 / 5)
│   Step 4: Chọn lộ trình (Cambridge / Lớp 6)
│   Step 5: Chọn theme màu (6 themes)
│   → Sau onboarding: redirect /cambridge hoặc /lop6
│
├── /dashboard                 ← [Auth Required] Dashboard tổng quát
│   └── TodayMissions widget   ← 3 bài gợi ý theo pathway + grade
│
├── /cambridge                 ← Trang lộ trình Cambridge (CambridgePage)
│   ├── /cambridge/starters    ← Sắp có (SubjectPage — available: false)
│   ├── /cambridge/movers      ← Sắp có (available: false)
│   ├── /cambridge/flyers      ← Đang có (SubjectPage — available: true)
│   │   ├── /cambridge/flyers/rw001   ← Quiz Reading Part 4 (QuizPage)
│   │   ├── /cambridge/flyers/rw002   ← Quiz Reading Part 3
│   │   ├── /cambridge/flyers/rw003   ← Quiz Reading Part 1
│   │   ├── /cambridge/flyers/l001    ← Quiz Listening Part 1
│   │   ├── /cambridge/flyers/l002    ← Quiz Listening Part 4
│   │   └── /cambridge/flyers/l003    ← Quiz Listening Part 2
│   ├── /cambridge/ket         ← Sắp có (available: false)
│   ├── /cambridge/pet         ← Sắp có (available: false)
│   └── /cambridge/ielts       ← Sắp có (available: false)
│
├── /lop6                      ← Trang lộ trình Lớp 6 (Lop6Page)
│   ├── /lop6/toan             ← Nhóm Toán Tư Duy (SubjectPage — available: true)
│   │   ├── /lop6/toan/math-l1-p1   ← Bài 1 (free, unlocks_game: hangman)
│   │   ├── /lop6/toan/math-l1-p2   ← Bài 2 (free)
│   │   ├── /lop6/toan/math-l1-p3   ← Bài 3 (free)
│   │   ├── /lop6/toan/math-l1-p4   ← Bài 4 (free)
│   │   ├── /lop6/toan/math-l1-p5   ← Bài 5 (free)
│   │   ├── /lop6/toan/math-l1-p6   ← Bài 6 (premium)
│   │   ├── /lop6/toan/math-l1-p7   ← Bài 7 (premium)
│   │   ├── /lop6/toan/math-l1-p8   ← Bài 8 (premium)
│   │   ├── /lop6/toan/math-l1-p9   ← Bài 9 (premium, grade 5-6)
│   │   └── /lop6/toan/math-l1-p10  ← Bài 10 (premium, grade 5-6)
│   ├── /lop6/tieng-viet       ← Sắp có (available: false)
│   ├── /lop6/tieng-anh        ← Sắp có (available: false)
│   └── /lop6/khoa-hoc         ← Sắp có (available: false)
│
└── /quiz/:id                  ← Legacy URL (vẫn hoạt động, không redirect)
    └── VD: /quiz/MATH-L1-P1  ← Dùng cho backward compatibility
```

### URL Conventions (Quy tắc đặt URL)

| Loại | Pattern | Ví dụ |
|------|---------|-------|
| Lộ trình hub | `/cambridge` hoặc `/lop6` | Trang chọn nhóm môn |
| Nhóm môn | `/:pathway/:group` | `/cambridge/flyers`, `/lop6/toan` |
| Quiz | `/:pathway/:group/:quizId` | `/cambridge/flyers/rw001` |
| Legacy quiz | `/quiz/:id` | `/quiz/MATH-L1-P1` |

### Quyền truy cập (Access Rules)

| Route | Guest | Logged in | Onboarded |
|-------|-------|-----------|-----------|
| `/` | ✅ | ✅ | ✅ |
| `/learn` | ✅ | ✅ | ✅ |
| `/cambridge` | ✅ | ✅ | ✅ |
| `/lop6` | ✅ | ✅ | ✅ |
| Bài miễn phí (`is_free: true`) | ✅ | ✅ | ✅ |
| Bài premium | ❌ → paywall | ❌ → paywall | ✅ nếu đăng ký |
| `/onboarding` | ❌ → login | ✅ | ✅ |
| `/dashboard` | ❌ → login | ✅ | ✅ |

---

## ⚙️ STACK KỸ THUẬT

```
Frontend:   React 19 + Vite          ← KHÔNG dùng Next.js
Backend:    Hono on Cloudflare Workers
Database:   Cloudflare D1 (SQLite)
Storage:    Cloudflare R2             ← JSON bài, audio, images
Cache:      Cloudflare KV             ← Session, theme cache
Email:      Resend.com               ← Free 3,000/tháng
Audio AI:   Cloudflare Workers AI    ← Generate audio tự động
Auth:       Google OAuth via Hono
DnD lib:    dnd-kit                  ← KHÔNG dùng HTML5 DnD API
Font:       Nunito (Google Fonts)    ← Tròn, dễ thương cho trẻ
Theme:      CSS Custom Properties     ← data-theme attribute
Deploy:     Cloudflare Workers (wrangler)
```

> **Tại sao không dùng Next.js?** Hono + React đã là full-stack đủ mạnh. Next.js thêm complexity không cần thiết khi đang chạy tại Cloudflare Edge. Stack hiện tại được khởi tạo từ template chính thức của Cloudflare.

---

## 🗂️ CẤU TRÚC FILE DỰ ÁN

```
luyen-thi-io/
├── src/
│   ├── react-app/                   ← Frontend React
│   │   ├── components/
│   │   │   ├── layout/              ← App Shell
│   │   │   │   ├── AppLayout.tsx    ← Wrapper toàn app
│   │   │   │   ├── GlobalHeader.tsx ← Sticky top: logo, nav, auth
│   │   │   │   ├── GlobalFooter.tsx ← Ẩn trên /quiz routes
│   │   │   │   ├── MobileBottomNav.tsx ← 4 tabs, chỉ ≤768px
│   │   │   │   └── QuizLayout.tsx   ← Sub-header + progress bubbles
│   │   │   ├── quiz/                ← Quiz Engine
│   │   │   │   ├── QuizEngine.tsx
│   │   │   │   ├── MultipleChoice.tsx
│   │   │   │   ├── FillBlank.tsx
│   │   │   │   └── DragDropMatch.tsx
│   │   │   ├── vocabulary/          ← Word Tooltip + Hangman
│   │   │   │   ├── AnnotatedText.tsx   ← Render segments có tooltip
│   │   │   │   ├── TooltipWord.tsx
│   │   │   │   ├── HangmanGame.tsx     ← Game chính
│   │   │   │   └── HomeHangman.tsx     ← [Phase 05] Widget standalone trang chủ
│   │   │   ├── dashboard/           ← Dashboard components
│   │   │   │   ├── TodayMissions.tsx   ← [Phase 04] 3 bài gợi ý theo pathway+grade
│   │   │   │   ├── WelcomeHeader.tsx
│   │   │   │   └── SkillMap.tsx
│   │   │   ├── onboarding/          ← [Phase 04] Onboarding components
│   │   │   │   ├── GradePicker.tsx     ← Chọn lớp 3/4/5
│   │   │   │   └── PathwayPicker.tsx   ← Chọn Cambridge/Lớp 6
│   │   │   └── ui/                  ← Shared: Button, Card...
│   │   ├── pages/
│   │   │   ├── HomePage.tsx
│   │   │   ├── PathwaySelectionPage.tsx  ← [Phase 02] /learn
│   │   │   ├── CambridgePage.tsx         ← [Phase 02] /cambridge
│   │   │   ├── Lop6Page.tsx              ← [Phase 02] /lop6
│   │   │   ├── SubjectPage.tsx           ← [Phase 02] /:pathway/:group
│   │   │   ├── QuizPage.tsx              ← /:pathway/:group/:id
│   │   │   ├── OnboardingPage.tsx        ← [Phase 04] 5-step wizard
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── data/
│   │   │   └── subjects.ts               ← [Phase 01] Data môn học + lesson
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useDashboard.ts           ← [Phase 04] Includes todayLessons
│   │   │   └── useVocabulary.ts
│   │   └── styles/
│   │       ├── themes.css               ← 6 CSS themes
│   │       ├── tokens.css               ← Design tokens
│   │       └── base.css
│   └── worker/                      ← Hono backend
│       ├── index.ts
│       ├── migrations/
│       │   ├── 0001_initial.sql
│       │   ├── 0002_vocabulary.sql
│       │   └── 0003_add_grade_pathway.sql ← [Phase 04] thêm cột mới
│       └── routes/
│           ├── auth.ts
│           ├── quiz.ts
│           ├── student.ts        ← [Phase 05] POST /stars endpoint
│           ├── vocabulary.ts
│           └── dream.ts
├── content/                         ← Bài học JSON (upload lên R2)
│   ├── math/
│   │   └── MATH-L1-P{1..10}.json
│   └── flyers/
│       ├── RW001.json, RW002.json, RW003.json
│       └── L001.json, L002.json, L003.json
├── public/avatars/                  ← 12 SVG avatars
├── docs/
├── plans/
│   ├── 260428-1029-luyen-thi-io-mvp/  ← Plan gốc (13 phases)
│   └── 260430-1350-ia-restructure/    ← [MỚI] IA Restructure 6 phases (✅ XONG)
└── wrangler.json
```


---

## 🎮 QUIZ ENGINE — TRÁI TIM CỦA DỰ ÁN

### Nguyên tắc: 1 Engine + nhiều chế độ

```
File JSON → QuizEngine đọc "type" → Render đúng component
```

Giống như rạp chiếu phim: rạp (engine) không đổi, chỉ đổi phim (JSON).

### Các dạng bài tập

| type trong JSON | Hiển thị | Kỹ năng |
|-----------------|---------|---------|
| `multiple-choice` | 4 ô tròn chọn 1 | Reading/Listening |
| `multiple-choice-image` | 4 ảnh chọn 1 | Reading/Listening |
| `drag-drop-fill` | Kéo từ vào chỗ trống trong câu | Reading |
| `drag-drop-match` | Kéo nối 2 cột | Reading |
| `fill-blank` | Gõ chữ vào ô trống | Writing/Reading |
| `audio-mc` | Nghe audio 2 lần + chọn đáp án | Listening |

### JSON Schema chuẩn
```json
{
  "id": "RW4-001",
  "title": "Ten bai",
  "skill": "reading",
  "level": "flyers",
  "part": 4,
  "type": "multiple-choice",
  "ui_language": "en",
  "audio_url": "optional",
  "instructions_vi": "Huong dan bang tieng Viet cho be",
  "questions": [
    {
      "id": "q1",
      "prompt": [
        { "text": "Find the " },
        { "text": "sequence", "tooltip": { "vi": "day so", "ipa": "sikwens" }},
        { "text": " in the list" }
      ],
      "options": ["A", "B", "C", "D"],
      "correct": "A",
      "explanation_vi": "Giai thich tai sao dung (tieng Viet)"
    }
  ]
}
```

**Luu y JSON Schema moi (Phase 0.5+):**
- `ui_language: "en"` -> nut "Next ->", "<- Previous", "Submit"
- `ui_language: "vi"` hoac khong co -> tieng Viet ("<- Cau truoc", "Cau tiep ->")
- `prompt` co the la **string** (cu, backward compatible) hoac **array segments** (moi, ho tro Word Tooltip)
- `tooltip` duoc dich san trong JSON, khong can goi API tu dien online

---

## 🗄️ DATABASE SCHEMA (Cloudflare D1)

### Các bảng chính

```
users               ← Phụ huynh đăng ký bằng Google / Email
student_profiles    ← Hồ sơ bé
                        + current_grade   INTEGER  [Phase 04] Lớp hiện tại (3/4/5)
                        + selected_pathway TEXT     [Phase 04] 'cambridge'|'lop6'
                        + total_stars     INTEGER  Tổng sao tích lũy
student_stats       ← Thống kê (streak, skill levels)
                        + last_quiz_id    TEXT     [Phase 05] ID bài làm gần nhất
dream_goals         ← Hộp Quà Ước Mơ
quiz_attempts       ← Kết quả từng bài làm
daily_activity      ← Theo dõi streak hàng ngày
subscriptions       ← Gói đăng ký trả phí
vocabulary_words    ← Kho từ toàn hệ thống (word, vi_meaning, ipa, level)
student_vocabulary  ← Theo dõi từng bé (times_looked_up, is_mastered...)
```

### Quy tắc quan trọng về D1
- ✅ Skill levels lưu thành **cột INTEGER riêng** (không dùng JSON) → có thể WHERE nhanh
- ✅ daily_activity dùng **composite PK** (student_id + date_key) → query streak nhanh
- ✅ Timestamps luôn là INTEGER (unixepoch) — không dùng TEXT ISO date
- ❌ KHÔNG dùng `JSON_EXTRACT` trong WHERE clause → full table scan chậm

---

## 📡 API ENDPOINTS (Cloudflare Workers + Hono)

### Auth
| Method | URL | Mô tả |
|--------|-----|---------|
| GET | `/api/auth/google` | Redirect đến Google OAuth |
| GET | `/api/auth/callback` | OAuth callback, tạo session |
| POST | `/api/auth/register` | Đăng ký bằng email/password |
| POST | `/api/auth/login` | Đăng nhập email/password |
| GET | `/api/auth/logout` | Xóa session |
| GET | `/api/auth/me` | Thông tin user hiện tại |

### Student
| Method | URL | Mô tả | Phase |
|--------|-----|---------|-------|
| POST | `/api/student/profile` | Tạo/cập nhật hồ sơ bé (name, avatar, grade, pathway, theme) | 04 |
| POST | `/api/student/stars` | Cộng dồn sao sau Hangman (`stars`, `source`, `quiz_id`) | 05 |

### Quiz
| Method | URL | Mô tả |
|--------|-----|---------|
| GET | `/api/quiz/:id` | Lấy nội dung bài quiz (từ R2) |
| POST | `/api/quiz/:id/submit` | Nộp bài, tính điểm, lưu kết quả |

### Vocabulary
| Method | URL | Mô tả |
|--------|-----|---------|
| GET | `/api/vocab/lookup?word=X` | Tra cứu từ (kèm IPA, nghĩa Việt) |

---

## 🎨 HỆ THỐNG GIAO DIỆN

### 6 Themes màu sắc
```
purple (mặc định) | ocean | sakura | forest | night | sunset
```

Đổi theme: `document.documentElement.setAttribute('data-theme', 'ocean')` → toàn app đổi màu ngay lập tức, không reload.

### Design Rules cho trẻ 9–12 tuổi
```
✅ Touch target: min 48×48px (tất cả buttons)
✅ Font: Nunito, tối thiểu 14px
✅ Border radius: tất cả cards ≥ 20px
✅ Màu sắc: qua CSS variables, KHÔNG hardcode
✅ Animation: 200–400ms ease-out
✅ Feedback âm thanh khi chọn đáp án
✅ Spacing: bội số 8px
❌ Không dùng màu đỏ harsh cho đáp án sai (dùng đỏ nhạt #F87171)
❌ Không popup quảng cáo trong lúc làm bài
❌ Không có chữ < 14px
```

### Font Google Fonts
```html
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
```

---

## ⭐ HỆ THỐNG SAO VÀ GAMIFICATION

### Cách kiếm sao
| Hành động | Sao nhận |
|-----------|---------|
| Hoàn thành bài < 60% đúng | ⭐ 1 |
| Hoàn thành bài 60–79% đúng | ⭐⭐ 2 |
| Hoàn thành bài 80–89% đúng | ⭐⭐⭐ 3 |
| Hoàn thành bài 90–100% đúng | ⭐⭐⭐⭐⭐ 5 |
| Học 3 ngày liên tiếp | Bonus ⭐⭐ |
| Học 7 ngày liên tiếp | Bonus ⭐⭐⭐⭐⭐ |
| Hoàn thành full mock test | ⭐⭐⭐⭐⭐⭐⭐ 7 |

### Quy tac sao (cap nhat 2026-04-29)
- **Sao KHONG bao gio het han**
- Sao chi bi tru trong **1 truong hop duy nhat**: tra tu Word Tooltip sau khi het luot mien phi
  - Mac dinh: 3 luot mien phi/bai (co the cau hinh lai)
  - Tu luot thu 4: tru 1 sao/luot, cho den khi het sao thi khoa
  - Guest: xem duoc tooltip nhung KHONG luu vocabulary
- Tat ca truong hop khac (sai dap an, thoat bai...) -> khong tru sao

### 3 loại điểm
| Biểu tượng | Ý nghĩa | Kiếm bằng cách |
|-----------|---------|--------------|
| ⭐ Sao | Tích lũy hàng ngày | Mỗi bài học |
| 🛡️ Khiên | Kết quả mock test | Full test 1–5 khiên |
| 🏅 Huy hiệu | Milestone đặc biệt | Achievement lớn |

---

## 📦 HỘP QUÀ ƯỚC MƠ (Dream Box) — USP #4

### Cách hoạt động
```
1. Bé chọn phần thưởng (kho preset 50 ảnh hoặc tự gõ tên)
2. Bé nhấn "💌 Gửi cho ba/mẹ"
3. Hệ thống gửi email đến phụ huynh qua Resend.com
4. Phụ huynh nhấn "✅ Đồng ý" trong email
5. Dream Box xuất hiện trên Dashboard bé mỗi ngày
6. Mỗi bài làm xong → sao bay vào Dream Box
7. Đạt mục tiêu → email thông báo phụ huynh trao phần thưởng
```

### Các loại mục tiêu
- Tích lũy đủ N sao (VD: 100 sao)
- Đạt đủ N khiên từ mock test (VD: 15 khiên)
- Hoàn thành toàn bộ khóa học

### Lưu ý quan trọng
- Chỉ 1 Dream Box active tại 1 thời điểm
- Email approval token hạn 7 ngày
- Phụ huynh cũng có thể approve từ Parent Dashboard (fallback)
- Phase 2: chia thành tối đa 3 giai đoạn (milestone nhỏ → vừa → lớn)

---

## 🔊 AUDIO VÀ LISTENING

### Cloudflare Workers AI — Tự generate audio (MIỄN PHÍ)
```typescript
// Thay vì thuê voice actor $50–100, dùng Workers AI
const audio = await c.env.AI.run('@cf/tts-1', {
  text: "Where does Tom have breakfast?",
  lang: 'en-GB'  // British English
});
// Upload lên R2 → lưu URL vào JSON
```

Thêm vào `wrangler.json`:
```json
{ "ai": { "binding": "AI" } }
```

### Cambridge Listening format
- Audio phát **2 lần** (đúng format thi thật)
- Exam mode: sau 2 lần tự động lock không play thêm
- Practice mode: replay bao nhiêu lần cũng được

---

## 🚦 TIẾN ĐỘ DỰ ÁN (Cập nhật 2026-04-30)

### ✅ IA Restructure — 6 phases (HOÀN THÀNH)

| Phase | Tên | Trạng thái | Nội dung chính |
|-------|-----|-----------|----------------|
| **IA-01** | Schema Foundation | ✅ Hoàn thành | `subjects.ts`: Subject/Lesson type, pathway/group |
| **IA-02** | Routing Architecture | ✅ Hoàn thành | `/cambridge`, `/lop6`, `/learn`, `SubjectPage` |
| **IA-03** | Navigation & Breadcrumbs | ✅ Hoàn thành | Breadcrumb, nav lộ trình trong QuizLayout |
| **IA-04** | Onboarding & Dashboard | ✅ Hoàn thành | 5-step wizard, `TodayMissions`, D1 migration 0003 |
| **IA-05** | Game Integration | ✅ Hoàn thành | `POST /stars`, HomeHangman dynamic words |
| **IA-06** | Testing & Deploy | ✅ Hoàn thành | Build + push `dev` → Cloudflare |

### MVP Original — 11 Phases

| Phase | Tên | Trạng thái |
|-------|-----|-----------|
| **01** | Foundation — D1 Schema | ✅ Hoàn thành |
| **02** | Theme System + Design Tokens | ✅ Hoàn thành |
| **03** | Auth — Google OAuth + Email | ✅ Hoàn thành |
| **04** | Quiz Engine — MC + FillBlank | ✅ Hoàn thành |
| **0.5** | App Shell — Layout Framework | ✅ Hoàn thành |
| **05** | Quiz Engine — Drag & Drop | ✅ Hoàn thành (`DragDropMatch.tsx`) |
| **4.5** | Word Tooltip + Hangman | ✅ Hoàn thành |
| **06** | Quiz Engine — Audio + Timer | ⏳ Chưa làm |
| **07** | Student Dashboard (full stats) | ⏳ Chưa làm |
| **08** | Dream Box + Email Approval | ⏳ Chưa làm |
| **09–11** | Avatar, Nội dung JSON, Polish | ⏳ Chưa làm |

### 🔜 Ưu tiên tiếp theo
1. Quiz Audio (Listening Flyers — Cloudflare Workers AI)
2. Weekly Report Email (Resend.com, mỗi Chủ nhật)
3. Dream Box + Email confirmation flow
4. Thanh toán PayOS (Free/Premium thật sự)
5. Thêm bài mới: Flyers Reading + Listening JSON

### Sau MVP
- **Phase 2:** PayOS, Weekly Report, Admin CMS, Dream Box 3 giai đoạn
- **Phase 3:** Movers/KET/PET, AI Speaking, Mobile PWA

---

## ⚠️ RỦI RO & NHỮNG ĐIỀU ĐÃ QUYẾT ĐỊNH

### Rủi ro quan trọng nhất

| Rủi ro | Mức độ | Giải pháp |
|--------|--------|---------|
| **Bản quyền Cambridge** | 🔴 Cao | Tự soạn đề "Cambridge-style", KHÔNG copy đề thật |
| **Drag & Drop lỗi iOS Safari** | 🟡 Trung bình | Dùng `dnd-kit`, test thật trên iPad |
| **Thanh toán VN** | 🟡 Trung bình | MVP: nhận chuyển khoản thủ công → Phase 2: PayOS |
| **Burnout solo dev** | 🟡 Trung bình | Ship sớm, lấy feedback thật, không cầu toàn |

### Các quyết định đã chốt (KHÔNG thay đổi)

| Quyet dinh | Chi tiet |
|-----------|----------|
| Stack | Vite + React + Hono + Cloudflare (khong doi Next.js) |
| Database | D1 + R2 hybrid, khong can VPS |
| Theme | 6 themes, CSS variables, doi instant |
| Dream Box | Be chon -> Email PH -> PH confirm |
| Sao | Khong het han. CHI tru khi tra tu Word Tooltip sau het luot mien phi |
| Avatar | 12-20 preset SVG, mien phi het |
| Thanh toan | Thu cong trong MVP |
| Audio | Cloudflare Workers AI (free tier) thay voice actor |
| App Shell | GlobalHeader (sticky) + QuizLayout (sub-header) + MobileBottomNav |
| Word Tooltip | Annotated segments trong JSON, 3 luot mien phi/bai, sau do tru sao |
| Hangman | 5 tu/session, 4/5 +1 sao, 5/5 +2 sao, mastery 2 lan dung (2 session khac) |

---

## 📧 EMAIL SYSTEM (Resend.com)

Có 2 loại email trong dự án:

| Email | Khi nào gửi | Người nhận |
|-------|------------|-----------|
| Dream Box approval | Bé nhấn "Gửi cho ba/mẹ" | Phụ huynh |
| Dream Box achieved | Bé đạt mục tiêu | Phụ huynh |
| Weekly Report | Mỗi Chủ nhật | Phụ huynh |

**Setup Resend:**
```
RESEND_API_KEY=re_...
FROM_EMAIL=no-reply@luyen-thi-io.vn
```

---

## 🔐 BIẾN MÔI TRƯỜNG (Env Vars)

Lưu trong file `.dev.vars` (LOCAL, không commit):
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_REDIRECT_URI=https://luyen-thi-io.workers.dev/api/auth/callback
SESSION_SECRET=random-32-char-string
RESEND_API_KEY=re_...
FROM_EMAIL=no-reply@luyen-thi-io.vn
APP_URL=https://luyen-thi-io.workers.dev
```

Production: upload lên Cloudflare Dashboard → Workers & Pages → Settings → Variables.

---

## 💰 PRICING DỰ KIẾN

| Gói | Giá | Nội dung |
|-----|-----|---------|
| **Free** | 0đ | 5 bài thử, không báo cáo |
| **Basic** | 99k/tháng | Unlimited bài Flyers, báo cáo tuần |
| **Premium** | 199k/tháng | Basic + Phân tích điểm yếu + Mock test |
| **Family** | 299k/tháng | 2 trẻ + tất cả Premium |

> 199k/tháng < 1 buổi học thêm (100–200k). Dễ justify với phụ huynh.

---

## 🚀 BƯỚC TIẾP THEO — TIẾP TỤC BUILD

### Tiến độ hiện tại (2026-04-29)
```
Phase 01 (Foundation)   XONG
Phase 02 (Themes)       XONG
Phase 03 (Auth)         XONG
Phase 04 (Quiz Engine)  XONG
Phase 0.5 (App Shell)   XONG
Phase 05 (Drag & Drop)  <-- TIEP THEO
Phase 06 (Audio)        cho
Phase 4.5 (Vocabulary)  cho Phase 05+06 xong
Phase 07-11             cho
```

### Lệnh chạy dev
```bash
npm run dev
# URL: http://localhost:5174/
# Bai mau dang hoat dong: http://localhost:5174/quiz/MATH-L1-P1
```

### Nhắc AI đúng cách
Mỗi session mới, nói với AI:
> *"Đọc `docs/CONTEXT.md`, `docs/RULES.md`, `docs/SPEC-APP-SHELL.md` và phase file tương ứng trước khi bắt đầu."*

### Spec moi can doc
- `docs/SPEC-APP-SHELL.md` — thiet ke App Shell (da xong)
- `docs/SPEC-WORD-TOOLTIP-HANGMAN.md` — thiet ke Word Tooltip + Hangman (Phase 4.5)

---

## 🖼️ APP SHELL — LAYOUT FRAMEWORK (Phase 0.5 — XONG)

> Spec day du: `docs/SPEC-APP-SHELL.md`

### Kien truc 2 tang

```
App.tsx
├── <AppLayout>              <- Tang 1: moi trang deu co
│   ├── <GlobalHeader />     <- Sticky top, 64px
│   ├── <MobileBottomNav />  <- Chi hien <= 768px, an tren /quiz
│   ├── {children}           <- Noi dung trang
│   └── <GlobalFooter />     <- An tren /quiz routes
│
└── Khi vao /quiz/:id, QuizPage tu render them:
    └── <QuizLayout>         <- Tang 2: chi trong bai
        ├── QuizSubHeader    <- Breadcrumb, progress bubbles, X exit
        └── <QuizEngine />
```

### GlobalHeader (co mat moi noi)
| Thanh phan | Mu c dich |
|-----------|----------|
| Logo "Luyen Thi" | Click ve trang chu |
| Nav links (desktop) | Trang chu / Bai hoc / Tien do |
| Stars | Tong sao cua be (chi khi da login) |
| Theme switcher | Doi mau 6 themes ngay lap tuc |
| Avatar + dropdown | Profile / Cai dat / Dang xuat |
| Hamburger | Mo drawer menu (mobile) |

### QuizSubHeader (chi trong bai)
| Thanh phan | Mu c dich |
|-----------|----------|
| Breadcrumb | Trang chu > Mon hoc |
| Ten bai | Hien thi ro bai dang lam |
| Progress bubbles | Moi cham = 1 cau (xanh = dang lam, la = da tra loi) |
| "Cau X / Y" | Vi tri hien tai |
| Nut thoat X | Mo dialog xac nhan truoc khi thoat |

### Quy tac ngon ngu UI
- Bai tieng Anh (`skill: reading/listening/writing`) -> button "Next ->", "<- Previous", "Submit"
- Bai Toan/Viet (`skill: math`) -> button "<- Cau truoc", "Cau tiep ->", "Nop bai"

---

## 📖 WORD TOOLTIP + HANGMAN VOCABULARY (Phase 4.5 — Chua lam)

> Spec day du: `docs/SPEC-WORD-TOOLTIP-HANGMAN.md`

### Vong lap hoc tu vung
```
[Quiz] -> Tra tu (Word Tooltip) -> mat sao
               |
       [Vocabulary List]
               |
       [Hangman Game] -> kiem lai sao + tu "tot nghiep"
```

### Word Tooltip
- Tu co gach chan cham cham: click/tap -> hien nghia tieng Viet + IPA
- 3 luot mien phi/bai (co the cau hinh lai)
- Tu luot thu 4: tru 1 sao/luot den khi het sao
- Guest: xem duoc nhung KHONG luu vocabulary
- Tu da tra -> tu dong luu vao danh sach can on

### Hangman Game
- 5 tu/session
- Chon theo thu tu uu tien: Review list -> tu trong bai -> Cambridge word list
- Scoring: 5/5 dung +2 sao | 4/5 dung +1 sao | <=3/5 = 0 sao
- Mastery: dung 2 lan trong 2 session khac nhau -> tu "tot nghiep" (xoa khoi danh sach can on)
- Xuat hien: sau ket qua bai (neu co tu moi) + Dashboard widget

### Bang DB moi (Phase 4.5)
```sql
vocabulary_words:   id, word, vi_meaning, ipa, source_quiz_id, level
student_vocabulary: id, student_id, word_id, times_looked_up,
                    times_correct_hangman, is_mastered, last_seen_at
```

---

## 🤝 CỘNG TÁC NHIỀU NGƯỜI VÀ GITHUB


### GitHub là gì? (Giải thích đơn giản)

Hình dung GitHub như **kho lưu trữ chung trên internet** cho code dự án:
- Code được lưu ở **2 nơi**: máy tính của anh (local) và kho trên internet (GitHub)
- Mỗi khi code xong, anh "gửi" code lên kho chung → người khác "lấy" về máy họ
- Nếu 2 người cùng sửa 1 file → có thể bị "xung đột" (conflict) → cần giải quyết

### Khái niệm cần biết (dùng từ đời thường)

| Từ kỹ thuật | Hiểu đơn giản là |
|------------|-----------------|
| `branch` | Bản sao riêng của dự án để làm thử, không ảnh hưởng bản chính |
| `main` | Bản chính — code ổn định, đang chạy thật |
| `dev` | Bản tích hợp — nơi mọi người merge code vào trước khi đưa lên main |
| `commit` | Lưu lại thay đổi (như Ctrl+S nhưng có ghi chú) |
| `push` | Gửi code từ máy tính lên GitHub |
| `pull` | Lấy code mới nhất từ GitHub về máy |
| `merge` | Gộp code của 2 người/branch lại thành 1 |
| `Pull Request` | Yêu cầu "duyệt và nhập" code của mình vào bản chính |

---

## 🖥️ SETUP GITHUB — MÁY TÍNH HIỆN TẠI (MÁY ANH)

> Trạng thái hiện tại: code đang ở branch `main`, đã kết nối với GitHub tại
> `https://github.com/vinaez1394/luyen-thi-io`

### Bước 1: Lưu tất cả file mới lên GitHub

Mở terminal trong VS Code (Ctrl + \`) rồi gõ từng lệnh:

```bash
# Báo git: "Lưu tất cả file mới và file đã sửa"
git add .

# Ghi chú: "Hôm nay mình đã làm gì"
git commit -m "docs: thêm CONTEXT, RULES, HUONGDAN, CONTRIBUTING, plans"

# Gửi lên GitHub
git push origin main
```

✅ **Kiểm tra:** Vào `https://github.com/vinaez1394/luyen-thi-io` — thấy các file mới là OK.

---

### Bước 2: Tạo branch `dev` (nơi mọi người cộng tác)

```bash
# Tạo branch dev (copy từ main)
git checkout -b dev

# Gửi branch dev lên GitHub
git push origin dev
```

✅ **Kiểm tra:** Vào GitHub → thấy có 2 nhánh: `main` và `dev` ở góc trên bên trái repo.

---

### Bước 3: Setup Labels trên GitHub (để phân loại Issues)

1. Vào `https://github.com/vinaez1394/luyen-thi-io/labels`
2. Nhấn **"New label"** và tạo từng label:

| Tên label | Màu | Ý nghĩa |
|-----------|-----|---------|
| `phase` | `#0075ca` (xanh lam) | Đánh dấu các issue theo phase |
| `mvp` | `#e11d48` (đỏ) | Tính năng bắt buộc trong MVP |
| `backend` | `#f97316` (cam) | Công việc phía server |
| `frontend` | `#7c3aed` (tím) | Công việc giao diện |
| `content` | `#16a34a` (xanh lá) | Soạn nội dung JSON, audio |
| `infrastructure` | `#6b7280` (xám) | Setup hạ tầng, config |
| `question` | `#fbbf24` (vàng) | Câu hỏi cần thảo luận |
| `bug` | `#dc2626` (đỏ đậm) | Lỗi cần sửa |

---

### Bước 4: Tạo 11 GitHub Issues

1. Mở file `docs/GITHUB-ISSUES.md` trong dự án
2. Copy từng issue một
3. Vào `https://github.com/vinaez1394/luyen-thi-io/issues/new`
4. Dán vào, thêm labels tương ứng → nhấn **"Submit new issue"**
5. Làm vậy cho cả 11 issues

---

### Bước 5: (Tùy chọn) Bảo vệ branch main

Để tránh ai đó vô tình push thẳng lên main:
1. Vào GitHub repo → **Settings** → **Branches**
2. Nhấn **"Add branch protection rule"**
3. Branch name pattern: `main`
4. Tick vào: **"Require a pull request before merging"**
5. Nhấn **Save changes**

---

## 💻 NGƯỜI CỘNG TÁC — MÁY TÍNH KHÁC

> Dành cho người muốn tham gia làm chung dự án

### Lần đầu tiên (chỉ làm 1 lần)

**Bước 1: Tải code về máy**
```bash
# Tải toàn bộ dự án về máy (thay bằng URL repo thực)
git clone https://github.com/vinaez1394/luyen-thi-io.git

# Vào thư mục dự án
cd luyen-thi-io
```

**Bước 2: Cài đặt thư viện**
```bash
npm install
```

**Bước 3: Đọc tài liệu bắt buộc**
- Mở `docs/HUONGDAN.md` — đọc toàn bộ
- Mở `docs/CONTEXT.md` — đọc kỹ phần stack và rules
- Mở `docs/RULES.md` — nhớ các điều không được làm

**Bước 4: Tạo file `.dev.vars`** (chứa mật khẩu, KHÔNG share)
```bash
# Copy file mẫu
copy .dev.vars.example .dev.vars
# Sau đó mở .dev.vars và điền thông tin thật vào
```

---

### Khi muốn bắt đầu làm 1 phase

**Bước 1: Nhận phase**
- Vào `https://github.com/vinaez1394/luyen-thi-io/issues`
- Tìm issue có label `phase` và chưa có người nhận (Assignee trống)
- Comment: `"Tôi nhận Phase 04 - Quiz Engine"`
- Chờ owner assign cho bạn

**Bước 2: Lấy code mới nhất**
```bash
# Chuyển về nhánh dev
git checkout dev

# Lấy code mới nhất từ GitHub
git pull origin dev
```

**Bước 3: Tạo nhánh riêng cho phase của mình**
```bash
# Ví dụ nhận Phase 04
git checkout -b feature/phase-04-quiz-engine
```
> 💡 Từ giờ anh đang làm trên bản sao riêng — không ảnh hưởng ai cả

**Bước 4: Làm việc bình thường**
- Mở VS Code, code, chỉnh sửa file theo phase
- Thỉnh thoảng lưu lại (commit):

```bash
# Lưu lại tiến độ (làm thường xuyên, không cần chờ xong hết)
git add .
git commit -m "feat(quiz): thêm component MultipleChoice"
```

**Bước 5: Gửi lên GitHub**
```bash
git push origin feature/phase-04-quiz-engine
```

**Bước 6: Tạo Pull Request**
1. Vào GitHub → thấy thông báo màu vàng "Compare & pull request" → nhấn vào
2. Title: `[Phase 04] Quiz Engine — Multiple Choice + Fill Blank`
3. Description: mô tả ngắn đã làm gì
4. Nhấn **"Create pull request"**
5. Chờ owner review và merge vào dev

---

### Khi bắt đầu ngày làm việc mới

```bash
# Lấy code mới nhất (người khác có thể đã thêm gì đó)
git checkout dev
git pull origin dev

# Quay lại branch của mình
git checkout feature/phase-04-quiz-engine

# Cập nhật branch của mình với code mới từ dev
git merge dev
```

---

## ⚠️ CÁC LỖI THƯỜNG GẶP VÀ CÁCH XỬ LÝ

### "Conflict" — 2 người sửa cùng 1 file

```
<<<<<<< HEAD (code của mình)
const color = "blue";
=======
const color = "red";  (code của người kia)
>>>>>>> dev
```

**Cách xử lý:**
1. Mở file bị conflict trong VS Code
2. VS Code sẽ highlight rõ 2 phiên bản
3. Chọn **"Accept Current Change"** (giữ của mình) hoặc **"Accept Incoming Change"** (giữ của người kia)
4. Hỏi AI: *"Đây là 2 đoạn code conflict, dựa vào CONTEXT.md thì cái nào đúng hướng hơn?"*
5. Sau khi chọn: `git add .` rồi `git commit -m "fix: resolve conflict in ..."`

### "Rejected — push failed"
```bash
# Lấy code mới về trước
git pull origin main --rebase
# Sau đó push lại
git push origin main
```

### Lỡ sửa nhầm file của phase khác
```bash
# Xem đã sửa file nào
git status

# Hoàn tác 1 file cụ thể về trạng thái ban đầu
git checkout -- src/react-app/styles/themes.css
```

---

## 🤖 HƯỚNG DẪN DÙNG AI (ANTIGRAVITY) TRONG DỰ ÁN

### Bắt đầu mỗi session làm việc
Nói với AI:
> *"Đọc `docs/CONTEXT.md` và `docs/RULES.md`, sau đó đọc `plans/260428-1029-luyen-thi-io-mvp/phase-01-foundation.md` — bắt đầu Phase 01."*

### Khi bị mắc kẹt hoặc AI nói sai
Nói với AI:
> *"Dừng lại. Đọc lại `docs/CONTEXT.md` và `docs/RULES.md` — bạn đang làm đúng theo những quy tắc đó không? Giải thích."*

### Khi xong 1 phase
Nói với AI:
> *"Phase XX đã xong. Cập nhật `plans/.../plan.md` đánh dấu Phase XX là ✅ hoàn thành."*

### Khi bắt đầu session mới sau khi đã nghỉ
Dùng lệnh AWF: `/recap` → AI sẽ tự đọc lại context.

---

## 📝 CẬP NHẬT FILE NÀY

Khi có quyết định mới hoặc thay đổi lớn:
1. Cập nhật `docs/CONTEXT.md` (cho AI đọc)
2. Cập nhật `docs/HUONGDAN.md` (file này, cho người đọc)
3. Cập nhật `docs/BRIEF.md` (product vision chi tiết)
4. Gửi lên GitHub: `git add . && git commit -m "docs: cập nhật HUONGDAN"`

---

*Tổng hợp từ phiên brainstorm & planning ngày 2026-04-28*
*GitHub repo: https://github.com/vinaez1394/luyen-thi-io*
