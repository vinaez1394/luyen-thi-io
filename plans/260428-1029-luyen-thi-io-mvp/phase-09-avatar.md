# Phase 09: Avatar + Profile Page
> Trạng thái: ⬜ Chưa làm | Phụ thuộc: Phase 02, 03

---

## 🎯 Mục tiêu

Trang "Hồ Sơ Của Con" — bé xem thông tin cá nhân, đổi avatar, đổi theme màu sắc.

---

## ✅ Danh sách công việc

### SVG Avatar Pack (12 avatars)
- [ ] Thiết kế hoặc tìm 12 SVG avatar cartoon style
  - Mèo 🐱, Chó 🐶, Thỏ 🐰, Cáo 🦊, Gấu Panda 🐼, Kỳ Lân 🦄
  - Ếch 🐸, Sư Tử 🦁, Cánh Cụt 🐧, Bướm 🦋, Robot 🤖, Phi Hành Gia 🚀
- [ ] Tất cả SVG: style tròn, dễ thương, consistent
- [ ] Lưu vào: `public/avatars/cat.svg`, `dog.svg`, v.v.

### Backend
- [ ] Route `PUT /api/student/:id/profile` — cập nhật display_name, avatar_id, theme

### Frontend
- [ ] `ProfilePage.tsx` — trang hồ sơ đầy đủ
- [ ] `AvatarGrid.tsx` — grid 4x3 avatar, click = chọn ngay (no save button)
- [ ] `AvatarDisplay.tsx` — component hiển thị avatar ở nhiều size (sm/md/lg)
- [ ] `ThemePicker.tsx` — 6 ô màu tròn, click = apply ngay
- [ ] Stats summary: tổng sao, streak, số bài đã làm, số khiên

### ProfilePage Layout
```
┌─────────────────────────────────┐
│  [Avatar lớn]  Minh             │
│  ✏️ Đổi tên                     │
│  ⭐ 247 sao  🔥 12 ngày  🛡️ 3   │
├─────────────────────────────────┤
│  🐾 Chọn avatar:                │
│  [🐱][🐶][🐰][🦊]              │
│  [🐼][🦄][🐸][🦁]              │
│  [🐧][🦋][🤖][🚀]              │
├─────────────────────────────────┤
│  🎨 Chủ đề màu:                 │
│  [🟣][🔵][🌸][🌿][🌙][🧡]     │
└─────────────────────────────────┘
```

---

## 📄 Files cần tạo

| File | Mục đích |
|------|---------|
| `public/avatars/*.svg` | 12 SVG avatars |
| `src/worker/routes/profile.ts` | Profile update API |
| `src/react-app/pages/ProfilePage.tsx` | Trang hồ sơ |
| `src/react-app/components/ui/AvatarGrid.tsx` | Grid chọn avatar |
| `src/react-app/components/ui/AvatarDisplay.tsx` | Hiển thị avatar |
| `src/react-app/components/ui/ThemePicker.tsx` | Chọn theme màu |

---

## 🧪 Tiêu chí hoàn thành

- [ ] 12 avatars hiển thị đúng, đẹp
- [ ] Click avatar → cập nhật ngay (kể cả header WelcomeHeader)
- [ ] Click theme → toàn app đổi màu ngay lập tức
- [ ] Save vào D1 persist qua reload
- [ ] Không có màu hardcode trong ProfilePage

---

*Sau khi xong → Cập nhật plan.md: Phase 09 = ✅*
*Tiếp theo: Phase 10 — Content JSON*
