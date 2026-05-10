# Phase 05: Game Integration Closing
> Status: ⬜ Pending  
> Rủi ro: 🟢 THẤP  
> Dependencies: Phase 01 (schema), Phase 04 (DB)

---

## Objective
Hoàn thiện vòng kết nối Game ↔ Bài học: điểm Hangman ghi vào DB thật, HomeHangman lấy từ bài gần nhất.  
Tuân thủ nguyên tắc: **Game = công cụ củng cố, không phải tính năng độc lập**.

---

## Tasks

- [ ] **1** — Tạo API endpoint `POST /api/student/stars` nhận `{ stars: number, source: "hangman", quiz_id: string }`
- [ ] **2** — Cập nhật `QuizPage.tsx`: `onHangmanStarsEarned` gọi API thật (thay vì `console.log`)
- [ ] **3** — API cộng dồn stars vào `student_profiles.total_stars` trong D1
- [ ] **4** — `HomeHangman.tsx`: lấy từ vựng từ `localStorage["last_quiz_id"]` thay vì hardcoded
- [ ] **5** — Thêm `unlocks_game: "hangman"` vào các Lesson phù hợp trong `subjects.ts`

---

## Files to Create/Modify
- `src/worker/routes/student.ts` — MODIFY (thêm `/stars` endpoint)
- `src/react-app/pages/QuizPage.tsx` — MODIFY (gọi API stars)
- `src/react-app/components/vocabulary/HomeHangman.tsx` — MODIFY (dynamic quiz_id)
- `src/react-app/data/subjects.ts` — MODIFY (thêm `unlocks_game`)

---

## Test Criteria
- [ ] Làm xong bài, chơi Hangman → stars được cộng vào dashboard
- [ ] HomeHangman dùng từ vựng của bài vừa làm (nếu có)
- [ ] Không có route `/hangman` độc lập

---
Prev Phase: [Phase 04 — Onboarding](./phase-04-onboarding.md)  
Next Phase: [Phase 06 — Testing & Deploy](./phase-06-testing.md)
