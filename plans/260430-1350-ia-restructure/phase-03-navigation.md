# Phase 03: Navigation & Breadcrumbs
> Status: ⬜ Pending  
> Rủi ro: 🟡 TRUNG BÌNH  
> Dependencies: Phase 01 (pathway data), Phase 02 (URL mới)

---

## Objective
Cập nhật hệ thống điều hướng (Header dropdown + Breadcrumbs) để phản ánh đúng cấu trúc 2 lộ trình.  
Tránh "Library Clutter" — không list tất cả môn phẳng vào 1 menu.

---

## Tasks

### A. Global Header — Dropdown phân nhóm
- [ ] **A1** — Redesign dropdown "Môn học" thành 2 nhóm:
  ```
  🇬🇧 Cambridge
    ├─ Flyers (có bài)
    ├─ Movers (sắp có)
    └─ ...
  🏫 Thi Lớp 6
    ├─ 🧮 Toán Tư Duy
    ├─ 📖 Tiếng Việt (sắp có)
    └─ ...
  ```
- [ ] **A2** — Filter: chỉ hiện subjects có `available: true`
- [ ] **A3** — Badge "Sắp có" cho subjects `available: false`

### B. Breadcrumb Component
- [ ] **B1** — Tạo `Breadcrumb.tsx` component dùng chung
- [ ] **B2** — Tích hợp vào `SubjectPage`: hiện `Lộ trình > Môn`
  - Cambridge: `Luyện thi > Cambridge > Flyers`
  - Lớp 6: `Luyện thi > Thi Lớp 6 > Toán Tư Duy`
- [ ] **C3** — Tích hợp vào `QuizLayout`: hiện `Lộ trình > Môn > Bài`
  - Cambridge: `Cambridge > Flyers > Reading Part 4`
  - Lớp 6: `Lớp 6 > Toán > Bài 1`

### C. Mobile Navigation
- [ ] **C1** — Thêm tab "Lộ trình" vào MobileBottomNav (nếu có)
- [ ] **C2** — Hoặc cập nhật hamburger menu phân nhóm theo pathway

---

## Files to Create/Modify
- `src/react-app/components/ui/Breadcrumb.tsx` — CREATE
- `src/react-app/components/ui/Breadcrumb.css` — CREATE
- `src/react-app/components/layout/GlobalHeader.tsx` — MODIFY
- `src/react-app/components/layout/GlobalHeader.css` — MODIFY
- `src/react-app/pages/SubjectPage.tsx` — MODIFY (thêm Breadcrumb)
- `src/react-app/components/layout/QuizLayout.tsx` — MODIFY (thêm Breadcrumb)

---

## Test Criteria
- [ ] Header dropdown hiện 2 nhóm rõ ràng (Cambridge / Lớp 6)
- [ ] Click vào môn trong dropdown → navigate đúng URL mới
- [ ] Breadcrumb trong SubjectPage hiện đúng lộ trình
- [ ] Breadcrumb trong QuizPage hiện đúng lộ trình > môn > bài
- [ ] Breadcrumb clickable (click vào Cambridge → về /cambridge)
- [ ] Mobile: menu vẫn hoạt động

---
Prev Phase: [Phase 02 — Routing](./phase-02-routing.md)  
Next Phase: [Phase 04 — Onboarding & Dashboard](./phase-04-onboarding.md)
