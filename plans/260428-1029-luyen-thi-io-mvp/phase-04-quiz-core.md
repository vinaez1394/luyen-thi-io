# Phase 04: Quiz Engine — Core (Multiple Choice + Fill Blank)
> Trạng thái: ⬜ Chưa làm | Phụ thuộc: Phase 01, 02

---

## 🎯 Mục tiêu

Xây dựng QuizEngine — trái tim của toàn bộ app. Engine đọc file JSON từ R2 và render đúng dạng bài. Phase này làm 2 loại cơ bản nhất: Multiple Choice và Fill-in-blank.

---

## 🏗️ Kiến trúc QuizEngine

```
QuizPage (page)
  └── QuizEngine (controller)
        ├── QuizHeader (tiêu đề, progress bar, timer)
        ├── InstructionBanner (hướng dẫn tiếng Việt)
        ├── [Render theo type]:
        │     ├── MultipleChoice
        │     ├── DragDrop (Phase 05)
        │     └── FillBlank
        └── QuizFooter (nút Nộp bài, trạng thái)

QuizResultScreen (màn hình kết quả)
  ├── StarDisplay (⭐ animation)
  ├── DreamBoxProgress (sao bay vào hộp)
  ├── AnswerReview (xem đáp án từng câu)
  └── ActionButtons (Xem đáp án / Học bài tiếp)
```

---

## ✅ Danh sách công việc

### Backend: API lấy quiz
- [ ] Route `GET /api/quiz/:quizId` → đọc file JSON từ R2 → trả về
- [ ] Route `POST /api/quiz/:quizId/submit` → nhận answers → tính điểm → lưu D1 → trả về kết quả + sao
- [ ] Logic tính sao:
  - < 60% → 1 sao
  - 60–79% → 2 sao
  - 80–89% → 3 sao
  - 90–100% → 5 sao
- [ ] Sau submit: cập nhật `student_stats.total_stars`, `daily_activity`, `quiz_attempts`
- [ ] Cập nhật `dream_goals.current_progress` nếu goal_type = 'stars'

### Frontend: QuizEngine
- [ ] `QuizEngine.tsx` — đọc `quiz.type` → render đúng component
- [ ] `QuizHeader.tsx` — "Câu 3/5", progress bar màu, optional timer
- [ ] `InstructionBanner.tsx` — hiện `instructions_vi`, có thể collapse
- [ ] `MultipleChoice.tsx`:
  - Hiện 4 options (text hoặc text+image)
  - Click = chọn (visual feedback: border sáng lên, scale nhẹ)
  - Chỉ chọn 1 đáp án tại 1 thời điểm
  - Đã chọn = highlight màu primary
- [ ] `FillBlank.tsx`:
  - Câu văn có `___` placeholder
  - Input box được highlight
  - Bàn phím mobile không che khuất câu hỏi

### Frontend: Kết quả
- [ ] `QuizResultScreen.tsx`
- [ ] Animation ngôi sao xuất hiện từng cái (delay 300ms/ngôi)
- [ ] Text: "+3 ⭐ vào Hộp Quà Ước Mơ!" (nếu có dream box active)
- [ ] Text: "Còn X sao nữa là đến [tên phần thưởng]!"
- [ ] Review từng câu: đúng (xanh lá) / sai (đỏ nhạt) + explanation_vi

---

## 📄 Files cần tạo

| File | Mục đích |
|------|---------|
| `src/worker/routes/quiz.ts` | GET quiz + POST submit |
| `src/worker/lib/scoring.ts` | Logic tính điểm + sao |
| `src/worker/lib/stars.ts` | Update stars trong D1 |
| `src/react-app/pages/QuizPage.tsx` | Page wrapper |
| `src/react-app/components/quiz/QuizEngine.tsx` | Controller chính |
| `src/react-app/components/quiz/QuizHeader.tsx` | Progress + timer |
| `src/react-app/components/quiz/InstructionBanner.tsx` | Hướng dẫn VN |
| `src/react-app/components/quiz/MultipleChoice.tsx` | Dạng trắc nghiệm |
| `src/react-app/components/quiz/FillBlank.tsx` | Dạng điền từ |
| `src/react-app/components/quiz/QuizResultScreen.tsx` | Màn hình kết quả |
| `src/react-app/hooks/useQuiz.ts` | State + submit logic |
| `content/flyers/reading/RW4-001.json` | Bài test đầu tiên (seed data) |

---

## 📦 JSON mẫu để test

```json
{
  "id": "RW4-001",
  "title": "Flyers Reading Part 4 — Practice 1",
  "skill": "reading",
  "level": "flyers",
  "part": 4,
  "type": "multiple-choice",
  "instructions_vi": "Đọc câu hỏi và chọn đáp án đúng nhất. Chỉ chọn 1 đáp án cho mỗi câu.",
  "questions": [
    {
      "id": "q1",
      "prompt": "Where does Tom usually have breakfast?",
      "options": ["at school", "at home", "at a cafe", "at work"],
      "correct": "at home",
      "explanation_vi": "Tom nói anh ấy thường ăn sáng ở nhà trước khi đi học."
    }
  ]
}
```

---

## 🧪 Tiêu chí hoàn thành

- [ ] Bài MC hiển thị đúng, chọn được đáp án
- [ ] Bài FillBlank gõ được text, không bị keyboard che
- [ ] Nộp bài → màn hình kết quả với animation ngôi sao
- [ ] Điểm được lưu vào D1 (quiz_attempts)
- [ ] Stars được cộng vào student_stats
- [ ] Xem đáp án → thấy câu đúng/sai + giải thích tiếng Việt
- [ ] Tất cả buttons ≥ 48px height
- [ ] Không có màu hardcode

---

*Sau khi xong → Cập nhật plan.md: Phase 04 = ✅*
*Tiếp theo: Phase 05 — Drag & Drop*
