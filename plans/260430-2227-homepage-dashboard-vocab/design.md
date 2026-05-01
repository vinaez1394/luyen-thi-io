# Design: Homepage & Dashboard Restructure + Vocabulary System
> Created: 2026-04-30 22:27
> Session: Brainstorming — Option A Architecture
> Status: ✅ Design Validated — Ready for Implementation

---

## 1. Understanding Summary

- **What:** Tái cấu trúc trang chủ `/` thành Landing Page thuần (Guest), redirect User đã login về `/dashboard` cá nhân hóa. Đồng thời thiết kế Vocabulary System với kho từ vựng DB + 3 game ưu tiên.
- **Why:** Trang chủ hiện tại hiển thị cùng nội dung cho cả Guest lẫn User đã login — không cá nhân hóa, thiếu value proposition rõ ràng.
- **Who:** Học sinh tiểu học (Lớp 3–5) + Phụ huynh — luyện thi Cambridge và Thi vào Lớp 6.
- **Pattern chọn:** Option A (Redirect) — chuẩn Duolingo, tách biệt hoàn toàn Landing Page và Dashboard.
- **Constraint:** Tech stack cố định: React + Hono + Cloudflare D1 + R2. D1 free tier 5GB.
- **Non-goals:** Không build `student_vocab_progress` (Phase sau). Không build Crossword ở Phase này.

---

## 2. Architecture Decision: Option A — Redirect

```
/           → Guest: Landing Page (6 sections)
                User đã login: redirect → /dashboard

/dashboard  → Protected: Dashboard cá nhân hóa (7 sections)
```

**Implement redirect trong `App.tsx`:**
```tsx
// Tại route "/"
<Route path="/" element={
  isLoggedIn ? <Navigate to="/dashboard" replace /> : <HomePage />
} />
```

---

## 3. Landing Page `/` — Cấu trúc Final

> Audience: **Guest chưa đăng nhập**. Goal: Convert Guest → Login.

### Section 1 — HERO
- **Headline:** `LUYỆN đúng nơi — THI đúng chỗ`
- **Sub:** `Bài luyện Cambridge và Thi vào Lớp 6 được cá nhân hóa theo trình độ. Bắt đầu miễn phí, không cần đăng ký.`
- **CTA primary:** `🚀 Thử ngay miễn phí` → scroll đến Section 4
- **CTA secondary:** `Đăng nhập để lưu tiến độ` → `/login`
- Stats bar bên dưới: giữ nguyên

### Section 2 — PATHWAY SHOWCASE *(Thay thế "Học Hết Sức")*
2 card lớn song song, hiển thị preview các level/môn bên trong:

```
┌──────────────────────────┐  ┌──────────────────────────┐
│  🇬🇧 Cambridge             │  │  🏫 Thi vào Lớp 6         │
│  Starters → PET          │  │  4 nhóm môn              │
│                          │  │                          │
│  [Starters][Movers]      │  │  [Toán][Tiếng Việt]      │
│  [Flyers] [KET] [PET]    │  │  [Tiếng Anh][Khoa học]   │
│                          │  │                          │
│  → Xem lộ trình          │  │  → Xem lộ trình          │
└──────────────────────────┘  └──────────────────────────┘
```

### Section 3 — SOCIAL PROOF *(Mẫu 1 — Số liệu cụ thể)*
| 📚 500+ bài luyện | 🎯 2 lộ trình thi | 🏅 Theo lớp 3–5 | 🆓 Hoàn toàn miễn phí |

### Section 4 — SAMPLE FREE LESSONS
- Chỉ show bài `is_free: true`
- Subtitle: `"Thử ngay — không cần đăng ký"`
- Bỏ personalized greeting (Landing Page = Guest first)

### Section 5 — ÔN LUYỆN QUA TRÒ CHƠI
- Giữ `HomeHangman` component
- Bỏ 2 card "Sắp có" (Flashcard, Word Match)
- Tên section: `"🎮 Ôn Luyện Qua Trò Chơi"`

