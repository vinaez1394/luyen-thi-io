# 📋 Hướng Dẫn Tạo Quiz Engine Mới

> **Phiên bản:** 2.0 | **Cập nhật:** 2026-05-12  
> Áp dụng cho: tất cả quiz engine trong `src/react-app/components/quiz/`  
> **v2.0:** Thêm Standard Feature Modules (VocabPanel, Star mechanic, Auth nudge, DB tracking)

---

## 🏗️ Kiến Trúc Tổng Quan

```
QuizPage.tsx (Controller)
  ├── XYZEngine.tsx              ← Engine chứa UI + logic nội bộ
  │     ├── InlineDropdown / UI  ← tương tác quiz
  │     ├── VocabPanel           ← [STANDARD] từ vựng + tra nghĩa
  │     ├── ImageLightbox        ← [OPTIONAL] nếu bài có hình
  │     └── onSubmitResult(result) ← callback khi user nộp bài
  └── saveFlyersScore()    ← gọi API → lưu DB, sao, streak
        ↓
  POST /api/quiz/:id/submit
        ↓
  Backend (quiz.ts):
    - Chấm điểm server-side
    - Lưu quiz_attempts vào D1
    - Cộng sao (updateStarsAfterQuiz)
    - Cập nhật streak
        ↓
  QuizResultScreen (hiện kết quả ⭐ + % + bài gần đây)

POST /api/student/vocab/seen   ← [STANDARD] ghi từ đã tra vào student_vocabulary
POST /api/student/stars        ← [STANDARD] trừ sao khi hết lượt tra nghĩa miễn phí
```

---

## 🌟 STANDARD FEATURE MODULES (BẮT BUỘC cho engine mới, nên retrofit engine cũ)

> Các module dưới đây là **chuẩn chung** cho toàn bộ hệ thống.  
> Engine mới **bắt buộc** implement đủ 4 module.  
> Engine cũ (Part 1, 2, 3) **nên retrofit** khi có dịp sửa.

---

### 📚 Module 1 — VocabPanel (Từ Vựng Trong Bài)

**Mục đích:** Hiển thị danh sách từ khó trong bài + phát âm + tra nghĩa có giới hạn.

#### 1a. Thêm `vocab_highlight` vào file JSON của bài

```json
"vocab_highlight": [
  {
    "word": "astronaut",
    "vocabulary_bank_id": "fl-wk-005",
    "translation_vi": "phi hành gia",
    "ipa": "/ˈæs.trə.nɔːt/",
    "audio_url": "https://cdn.luyenthi.io.vn/vocabulary-mp3/astronaut.mp3"
  },
  {
    "word": "gravity",
    "vocabulary_bank_id": null,
    "translation_vi": "trọng lực",
    "ipa": "/ˈɡræv.ɪ.ti/",
    "audio_url": null
  }
]
```

> **Lưu ý:**  
> - `vocabulary_bank_id`: lấy từ cột `id` trong bảng `vocabulary_bank` (D1). Nếu từ chưa có trong DB thì để `null`.  
> - `audio_url`: lấy từ cột `audio_url` trong `vocabulary_bank`. Nếu `null` → engine tự fallback về Web Speech API.  
> - Chỉ chọn 5–8 từ **khó nhất/quan trọng nhất** trong bài. Không chọn từ function word.  
> - Data embed sẵn trong JSON — **không query D1 lúc runtime** → zero overhead.

**Cách tra `vocabulary_bank_id`:**
```bash
npx wrangler d1 execute luyen-thi-db --remote --command="
SELECT id, word, translation_vi, audio_url FROM vocabulary_bank
WHERE word IN ('astronaut', 'planet', 'scientist');"
```

#### 1b. Thêm interface type trong engine

```typescript
export interface VocabHighlightItem {
  word:                 string;
  vocabulary_bank_id:   string | null;
  translation_vi:       string;
  ipa:                  string;
  audio_url:            string | null;
}
```

#### 1c. Copy component `VocabPanel` từ `FlyersPart4Engine.tsx`

`VocabPanel` là component độc lập (self-contained) — copy nguyên vào engine mới và truyền props:

