# Phase 10: Nội dung JSON — 10 bài đầu tiên
> Trạng thái: ⬜ Chưa làm | Phụ thuộc: Không có (có thể làm bất kỳ lúc nào)

---

## 🎯 Mục tiêu

Tạo 10 bài học JSON đầu tiên chất lượng cao. Đây là nội dung thật để học sinh dùng thử. **Content is King** — 5 bài tốt > 50 bài vội vàng.

---

## 📋 Danh sách 10 bài

### Reading (5 bài)
| ID | Dạng | Part | Nội dung |
|----|------|------|---------|
| RW4-001 | multiple-choice | 4 | Đọc đoạn văn + chọn đáp án |
| RW4-002 | multiple-choice | 4 | Đọc đoạn văn + chọn đáp án |
| RW3-001 | drag-drop-fill | 3 | Điền từ vào đoạn văn (kéo thả) |
| RW3-002 | drag-drop-fill | 3 | Điền từ vào đoạn văn (kéo thả) |
| RW1-001 | matching | 1 | Nối chú thích với hình ảnh |

### Listening (5 bài)
| ID | Dạng | Part | Nội dung |
|----|------|------|---------|
| L4-001 | audio-mc | 4 | Nghe hội thoại + trắc nghiệm |
| L4-002 | audio-mc | 4 | Nghe hội thoại + trắc nghiệm |
| L2-001 | audio-fill | 2 | Nghe + điền thông tin vào form |
| L2-002 | audio-fill | 2 | Nghe + điền thông tin vào form |
| L1-001 | audio-mc | 1 | Nghe + chọn hình đúng |

---

## ✅ Danh sách công việc

### Soạn nội dung (TỰ SOẠN — không copy Cambridge)
- [ ] Soạn 5 bài Reading JSON (chủ đề: animals, family, school, sports, food)
- [ ] Soạn 5 bài Listening script (bài đọc dạng hội thoại)
- [ ] Mỗi câu hỏi phải có `explanation_vi` (giải thích tiếng Việt)
- [ ] Mỗi bài có `instructions_vi` rõ ràng

### Audio (cho 5 bài Listening)
- [ ] Đọc script thành audio (dùng text-to-speech AI hoặc tự đọc)
- [ ] Format: MP3, mono, 44.1kHz, bitrate 128kbps
- [ ] Thời lượng: 1–2 phút/file
- [ ] Upload lên R2: `r2://luyen-thi-content/flyers/listening/`

### Validate & Upload
- [ ] Viết script validate JSON schema (đảm bảo đúng format)
- [ ] Upload 10 bài lên R2: `r2://luyen-thi-content/flyers/`
- [ ] Tạo index file: `r2://luyen-thi-content/flyers/index.json` (danh sách tất cả bài)
- [ ] Test chạy từng bài qua Quiz Engine

---

## 🛠️ Script validate JSON

```typescript
// scripts/validate-quiz.ts
// Chạy: npx tsx scripts/validate-quiz.ts content/flyers/reading/RW4-001.json

const schema = {
  required: ['id', 'title', 'skill', 'level', 'part', 'type', 'instructions_vi', 'questions'],
  questionRequired: ['id', 'prompt', 'correct', 'explanation_vi']
};
// Validate → print lỗi nếu thiếu field
```

---

## 🧪 Tiêu chí hoàn thành

- [ ] 10 bài JSON hợp lệ (validate script pass)
- [ ] Tất cả bài chạy được qua Quiz Engine (không lỗi render)
- [ ] Audio 5 bài Listening phát được, rõ tiếng
- [ ] Hướng dẫn tiếng Việt rõ ràng, đúng ngữ pháp
- [ ] Nội dung KHÔNG copy từ đề thi Cambridge thật
- [ ] Mỗi bài có ít nhất 5 câu hỏi

---

## 💡 Gợi ý dùng AI để soạn nội dung

```
Prompt cho AI: "Hãy tạo 5 câu hỏi trắc nghiệm tiếng Anh Cambridge Flyers
về chủ đề [animals]. Format JSON như sau: [paste schema].
Đây là bài CAMBRIDGE-STYLE (không phải đề thi thật).
Thêm explanation_vi bằng tiếng Việt đơn giản cho trẻ 10 tuổi."
```

---

*Sau khi xong → Cập nhật plan.md: Phase 10 = ✅*
*Tiếp theo: Phase 11 — Polish + Mobile Test*