### Section 6 — FINAL CTA BANNER
- Giữ nguyên banner `"Lưu điểm, theo dõi tiến độ..."`
- Chỉ hiển thị với Guest (`!isLoggedIn`)

---

## 4. Dashboard `/dashboard` — Cấu trúc Final

> Audience: **User đã login**. Goal: Trả lời 3 câu hỏi ngay khi mở:
> 1. "Hôm nay tôi cần làm gì?"
> 2. "Tôi đang ở đâu trong hành trình?"
> 3. "Tôi đã đạt được gì?"

### Section 1 — WELCOME HEADER *(đã có)*
```
[Avatar]  Xin chào, Minh! 👋
          🔥 7 ngày liên tiếp   ⭐ 142 sao
```

### Section 2 — NHIỆM VỤ HÔM NAY *(đã có, Phase 04)*
- Max 3 bài, cá nhân hóa theo `pathway` + `grade`
- Section nổi bật nhất trang (priority #1)

### Section 3 — TIẾN ĐỘ LỘ TRÌNH *(Section MỚI)*

**Nếu pathway = Cambridge** (thu phí theo từng kỳ thi):
```
🇬🇧 Lộ trình Cambridge: Luyện thi Flyers
[Vocabulary 80%]  [Reading ✅]  [Listening 🔄 60%]  [Writing 40%]
```

**Nếu pathway = Lớp 6** (thu phí theo tháng/năm — chưa quyết định):
```
🏫 Lộ trình Thi vào Lớp 6: Trình độ 4–5
[Toán 45%]  [Tiếng Việt 20%]  [Tiếng Anh 70%]  [Khoa học 10%]
```

### Section 4 — VOCABULARY GAMES *(placeholder → Phase sau)*
> ⚠️ **Placeholder hiện tại:** Widget Hangman filter theo pathway của bé.
> **Phase sau:** Nâng cấp thành Session Mix đầy đủ khi có `student_vocab_progress`.

```
🎮 Ôn từ vựng hôm nay
[Hangman — Flyers words →]
```

### Section 5 — SKILL MAP *(đã có)*
### Section 6 — BÀI GỢI Ý *(đã có)*
### Section 7 — DREAM BOX *(đã có, xuống cuối)*

---

## 5. Vocabulary System — Architecture

### 5.1 Taxonomy nhóm từ vựng

**Cambridge pathway** (cumulative):
```
group_tag    level_order   subject
──────────── ─────────────  ────────
starters     1             english
movers       2             english
flyers       3             english
ket          4             english
pet          5             english
```

**Lớp 6 pathway:**
```
group_tag            level_order   subject
──────────────────── ─────────────  ──────────
lop6-anh-grade3      1             english
lop6-anh-grade4      2             english
lop6-anh-grade5      3             english
lop6-toan-grade3     1             math
lop6-toan-grade4     2             math
lop6-toan-grade5     3             math
lop6-kh-grade3       1             science
lop6-kh-grade4       2             science
lop6-kh-grade5       3             science
lop6-tv-grade3       1             vietnamese
lop6-tv-grade4       2             vietnamese
lop6-tv-grade5       3             vietnamese
```

**Logic cumulative filter:**
> Bé đang học Flyers → `WHERE level_order <= 3` (Starters + Movers + Flyers)

### 5.2 Schema `vocabulary_bank`

```sql
CREATE TABLE vocabulary_bank (
  id              TEXT PRIMARY KEY,

  -- Nội dung từ
  word            TEXT NOT NULL,
  translation_vi  TEXT NOT NULL,
  ipa             TEXT,
  word_type       TEXT,              -- "noun"|"verb"|"adj"|"phrase"|"term"
  example_en      TEXT,
  example_vi      TEXT,
  image_key       TEXT,              -- R2: "vocab/butterfly.webp"
  audio_key       TEXT,              -- R2: "audio/butterfly.mp3"

  -- Phân nhóm
  subject         TEXT NOT NULL,     -- "english"|"math"|"science"|"vietnamese"
  group_tag       TEXT NOT NULL,     -- "starters"|"flyers"|"lop6-toan-grade4"
  level_order     INTEGER NOT NULL,
  topic           TEXT,              -- "animals"|"food"|"geometry"
  difficulty      TEXT DEFAULT 'medium',

  -- Game compatibility flags
  game_hangman    INTEGER DEFAULT 1,
  game_flashcard  INTEGER DEFAULT 1,
  game_choice     INTEGER DEFAULT 1,

  is_active       INTEGER DEFAULT 1,
  created_at      INTEGER DEFAULT (unixepoch())
);

CREATE INDEX idx_vocab_group   ON vocabulary_bank(group_tag, level_order);
CREATE INDEX idx_vocab_subject ON vocabulary_bank(subject, difficulty);
CREATE INDEX idx_vocab_topic   ON vocabulary_bank(topic);
```

### 5.3 Schema `student_vocab_progress` — ⚠️ DELAY đến Phase sau

```sql
-- Chỉ implement khi có 200+ active users
-- Nguyên tắc bắt buộc khi build:
--   1. Lazy Creation: chỉ tạo row khi bé thực sự gặp từ lần đầu
--   2. Batch Write: 1 API call = 1 transaction = 10 UPSERTs

CREATE TABLE student_vocab_progress (
  id              TEXT PRIMARY KEY,
  student_id      TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  vocab_id        TEXT NOT NULL REFERENCES vocabulary_bank(id)  ON DELETE CASCADE,

  status          TEXT DEFAULT 'new',   -- "new"|"learning"|"mastered"
  times_seen      INTEGER DEFAULT 0,
  times_correct   INTEGER DEFAULT 0,
  times_wrong     INTEGER DEFAULT 0,
  last_seen_at    INTEGER,
  next_review_at  INTEGER,              -- SRS: đúng +3 ngày, sai +1 ngày

  UNIQUE(student_id, vocab_id)
);

CREATE INDEX idx_svp_student_status ON student_vocab_progress(student_id, status);
CREATE INDEX idx_svp_review         ON student_vocab_progress(student_id, next_review_at);
CREATE INDEX idx_svp_wrong          ON student_vocab_progress(student_id, times_wrong DESC);
```

### 5.4 Session Mix Algorithm (Phase sau)

```
Mỗi lần chơi game (10 từ):
├── 30% (3 từ) — từ SAI lần trước (times_wrong > 0)
├── 20% (2 từ) — từ CẦN ÔN (next_review_at <= now)
└── 50% (5 từ) — từ MỚI (chưa từng gặp, filter theo pathway + level)
→ Shuffle → Bắt đầu game
```

### 5.5 API Phase hiện tại (đơn giản)

```
GET /api/vocab?pathway=cambridge&level_order_max=3&game=hangman&limit=10
→ Trả về 10 từ ngẫu nhiên từ pool cumulative
```

### 5.6 Ngôn ngữ trong game

| Subject | Từ hiển thị | Nghĩa/Gợi ý |
|---|---|---|
| Cambridge / Lớp 6 Tiếng Anh | Tiếng Anh (BUTTERFLY) | Tiếng Việt |
| Lớp 6 Toán / Khoa học / Tiếng Việt | Tiếng Việt (PHAN SO*) | Định nghĩa ngắn VI |

> *Assumption: Từ có dấu → bỏ dấu khi đoán trong Hangman. Xác nhận khi implement.

### 5.7 3 Game ưu tiên

| # | Game | Tái dùng | Lý do |
|---|---|---|---|
| 1 | **Flashcard** | Mới | Đơn giản nhất, nền cho SRS |
| 2 | **Hangman** | ✅ Nâng cấp | Đã có, thêm pathway filter |
| 3 | **Multiple Choice** | ✅ `MultipleChoice.tsx` | Hiệu quả, gần format quiz |

---

## 6. D1 Risk Analysis

| Users | Rows `svp` | Storage | Write/ngày | Risk |
|---|---|---|---|---|
| 500 | 100K | ~20 MB | ~3K | ✅ Safe |
| 5,000 | 1.5M | ~300 MB | ~30K | ✅ Safe |
| 30,000 | 12M | ~2.4 GB | ~180K | ✅ Safe |
| 80,000 | 32M | ~6.4 GB | ~480K | ⚠️ Monitor |

**Mitigation:** Lazy Creation + Batch Write + Monitor D1 dashboard hàng tuần.

---

## 7. Decision Log

| # | Quyết định | Alternatives | Lý do |
|---|---|---|---|
| D1 | **Option A: Redirect** User login → `/dashboard` | B, C | Tách concerns, dễ maintain, chuẩn Duolingo |
| D2 | **PATHWAY SHOWCASE** thay "Học Hết Sức" | Grid môn học cũ | Grid cũ không communicate story 2 lộ trình |
| D3 | **Headline:** "LUYỆN đúng nơi — THI đúng chỗ" | 3 mẫu khác | Mạnh, rõ ràng, đúng tone |
| D4 | **Social Proof Mẫu 1** (số liệu) | Mẫu 2, 3 | Số cụ thể tạo credibility |
| D5 | **LESSONS** vị trí 4, **GAME** vị trí 5 | Thứ tự ngược | Lessons = core product, game = bonus |
| D6 | **Cambridge Dashboard** hiển thị theo skills kỳ thi | Progress lộ trình đầy đủ | Thu phí theo kỳ thi, không theo lộ trình |
| D7 | **Section 4 Dashboard** = Vocab placeholder | Build full SRS ngay | Quá phức tạp cho MVP |
| D8 | **Vocabulary lưu D1** | R2 JSON, TypeScript hardcode | D1 cho query/filter linh hoạt |
| D9 | **2 bảng** vocabulary_bank + student_vocab_progress | 1 bảng gộp | Tách concerns, analytics riêng |
| D10 | **Delay student_vocab_progress** đến Phase sau | Build ngay | Cần Lazy Creation + Batch Write từ đầu |
| D11 | **Session Mix** 30%+20%+50% | Toàn mới / toàn cũ | Balance reinforcement + novelty |
| D12 | **3 game:** Flashcard → Hangman → Multiple Choice | Crossword (quá phức tạp) | Tái dùng code, complexity tăng dần |
| D13 | **Toán/Khoa học/TV** trong game vocab | Chỉ Tiếng Anh | Thuật ngữ học thuật cũng cần ôn |

---

## 8. Open Questions

1. **Hangman + Tiếng Việt có dấu:** Bỏ dấu khi đoán (PHAN SO vs PHÂN SỐ)?
2. **Lớp 6 pricing:** Theo tháng hay năm? → Ảnh hưởng Dashboard Section 3
3. **Kỳ thi Cambridge** lưu ở `dream_goals.exam_id` hay thêm field `student_profiles`?
4. **Seed data:** File từ vựng đã có hay cần tự tạo?

---

## 9. Implementation Roadmap

### Phase A — Homepage & Dashboard Restructure (ưu tiên ngay)
- [ ] Redirect logic: `/` → `/dashboard` khi đã login
- [ ] `HomePage.tsx`: 6 sections theo cấu trúc mới
- [ ] `DashboardPage.tsx`: thêm Section 3 (Tiến độ Lộ trình)
- [ ] `HomeHangman.tsx`: bỏ 2 card "Sắp có"

### Phase B — Vocabulary MVP
- [ ] Migration: `vocabulary_bank`
- [ ] Seed data: ~300 từ Cambridge + ~200 từ Lớp 6
- [ ] API `GET /api/vocab`
- [ ] Hangman: nâng cấp dùng API
- [ ] Build Flashcard game
- [ ] Build Multiple Choice vocab game

### Phase C — Vocabulary Pro (khi có 200+ active users)
- [ ] Migration: `student_vocab_progress`
- [ ] API Session Mix
- [ ] API Batch Result Update
- [ ] Dashboard Section 4: full Vocab Games widget
