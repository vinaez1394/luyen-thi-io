# Phase 04: Onboarding & Dashboard
> Status: ⬜ Pending  
> Rủi ro: 🟡 TRUNG BÌNH  
> Dependencies: Phase 01 (schema), Phase 02 (routing)

---

## Objective
Nâng cấp Onboarding để thu thập `current_grade` và `selected_pathway`.  
Cập nhật Dashboard để hiện nội dung được cá nhân hóa theo lộ trình và trình độ bé.

---

## Tasks

### A. Onboarding Flow (6 bước)
- [ ] **A1** — Cập nhật bước Onboarding: thêm **"Bé đang học lớp mấy?"**
  - Lựa chọn: Lớp 3 / Lớp 4 / Lớp 5 (radio buttons dễ click)
  - Lưu vào: `student_profile.current_grade`
- [ ] **A2** — Thêm bước **"Bé muốn luyện gì?"**
  - 2 card lớn: `[🇬🇧 Chứng chỉ Cambridge]` vs `[🏫 Thi vào Lớp 6]`
  - Lưu vào: `student_profile.selected_pathway`
- [ ] **A3** — Logic: nếu chọn Cambridge → skip câu hỏi lớp (không cần)

### B. D1 Database Migration
- [ ] **B1** — Migration SQL: thêm `current_grade INTEGER` vào `student_profiles`
- [ ] **B2** — Migration SQL: thêm `selected_pathway TEXT` vào `student_profiles`
- [ ] **B3** — Cập nhật Worker API `/api/student/profile` (POST) nhận thêm 2 field mới

### C. Dashboard — Personalized
- [ ] **C1** — `useDashboard` hook: truyền `pathway` và `grade` vào API call
- [ ] **C2** — API `/api/student/dashboard` filter bài gợi ý theo `selected_pathway`
- [ ] **C3** — Filter thêm theo `grade_target` nếu pathway là `lop6`
- [ ] **C4** — Thay section "Bài Luyện Tập" dài → **"Nhiệm vụ hôm nay"** (max 3 bài)

---

## Files to Create/Modify
- `src/react-app/pages/OnboardingPage.tsx` — MODIFY (thêm 2 bước mới)
- `src/react-app/pages/OnboardingPage.css` — MODIFY
- `src/react-app/hooks/useDashboard.ts` — MODIFY (truyền pathway/grade)
- `src/react-app/pages/DashboardPage.tsx` — MODIFY (hiện "Nhiệm vụ hôm nay")
- `src/worker/routes/student.ts` — MODIFY (cập nhật API)
- `src/worker/migrations/0003_add_grade_pathway.sql` — CREATE

---

## Test Criteria
- [ ] Onboarding flow có thêm 2 bước mới (lớp + lộ trình)
- [ ] Sau onboarding: `student_profiles.current_grade` và `selected_pathway` được lưu
- [ ] Dashboard: chỉ hiện bài của lộ trình đã chọn
- [ ] Dashboard (lớp 4, lop6): hiện bài có `grade_target: "3-4"` hoặc `"4-5"`
- [ ] "Nhiệm vụ hôm nay" chỉ hiện tối đa 3 bài

---
Prev Phase: [Phase 03 — Navigation](./phase-03-navigation.md)  
Next Phase: [Phase 05 — Game Integration](./phase-05-game.md)
