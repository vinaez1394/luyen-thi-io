# 📚 VOCABULARY LESSON SYSTEM — THIẾT KẾ ĐẦY ĐỦ
> Tạo: 2026-05-07 | Brainstorm session với AI  
> Trạng thái: **Đã duyệt, sẵn sàng implement**

---

## 1. TỔNG QUAN

Module "Vocabulary" là một trang học từ vựng độc lập, nằm trong pathway **Cambridge**, với flow học theo chuẩn nghiên cứu giáo dục:

```
LEARN → PRACTICE → USE → RECYCLE (SRS)
```

### Vị trí trong sitemap
```
/cambridge/vocabulary              ← VocabularyPage (chọn topic)
/cambridge/vocabulary/:topic       ← VocabularyLesson (học bài)
```

Tab "Vocabulary" trong `/cambridge/flyers` (SubjectPage) sẽ **link đến** `/cambridge/vocabulary`.

---

## 2. CHỨNG CHỈ & TỪ VỰNG TÍCH LŨY

### Chuỗi tích lũy (cumulative)

| Chứng chỉ | Level | cert_order | Bao gồm từ của |
|---|---|---|---|
| Starters | Pre-A1 | 1 | Starters only |
| Movers | A1 | 2 | Starters + Movers |
| Flyers | A2 | 3 | Starters + Movers + Flyers |
| KET | A2+/B1 | 4 | Starters + Movers + Flyers + KET |
| PET | B1/B2 | 5 | Tất cả 5 cấp |

### Badge hiển thị trên UI

| Cấp | Badge | Màu |
|---|---|---|
| Starters | `ST` | 🟢 Xanh lá |
| Movers | `MV` | 🔵 Xanh dương |
| Flyers | `FL` | 🟣 Tím |
| KET | `KET` | 🟠 Cam |
| PET | `PET` | 🔴 Đỏ |

### ID Format

| Cấp | Prefix | Ví dụ |
|---|---|---|
| Starters | `st-` | `st-an-001` |
| Movers | `mv-` | `mv-an-001` |
| Flyers | `fl-` | `fl-an-001` *(250 từ đã có)* |
| KET | `ke-` | `ke-an-001` |
| PET | `pe-` | `pe-an-001` |

---

## 3. DATABASE SCHEMA

### 3.1 Thay đổi bảng `vocabulary_bank` (Migration mới)

```sql
-- Thêm 5 cột mới
ALTER TABLE vocabulary_bank ADD COLUMN certificate TEXT NOT NULL DEFAULT 'flyers';
-- Giá trị: 'starters' | 'movers' | 'flyers' | 'ket' | 'pet'

ALTER TABLE vocabulary_bank ADD COLUMN cert_order  INTEGER NOT NULL DEFAULT 3;
-- starters=1, movers=2, flyers=3, ket=4, pet=5

ALTER TABLE vocabulary_bank ADD COLUMN image_url   TEXT;
-- 'images/vocabulary/fl-an-001.jpg' — NULL = dùng emoji

ALTER TABLE vocabulary_bank ADD COLUMN audio_url   TEXT;
-- 'audio/vocabulary/fl-an-001.mp3' — NULL = dùng Web Speech API

ALTER TABLE vocabulary_bank ADD COLUMN emoji       TEXT;
-- Ví dụ: '🐱' cho cat, '🦈' cho shark
-- Fallback chain: image_url → emoji → topic emoji mặc định
```

**Xóa bảng cũ không dùng:**
```sql
DROP TABLE IF EXISTS vocabulary_words;
-- Bảng này không có migration, chỉ tồn tại trong brain.json — xóa để tránh nhầm lẫn
```

**SQL Query logic cumulative:**
```sql
-- User chọn "Flyers" (cert_order=3) → lấy tất cả từ cấp ≤ 3
SELECT * FROM vocabulary_bank
WHERE topic = 'animals'
  AND cert_order <= 3
ORDER BY cert_order ASC, id ASC;
```

### 3.2 Bảng `student_vocabulary` — Tạo mới với SRS

