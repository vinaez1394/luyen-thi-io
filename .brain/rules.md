
---
## Rule: Deploy Pipeline (2026-05-01)

### ✅ Cách deploy ĐÚNG (đã kiểm chứng)
```bash
git add -A
git commit -m "mô tả ngắn"
git push origin dev
# → GitHub Actions tự chạy ~1.5 phút → xem tại github.com/.../actions
```

### ✅ Deploy step trong .github/workflows/deploy.yml
```yaml
# ĐÚNG - dùng wrangler từ node_modules (stable, không phụ thuộc action ngoài)
- name: Deploy to Cloudflare Workers
  env:
    CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
    CLOUDFLARE_ACCOUNT_ID: "55e3a88290a27547ff01294004561906"
  run: ./node_modules/.bin/wrangler deploy

# SAI - cloudflare/wrangler-action@v3 hay được cập nhật và gây lỗi bất ngờ
# uses: cloudflare/wrangler-action@v3  ← ĐỪNG DÙNG
```

### 🔴 Lỗi cần tránh khi báo cáo
**KHÔNG được báo cáo "hoạt động tốt" khi chỉ:**
- ✅ build thành công (`npm run build` pass)
- ✅ TypeScript không có lỗi (`tsc -b --noEmit` pass)
- ✅ wrangler dry-run pass

**PHẢI thêm bước:**
- ✅ Mở browser thực tế vào URL liên quan
- ✅ Chụp screenshot hoặc dùng browser_subagent kiểm tra
- ✅ Xem console không có lỗi đỏ
- ✅ Tương tác với tính năng (click, điền, submit)

### Root cause trang trắng Reading (2026-05-01)
- `useQuiz.ts` tính `quiz?.questions.length` — ReadingQuiz không có `.questions`
- Fix: dùng optional chain + fallback sang `.sections?.reduce()`
- Bài học: khi thêm quiz type mới phải test thực tế trên browser
