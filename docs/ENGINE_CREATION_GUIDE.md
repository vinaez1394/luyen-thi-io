# 📋 Hướng Dẫn Tạo Quiz Engine Mới

> **Phiên bản:** 3.0 | **Cập nhật:** 2026-05-17  
> Áp dụng cho: tất cả quiz engine trong `src/react-app/components/quiz/`  
> **v2.0:** Thêm Standard Feature Modules (VocabPanel, Star mechanic, Auth nudge, DB tracking)  
> **v3.0:** Bắt buộc Lazy Load (React.lazy + Suspense) để mỗi engine là 1 JS chunk riêng — không làm phình bundle size chính.

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

### 2. **Trong `QuizPage.tsx`** — BẮT BUỘC LAZY LOAD (v3.0)

> ⚠️ **QUY TẮC BẮT BUỘC (kể từ v3.0):**  
> Mọi engine mới PHẢI được đăng ký bằng `React.lazy()` — KHÔNG được `import` tĩnh.  
> Lý do: mỗi engine khoảng 500–800 dòng. Nếu import tĩnh, toàn bộ code của tất cả engines
> sẽ được bundle vào 1 file JS lớn và tải về máy user ở MỌI TRANG, dù họ chỉ làm 1 loại bài.

#### Bước 2a — Đăng ký lazy() ở đầu file (sau các import khác)

```typescript
// File: src/react-app/pages/QuizPage.tsx
// Tìm phần "Lazy-loaded engines" và thêm engine mới VÀO ĐÓ:

// ── Lazy-loaded engines — mỗi engine là 1 JS chunk riêng (code splitting) ──
// ... (các engine cũ) ...

// Thêm engine mới tại đây:
const XYZEngine = lazy(() =>
  import("../components/quiz/XYZEngine").then((m) => ({ default: m.XYZEngine }))
);
```

> **Tại sao dùng `.then(m => ({ default: m.XYZEngine }))` ?**  
> Vì engine export theo kiểu **named export** (`export function XYZEngine`), không phải default export.  
> `React.lazy()` chỉ nhận `default` export → cần map lại.

#### Bước 2b — Giữ nguyên `import type` (KHÔNG thay bằng lazy)

```typescript
// Những dòng này KHÔNG thay đổi — chúng bị xóa sau build, không ảnh hưởng bundle:
import type { XYZQuiz } from "../components/quiz/XYZEngine";
import type { XYZResult } from "../components/quiz/XYZEngine";
```

#### Bước 2c — Bọc engine trong `<Suspense>` khi render

Dùng constant `ENGINE_FALLBACK` đã có sẵn (khai báo ngay trước `QuizPage` function):

```typescript
// ===== XYZ Engine =====
if ((quiz as unknown as XYZQuiz).type === "xyz-type") {
  const xyzQuiz = quiz as unknown as XYZQuiz;
  return (
    <div className="quiz-layout">
      {/* Sub-header (breadcrumb + exit btn) */}
      ...

      {/* Engine — BẮT BUỘC bọc trong Suspense */}
      <div className="quiz-layout__content">
        <Suspense fallback={ENGINE_FALLBACK}>   {/* ← BẮT BUỘC */}
          <XYZEngine
            quiz={xyzQuiz}
            onSubmitResult={(res) => {
              // ✅ Dùng saveFlyersScore — đã có sẵn trong QuizPage
              setFlyersPendingResult({
                answersForApi: res.answersForApi,
                startTime: res.startTime,
                score: res.score,
                maxScore: res.maxScore,
                percentage: res.percentage,
                starsEarned: res.starsEarned,
              });
            }}
            onFinish={() => {
              if (flyersPendingResult) {
                saveFlyersScore(
                  flyersPendingResult.answersForApi,
                  flyersPendingResult.startTime,
                  flyersPendingResult
                );
              }
            }}
            onBack={() => navigate(backUrl)}
          />
        </Suspense>                              {/* ← BẮT BUỘC */}
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

#### Verify sau khi thêm engine:
```bash
npm run build 2>&1 | grep "XYZEngine"
# Mong đợi: thấy dòng "XYZEngine-[hash].js" trong output → chunk riêng thành công
```

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

## 🚨 CHECKLIST ĐẦY ĐỦ KHI THÊM BÀI MỚI (6 Bước Bắt Buộc)

> **Thiếu bất kỳ bước nào → bài sẽ không hiện hoặc không load được!**  
> Xem đầy đủ với ví dụ thực tế tại: `docs/QUYTRINH_THEM_BAI_QUIZ.md`

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

Worker production đọc quiz content từ R2, không phải từ bundle. **Dùng script thay vì lệnh wrangler raw** để upload đúng path và tự động detect file mới:
```bash
# Upload toàn bộ content (script tự detect file mới/đã thay đổi)
node scripts/upload-content-r2.mjs --remote
```

> ✅ Output mong đợi: `✅ FW3-MED-007.json` v.v.

**Lệnh wrangler thủ công (dùng khi chỉ upload 1 file):**
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

### Bước 6 — Deploy Staging (Tự Động Invalidate KV Cache)
```bash
# Bao gồm: build → patch wrangler.json → deploy → check secrets → invalidate KV cache
node scripts/deploy-staging.mjs
```

> ✅ Script này **tự động invalidate KV cache** sau khi deploy.  
> Sau deploy, hard refresh browser: `Ctrl+Shift+R` (Mac: `Cmd+Shift+R`).

```bash
# Verify sau deploy:
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