```sql
CREATE TABLE IF NOT EXISTS student_vocabulary (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id      TEXT NOT NULL,
  word_id         TEXT NOT NULL,
  mastery_level   INTEGER DEFAULT 0,   -- 0=new / 1=learning / 2=mastered
  correct_count   INTEGER DEFAULT 0,
  seen_count      INTEGER DEFAULT 0,
  interval_days   INTEGER DEFAULT 1,   -- SRS: khoảng cách ôn lại hiện tại
  next_review_at  INTEGER,             -- SRS: unix timestamp khi cần ôn
  last_seen_at    INTEGER,
  first_seen_at   INTEGER DEFAULT (unixepoch()),
  UNIQUE(student_id, word_id)
);

CREATE INDEX IF NOT EXISTS idx_sv_student ON student_vocabulary(student_id, word_id);
CREATE INDEX IF NOT EXISTS idx_sv_review  ON student_vocabulary(student_id, next_review_at);
```

**SRS Interval Ladder (đơn giản, phù hợp trẻ em):**

```
Sai → reset về 1 ngày
Đúng, mastery 0→1: next_review = +1 ngày
Đúng, mastery 1→2: next_review = +3 ngày
Đúng, mastery 2 (maintenance): +7 ngày → +14 ngày → +30 ngày
```

---

## 4. API ENDPOINTS

> **Nguyên tắc:** Không đụng vào `GET /api/vocabulary/random` đang phục vụ Flashcard + Hangman.

### 4.1 `GET /api/vocabulary/topics?cert=flyers`

Lấy danh sách topics kèm thống kê để hiển thị Topic Grid.

```json
{
  "cert": "flyers",
  "cert_order": 3,
  "topics": [
    {
      "key": "animals",
      "label": "Animals 🐾",
      "emoji": "🐾",
      "total_words": 35,
      "student_mastered": 12,
      "student_seen": 20,
      "review_due": 3
    }
  ]
}
```

### 4.2 `GET /api/vocabulary/lesson?topic=animals&cert=flyers&session=1`

Lấy 8 từ cho 1 session học (ưu tiên từ "chưa thành thạo" + "đến hạn ôn").

```json
{
  "topic": "animals",
  "cert": "flyers",
  "session_number": 1,
  "total_sessions": 5,
  "words": [
    {
      "id": "fl-an-001",
      "word": "cheetah",
      "certificate": "flyers",
      "cert_order": 3,
      "translation_vi": "con báo săn",
      "ipa": "/ˈtʃiːtə/",
      "word_type": "noun",
      "example_en": "The cheetah is the fastest animal.",
      "example_vi": "Con báo săn là động vật nhanh nhất.",
      "emoji": "🐆",
      "image_url": null,
      "audio_url": null,
      "mastery_level": 0,
      "next_review_at": null
    }
  ]
}
```

### 4.3 `POST /api/vocabulary/progress`

Cập nhật kết quả sau PRACTICE — tính SRS interval.

```json
// Request:
{ "word_id": "fl-an-001", "correct": true, "session": "practice" }

// Response:
{ "ok": true, "new_mastery": 1, "next_review_at": 1746720000 }
```

---

## 5. FRONTEND ARCHITECTURE

### 5.1 Cây Component

```
VocabularyPage (/cambridge/vocabulary)
├── CertFilter (Starters / Movers / Flyers / KET / PET)
└── TopicGrid
    └── TopicCard × N
        ├── Emoji + Label
        ├── "X từ" badge
        └── Progress ring (% mastered)

VocabularyLesson (/cambridge/vocabulary/:topic?cert=flyers)
├── LessonHeader (breadcrumb + cert badge)
├── StepNav [LEARN] [PRACTICE] [USE]
├── LearnSection
│   ├── WordCard (emoji/img + audio + cert badge + meaning + example)
│   └── LearnNav (prev/next/done)
├── PracticeSection
│   ├── PictureMatchGame
│   └── WordBankFillGame
└── UseSection
    └── ContextFillGame (Hướng A default, Hướng B nếu có passage JSON)
```

### 5.2 File Structure

