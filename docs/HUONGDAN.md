# 📘 HƯỚNG DẪN DỰ ÁN — luyen-thi-io
> Tài liệu tổng quan cho owner và AI. Cập nhật: 2026-05-16 | Staging Deploy Fix & PathwayPopup UI Refactor

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
│   ├── /cambridge/vocabulary            ← VocabularyPage (Dashboard chọn topic)
│   │   └── /cambridge/vocabulary/:topic ← VocabularyLesson (LEARN→PRACTICE→USE)
│   └── /cambridge/flyers       ← SubjectPage (available: true)
│       ├── /cambridge/flyers/rw001        ← Reading Part 4
│       ├── /cambridge/flyers/rw2-001      ← Reading Part 3
│       ├── /cambridge/flyers/rw3-001      ← Reading Part 1
│       ├── /cambridge/flyers/l001         ← Listening Part 1
│       ├── /cambridge/flyers/l002         ← Listening Part 4
│       └── /cambridge/flyers/l003         ← Listening Part 2
├── /lop6                       ← Hub Lớp 6
│   ├── /lop6/toan              ← Toán (available: true)
│   │   ├── /lop6/toan/math-l1-p1  ... math-l1-p5  (free)
│   │   └── /lop6/toan/math-l1-p6  ... math-l1-p10 (premium)
│   └── /lop6/tieng-anh         ← English (available: true)
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
├── /profile                    ← [Auth Required] Cài đặt hồ sơ (Profile Settings)
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

## ⚙️ TÍNH NĂNG DASHBOARD & HỒ SƠ (Cập nhật 2026-05-04)

### 1. Dashboard
- Gọi `GET /api/student/dashboard` để lấy toàn bộ dữ liệu: `currentGrade`, `selectedPathway`, `streak`, `totalStars`, `skillLevels`, `dreamGoal`.
- Dữ liệu `currentGrade` và `selectedPathway` được đồng bộ xuống `localStorage` (`student_grade`, `student_pathway`) ngay khi dashboard load để dùng ở các trang khác mà không cần fetch lại.

### 2. Trang Cài Đặt Hồ Sơ (`/profile`)
- Nằm trong dropdown avatar góc phải trên: "Cài đặt" → `/profile`.
- Cho phép phụ huynh/học sinh cập nhật: Tên hiển thị, Avatar, Lớp đang học, Lộ trình học.
- Dùng `PATCH /api/student/profile` để cập nhật từng phần thông tin, khắc phục lỗi 409 Conflict của luồng Onboarding cũ.

### 3. Logic "Ôn tập lại" (Review Mode)
- Nếu học sinh truy cập bài tập thuộc lớp bé hơn (`grade_max` < `currentGrade`), một Notification Banner "Ôn tập lại" sẽ xuất hiện.
- Học sinh có thể bấm "Bắt đầu ôn tập", điểm số bài này sẽ KHÔNG làm ảnh hưởng đến lộ trình và tiến độ (`skillLevels`) chính thức của lớp hiện tại.

---

## 🎮 QUIZ ENGINE

### Các loại bài (type trong JSON)

| `type` | Engine | Mô tả |
|--------|--------|-------|
| `multiple-choice` | QuizEngine | 4 ô chọn 1 |
| `fill-blank` | QuizEngine | Gõ vào ô trống |
| `drag-drop-match` | QuizEngine | Kéo nối 2 cột |
| `reading-passage` | **ReadingEngine** | Đọc hiểu — 2 sections, 4 loại câu |
| `writing` | **WritingEngine** | Viết câu — 2 sections (rearrange + sentence-building) |

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

### WritingEngine — 2 loại câu hỏi

| section type | question type | Component | Mô tả |
|-------------|--------------|-----------|-------|
| `rearrange` | `drag-drop-fill` | **DragDropFill** (tái sử dụng) | Kéo cụm từ vào slot đúng vị trí |
| `sentence-building` | `write-sentence` | **SentenceInput** (mới) | Gõ câu hoàn chỉnh vào ô text |

