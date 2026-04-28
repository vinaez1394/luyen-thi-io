# Phase 11: Polish + Mobile Test
> Trạng thái: ⬜ Chưa làm | Phụ thuộc: Tất cả phases trước

---

## 🎯 Mục tiêu

Kiểm tra toàn bộ app trên thiết bị thật, sửa lỗi, thêm micro-animations, chuẩn bị để invite người dùng thử nghiệm đầu tiên.

---

## ✅ Danh sách công việc

### Test trên thiết bị thật
- [ ] iPhone Safari (iOS 16+): kéo thả, audio, form input
- [ ] Android Chrome: tất cả tính năng
- [ ] iPad: layout có đủ đẹp ở màn 768px không?
- [ ] Desktop Chrome + Firefox

### Touch & Accessibility
- [ ] Tất cả buttons có min-height 48px (chạy script scan tự động)
- [ ] Không có text nhỏ hơn 14px
- [ ] Màu tương phản đủ (contrast ratio ≥ 4.5:1 cho text)
- [ ] Không bị keyboard che input khi điền từ trên mobile

### Performance
- [ ] Dashboard load < 500ms (sau lần đầu)
- [ ] Audio bắt đầu play < 1s
- [ ] Quiz Engine render < 100ms
- [ ] Images lazy load (không chặn first render)

### Micro-animations (Wow factor)
- [ ] Sao bay từ màn hình vào Dream Box (CSS keyframe)
- [ ] Confetti khi hoàn thành bài xuất sắc (90%+)
- [ ] Streak badge rung nhẹ khi login
- [ ] Button press: scale 0.97 + haptic-like feedback
- [ ] Progress bar animate smooth khi tăng

### Sound Effects (nhỏ, không bắt buộc, có thể tắt)
- [ ] Tiếng "ding" khi chọn đáp án đúng
- [ ] Tiếng "swoosh" khi kéo thả xong
- [ ] Nhạc nền ngắn khi vào kết quả xuất sắc

### Các lỗi thường gặp cần check
- [ ] Session hết hạn → redirect về login (không crash)
- [ ] Mạng yếu → loading skeleton thay vì màn hình trắng
- [ ] Quiz submit 2 lần → không tính điểm 2 lần (debounce/disable button sau click)
- [ ] Dream Box khi chưa có → hiện CTA mời tạo (không hiện widget trống)

### Chuẩn bị invite beta users
- [ ] Thêm feedback button nhỏ ("Báo lỗi" hoặc "Góp ý")
- [ ] Tạo landing page đơn giản (1 trang giới thiệu)
- [ ] Viết hướng dẫn sử dụng ngắn cho phụ huynh

---

## 🧪 Tiêu chí hoàn thành = SẴN SÀNG LAUNCH

- [ ] Không có lỗi console error trên production
- [ ] Chạy được trên iPhone + Android + Desktop
- [ ] 10 bài học hoạt động đúng
- [ ] Email Dream Box gửi được
- [ ] Đăng nhập Google hoạt động
- [ ] Điểm + sao lưu đúng vào D1
- [ ] App không crash khi mất mạng giữa chừng

---

*Sau khi xong Phase 11 → MVP LAUNCH! 🚀*
*Mời 5–10 phụ huynh dùng thử và lấy feedback.*
