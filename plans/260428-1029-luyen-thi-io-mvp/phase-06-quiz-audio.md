# Phase 06: Audio Player + Exam Timer
> Trạng thái: ⬜ Chưa làm | Phụ thuộc: Phase 04

---

## 🎯 Mục tiêu

Thêm audio playback (cho bài Listening) và exam timer (practice mode vs exam mode). Đây là 2 tính năng tạo ra "cảm giác thi thật" — một trong những USP chính của dự án.

---

## ✅ Danh sách công việc

### Audio Player
- [ ] `AudioPlayer.tsx` component
- [ ] Nút Play/Pause to, dễ bấm (min 56px)
- [ ] Progress bar hiển thị thời gian
- [ ] Tự động play lần 2 sau khi lần 1 kết thúc (Cambridge format: nghe 2 lần)
- [ ] Sau lần 2: hiện thông báo "Audio đã phát 2 lần" + lock không play thêm (Exam mode)
- [ ] Practice mode: có thể replay bao nhiêu lần cũng được
- [ ] Load audio từ R2 URL (không qua Workers)
- [ ] Loading state khi đang buffer

### Timer
- [ ] `QuizTimer.tsx` — hiển thị MM:SS countdown
- [ ] Practice mode: timer tùy chọn (bật/tắt)
- [ ] Exam mode: bắt buộc có timer, hết giờ tự nộp
- [ ] Hiển thị cảnh báo màu đỏ khi còn < 10% thời gian
- [ ] Timer state lưu vào `useQuiz` hook

### Toggle Practice vs Exam mode
- [ ] Khi vào quiz, hỏi: "Luyện tập (không tính giờ) hay Thi thử (có đồng hồ)?"
- [ ] Lưu preference vào localStorage

---

## 📄 Files cần tạo/sửa

| File | Mục đích |
|------|---------|
| `src/react-app/components/quiz/AudioPlayer.tsx` | Audio component |
| `src/react-app/components/quiz/QuizTimer.tsx` | Timer countdown |
| `src/react-app/components/quiz/ModeSelector.tsx` | Practice vs Exam chọn |
| `src/react-app/hooks/useAudio.ts` | Audio state |
| `src/react-app/hooks/useTimer.ts` | Timer logic |
| `content/flyers/listening/L4-001.json` | Test data có audio_url |

---

## 📦 JSON mẫu Listening

```json
{
  "id": "L4-001",
  "type": "audio-mc",
  "skill": "listening",
  "part": 4,
  "audio_url": "https://pub-xxx.r2.dev/flyers/listening/L4-001.mp3",
  "play_count_limit": 2,
  "time_limit_seconds": 300,
  "instructions_vi": "Nghe đoạn hội thoại và chọn đáp án đúng. Audio sẽ phát 2 lần.",
  "questions": [...]
}
```

---

## 🧪 Tiêu chí hoàn thành

- [ ] Audio play/pause hoạt động
- [ ] Exam mode: audio chỉ phát đúng 2 lần rồi lock
- [ ] Practice mode: replay thoải mái
- [ ] Timer đếm ngược chính xác
- [ ] Hết giờ → tự nộp bài
- [ ] Audio load từ R2 không bị buffering dài (< 3s)

---

*Sau khi xong → Cập nhật plan.md: Phase 06 = ✅*
*Tiếp theo: Phase 07 — Student Dashboard*
