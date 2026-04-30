# Phase 02: Routing Architecture
> Status: ⬜ Pending  
> Rủi ro: 🔴 CAO — Thay đổi URL toàn bộ app, cần test kỹ backward compat  
> Dependencies: Phase 01 phải hoàn thành trước  
> Tương ứng: Sprint 2 trong BRIEF.md

---

## Objective
Triển khai cấu trúc routing đa tầng mới theo BRIEF.md, phân tách rõ 2 lộ trình trong URL.  
Đồng thời tạo redirect rule để URL cũ vẫn hoạt động (không break bookmark).

---

## Target Routing Structure
```
CAMBRIDGE:
  /cambridge                → CambridgePage (danh sách cấp độ)
  /cambridge/:level         → SubjectPage (danh sách bài)
  /cambridge/:level/:quiz   → QuizPage

LỚP 6:
  /lop6                     → Lop6Page (4 nhóm môn)
  /lop6/:group              → SubjectPage (danh sách bài theo nhóm)
  /lop6/:group/:quiz        → QuizPage

PATHWAY SELECTION:
  /learn                    → PathwaySelectionPage

BACKWARD COMPAT (redirect 301):
  /flyers         → /cambridge/flyers
  /movers         → /cambridge/movers
  /toan-tu-duy    → /lop6/toan
  /:subject/:quiz → detect pathway → redirect
```

---

## Tasks

### A. Tạo trang mới
- [ ] **A1** — Tạo `PathwaySelectionPage.tsx` (trang `/learn` — chọn Cambridge / Lớp 6)
- [ ] **A2** — Tạo `CambridgePage.tsx` (trang `/cambridge` — hiển thị các cấp độ)
- [ ] **A3** — Tạo `Lop6Page.tsx` (trang `/lop6` — 4 nhóm môn song song)

### B. Cập nhật App.tsx routing
- [ ] **B1** — Thêm routes mới: `/learn`, `/cambridge`, `/cambridge/:level`, `/cambridge/:level/:quiz`
- [ ] **B2** — Thêm routes mới: `/lop6`, `/lop6/:group`, `/lop6/:group/:quiz`
- [ ] **B3** — Tạo `RedirectRoute` component xử lý backward compat từ URL cũ

### C. Cập nhật SubjectPage & QuizPage
- [ ] **C1** — `SubjectPage` nhận `pathway` từ URL hoặc từ subject data để hiển thị đúng breadcrumb source
- [ ] **C2** — `QuizPage` cập nhật đọc params từ cả 2 route pattern mới
- [ ] **C3** — Cập nhật tất cả `navigate()` calls trong app để dùng URL mới

### D. Backward Compat
- [ ] **D1** — Viết redirect mapping: `/:subject` → detect pathway → `/cambridge/:level` hoặc `/lop6/:group`
- [ ] **D2** — Test tất cả URL cũ đang được link trong content/subjects.ts

---

## Files to Create/Modify
- `src/react-app/App.tsx` — MODIFY (thêm routes mới)
- `src/react-app/pages/PathwaySelectionPage.tsx` — CREATE
- `src/react-app/pages/PathwaySelectionPage.css` — CREATE
- `src/react-app/pages/CambridgePage.tsx` — CREATE
- `src/react-app/pages/CambridgePage.css` — CREATE
- `src/react-app/pages/Lop6Page.tsx` — CREATE
- `src/react-app/pages/Lop6Page.css` — CREATE
- `src/react-app/pages/SubjectPage.tsx` — MODIFY (nhận pathway từ context mới)
- `src/react-app/pages/QuizPage.tsx` — MODIFY (hỗ trợ URL mới)

---

## Test Criteria
- [ ] `/learn` load đúng PathwaySelectionPage
- [ ] `/cambridge/flyers` load đúng danh sách bài Flyers
- [ ] `/cambridge/flyers/rw001` load đúng bài quiz
- [ ] `/lop6/toan` load đúng danh sách bài Toán
- [ ] `/lop6/toan/math-l1-p1` load đúng bài quiz
- [ ] `/flyers` (URL cũ) → redirect → `/cambridge/flyers` ✅
- [ ] `/toan-tu-duy` (URL cũ) → redirect → `/lop6/toan` ✅
- [ ] `/toan-tu-duy/math-l1-p1` (URL cũ) → redirect → `/lop6/toan/math-l1-p1` ✅

---

## ⚠️ Rủi ro cần chú ý
- Nếu redirect logic sai → toàn bộ URL cũ 404
- `useParams` trong SubjectPage và QuizPage sẽ thay đổi key names
- Test kỹ trên cả mobile và desktop

---
Prev Phase: [Phase 01 — Schema Foundation](./phase-01-schema.md)  
Next Phase: [Phase 03 — Navigation & Breadcrumbs](./phase-03-navigation.md)
