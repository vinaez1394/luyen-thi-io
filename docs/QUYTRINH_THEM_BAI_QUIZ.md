# 📚 QUY TRÌNH THÊM BÀI TẬP QUIZ MỚI (v3.0 — 2026-05-14)

> **Áp dụng cho:** Tất cả bài Cambridge Flyers/Movers/Starters, Lớp 6, v.v.  
> **Đảm bảo:** Vocab có audio, thumbnail hiển thị, bài tự động xuất hiện trên staging.  
> ⚠️ **Thiếu bất kỳ bước nào → bài không hiện hoặc mất thumbnail!**

---

## 📋 TỔNG QUAN 6 BƯỚC

```
[1] Tạo JSON   →  [2] subjects.ts  →  [3] Seed D1  →  [4] Upload R2  →  [5] Deploy  →  [6] Verify
```

---

## BƯỚC 1 — Tạo File JSON Bài Tập

### 1a. Tra cứu `vocabulary_bank_id` và `audio_url` từ Database

**Quy tắc bắt buộc cho `vocab_highlight`:**
- ✅ Từ **có trong DB** → điền ĐỦ cả `vocabulary_bank_id` VÀ `audio_url`
- ✅ Từ **không có trong DB** → gán CẢ HAI là `null` (engine tự dùng TTS)
- ❌ TUYỆT ĐỐI không để `vocabulary_bank_id` có giá trị nhưng `audio_url` là `null`

**Lệnh tra cứu:**
```bash
# Thay các từ cần tra vào IN clause
npx wrangler d1 execute luyen-thi-db --remote --command="
SELECT id, word, translation_vi, ipa, audio_url
FROM vocabulary_bank
WHERE word IN ('camel', 'storm', 'journey', 'flour', 'hungry');"
```

### 1b. Format JSON chuẩn cho `vocab_highlight`

```json
"vocab_highlight": [
  {
    "word": "camel",
    "vocabulary_bank_id": "fl-an-003",
    "translation_vi": "con lạc đà",
    "ipa": "/ˈkæməl/",
    "audio_url": "https://cdn.luyenthi.io.vn/vocabulary-mp3/camel.mp3"
  },
  {
    "word": "scary",
    "vocabulary_bank_id": null,
    "translation_vi": "đáng sợ",
    "ipa": "/ˈskeər.i/",
    "audio_url": null
  }
]
```

### 1c. Đặt `image_url` đúng format

```json
"image_url": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-MED-07-the-cooking-competition.jpg"
```

> ⚠️ **image_url trong JSON là nguồn sự thật duy nhất.** Seed script sẽ tự đọc từ đây để ghi vào D1 — không cần thêm thủ công.

### 1d. Lưu file đúng thư mục

| Loại bài | Thư mục lưu |
|----------|-------------|
| Flyers Part 1 | `content/Cambridge/flyers/part1/FW1-xxx-NNN.json` |
| Flyers Part 2 | `content/Cambridge/flyers/part2/FW2-xxx-NNN.json` |
| Flyers Part 3 | `content/Cambridge/flyers/part3/FW3-xxx-NNN.json` |
| Flyers Part 4 | `content/Cambridge/flyers/part4/FW4-xxx-NNN.json` |

---

## BƯỚC 2 — Khai Báo vào `subjects.ts`

File: `src/react-app/data/subjects.ts`

Thêm lesson mới vào đúng group trong mảng `lessons[]`:

```typescript
{
  id: "FW3-MED-007",
  slug: "fw3-med-007",
  title: "Set 7: The Cooking Competition 👨‍🍳",
  skill: "reading",
  part: 3,
  level: "Flyers",
  questions: 6,
  is_free: false,
  emoji: "👨‍🍳",
  showOnHome: false,
  difficulty: "medium",
  recommended: false,
  est_minutes: 8,
},
```

> **Lưu ý:** KHÔNG cần thêm `image_url` vào subjects.ts — seed script tự đọc từ file JSON (Bước 3).

---

## BƯỚC 3 — Chạy Seed Script → Cập Nhật D1 Database

Seed script đọc `image_url` trực tiếp từ các file JSON trong thư mục `content/` nên **thumbnail sẽ không bị mất**.

```bash
# Sinh SQL file từ subjects.ts + đọc image_url từ JSON content
npx tsx scripts/generate-quiz-catalog-seed.ts

# Thực thi vào D1 Remote (Cloudflare Production)
npx wrangler d1 execute luyen-thi-db --file=scripts/seed-quiz-catalog.sql --remote

# Thực thi vào D1 Local (môi trường dev)
npx wrangler d1 execute luyen-thi-db --file=scripts/seed-quiz-catalog.sql
```

> ✅ Output mong đợi: `📸 Found XX image_urls from content JSON files.`  
> Nếu số lượng image_urls < số bài tập → kiểm tra lại file JSON có đúng `image_url` không.

---

## BƯỚC 4 — Upload JSON lên Cloudflare R2

Worker production đọc bài từ R2 (không phải bundle). Nếu bỏ qua bước này, bài sẽ không load được.

