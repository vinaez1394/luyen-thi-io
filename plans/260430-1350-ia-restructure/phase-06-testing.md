# Phase 06: Testing & Deploy
> Status: ⬜ Pending  
> Rủi ro: 🟡 TRUNG BÌNH  
> Dependencies: Tất cả phase trước hoàn thành

---

## Objective
Kiểm thử toàn diện trước khi deploy production, đặc biệt tập trung vào URL redirect và pathway filtering.

---

## Tasks

### A. Smoke Test (Critical paths)
- [ ] **A1** — Test toàn bộ URL cũ → redirect đúng URL mới
- [ ] **A2** — Test `/learn` → chọn pathway → navigate đúng trang
- [ ] **A3** — Test đăng ký → onboarding → chọn lớp + pathway → dashboard personalized
- [ ] **A4** — Test làm quiz → kết quả → Hangman → stars cộng vào DB

### B. Edge Cases
- [ ] **B1** — User chưa onboarding vào `/dashboard` → redirect `/onboarding`
- [ ] **B2** — URL cũ `/toan-tu-duy/math-l1-p1` → redirect `/lop6/toan/math-l1-p1`
- [ ] **B3** — Truy cập `/cambridge/ket` (sắp có) → hiện "Sắp ra mắt"
- [ ] **B4** — Guest (chưa login) vào `/lop6/toan/math-l1-p1` → bài miễn phí vẫn load được

### C. Deploy
- [ ] **C1** — Push lên `dev` branch → GitHub Actions build + deploy
- [ ] **C2** — Verify trên `luyenthi.io.vn` (production)
- [ ] **C3** — Check Cloudflare D1 migrations đã chạy

---

## Checklist Deploy cuối
```
□ npx tsc -b → 0 errors
□ npm run build → success
□ git push origin dev
□ GitHub Actions → ✅ green
□ luyenthi.io.vn/learn → load OK
□ luyenthi.io.vn/cambridge/flyers → load OK  
□ luyenthi.io.vn/lop6/toan → load OK
□ luyenthi.io.vn/toan-tu-duy → redirect → /lop6/toan OK
```

---
Prev Phase: [Phase 05 — Game Integration](./phase-05-game.md)