```
src/react-app/pages/
├── VocabularyPage.tsx         ← trang chọn topic
└── VocabularyPage.css

src/react-app/components/vocabulary/
├── HomeHangman.tsx            ← ĐÃ CÓ, KHÔNG đụng vào
├── HomeFlashcard.tsx          ← ĐÃ CÓ, KHÔNG đụng vào
├── GameLoginCTA.tsx           ← ĐÃ CÓ
├── VocabularyLesson.tsx       ← wrapper + state machine
├── LearnSection.tsx           ← LEARN step
├── PracticeSection.tsx        ← PRACTICE wrapper
│   ├── PictureMatchGame.tsx
│   └── WordBankFillGame.tsx
└── UseSection.tsx             ← USE step (A hoặc B)
```

### 5.3 State Flow

```
fetch /api/vocabulary/lesson
  ↓
words[8] loaded
  ↓
Step 1 LEARN   → user vuốt qua hết 8 từ → unlock PRACTICE
Step 2 PRACTICE → PictureMatch (≥5/8) → WordBankFill (≥5/8) → unlock USE
Step 3 USE     → ContextFill 5-6 câu → nộp → POST /api/vocabulary/progress
                                              → cập nhật SRS cho từng từ
```

---

## 6. LEARN SECTION — UX CHI TIẾT

Mỗi session = **8 từ** (theo nghiên cứu: 5-8 từ/ngày tối ưu cho trẻ 7-10 tuổi).

```
┌─────────────────────────────┐
│  [ST] badge    3 / 8        │  ← cert badge + position
│                             │
│          🐆                 │  ← emoji (hoặc ảnh JPEG từ R2)
│                             │
│        cheetah              │  ← từ lớn, bold
│      /ˈtʃiːtə/             │  ← IPA nhỏ hơn
│   🔊 (nút phát âm)         │  ← MP3 nếu có, else Web Speech API
│                             │
│      con báo săn            │  ← nghĩa tiếng Việt
│ "The cheetah is the fastest │
│  animal in the world."      │  ← example sentence
│                             │
│  [ ← ]  ●●●○○○○○  [ → ]   │  ← progress dots + nav
└─────────────────────────────┘
```

**Audio fallback chain:**
1. `audio_url` có → phát MP3 từ R2
2. `audio_url` null → `window.speechSynthesis` (Web Speech API, free, built-in)
3. Ghi chú: Web Speech API không đảm bảo British English — sẽ thay thế bằng MP3 dần dần

---

## 7. PRACTICE SECTION — UX CHI TIẾT

### Game 1: Picture Match

4 emoji/ảnh hiển thị dạng 2×2 grid, hiện 1 từ → chọn đúng ô.

- Distractor: **cùng topic + cùng word_type** → khó hơn, học tốt hơn
- ✅ Đúng → green flash → next sau 0.8s
- ❌ Sai → shake + highlight đáp án đúng → next sau 1.5s
- **Pass: ≥ 5/8 → unlock WordBankFill**

### Game 2: Word Bank Fill

Hiện câu có _______, chọn từ đúng từ 4 chip option.

- Dùng `example_en` từ DB, thay từ đích bằng `_______`
- Distractor: 3 từ random cùng topic + cùng word_type
- **Pass: ≥ 5/8 → unlock USE section**

---

## 8. USE SECTION — HƯỚNG A & HƯỚNG B

### Hướng A (Mặc định — Đơn giản)

Dùng `example_en` từ DB, tạo câu fill-in tương tự WordBankFill nhưng:
- 5-6 câu hiển thị cùng lúc (không phải 1 câu/lần)
- Feedback sau khi nộp hết (không phải tức thì)
- Distractor đa dạng hơn (hỗn hợp word_type)

### Hướng B (Nâng cao — Pre-written Passage)

Viết trước đoạn văn ngắn tích hợp 8-12 từ của topic, dạng fill-in-blank.

**Cấu trúc file passage (JSON):**

