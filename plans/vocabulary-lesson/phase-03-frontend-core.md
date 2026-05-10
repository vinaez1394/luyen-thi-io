# Phase 03: Frontend Core (Page + LEARN)
Status: ⬜ Pending
Dependencies: Phase 02 hoàn thành

## Objective
Xây dựng VocabularyPage (chọn topic) và LearnSection (xem từ vựng).
Đây là phần UI cốt lõi, user nhìn thấy đầu tiên.

## Implementation Steps

### VocabularyPage

- [ ] 1. Tạo `src/react-app/pages/VocabularyPage.tsx`
  - CertFilter: 5 tabs (Starters / Movers / Flyers / KET / PET)
  - TopicGrid: lưới 2-3 cột các topic cards
  - Lấy data từ `useVocabularyTopics(cert)`
  - State: `activeCert` (lưu vào localStorage: `vocab_cert`)

- [ ] 2. Tạo `src/react-app/pages/VocabularyPage.css`
  - Layout: cert filter tabs + topic grid responsive
  - Mobile: 2 cột | Desktop: 3-4 cột
  - TopicCard: emoji lớn + label + word count + progress ring
  - Dùng CSS variables từ themes.css, KHÔNG hardcode màu

- [ ] 3. Thêm route vào App.tsx
  - `/cambridge/vocabulary` → VocabularyPage
  - `/cambridge/vocabulary/:topic` → VocabularyLesson

- [ ] 4. Cập nhật SubjectPage — tab Vocabulary
  - Khi click tab "Vocabulary" trong `/cambridge/flyers` → navigate `/cambridge/vocabulary`
  - Truyền cert hiện tại qua URL params

### VocabularyLesson + LearnSection

- [ ] 5. Tạo `src/react-app/components/vocabulary/VocabularyLesson.tsx`
  - Wrapper với 3-step state machine: learn | practice | use
  - Lấy data từ `useVocabularyLesson(topic, cert)`
  - Hiển thị StepNav (3 tabs không click được — chỉ unlock lần lượt)

- [ ] 6. Tạo `src/react-app/components/vocabulary/LearnSection.tsx`
  - WordCard: swipe/click để navigate qua 8 từ
  - Mỗi card: emoji/ảnh + word + IPA + cert badge + nghĩa VN + example
  - Audio button: MP3 nếu có `audio_url`, else Web Speech API
  - Dot indicators + Prev/Next navigation
  - Sau khi xem từ cuối → nút "Bắt đầu luyện tập" xuất hiện

- [ ] 7. Web Speech API utility
  - `src/react-app/utils/speakWord.ts`
  - `speakWord(word: string)` — gọi speechSynthesis
  - Prefer 'en-GB' voice nếu có, fallback sang 'en-US'

- [ ] 8. CertBadge component
  - `src/react-app/components/vocabulary/CertBadge.tsx`
  - Hiển thị badge ST/MV/FL/KET/PET với màu tương ứng

- [ ] 9. LessonHeader component
  - Back button → `/cambridge/vocabulary`
  - Topic name + cert badge + session progress (session 1/5)

- [ ] 10. Tạo CSS cho VocabularyLesson
  - `src/react-app/components/vocabulary/VocabularyLesson.css`
  - WordCard styles, audio button, cert badges, step nav

## Files to Create/Modify
- `src/react-app/pages/VocabularyPage.tsx` — [NEW]
- `src/react-app/pages/VocabularyPage.css` — [NEW]
- `src/react-app/components/vocabulary/VocabularyLesson.tsx` — [NEW]
- `src/react-app/components/vocabulary/VocabularyLesson.css` — [NEW]
- `src/react-app/components/vocabulary/LearnSection.tsx` — [NEW]
- `src/react-app/components/vocabulary/CertBadge.tsx` — [NEW]
- `src/react-app/utils/speakWord.ts` — [NEW]
- `src/react-app/App.tsx` — thêm 2 routes
- `src/react-app/pages/SubjectPage.tsx` — cập nhật vocab tab

## Test Criteria
- [ ] `/cambridge/vocabulary` load được, hiển thị CertFilter + TopicGrid
- [ ] Click "Flyers" → hiển thị topics Animals và Family
- [ ] Click topic Animals → navigate `/cambridge/vocabulary/animals?cert=flyers`
- [ ] LEARN: 8 từ load được, audio button hoạt động
- [ ] Web Speech API phát âm khi click audio (nếu không có MP3)
- [ ] Xem hết 8 từ → nút "Bắt đầu luyện tập" xuất hiện
- [ ] SubjectPage tab Vocabulary → link đến VocabularyPage

---
Next Phase: phase-04-games.md
