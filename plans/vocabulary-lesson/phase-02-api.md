# Phase 02: API Endpoints
Status: ⬜ Pending
Dependencies: Phase 01 hoàn thành

## Objective
Thêm 3 API endpoints mới vào vocabulary.ts. Không thay đổi `/api/vocabulary/random`.

## Implementation Steps

- [ ] 1. Thêm `GET /api/vocabulary/topics` vào `src/worker/routes/vocabulary.ts`
  - Query: tất cả topic distinct + word count per topic theo cert_order
  - Join với student_vocabulary (nếu có session) để lấy mastered/seen count
  - Return: list topics với emoji, word count, student progress

- [ ] 2. Thêm `GET /api/vocabulary/lesson` vào vocabulary.ts
  - Params: `topic`, `cert` (→ cert_order), `offset` (để phân trang 8 từ/session)
  - Logic ưu tiên: từ `next_review_at <= now` trước, rồi đến `mastery_level < 2`
  - Limit 8 từ/request
  - Return: words[] với đầy đủ fields + mastery_level từ student_vocabulary

- [ ] 3. Thêm `POST /api/vocabulary/progress` vào vocabulary.ts
  - Auth required (403 nếu guest)
  - Upsert vào student_vocabulary
  - Tính SRS: correct=true → tăng interval, correct=false → reset về 1 ngày
  - Return: new_mastery, next_review_at

- [ ] 4. Đăng ký route mới trong `src/worker/index.ts`
  - Kiểm tra vocabularyRoute đã mount chưa
  - Không cần thêm route mới nếu đã mount `/api/vocabulary/*`

- [ ] 5. Thêm TypeScript types cho Vocabulary Lesson
  - `src/react-app/types/vocabulary.ts`
  - Types: `VocabWord`, `VocabTopic`, `VocabLesson`, `VocabProgress`

- [ ] 6. Tạo custom hook `useVocabularyLesson`
  - `src/react-app/hooks/useVocabularyLesson.ts`
  - fetch /api/vocabulary/lesson + state management (words, step, score)

- [ ] 7. Tạo custom hook `useVocabularyTopics`
  - `src/react-app/hooks/useVocabularyTopics.ts`
  - fetch /api/vocabulary/topics với cert filter

- [ ] 8. Test API với curl / Wrangler tail
  - `curl https://luyen-thi-io.workers.dev/api/vocabulary/topics?cert=flyers`
  - `curl https://luyen-thi-io.workers.dev/api/vocabulary/lesson?topic=animals&cert=flyers`

## Files to Create/Modify
- `src/worker/routes/vocabulary.ts` — thêm 3 endpoints mới
- `src/react-app/types/vocabulary.ts` — [NEW]
- `src/react-app/hooks/useVocabularyLesson.ts` — [NEW]
- `src/react-app/hooks/useVocabularyTopics.ts` — [NEW]

## Test Criteria
- [ ] `npx tsc --noEmit` pass
- [ ] `GET /api/vocabulary/topics?cert=flyers` → trả về list topics
- [ ] `GET /api/vocabulary/lesson?topic=animals&cert=flyers` → trả về 8 từ
- [ ] `POST /api/vocabulary/progress` → 401 nếu guest, ok nếu logged in
- [ ] SRS interval tính đúng (correct=true → interval tăng)

---
Next Phase: phase-03-frontend-core.md