```json
// content/Cambridge/vocabulary/animals-p1.json
{
  "topic": "animals",
  "passage_id": "animals-p1",
  "cert": "all",
  "title": "A Day at the Wildlife Park",
  "words_used": ["gorilla", "crocodile", "cheetah", "flamingo", "dolphin", "kangaroo", "eagle", "penguin"],
  "text_segments": [
    { "text": "Last summer, we visited a wildlife park. I saw a huge " },
    { "blank": 1, "word": "gorilla", "hint": "🦍" },
    { "text": " swinging in the trees. Near the lake, a " },
    { "blank": 2, "word": "crocodile", "hint": "🐊" },
    { "text": " was sleeping in the sun. In the sky, a majestic " },
    { "blank": 3, "word": "eagle", "hint": "🦅" },
    { "text": " flew over us. My favourite animal was the " },
    { "blank": 4, "word": "cheetah", "hint": "🐆" },
    { "text": " — it can run faster than any other animal." }
  ],
  "questions": [
    {
      "blank_number": 1,
      "options": ["gorilla", "dolphin", "flamingo"],
      "correct": "gorilla",
      "explanation_vi": "Gorilla (con khỉ đột) sống trong rừng."
    },
    {
      "blank_number": 2,
      "options": ["crocodile", "penguin", "kangaroo"],
      "correct": "crocodile",
      "explanation_vi": "Crocodile (cá sấu) thường ngủ gần nước."
    },
    {
      "blank_number": 3,
      "options": ["eagle", "cheetah", "gorilla"],
      "correct": "eagle",
      "explanation_vi": "Eagle (đại bàng) là loài chim săn mồi bay cao."
    },
    {
      "blank_number": 4,
      "options": ["cheetah", "dolphin", "flamingo"],
      "correct": "cheetah",
      "explanation_vi": "Cheetah (báo săn) là động vật chạy nhanh nhất."
    }
  ]
}
```

**Quy tắc tạo passage (2-5 passages/topic):**

1. **Độ dài:** 80-120 từ — ngắn gọn, phù hợp trẻ 7-10 tuổi
2. **Số blanks:** 4-6 blanks (không quá nhiều)
3. **Từ dùng:** Chọn 4-6 từ trong số 8 từ của session (không nhất thiết phải dùng hết)
4. **Ngữ cảnh:** Kể chuyện ngắn, có nhân vật, địa điểm cụ thể (không phải câu riêng lẻ)
5. **Distractor:** 2 từ trong cùng nhóm topic, sắp xếp để dễ → khó
6. **Hint:** Có emoji gợi ý nếu từ khó

**Cách random passage:**
```typescript
// Lấy tất cả passage files của topic → random 1 cái
const passageFiles = glob(`content/Cambridge/vocabulary/${topic}-p*.json`);
const selected = passageFiles[Math.floor(Math.random() * passageFiles.length)];
```

**Detect tự động A vs B:**
```typescript
// Nếu tìm thấy passage JSON → dùng Hướng B
// Nếu không → fallback về Hướng A (từ example_en trong DB)
const hasPassage = passageFiles.length > 0;
```

**Naming convention cho passage files:**
```
content/Cambridge/vocabulary/
├── animals-p1.json    ← passage 1 cho topic animals
├── animals-p2.json    ← passage 2 cho topic animals
├── family-p1.json
└── family-p2.json
```

---

## 9. GAMIFICATION & SCORING

Sau khi hoàn thành 1 session (LEARN + PRACTICE + USE):

| PRACTICE score | ⭐ nhận được |
|---|---|
| < 60% | ⭐ 1 |
| 60-79% | ⭐⭐ 2 |
| 80-89% | ⭐⭐⭐ 3 |
| 90-100% | ⭐⭐⭐⭐⭐ 5 |

*(Đồng nhất với bảng scoring hiện tại của hệ thống)*

---

## 10. SRS — SPACED REPETITION SYSTEM

**SRS đơn giản, 5 mức interval:**

```
Đúng lần 1 (mastery 0→1): ôn lại sau 1 ngày
Đúng lần 2 (mastery 1→2): ôn lại sau 3 ngày
Đúng maintenance 1:        ôn lại sau 7 ngày
Đúng maintenance 2:        ôn lại sau 14 ngày
Đúng maintenance 3+:       ôn lại sau 30 ngày
Sai bất kỳ lúc nào:       reset về 1 ngày
```

**Dashboard widget (Phase 2):**
```
┌─────────────────────────────┐
│ 📚 Từ vựng cần ôn hôm nay  │
│    🔴 8 từ đến hạn          │
│    [ Ôn ngay 5 phút → ]    │
└─────────────────────────────┘
```

---

## 11. MEDIA STRATEGY

