# Phase 04: Quiz Engine — Core (Multiple Choice + Fill Blank)
> Trạng thái: ⬜ Chưa làm | Phụ thuộc: Phase 01, 02

---

## 🎯 Mục tiêu

Xây dựng QuizEngine — trái tim của toàn bộ app. Engine đọc file JSON từ R2 và render đúng dạng bài.
Phase này làm 2 loại cơ bản nhất: **Multiple Choice** và **Fill-in-blank**.

### Nguyên tắc thiết kế cốt lõi: Strategy Pattern (Plugin-based)

Engine được thiết kế theo dạng **bảng registry** — thêm dạng bài mới sau này chỉ cần:
1. Tạo component mới (VD: `AudioFill.tsx`)
2. Thêm 1 dòng vào `QUIZ_REGISTRY` trong `QuizEngine.tsx`
**KHÔNG** cần sửa bất kỳ logic nào của Engine, Header, Footer, Result Screen.

---

## 🏗️ Kiến trúc QuizEngine

```
QuizPage (page)
  └── QuizEngine (controller)
        ├── QuizHeader (tiêu đề, progress bar, timer)
        ├── InstructionBanner (hướng dẫn tiếng Việt)
        ├── [Render theo QUIZ_REGISTRY]:
        │     ├── MultipleChoice        ← Phase 04 (text)
        │     ├── MultipleChoice        ← Phase 04 (image, dùng chung, prop imageUrl?)
        │     ├── FillBlank             ← Phase 04
        │     ├── DragDropFill          ← Phase 05
        │     ├── DragDropMatch         ← Phase 05
        │     ├── Matching              ← Phase 05
        │     ├── AudioMC               ← Phase 06
        │     ├── AudioFill             ← Phase 06 (Listening P2)
        │     ├── AudioMatching         ← Phase 06 (Listening P3)
        │     └── AudioTrueFalse        ← Phase 06 (Listening P5)
        ├── UnknownTypeScreen           ← Fallback khi type chưa code
        └── QuizFooter (nút Nộp bài, trạng thái)

QuizResultScreen (màn hình kết quả)
  ├── StarDisplay (⭐ animation, delay 300ms/ngôi)
  ├── DreamBoxProgress (sao bay vào hộp)
  ├── AnswerReview (xem đáp án từng câu)
  └── ActionButtons (Xem đáp án / Học bài tiếp)
```

### QUIZ_REGISTRY (trái tim của Engine):

```typescript
// Thêm type mới vào đây — Engine tự động nhận ra
const QUIZ_REGISTRY: Record<QuizType, React.FC<QuizComponentProps>> = {
  "multiple-choice":        MultipleChoice,
  "multiple-choice-image":  MultipleChoice,  // same component, imageUrl prop
  "fill-blank":             FillBlank,
  "drag-drop-fill":         DragDropFill,    // Phase 05
  "drag-drop-match":        DragDropMatch,   // Phase 05
  "matching":               Matching,         // Phase 05
  "audio-mc":               AudioMC,          // Phase 06
  "audio-fill":             AudioFill,        // Phase 06
  "audio-matching":         AudioMatching,    // Phase 06
  "audio-true-false":       AudioTrueFalse,   // Phase 06
};
```

---

## 🗂️ Toàn bộ Types (JSON Schema)

### QuizType — tất cả dạng bài hiện có và tương lai:

```typescript
type QuizType =
  | "multiple-choice"        // Reading P4 — text, 4 options
  | "multiple-choice-image"  // Reading P1 — image options
  | "fill-blank"             // Reading P3 — gõ từ vào chỗ trống
  | "drag-drop-fill"         // Reading P5 — kéo từ vào chỗ trống
  | "drag-drop-match"        // Reading P2 — kéo nối 2 cột
  | "matching"               // Nối matching bằng click (mobile-friendly)
  | "audio-mc"               // Listening P1, P4 — nghe + chọn
  | "audio-fill"             // Listening P2 — nghe + điền bảng
  | "audio-matching"         // Listening P3 — nghe + nối
  | "audio-true-false";      // Listening P5 — nghe + đúng/sai
```

### JSON Schema chuẩn (bao gồm `is_free`):

```json
{
  "id": "MATH-L1-P1",
  "title": "Toán Tư Duy — Level 1 — Bài 1",
  "skill": "math",
  "level": "level-1",
  "part": 1,
  "type": "multiple-choice",
  "is_free": true,
  "instructions_vi": "Chọn đáp án đúng cho mỗi câu hỏi.",
  "questions": [
    {
      "id": "q1",
      "prompt": "Câu hỏi...",
      "image_url": "optional — chỉ dùng khi type = multiple-choice-image",
      "options": ["A", "B", "C", "D"],
      "correct": "A",
      "explanation_vi": "Giải thích tại sao đúng (tiếng Việt)"
    }
  ]
}
```

---

## ✅ Danh sách công việc

### Backend: API lấy quiz
- [ ] Route `GET /api/quiz/:quizId` → đọc file JSON từ R2 → trả về
  - Nếu quiz chưa có trong `quiz_configs` → mặc định `is_free=0`
  - Nếu `is_free=0` và chưa login → trả 403 với `{ error: "premium", loginUrl: "/login" }`
