# 📘 HƯỚNG DẪN DỰ ÁN — luyen-thi-io
> Tài liệu tổng quan cho owner và AI. Cập nhật: 2026-05-01 | Reading Engine hoàn thành

---

## 🎯 DỰ ÁN LÀ GÌ?

**luyen-thi-io** (luyenthi.io.vn) là nền tảng luyện tập cho học sinh Việt Nam 9–12 tuổi, hỗ trợ **2 lộ trình**:
- 🇬🇧 **Cambridge** — Flyers (đang có) → Movers, KET, PET (sắp có)
- 🏫 **Thi Lớp 6** — Toán Tư Duy + Tiếng Anh (đang có) → Tiếng Việt, Khoa Học (sắp có)

---

## ⚙️ STACK KỸ THUẬT

| Layer | Công nghệ | Ghi chú |
|-------|-----------|---------|
| Frontend | React 19 + Vite | KHÔNG dùng Next.js |
| Backend | Hono on Cloudflare Workers | |
| Database | Cloudflare D1 (SQLite) | ID: `cc1f5652-8b63-45c2-8fa4-15509f0e6278` |
| Storage | Cloudflare R2 | Bucket: `luyen-thi-content` |
| Cache | Cloudflare KV | Session, theme |
| Email | Resend.com | 3,000 free/tháng |
| Auth | Google OAuth via Hono | |
| Font | Nunito (Google Fonts) | |
| Deploy | GitHub Actions → Cloudflare Workers | Xem section Deploy |

---

## 🗺️ SITEMAP (Cập nhật 2026-05-01)

```
luyenthi.io.vn/
├── /                           ← Trang chủ
├── /learn                      ← Chọn lộ trình
├── /cambridge                  ← Hub Cambridge
│   └── /cambridge/flyers       ← SubjectPage (available: true)
│       ├── /cambridge/flyers/rw001        ← Reading Part 4
│       ├── /cambridge/flyers/rw2-001      ← Reading Part 3
│       ├── /cambridge/flyers/rw3-001      ← Reading Part 1
│       ├── /cambridge/flyers/l001         ← Listening Part 1
│       ├── /cambridge/flyers/l002         ← Listening Part 4
│       └── /cambridge/flyers/l003         ← Listening Part 2
├── /lop6                       ← Hub Lớp 6
│   ├── /lop6/toan              ← Toán Tư Duy (available: true)
│   │   ├── /lop6/toan/math-l1-p1  ... math-l1-p5  (free)
│   │   └── /lop6/toan/math-l1-p6  ... math-l1-p10 (premium)
│   └── /lop6/tieng-anh         ← Tiếng Anh Lớp 6 (available: true)
│       ├── /lop6/tieng-anh/reading-easy-grade3-p1  ← ReadingEngine
│       ├── /lop6/tieng-anh/reading-easy-grade4-p1
│       ├── /lop6/tieng-anh/reading-easy-grade5-p1
│       ├── /lop6/tieng-anh/reading-med-grade3-p1
│       ├── /lop6/tieng-anh/reading-med-grade4-p1
│       ├── /lop6/tieng-anh/reading-med-grade5-p1
│       ├── /lop6/tieng-anh/reading-hard-grade3-p1
│       ├── /lop6/tieng-anh/reading-hard-grade4-p1
│       └── /lop6/tieng-anh/reading-hard-grade5-p1
├── /onboarding                 ← [Auth Required] 5-step wizard
├── /dashboard                  ← [Auth Required]
└── /quiz/:id                   ← Legacy URL (backward compat)
```

---

## 🗂️ CẤU TRÚC FILE

