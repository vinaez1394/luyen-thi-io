# 📐 BRIEF.md — Kiến Trúc Thông Tin (Information Architecture)
> **Dự án:** luyenthi.io.vn — Nền tảng luyện thi cho học sinh 8–12 tuổi  
> **Phiên bản:** 1.0  
> **Ngày lập:** 2026-04-30  
> **Trạng thái:** ✅ Đã xác nhận — Sẵn sàng triển khai  

---

## 1. Framing Brief Gốc

### 🎯 Bài Toán
Thiết kế một **Information Architecture (IA) đa tầng** giúp:
1. Phân tách rõ ràng **2 lộ trình học tập độc lập** (Cambridge Certificates và Thi Lớp 6)
2. Tích hợp **trò chơi tương tác như công cụ củng cố** bài học (KHÔNG phải tính năng rời rạc)
3. Tạo ra **trải nghiệm học tập liền mạch** cho học sinh nhỏ tuổi

### 👥 Người Dùng
| Nhóm | Vai trò | Nhu cầu |
|---|---|---|
| **Trẻ em 8–12 tuổi** | Thao tác trực tiếp | Vui, có định hướng, không bị ngợp |
| **Phụ huynh** | Trả tiền + theo dõi | Báo cáo kết quả, kiểm soát |

### ✅ Trong Phạm Vi
- Navigation architecture (Sitemap, Breadcrumb, Header)
- 2 lộ trình phân tách (Cambridge / Lớp 6)
- Game gắn sau bài học (không phải standalone)
- Routing logic (React Router)
- Data Schema (subjects.ts, D1 DB, content JSON)

### ❌ Ngoài Phạm Vi
- UI Design chi tiết (màu sắc, font chữ, hình nhân vật)
- Soạn nội dung bài học (câu hỏi cụ thể)
- Game Engine internals (cơ chế Hangman, Crossword)
- Thanh toán / Marketing / E-commerce
- Cấu hình Server / Domain / SSL

### ⚠️ 3 Rủi Ro Cần Tránh
1. **🎡 Playground Trap** — Game ưu tiên hơn bài học → Game PHẢI đứng SAU kết quả quiz
2. **📚 Library Clutter** — Sitemap phẳng, menu quá dài → Navigation PHẢI có tầng lộ trình
3. **🧟 Frankenstein Code** — Các module không kết nối nhau → Schema PHẢI có dimension chung

---

## 2. Kiến Trúc Hai Lộ Trình

### 🗺️ Sitemap Đích (Target Architecture)

```
/                       → LandingPage (giới thiệu, CTA chọn lộ trình)
/learn                  → PathwayPage (chọn: Cambridge | Lớp 6)
  │
  ├─ /cambridge         → CambridgePage
  │    ├─ /cambridge/starters/  → SubjectPage
  │    ├─ /cambridge/movers/    → SubjectPage
  │    ├─ /cambridge/flyers/    → SubjectPage (đang có nội dung)
  │    │    └─ /cambridge/flyers/:quiz → QuizPage → [Kết quả → Hangman]
  │    ├─ /cambridge/ket/       → SubjectPage (sắp có)
  │    └─ /cambridge/pet/       → SubjectPage (sắp có)
  │
  └─ /lop6              → Lop6Page (4 nhóm môn song song)
       ├─ /lop6/toan/           → SubjectPage (Toán Tư Duy & Logic)
       │    └─ /lop6/toan/:quiz → QuizPage
       ├─ /lop6/tieng-viet/     → SubjectPage (Tiếng Việt)
       ├─ /lop6/tieng-anh/      → SubjectPage (Tiếng Anh Lớp 6)
       └─ /lop6/khoa-hoc/       → SubjectPage (Khoa học & Xã hội)

/dashboard              → "Trang của bé" (progress theo lộ trình)
/login | /register      → Auth pages
/onboarding             → Onboarding (hỏi lộ trình + lớp hiện tại + avatar)
```

### 🔄 Backward Compatibility
- URL cũ `/:subject/:quiz` (VD: `/toan-tu-duy/math-l1-p1`) → 301 redirect về URL mới
- Giữ route `/quiz/:id` cho backward compat hiện tại