### Cấu trúc JSON Writing

```json
{
  "id": "WRITING-HARD-GRADE5-P1",
  "type": "writing",
  "difficulty": "hard",
  "grade_min": 5, "grade_max": 6,
  "total_points": 14,
  "sections": [
    {
      "id": "sec-1", "type": "rearrange", "points": 8,
      "instruction": "...",
      "example": { "display_cues": "...", "answer": "..." },
      "questions": [
        {
          "id": "q1", "type": "drag-drop-fill",
          "display_cues": "the city government / has launched / ... /.//",
          "template": "{0} {1} {2} {3} {4}.",
          "word_bank": ["the city government", "has launched", ...],
          "correct": ["the city government", "has launched", ...],
          "explanation": {
            "correct_sentence": "...",
            "structure_vi": "S + have/has + V3 + O + to-V",
            "grammar_notes": ["..."],
            "vocab_notes": [{"word": "...", "vi": "...", "ipa": "..."}],
            "common_mistakes": ["❌ Sai: ..."]
          }
        }
      ]
    },
    {
      "id": "sec-2", "type": "sentence-building", "points": 6,
      "questions": [
        {
          "id": "q5", "type": "write-sentence",
          "display_cues": "Nguyen Hue Flower Street / be / ... /.//",
          "accepted_answers": ["Nguyen Hue Flower Street is one of...", ...],
          "explanation": { ... }
        }
      ]
    }
  ]
}
```

### Chấm điểm Writing

- **Section 1 (rearrange):** Phải đúng TOÀN BỘ thứ tự → mới tính 1 câu đúng
- **Section 2 (sentence-building):** So sánh với `accepted_answers[]` sau khi normalize (trim, lowercase, bỏ dấu câu cuối)
- **Giải thích:** Hiển thị `explanation` SAU KHI nộp bài dù đúng hay sai, gồm 4 phần:
  - `correct_sentence` — Đáp án chuẩn
  - `structure_vi` — Sơ đồ cấu trúc câu
  - `grammar_notes` — Quy tắc ngữ pháp áp dụng
  - `common_mistakes` — Lỗi thường gặp để đối chiếu

### CollapsibleBlock — Accordion thu gọn/mở

Cả 2 section đều có Hướng dẫn + Ví dụ mẫu hiển thị dạng **Accordion mặc định ĐÓNG**:
- User click "▼ Xem" → mở ra xem hướng dẫn + ví dụ
- Tiết kiệm màn hình mobile, không bắt buộc đọc

---

## 📦 THÊM BÀI MỚI (KIẾN TRÚC MỚI)

> **⚠️ LƯU Ý QUAN TRỌNG:** Kể từ 2026-05-10, hệ thống chuyển sang kiến trúc Dynamic Registry. Bạn KHÔNG CẦN sửa code Frontend hay `subjects.ts`.

Xem tài liệu Hướng dẫn chi tiết 3 bước tại: `docs/QUYTRINH_THEM_BAI_QUIZ.md`

Tóm tắt quy trình:
1. **Upload JSON lên R2**
2. **Insert thông tin vào D1 `quiz_catalog`**
3. **Xóa KV Cache qua API `POST /api/subjects/cache/invalidate`**

*(Các phần JSON schema và ma trận vẫn áp dụng như cũ, chỉ thay đổi luồng đưa bài lên hệ thống)*

---

## 🚀 DEPLOY CI/CD: STAGING & PRODUCTION

Kể từ bản cập nhật ngày 10/05/2026, dự án áp dụng mô hình phân tách môi trường Staging (Thử nghiệm) và Production (Thực tế).

### Luồng làm việc (Workflow)

```bash
# BƯỚC 1: LÀM VIỆC VÀ TEST TRÊN STAGING
git checkout dev              # Làm việc ở nhánh dev
git commit -m "Tính năng A"
git push origin dev           # Tự động deploy lên Staging

# => Mở dev.luyenthi.io.vn để kiểm tra

# BƯỚC 2: RELEASE LÊN PRODUCTION
# Khi mọi thứ trên Staging đã ổn định, gộp dev vào main:
git checkout main
git merge dev
git push origin main          # Tự động deploy lên Production

# => Cập nhật chính thức tại luyenthi.io.vn
```