### 6. Bug: Bài tập mới không hiển thị (hoặc mất Thumbnail), Vocab không có âm thanh
- **Nguyên nhân 1 (Seed xóa image_url):** Seed script dùng `REPLACE INTO` (xóa row cũ, insert row mới). Script cũ đọc `lesson.image_url` từ `subjects.ts`, nhưng `subjects.ts` không có trường này → `image_url = NULL` cho TẤT CẢ bài sau mỗi lần seed.
- **Nguyên nhân 2 (KV Cache stale):** Sau seed/deploy, KV cache vẫn giữ data cũ (30 phút TTL). User thấy bài cũ, thiếu bài mới, thumbnail biến mất.
- **Nguyên nhân 3 (R2 Upload bị bỏ qua):** Worker production đọc bài từ R2. Nếu chỉ update local/D1 mà quên upload R2 → click vào bài bị lỗi.
- **Nguyên nhân 4 (Vocab audio_url null):** Khai báo `vocabulary_bank_id` có giá trị nhưng quên điền `audio_url` → VocabPanel không có nút phát âm.
- **Fix vĩnh viễn đã áp dụng (2026-05-14):**
  - `generate-quiz-catalog-seed.ts` giờ **tự scan** thư mục `content/` để build `imageUrlMap` từ các file JSON → seed không bao giờ set `image_url = NULL` nữa.
  - `deploy-staging.mjs` giờ **tự gọi** `/api/subjects/cache/invalidate` sau mỗi deploy → KV cache luôn được làm mới.
- **Cách tránh trong tương lai:**
  - **R2:** Sau khi tạo/sửa bất kỳ file JSON nào → luôn chạy `node scripts/upload-content-r2.mjs --remote`.
  - **Vocab:** Nếu `vocabulary_bank_id` có giá trị → `audio_url` bắt buộc phải có. Không có trong DB → gán cả 2 là `null`.
  - **Browser cache:** Sau deploy, `Ctrl+Shift+R` để bỏ cache trình duyệt (5 phút).

---

## 🎧 FL1 ENGINE — Flyers Listening Part 1 (Click-to-Connect)

> Quy tắc riêng cho engine `FlyersListeningPart1Engine.tsx` — kiểu bài nghe và kéo đường nối tên ↔ nhân vật trên hình.

### Cấu trúc JSON chuẩn

```json
{
  "id": "FL1-EASY-001",
  "type": "flyers-listening-p1",
  "image_url": "https://cdn.../FL1-EASY-001.jpg",
  "audio_url": "https://cdn.../FL1-EASY-001.MP3",
  "names": ["Robert", "Helen", "Frank", "Betty", "William", "Sarah", "Richard"],
  "characters": [
    { "id": "char-robert",  "description": "...", "hotspot": { "x": 51.1, "y": 74.2 } },
    { "id": "char-helen",   "description": "...", "hotspot": { "x": 8.4,  "y": 76.0 } },
    ...
    // 4 DECOY characters (không có tên trong questions):
    { "id": "char-u1", "description": "...", "hotspot": { "x": 59.3, "y": 44.0 } },
    { "id": "char-u2", "description": "...", "hotspot": { "x": 92.9, "y": 70.5 } },
    { "id": "char-u3", "description": "...", "hotspot": { "x": 12.9, "y": 52.3 } },
    { "id": "char-u4", "description": "...", "hotspot": { "x": 5.8,  "y": 34.3 } }
  ],
  "example": { "name": "Robert", "character_id": "char-robert" },
  "questions": [
    { "id": "q1", "name": "Helen",   "correct_character_id": "char-helen"   },
    { "id": "q2", "name": "Frank",   "correct_character_id": "char-frank"   },
    { "id": "q3", "name": "Betty",   "correct_character_id": "char-betty"   },
    { "id": "q4", "name": "William", "correct_character_id": "char-william" },
    { "id": "q5", "name": "Sarah",   "correct_character_id": "char-sarah"   }
  ]
}
```