**Fallback chain cho ảnh:**
```
image_url (JPEG từ R2) → emoji → topic emoji mặc định
```

**Fallback chain cho audio:**
```
audio_url (MP3 từ R2) → Web Speech API (browser built-in, free)
```

**Lưu ý về Web Speech API:**
- Không đảm bảo British English accent
- Chất lượng phụ thuộc vào browser/OS
- Sẽ được thay thế bằng MP3 dần dần khi có nguồn lực
- **Chiến lược thu âm:** Bắt đầu với 2 pilot topics (Animals + Family ~40 từ Flyers) → mở rộng dần

**R2 path structure:**
```
luyen-thi-content/
├── audio/vocabulary/{word_id}.mp3
└── images/vocabulary/{word_id}.jpg
```

---

## 12. PILOT SCOPE

**Sprint đầu tiên chỉ làm:**
- Topic: **Animals** (20 từ Flyers đã có + thêm Starters/Movers)
- Topic: **Family** (seed mới hoàn toàn)
- Cert: **Flyers** (test cumulative với 3 cấp)

---

## 13. DECISION LOG

| # | Quyết định | Thay thế đã xem xét | Lý do |
|---|---|---|---|
| D1 | DB-driven (Option 1) | JSON files, Hybrid | Cumulative filter dễ, tracking thống nhất |
| D2 | 5 cấp: Starters → Movers → Flyers → KET → PET | 3 cấp | Lộ trình học dài hạn |
| D3 | `cert_order <= N` trong SQL | `IN (...)` | Mở rộng dễ dàng khi thêm cấp mới |
| D4 | 8 từ/session | 12 từ, học hết topic 1 lần | Research: 5-8 từ/ngày cho trẻ 7-10 tuổi |
| D5 | Web Speech API (fallback), thay MP3 dần | TTS Cloudflare AI | Free, built-in, nullable field → swap dễ |
| D6 | Emoji per word (fallback), thay JPEG dần | Topic emoji chung | Rõ nghĩa hơn, nullable field → swap dễ |
| D7 | SRS đơn giản: 1→3→7→14→30 ngày | SM-2 phức tạp | Phù hợp độ tuổi, đủ hiệu quả |
| D8 | Pilot: Animals + Family | Tất cả topics | Test end-to-end trước khi nhân rộng |
| D9 | USE Hướng A (example_en), file passage JSON → Hướng B tự động | Chỉ A mãi | Không lock-in, upgrade dần |
| D10 | SubjectPage Vocab tab → link `/cambridge/vocabulary` | Embedded trong SubjectPage | Vocabulary là module độc lập |
| D11 | Xóa `vocabulary_words` (unused, gây nhầm) | Giữ lại | Không có migration, không có code dùng |
| D12 | Daily review widget → Phase 2 | Phase 1 | Pilot trước, dashboard sau |
| D13 | Parent vocab progress → Phase 2 | Phase 1 | Tương tự D12 |
| D14 | 2-5 passages/topic, random mỗi session | 1 passage cố định | Tránh nhàm chán khi học lại |

---

## 14. RISKS ĐÃ ACKNOWLEDGE

| Risk | Mức độ | Đã xử lý | Cách xử lý |
|---|---|---|---|
| R1: Không có SRS | 🔴 Cao | ✅ | Thêm `next_review_at` + `interval_days` vào student_vocabulary |
| R2: USE conflict | 🔴 Cao | ✅ | Hướng A mặc định, Hướng B upgrade dần qua passage JSON |
| R3: Content scale | 🔴 Cao | ✅ | Emoji + Web Speech API là default, thay thế dần |
| R4: SubjectPage tab | 🟡 Trung | ✅ | Tab Vocabulary → link `/cambridge/vocabulary` |
| R5: No daily review | 🟡 Trung | 📅 | Phase 2 — dashboard widget |
| G1: 2 vocab tables | 🔵 Thấp | ✅ | Xóa `vocabulary_words` |
| G2: Web Speech accent | 🔵 Thấp | 📝 | Document + thay MP3 dần |
| G3: Parent visibility | 🔵 Thấp | 📅 | Phase 2 — dashboard stats |

---

*Cập nhật lần cuối: 2026-05-07 | Brainstorm hoàn tất, chuyển sang implementation*