- [ ] Route `POST /api/quiz/:quizId/submit` → nhận answers → tính điểm → lưu D1 → trả về kết quả + sao
  - Nếu không có session → trả `{ ok: true, saved: false, score, stars }` (không lưu DB)
  - Nếu có session → lưu quiz_attempts bình thường
- [ ] Logic tính sao (trong `lib/scoring.ts`):
  - < 60% → 1 sao
  - 60–79% → 2 sao
  - 80–89% → 3 sao
  - 90–100% → 5 sao
- [ ] Sau submit (chỉ khi có session): cập nhật `student_stats.total_stars`, `daily_activity`, `quiz_attempts`
- [ ] Sau submit: cập nhật `dream_goals.current_progress` nếu `goal_type = 'stars'`

### Frontend: QuizEngine
- [ ] `types/quiz.ts` — định nghĩa QuizType, Quiz, Question, Answer interfaces
- [ ] `QuizEngine.tsx` — đọc `quiz.type` → tra QUIZ_REGISTRY → render đúng component
  - Nếu type không có trong registry → render `<UnknownTypeScreen />`
- [ ] `QuizHeader.tsx` — "Câu 3/5", progress bar màu, optional timer
- [ ] `InstructionBanner.tsx` — hiện `instructions_vi`, có thể collapse
- [ ] `MultipleChoice.tsx`:
  - Nhận prop `imageUrl?: string` — khi có ảnh render to hơn, khi không có chỉ render text
  - Hiện 4 options, click = chọn (visual: border sáng lên, scale nhẹ)
  - Chỉ chọn 1 đáp án tại 1 thời điểm
  - Đã chọn = highlight màu primary
- [ ] `FillBlank.tsx`:
  - Câu văn có `___` placeholder
  - Input box được highlight
  - Bàn phím mobile không che khuất câu hỏi (scroll vào view)
- [ ] `UnknownTypeScreen.tsx` — fallback thân thiện khi type chưa code
- [ ] `useQuiz.ts` — state management + submit logic

### Frontend: Kết quả
- [ ] `QuizResultScreen.tsx`
- [ ] Animation ngôi sao xuất hiện từng cái (delay 300ms/ngôi)
- [ ] Text: "+3 ⭐ vào Hộp Quà Ước Mơ!" (nếu có dream box active)
- [ ] Text: "Còn X sao nữa là đến [tên phần thưởng]!"
- [ ] Review từng câu: đúng (xanh lá) / sai (đỏ nhạt) + explanation_vi
- [ ] Nếu guest (chưa login): banner "Đăng nhập để lưu điểm"

### Seed Data
- [ ] `content/math/MATH-L1-P1.json` — 10 câu toán tư duy Level 1 (từ file docs)
- [ ] Thêm `MATH-L1-P1` vào `quiz_configs` với `is_free=1`

---

## 📄 Files cần tạo

| File | Mục đích |
|------|---------|
| `src/worker/routes/quiz.ts` | GET quiz + POST submit |
| `src/worker/lib/scoring.ts` | Logic tính điểm + sao |
| `src/worker/lib/stars.ts` | Update stars trong D1 |
| `src/react-app/types/quiz.ts` | TypeScript interfaces |
| `src/react-app/pages/QuizPage.tsx` | Page wrapper |
| `src/react-app/components/quiz/QuizEngine.tsx` | Controller + QUIZ_REGISTRY |
| `src/react-app/components/quiz/QuizHeader.tsx` | Progress + timer |
| `src/react-app/components/quiz/InstructionBanner.tsx` | Hướng dẫn VN |
| `src/react-app/components/quiz/MultipleChoice.tsx` | Dạng trắc nghiệm (text + image) |
| `src/react-app/components/quiz/FillBlank.tsx` | Dạng điền từ |
| `src/react-app/components/quiz/UnknownTypeScreen.tsx` | Fallback |
| `src/react-app/components/quiz/QuizResultScreen.tsx` | Màn hình kết quả |
| `src/react-app/hooks/useQuiz.ts` | State + submit logic |
| `content/math/MATH-L1-P1.json` | Seed data: 10 câu toán tư duy |

---

## 🧪 Tiêu chí hoàn thành

- [ ] Bài MC hiển thị đúng, chọn được đáp án
- [ ] Bài FillBlank gõ được text, không bị keyboard che
- [ ] Type không có trong registry → hiện UnknownTypeScreen (không crash)
- [ ] Nộp bài → màn hình kết quả với animation ngôi sao
- [ ] Guest nộp bài → thấy kết quả + banner mời đăng nhập (không lưu DB)
- [ ] Điểm được lưu vào D1 (quiz_attempts) khi đã login
- [ ] Stars được cộng vào student_stats
- [ ] Xem đáp án → thấy câu đúng/sai + giải thích tiếng Việt
- [ ] Tất cả buttons ≥ 48px height
- [ ] Không có màu hardcode

---

*Sau khi xong → Cập nhật plan.md: Phase 04 = ✅*
*Tiếp theo: Phase 05 — Drag & Drop*