```
luyen-thi-io/
├── src/
│   ├── react-app/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── AppLayout.tsx
│   │   │   │   ├── GlobalHeader.tsx
│   │   │   │   ├── GlobalFooter.tsx
│   │   │   │   ├── MobileBottomNav.tsx
│   │   │   │   └── QuizLayout.tsx
│   │   │   ├── quiz/
│   │   │   │   ├── QuizEngine.tsx        ← MCQ, FillBlank, DragDrop
│   │   │   │   ├── ReadingEngine.tsx     ← [MỚI] Reading Passage engine
│   │   │   │   ├── ReadingSection.tsx    ← [MỚI] Section wrapper
│   │   │   │   ├── ReadingPassage.tsx    ← [MỚI] Collapsible passage
│   │   │   │   └── ReadingQuestion.tsx   ← [MỚI] 4 loại câu hỏi
│   │   │   └── vocabulary/
│   │   │       ├── HangmanGame.tsx
│   │   │       ├── HomeHangman.tsx
│   │   │       └── GameLoginCTA.tsx
│   │   ├── pages/
│   │   │   ├── QuizPage.tsx   ← dispatch đến QuizEngine hoặc ReadingEngine
│   │   │   ├── SubjectPage.tsx  ← hiển thị badge difficulty
│   │   │   └── ...
│   │   ├── data/
│   │   │   └── subjects.ts    ← NGUỒN DUY NHẤT danh sách môn + bài
│   │   ├── types/
│   │   │   ├── quiz.ts        ← type Quiz (MCQ)
│   │   │   └── reading.ts     ← [MỚI] type ReadingQuiz
│   │   └── hooks/
│   │       ├── useQuiz.ts     ← fetch + state MCQ + ReadingQuiz
│   │       └── useAuth.ts
│   └── worker/
│       ├── routes/
│       │   └── quiz.ts        ← LOCAL_QUIZ_MAP + getR2Key()
│       └── migrations/
│           ├── 0001_initial.sql
│           ├── 0002_vocabulary.sql
│           ├── 0003_add_grade_pathway.sql
│           └── 0005-0008_seed_vocabulary_flyers.sql (250 từ Cambridge Flyers)
├── content/
│   ├── math/           ← MATH-L1-P1 ... P10.json
│   ├── flyers/         ← RW001, RW2-001, RW3-001, L001-L003.json
│   └── lop6/tieng-anh/reading/   ← [MỚI] 9 bài Reading Passage
│       ├── READING-EASY-GRADE3-P1.json
│       ├── READING-EASY-GRADE4-P1.json
│       ├── READING-EASY-GRADE5-P1.json
│       ├── READING-MED-GRADE3-P1.json ... (×3)
│       └── READING-HARD-GRADE3-P1.json ... (×3)
└── .github/workflows/deploy.yml
```

---

## 🎮 QUIZ ENGINE

### Các loại bài (type trong JSON)

| `type` | Engine | Mô tả |
|--------|--------|-------|
| `multiple-choice` | QuizEngine | 4 ô chọn 1 |
| `fill-blank` | QuizEngine | Gõ vào ô trống |
| `drag-drop-match` | QuizEngine | Kéo nối 2 cột |
| `reading-passage` | **ReadingEngine** | Đọc hiểu — 2 sections, 4 loại câu |

### ReadingEngine — 4 loại câu hỏi

| sub_type | Hiển thị |
|----------|---------|
| `cloze` (section 1) | 3 options điền vào chỗ trống |
| `true-false` | Nút True / False |
| `mc-3` | 3 options chọn 1 |
| `write-word` | Ô nhập tự do |

### Cấu trúc JSON Reading Passage

```json
{
  "id": "READING-EASY-GRADE3-P1",
  "type": "reading-passage",
  "difficulty": "easy",
  "grade_min": 3, "grade_max": 4,
  "pathway": "lop6", "subject": "tieng-anh",
  "total_points": 16,
  "sections": [
    {
      "id": "section-1", "type": "cloze", "points": 8,
      "passage": { "raw_text": "...", "text_segments": [...] },
      "questions": [
        { "id": "q1", "blank_number": 1, "context": "...",
          "options": ["a","b","c"], "correct": "a", "explanation_vi": "..." }
      ]
    },
    {
      "id": "section-2", "type": "comprehension", "points": 8,
      "passage": { ... },
      "questions": [
        { "id": "q5", "sub_type": "true-false", "prompt": "...", "correct": "false", "explanation_vi": "..." },
        { "id": "q7", "sub_type": "mc-3", "options": [...], "correct": "...", "explanation_vi": "..." },
        { "id": "q8", "sub_type": "write-word", "prompt": "...", "correct": "rubbish", "explanation_vi": "..." }
      ]
    }
  ]
}
```