```typescript
<VocabPanel
  vocab={quiz.vocab_highlight}
  isLoggedIn={isLoggedIn}
  studentId={studentId}
  quizId={quiz.id}
/>
```

#### 1d. Props cần thêm vào engine

```typescript
interface XYZEngineProps {
  quiz:            XYZQuiz;
  onSubmitResult?: (result: XYZResult) => void;
  // ✅ Thêm 2 props này:
  isLoggedIn?:     boolean;   // từ QuizPage, false nếu chưa login
  studentId?:      string | null;
}
```

#### 1e. Truyền props từ `QuizPage.tsx`

```typescript
// Trong QuizPage, khi render engine:
<XYZEngine
  quiz={xyzQuiz}
  isLoggedIn={!!user}          // ← user từ useAuth()
  studentId={student?.id ?? null}
  onSubmitResult={(res) => saveFlyersScore(res.answersForApi, res.startTime)}
/>
```

---

### ⭐ Module 2 — Star Mechanic (Trừ Sao Khi Tra Nghĩa)

**Quy tắc:** 3 lượt tra nghĩa miễn phí/bài → lượt thứ 4 trở đi tốn 1⭐/lượt.

**Đã được implement sẵn trong `VocabPanel`** — không cần code thêm logic.

**Text hướng dẫn cho trẻ em (copy y nguyên, đã approved):**
```
🎁 Bạn có 3 lượt xem nghĩa miễn phí trong bài này!
   Lượt thứ 4 trở đi sẽ tốn 1 ⭐ mỗi lượt nhé 😊
   (Sao không bao giờ mất — chỉ dùng để tra từ thôi!)
```

**API endpoint:** `POST /api/student/stars` với body `{ delta: -1, reason: "vocab_lookup", quiz_id: "..." }`

> Đã có sẵn trong hệ thống — không cần tạo mới.

**Counter state** — trong React (không lưu DB, reset khi làm lại):
```typescript
const FREE_LOOKUPS = 3;
const [lookupCount, setLookupCount] = useState(0);
// Reset tự động khi component unmount (làm lại bài)
```

---

### 🔐 Module 3 — Auth Nudge (Nhắc Đăng Nhập)

**Khi user chưa đăng nhập** và click "VN" để tra nghĩa → hiện popup nhẹ nhàng.

**Đã implement sẵn trong `VocabPanel`** — không cần code thêm.

Popup template (trong CSS class `.fp4-nudge-popup` — có thể rename):
```typescript
{showAuthNudge && (
  <div className="fp4-nudge-overlay" role="dialog" aria-modal="true">
    <div className="fp4-nudge-popup">
      <p>🔐 <strong>Đăng nhập để tra từ & lưu tiến độ học!</strong></p>
      <p>Tiến độ từ vựng của bạn sẽ được lưu lại để ôn tập sau.</p>
      <div className="fp4-nudge-popup__actions">
        <a href="/api/auth/google" className="btn btn-success">Đăng nhập với Google</a>
        <button className="btn btn-outline" onClick={() => setShowAuthNudge(false)}>Để sau</button>
      </div>
    </div>
  </div>
)}
```

---

### 💾 Module 4 — DB Tracking (Ghi Từ Đã Tra Vào Database)

**Mục đích:** Khi user tra nghĩa một từ → ghi vào `student_vocabulary` để sau này dùng cho tính năng "Ôn lại từ vựng" (SRS).

**Endpoint:** `POST /api/student/vocab/seen`  
**Body:** `{ word_id: "fl-wk-005" }` (chỉ gửi khi `vocabulary_bank_id !== null`)

**Logic UPSERT** (đã implement trong `student.ts`):
- Từ mới → INSERT với `mastery_level=0`, `seen_count=1`
- Từ đã có → UPDATE `seen_count++`, `last_seen_at`
- `mastery_level=0` = "cần học" → sẽ được ưu tiên trong session ôn tập sau

**Fire-and-forget** (không block UI):
```typescript
if (item.vocabulary_bank_id && studentId) {
  fetch("/api/student/vocab/seen", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word_id: item.vocabulary_bank_id }),
    credentials: "include",
  }).catch(() => {/* silent */});
}
```

