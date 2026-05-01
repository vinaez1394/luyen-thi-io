# Phase 03: Đăng Ký Bài Vào Hệ Thống
Status: ⬜ Pending
Dependencies: Phase 01 (JSON files), Phase 02 (ReadingEngine)

---

## Objective

Đăng ký 9 bài Reading vào hệ thống định tuyến của ứng dụng theo đúng pattern của exam-luyenthi skill.

---

## Checklist 3 Files (giống exam-luyenthi skill)

### File 1: `src/worker/routes/quiz.ts` — LOCAL_QUIZ_MAP

Thêm 9 entries vào `LOCAL_QUIZ_MAP`:

```typescript
// ⚠️ MỖI KHI THÊM BÀI MỚI — Reading Engine
try {
  const readingEasyGrade3 = await import(
    "../../../content/lop6/tieng-anh/reading/READING-EASY-GRADE3-P1.json",
    { assert: { type: "json" } }
  );
  LOCAL_QUIZ_MAP["READING-EASY-GRADE3-P1"] = readingEasyGrade3.default;
} catch { /* Production: dùng R2 */ }

// ... lặp lại cho 8 bài còn lại
```

### File 2: `src/react-app/data/subjects.ts` — lessons[]

Tìm subject `tieng-anh` (hiện chưa có, cần thêm vào `/lop6` subjects):

```typescript
// Trong lop6 subjects, thêm subject tieng-anh:
{
  id: "tieng-anh",
  slug: "tieng-anh",
  title: "Tiếng Anh",
  pathway: "lop6",
  available: true,  // ← Bật từ false thành true
  emoji: "🇬🇧",
  lessons: [
    // Easy
    {
      id: "READING-EASY-GRADE3-P1",
      slug: "reading/READING-EASY-GRADE3-P1",
      title: "Đọc Hiểu — Easy — Lớp 3-4",
      skill: "reading",
      difficulty: "easy",
      grade_min: 3,
      grade_max: 4,
      questions: 8,
      is_free: true,
      emoji: "📖",
      in_pool: true,
      showOnHome: false,
    },
    // ... 8 bài còn lại theo pattern
  ]
}
```

### File 3: HUONGDAN.md — Cập nhật sitemap

```markdown
├── /lop6/tieng-anh        ← ĐÃ BẬT (available: true)
│   ├── /lop6/tieng-anh/reading/READING-EASY-GRADE3-P1
│   ├── /lop6/tieng-anh/reading/READING-EASY-GRADE4-P1
│   ├── /lop6/tieng-anh/reading/READING-EASY-GRADE5-P1
│   ├── /lop6/tieng-anh/reading/READING-MED-GRADE3-P1
│   ├── /lop6/tieng-anh/reading/READING-MED-GRADE4-P1
│   ├── /lop6/tieng-anh/reading/READING-MED-GRADE5-P1
│   ├── /lop6/tieng-anh/reading/READING-HARD-GRADE3-P1
│   ├── /lop6/tieng-anh/reading/READING-HARD-GRADE4-P1
│   └── /lop6/tieng-anh/reading/READING-HARD-GRADE5-P1
```

---

## URL Routing Check

URL pattern hiện tại: `/:pathway/:group/:quizId`

Với bài Reading:
- `pathway` = `lop6`
- `group` = `tieng-anh`
- `quizId` = `reading/READING-EASY-GRADE3-P1`

⚠️ **Lưu ý**: `quizId` chứa `/` — cần kiểm tra React Router có handle được không.

**Nếu không**: Đổi sang slug phẳng: `reading-easy-grade3-p1` (dùng `-` thay `/`)

**Nếu có**: Giữ nguyên cấu trúc phân cấp.

→ **Kiểm tra trong QuizPage.tsx** trước khi đăng ký.

---

## Test Criteria

- [ ] Truy cập URL `/lop6/tieng-anh/reading/READING-EASY-GRADE3-P1` không bị 404
- [ ] Quiz data load được từ LOCAL_QUIZ_MAP (dev) hoặc R2 (production)
- [ ] `/lop6/tieng-anh` hiển thị danh sách 9 bài (SubjectPage)
- [ ] Badge "Easy / Medium / Hard" hiển thị đúng
- [ ] `npx tsc -b` không có lỗi

---

Next Phase: [phase-04-integration.md](./phase-04-integration.md)