### ⚠️ Lưu ý kỹ thuật: Lỗi của Vite Plugin & Cách xử lý ĐÚNG (Cập nhật 2026-05-16)

Dự án sử dụng `@cloudflare/vite-plugin` để build frontend React và Cloudflare Workers cùng lúc.
Plugin này có một **hạn chế quan trọng**: sau khi `npm run build`, nó sinh ra file `dist/luyen_thi_io/wrangler.json` riêng biệt với `topLevelName: "luyen-thi-io"` lấy cứng từ `package.json`. **Khi `wrangler deploy` chạy, nó đọc file dist này** chứ không phải file `wrangler.json` gốc ở root. Do đó:

- ❌ **Dùng `sed` trên `wrangler.json` ở root không có tác dụng** vì build đã xong trước đó.
- ❌ **Dùng `wrangler deploy --env staging`** cũng bị bỏ qua bởi Vite Plugin.
- ❌ Nếu deploy sai cách, Job staging sẽ **ghi đè lên Production** (`luyen-thi-io`).

**✅ Giải pháp ĐÚNG — Dùng script `npm run deploy:staging`:**

File `scripts/deploy-staging.mjs` được viết để xử lý đúng vấn đề này:
1. Chạy `npm run build` xong.
2. Đọc và patch **trực tiếp vào `dist/luyen_thi_io/wrangler.json`** (file do Vite Plugin sinh ra) → đổi `name` thành `luyen-thi-io-staging`.
3. Chạy `wrangler deploy` → deploy đúng worker Staging.
4. Tự động invalidate KV Cache trên `dev.luyenthi.io.vn`.

```yaml
# Trong .github/workflows/deploy.yml — Job deploy-staging:
- name: 🚀 Deploy to Staging (luyen-thi-io-staging)
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: "55e3a88290a27547ff01294004561906"
  run: npm run deploy:staging
```

> **⚠️ CẢNH BÁO:** Không được thay `npm run deploy:staging` bằng lệnh `sed wrangler.json && wrangler deploy`. Cách này luôn deploy nhầm vào Production. Đây là lỗi đã xảy ra thực tế (2026-05-16) và mất nhiều giờ để debug.

