# Phase 05: Polish, Test & Deploy
Status: ✅ Complete
Dependencies: Phase 04

---

## Objective

Kiểm tra toàn bộ flow, polish UX, TypeScript check và deploy lên Cloudflare.

---

## Checklist

### Mobile Test (375px)
- [ ] Passage collapse/expand mượt mà
- [ ] Pill buttons không bị vỡ layout
- [ ] Input write-word hiển thị keyboard đúng
- [ ] Footer "Nộp bài" không bị keyboard che khuất
- [ ] Touch target tất cả buttons ≥ 48px

### TypeScript
- [ ] `npx tsc -b` — không có lỗi

### Git
```bash
git add .
git commit -m "feat(reading): add ReadingEngine + 9 reading exercises for Grade 3-6"
git push
```

### Deploy Cloudflare
```bash
npx wrangler deploy
```

### Verification URLs
- `/lop6/tieng-anh` → Hiện 9 bài, not "Sắp có"
- `/lop6/tieng-anh/reading/READING-EASY-GRADE3-P1` → Bài Easy load đúng
- `/lop6/tieng-anh/reading/READING-HARD-GRADE5-P1` → Bài Hard load đúng

---

## Done! Cập nhật plan.md

Đổi tất cả phases thành `✅ Complete` và ghi ngày hoàn thành.
