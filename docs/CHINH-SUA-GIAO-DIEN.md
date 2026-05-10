# 🛠️ HƯỚNG DẪN CHỈNH SỬA GIAO DIỆN

> File này hướng dẫn cách chỉnh sửa thủ công các phần UI mà không cần biết code React.
> **Cập nhật lần cuối:** 2026-04-29

---

## 📁 Sơ đồ file quan trọng

```
src/react-app/
├── data/
│   └── subjects.ts          ← ⭐ FILE CHÍNH — Thêm môn/bài TẠI ĐÂY
├── pages/
│   ├── HomePage.tsx          ← Trang chủ (tự động đọc từ subjects.ts)
│   ├── HomePage.css          ← Style trang chủ
│   ├── SubjectPage.tsx       ← Trang danh sách bài của môn
│   └── SubjectPage.css       ← Style trang môn học
└── components/layout/
    ├── GlobalHeader.tsx      ← Menu navigation
    └── GlobalHeader.css      ← Style header & dropdown
```

---

## 1️⃣ THÊM BÀI HỌC MỚI

> **File cần sửa:** `src/react-app/data/subjects.ts`

Bài học mới thêm vào đây sẽ **tự động xuất hiện** ở:
- Section "Bài Luyện Tập" trang chủ (nếu `showOnHome: true`)
- Trang môn học tương ứng (VD: `/toan-tu-duy`)

### Ví dụ: Thêm bài Toán Level 2

Tìm môn "Toán Tư Duy" trong file `subjects.ts`, thêm vào mảng `lessons`:

```typescript
// TRƯỚC:
lessons: [
  {
    id: "MATH-L1-P1",
    slug: "math-l1-p1",
    title: "Toán Tư Duy — Level 1 — Bài 1",
    skill: "math",
    level: "Level 1",
    questions: 10,
    is_free: true,
    emoji: "🧮",
    showOnHome: true,
  },
],

// SAU (thêm bài mới vào):
lessons: [
  {
    id: "MATH-L1-P1",
    slug: "math-l1-p1",
    title: "Toán Tư Duy — Level 1 — Bài 1",
    skill: "math",
    level: "Level 1",
    questions: 10,
    is_free: true,
    emoji: "🧮",
    showOnHome: true,
  },
  // 👇 THÊM BÀI MỚI Ở ĐÂY
  {
    id: "MATH-L1-P2",          // ← ID phải khớp với tên file JSON trong /content/
    slug: "math-l1-p2",        // ← Slug sẽ thành URL: /toan-tu-duy/math-l1-p2
    title: "Toán Tư Duy — Level 1 — Bài 2",
    skill: "math",
    level: "Level 1",
    questions: 10,
    is_free: true,
    emoji: "🧮",
    showOnHome: true,          // ← true = hiện ở trang chủ, false = chỉ trong trang môn
  },
],
```

### Các trường bắt buộc

| Trường | Ví dụ | Ý nghĩa |
|--------|-------|---------|
| `id` | `"MATH-L1-P2"` | ID file JSON (VIẾT HOA, dùng `-`) |
| `slug` | `"math-l1-p2"` | URL path (viết thường, dùng `-`) |
| `title` | `"Toán Tư Duy — Level 1 — Bài 2"` | Tên hiển thị |
| `skill` | `"math"` hoặc `"reading"` hoặc `"listening"` | Loại kỹ năng |
| `questions` | `10` | Số câu hỏi |
| `is_free` | `true` hoặc `false` | Miễn phí hay Premium |
| `emoji` | `"🧮"` | Icon hiển thị |

### Trường tuỳ chọn

| Trường | Ví dụ | Ý nghĩa |
|--------|-------|---------|
| `part` | `4` | Phần bài (Part 1, Part 2...) |
| `level` | `"Level 1"` | Cấp độ |
| `showOnHome` | `true` | Có hiện ở trang chủ không? (mặc định: true) |

---

## 2️⃣ THÊM MÔN HỌC MỚI

> **File cần sửa:** `src/react-app/data/subjects.ts`

Thêm 1 object mới vào mảng `SUBJECTS`:

```typescript
// Thêm vào cuối mảng SUBJECTS:
{
  id: "stem",               // ← Slug URL: /stem
  label: "STEM & Khoa học", // ← Tên hiển thị
  emoji: "🔬",              // ← Icon
  desc: "Khoa học thực hành",
  color: "#06b6d4",         // ← Màu accent (hex color)
  available: true,          // ← true = click được, false = "Sắp có"
  lessons: [],              // ← Để trống, thêm bài theo hướng dẫn trên
},
```