> **Không cần tạo bảng mới** — dùng bảng `student_vocabulary` đã có, tương thích SRS schema.

---

### 🖼️ Module 5 — Image Lightbox (Tùy Chọn)

Dùng khi bài có `image_url` (VD: Part 4 Reading với hình minh họa).

```typescript
// Trong engine:
const [lightboxOpen, setLightboxOpen] = useState(false);

// Render:
{quiz.image_url && (
  <div className="fp4-image-wrap" onClick={() => setLightboxOpen(true)}>
    <img src={quiz.image_url} alt={quiz.title} className="fp4-image" />
    <span className="fp4-image__zoom-hint">🔍 Click để phóng to</span>
  </div>
)}

{lightboxOpen && quiz.image_url && (
  <ImageLightbox
    src={quiz.image_url}
    alt={quiz.title}
    onClose={() => setLightboxOpen(false)}
  />
)}
```

**Copy component `ImageLightbox`** từ `FlyersPart4Engine.tsx`.

> **CSS Rule-01:** Lightbox dùng `position: fixed` → không bị clip bởi `overflow: hidden` của parent.

---

### 📐 Layout Chuẩn Khi Có Image + VocabPanel

```
Desktop (≥768px):
┌──────────────────┬───────────────────────────────┐
│  🖼 Image        │  Quiz content (passage/questions) │
│  (sticky left)   │                               │
│  ──────────────  │  [Answers / Result]           │
│  📚 Vocab Panel  │                               │
└──────────────────┴───────────────────────────────┘
  grid-template-columns: 280px 1fr

Mobile (<768px): Stack
[Image] → [Quiz content] → [Vocab Panel]
```

---

## ✅ Checklist Khi Tạo Engine Mới

### 1. **Trong Engine (`XYZEngine.tsx`)**

#### Interface Result — BẮT BUỘC phải có 2 field này:
```typescript
interface XYZResult {
  score: number;
  maxScore: number;
  percentage: number;
  starsEarned: number;
  // ✅ BẮT BUỘC: để QuizPage gửi API
  answersForApi: Record<string, string>;  // { "q1": "answer", "q2": "B", ... }
  startTime: number;                       // Date.now() khi user bắt đầu làm
}
```

#### Track `startTime` từ đầu:
```typescript
import { useState, useCallback, useRef } from "react";

export function XYZEngine({ quiz, onSubmitResult }: XYZEngineProps) {
  const startTimeRef = useRef<number>(Date.now()); // ← thêm dòng này
  // ...
}
```

#### Khi submit — include đủ fields:
```typescript
const handleSubmit = useCallback(() => {
  // ... tính score, percentage, starsEarned ...

  // Format answers cho API (key = question id hoặc "q1", "q2", ...)
  const answersForApi: Record<string, string> = {};
  for (const [id, userAns] of Object.entries(placed)) {
    answersForApi[id] = String(userAns);
  }

  const res: XYZResult = {
    score,
    maxScore,
    percentage,
    starsEarned,
    answersForApi,           // ✅ BẮT BUỘC
    startTime: startTimeRef.current, // ✅ BẮT BUỘC
  };

  setResult(res);
  setSubmitted(true);
  onSubmitResult?.(res);  // ✅ gọi callback lên QuizPage
}, [/* deps */]);
```

---

### 2. **Trong `QuizPage.tsx`**

Khi thêm engine mới, dùng pattern `saveFlyersScore()` đã có sẵn:

```typescript
// ===== XYZ Engine =====
if ((quiz as unknown as XYZQuiz).type === "xyz-type") {
  const xyzQuiz = quiz as unknown as XYZQuiz;
  return (
    <div className="quiz-layout">
      {/* Sub-header (breadcrumb + exit btn) */}
      ...

      {/* Engine */}
      <div className="quiz-layout__content">
        <XYZEngine
          quiz={xyzQuiz}
          onSubmitResult={(res) => {
            // ✅ Dùng saveFlyersScore — đã có sẵn trong QuizPage
            saveFlyersScore(res.answersForApi, res.startTime);
          }}
        />
      </div>
    </div>
  );
}
```

