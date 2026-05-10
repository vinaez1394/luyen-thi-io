# Phase 02: ReadingEngine Component
Status: ⬜ Pending
Dependencies: Phase 01 (cần ít nhất 1 file JSON mẫu để test)

---

## Objective

Xây dựng `ReadingEngine.tsx` — component chuyên biệt cho dạng bài reading-passage, thay thế QuizEngine khi `quiz.type === "reading-passage"`.

---

## Files Cần Tạo / Sửa

| File | Hành động | Mục đích |
|------|-----------|---------|
| `src/react-app/components/quiz/ReadingEngine.tsx` | Tạo mới | Controller chính |
| `src/react-app/components/quiz/ReadingSection.tsx` | Tạo mới | Mỗi section (passage + questions) |
| `src/react-app/components/quiz/ReadingPassage.tsx` | Tạo mới | Collapsible passage panel |
| `src/react-app/components/quiz/ReadingQuestion.tsx` | Tạo mới | Render câu hỏi theo sub_type |
| `src/react-app/components/quiz/ReadingEngine.css` | Tạo mới | Styles |
| `src/react-app/types/reading.ts` | Tạo mới | TypeScript types |

---

## Kiến trúc Component

```
ReadingEngine
├── Header (breadcrumb + progress tổng: X/Y câu)
│
├── ReadingSection (Section 1 — Cloze)
│   ├── ReadingPassage (collapsible)
│   │   ├── [badge] 📄 Đoạn văn
│   │   ├── text với AnnotatedText (hỗ trợ tooltip)
│   │   └── [button] Thu gọn ▲ / Mở lại ▼
│   └── Questions
│       └── ReadingQuestion × N
│           └── sub_type: "cloze-mc" → 3 pill buttons
│
├── ReadingSection (Section 2 — Comprehension)
│   ├── ReadingPassage (collapsible)
│   └── Questions
│       └── ReadingQuestion × N
│           ├── sub_type: "true-false" → [True] [False] pills
│           ├── sub_type: "mc-3"      → radio list
│           └── sub_type: "write-word"→ <input type="text">
│
└── Footer sticky
    ├── Progress bar: "6/8 câu đã trả lời"
    └── [Nộp bài ✓] button (disabled cho đến khi đủ câu)
```

---

## TypeScript Types (`reading.ts`)

```typescript
export type ReadingSubType = "cloze-mc" | "true-false" | "mc-3" | "write-word";

export interface ReadingQuestion {
  id: string;
  sub_type: ReadingSubType;
  blank_number?: number;      // chỉ dùng cho cloze-mc
  context?: string;           // câu văn chứa chỗ trống (cloze)
  prompt?: string;            // câu hỏi (comprehension)
  options?: string[];         // cloze-mc | mc-3
  correct: string;            // "true" | "false" | từ đúng
  explanation_vi: string;
}

export interface ReadingPassageData {
  text_segments: TextSegment[]; // tái dùng TextSegment từ quiz types
}

export interface ReadingSection {
  id: string;
  type: "cloze" | "comprehension";
  title: string;
  points: number;
  passage: ReadingPassageData;
  questions: ReadingQuestion[];
}

export interface ReadingQuiz {
  id: string;
  title: string;
  type: "reading-passage";
  skill: "reading";
  difficulty: "easy" | "medium" | "hard";
  grade_min: number;
  grade_max: number;
  in_pool: boolean;
  pathway: string;
  subject: string;
  ui_language: "vi" | "en";
  instructions_vi: string;
  total_points: number;
  sections: ReadingSection[];
}

export type ReadingAnswers = Record<string, string>; // questionId → answer
```

---

## UI/UX Specs

### ReadingPassage (Collapsible Panel)

```
Expanded state:
┌────────────────────────────────────┐
│ 📄 Đoạn văn                       │  bg: #f5f3ff (purple-50)
│                                    │  border-radius: 16px
│ Dogs are very [popular*] pets...   │  padding: 16px
│ They are (1) _____ and love to     │
│ play with children...              │
│                                    │
│          [Thu gọn đoạn văn ▲]      │  button: pill, purple outline
└────────────────────────────────────┘

Collapsed state:
┌──────────────────────────┬────────┐
│ 📄 Đoạn văn về chó...    │ Mở lại▼│  height: 56px, bg: #ede9fe
└──────────────────────────┴────────┘

Animation: max-height transition 300ms ease-out
```

### ReadingQuestion — cloze-mc

```
Câu 1: They are (1) _____ and love to play with children.

[friendly ✓]  [angry]  [lazy]
  purple fill   outline   outline
```

### ReadingQuestion — true-false

```
Câu 5: The Baltic Sea is older than the Amazon Rainforest.

[True]        [False ✓]
 outline       red fill
```

### ReadingQuestion — write-word

```
Câu 8: Viết 1 từ trong bài có nghĩa là...

┌─────────────────────────────────┐
│ businesses                      │  border: 2px solid purple khi focus
└─────────────────────────────────┘
  placeholder: "Gõ câu trả lời..."
```

---

## Scoring Logic

```typescript
function calculateScore(quiz: ReadingQuiz, answers: ReadingAnswers): QuizResult {
  let correct = 0;
  let total = 0;

  for (const section of quiz.sections) {
    const pointsPerQ = section.points / section.questions.length;
    for (const q of section.questions) {
      total++;
      const userAnswer = answers[q.id]?.trim().toLowerCase();
      const correctAnswer = q.correct.toLowerCase();
      if (userAnswer === correctAnswer) {
        correct++;
      }
    }
  }
  return { correct, total, score: Math.round((correct / total) * 100) };
}
```

---

## CSS Classes

```css
/* Naming convention: re- prefix (ReadingEngine) */
.re-engine
.re-section
.re-passage          /* container */
.re-passage--collapsed
.re-passage__text
.re-passage__toggle  /* button thu gọn */
.re-question
.re-question--cloze-mc
.re-question--true-false
.re-question--mc-3
.re-question--write-word
.re-option           /* pill button chung */
.re-option--selected
.re-option--correct  /* sau khi submit */
.re-option--wrong
.re-footer           /* sticky bottom */
.re-progress-bar
```

---

## Test Criteria

- [ ] Passage mở/đóng mượt mà (animation 300ms)
- [ ] Cloze-mc: chọn 1 trong 3, highlight đúng màu
- [ ] True-false: toggle green/red
- [ ] Write-word: input focus có border purple
- [ ] Progress bar cập nhật realtime khi trả lời
- [ ] Nút Nộp bài disable khi chưa đủ câu
- [ ] Sau submit: hiện đáp án đúng/sai, màu rõ ràng
- [ ] Mobile 375px: không bị overflow, touch target ≥48px
- [ ] TypeScript: `npx tsc -b` clean

---

Next Phase: [phase-03-registration.md](./phase-03-registration.md)
