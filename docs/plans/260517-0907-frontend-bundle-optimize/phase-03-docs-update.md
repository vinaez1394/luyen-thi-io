# Phase 03: HUONGDAN.md — Cập Nhật Docs

Status: ⬜ Pending
Dependencies: Không có (làm độc lập)
Estimated: 10 phút

## Mục Tiêu

Fix 2 chỗ sai/thiếu trong `docs/HUONGDAN.md` phát hiện từ audit ngày 2026-05-17:

1. Bảng R2 Mapping thiếu dòng `FL1-*` (Listening Part 1)
2. Snippet `cache/invalidate` chưa có `x-admin-key` header (đã thêm auth ngày 17/05)

## Implementation Steps

### Bước 1 — Thêm FL1 vào bảng R2 Mapping

**Tìm đoạn (line ~386-392):**
```markdown
| Quiz ID Pattern | R2 Path | URL |
|----------------|---------|-----|
| `MATH-L*-P*` | `quizzes/lop6/toan/{ID}.json` | `/lop6/toan/{slug}` |
| `RW*`, `RW2-*`, `RW3-*` | `quizzes/cambridge/flyers/reading/{ID}.json` | `/cambridge/flyers/{slug}` |
| `L001-L003` | `quizzes/cambridge/flyers/listening/{ID}.json` | `/cambridge/flyers/{slug}` |
```

**Thêm dòng FL1-* và fix L001-L003:**
```markdown
| `FL1-EASY-*`, `FL1-MED-*`, `FL1-HARD-*` | `quizzes/cambridge/flyers/listening/part1/{ID}.json` | `/cambridge/flyers/{slug}` |
```

> ⚠️ NOTE: `L001-L003` (path cũ `listening/{ID}`) và `FL1-*` (path mới `listening/part1/{ID}`) là 2 series khác nhau.

### Bước 2 — Thêm `part1/` vào cây thư mục R2

**Tìm đoạn (line ~402-405):**
```
└── cambridge/
    └── flyers/
        ├── reading/    ← RW001, RW2-001, RW3-001
        └── listening/  ← L001, L002, L003
```

**Sửa thành:**
```
└── cambridge/
    └── flyers/
        ├── reading/    ← RW001, RW2-001, RW3-001
        └── listening/
            ├── (root)  ← L001, L002, L003 (series cũ)
            └── part1/  ← FL1-EASY-001, FL1-MED-001 (Click-to-Connect engine)
```

### Bước 3 — Update snippet cache/invalidate (thêm x-admin-key)

**Tìm đoạn (line ~795-799):**
```bash
curl -X POST https://luyenthi.io.vn/api/subjects/cache/invalidate \
  -H "Content-Type: application/json" -d '{"pathway":"cambridge","subject":"flyers"}'
```

**Sửa thành:**
```bash
# ⚠️ Yêu cầu x-admin-key header (set từ CACHE_ADMIN_KEY secret)
curl -X POST https://luyenthi.io.vn/api/subjects/cache/invalidate \
  -H "Content-Type: application/json" \
  -H "x-admin-key: $CACHE_ADMIN_KEY" \
  -d '{"pathway":"cambridge","subject":"flyers"}'

# CACHE_ADMIN_KEY lưu tại .dev.vars (local) hoặc Cloudflare Worker Secrets (production)
```

## Files Thay Đổi

- `docs/HUONGDAN.md` — 3 chỗ sửa nhỏ (bảng R2, cây thư mục, snippet curl)

## Test Criteria

- [ ] Đọc lại HUONGDAN.md tại section R2 Mapping — thấy FL1-* có mặt
- [ ] Cây thư mục có `part1/` subfolder
- [ ] Snippet curl có `-H "x-admin-key: $CACHE_ADMIN_KEY"`

---
Next Phase: [phase-04-verify.md](./phase-04-verify.md)