Môn mới sẽ tự động xuất hiện ở:
- Section "Chinh Phục Môn Học" trang chủ
- Dropdown "Môn học" trên header (nếu `available: true`)
- Mobile drawer menu

---

## 3️⃣ MENU "MÔN HỌC" — DROPDOWN TRÊN HEADER

> **Dropdown tự động** — không cần chỉnh sửa header thủ công.

Dropdown "Môn học" đọc danh sách từ `subjects.ts` và chỉ hiển thị các môn có `available: true`.

Để **đổi nhãn** menu từ "Môn học" sang tên khác:
1. Mở file: `src/react-app/components/layout/GlobalHeader.tsx`
2. Tìm dòng: `📚 Môn học`
3. Sửa text "Môn học" thành tên mong muốn

---

## 4️⃣ SECTION "CHINH PHỤC MÔN HỌC" — Trang chủ

> **Cards tự động** — không cần chỉnh sửa HomePage.tsx.

Cards hiển thị tất cả các môn trong `SUBJECTS[]`.
- Kích thước: **3 cột**, tỉ lệ **4:3**
- Click vào môn → dẫn đến trang `/toan-tu-duy` (hoặc slug tương ứng)
- Môn có `available: false` → hiện badge "Sắp có", không click được

Để **đổi thứ tự** hiển thị: di chuyển vị trí object trong mảng `SUBJECTS`.

Để **đổi màu** một môn: thay đổi trường `color` (VD: `"#7c3aed"` → `"#0ea5e9"`).

---

## 5️⃣ SECTION "BÀI LUYỆN TẬP" — Trang chủ

> **Tự động** — thêm bài vào `subjects.ts` với `showOnHome: true` là xong.

Bài xuất hiện ở đây khi:
```typescript
showOnHome: true  // ← đặt trong từng lesson object
```

Bài KHÔNG xuất hiện ở đây khi:
```typescript
showOnHome: false  // hoặc bỏ qua trường này
```

> **Thứ tự hiển thị:** theo thứ tự bài trong từng môn, môn trên trước.

---

## 6️⃣ STYLE & MÀU SẮC

### Đổi màu accent của môn học

Trong `subjects.ts`, mỗi môn có trường `color`:
```typescript
color: "#7c3aed",  // ← màu tím cho Toán Tư Duy
```

Màu này được dùng ở:
- Đường kẻ accent trên thẻ môn
- Màu tên bài khi hover
- Đường viền trái bài học (SubjectPage)
- Border-left trong dropdown menu

### Đổi màu tổng thể (themes)

Header → click icon theme → chọn 1 trong 6 giao diện màu.

---

## 7️⃣ URL & ROUTING

| URL | Hiển thị |
|-----|---------|
| `/` | Trang chủ |
| `/toan-tu-duy` | Trang danh sách bài Toán Tư Duy |
| `/toan-tu-duy/math-l1-p1` | Bài quiz MATH-L1-P1 |
| `/flyers` | Trang danh sách bài Flyers |
| `/flyers/rw001` | Bài quiz RW001 |
| `/quiz/MATH-L1-P1` | *(URL cũ — vẫn hoạt động)* |

**Quy tắc slug:**
- `id` trong `subjects.ts` phải VIẾT HOA và khớp với tên file JSON (VD: `MATH-L1-P1` ↔ `/content/math/MATH-L1-P1.json`)
- `slug` luôn viết thường, dùng dấu `-` (VD: `math-l1-p1`)

---

## 8️⃣ CÁC LỖI THƯỜNG GẶP

| Lỗi | Nguyên nhân | Cách sửa |
|-----|-------------|---------|
| Bài không hiện ở trang chủ | `showOnHome: false` | Đổi thành `true` |
| Click bài → "Không tải được" | `id` không khớp tên file JSON | Kiểm tra `id` trong `subjects.ts` |
| Môn không có trong dropdown | `available: false` | Đổi thành `true` |
| Card môn không click được | `available: false` | Đổi thành `true` |

---

## 9️⃣ QUY TRÌNH THÊM BÀI MỚI (4 bước)

```
Bước 1: Tạo file JSON bài học
        → /content/math/MATH-L1-P5.json

Bước 2: Đăng ký vào worker (QUAN TRỌNG — bước hay bị bỏ sót!)
        → /src/worker/routes/quiz.ts
        → Thêm import vào LOCAL_QUIZ_MAP (xem hướng dẫn mục 10 bên dưới)

Bước 3: Thêm vào subjects.ts
        → Vào mảng lessons[] của môn tương ứng

Bước 4: Refresh trình duyệt (dev server tự hot-reload)
```

---

## 🔟 ĐĂNG KÝ BÀI VÀO WORKER (Bước bắt buộc!)

