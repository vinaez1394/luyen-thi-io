# Phase 05: Data Seeding + Polish + Deploy
Status: ⬜ Pending
Dependencies: Phase 04 hoàn thành

## Objective
Seed đủ data cho 2 pilot topics (Animals + Family), tạo 1-2 passage mẫu Hướng B,
kiểm tra end-to-end trên mobile, deploy lên production.

## Implementation Steps

### Data Seeding

- [ ] 1. Nhận danh sách từ Starters Animals từ anh (ảnh/file)
  - AI đọc, format thành SQL migration
  - Thêm emoji phù hợp cho từng từ
  - File: `0012_seed_starters_animals.sql`

- [ ] 2. Nhận danh sách từ Movers Animals từ anh
  - Tương tự step 1
  - File: `0013_seed_movers_animals.sql`

- [ ] 3. Nhận danh sách từ Family (Starters + Movers + Flyers) từ anh
  - File: `0014_seed_family_all.sql`
  - Flyers family: kiểm tra xem đã có trong vocabulary_bank chưa

- [ ] 4. Tạo passage Hướng B mẫu cho Animals
  - `content/Cambridge/vocabulary/animals-p1.json`
  - Dùng 4-6 từ Flyers Animals, viết đoạn văn 80-120 từ
  - 4 blanks với 3 options mỗi blank

- [ ] 5. Tạo passage Hướng B mẫu cho Family
  - `content/Cambridge/vocabulary/family-p1.json`

### Polish & Deploy

- [ ] 6. Test toàn bộ flow trên mobile (iPhone/Android)
  - LEARN: swipe cards hoạt động, audio không bị chặn
  - PRACTICE: grid 2×2 dễ tap, không bị misclick
  - USE: điền từ và nộp hoạt động
  - Result screen: stars hiển thị đúng

- [ ] 7. Deploy và verify production
  - `git push origin dev` → GitHub Actions deploy
  - Mở browser kiểm tra `/cambridge/vocabulary`
  - Test với tài khoản có đăng nhập: tiến độ được lưu
  - Test với guest: hiển thị CTA đăng ký khi cần lưu tiến độ

- [ ] 8. Cập nhật HUONGDAN.md
  - Thêm module Vocabulary vào sitemap
  - Thêm bảng student_vocabulary vào Database section
  - Thêm 3 API endpoints mới vào API section
  - Cập nhật trạng thái tiến độ

## Files to Create/Modify
- `src/worker/migrations/0012_seed_starters_animals.sql` — [NEW, cần data từ anh]
- `src/worker/migrations/0013_seed_movers_animals.sql` — [NEW, cần data từ anh]
- `src/worker/migrations/0014_seed_family_all.sql` — [NEW, cần data từ anh]
- `content/Cambridge/vocabulary/animals-p1.json` — [NEW]
- `content/Cambridge/vocabulary/family-p1.json` — [NEW]
- `docs/HUONGDAN.md` — cập nhật

## Test Criteria (End-to-End)
- [ ] `/cambridge/vocabulary` load, hiển thị Animals + Family cards
- [ ] Flyers Animals: hiển thị từ của cả Starters + Movers + Flyers (badge ST/MV/FL)
- [ ] Hoàn thành 1 session Animals → stars cộng vào tài khoản
- [ ] SRS: sau khi học, `/api/vocabulary/lesson` trả về từ khác ở session sau
- [ ] Hướng B: Animals USE section hiển thị đoạn văn thay vì fill-in câu đơn
- [ ] Guest: CTA "Đăng ký để lưu tiến độ" xuất hiện khi nộp bài
- [ ] Mobile: toàn bộ flow hoạt động mượt, không bị overflow

## ⚠️ Lưu ý Deploy
- Vocabulary content không cần R2 sync step (không có JSON quiz files)
- Chỉ cần migration chạy: `wrangler d1 migrations apply luyen-thi-db --remote`
- Đảm bảo migrations chạy đúng thứ tự (0009 → 0010 → 0011 → ...)

---
🎉 Hoàn thành Phase 05 = Vocabulary Module MVP ready!
Phase tiếp theo (Phase 2 tương lai):
- Daily review widget trên Dashboard
- Parent vocabulary progress stats
- Upload audio MP3 cho Animals (20 từ Flyers)
- Thêm topics mới dần dần
