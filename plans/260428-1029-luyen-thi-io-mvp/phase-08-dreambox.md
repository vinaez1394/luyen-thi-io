# Phase 08: Dream Box + Email Approval
> Trạng thái: ⬜ Chưa làm | Phụ thuộc: Phase 01, 03, 07

---

## 🎯 Mục tiêu

Hộp Quà Ước Mơ — USP #4 của dự án. Bé chọn phần thưởng → gửi email phụ huynh → phụ huynh confirm → Dream Box xuất hiện ở Dashboard mỗi ngày.

---

## 🔄 Flow đầy đủ

```
Bé:   Vào "Hộp Quà" → Chọn preset ảnh / Gõ tên quà
Bé:   Chọn loại mục tiêu (100 sao / 15 khiên / hoàn thành)
Bé:   Nhấn "💌 Gửi cho ba/mẹ"
─────────────────────────────────────────
System: Tạo dream_goals (status='pending', approval_token)
System: Gửi email qua Resend.com
─────────────────────────────────────────
PH:   Nhận email đẹp, thấy ảnh + tên quà bé muốn
PH:   Nhấn "✅ Đồng ý" trong email → /api/dream/approve/:token
─────────────────────────────────────────
System: dream_goals.status = 'approved'
Bé:   Mở app thấy "Ba/mẹ đã đồng ý! 🎉"
Bé:   Dream Box xuất hiện trên Dashboard
```

---

## ✅ Danh sách công việc

### Backend
- [ ] Cài `npm i resend`
- [ ] Route `POST /api/dream/create` — tạo dream_goal, generate token, gửi email
- [ ] Route `GET /api/dream/approve/:token` — verify token, update status → redirect đến trang success
- [ ] Route `GET /api/dream/reject/:token` — cập nhật status='rejected', redirect trang chọn lại
- [ ] Route `GET /api/dream/status/:studentId` — lấy dream goal hiện tại
- [ ] Gửi email đẹp dạng HTML (không plain text) via Resend

### Frontend: Setup Dream Box
- [ ] `DreamBoxSetupPage.tsx` — flow 3 bước:
  - Bước 1: Chọn ảnh phần thưởng (grid 50 preset + ô "Tự gõ tên")
  - Bước 2: Chọn loại mục tiêu + số lượng
  - Bước 3: Review + nút "💌 Gửi cho ba/mẹ"
- [ ] `PresetImageGrid.tsx` — grid 4 cột ảnh dễ thương
- [ ] `GoalTypePicker.tsx` — 3 nút lớn: Sao / Khiên / Hoàn thành

### Frontend: Dashboard widget
- [ ] `DreamBoxFull.tsx` — trang chi tiết Dream Box
  - Ảnh phần thưởng lớn, đẹp
  - Progress bar animated
  - Text "Còn X [đơn vị] nữa!"
  - Journey Map mini (bản đồ hành trình)

### Email template (HTML)
- [ ] Subject: "💌 Con [Tên] muốn gửi điều ước đến ba/mẹ!"
- [ ] Body: ảnh phần thưởng lớn + text bé gõ + mục tiêu + 2 nút to
- [ ] Style inline (email client không load CSS external)
- [ ] Responsive (nhiều PH xem email trên điện thoại)

### Preset ảnh (50 ảnh curated)
- [ ] Tải 50 ảnh dễ thương từ nguồn free (Unsplash, Flaticon)
- [ ] Optimize (< 100KB/ảnh, WebP)
- [ ] Upload lên R2: `r2://luyen-thi-content/presets/rewards/`
- [ ] Tạo file `reward-presets.json` với danh sách keys + labels

---

## 📄 Files cần tạo

| File | Mục đích |
|------|---------|
| `src/worker/routes/dream.ts` | Dream Box API |
| `src/worker/lib/email.ts` | Resend email sender |
| `src/worker/lib/email-templates/dream-approval.ts` | HTML email template |
| `src/react-app/pages/DreamBoxSetupPage.tsx` | Setup flow |
| `src/react-app/pages/DreamBoxDetailPage.tsx` | Xem chi tiết progress |
| `src/react-app/components/dream-box/PresetImageGrid.tsx` | Grid ảnh chọn |
| `src/react-app/components/dream-box/GoalTypePicker.tsx` | Chọn loại mục tiêu |
| `src/react-app/components/dream-box/JourneyMap.tsx` | Bản đồ hành trình |
| `public/dream-approve-success.html` | Trang PH thấy sau khi approve |
| `content/reward-presets.json` | Danh sách 50 ảnh preset |

---

## 🧪 Tiêu chí hoàn thành

- [ ] Flow setup hoạt động end-to-end
- [ ] Email được gửi thật (test với email thật)
- [ ] Email link approve hoạt động, không expired trong 7 ngày
- [ ] Sau approve → bé thấy Dream Box trên Dashboard
- [ ] Progress cộng đúng mỗi khi kiếm sao
- [ ] Đạt mục tiêu → email thông báo PH
- [ ] Fallback: PH có thể approve từ... (Phase 2: Parent Dashboard)

---

## ⚙️ Env vars cần thêm

```
RESEND_API_KEY=re_...
FROM_EMAIL=no-reply@luyen-thi-io.vn
APP_URL=https://luyen-thi-io.workers.dev
```

---

*Sau khi xong → Cập nhật plan.md: Phase 08 = ✅*
*Tiếp theo: Phase 09 — Avatar + Profile*