---

## 3. Cấu Trúc Hai Lộ Trình Chi Tiết

### Lộ Trình 1: Cambridge Certificates
```
Cấu trúc: Cấp độ (tuần tự) → Kỹ năng → Bài
Starters (5-7 tuổi) → Movers (7-9 tuổi) → Flyers (9-12 tuổi) → KET → PET
Mỗi cấp: Reading | Listening | Writing | Speaking
```

### Lộ Trình 2: Thi Lớp 6
```
Cấu trúc: Nhóm Môn (song song) → Chủ đề → Bài
Đích đến: Kỳ thi tuyển sinh vào Lớp 6 (THCS chất lượng cao)

Nhóm 1: Toán học (Tư duy & Logic)
  - Số học và các phép tính
  - Hình học trực quan và Hình học phẳng
  - Đại lượng và đo lường
  - Giải toán có lời văn
  - Toán tư duy logic và quy luật ← "toan-tu-duy" hiện tại thuộc đây

Nhóm 2: Tiếng Việt (Ngôn ngữ & Cảm thụ)
  - Luyện từ và câu
  - Chính tả và Ngữ pháp
  - Đọc hiểu văn bản
  - Cảm thụ văn học
  - Tập làm văn

Nhóm 3: Tiếng Anh (Ngoại ngữ & Hội nhập)
  - Từ vựng theo chủ đề (Vocabulary)
  - Cấu trúc ngữ pháp (Grammar)
  - Đọc hiểu (Reading)
  - Nghe hiểu (Listening)
  - Viết và Biến đổi câu (Writing)

Nhóm 4: Đánh giá Năng lực Tổng hợp (Khoa học & Xã hội)
  - Khoa học Tự nhiên (Vật chất, Năng lượng, Sinh vật)
  - Khoa học Xã hội (Lịch sử, Địa lý cơ bản)
```

---

## 4. Phân Cấp Độ Khó (Grade Leveling)

### Quyết định: **Hybrid A + C**

| Hướng | Mô tả | Giai đoạn |
|---|---|---|
| **A — Hỏi lớp hiện tại** | Onboarding hỏi "Bé đang học lớp mấy?" → tự filter bài phù hợp | Phase 1 (NGAY) |
| **C — Bé tự chọn độ khó** | Trong SubjectPage, bé/phụ huynh có thể tự chọn xem bài Cơ bản/Nâng cao | Phase 1 (NGAY) |
| **B — Placement Test** | Bài test xếp loại 10 câu → hệ thống auto-calibrate level | Phase 2 (sau khi đủ nội dung ≥50 bài/môn) |

### Schema Phân Cấp
```typescript
// Trong Lesson schema — thêm trường:
grade_target: "3-4" | "4-5" | "5-6"

// Trong student_profile — thêm trường:
current_grade: 3 | 4 | 5 | 6   // từ onboarding
lop6_level?: "3-4" | "4-5" | "5-6"  // Phase 2: từ placement test

// Mapping tự động:
grade 3 → filter grade_target: "3-4"
grade 4 → filter grade_target: "3-4" | "4-5"  (mặc định: "4-5")
grade 5 → filter grade_target: "4-5" | "5-6"  (mặc định: "5-6")
```

### Logic Lọc
- URL **không thay đổi** khi filter theo grade (tránh URL quá sâu)
- `/lop6/toan/bai-1` — bài được filter tự động theo `student_profile.current_grade`
- Bé VẪN có thể bấm "Xem tất cả độ khó" để tự chọn

---

## 5. Data Schema Cập Nhật

### 5.1 Subject Schema (subjects.ts)
```typescript
export interface Subject {
  id: string;
  label: string;
  emoji: string;
  desc: string;
  color: string;
  available: boolean;
  
  // THÊM MỚI:
  pathway: "cambridge" | "lop6";
  group?: string;   // VD: "toan" | "tieng-viet" | "flyers" | "movers"
  
  lessons: Lesson[];
}
```

