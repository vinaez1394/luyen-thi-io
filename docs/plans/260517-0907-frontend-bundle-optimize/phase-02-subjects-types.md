# Phase 02: subjects.ts — Tách Types Ra File Riêng

Status: ⬜ Pending
Dependencies: Phase 01 (không bắt buộc, có thể làm song song)
Estimated: 20 phút

## Mục Tiêu

Tách `interface Lesson` và `interface Subject` ra file `subjects.types.ts` riêng.
Các component chỉ cần types sẽ import từ file nhỏ đó, KHÔNG kéo cả 69KB data vào.

## Phân Tích Hiện Tại

**13 nơi import subjects.ts:**

| File | Import gì | Cần 69KB data không? |
|------|-----------|---------------------|
| `urlHelpers.ts` | `type Subject` | ❌ Chỉ cần type |
| `LessonCard.tsx` | `type Lesson` | ❌ Chỉ cần type |
| `GlobalHeader.tsx` | `SUBJECTS` | ✅ Cần data |
| `RecentAttemptsList.tsx` | `SUBJECTS` | ✅ Cần data |
| `TodayMissions.tsx` | `SUBJECTS, findSubject` | ✅ Cần data |
| `RecommendedLessons.tsx` | `HOME_LESSONS` | ✅ Cần data |
| `useSubjects.ts` | `type Lesson, findByPathwayGroup` | ✅ Cần data |
| `SubjectPage.tsx` | `findByPathwayGroup, type Lesson` | ✅ Cần data |
| `CambridgePage.tsx` | `getCambridgeSubjects` | ✅ Cần data |
| `Lop6Page.tsx` | `getLop6Subjects` | ✅ Cần data |
| `HomePage.tsx` | `HOME_LESSONS, findSubject...` | ✅ Cần data |

**Kết quả:** Chỉ 2 file (`urlHelpers.ts` và `LessonCard.tsx`) có thể hưởng lợi ngay từ việc tách types.

> **Quyết định thiết kế:** Lợi ích THỰC TẾ từ bước này nhỏ (chỉ 2 file). Nhưng đây là nền tảng
> để sau này tách `subjects-cambridge.ts` / `subjects-lop6.ts` khi cần scale lên 500+ bài.

## Implementation Steps

### Bước 1 — Tạo file `subjects.types.ts`

```typescript
// File: src/react-app/data/subjects.types.ts
// Chỉ chứa interfaces/types — không có data

export interface Lesson {
  id: string;
  slug: string;
  // ... copy toàn bộ interface Lesson từ subjects.ts
}

export interface Subject {
  id: string;
  // ... copy toàn bộ interface Subject từ subjects.ts
}
```

### Bước 2 — Cập nhật subjects.ts
```typescript
// Xóa interface definitions, thay bằng re-export:
export type { Lesson, Subject } from "./subjects.types";
```

### Bước 3 — Cập nhật 2 file chỉ cần type

```typescript
// urlHelpers.ts:
import type { Subject } from "../data/subjects.types"; // ← đổi path

// LessonCard.tsx:
import type { Lesson } from "../../data/subjects.types"; // ← đổi path
```

### Bước 4 — Các file còn lại giữ nguyên
Không cần sửa gì, vì `subjects.ts` vẫn re-export types qua `subjects.types.ts`.

## Files Thay Đổi

- `src/react-app/data/subjects.types.ts` — [NEW] Chứa interface Lesson + Subject
- `src/react-app/data/subjects.ts` — Xóa interface definitions, import từ subjects.types.ts
- `src/react-app/utils/urlHelpers.ts` — Đổi import path
- `src/react-app/components/dashboard/LessonCard.tsx` — Đổi import path

## Test Criteria

- [ ] `npx tsc -b --noEmit` pass (0 errors) — quan trọng nhất
- [ ] `npm run build` không có lỗi
- [ ] Các component vẫn compile đúng

## Notes

- **Không có breaking changes** — subjects.ts vẫn re-export mọi thứ
- Bước này là nền tảng kỹ thuật, không thấy cải thiện bundle size ngay (vì phần lớn import vẫn cần data)
- Cải thiện thật sự sẽ có khi tách `subjects-cambridge.ts` / `subjects-lop6.ts` (scope tương lai)

---
Next Phase: [phase-03-docs-update.md](./phase-03-docs-update.md)
