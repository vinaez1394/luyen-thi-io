# Phase 01: QuizPage.tsx — Lazy Load 9 Engines

Status: ⬜ Pending
Dependencies: Không có
Estimated: 30 phút

## Mục Tiêu

Thay static imports bằng `React.lazy()` để Vite tự động tách mỗi engine thành chunk JS riêng biệt.
Kết quả: User chỉ tải engine của bài họ đang làm, không phải tất cả 9.

## Vì Sao Quan Trọng

Hiện tại QuizPage.tsx import 9 engines cùng lúc:
- FlyersPart1Engine: 635 dòng
- FlyersPart2Engine: 371 dòng
- FlyersPart3Engine: 674 dòng
- FlyersPart4Engine: 620 dòng
- FlyersPart5Engine: 645 dòng
- FlyersPart6Engine: 547 dòng
- FlyersPart7Engine: 473 dòng
- FlyersListeningPart1Engine: 816 dòng
- ReadingEngine + WritingEngine: ~500 dòng
**Tổng: ~5300 dòng** tải cho mọi user, mọi lúc.

## Implementation Steps

### Bước 1 — Thêm Suspense import
```tsx
// Thêm vào import React
import { useEffect, useState, Suspense, lazy } from "react";
```

### Bước 2 — Thay static import bằng lazy()
```tsx
// TRƯỚC (xóa):
import { FlyersPart1Engine } from "../components/quiz/FlyersPart1Engine";
import { FlyersPart2Engine } from "../components/quiz/FlyersPart2Engine";
// ... 7 dòng khác

// SAU (thêm):
const FlyersPart1Engine = lazy(() =>
  import("../components/quiz/FlyersPart1Engine").then(m => ({ default: m.FlyersPart1Engine }))
);
const FlyersPart2Engine = lazy(() =>
  import("../components/quiz/FlyersPart2Engine").then(m => ({ default: m.FlyersPart2Engine }))
);
// ... tương tự cho 7 engine còn lại
```

> **Lưu ý quan trọng:** `import type` (chỉ lấy TypeScript types) KHÔNG cần thay bằng lazy —
> chúng bị xóa sau khi build, không ảnh hưởng bundle size.
> Chỉ thay các `import { EngineComponent }` (runtime imports).

### Bước 3 — Bọc render bằng Suspense
```tsx
// Tìm chỗ render engines trong JSX và bọc lại:
<Suspense fallback={<div className="quiz-loading">Đang tải bài tập...</div>}>
  {quiz.type === "flyers-p1" && <FlyersPart1Engine ... />}
  {/* ... các engines khác */}
</Suspense>
```

### Bước 4 — Giữ nguyên import type
```tsx
// Các dòng này KHÔNG thay đổi:
import type { FlyersPart1Quiz } from "../components/quiz/FlyersPart1Engine";
import type { FlyersPart2Quiz } from "../components/quiz/FlyersPart2Engine";
// ...
```

## Files Thay Đổi

- `src/react-app/pages/QuizPage.tsx` — Chuyển static import → lazy import, bọc Suspense

## Test Criteria

- [ ] `npm run build` không có lỗi
- [ ] `npx tsc -b --noEmit` pass (0 errors)
- [ ] Build output có nhiều chunk JS riêng (FlyersPart1Engine-[hash].js, FlyersPart2Engine-[hash].js...)
- [ ] Mở local dev → vào bài tập → engine vẫn load bình thường
- [ ] Khi đang load engine, có hiển thị fallback loading text
- [ ] Không có lỗi console runtime

## Verify Bundle Split

```bash
npm run build 2>&1 | grep "FlyersPart\|FlyersListening\|ReadingEngine\|WritingEngine"
# Mong đợi: thấy tên từng engine trong danh sách chunks
```

## Notes

- Vite tự động code-split với dynamic import → không cần config thêm
- Chunk sẽ được cache bởi browser → user chỉ tải 1 lần sau đó
- Fallback loading CSS cần đơn giản (không phụ thuộc vào các component lớn)

---
Next Phase: [phase-02-subjects-types.md](./phase-02-subjects-types.md)
