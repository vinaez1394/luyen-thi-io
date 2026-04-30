# Phase 01: Schema Foundation
> Status: ✅ Complete  
> Hoàn thành: 2026-04-30 14:00  
> Rủi ro: 🟢 THẤP — Chỉ thêm field, không xóa gì cũ  
> Dependencies: Không có — có thể bắt đầu ngay  
> Tương ứng: Sprint 1 trong BRIEF.md

---

## Objective
Bổ sung các trường dữ liệu nền tảng (`pathway`, `group`, `grade_target`, `unlocks_game`) vào TypeScript types, `subjects.ts`, content JSON, và D1 database schema.  
Đây là **hard dependency** — mọi phase sau đều cần hoàn thành phase này trước.

---

## Tasks

### A. TypeScript Types (subjects.ts)
- [x] **A1** — Thêm `pathway: "cambridge" | "lop6"` vào `Subject` interface
- [x] **A2** — Thêm `group?: string` vào `Subject` interface (VD: "toan", "flyers")
- [x] **A3** — Thêm `grade_target?: "3-4" | "4-5" | "5-6"` vào `Lesson` interface
- [x] **A4** — Thêm `unlocks_game?: "hangman" | "crossword" | null` vào `Lesson` interface

### B. Data (subjects.ts — phân loại lại)
- [x] **B1** — Phân loại Cambridge subjects: `pathway: "cambridge"`, `group: "flyers"/"movers"/...`
- [x] **B2** — Phân loại Lớp 6 subjects: `pathway: "lop6"`, `group: "toan"/"tieng-viet"/...`
- [x] **B3** — Thêm `grade_target` cho tất cả bài trong lộ trình Lớp 6

### C. Content JSON (R2 files)
- [x] **C1** — Cập nhật các file JSON trong `content/math/` thêm `pathway: "lop6"`, `group: "toan"`, `grade_target`
- [x] **C2** — Cập nhật các file JSON trong `content/flyers/` thêm `pathway: "cambridge"`, `group: "flyers"`

### D. D1 Database Schema
- [x] **D1** — Migration SQL: thêm `current_grade`, `selected_pathway` vào `student_profiles`

---

## Files to Create/Modify
- `src/react-app/data/subjects.ts` — MODIFY (thêm types + phân loại data)
- `content/math/MATH-L1-P*.json` — MODIFY (thêm pathway/group/grade_target)
- `content/flyers/*.json` — MODIFY (thêm pathway/group)
- `src/worker/migrations/` — CREATE (SQL migration file mới)

---

## Test Criteria
- [ ] TypeScript compile không lỗi sau khi sửa types
- [ ] Tất cả subjects có `pathway` field
- [ ] Tất cả lessons trong lop6 có `grade_target` field
- [ ] Migration SQL chạy thành công trên D1

---

## Notes
- **KHÔNG xóa** bất kỳ field nào cũ (backward compatible)
- `grade_target` chỉ bắt buộc cho lộ trình `lop6`; Cambridge dùng `level` có sẵn
- Chạy `npx tsc -b` để verify TypeScript sau mỗi thay đổi
- Sau phase này: chạy `git add -A && git commit -m "feat(schema): add pathway/group/grade_target fields"`

---
Next Phase: [Phase 02 — Routing Architecture](./phase-02-routing.md)
