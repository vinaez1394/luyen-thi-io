# Changelog

## [2026-05-15]
### Added
- Bổ sung Engine mới: Cambridge Flyers Part 7 "Write a Story" (FlyersPart7Engine).
- Tính năng "Zero-Essay Policy" cho Part 7: đánh giá dựa trên từ khoá và số lượng từ, không lưu nội dung bài văn lên server nhằm bảo vệ quyền riêng tư của học sinh.
- Nội dung bài tập FW7-MED-001 "The Lost Dog" cho Flyers Part 7.

### Fixed
- Khắc phục lỗi nút filter "Part 7" không xuất hiện trong tab Reading & Writing do cấu hình `CAMBRIDGE_PARTS` bị thiếu.
- Cập nhật ảnh thumbnail hiển thị chính xác (thay vì emoji) cho các bài Part 6 (FW6-MED-002 đến FW6-MED-005) và bài Part 7.
- Khắc phục lỗi Part 7 bị phân sai vào tab "Writing" riêng biệt thay vì nằm chung trong "Reading & Writing".

## [2026-05-13]
### Added
- Chuyển đổi và bổ sung thêm các bài tập mới cho Cambridge Flyers Part 3 & Part 4 (từ FW3-MED-001 đến FW4-MED-006).

### Changed
- Cập nhật giao diện Cambridge Flyers Part 3 (FlyersPart3Engine) trên Desktop: VocabPanel và WordBank được cố định (sticky) bên cột trái để luôn hiển thị khi người dùng cuộn chuột.
- Cập nhật giao diện Cambridge Flyers Part 3 trên Mobile: Cố định WordBank ở đầu màn hình và chuyển VocabPanel xuống bên dưới bài đọc (sau câu 6) để tiết kiệm không gian.
- Cải thiện hiển thị phiên âm (IPA) nằm trên cùng một hàng (inline) với từ vựng tiếng Anh trong VocabPanel.
- Đồng bộ môi trường staging (`dev.luyenthi.io.vn`) với bản production.

## [2026-05-05]
### Fixed
- Sửa lỗi không lưu sao (stars) và streak: thêm credentials: "include" vào tất cả các `fetch` gọi API để gửi cookie đúng chuẩn.
- Khắc phục lỗi Crash 500 trên `/api/student/dashboard` khi một số cột trong database chưa được migrate (vd: `last_quiz_id`, `current_grade`).

## [2026-04-30]
### Added
- Hệ thống đa lộ trình (Dual Pathway): Cambridge Flyers và Lớp 6
- Giao diện Dashboard được làm mới với widget `TodayMissions` gợi ý bài học thông minh dựa vào lộ trình
- Giao diện Onboarding 5 bước (chọn tên, avatar, lớp, lộ trình, theme)
- API endpoint `POST /api/student/stars` xử lý cộng điểm thưởng sau khi chơi game

### Changed
- Cấu trúc URL mới (IA Restructure) thay cho định dạng `/quiz/:id` cũ
- Tích hợp Mini-game Hangman ngay sau khi học sinh làm bài quiz xong để học từ vựng
- Schema database bổ sung trường `current_grade` và `selected_pathway` vào `student_profiles`
- Schema database bổ sung bảng `vocabulary_words` và `student_vocabulary`

### Fixed
- Backward compatibility: Vẫn hỗ trợ URL `/quiz/:id` cũ để tránh mất link

