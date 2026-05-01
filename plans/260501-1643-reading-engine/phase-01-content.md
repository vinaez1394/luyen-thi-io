# Phase 01: JSON Schema + 9 Bài Nội Dung
Status: ⬜ Pending
Dependencies: Không có

---

## Objective

Định nghĩa chuẩn JSON cho dạng `reading-passage` và tạo 9 file nội dung hoàn chỉnh, sẵn sàng upload lên R2.

---

## JSON Schema Mới (`reading-passage`)

```json
{
  "id": "READING-EASY-GRADE3-P1",
  "title": "Bài Đọc Hiểu — Easy — Lớp 3-4",
  "type": "reading-passage",
  "skill": "reading",
  "difficulty": "easy",
  "grade_min": 3,
  "grade_max": 4,
  "in_pool": true,
  "pathway": "lop6",
  "subject": "tieng-anh",
  "ui_language": "vi",
  "instructions_vi": "Đọc kỹ đoạn văn rồi trả lời các câu hỏi bên dưới.",
  "total_points": 16,
  "sections": [
    {
      "id": "section-1",
      "type": "cloze",
      "title": "I. Đọc đoạn văn và chọn từ thích hợp điền vào chỗ trống.",
      "points": 8,
      "passage": {
        "text_segments": [
          { "text": "Dogs are very " },
          { "text": "popular", "tooltip": { "vi": "phổ biến", "ipa": "ˈpɒpjʊlə" } },
          { "text": " pets. They are (1) _____ and love to play with children..." }
        ]
      },
      "questions": [
        {
          "id": "q1",
          "blank_number": 1,
          "context": "They are (1) _____ and love to play with children.",
          "options": ["friendly", "angry", "lazy"],
          "correct": "friendly",
          "explanation_vi": "'Friendly' nghĩa là thân thiện — đúng tính cách của chó."
        }
      ]
    },
    {
      "id": "section-2",
      "type": "comprehension",
      "title": "II. Đọc đoạn văn và trả lời câu hỏi.",
      "points": 8,
      "passage": {
        "text_segments": [
          { "text": "The " },
          { "text": "Amazon", "tooltip": { "vi": "sông Amazon", "ipa": "ˈæməzɒn" } },
          { "text": " rainforest is one of the largest forests in the world..." }
        ]
      },
      "questions": [
        {
          "id": "q5",
          "sub_type": "true-false",
          "prompt": "The Amazon is the largest forest in the world.",
          "correct": "false",
          "explanation_vi": "Bài nói 'one of the largest' — nghĩa là một trong những cái lớn nhất, không phải lớn nhất."
        },
        {
          "id": "q7",
          "sub_type": "mc-3",
          "prompt": "What can glaciers do?",
          "options": ["rivers of lava", "rivers of flood", "rivers of ice"],
          "correct": "rivers of ice",
          "explanation_vi": "Bài viết 'glaciers can cut through mountains' — glaciers là sông băng (rivers of ice)."
        },
        {
          "id": "q8",
          "sub_type": "write-word",
          "prompt": "Write ONE word from the passage meaning 'commercial organizations such as companies, shops or factories'.",
          "correct": "businesses",
          "explanation_vi": "'Businesses' là doanh nghiệp — bao gồm công ty, cửa hàng, nhà máy."
        }
      ]
    }
  ]
}
```

---

## 9 Bài Cần Tạo (AI tự soạn nội dung)

### Easy (Lớp 3–4): Ngắn gọn, từ vựng cơ bản A1–A2
| File | Chủ đề gợi ý | Độ dài passage |
|------|-------------|----------------|
| `READING-EASY-GRADE3-P1.json` | Động vật nuôi (Pets) | ~80 từ/passage |

### Easy (Lớp 4–5): Từ vựng A2, câu phức tạp hơn chút
| File | Chủ đề gợi ý | Độ dài passage |
|------|-------------|----------------|
| `READING-EASY-GRADE4-P1.json` | Thiên nhiên (Weather/Seasons) | ~100 từ/passage |

### Easy (Lớp 5–6): Từ vựng A2+, có câu ghép
| File | Chủ đề gợi ý | Độ dài passage |
|------|-------------|----------------|
| `READING-EASY-GRADE5-P1.json` | Trường học (School life) | ~100 từ/passage |

### Medium (Lớp 3–4): A2, có inference đơn giản
| File | Chủ đề gợi ý |
|------|-------------|
| `READING-MED-GRADE3-P1.json` | Gia đình & Nghề nghiệp |
| `READING-MED-GRADE4-P1.json` | Sức khoẻ & Thể thao |
| `READING-MED-GRADE5-P1.json` | Môi trường & Thiên nhiên |

### Hard (Lớp 3–4 → 5–6): B1, inference, vocabulary inference
| File | Chủ đề gợi ý |
|------|-------------|
| `READING-HARD-GRADE3-P1.json` | Khoa học đơn giản |
| `READING-HARD-GRADE4-P1.json` | Công nghệ trong cuộc sống |
| `READING-HARD-GRADE5-P1.json` | AI trong giáo dục (như đề thi mẫu) |

---

## Quy tắc Tooltip (Bắt buộc)

- **Từ khó / từ quan trọng** → thêm `tooltip: { vi: "...", ipa: "..." }`
- **Từ thông thường** → chỉ `{ "text": "..." }`
- **Mỗi passage** nên có 3–6 tooltip
- **Explanation_vi** cho mỗi câu hỏi: giải thích bằng tiếng Việt đơn giản

---

## Quy tắc câu hỏi theo sub_type

| sub_type | Mô tả | Đáp án |
|----------|-------|--------|
| `cloze-mc` | Điền từ vào chỗ trống, 3 lựa chọn | string (từ được chọn) |
| `true-false` | Đúng / Sai | `"true"` hoặc `"false"` |
| `mc-3` | Chọn 1 trong 3 | string (đáp án đúng) |
| `write-word` | Gõ 1 từ vào ô trống | string (exact match, case-insensitive) |

---

## Files Cần Tạo

```
content/lop6/tieng-anh/reading/
├── READING-EASY-GRADE3-P1.json   ← Tạo mới
├── READING-EASY-GRADE4-P1.json   ← Tạo mới
├── READING-EASY-GRADE5-P1.json   ← Tạo mới
├── READING-MED-GRADE3-P1.json    ← Tạo mới
├── READING-MED-GRADE4-P1.json    ← Tạo mới
├── READING-MED-GRADE5-P1.json    ← Tạo mới
├── READING-HARD-GRADE3-P1.json   ← Tạo mới
├── READING-HARD-GRADE4-P1.json   ← Tạo mới
└── READING-HARD-GRADE5-P1.json   ← Tạo mới
```

---

## Test Criteria

- [ ] Mỗi file JSON valid (không có lỗi cú pháp)
- [ ] Mỗi bài có đúng 2 sections
- [ ] Section 1: 4–5 câu cloze
- [ ] Section 2: 4 câu (T/F + MCQ + write-word)
- [ ] Đáp án chính xác, explanation_vi rõ ràng
- [ ] Tooltip có đủ `vi` + `ipa`
- [ ] `in_pool: true` trên tất cả 9 bài

---

Next Phase: [phase-02-reading-engine.md](./phase-02-reading-engine.md)