> Schema đầy đủ: `~/.gemini/antigravity/skills/exam-luyenthi/references/reading-passage-schema.md`

---

## 📦 THÊM BÀI MỚI — QUYTRÌNH CHUẨN

> Dùng lệnh `/tạo bài học` → AI tự kích hoạt skill `exam-luyenthi` và làm theo đúng quy trình.

### Nhánh A: Multiple Choice (Toán / Cambridge)

1. Tạo `content/{folder}/{ID}.json` theo schema MCQ
2. Thêm vào `quiz.ts` → `LOCAL_QUIZ_MAP`
3. Thêm vào `subjects.ts` → `lessons[]`
4. Push → GitHub Actions deploy

### Nhánh B: Reading Passage (Tiếng Anh Lớp 6)

1. Tạo `content/lop6/tieng-anh/reading/{ID}.json`
   - ID format: `READING-{DIFF}-GRADE{N}-P{NUM}`
   - Ví dụ: `READING-EASY-GRADE3-P2`, `READING-MED-GRADE5-P1`
2. Thêm vào `quiz.ts` → `LOCAL_QUIZ_MAP`
3. Thêm vào `subjects.ts` → `lessons[]` (với `difficulty` + `grade_target`)
4. Thêm vào `deploy.yml` → R2 sync step
5. Push → kiểm tra browser thực tế

---

## 🚀 DEPLOY — QUY TẮC BẮT BUỘC (2026-05-01)

### Cách deploy

```bash
git add -A
git commit -m "mô tả ngắn"
git push origin dev
# GitHub Actions tự chạy ~1.5 phút
# Xem tại: github.com/vinaez1394/luyen-thi-io/actions
```

### Cấu hình deploy.yml — ĐÚNG

```yaml
# ✅ ĐÚNG: dùng wrangler từ node_modules (stable)
- name: Deploy to Cloudflare Workers
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: "55e3a88290a27547ff01294004561906"
  run: ./node_modules/.bin/wrangler deploy

# ❌ SAI: cloudflare/wrangler-action@v3 hay tự cập nhật gây lỗi
# uses: cloudflare/wrangler-action@v3  ← KHÔNG DÙNG
```

### Quy tắc báo cáo "hoàn thành"

**KHÔNG** được báo cáo xong khi chỉ có: build pass, tsc pass, dry-run pass.

**BẮT BUỘC** thêm: mở browser → chụp screenshot → xác nhận trang render đúng.

---

## ⚠️ QUY TẮC CSS — TRÁNH PHÁ VỠ UI KHI SỬA

> **Mỗi lần sửa CSS layout/responsive, BẮT BUỘC kiểm tra lại các quy tắc này.**

### 🚫 Rule CSS-01: KHÔNG thêm `overflow:hidden` vào container có dropdown con

```css
/* ❌ SAI — dropdown position:absolute bị clip, menu không click được */
.global-header__inner { overflow: hidden; }

/* ✅ ĐÚNG — để mặc định (overflow: visible) */
.global-header__inner { /* không set overflow */ }
```

**Các container CẤM thêm overflow:hidden:**
- `.global-header__inner` — chứa `.nav-subject-dropdown` (position: absolute)
- `.global-header__nav-dropdown-wrapper` — wrapper dropdown môn học
- Bất kỳ parent nào của `position: absolute` / `position: fixed` children

**Lỗi thực tế (2026-05-02):** Thêm `overflow:hidden` vào `.global-header__inner` để fix mobile scroll → clip dropdown → menu không click được.

### 🚫 Rule CSS-02: Sửa responsive phải test ĐỒNG THỜI desktop + mobile

Trước khi push, verify 2 breakpoint trong DevTools (Cmd+Shift+M / F12):
- **Desktop 1200px**: nav hiện, hamburger ẩn, dropdown mở được, link click được
- **Mobile 375px**: hamburger trái, drawer mở, không scroll ngang

### ✅ Checklist CSS trước khi push

- [ ] `npx tsc -b --noEmit` pass
- [ ] Desktop: mở dropdown Môn học → click được
- [ ] Mobile: hamburger bên trái, drawer mở
- [ ] Không horizontal scroll ở bất kỳ breakpoint

