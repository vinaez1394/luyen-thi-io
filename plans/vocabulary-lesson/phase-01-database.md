# Phase 01: Database Migration
Status: ✅ Complete — Applied 2026-05-07
Dependencies: Không có

## Objective
Chuẩn bị database sẵn sàng cho Vocabulary Lesson: thêm cột mới vào vocabulary_bank,
tạo bảng student_vocabulary với SRS, xóa bảng cũ không dùng.

## Implementation Steps

- [x] 1. Tạo migration `0009_vocabulary_lesson_schema.sql`
  - ALTER TABLE vocabulary_bank: thêm `certificate`, `cert_order`, `image_url`, `audio_url`, `emoji`
  - Cập nhật 250 từ Flyers hiện có: `certificate='flyers'`, `cert_order=3`
  - DROP TABLE IF EXISTS vocabulary_words (bảng cũ không dùng)

- [x] 2. Tạo migration `0010_seed_emojis_flyers_animals.sql` (kết hợp schema + emoji)
  - CREATE TABLE student_vocabulary với SRS fields
  - Index trên (student_id, word_id) và (student_id, next_review_at)

- [x] 3. Seed emoji cho 20 từ Animals Flyers hiện có (fl-an-001→020)
  - Tìm emoji phù hợp cho từng từ
  - UPDATE vocabulary_bank SET emoji = '...' WHERE id = '...'
  - Tạo migration `0011_seed_emojis_flyers.sql`

- [x] 4. Seed từ vựng Starters — Animals topic (29 từ st-an-001→029)
  - ID format: `st-an-001`, `st-an-002`...
  - Tìm emoji phù hợp cho từng từ
  - Tạo migration `0012_seed_starters_animals.sql`

- [x] 5. Seed từ vựng Movers — Animals topic (8 từ mv-an-001→008)
  - ID format: `mv-an-001`, `mv-an-002`...
  - Tạo migration `0013_seed_movers_animals.sql`

- [x] 6. Seed từ vựng Family (Starters 25 + Movers 9 + Flyers 4 = 38 từ)
  - Anh cung cấp danh sách từ → seed đầy đủ
  - Tạo migration `0014_seed_family_all.sql`

## Files to Create
- `src/worker/migrations/0009_vocabulary_lesson_schema.sql`
- `src/worker/migrations/0010_create_student_vocabulary.sql`
- `src/worker/migrations/0011_seed_emojis_flyers.sql`
- `src/worker/migrations/0012_seed_starters_animals.sql`
- `src/worker/migrations/0013_seed_movers_animals.sql`
- `src/worker/migrations/0014_seed_family_all.sql`

## Test Criteria
- [ ] `npx tsc --noEmit` pass
- [ ] Chạy migration thành công trên D1 Console
- [ ] Query `SELECT * FROM vocabulary_bank WHERE topic='animals' AND cert_order <= 3` trả về đúng từ
- [ ] `student_vocabulary` table tồn tại với đúng cấu trúc

## Notes
- Anh cần cung cấp danh sách từ Starters và Movers (ảnh chụp/file)
- Mỗi từ cần: word, translation_vi, ipa, word_type, example_en, example_vi, topic
- AI sẽ tìm emoji phù hợp khi seed

---
Next Phase: phase-02-api.md
