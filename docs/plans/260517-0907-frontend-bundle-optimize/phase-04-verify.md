# Phase 04: Verify + Build Check

Status: ⬜ Pending
Dependencies: Phase 01, 02, 03

## Checklist Cuối

### TypeScript
- [ ] `npx tsc -b --noEmit` → 0 errors

### Build
- [ ] `npm run build` → thành công
- [ ] Kiểm tra chunks trong build output:
  ```bash
  npm run build 2>&1 | grep -E "FlyersPart|FlyersListening|ReadingEngine|WritingEngine|kb|MB"
  # Mong đợi: thấy nhiều chunk nhỏ thay vì 1 chunk lớn
  ```

### Runtime (local)
- [ ] `npm run dev` → vào bài FW1-EASY-001 → FlyersPart1Engine load được
- [ ] Không có lỗi console

### Docs
- [ ] HUONGDAN.md có dòng FL1-* trong bảng R2
- [ ] Snippet cache/invalidate có x-admin-key

### Deploy
```bash
npm run deploy:staging
# Verify trên dev.luyenthi.io.vn
```

## Rollback nếu có lỗi

```bash
# Nếu lazy load gây lỗi runtime → revert về static import:
git diff HEAD -- src/react-app/pages/QuizPage.tsx
git checkout HEAD -- src/react-app/pages/QuizPage.tsx
```

## Expected Results

**Trước:**
- 1 JS chunk lớn chứa tất cả engines
- Load time: tất cả engines download cùng lúc

**Sau:**
- 9+ JS chunk nhỏ riêng biệt
- Load time: chỉ tải engine cần thiết (~1/9 code JS)