---

## 📡 R2 CONTENT — MAPPING RULES

| Quiz ID Pattern | R2 Path | URL |
|----------------|---------|-----|
| `MATH-L*-P*` | `quizzes/lop6/toan/{ID}.json` | `/lop6/toan/{slug}` |
| `RW*`, `RW2-*`, `RW3-*` | `quizzes/cambridge/flyers/reading/{ID}.json` | `/cambridge/flyers/{slug}` |
| `L001-L003` | `quizzes/cambridge/flyers/listening/{ID}.json` | `/cambridge/flyers/{slug}` |
| `READING-*` | `quizzes/lop6/tieng-anh/reading/{ID}.json` | `/lop6/tieng-anh/{slug}` |

### Cấu trúc R2 Bucket `luyen-thi-content`

```
luyen-thi-content/quizzes/
├── lop6/
│   ├── toan/           ← MATH-L1-P1 ... P10
│   └── tieng-anh/
│       └── reading/    ← READING-EASY/MED/HARD-GRADE3/4/5-P1 (9 bài)
└── cambridge/
    └── flyers/
        ├── reading/    ← RW001, RW2-001, RW3-001
        └── listening/  ← L001, L002, L003
```

### Verify sau deploy

```bash
# Gọi API
curl https://luyen-thi-io.workers.dev/api/quiz/READING-EASY-GRADE3-P1

# Xem Worker log real-time
npx wrangler tail --remote
```

---

## 🗄️ DATABASE (Cloudflare D1)

```
Database name: luyen-thi-db
Database ID:   cc1f5652-8b63-45c2-8fa4-15509f0e6278
Account ID:    55e3a88290a27547ff01294004561906
```

### Bảng chính

| Bảng | Mô tả |
|------|-------|
| `users` | Phụ huynh (Google / Email) |
| `student_profiles` | Hồ sơ bé (grade, pathway, theme, avatar) |
| `student_stats` | Streak, skill levels, last_quiz_id |
| `quiz_attempts` | Kết quả từng bài |
| `dream_goals` | Hộp Quà Ước Mơ |
| `vocabulary_words` | Kho từ vựng hệ thống |
| `student_vocabulary` | Theo dõi từng bé |
| `vocabulary_bank` | 250 từ Cambridge Flyers A2 (17 topics) |

### Thêm từ vựng mới

**Cách nhanh nhất — D1 Console:**
```
https://dash.cloudflare.com/55e3a88290a27547ff01294004561906/workers/d1/databases/cc1f5652-8b63-45c2-8fa4-15509f0e6278/console
```
Paste SQL → Execute.

**Cách tự động — migration file:**
1. Tạo `src/worker/migrations/000X_seed_vocab.sql`
2. `git push origin dev` → Actions tự seed

> ⚠️ Nếu dùng `wrangler login` local: dùng **Chrome/Firefox**, KHÔNG dùng Safari (callback bị treo).

---

## 📡 API ENDPOINTS

### Auth
| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `/api/auth/google` | OAuth redirect |
| GET | `/api/auth/callback` | Tạo session |
| POST | `/api/auth/register` | Email đăng ký |
| POST | `/api/auth/login` | Email đăng nhập |
| GET | `/api/auth/me` | User hiện tại |

### Quiz & Student
| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `/api/quiz/:id` | Lấy nội dung bài (từ R2) |
| POST | `/api/quiz/:id/submit` | Nộp bài, lưu kết quả |
| POST | `/api/student/profile` | Cập nhật hồ sơ bé |
| POST | `/api/student/stars` | Cộng sao (Hangman, Flashcard) |

---

## 🎨 GIAO DIỆN

### 6 Themes
```
purple (mặc định) | ocean | sakura | forest | night | sunset
```
Đổi theme: `document.documentElement.setAttribute('data-theme', 'ocean')`

### Design Rules
- Touch target: min **48×48px**
- Font: **Nunito**, tối thiểu 14px
- Border radius: cards ≥ 20px
- Màu: qua CSS variables, KHÔNG hardcode
- Spacing: bội số 8px

