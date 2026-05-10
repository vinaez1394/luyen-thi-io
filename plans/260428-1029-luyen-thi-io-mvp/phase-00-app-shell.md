# Phase 0.5 — App Shell: Layout Framework
> Phụ thuộc: Phase 01 (Foundation) ✅ | Phase 02 (Themes) ✅
> Xem spec đầy đủ: `docs/SPEC-APP-SHELL.md`

---

## Mục Tiêu

Xây dựng "khuôn" giao diện dùng chung: Global Header, Mobile Bottom Nav, Global Footer, Quiz Sub-header, Quiz Bottom Bar, và các Overlay utilities.

---

## Công Việc Chính

### Layout Components (Tầng 1 - Global)
- [ ] Tạo `src/react-app/components/layout/` folder
- [ ] `AppLayout.tsx` — wrapper bọc mọi trang, inject GlobalHeader + Footer
- [ ] `GlobalHeader.tsx` — Logo, Nav links, Avatar/Login, Theme switcher, Hamburger
- [ ] `GlobalHeader.css` — sticky top, box-shadow, height 64px
- [ ] `GlobalFooter.tsx` — Copyright, links, slogan
- [ ] `MobileBottomNav.tsx` — 4 tabs (Home/Lessons/Progress/Profile), chỉ ≤768px
- [ ] `AppLayout.css` — layout grid, padding-bottom cho MobileBottomNav

### Layout Components (Tầng 2 - Quiz)
- [ ] `QuizLayout.tsx` — wrapper cho quiz pages, ẩn GlobalFooter, thêm quiz chrome
- [ ] `QuizSubHeader.tsx` — Breadcrumb, tên bài, progress bubbles, timer, mode badge, nút thoát
- [ ] `QuizBottomBar.tsx` — Prev/Next/Submit, question count, status dots

### Overlay Utilities
- [ ] `Toast.tsx` — notification góc trên phải, auto-dismiss 3s
- [ ] `ExitConfirmDialog.tsx` — dialog xác nhận thoát bài
- [ ] `PaywallModal.tsx` — upsell khi guest vào bài premium
- [ ] Loading skeleton cho QuizPage

### Cập Nhật App.tsx
- [ ] Bọc tất cả routes trong `<AppLayout>`
- [ ] Bọc `/quiz/:id` thêm `<QuizLayout>`
- [ ] Xóa header/footer riêng đang có trong `HomePage.tsx`

### Rule Ngôn Ngữ
- [ ] Thêm field `ui_language: "vi" | "en"` vào quiz JSON schema
- [ ] `QuizLayout` đọc field này → render button "Next →" (EN) hay "Câu tiếp →" (VI)

---

## Tiêu Chí Hoàn Thành

- [ ] GlobalHeader hiển thị đúng trên mọi trang (Home, Login, Dashboard, Quiz)
- [ ] Mobile Bottom Nav hoạt động trên iPhone Safari, Android Chrome
- [ ] QuizSubHeader hiển thị progress bubbles đúng (câu đã chọn vs chưa chọn)
- [ ] Nút thoát bài → dialog xác nhận trước khi thoát
- [ ] Bài tiếng Anh → buttons "Next →" / "← Previous" / "Submit"
- [ ] Bài tiếng Việt → buttons "Câu tiếp →" / "← Câu trước" / "Nộp bài"
- [ ] Tất cả touch targets ≥ 48px (đúng RULES.md)
- [ ] Test trên: Desktop Chrome, iPhone Safari, Android Chrome

---

## Files Tạo Mới

```
src/react-app/components/layout/
├── AppLayout.tsx
├── AppLayout.css
├── GlobalHeader.tsx
├── GlobalHeader.css
├── GlobalFooter.tsx
├── MobileBottomNav.tsx
├── QuizLayout.tsx
├── QuizSubHeader.tsx
└── QuizBottomBar.tsx

src/react-app/components/ui/
├── Toast.tsx
├── ExitConfirmDialog.tsx
└── PaywallModal.tsx
```

## Files Sửa

```
src/react-app/App.tsx           ← Dùng AppLayout + QuizLayout
src/react-app/pages/HomePage.tsx ← Xóa header/footer riêng
```
