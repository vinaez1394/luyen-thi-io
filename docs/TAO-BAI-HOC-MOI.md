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

*Tạo bởi Antigravity — 2026-04-29*