```bash
# Upload toàn bộ content lên R2 (script tự detect file mới/thay đổi)
node scripts/upload-content-r2.mjs --remote
```

> ✅ Output mong đợi: `✅ FW3-MED-007.json` + `✅ FW3-MED-008.json` v.v.  
> ❌ Nếu bài không load khi click vào → kiểm tra bước này trước tiên.

---

## BƯỚC 5 — Deploy Staging (Tự Động Invalidate KV Cache)

```bash
node scripts/deploy-staging.mjs
```

Script này tự động thực hiện:
1. 🔨 Build project
2. 🚀 Deploy lên worker `luyen-thi-io-staging`
3. 🔑 Kiểm tra secrets
4. 🧹 **Invalidate KV cache** → user thấy data mới ngay (không chờ 30 phút)

> ✅ Output cuối: `🧹 Invalidating KV cache... ✅ KV cache invalidated. Deleted X key(s).`

---

## BƯỚC 6 — Kiểm Tra Trên Staging

1. Mở `https://dev.luyenthi.io.vn/cambridge/flyers`
2. **Hard refresh**: `Ctrl+Shift+R` (Mac: `Cmd+Shift+R`) để bỏ browser cache
3. Kiểm tra:
   - [ ] Bài mới xuất hiện trong danh sách đúng Part
   - [ ] Thumbnail (hình ảnh thực) hiển thị trên thẻ bài (không phải emoji)
   - [ ] Click vào bài → load được quiz
   - [ ] VocabPanel có từ vựng với nút phát âm

---

## 🔄 TÓM TẮT LỆNH NHANH

```bash
# ========== Chạy lần lượt sau khi tạo/sửa file JSON ==========

# 1. Tạo SQL từ subjects.ts (đọc image_url từ JSON)
npx tsx scripts/generate-quiz-catalog-seed.ts

# 2. Cập nhật D1 (remote + local)
npx wrangler d1 execute luyen-thi-db --file=scripts/seed-quiz-catalog.sql --remote
npx wrangler d1 execute luyen-thi-db --file=scripts/seed-quiz-catalog.sql

# 3. Upload JSON lên R2
node scripts/upload-content-r2.mjs --remote

# 4. Deploy staging + auto-invalidate KV cache
node scripts/deploy-staging.mjs

# 5. Hard refresh browser (Ctrl+Shift+R)
```

---

## 🐛 TROUBLESHOOTING — Xử Lý Sự Cố

| Triệu chứng | Nguyên nhân | Cách Fix |
|-------------|------------|----------|
| Bài không hiện trong danh sách | KV cache chưa invalidate | `curl -X POST "https://dev.luyenthi.io.vn/api/subjects/cache/invalidate" -d '{}'` |
| Thumbnail mất sau khi seed | Seed script cũ set `image_url = NULL` | ✅ Đã fix — seed script v3 tự đọc từ JSON. Cập nhật code nếu dùng code cũ. |
| Click vào bài → lỗi 404/không load | File JSON chưa upload lên R2 | Chạy `node scripts/upload-content-r2.mjs --remote` |
| Vocab Panel không có nút phát âm | `vocabulary_bank_id` có giá trị nhưng `audio_url` là `null` | Điền đúng `audio_url` vào file JSON và re-upload |
| Bài hiện nhưng dùng emoji thay thumbnail | `image_url` null trong D1 | Kiểm tra JSON có `image_url` → re-seed → re-deploy |
| Vẫn thấy data cũ sau deploy | Browser cache (5 phút) | Hard refresh: `Ctrl+Shift+R` |

---

## 📐 QUY TẮC VÀNG (KHÔNG ĐƯỢC VI PHẠM)

> 1. **Vocab highlight**: Có `vocabulary_bank_id` → **BẮT BUỘC** có `audio_url`. Không có trong DB → cả 2 đều `null`.
> 2. **R2 upload**: Luôn chạy `node scripts/upload-content-r2.mjs --remote` sau khi tạo/sửa JSON.
> 3. **KV cache**: Deploy staging đã tự invalidate. Nếu manual update D1 → phải manual invalidate cache.
> 4. **Browser cache**: Sau deploy, phải `Ctrl+Shift+R` để thấy kết quả mới nhất.
> 5. **image_url**: Đặt trong file JSON — seed script tự đồng bộ vào D1. KHÔNG cần thêm thủ công.

---

## 🔍 KIỂM TRA ĐỘ ỔN ĐỊNH

```bash
# Kiểm tra API staging trả về đúng bài và có image_url
curl -s "https://dev.luyenthi.io.vn/api/subjects?pathway=cambridge&subject=flyers" | \
  python3 -c "
import json,sys
data=json.load(sys.stdin)
for x in data:
    if 'FW3' in x.get('quiz_id',''):
        print(x['quiz_id'], '| img:', (x.get('image_url') or 'NULL')[:50])
"
```

Kết quả mong đợi: Tất cả bài FW3 có `image_url` không phải `NULL`.