**Deploy manual trên máy local (an toàn):**
```bash
npm run deploy:staging   # Deploy lên Staging (dev.luyenthi.io.vn)
npm run deploy:prod      # Deploy lên Production (luyenthi.io.vn)
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
| `FW1-*` | `quizzes/cambridge/flyers/part1/{ID}.json` | `/cambridge/flyers/{slug}` |
| `FW2-*` | `quizzes/cambridge/flyers/part2/{ID}.json` | `/cambridge/flyers/{slug}` |
| `FW3-*` | `quizzes/cambridge/flyers/part3/{ID}.json` | `/cambridge/flyers/{slug}` |
| `FW4-*` | `quizzes/cambridge/flyers/part4/{ID}.json` | `/cambridge/flyers/{slug}` |
| `FW5-*` | `quizzes/cambridge/flyers/part5/{ID}.json` | `/cambridge/flyers/{slug}` |
| `FW6-*` | `quizzes/cambridge/flyers/part6/{ID}.json` | `/cambridge/flyers/{slug}` |
| `FW7-*` | `quizzes/cambridge/flyers/part7/{ID}.json` | `/cambridge/flyers/{slug}` |
| `FL1-*` | `quizzes/cambridge/flyers/listening/part1/{ID}.json` | `/cambridge/flyers/{slug}` |
| `READING-*` | `quizzes/lop6/tieng-anh/reading/{ID}.json` | `/lop6/tieng-anh/{slug}` |
| `WRITING-*` | `quizzes/lop6/tieng-anh/writing/{ID}.json` | `/lop6/tieng-anh/{slug}` |

> ⚠️ **FL1 có subfolder `part1/`** — khác với dạng listening cũ (`L001-L003`) không có subfolder.

### Cấu trúc R2 Bucket `luyen-thi-content`

```
luyen-thi-content/quizzes/
├── lop6/
│   ├── toan/           ← MATH-L1-P1 ... P10
│   └── tieng-anh/
│       └── reading/    ← READING-EASY/MED/HARD-GRADE3/4/5-P1 (9 bài)
└── cambridge/
    └── flyers/
        ├── part1/      ← FW1-EASY/MED/HARD-*
        ├── part2/      ← FW2-EASY/MED/HARD-*
        ├── part3/      ← FW3-MED/HARD-*
        ├── part4/      ← FW4-*
        ├── part5/      ← FW5-*
        ├── part6/      ← FW6-*
        ├── part7/      ← FW7-*
        └── listening/
            └── part1/  ← FL1-EASY/MED-*  (⚠️ có subfolder part1/)
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
| `vocabulary_words` | Kho từ vựng hệ thống (legacy) |
| `student_vocabulary` | Theo dõi tiến độ từng bé (legacy) |
| `vocabulary_bank` | 250+ từ Cambridge (Starters/Movers/Flyers, nhiều topics) |
| `student_vocabulary_progress` | **[NEW]** SRS progress: mastery_level, next_review_at, session stats |

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
| POST | `/api/student/profile` | Tạo hồ sơ bé (Onboarding) |
| PATCH | `/api/student/profile` | Cập nhật hồ sơ bé (Cài đặt) |
| GET | `/api/student/dashboard` | Lấy data tổng hợp (grade, pathway, streak, stars) |
| POST | `/api/student/stars` | Cộng sao (Hangman, Flashcard) |

### Vocabulary Module (Phase 2026)
| Method | URL | Mô tả |
|--------|-----|-------|
| GET | `/api/vocabulary/topics?cert=flyers` | Danh sách topics + tiến độ học sinh |
| GET | `/api/vocabulary/lesson?topic=animals&cert=flyers&offset=0` | Lấy session 8 từ (SRS-aware) |
| POST | `/api/vocabulary/progress` | Lưu kết quả từng từ, tính SRS next_review_at |

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
| Reading Engine (9 bài, 4 loại câu hỏi) | ✅ |
| Vocabulary bank 250 từ Flyers | ✅ |
| **Writing Engine** (types, JSON schema, WritingEngine component) | 🔄 **Đang làm** |

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

### Grade hiện đúng trên Desktop (DevTools) nhưng mất trên điện thoại thật (2026-05-06)

**Nguyên nhân:** API `/api/student/dashboard` bị lỗi khi lấy thông tin trên điện thoại thật (do session/DB query rơi vào fallback path vì thiếu cột), khiến `currentGrade` trả về `null`. `GlobalHeader` nhận `null` nên không write xuống `localStorage("student_grade")`. Do `localStorage` trên điện thoại thật là hoàn toàn trống (không có cache như Desktop), nên `SubjectPage` đọc bị thiếu và tự fallback sai về "Lớp 5-6".

**Fix:** 
1. Sửa `student.ts`: Thêm `current_grade` và `selected_pathway` vào query dự phòng (fallback path).
2. Sửa `GlobalHeader.tsx` & `SubjectPage.tsx`: Header tự động ghi đè `localStorage` và phát event `grade:updated` để SubjectPage cập nhật UI ngay lập tức.
3. Chỉnh sửa UI drawer mobile: tháo bỏ card bọc avatar, dùng 3 pill tự do (Grade, Sao, Streak) và bỏ nút "Trang chủ" để tối giản không gian.

### Staging không cập nhật dù đã push `dev` — Deploy nhầm sang Production (2026-05-16)

**Mô tả:** Sau nhiều lần push lên nhánh `dev`, `dev.luyenthi.io.vn` (Staging) vẫn không cập nhật. Kiểm tra Cloudflare Dashboard thấy `luyen-thi-io-staging` vẫn là bản 4h+ ago, trong khi `luyen-thi-io` (Production) lại liên tục bị ghi đè bởi code từ nhánh `dev`.

