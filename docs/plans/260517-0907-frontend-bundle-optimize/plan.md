# Plan: Frontend Bundle Optimization
Created: 2026-05-17T09:07:00+07:00
Status: 🟡 In Progress

## Vấn Đề

Dự án luyen-thi-io có 2 vấn đề kỹ thuật ảnh hưởng hiệu năng frontend:

1. **`subjects.ts` monolith (69KB):** File này chứa toàn bộ danh sách bài học (136 lessons, 2134 dòng). Nó được import bởi 13 component/file — nghĩa là toàn bộ 69KB data này được đóng gói vào JS bundle và tải về máy user ở MỌI TRANG dù họ chỉ cần một phần nhỏ.

2. **`QuizPage.tsx` import tất cả 9 engines:** Mọi user vào bất kỳ bài tập nào đều phải tải code của cả 9 engine (~4781 dòng tổng cộng). Người làm bài Part 1 phải tải cả code của Part 7 mà họ không dùng.

## Phạm Vi

**TRONG SCOPE:**
- Lazy load 9 Flyers Engines trong QuizPage.tsx
- Tách types/interfaces khỏi subjects.ts ra file riêng
- Cập nhật HUONGDAN.md (FL1 R2 path + cache invalidate snippet mới)

**NGOÀI SCOPE (backlog):**
- Tách subjects.ts thành cambridge/lop6 files (cần refactor phức tạp hơn, rủi ro cao)
- Server-side rendering / streaming

## Tech Stack (không thay đổi)

- React 19 + Vite (đã hỗ trợ code splitting tự động)
- `React.lazy()` + `Suspense` (built-in, không cần thêm package)

## Phases

| Phase | Tên | Trạng thái | Ước tính |
|-------|-----|-----------|---------|
| 01 | QuizPage.tsx — Lazy load 9 engines | ⬜ Pending | 30 phút |
| 02 | subjects.ts — Tách types ra file riêng | ⬜ Pending | 20 phút |
| 03 | HUONGDAN.md — Update docs | ⬜ Pending | 10 phút |
| 04 | Verify + build check | ⬜ Pending | 10 phút |

**Tổng:** 4 phases | ~70 phút

## Quick Commands

```bash
# Start
/code phase-01

# Verify sau mỗi phase
npm run build && npx tsc -b --noEmit

# Deploy sau khi xong
npm run deploy:staging
```