> `saveFlyersScore` sẽ tự động:
> - Gọi `POST /api/quiz/:id/submit`
> - Lưu điểm vào DB
> - Cộng sao, cập nhật streak
> - Hiển thị `QuizResultScreen` (với % badge, sao, bài gần đây)
> - Dispatch `stars:updated` event (cập nhật header)

---

### 3. **Format `answersForApi`**

Backend (`/api/quiz/:id/submit`) expect format:
```json
{
  "answers": {
    "q1": "answer_string",
    "q2": "B",
    "q3": "some text"
  },
  "timeSpent": 120
}
```

| Loại quiz | Key format | Value format |
|-----------|-----------|--------------|
| Part 1 (Word Bank) | `q.id` từ JSON | Từ được chọn |
| Part 2 (A–H matching) | `"q1"`, `"q2"`, ... | Letter `"F"`, `"A"`, ... |
| Quiz thường (MCQ) | `question.id` | `"A"`, `"B"`, ... |

> **Quan trọng:** Backend chấm điểm dựa trên field `correct` trong JSON file của quiz. Đảm bảo format `answersForApi` khớp với cấu trúc JSON.

---

### 4. **Khai báo khi yêu cầu tạo engine mới**

Khi anh yêu cầu tạo engine mới, hãy cung cấp:

```
Tạo engine mới cho: [tên bài tập]
- Quiz type (field `type` trong JSON): "xyz-type"
- Cấu trúc JSON: [questions/conversation/...]
- Cách chấm điểm: [so sánh placed vs correct]
- Format answers gửi API: { "q1": "answer" } hoặc { questionId: answer }
- Tích hợp đầy đủ: sao, streak, dashboard (YES/NO — mặc định YES)
```

---

## 🔐 Secrets Cần Set Cho Worker Mới

Khi tạo **staging worker mới** (`luyen-thi-io-staging`), cần set secrets:

```bash
# Sau khi tạo worker lần đầu, chạy 1 lần:
echo "GOOGLE_CLIENT_ID_VALUE" | npx wrangler secret put GOOGLE_CLIENT_ID --name luyen-thi-io-staging
echo "GOOGLE_CLIENT_SECRET_VALUE" | npx wrangler secret put GOOGLE_CLIENT_SECRET --name luyen-thi-io-staging
echo "SESSION_SECRET_VALUE" | npx wrangler secret put SESSION_SECRET --name luyen-thi-io-staging
```

> Hoặc thêm vào `scripts/deploy-staging.mjs` để tự động check secrets sau deploy.

---

## 🧠 Flow Đầy Đủ Sau Submit

```
1. User nộp bài trong engine
2. Engine tính điểm cục bộ (hiển thị UI đúng/sai ngay lập tức)
3. Engine gọi onSubmitResult({ answersForApi, startTime, ... })
4. QuizPage.saveFlyersScore() gọi POST /api/quiz/:id/submit
5. Server:
   a. Load quiz JSON từ R2
   b. Chấm điểm server-side (gradeQuiz)
   c. Lưu quiz_attempts vào D1
   d. updateStarsAfterQuiz() → cộng sao
   e. Cập nhật streak
   f. Trả về QuizResult { correctCount, percentage, starsEarned, saved: true }
6. QuizPage:
   a. setFlyersResult(data)
   b. setFlyersShowResult(true)
   c. dispatchEvent("stars:updated") → header cập nhật ⭐
7. QuizResultScreen hiển thị:
   - % hoàn thành + số sao
   - Flashcard / Hangman (cộng thêm sao)
   - Nút "Về danh sách" → badge % xuất hiện trên thẻ bài
8. Dashboard /dashboard:
   - "Bài gần đây" cập nhật tự động
   - Số sao cập nhật trong header
```

---

## 📁 Files Quan Trọng

| File | Vai trò |
|------|---------|
| `src/react-app/pages/QuizPage.tsx` | Controller, `saveFlyersScore()`, `QuizResultScreen` |
| `src/react-app/components/quiz/FlyersPart1Engine.tsx` | Ví dụ engine Part 1 |
| `src/react-app/components/quiz/FlyersPart2Engine.tsx` | Ví dụ engine Part 2 |
| `src/worker/routes/quiz.ts` | Backend: POST `/api/quiz/:id/submit` |
| `src/worker/lib/stars.ts` | Logic cộng sao + streak |
| `src/worker/routes/progress.ts` | GET `/api/student/quiz-scores` |
| `scripts/deploy-staging.mjs` | Deploy staging (tách biệt production) |

