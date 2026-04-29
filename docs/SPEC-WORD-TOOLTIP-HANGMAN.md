# 📐 SPEC: Word Tooltip + Hangman Vocabulary System
> Brainstorm hoàn tất: 2026-04-28 | Phase: 4.5

---

## Tóm Tắt

Hai tính năng liên kết tạo thành vòng lặp học từ vựng hoàn chỉnh:

```
[Quiz] → Tra từ (Word Tooltip) → mất ⭐
                ↓
         [Vocabulary List]
                ↓
         [Hangman Game] → kiếm lại ⭐ + từ được "tốt nghiệp"
```

---

## TÍNH NĂNG 1: Word Tooltip (Tra Từ Nhanh)

### Phạm Vi Áp Dụng
- ✅ Câu hỏi (prompt text)
- ✅ Các đáp án A, B, C, D
- ❌ Phần giải thích sau nộp bài (Phase 2)
- ✅ Guest: xem được nhưng KHÔNG lưu vocabulary
- ✅ Logged-in user: xem + lưu vào danh sách cá nhân

### Visual Indicator
Từ có tooltip → **gạch chân chấm chấm** (`text-decoration: underline dotted`)

```css
.tooltip-word {
  text-decoration: underline dotted var(--color-primary);
  text-underline-offset: 3px;
  cursor: pointer;
}
```

### JSON Schema — Approach A (Annotated Segments)

**Prompt dạng array thay vì string:**
```json
{
  "id": "L4-001",
  "questions": [
    {
      "id": "q1",
      "prompt": [
        { "text": "Find the next number in the " },
        { "text": "sequence", "tooltip": { "vi": "dãy số", "ipa": "ˈsiːkwəns" }},
        { "text": ": 1, 4, 9, 16, 25, ..." }
      ],
      "options": [
        { "id": "a", "content": [{ "text": "36" }] },
        { "id": "b", "content": [
          { "text": "The " },
          { "text": "pattern", "tooltip": { "vi": "quy luật", "ipa": "ˈpætərn" }},
          { "text": " is 40" }
        ]}
      ],
      "correct": "a",
      "explanation_vi": "Dãy số bình phương: 1², 2², 3², 4², 5², 6² = 36"
    }
  ]
}
```

**Backward compatibility:** Nếu `prompt` là string (JSON cũ) → render bình thường, không có tooltip.

### UX Flow — Star Economy

```
Bé click từ có gạch chân
         ↓
[Lần 1-3] Confirmation dialog:
"💡 Bé còn X lượt tra từ hôm nay.
 Bé có chắc muốn biết nghĩa của từ này không?"
 [Xem nghĩa]   [Thôi, tự suy nghĩ]
         ↓ Xem nghĩa
Tooltip hiện: từ + IPA + nghĩa tiếng Việt
Trừ 1 lượt. Lưu từ vào vocabulary list.
         ↓
[Lần 4+] Hết lượt miễn phí:
"⭐ Bé đã dùng hết 3 lượt tra từ rồi!
 Đổi 1 ⭐ ngôi sao để biết nghĩa từ này nhé?
 (Bé đang có X ⭐)"
 [Đổi 1 ⭐ để xem]   [Thôi vậy]
         ↓ Đổi sao
Tooltip hiện. Trừ 1⭐ từ student_stats.total_stars.
Lưu từ vào vocabulary list.
         ↓
[Hết sao] student_stats.total_stars = 0:
"Bé đã hết sao rồi! 😢
 Chơi Hangman để kiếm thêm sao nhé!"
 [Chơi Hangman]
```

### Màn Hình Kết Quả Bài — Cập Nhật
```
Hoàn thành bài!

⭐⭐⭐ (3/5 sao)
đã dùng 2 gợi ý  ← Ghi chú nhỏ bên dưới

+3 ⭐ vào Hộp Quà Ước Mơ!

[Xem đáp án]  [Học bài tiếp]
```

### Cấu Hình (Configurable)
Số lượt miễn phí **không hardcode** — lấy từ config:
```typescript
// src/worker/lib/config.ts
const WORD_LOOKUP_FREE_QUOTA = 3; // Admin có thể điều chỉnh sau
```

---

## TÍNH NĂNG 2: Hangman Vocabulary Game

### Database Schema Mới (Approach A)

```sql
-- Kho từ toàn hệ thống
CREATE TABLE vocabulary_words (
  id          TEXT PRIMARY KEY,
  word        TEXT NOT NULL,
  vi_meaning  TEXT NOT NULL,
  ipa         TEXT,
  source_quiz_id TEXT,        -- NULL = Cambridge word list
  level       TEXT NOT NULL,  -- 'flyers' | 'movers' | 'ket' | 'math'
  created_at  INTEGER DEFAULT (unixepoch())
);

-- Theo dõi từng học sinh
CREATE TABLE student_vocabulary (
  id                    TEXT PRIMARY KEY,
  student_id            TEXT REFERENCES student_profiles(id),
  word_id               TEXT REFERENCES vocabulary_words(id),
  times_looked_up       INTEGER DEFAULT 0,   -- Đếm số lần tra
  times_correct_hangman INTEGER DEFAULT 0,   -- Đếm lần đoán đúng
  is_mastered           INTEGER DEFAULT 0,   -- 0/1
  first_seen_at         INTEGER DEFAULT (unixepoch()),
  last_seen_at          INTEGER,
  UNIQUE(student_id, word_id)
);
```