---

## ⭐ GAMIFICATION

### Kiếm sao
| Kết quả | Sao |
|---------|-----|
| < 60% đúng | ⭐ 1 |
| 60–79% | ⭐⭐ 2 |
| 80–89% | ⭐⭐⭐ 3 |
| 90–100% | ⭐⭐⭐⭐⭐ 5 |

**Sao KHÔNG bao giờ hết hạn.** Chỉ bị trừ khi tra Word Tooltip sau khi hết 3 lượt miễn phí/bài.

### Hangman
- 5 từ/session. Scoring: 5/5 +2⭐ | 4/5 +1⭐ | ≤3/5 = 0⭐
- Mastery: đúng 2 lần trong 2 session khác nhau → "tốt nghiệp"

---

## 🚦 TIẾN ĐỘ (Cập nhật 2026-05-01)

### ✅ Đã hoàn thành

| Module | Trạng thái |
|--------|-----------|
| Foundation (D1, Auth, Theme) | ✅ |
| App Shell (Header, Footer, Nav) | ✅ |
| Quiz Engine MCQ + FillBlank + DragDrop | ✅ |
| Word Tooltip + Hangman | ✅ |
| IA Restructure (dual pathway, onboarding, dashboard) | ✅ |
| **Reading Engine** (9 bài, 4 loại câu hỏi) | ✅ **MỚI** |
| Vocabulary bank 250 từ Flyers | ✅ |

### ⏳ Chưa làm (ưu tiên)

1. Quiz Audio — Listening Flyers (Cloudflare Workers AI)
2. Weekly Report Email (Resend.com, mỗi Chủ nhật)
3. Dream Box + Email confirmation
4. Thanh toán PayOS
5. Thêm bài Reading mới (dùng skill `exam-luyenthi`)

---

## 🐛 BUGS ĐÃ FIX — GHI NHỚ

### Trang trắng khi vào Reading Passage (2026-05-01)

**Nguyên nhân:** `useQuiz.ts` tính `quiz?.questions.length` nhưng ReadingQuiz không có `.questions` (chỉ có `.sections[].questions`).

**Fix:** Dùng optional chain + fallback:
```typescript
const totalQuestions = (quiz as any)?.questions?.length
  ?? (quiz as any)?.sections?.reduce((s, sec) => s + sec.questions.length, 0)
  ?? 0;
```

**Bài học:** Khi thêm loại quiz mới, **phải test browser thực tế**, không chỉ dựa vào `tsc` + `build` pass.

---

## 💰 PRICING DỰ KIẾN

| Gói | Giá | Nội dung |
|-----|-----|---------|
| Free | 0đ | 5 bài thử |
| Basic | 99k/tháng | Unlimited bài, báo cáo tuần |
| Premium | 199k/tháng | Basic + phân tích điểm yếu + mock test |
| Family | 299k/tháng | 2 trẻ + Premium |

---

## 🔐 BIẾN MÔI TRƯỜNG

Lưu trong `.dev.vars` (local, KHÔNG commit):
```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
SESSION_SECRET=...
RESEND_API_KEY=re_...
FROM_EMAIL=no-reply@luyenthi.io.vn
APP_URL=https://luyenthi.io.vn
```

Production: Cloudflare Dashboard → Workers → Settings → Variables.

GitHub Secret: `CLOUDFLARE_API_TOKEN` (cần quyền: Workers Scripts Edit + D1 Edit + R2 Edit).

---

## 🤖 HƯỚNG DẪN DÙNG AI

### Bắt đầu session mới
Dùng lệnh `/recap` → AI tự khôi phục context.

### Tạo bài mới
Dùng lệnh `/tạo bài học` → skill `exam-luyenthi` tự kích hoạt.

### Debug lỗi
Dùng lệnh `/debug` → AI hỏi thông tin, điều tra, sửa đúng chỗ.

### Quy tắc vàng
> Sau khi code xong, **LUÔN** mở browser kiểm tra thực tế trước khi báo cáo hoàn thành.

---

*GitHub: https://github.com/vinaez1394/luyen-thi-io*
*Cập nhật: 2026-05-01 | Reading Engine + Deploy Fix*
