# 📝 FORM MẪU — TẠO BÀI HỌC MỚI

> Copy form này, điền thông tin, paste vào chat với Antigravity.
> Antigravity sẽ tự động tạo file JSON với Word Tooltip.

---

## ✂️ COPY & PASTE FORM NÀY:

```
/tạo bài học

📌 MÔN HỌC: [Toán Tư Duy / Flyers / Movers / KET / PET / ...]
📌 TÊN BÀI: [VD: Toán Tư Duy — Level 1 — Bài 5]
📌 ID BÀI:  [VD: MATH-L1-P5]
📌 MIỄN PHÍ: [có / không]

📋 NỘI DUNG BÀI (paste thô vào đây):

---
[DÁN NỘI DUNG BÀI HỌC VÀO ĐÂY]
---
```

---

## 📌 Bảng môn học & quy ước đặt tên

| Môn học       | Slug môn   | Thư mục file           | Tiền tố ID     |
|---------------|------------|------------------------|----------------|
| Toán Tư Duy   | `math`     | `content/math/`        | `MATH-L1-P`    |
| Flyers        | `flyers`   | `content/flyers/`      | `RW`, `LW`...  |
| Movers        | `movers`   | `content/movers/`      | `RW`, `LW`...  |
| KET           | `ket`      | `content/ket/`         | `KET-RW`...    |
| PET           | `pet`      | `content/pet/`         | `PET-RW`...    |

> **Antigravity tự xác định thư mục** dựa trên "Môn học" bạn điền.
> Bạn KHÔNG cần gõ đường dẫn đầy đủ.

---

## ✅ VÍ DỤ ĐIỀN FORM — Bài Toán mới

```
/tạo bài học

📌 MÔN HỌC: Toán Tư Duy
📌 TÊN BÀI: Toán Tư Duy — Level 1 — Bài 5
📌 ID BÀI:  MATH-L1-P5
📌 MIỄN PHÍ: có

📋 NỘI DUNG BÀI:

---
1. Find the missing number: 2, 6, 18, 54, ___
   A) 108   B) 162   C) 216   D) 72
   Answer: B) 162

2. A box has 5 red balls and 3 blue balls.
   If you pick 2 balls, what is the minimum number to guarantee 1 red?
   A) 2   B) 3   C) 4   D) 5
   Answer: C) 4
...
---
```

---

## 🔄 Antigravity sẽ tự động làm:

1. ✅ Phân tích từng câu hỏi & đáp án
2. ✅ Xác định từ toán học / tiếng Anh khó → thêm tooltip
3. ✅ Tra IPA phát âm cho từng từ
4. ✅ Viết giải thích `explanation_vi` bằng tiếng Việt
5. ✅ Tạo file `MATH-L1-P5.json` đúng format TextSegment[]
6. ✅ Lưu vào đúng thư mục `content/math/`
7. ✅ Thêm bài vào `subjects.ts` để tự động hiện trên trang chủ

---

## 📌 Lưu ý khi chuẩn bị nội dung bài

Bạn có thể paste bài dưới bất kỳ dạng thô nào:

**✅ Dạng 1 — Đánh số thứ tự đơn giản:**
```
1. Câu hỏi...
   A) ...  B) ...  C) ...  D) ...
   Đáp án: B
```

**✅ Dạng 2 — Có giải thích sẵn:**
```
Q1: Câu hỏi...
Options: A/B/C/D
Correct: C
Explain: Vì...
```

**✅ Dạng 3 — Copy từ PDF/Word (chưa format):**
```
Câu hỏi thô, Antigravity sẽ tự phân tích và format lại.
```

**❌ KHÔNG cần:**
- Biết JSON là gì
- Biết đường dẫn file
- Biết TextSegment hay IPA
- Tự thêm tooltip

---

## 🧠 TÍCH HỢP THỦ CÔNG (Nếu bạn muốn tự code tay)

Dù khuyến khích dùng lệnh `/tạo bài học` để AI tự động làm từ A-Z, nếu bạn tự tạo một file `.json` (ví dụ: `MATH-THINKING-GRADE3-L1-P11.json`), bạn CẦN thực hiện đúng **5 BƯỚC SỐNG CÒN** sau để web nhận diện:

### 🗺️ 5 Bước Đưa 1 Bài Học Lên Website

**Bước 1: Lưu file JSON đúng thư mục**
Copy file JSON và đưa vào đúng vị trí tương ứng. 
Ví dụ môn Toán: `content/lop6/toan/toan-tu-duy-logic/MATH-THINKING-GRADE3-L1-P11.json`

**Bước 2: Đăng ký file với hệ thống (`quiz.ts`)**
- Mở file: `src/worker/routes/quiz.ts`
- Copy một khối `try { ... } catch { ... }` của bài học cũ dán xuống dưới.
- Đổi tên file và key (ví dụ từ P10 thành P11).

**Bước 3: Hiển thị bài học lên UI (`subjects.ts`)**
- Mở file: `src/react-app/data/subjects.ts`
- Tìm đến khối cấu hình môn học (ví dụ Toán Tư Duy).
- Copy 1 object cấu hình bài học cũ trong mảng `lessons`, dán xuống cuối mảng và đổi `id`, `slug`, `title` thành bài 11.

**Bước 4: Đồng bộ lên mây Cloudflare R2 (`deploy.yml`)**
- Mở file: `.github/workflows/deploy.yml`
- Tìm các dòng `wrangler r2 object put...` của môn học đó.
- Copy 1 dòng, dán xuống và đổi tên từ bài 10 thành bài 11 để bài học được tải lên Server lưu trữ.

**Bước 5: Lưu và Deploy**
Thực hiện commit và push (`git add .`, `git commit`, `git push origin dev`). Github Actions sẽ tự động deploy và đồng bộ lên website trong ~1.5 phút.

---

### ⚠️ LƯU Ý "SÁT THỦ" KHI TỰ VIẾT JSON

Nếu tự gõ JSON, hãy cẩn thận 3 lỗi sau vì chúng sẽ làm **SẬP TRANG** hoặc báo lỗi trắng màn hình:

1. **ID trong file phải trùng khớp:**
   Giá trị `"id": "..."` ở dòng đầu của file JSON **bắt buộc** phải khớp hoàn toàn với ID khai báo trong `subjects.ts` và tên file.
   *(Ví dụ: file tên `MATH-THINKING-GRADE3-L1-P11.json` thì `"id": "MATH-THINKING-GRADE3-L1-P11"`)*

2. **Dấu phẩy (`,`) và dấu ngoặc (`{}`, `[]`) rất nhạy cảm:**
   - Tuyệt đối không được dư dấu phẩy ở phần tử cuối cùng của mảng (array) hay đối tượng (object).
   - Tuyệt đối không được thiếu dấu đóng/mở ngoặc.
   - *Mẹo:* Luôn kiểm tra file bằng [jsonlint.com](https://jsonlint.com) trước khi lưu.

3. **Cấu trúc dữ liệu nghiêm ngặt:**
   Phải có đủ trường `"type"`, mảng `"questions"`, và `"correct"` phải khớp 100% với lựa chọn trong `"options"`.

> 💡 **Khuyến nghị:** Viết tay JSON rất rủi ro. Bạn nên soạn câu hỏi thô trên Word, rồi dùng lệnh `/tạo bài học` để AI làm thay bạn cả khâu JSON, thêm tooltip từ vựng, giải thích, và tự động cấu hình cả 5 bước trên!

---

*Tạo bởi Antigravity — Cập nhật: 2026-05-06*
