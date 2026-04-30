# Phase 07: Student Dashboard (Trang Chủ Bé)
> Trạng thái: ✅ Hoàn thành | Phụ thuộc: Phase 01, 03, 04

---

## 🎯 Mục tiêu

Trang đầu tiên bé thấy sau khi đăng nhập. Phải đẹp, vui, cho thấy mọi thứ quan trọng trong 1 màn hình: sao, streak, dream box, gợi ý bài hôm nay.

---

## 🖥️ Layout Dashboard

```
┌─────────────────────────────────────────┐
│ [Avatar] Chào Minh! Hôm nay học nhé 👋  │
│ 🔥 12 ngày liên tiếp  ⭐ 247 sao        │
├─────────────────────────────────────────┤
│         📦 HỘP QUÀ ƯỚC MƠ             │
│  [Hình ảnh phần thưởng]                 │
│  ████████░░  80/100 ⭐  Còn 20 sao!    │
├─────────────────────────────────────────┤
│  📊 KỸ NĂNG CỦA CON                    │
│  👂 Nghe   ████░  Level 4               │
│  📖 Đọc    ███░░  Level 3               │
│  ✍️  Viết   ██░░░  Level 2  ← Cần luyện │
├─────────────────────────────────────────┤
│  🎯 GỢI Ý HÔM NAY                      │
│  [Card bài: Listening Part 4]           │
│  [Card bài: Reading Part 3]             │
└─────────────────────────────────────────┘
```

---

## ✅ Danh sách công việc

### Backend
- [ ] Route `GET /api/student/:id/dashboard` — 1 query JOIN lấy đủ data
- [ ] Route `GET /api/student/:id/recommendations` — gợi ý bài dựa trên skill levels thấp nhất

### Frontend: Components
- [ ] `DashboardPage.tsx` — layout tổng
- [ ] `WelcomeHeader.tsx` — avatar + tên bé + streak + sao
- [ ] `StreakBadge.tsx` — hiển thị 🔥 X ngày, animation khi > 7 ngày
- [ ] `DreamBoxWidget.tsx` — mini version của Hộp Quà (nếu đã có goal approved)
- [ ] `SkillMap.tsx` — hiển thị level 3 kỹ năng dạng progress bars màu sắc
- [ ] `RecommendedLessons.tsx` — grid 2-3 bài gợi ý, click vào → vào QuizPage
- [ ] `LessonCard.tsx` — card bài học: icon skill, tên, độ khó, thời gian ước tính

### Logic recommendation
- [ ] Lấy skill levels từ D1
- [ ] Tìm skill thấp nhất → recommend bài ở part đó
- [ ] Nếu bé chưa làm bài nào → recommend bài dễ nhất để bắt đầu

---

## 📄 Files cần tạo

| File | Mục đích |
|------|---------|
| `src/worker/routes/student.ts` | Dashboard API |
| `src/react-app/pages/DashboardPage.tsx` | Trang chính |
| `src/react-app/components/dashboard/WelcomeHeader.tsx` | Header chào |
| `src/react-app/components/dashboard/StreakBadge.tsx` | Streak indicator |
| `src/react-app/components/dashboard/DreamBoxWidget.tsx` | Dream box mini |
| `src/react-app/components/dashboard/SkillMap.tsx` | Skill levels |
| `src/react-app/components/dashboard/RecommendedLessons.tsx` | Gợi ý bài |
| `src/react-app/components/dashboard/LessonCard.tsx` | Card bài học |

---

## 🧪 Tiêu chí hoàn thành

- [ ] Dashboard load trong < 500ms (1 API call duy nhất)
- [ ] Hiển thị đúng sao, streak, skill levels
- [ ] Dream Box widget hiển thị nếu có goal active
- [ ] Gợi ý bài đúng với skill yếu nhất
- [ ] Click LessonCard → vào đúng bài quiz
- [ ] Responsive đẹp trên mobile (375px) và tablet (768px)
- [ ] Đẹp với tất cả 6 themes

---

*Sau khi xong → Cập nhật plan.md: Phase 07 = ✅*
*Tiếp theo: Phase 08 — Dream Box*