> ⚠️ **Đây là bước hay bị bỏ qua nhất — gây lỗi "Không tải được bài học"**

### Nguyên nhân lỗi "Không tải được bài học"

Trong môi trường **local dev**, API server đọc file JSON qua `LOCAL_QUIZ_MAP` trong file:

```
src/worker/routes/quiz.ts  (dòng ~18)
```

Nếu bài mới **không được đăng ký** ở đây → API trả về 404 → frontend báo lỗi "Không tải được bài học".

> **Trong Production (Cloudflare):** file JSON được upload lên R2 bucket, không cần đăng ký ở đây. Chỉ cần đăng ký cho môi trường local dev.

### Cách sửa: Thêm import vào quiz.ts

Mở file `src/worker/routes/quiz.ts`, tìm đến đoạn **dòng 18** (khu vực có chú thích `⚠️ MỖI KHI THÊM BÀI MỚI`), copy pattern và thêm bài mới:

```typescript
// ── ĐANG CÓ (ví dụ) ──────────────────────────────────────────────
try {
  const mathL1P1 = await import("../../../content/math/MATH-L1-P1.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["MATH-L1-P1"] = mathL1P1.default;
} catch { /* Production: dùng R2 */ }

// ── THÊM BÀI MỚI: Copy block try/catch và đổi tên file + key ────
try {
  const mathL1P5 = await import("../../../content/math/MATH-L1-P5.json", {
    assert: { type: "json" },
  });
  LOCAL_QUIZ_MAP["MATH-L1-P5"] = mathL1P5.default;   // ← key phải khớp với id bài
} catch { /* Production: dùng R2 */ }
```

### Quy tắc đặt tên trong LOCAL_QUIZ_MAP

| Thư mục file | Đường dẫn import | Key trong Map |
|---|---|---|
| `content/math/MATH-L1-P5.json` | `"../../../content/math/MATH-L1-P5.json"` | `"MATH-L1-P5"` |
| `content/flyers/RW001.json` | `"../../../content/flyers/RW001.json"` | `"RW001"` |
| `content/movers/MW001.json` | `"../../../content/movers/MW001.json"` | `"MW001"` |

> **Key phải khớp chính xác** với `id` trong `subjects.ts` (VIẾT HOA, dùng `-`)

### Danh sách bài đã đăng ký (cập nhật 2026-04-29)

| Key | File JSON | Môn |
|-----|-----------|-----|
| `MATH-L1-P1` | `content/math/MATH-L1-P1.json` | Toán Tư Duy |
| `MATH-L1-P2` | `content/math/MATH-L1-P2.json` | Toán Tư Duy |
| `MATH-L1-P3` | `content/math/MATH-L1-P3.json` | Toán Tư Duy |
| `MATH-L1-P4` | `content/math/MATH-L1-P4.json` | Toán Tư Duy |
| `MATH-L1-P5` | `content/math/MATH-L1-P5.json` | Toán Tư Duy |
| `MATH-L1-P6` | `content/math/MATH-L1-P6.json` | Toán Tư Duy |
| `MATH-L1-P7` | `content/math/MATH-L1-P7.json` | Toán Tư Duy |
| `MATH-L1-P8` | `content/math/MATH-L1-P8.json` | Toán Tư Duy |
| `MATH-L1-P9` | `content/math/MATH-L1-P9.json` | Toán Tư Duy |
| `MATH-L1-P10` | `content/math/MATH-L1-P10.json` | Toán Tư Duy |
| `RW001` | `content/flyers/RW001.json` | Cambridge Flyers |

---

## 🐛 CÁC LỖI THƯỜNG GẶP (Cập nhật đầy đủ)

| Lỗi hiển thị | Nguyên nhân | Cách sửa |
|---|---|---|
| "Không tải được bài học" | Bài chưa đăng ký trong `quiz.ts` | Xem **Mục 10** — thêm import vào `LOCAL_QUIZ_MAP` |
| "Không tải được bài học" | `id` trong `subjects.ts` không khớp tên file JSON | Kiểm tra `id` và tên file |
| **"Dạng bài đang được phát triển"** | File JSON thiếu `"type"` ở cấp root, hoặc sai giá trị | Xem **Mục 11** — dùng đúng schema JSON |
| Bài không hiện ở trang chủ | `showOnHome: false` | Đổi thành `true` |
| Click bài → trang trắng | Slug URL sai | Kiểm tra `slug` trong `subjects.ts` |
| Môn không có trong dropdown | `available: false` | Đổi thành `true` |
| Card môn không click được | `available: false` | Đổi thành `true` |

---