### 5.2 Lesson Schema
```typescript
export interface Lesson {
  id: string;
  slug: string;
  title: string;
  skill: "reading" | "listening" | "writing" | "math" | "mixed";
  part?: number;
  level?: string;
  questions: number;
  is_free: boolean;
  emoji: string;
  showOnHome?: boolean;
  
  // THÊM MỚI:
  grade_target?: "3-4" | "4-5" | "5-6";  // chỉ cho lop6
  unlocks_game?: "hangman" | "crossword" | null;  // game mở sau bài này
}
```

### 5.3 Content JSON Schema (R2 files)
```json
{
  "id": "MATH-L1-P1",
  "pathway": "lop6",
  "group": "toan",
  "grade_target": "4-5",
  "title": "...",
  "skill": "math",
  ...
}
```

### 5.4 D1 Database — student_profiles
```sql
-- Thêm cột:
ALTER TABLE student_profiles ADD COLUMN current_grade INTEGER;     -- 3,4,5
ALTER TABLE student_profiles ADD COLUMN selected_pathway TEXT;     -- 'cambridge' | 'lop6'
ALTER TABLE student_profiles ADD COLUMN lop6_level TEXT;           -- Phase 2
```

---

## 6. Routing Architecture

### React Router (App.tsx) — Target
```tsx
// PUBLIC
<Route path="/"             → LandingPage />
<Route path="/learn"        → PathwaySelectionPage />
<Route path="/login"        → LoginPage />
<Route path="/register"     → RegisterPage />

// CAMBRIDGE PATHWAY
<Route path="/cambridge"             → CambridgePage />
<Route path="/cambridge/:level"      → SubjectPage />
<Route path="/cambridge/:level/:quiz"→ QuizPage />

// LỚP 6 PATHWAY
<Route path="/lop6"                  → Lop6Page />
<Route path="/lop6/:group"           → SubjectPage />
<Route path="/lop6/:group/:quiz"     → QuizPage />

// PROTECTED
<Route path="/dashboard"    → DashboardPage (protected) />
<Route path="/onboarding"   → OnboardingPage (protected) />

// BACKWARD COMPAT (redirect)
<Route path="/:subject"     → redirect logic (cambridge/lop6 detect) />
<Route path="/:subject/:id" → redirect logic />
<Route path="/quiz/:id"     → QuizPage (legacy) />
```

---

## 7. Navigation System

### 7.1 Global Header
- Desktop dropdown **phân nhóm theo pathway**:
  ```
  Môn Học ▾
  ├─ 🇬🇧 Cambridge
  │    ├─ Flyers (có bài)
  │    ├─ Movers (sắp có)
  │    └─ ...
  └─ 🏫 Thi Lớp 6
       ├─ 🧮 Toán Tư Duy
       ├─ 📖 Tiếng Việt (sắp có)
       └─ ...
  ```

### 7.2 Breadcrumbs
| Trang | Breadcrumb |
|---|---|
| SubjectPage Cambridge | `Luyện thi > Cambridge > Flyers` |
| QuizPage Cambridge | `Luyện thi > Cambridge > Flyers > Bài 1` |
| SubjectPage Lớp 6 | `Luyện thi > Thi Lớp 6 > Toán Tư Duy` |
| QuizPage Lớp 6 | `Luyện thi > Thi Lớp 6 > Toán > Bài 1` |

---

## 8. Onboarding Flow (Cập Nhật)

```
Bước 1: Chào mừng
Bước 2: Tên bé là gì? → display_name
Bước 3: Bé đang học lớp mấy? → current_grade (Lớp 3 / 4 / 5)
Bước 4: Bé muốn luyện gì?
         [🇬🇧 Chứng chỉ Cambridge] [🏫 Thi vào Lớp 6]
         → selected_pathway
Bước 5: Chọn avatar
Bước 6: → Dashboard (đã personalized)
```

---

## 9. Game Integration Rules

> **Nguyên tắc bất biến:** Game = Công cụ củng cố, không phải tính năng độc lập

