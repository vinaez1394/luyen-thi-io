# 📐 SPEC: App Shell — Layout Framework
> Brainstorm hoàn tất: 2026-04-28 | Phase: 0.5

---

## Tóm Tắt

Xây dựng "khuôn" giao diện dùng chung cho toàn bộ app, gồm 2 tầng:
- **Tầng 1 — Global App Shell:** Có mặt trên MỌI trang
- **Tầng 2 — Quiz Shell:** Chỉ xuất hiện trên trang `/quiz/:id`

Kiến trúc: **Layout Component Hierarchy (Approach A đã duyệt)**

---

## Kiến Trúc Component

```
App.tsx
├── <AppLayout>                    ← Tầng 1: Global shell
│   ├── <GlobalHeader />           ← Fixed top, mọi trang
│   ├── <MobileBottomNav />        ← Chỉ trên mobile
│   ├── {children}                 ← Nội dung trang
│   └── <GlobalFooter />           ← Ẩn trên /quiz routes
│
└── Các routes:
    ├── /              → <AppLayout><HomePage /></AppLayout>
    ├── /login         → <AppLayout><LoginPage /></AppLayout>
    ├── /dashboard     → <AppLayout><DashboardPage /></AppLayout>
    └── /quiz/:id      → <AppLayout><QuizLayout><QuizPage /></QuizLayout></AppLayout>
                                         ↑
                                   Tầng 2: Quiz shell
                                   (ẩn GlobalFooter, thêm QuizSubHeader + QuizBottomBar)
```

---

## Tầng 1 — Global App Shell

### GlobalHeader (Priority: MVP)

| # | Thành phần | Trạng thái auth | Ghi chú |
|---|-----------|----------------|---------|
| 1 | Logo + "🎓 Luyện Thi" | Mọi lúc | Click → về `/` |
| 5 | Avatar + tên bé | Đã login | Dropdown: Hồ sơ / Đổi theme / Đăng xuất |
| 6 | Nút Đăng nhập | Chưa login | Thay thế avatar |
| 8 | Hamburger menu | Mobile only | Mở sidebar drawer |
| 2 | Navigation links | Desktop | Trang chủ · Bài học · Tiến độ |
| 4 | Tổng sao ⭐ | Đã login | Hiển thị ngay header |
| 7 | Theme switcher 🎨 | Mọi lúc | Icon nhỏ, đổi màu instant |

**Rule ngôn ngữ:** Bài tiếng Anh → toàn bộ UI của quiz bằng tiếng Anh ("Next →", "← Previous", "Submit"). Bài Toán/Văn → tiếng Việt.

### MobileBottomNav (Priority: MVP)

```
🏠 Trang chủ  |  📚 Bài học  |  📊 Tiến độ  |  👤 Hồ sơ
     /               /lessons        /dashboard      /profile
```
- Chỉ hiển thị trên màn hình ≤ 768px
- Active tab highlight màu `--color-primary`
- Icon + label text dạng icon-label pairs

### GlobalFooter (Priority: MVP+)

- Chỉ hiển thị trên trang KHÔNG phải `/quiz/*`
- Nội dung: © 2026 Luyện Thi · luyenthi.io.vn
- Links: Về chúng tôi · Liên hệ · Chính sách bảo mật
- Slogan: "Học vui — Thi tự tin! 🌟"

---

## Tầng 2 — Quiz Shell (chỉ trên `/quiz/:id`)

### QuizSubHeader (Priority: MVP)

Thanh thứ 2, ngay bên dưới GlobalHeader, hiển thị context bài đang làm:

| # | Thành phần | Ghi chú |
|---|-----------|---------|
| 16 | Breadcrumb | Trang chủ › Flyers › Listening › Bài 1 |
| 17 | Tên bài + môn | "📖 MATH · Toán Tư Duy — Level 1 — Bài 1" |
| 18 | Progress bubbles | ●●●○○○○○○○ (mỗi chấm = 1 câu, màu = trạng thái) |
| 19 | "Câu X / Y" | Text rõ ràng bên cạnh bubbles |
| 20 | Timer ⏱ | Chỉ hiện khi Exam Mode |
| 21 | Mode badge | `Luyện tập` hoặc `Thi thử` |
| 22 | Nút Thoát ✕ | Click → confirmation dialog trước khi thoát |

### QuizBottomBar (Priority: MVP)

```
[← Câu trước]     ●●●○○○○○○○     [Câu tiếp →]
                   1 / 10          (→ "Nộp bài" ở câu cuối)
```

| # | Thành phần | Ghi chú |
|---|-----------|---------|
| 23 | Nút "← Câu trước" | Disable ở câu 1 |
| 24 | Chỉ báo câu | `1 / 10` ở giữa |
| 25 | Nút "Câu tiếp →" | Đổi thành "Nộp bài" ở câu cuối |
| 26 | Trạng thái câu | Chấm xanh = đã chọn, xám = chưa |
| 27 | Phím tắt hint | `Nhấn 1-4 để chọn` — ẩn trên mobile |

---

## Overlays & Utilities (Priority: MVP+)

| # | Thành phần | Trigger |
|---|-----------|---------|
| 28 | Toast notifications | Sau nộp bài, nhận sao |
| 29 | Dialog thoát bài | Nhấn ✕ trong quiz |
| 30 | Paywall modal | Guest vào bài premium |
| 31 | Loading skeleton | Khi load trang/bài |
| 32 | Confetti animation | Đạt ≥ 90% |

### Dialog Thoát Bài (item #29)
```
"Bạn muốn thoát bài?"
Tiến độ câu trả lời sẽ không được lưu.
[Tiếp tục làm bài]   [Thoát]
```

---

## Files Cần Tạo/Sửa

```
src/react-app/
├── components/
│   ├── layout/                    ← MỚI
│   │   ├── AppLayout.tsx          ← Wrapper chính
│   │   ├── AppLayout.css
│   │   ├── GlobalHeader.tsx
│   │   ├── GlobalHeader.css
│   │   ├── GlobalFooter.tsx
│   │   ├── MobileBottomNav.tsx
│   │   ├── QuizLayout.tsx         ← Quiz-specific shell
│   │   ├── QuizSubHeader.tsx
│   │   └── QuizBottomBar.tsx
│   └── ui/
│       ├── Toast.tsx              ← MỚI
│       ├── ExitConfirmDialog.tsx  ← MỚI
│       └── PaywallModal.tsx       ← MỚI
└── App.tsx                        ← Sửa: dùng AppLayout + QuizLayout
```

---

## Decision Log

| Quyết định | Thay thế đã xem xét | Lý do chọn |
|-----------|-------------------|-----------|
| Layout Component Hierarchy | Nested Routes, per-page header | Đơn giản nhất, ít refactor nhất |
| GlobalFooter ẩn trong quiz | Footer riêng cho quiz | Tránh confuse với QuizBottomBar |
| Mobile Bottom Nav (4 items) | Hamburger-only, sidebar | Thumb zone, 3-5 items chuẩn UX trẻ em |
| Progress dạng bubbles | Progress bar liền | Trực quan hơn, thấy từng câu |

---

*Spec được tạo từ phiên brainstorm ngày 2026-04-28*