## 1️⃣1️⃣ SCHEMA CHUẨN CHO FILE JSON BÀI HỌC

> ⚠️ **Đây là nguyên nhân phổ biến nhất gây lỗi "Dạng bài đang được phát triển"**

Khi tạo file JSON bài học mới, **bắt buộc phải có đủ các trường sau ở cấp root** (ngoài mảng `questions`):

```json
{
  "id": "MATH-L1-P2",
  "title": "Toán Tư Duy — Level 1 — Bài 2",
  "subject": "toan-tu-duy",
  "skill": "math",
  "level": "level-1",
  "part": 2,
  "type": "multiple-choice",
  "is_free": true,
  "instructions_vi": "Đọc kỹ từng câu hỏi và chọn đáp án đúng nhất.",
  "questions": [ ... ]
}
```

### Các giá trị hợp lệ cho trường `type`

| Giá trị | Dạng bài | Ghi chú |
|---|---|---|
| `"multiple-choice"` | Chọn 1 trong 4 đáp án | Dùng cho hầu hết bài Toán & Flyers |
| `"multiple-choice-image"` | Chọn đáp án + có hình ảnh | Như multiple-choice nhưng có ảnh |
| `"fill-blank"` | Điền vào chỗ trống | Prompt phải chứa `___` |

> **Lỗi thường gặp:**
> - Dùng `"multiple_choice"` (gạch dưới) thay vì `"multiple-choice"` (gạch ngang) → **Sai!**
> - Đặt `type` vào từng câu hỏi thay vì ở cấp root → **Không có tác dụng!**
> - Quên trường `type` hoàn toàn → Hiển thị "Dạng bài đang được phát triển"

### Checklist trước khi tạo bài mới

```
✅ File JSON có trường "type": "multiple-choice" ở cấp root?
✅ Bài đã đăng ký trong quiz.ts → LOCAL_QUIZ_MAP?
✅ Bài đã thêm vào subjects.ts → lessons[]?
✅ Chạy: npx tsc -b (không có lỗi)?
```

---

## 1️⃣2️⃣ GIAO DIỆN & UX QUIZ ENGINE (Cập nhật 2026-05-05)

### Mobile Footer & Navigation
- **MobileBottomNav**: Trên thiết bị di động, thanh điều hướng chính (`MobileBottomNav`) sẽ bị **ẩn** ở các trang làm bài tập (Quiz Route). Điều kiện kiểm tra `isQuizRoute` trong `AppLayout.tsx` hỗ trợ kiểm tra URL dạng 3 đoạn (VD: `/lop6/tieng-anh/reading-easy-grade3-p1` có chứa dấu gạch ngang ở segment cuối) để luôn ẩn đúng nav.
- **Sticky Footer Quiz**: Footer của Quiz Engine (nơi chứa các nút Prev, Next, và Bubbles tiến độ) trên mobile được ghim cố định ở đáy màn hình (`position: fixed; bottom: 0`). Sub-header được ghim ở phía trên.
- **Không bị che nội dung**: Nội dung câu hỏi (`.quiz-engine__content`) được thêm `padding-bottom: 110px` và `.quiz-layout__content` được đảm bảo không bị CSS reset override `padding-top` để không bị sub-header hay footer che khuất nội dung.

### Desktop Quiz UX
- **Bubbles Tiến độ**: Để tiết kiệm không gian và tạo sự nhất quán, các "bubbles" hiển thị tiến độ câu hỏi được dời từ sub-header xuống phần footer (nằm giữa nút Prev/Next) đối với **cả giao diện Desktop và Mobile**. Sub-header không còn hiển thị số câu dạng `x/10` hay dãy bubbles. Người dùng bấm vào bubble để nhảy nhanh đến câu hỏi.
- **Keyboard Navigation (Phím tắt Enter)**: Trên Desktop, sau khi đã chọn đáp án, người dùng có thể nhấn phím **Enter** để chuyển sang câu tiếp theo (hoặc Submit nếu là câu cuối). Tính năng này **chỉ** hoạt động khi câu hỏi đã được trả lời, và **không** hoạt động nếu người dùng đang gõ phím vào ô nhập liệu (input/textarea) trong các bài fill-in-the-blank.

### Hướng dẫn bài tập (Instruction Banner)
- Banner "Hướng dẫn" (như: *Đọc kỹ từng câu hỏi...*) đã được **loại bỏ hoàn toàn** khỏi khu vực hiển thị câu hỏi của `QuizEngine` (ẩn ở UI, không xoá dữ liệu trong JSON) để tiết kiệm diện tích màn hình.

---

*File này được cập nhật bởi Antigravity AI — 2026-05-05*