### 🎯 Quy tắc DECOY HOTSPOT (Gây Nhiễu)

**Mục đích:** Làm bài khó hơn — học sinh thấy nhiều vòng tròn trên hình nhưng chỉ cần nối 5 tên.

**Cách thêm decoy:**
1. Thêm vào mảng `characters` với id `char-u1`, `char-u2`, `char-u3`, `char-u4`
2. **KHÔNG** thêm vào `questions`
3. Engine tự động hiển thị vòng tròn cho TẤT CẢ characters (kể cả decoy)
4. Học sinh có thể click decoy → không sai, không đúng → chỉ chiếm 1 trong 5 slot

**Kết quả:** 6 named chars + 4 decoys = **10 vòng tròn** trên hình, nhưng chỉ có **5 tên** để nối.

**Số lượng decoy khuyến nghị:**
- Easy: 4 decoys (10 hotspot tổng)
- Medium: 4 decoys (10 hotspot tổng)
- Hard: có thể tăng lên 6 decoys (12 hotspot tổng)

### ✅ Quy tắc Submit Button — BẮT BUỘC

```typescript
// ✅ ĐÚNG: Đếm TỔNG số hotspot đã nối (bất kỳ)
const connectedCount = Object.keys(connections).length;
const allConnected = connectedCount >= quiz.questions.length; // >= 5

// ❌ SAI: Chỉ đếm hotspot đúng đáp án
// const questionCharIds = quiz.questions.map(q => q.correct_character_id);
// const connectedCount = questionCharIds.filter(cid => connections[cid]).length;
```

**Lý do:** Học sinh được quyền nối vào bất kỳ hotspot nào (kể cả decoy). Backend chấm điểm theo đáp án, không phải frontend kiểm soát. Submit phải hiện ngay khi đủ 5 kết nối.

### 📦 R2 Path cho FL1 Quizzes

```
R2 bucket: luyen-thi-content
Path: quizzes/cambridge/flyers/listening/part1/FL1-EASY-001.json
                                                 ↑ có prefix "quizzes/"!
```

**Upload command:**
```bash
npx wrangler r2 object put \
  "luyen-thi-content/quizzes/cambridge/flyers/listening/part1/FL1-EASY-001.json" \
  --file="content/Cambridge/flyers/listening/part1/FL1-EASY-001.json" \
  --content-type="application/json" --remote
```

⚠️ **Lỗi hay gặp:** Upload thiếu prefix `quizzes/` → Worker 404 vì `getR2Key()` trong `quiz.ts` trả về `quizzes/cambridge/...`.

### 🛠️ Local Dev Map — Bắt Buộc Đăng Ký

Mỗi file JSON FL1 mới phải được thêm vào `LOCAL_QUIZ_MAP` trong `src/worker/routes/quiz.ts`:

```typescript
// File: src/worker/routes/quiz.ts — ~line 179
// ⚠️ CAMBRIDGE FLYERS Listening Part 1 — Click-to-Connect Engine (FL1-*)
try { const d = await import("../../../content/Cambridge/flyers/listening/part1/FL1-EASY-001.json", { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FL1-EASY-001"] = d.default; } catch { /* R2 */ }
try { const d = await import("../../../content/Cambridge/flyers/listening/part1/FL1-MED-001.json",  { assert: { type: "json" } }); LOCAL_QUIZ_MAP["FL1-MED-001"]  = d.default; } catch { /* R2 */ }
// Thêm bài mới tại đây ↑
```

**Tại sao cần:** Local dev server không có R2. Nếu không đăng ký, local sẽ fallback về R2 (cache cũ) → không thấy bài mới khi dev.

### 🔧 Hotspot Coordinates — Cách Lấy Đúng

Dùng tool `tools/hotspot-builder.html` để lấy tọa độ:
1. Load ảnh vào tool
2. Click vào từng nhân vật → ghi lại `x, y` (đơn vị: % so với kích thước ảnh)
3. Copy JSON output → paste vào `characters[]` trong file JSON

**Lưu ý:** Tọa độ trong file JSON của user (hotspot-builder output) là nguồn sự thật — không đoán hay hard-code tay.

### 7. Bug: FL1 Submit không hiện dù đã nối đủ hotspot (2026-05-16)

- **Nguyên nhân:** Logic `allConnected` chỉ đếm các hotspot **đúng đáp án** (`questionCharIds.filter(cid => connections[cid])`). Nếu user nối vào decoy hotspot, count không tăng → Submit mãi không hiện.
- **Fix:** Dùng `Object.keys(connections).length` thay vì filter theo correct IDs.
- **Rule:** Submit = `Object.keys(connections).length >= quiz.questions.length` — bất kỳ 5 hotspot nào cũng tính.
