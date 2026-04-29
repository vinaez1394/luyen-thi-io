# Phase 4.5 — Word Tooltip + Hangman Vocabulary System
> Phụ thuộc: Phase 04 (Quiz Engine) ✅ | Phase 07 (Dashboard) ⬜
> Xem spec đầy đủ: `docs/SPEC-WORD-TOOLTIP-HANGMAN.md`

---

## Mục Tiêu

Xây dựng vòng lặp học từ vựng: Tra từ trong bài → Hangman ôn tập → Kiếm lại sao.

---

## Công Việc Chính

### 1. Database Migration
- [ ] Tạo `src/worker/db/migrations/002-vocabulary.sql`
- [ ] Bảng `vocabulary_words` (kho từ toàn hệ thống)
- [ ] Bảng `student_vocabulary` (tracking per-student)
- [ ] Apply migration: `wrangler d1 execute luyen-thi-db --file=migrations/002-vocabulary.sql`

### 2. JSON Schema Update
- [ ] Cập nhật `docs/CONTEXT.md` — thêm format `prompt` dạng array segments
- [ ] Cập nhật quiz JSON validator script (nếu có)
- [ ] Cập nhật bài mẫu (`content/math/`) sang format mới (backward compatible)

### 3. Backend API Routes (`src/worker/routes/vocabulary.ts`)
- [ ] `GET /api/vocabulary/hangman-words` — chọn 5 từ theo priority (review list → system → Cambridge)
- [ ] `POST /api/vocabulary/lookup` — ghi nhận từ đã tra, trừ lượt, trừ sao nếu cần
- [ ] `POST /api/vocabulary/hangman-result` — cộng sao, cập nhật mastery
- [ ] `GET /api/vocabulary/stats` — thống kê từ vựng của bé

### 4. Frontend — Word Tooltip Components
- [ ] `AnnotatedText.tsx` — nhận array segments → render text + tooltip words
- [ ] `TooltipWord.tsx` — từ có gạch chân chấm chấm, click để xem nghĩa
- [ ] `WordTooltipPopup.tsx` — popup hiện: từ + IPA + nghĩa tiếng Việt
- [ ] `LookupConfirmDialog.tsx` — dialog xác nhận "Bé có chắc muốn tra?"
- [ ] `StarCostDialog.tsx` — dialog "Đổi 1 ⭐ để xem nghĩa?"
- [ ] `useWordLookup.ts` hook — quản lý state lượt tra, gọi API

### 5. Tích Hợp vào QuizEngine
- [ ] `QuizEngine.tsx` — pass prompt qua `<AnnotatedText>` thay vì render string trực tiếp
- [ ] `MultipleChoice.tsx` — options cũng dùng `<AnnotatedText>`
- [ ] `QuizResultScreen.tsx` — thêm "đã dùng X gợi ý" vào kết quả

### 6. Frontend — Hangman Game
- [ ] `HangmanGame.tsx` — game component đầy đủ
  - Hiển thị nghĩa tiếng Việt + blanks `_ _ _ _ _`
  - Keyboard A-Z để chọn chữ cái
  - Vẽ hình hangman theo số lần sai (0-6)
  - Animation khi đúng/sai
- [ ] `HangmanResultScreen.tsx` — kết quả 5 từ + sao nhận được

### 7. Tích Hợp vào Quiz Result + Dashboard
- [ ] `QuizResultScreen.tsx` — thêm "Mini Hangman" section nếu có từ mới
- [ ] `VocabularyWidget.tsx` — widget dashboard: số từ cần ôn + nút chơi Hangman

### 8. Sửa RULES.md
- [ ] Cập nhật rule trừ sao: chỉ cho phép trừ trong Word Tooltip (xem SPEC)

---

## Tiêu Chí Hoàn Thành

- [ ] Từ có tooltip → gạch chân chấm chấm hiển thị đúng
- [ ] Confirmation dialog hiện trước mỗi lần tra (lần 1-3)
- [ ] Lần tra thứ 4+: hiện dialog đổi sao, trừ đúng 1⭐
- [ ] Khi total_stars = 0: hiện thông báo hết sao, gợi ý chơi Hangman
- [ ] Guest: xem được tooltip nhưng KHÔNG lưu vocabulary (console.log warning chứ không gọi API)
- [ ] Hangman: 5 từ/session, chọn đúng priority (review → system → Cambridge)
- [ ] Mastery: times_correct_hangman = 2 → is_mastered = 1
- [ ] Kết quả bài: hiển thị "đã dùng X gợi ý" đúng
- [ ] Dashboard widget: hiện số từ cần ôn

---

## Files Tạo Mới

```
src/react-app/components/vocabulary/
├── AnnotatedText.tsx
├── TooltipWord.tsx
├── WordTooltipPopup.tsx
├── LookupConfirmDialog.tsx
├── StarCostDialog.tsx
├── HangmanGame.tsx
├── HangmanGame.css
├── HangmanResultScreen.tsx
└── VocabularyWidget.tsx

src/react-app/hooks/
└── useWordLookup.ts

src/worker/routes/
└── vocabulary.ts

src/worker/db/migrations/
└── 002-vocabulary.sql
```

## Files Sửa

```
src/react-app/components/quiz/QuizEngine.tsx    ← Dùng AnnotatedText
src/react-app/components/quiz/MultipleChoice.tsx ← Dùng AnnotatedText
src/react-app/components/quiz/QuizResultScreen.tsx ← Thêm gợi ý count + mini Hangman
src/worker/index.ts                              ← Mount vocabulary routes
docs/RULES.md                                   ← Cập nhật rule trừ sao
docs/CONTEXT.md                                 ← Thêm 2 bảng mới, JSON schema mới
```