**Phân tích 5 Whys:**
1. **Tại sao Staging không cập nhật?** → Vì mọi push `dev` đều deploy vào Production thay vì Staging.
2. **Tại sao lại deploy vào Production?** → Vì lệnh `wrangler deploy` đọc `dist/luyen_thi_io/wrangler.json` (do Vite Plugin sinh ra) với `name: "luyen-thi-io"` (Production).
3. **Tại sao `sed` trong `deploy.yml` không có tác dụng?** → Vì `sed` chỉ sửa `wrangler.json` ở *root*, nhưng `wrangler deploy` đọc file trong *dist/* — hai file khác nhau.
4. **Tại sao lại dùng `sed`?** → Vì một commit CI refactor (2026-05-10) đã thay thế `npm run deploy:staging` bằng lệnh `sed` inline tưởng là đơn giản hơn, nhưng không hiểu cơ chế Vite Plugin.
5. **Tại sao trước đây deploy được đúng?** → Vì script `scripts/deploy-staging.mjs` patch đúng vào *file trong dist/* sau khi build — cách này mới chính xác.

**Fix (commit: `fix: use correct deploy-staging script in CI`):**
Xóa lệnh `sed` trong `.github/workflows/deploy.yml` và thay bằng `npm run deploy:staging`, gọi đúng script `scripts/deploy-staging.mjs`.

**Bài học:** Vite Plugin `@cloudflare/vite-plugin` tạo ra một file `wrangler.json` **hoàn toàn riêng biệt** trong `dist/`. Bất kỳ thay đổi nào vào `wrangler.json` root sau khi build đều **không có tác dụng**. Luôn patch file trong `dist/` hoặc dùng script đã có sẵn.

### Lỗi mất ảnh thumbnail ở trang danh sách bài học (2026-05-16)

**Mô tả:** Các thẻ bài học trên trang `/cambridge/flyers` chỉ hiển thị icon fallback (emoji trên nền màu) thay vì ảnh thật, mặc dù trong database D1 đã có `image_url`.

**Nguyên nhân (2 tầng):**
1. **Tầng kiến trúc (`useSubjects.ts`):** Hook này chỉ đọc dữ liệu cứng từ `subjects.ts` (static source) mà không fetch metadata từ API (`/api/subjects`) để lấy dữ liệu động từ D1. Khi thêm bài mới, nếu quên thêm `image_url` vào `subjects.ts`, ảnh sẽ bị mất.
2. **Tầng dữ liệu:** URL lưu trong D1 có thể sai lệch so với tên file thực tế trên CDN (VD: dư `FLYERS/` trên đường dẫn).

**Fix đã thực hiện:**
1. **Cải tiến `useSubjects.ts` (2-source strategy):** Render list ban đầu bằng `subjects.ts` để UI không bị giật (flash), sau đó fetch âm thầm từ `/api/subjects` và merge `image_url` chuẩn từ D1 vào để hiển thị.
2. **Tạo script sync vĩnh viễn:** Tạo `scripts/sync-image-urls.mjs` để đọc `image_url` thẳng từ file JSON (nguồn sự thật duy nhất) và đồng bộ vào `subjects.ts` làm lớp dự phòng (fallback).

**💡 CÁCH TỰ FIX NẾU BỊ MẤT THUMBNAIL LẠI SAU NÀY:**

1. **Kiểm tra JSON gốc:** Mở file JSON của bài đó (VD: `content/Cambridge/flyers/part2/FW2-EASY-001.json`), tìm xuống dưới cùng xem có `"image_url"` trỏ đúng file ảnh trên `cdn.luyenthi.io.vn` chưa. Đây là nguồn sự thật chuẩn nhất!
2. **Đồng bộ vào UI:** Chạy script sync để tự động patch URL vào file danh sách `subjects.ts`:
   ```bash
   node scripts/sync-image-urls.mjs
   ```
3. **Kiểm tra Database (D1):** Chắc chắn rằng D1 cũng đang lưu URL đúng:
   ```bash
   npx wrangler d1 execute luyen-thi-db --remote --command="SELECT quiz_id, image_url FROM quiz_catalog WHERE quiz_id='FW2-EASY-001';"
   ```
4. **Build & Deploy:** 
   ```bash
   npm run build && npm run deploy:staging
   ```

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

---

*GitHub: https://github.com/vinaez1394/luyen-thi-io*
*Cập nhật: 2026-05-16 | Staging Deploy Fix (5-Whys) & PathwayPopup UI Refactor*

---

## 🎨 SUBJECTPAGE v4 — THIẾT KẾ MỚI (2026-05-05)

### Tổng quan thay đổi

| Thành phần | Trước | Sau |
|-----------|-------|-----|
| Hero | Tiêu đề + mô tả ngắn + stats nhỏ | Pathway Badge + tiêu đề môn + desc tổng hợp kỹ năng |
| StatsBar | ✅ Hiển thị (27 bài · 21 miễn phí · 3 gợi ý · ~10') | ❌ Đã bỏ — không cần thiết |
| Grade Tabs | Inline tabs ngang + filter free/premium | Grade Selector Card nổi bật + bỏ free/premium |
| Skill Tabs | Không có | ✅ Mới — auto-detect từ `lesson.skill` |
| GlobalHeader | Chỉ tên user + avatar | ✅ Thêm badge "Lớp 4" cạnh tên |

### Skill Tab Bar

- **Tự động detect** kỹ năng có bài từ `lesson.skill` — không cần maintain danh sách thủ công
- **Tự ẩn** khi subject chỉ có 1 kỹ năng (VD: môn Toán → ẩn Skill Tab Bar luôn)
- **Thứ tự tab:** Reading → Writing → Listening → Vocabulary → Grammar → Toán → Tổng hợp (theo `SKILL_META` constant)
- **Khi đổi tab:** reset Grade về grade user, reset Difficulty về "Tất cả"
- **File CSS:** `.sp-skill-tabs`, `.sp-skill-tab`, `.sp-skill-tab--active`

### Grade Selector Card

- **Nguồn data:** `localStorage("student_grade")` — số nguyên (3, 4, 5) → map thành tab "3-4", "4-5", "5-6"
- **Mapping:** grade 3 → tab "3-4" | grade 4 → tab "4-5" | grade 5 → tab "5-6"
- **Fallback:** `null` hoặc ngoài range → default "5-6" (grade cao nhất)
- **Contextual badge:**
  - `own`: Tab đúng grade user → hiện `✓ Của bạn`
  - `higher`: Tab cao hơn grade user → hiện `🔥` (Thử thách)
  - `lower`: Tab thấp hơn grade user → hiện `🔄` (Ôn luyện)
- **Hint message:** Hiện 1 dòng chữ nhỏ khi user chọn grade khác
- **Không dùng API** — pure localStorage, trang load không bị skeleton

### Hero mới

```
┌─────────────────────────────────────────────────────
│  🏫 LUYỆN THI LỚP 6          ← pathway badge (pill)
│
│  🇬🇧  ← emoji
│  Môn Tiếng Anh              ← tiêu đề rõ ràng
│  Luyện thi tuyển sinh lớp 6 — Reading · Writing (27 bài)  ← desc
└─────────────────────────────────────────────────────
```

- Pathway badge auto-render: `lop6` → "🏫 Luyện Thi Lớp 6" | `cambridge` → "🇬🇧 Cambridge"
- Title: bỏ suffix " — Luyện Thi Lớp 6" trong `subject.label` để tránh lặp với badge
- Desc: tổng hợp danh sách kỹ năng đang có bài + tổng số bài

### GlobalHeader Grade Badge

- Đọc `localStorage("student_grade")` khi `isLoggedIn = true`
- Hiện badge `"Lớp 4"` dạng pill nhỏ giữa avatar emoji và tên user
- **Ẩn trên mobile** (< 600px) để tiết kiệm không gian
- **CSS class:** `.gh-grade-badge` (trong `GlobalHeader.css`)

### File đã thay đổi (commit: d4a3623)

| File | Thay đổi |
|------|----------|
| `src/react-app/pages/SubjectPage.tsx` | Viết lại hoàn toàn v4 |
| `src/react-app/pages/SubjectPage.css` | CSS mới: Skill Tabs + Grade Card + Pathway Badge |
| `src/react-app/components/layout/GlobalHeader.tsx` | Thêm `gradeBadge` state |
| `src/react-app/components/layout/GlobalHeader.css` | Thêm `.gh-grade-badge` |

### Filter Pipeline SubjectPage v4

```
subject.lessons[]
  → filter: skill === activeSkill (nếu > 1 skill)
  → filter: grade_target === activeGrade
  → filter: difficulty === activeDiff (nếu không phải "all")
  → sort: recommended ↓ → easy → medium → hard → id
→ filtered[] → LessonCard grid
```

### Quyết định thiết kế

| Quyết định | Lý do |
|-----------|-------|
| Ẩn tab "Tất cả" trong Grade Card | Học sinh cần bài phù hợp lớp, không cần xem tất cả |
| Ẩn Skill Tabs khi chỉ 1 kỹ năng | Tránh tab đơn lẻ vô nghĩa (VD: môn Toán chỉ có "Toán") |
| Grade từ localStorage (không API) | Zero latency, trang load ngay không skeleton |
| Bỏ filter free/premium | Cognitive load giảm, lock 🔒 trên card đủ rõ |
| Grade Card có border-left accent | Phân biệt rõ "cá nhân hóa" vs chip filter thông thường |

---

## 📦 QUIZ CATALOG MIGRATION (2026-05-10)

> **Mục tiêu:** Scale hệ thống từ ~40 bài lên 500+ bài mà KHÔNG làm phình to Frontend JS Bundle và Worker JS, đồng thời giảm thời gian cold start.
> **Kiến trúc mới:** Thêm bài = Upload JSON lên R2 + Insert 1 row vào D1 `quiz_catalog`. Không cần sửa code, không cần deploy.

### 1. Kiến trúc trước và sau

**TRƯỚC (Legacy):**
- Danh sách bài học hardcode trong `src/react-app/data/subjects.ts` (~45KB raw, bundle vào mọi trang).
- Route Worker `quiz.ts` chứa 150+ dòng `try/catch import(...)` để serve local.

**SAU (Dynamic Registry):**
- Danh sách bài được lưu trong D1 `quiz_catalog`.
- Frontend fetch qua API `GET /api/subjects?pathway=...` với hook `useSubjects`.
- Worker cache kết quả API bằng KV namespace `CACHE` (TTL 30 phút).
- Worker `quiz.ts` chỉ đọc từ R2 (production) hoặc báo lỗi nếu thiếu file (local).

### 2. Các thành phần mới

| Thành phần | Vai trò | Ghi chú |
|------------|---------|---------|
| Bảng `quiz_catalog` | Nguồn sự thật (Source of Truth) cho metadata bài học | Khác `quiz_configs` (vẫn giữ để check paywall auth) |
| KV `CACHE` | Cache API `GET /api/subjects` tại edge | Namespace riêng, không đụng vào `SESSION` |
| `GET /api/subjects` | API trả về danh sách bài học | Hỗ trợ filter theo pathway và subject |
| Hook `useSubjects` | Adapter pattern cho Frontend | Fetch từ API, fallback về `subjects.ts` nếu lỗi |

### 3. Quy trình thêm bài mới (Sau Migration)

1. Soạn JSON bài tập theo schema chuẩn.
2. Upload lên R2 Bucket:
   ```bash
   npx wrangler r2 object put luyen-thi-content/quizzes/cambridge/flyers/part2/FW2-HARD-001.json --file=content/...
   ```
3. Insert metadata vào D1 `quiz_catalog`:
   ```sql
   INSERT INTO quiz_catalog (quiz_id, slug, pathway, subject_slug, title, skill, part, difficulty, questions, is_free, is_published)
   VALUES ('FW2-HARD-001', 'fw2-hard-001', 'cambridge', 'flyers', 'Set 1: Hard', 'reading', 2, 'hard', 5, 0, 1);
   ```
4. Invalidate KV Cache để bài xuất hiện ngay — **bắt buộc có `x-admin-key` header**:
   ```bash
   # Production
   curl -X POST https://luyenthi.io.vn/api/subjects/cache/invalidate \
     -H "Content-Type: application/json" \
     -H "x-admin-key: $CACHE_ADMIN_KEY" \
     -d '{"pathway":"cambridge","subject":"flyers"}'

   # Staging
   curl -X POST https://dev.luyenthi.io.vn/api/subjects/cache/invalidate \
     -H "Content-Type: application/json" \
     -H "x-admin-key: $CACHE_ADMIN_KEY" \
     -d '{"pathway":"cambridge","subject":"flyers"}'
   ```
   > `CACHE_ADMIN_KEY` lưu trong Cloudflare Worker Secrets. Thiếu header → `403 Forbidden`.
   > `deploy-staging.mjs` tự động gửi header này sau mỗi deploy staging.

### 4. Backups & Rollbacks
- Trước khi thực hiện migration, dự án đã tạo snapshot git trên branch `feature/quiz-catalog-migration`.
- Data D1 được export ra thư mục `backup/d1-backup-20260510-0712.sql`.
- File `subjects.ts` cũ được lưu tại `backup/subjects.ts.bak`.

---

## ⚡ FRONTEND BUNDLE OPTIMIZATION (2026-05-17)

> **Mục tiêu:** Giảm JS tải ban đầu cho user. Mỗi engine chỉ tải khi user mở bài cần engine đó.

### 1. Code Splitting — `QuizPage.tsx`

**Vấn đề:** `QuizPage.tsx` static-import toàn bộ 9 Flyers engines → ~80KB engine JS bundle vào 1 file, tải xuống dù user chỉ vào trang chủ.

**Fix:** Chuyển 9 engines sang `React.lazy()` + `<Suspense>`. Vite tự động split thành 9 JS chunk riêng.

**Kết quả:** User vào bài Part 1 chỉ tải `FlyersPart1Engine` (~10.6 kB gzip: 3.7 kB), không phải toàn bộ.

**Quy tắc cho engine mới:** Xem `docs/ENGINE_CREATION_GUIDE.md` mục **"2. Trong QuizPage.tsx — BẮT BUỘC LAZY LOAD (v3.0)"**.

### 2. Tách Types — `subjects.types.ts`

**Vấn đề:** Component chỉ cần `interface Lesson` nhưng phải kéo theo toàn bộ `subjects.ts` (69 kB data).

**Fix:** Tách 2 interface ra `src/react-app/data/subjects.types.ts`. `subjects.ts` re-export lại → backward-compatible.

```typescript
// Chỉ cần types → import nhẹ:
import type { Lesson } from "../data/subjects.types";

// Backward-compatible (không cần đổi file cũ):
import type { Lesson } from "../data/subjects"; // vẫn hoạt động
```

### 3. Files đã sửa

| File | Thay đổi |
|------|----------|
| `src/react-app/pages/QuizPage.tsx` | 9 static imports → `React.lazy()` + `<Suspense>` |
| `src/react-app/data/subjects.types.ts` | Mới — `Lesson` + `Subject` interfaces |
| `src/react-app/data/subjects.ts` | Re-export types từ `subjects.types.ts` |
| `src/react-app/utils/urlHelpers.ts` | Import từ `subjects.types` |
| `src/react-app/components/dashboard/LessonCard.tsx` | Import từ `subjects.types` |
| `docs/ENGINE_CREATION_GUIDE.md` | v3.0 — quy tắc lazy load bắt buộc |

