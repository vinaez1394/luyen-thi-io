# 📋 PLAN: luyen-thi-io MVP
> Tạo: 2026-04-28 | Dự án: luyện thi Cambridge Flyers

---

## 🎯 Mục tiêu MVP

Ship được phiên bản đầu tiên cho học sinh thật dùng thử với:
- 5–10 bài luyện Flyers (Reading Part 4 + Listening Part 4)
- Đăng nhập Google, lưu điểm, thấy tiến độ
- Hộp Quà Ước Mơ cơ bản
- Giao diện đẹp, dễ thương, đúng cho trẻ 9–12 tuổi

---

## 📊 Bảng theo dõi tiến độ

| Phase | Tên | Trạng thái | Tiến độ |
|-------|-----|-----------|---------|
| 01 | Foundation — D1 Schema + Wrangler | ✅ Hoàn thành | 100% |
| 02 | Theme System + Design Tokens | ✅ Hoàn thành | 100% |
| 03 | Auth — Google OAuth | ✅ Hoàn thành | 100% |
| 04 | Quiz Engine — Core | ⬜ Chưa làm | 0% |
| 05 | Quiz Engine — Drag & Drop | ⬜ Chưa làm | 0% |
| 06 | Quiz Engine — Audio + Submit | ⬜ Chưa làm | 0% |
| 07 | Student Dashboard (Trang Chủ Bé) | ⬜ Chưa làm | 0% |
| 08 | Dream Box + Email Approval | ⬜ Chưa làm | 0% |
| 09 | Avatar + Profile | ⬜ Chưa làm | 0% |
| 10 | Nội dung JSON — 10 bài đầu tiên | ⬜ Chưa làm | 0% |
| 11 | Polish + Test trên Mobile | ⬜ Chưa làm | 0% |

**Tổng:** 11 phases | Ước tính: 6–8 tuần vibe coding đều đặn

---

## 🗺️ Thứ tự phụ thuộc

```
Phase 01 (Database)
    ↓
Phase 02 (Themes)   Phase 03 (Auth)
    ↓                   ↓
Phase 04 (Quiz Engine Core)
    ↓
Phase 05 (DnD)    Phase 06 (Audio)
    ↓                   ↓
Phase 07 (Dashboard) ← cần Auth + Quiz done
    ↓
Phase 08 (Dream Box) ← cần Dashboard done
Phase 09 (Avatar)    ← có thể song song với 08
    ↓
Phase 10 (Content JSON) ← có thể làm bất kỳ lúc nào
    ↓
Phase 11 (Polish)
```

---

## ⚡ Quick Commands

```bash
# Bắt đầu phase tiếp theo
/code phase-01

# Xem tiến độ
/next

# Lưu context
/save-brain
```

---

## 📁 Files trong plan này

- `plan.md` — File này (overview)
- `phase-01-foundation.md` — D1 Schema + Wrangler setup
- `phase-02-themes.md` — Theme System + CSS Design Tokens
- `phase-03-auth.md` — Google OAuth
- `phase-04-quiz-core.md` — Quiz Engine (MC + FillBlank)
- `phase-05-quiz-dnd.md` — Quiz Engine (DragDrop)
- `phase-06-quiz-audio.md` — Audio Player + Submit Logic
- `phase-07-dashboard.md` — Student Dashboard
- `phase-08-dreambox.md` — Hộp Quà Ước Mơ + Email
- `phase-09-avatar.md` — Avatar + Profile
- `phase-10-content.md` — JSON content 10 bài
- `phase-11-polish.md` — Mobile test + Polish

---

*Đọc CONTEXT.md và RULES.md trước khi bắt đầu bất kỳ phase nào!*