---

## 🚨 CHECKLIST ĐẦY ĐỦ KHI THÊM BÀI MỚI (5 Bước Bắt Buộc)

> **Thiếu bất kỳ bước nào → bài sẽ không hiện hoặc không load được!**

### Bước 1 — Tạo file JSON content
```
content/Cambridge/flyers/part3/FW3-MED-001.json
```

### Bước 2 — Đăng ký vào `src/worker/routes/quiz.ts`

**2a. LOCAL_QUIZ_MAP** (để bundle local và fallback):
```typescript
// Section LOCAL_QUIZ_MAP gần đầu file
try { const d = await import("../../../content/Cambridge/flyers/part3/FW3-MED-001.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FW3-MED-001"] = d.default; } catch { /* R2 */ }
```

**2b. getR2Key()** (để worker load đúng file từ R2 production):
```typescript
// Thêm rule regex mới trong hàm getR2Key()
if (/^FW3-/.test(quizId)) {
  return `quizzes/cambridge/flyers/part3/${quizId}.json`;
}
```

### Bước 3 — INSERT vào `quiz_catalog` (D1 Database)

Đây là nguồn data của `/api/subjects` — nếu thiếu bài sẽ không hiện trong danh sách:
```bash
npx wrangler d1 execute luyen-thi-db --remote --command="
INSERT OR IGNORE INTO quiz_catalog
  (quiz_id, slug, pathway, subject_slug, level, group_tag, title, emoji, skill, part, difficulty, questions, est_minutes, is_free, is_published, show_on_home)
VALUES
  ('FW3-MED-001', 'fw3-med-001', 'cambridge', 'flyers', 'flyers', 'flyers', 'Set 1: ...', '🏕️', 'reading', 3, 'medium', 6, 8, 1, 1, 0);
"
```

### Bước 4 — Xóa KV Cache (để bài hiện ngay, không chờ 30 phút)
```bash
curl -X POST "https://dev.luyenthi.io.vn/api/subjects/cache/invalidate" \
  -H "Content-Type: application/json" \
  -d '{"pathway":"cambridge","subject":"flyers"}'
```

### Bước 5 — Upload JSON lên Cloudflare R2

Worker production đọc quiz content từ R2, không phải từ bundle:
```bash
npx wrangler r2 object put "luyen-thi-content/quizzes/cambridge/flyers/part3/FW3-MED-001.json" \
  --file="content/Cambridge/flyers/part3/FW3-MED-001.json" \
  --content-type="application/json"
```

### Bước 6 — Thêm vào `subjects.ts` (frontend static fallback)

Nếu API fail, SubjectPage fallback về `subjects.ts`. Thêm lesson vào đúng group:
```typescript
// Trong SUBJECTS array, tìm group "flyers", thêm lesson mới
{
  id: "FW3-MED-001",
  slug: "fw3-med-001",
  title: "Set 1: A Camping Adventure 🏕️",
  skill: "reading",
  part: 3,
  level: "Flyers",
  questions: 6,
  is_free: true,
  emoji: "🏕️",
  difficulty: "medium",
  est_minutes: 8,
}
```

### Bước 7 — Deploy + Verify
```bash
npm run build
npm run deploy:staging
# Verify:
curl "https://dev.luyenthi.io.vn/api/subjects?pathway=cambridge&subject=flyers" | grep FW3
```

---

## 🗺️ Sơ đồ Luồng Data Đầy Đủ

```
subjects.ts (frontend static fallback)
    ↓
/api/subjects → quiz_catalog (D1) → KV Cache (30 phút)
    ↓ (bài xuất hiện trong danh sách)
User click bài → /cambridge/flyers/fw3-med-001
    ↓
QuizPage: load JSON quiz
    ↓ (bundle LOCAL_QUIZ_MAP hoặc R2)
FlyersPart3Engine render
    ↓ (user submit)
onSubmitResult → saveFlyersScore() → POST /api/quiz/:id/submit
    ↓
Backend: gradeQuiz + lưu quiz_attempts + updateStars + streak
    ↓
QuizResultScreen (% + sao + dashboard update)
```

