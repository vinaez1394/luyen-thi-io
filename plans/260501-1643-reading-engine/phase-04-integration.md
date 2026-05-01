# Phase 04: QuizPage Integration + Scoring
Status: ✅ Complete
Dependencies: Phase 02, Phase 03

---

## Objective

Kết nối `ReadingEngine` vào `QuizPage.tsx` và xử lý đúng flow: load bài → làm bài → submit → hiện kết quả.

---

## Sửa QuizPage.tsx

```typescript
// Thêm điều kiện render ReadingEngine:
{quiz.type === "reading-passage" ? (
  <ReadingEngine quiz={quiz as ReadingQuiz} onComplete={handleComplete} />
) : (
  <QuizEngine quiz={quiz} answers={answers} ... />
)}
```

---

## Flow Submit

1. User nhấn "Nộp bài ✓"
2. Tính điểm: đúng/tổng × 100
3. Hiện kết quả inline (✅ xanh / ❌ đỏ nhạt + explanation_vi)
4. Tổng điểm + sao nhận được
5. Guest → GameLoginCTA modal | Logged-in → POST `/api/quiz/:id/submit`

---

## Files Cần Sửa

| File | Thay đổi |
|------|---------|
| `src/react-app/pages/QuizPage.tsx` | Thêm điều kiện `reading-passage` → ReadingEngine |
| `src/react-app/types/quiz.ts` | Thêm `"reading-passage"` vào `QuizType` union |

---

## Test Criteria

- [ ] ReadingEngine render đúng khi type = "reading-passage"
- [ ] Submit → kết quả đúng/sai per câu
- [ ] Guest → GameLoginCTA modal
- [ ] `npx tsc -b` clean

---

Next Phase: [phase-05-polish.md](./phase-05-polish.md)