**Query chọn từ cho Hangman (ưu tiên từ cần ôn):**
```sql
-- Ưu tiên 1: Từ bé đã tra, chưa mastered
SELECT vw.word, vw.vi_meaning, sv.times_correct_hangman
FROM student_vocabulary sv
JOIN vocabulary_words vw ON vw.id = sv.word_id
WHERE sv.student_id = ? AND sv.is_mastered = 0
ORDER BY sv.times_looked_up DESC
LIMIT 5;

-- Fallback: Từ trong hệ thống chưa tra bao giờ
SELECT vw.word, vw.vi_meaning
FROM vocabulary_words vw
LEFT JOIN student_vocabulary sv ON sv.word_id = vw.id AND sv.student_id = ?
WHERE sv.id IS NULL AND vw.level = ?
ORDER BY RANDOM()
LIMIT 5;
```

### Game Mechanics

```
Mỗi session Hangman: 5 từ ngẫu nhiên

Chọn từ theo ưu tiên:
1️⃣ Từ bé đã tra (review list), chưa mastered
2️⃣ Từ có tooltip trong mọi JSON bài học, chưa tra bao giờ
3️⃣ Cambridge Flyers/Movers word list (~600 từ) — Phase 2

Gameplay:
- Hiển thị nghĩa tiếng Việt → bé đoán từ tiếng Anh
- Dạng: _ _ _ _ _ _ _ (mỗi _ = 1 ký tự)
- Bé click từng chữ cái
- Sai ≤ 6 lần → vẫn còn cơ hội

Mastery System (2-strike):
- times_correct_hangman = 1 → "đánh dấu" (★)
- times_correct_hangman = 2 (session KHÁC nhau) → is_mastered = 1 → xóa khỏi review

Scoring:
- 5/5 đúng → +2 ⭐
- 4/5 đúng → +1 ⭐
- ≤3/5 đúng → 0 ⭐ (không bị trừ)
```

### Hai Điểm Xuất Hiện

**1. Mini Hangman sau bài quiz:**
```
Kết quả bài → (nếu có từ mới trong session)
"Ôn ngay các từ vừa học nhé! 📚"
[Mini Hangman — 5 từ từ bài vừa làm]
```

**2. Dashboard Widget "Ôn luyện hôm nay":**
```
📚 Ôn luyện hôm nay
Bé có 12 từ cần ôn
[🎮 Chơi Hangman]   Thành thạo: 7/19 từ
```

### Files Cần Tạo/Sửa

```
src/react-app/
├── components/
│   ├── vocabulary/              ← MỚI
│   │   ├── TooltipWord.tsx      ← Render từ có gạch chân + popup
│   │   ├── WordTooltipPopup.tsx ← Popup hiện nghĩa
│   │   ├── AnnotatedText.tsx    ← Render array segments → text + tooltips
│   │   ├── LookupConfirmDialog.tsx ← "Bé có chắc muốn tra?"
│   │   └── HangmanGame.tsx      ← Game component
│   └── dashboard/
│       └── VocabularyWidget.tsx ← Widget trên dashboard
src/worker/
├── routes/
│   └── vocabulary.ts            ← MỚI: API routes cho vocabulary
└── db/
    └── migrations/
        └── 002-vocabulary.sql   ← Migration thêm 2 bảng mới
```

---

## API Routes Mới

```
GET  /api/vocabulary/hangman-words  ← Lấy 5 từ cho session Hangman
POST /api/vocabulary/lookup         ← Ghi nhận từ đã tra, trừ lượt/sao
POST /api/vocabulary/hangman-result ← Ghi nhận kết quả Hangman, cập nhật mastery, cộng sao
GET  /api/vocabulary/stats          ← Thống kê: tổng từ, đã thành thạo, cần ôn
```

---

## Decision Log

| Quyết định | Thay thế | Lý do |
|-----------|---------|-------|
| Annotated Segments Array trong JSON | Plain text + map, inline syntax | An toàn nhất, hỗ trợ cụm từ, không runtime parse |
| 2 bảng D1 riêng | JSON trong student_stats, KV | Query được, báo cáo được, đúng RULES.md |
| Trừ sao (không phải Hint Token) | Hint Token riêng | Tạo đánh đổi thật, bé cân nhắc kỹ hơn |
| Mastery = đúng 2 lần (2 sessions) | SM-2 algorithm | Đơn giản, đủ hiệu quả, không over-engineer |
| Hangman 5 từ/session | 3, 7, 10 từ | Bite-sized, ~5 phút/session, phù hợp trẻ em |
| Confirmation dialog trước khi tra | Tra ngay không hỏi | Bé suy nghĩ trước khi dùng lượt |

---

## Thay Đổi RULES.md Cần Thực Hiện

```diff
- ❌ KHÔNG trừ sao của học sinh (sao chỉ cộng, không bao giờ trừ)
+ ✅ Sao CHỈ bị trừ trong trường hợp DUY NHẤT: tra từ Word Tooltip sau khi
+    hết lượt miễn phí (mỗi lần tra thêm = -1⭐, cho đến khi total_stars = 0)
+ ❌ KHÔNG trừ sao trong bất kỳ trường hợp nào khác
```

---

*Spec được tạo từ phiên brainstorm ngày 2026-04-28*