---

## 🐛 Các Lỗi Thường Gặp (Troubleshooting & Lessons Learned)

Khi tích hợp các module vào engine mới, hãy lưu ý tránh các bug sau (đã từng xảy ra và được fix):

### 1. Bug: Tra từ thứ 4+ không trừ sao (Lỗi 400 Bad Request)
- **Nguyên nhân:** Engine dùng chung endpoint `/api/student/stars` (vốn sinh ra để *cộng* sao từ Flashcard/Hangman, có strict validation).
- **Cách tránh:** Bắt buộc dùng endpoint chuyên biệt **`POST /api/student/stars/deduct`** với body `{ amount: 1, reason: "vocab_lookup", quiz_id }` cho tính năng trừ sao của VocabPanel.

### 2. Bug: `student_vocabulary` không cập nhật khi tra từ
- **Nguyên nhân 1 (Client):** API call bị chặn bởi điều kiện `if (studentId)` trên frontend, nhưng prop này lại không được truyền xuống đúng cách (luôn `null`).
- **Nguyên nhân 2 (Server):** Silent failure ở D1 do query SQL viết sai tên cột (`next_review` thay vì `next_review_at`).
- **Cách tránh:** 
  - **Không phụ thuộc vào client data cho Auth:** Xóa prop `studentId`, frontend cứ gọi API. Backend tự lấy `student_id` từ session cookie một cách bảo mật.
  - Luôn đối chiếu kỹ tên cột trong schema khi viết câu lệnh `UPSERT` cho D1.

### 3. Bug: Auth nudge hiện liên tục dù user đã login
- **Nguyên nhân:** Engine không nhận được prop `isLoggedIn` hoặc `isLoggedIn` bị undefined do QuizPage quên truyền.
- **Cách tránh:** Hãy chắc chắn `QuizPage` có lấy thông tin `user` từ `useAuth()` và truyền xuống engine: `<XYZEngine isLoggedIn={!!user} />`. Tránh dùng `studentId` để check login.

### 4. Bug: Trên Mobile, VocabPanel và instruction bị che khuất
- **Nguyên nhân:** CSS layout dùng `position: absolute` hoặc thiếu spacing / padding bottom. Ngoài ra `.fp4-vocab-item__top` bị wrap khiến IPA và nút bị rớt dòng.
- **Cách tránh:**
  - Layout luôn phải test trên màn hình nhỏ. 
  - Đảm bảo danh sách từ vựng dùng **CSS Grid** cố định cột (VD: `grid-template-columns: 110px 1fr 72px`) thay vì flex-wrap để chống nhảy layout.
  - Phân bổ z-index hợp lý cho các thành phần popup/overlay.

### 5. Bug: Dropdown bị lệch vị trí, text hiển thị dư chữ ở câu Example
- **Nguyên nhân:** Trong cấu trúc dữ liệu JSON, mảng `story_segments` được chia sai. Người tạo đã đặt đáp án của câu Example vào vị trí `segs[1]`. Tuy nhiên, Engine tự động chèn đáp án Example (lấy từ `quiz.example.answer`) ngay sau `segs[0]`. Do đó, nếu `segs[1]` chứa đáp án, chữ đó sẽ bị in ra thành text dư thừa, và đẩy các ô blank phía sau bị lệch 1 nhịp.
- **Cách tránh:** Đảm bảo `story_segments` phải tuân thủ nghiêm ngặt quy tắc chia đoạn:
  - `segs[0]`: text đứng ngay trước Example.
  - `segs[1]`: text đứng **sau** Example và **trước** Q1 (tuyệt đối không chứa đáp án của Example. Nếu Example và Q1 sát nhau thì để chuỗi rỗng `""`).
  - `segs[2]`: text đứng sau Q1, trước Q2.
  - Luôn ghi nhớ và kiểm tra: `story_segments.length === answers.length + 2`.
