# Phase 04: Games (PRACTICE + USE)
Status: ⬜ Pending
Dependencies: Phase 03 hoàn thành

## Objective
Xây dựng 2 mini-games PRACTICE và USE section.
PRACTICE: PictureMatchGame + WordBankFillGame.
USE: ContextFillGame (Hướng A mặc định, tự động nâng lên B khi có passage JSON).

## Implementation Steps

### PRACTICE Section

- [ ] 1. Tạo `src/react-app/components/vocabulary/PracticeSection.tsx`
  - Wrapper: chạy PictureMatchGame trước, khi pass → chạy WordBankFillGame
  - Tracking score tổng hợp

- [ ] 2. Tạo `src/react-app/components/vocabulary/PictureMatchGame.tsx`
  - Layout: 2×2 grid emoji/ảnh
  - Hiển thị 1 từ ở dưới → user chọn ô đúng
  - Distractor: 3 từ random cùng topic + cùng word_type
  - Animation: ✅ green flash (0.8s) | ❌ shake + highlight đỏ (1.5s)
  - Score hiển thị: X/8
  - Pass ≥ 5/8 → unlock WordBankFillGame

- [ ] 3. Tạo `src/react-app/components/vocabulary/WordBankFillGame.tsx`
  - Layout: câu có _______ + 4 chip options bên dưới
  - Dùng `example_en` từ DB, thay từ đích bằng _______
  - Chip click → feedback ngay (xanh/đỏ) → next sau 1s
  - Pass ≥ 5/8 → unlock USE section

### USE Section

- [ ] 4. Tạo `src/react-app/components/vocabulary/UseSection.tsx`
  - Logic detect: kiểm tra có passage JSON không
  - Nếu có → render PassageUseSection (Hướng B)
  - Nếu không → render ExampleFillSection (Hướng A)

- [ ] 5. Tạo `src/react-app/components/vocabulary/ExampleFillSection.tsx`
  - Hướng A: hiển thị 5-6 câu cùng lúc, mỗi câu có _______ + 3 options
  - User chọn hết rồi nộp → feedback tổng hợp sau khi nộp
  - Hiển thị giải thích từng câu

- [ ] 6. Tạo `src/react-app/components/vocabulary/PassageUseSection.tsx`
  - Hướng B: đọc đoạn văn ngắn có blanks, chọn từ đúng
  - Load từ JSON file: `content/Cambridge/vocabulary/${topic}-p{N}.json`
  - Random chọn 1 trong các passage available
  - Hiện `explanation_vi` sau khi nộp

- [ ] 7. Result Screen sau khi hoàn thành USE
  - ⭐ Stars earned dựa trên PRACTICE score
  - Danh sách từ: ✅ đúng / ❌ sai
  - CTA: "Tiếp tục học" (session tiếp theo) hoặc "Về danh sách topic"
  - Gọi `POST /api/vocabulary/progress` cho từng từ

- [ ] 8. CSS cho tất cả game components
  - `src/react-app/components/vocabulary/Games.css`
  - Mobile-first, touch-friendly (min 48×48px touch target)
  - Animations: shake, flash, slide

- [ ] 9. Audio trong games
  - PictureMatchGame: phát âm từ khi user đúng
  - WordBankFillGame: phát âm từ khi xác nhận đáp án đúng

## Files to Create
- `src/react-app/components/vocabulary/PracticeSection.tsx` — [NEW]
- `src/react-app/components/vocabulary/PictureMatchGame.tsx` — [NEW]
- `src/react-app/components/vocabulary/WordBankFillGame.tsx` — [NEW]
- `src/react-app/components/vocabulary/UseSection.tsx` — [NEW]
- `src/react-app/components/vocabulary/ExampleFillSection.tsx` — [NEW]
- `src/react-app/components/vocabulary/PassageUseSection.tsx` — [NEW]
- `src/react-app/components/vocabulary/Games.css` — [NEW]

## Test Criteria
- [ ] PictureMatchGame: chọn đúng → green, sai → shake + đỏ
- [ ] PictureMatchGame: sau 8 câu → hiện score + unlock tiếp nếu ≥5/8
- [ ] WordBankFillGame: hoạt động tương tự
- [ ] UseSection: Hướng A render khi không có passage JSON
- [ ] UseSection: Hướng B render khi có `animals-p1.json`
- [ ] Result screen: stars tính đúng, POST progress thành công
- [ ] Mobile: tất cả touch targets ≥ 48×48px

---
Next Phase: phase-05-polish.md
