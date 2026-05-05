# Changelog

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