| Rule | Mô tả |
|---|---|
| ✅ Game xuất hiện SAU kết quả quiz | `QuizResultScreen` → `HangmanLauncher` |
| ✅ Game dùng từ vựng từ bài vừa làm | `useVocabulary(quizId)` → `getPendingWords()` |
| ✅ Game KHÔNG có route `/hangman` độc lập | Không tạo page standalone cho game |
| ✅ Game filter theo pathway | Cambridge bài → Hangman dùng từ tiếng Anh |
| 🔲 Stars từ game kết nối vào DB | Phase tiếp theo: `onHangmanStarsEarned` → API |
| 🔲 `unlocks_game` trong Lesson schema | Bài nào hỗ trợ game nào |

---

## 10. Decision Log

| # | Quyết định | Lý do | Thay thế đã xem xét |
|---|---|---|---|
| D01 | Routing `/cambridge/:level/:quiz` | Đúng IA, SEO tốt, dễ mở rộng | Giữ `/:subject` (chọn vì đây quá flat) |
| D02 | `toan-tu-duy` thuộc nhóm Lớp 6 / Toán | Đúng mục tiêu thi lớp 6, không phải môn riêng | Giữ độc lập (reject vì gây Library Clutter) |
| D03 | Grade leveling: Hybrid A+C | Đủ dùng ngay, ít rủi ro, dễ nâng cấp sau | Placement Test (B) — để Phase 2 khi đủ nội dung |
| D04 | URL không thêm tầng `/lop3/` cho grade | Tránh URL quá sâu, dùng data filter | `/lop6/lop3/toan/bai-1` (reject vì quá phức tạp) |
| D05 | Game gắn sau QuizResultScreen | Tránh Playground Trap — học trước, chơi sau | Game có trang riêng (reject) |
| D06 | PathwaySelectionPage `/learn` | "Trạm dừng chân" — định hướng từ đầu | Bỏ qua, để trang chủ hiện hết (reject vì Library Clutter) |

---

## 11. Lộ Trình Triển Khai (Đề Xuất)

### Sprint 1 — Nền tảng Schema (Rủi ro thấp)
- [ ] 0A: Thêm `pathway` + `group` vào Subject type
- [ ] 0B: Cập nhật subjects.ts phân loại theo pathway/group
- [ ] 0C: Cập nhật content JSON thêm `pathway` + `grade_target`
- [ ] 2B: Breadcrumb trong SubjectPage
- [ ] 2C: Breadcrumb trong QuizLayout

### Sprint 2 — Routing Migration (Rủi ro cao, cần test)
- [ ] 1A: Tạo PathwaySelectionPage `/learn`
- [ ] 1B: Routing mới `/cambridge/:level/:quiz`
- [ ] 1C: Routing mới `/lop6/:group/:quiz`
- [ ] 1D: Redirect từ URL cũ về URL mới
- [ ] 2A: Global Header dropdown phân nhóm

### Sprint 3 — Dashboard & Onboarding
- [ ] 3A: Onboarding thêm bước hỏi lớp + lộ trình
- [ ] 3B: Dashboard lọc theo pathway + grade
- [ ] 3C: "Nhiệm vụ hôm nay" thay vì danh sách dài
- [ ] 4A: Kết nối Hangman stars vào DB

---

## 12. Ghi Chú Kỹ Thuật

### Ràng buộc đã biết
- Cloudflare Workers + D1 + R2 + KV
- React + React Router (client-side routing)
- Vite build
- `run_worker_first: ["/api/*"]` trong wrangler.json
- Content (JSON quiz) lưu trong R2, load qua Worker API

### Assumptions (Giả định)
- [A1] Mỗi bài học chỉ thuộc 1 pathway duy nhất
- [A2] Một bé có thể chuyển pathway trong Settings (nhưng không tự động)
- [A3] Cambridge và Lớp 6 dùng chung QuizEngine (không build riêng)
- [A4] `grade_target` chỉ áp dụng cho lộ trình Lớp 6; Cambridge dùng `level`
- [A5] Phase 2 (Placement Test) chỉ triển khai khi mỗi môn có ≥ 50 bài

---

*📌 File này là nguồn sự thật duy nhất cho các quyết định IA. Mọi thay đổi lớn cần cập nhật vào đây.*
