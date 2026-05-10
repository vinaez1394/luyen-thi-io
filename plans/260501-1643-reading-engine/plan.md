# Plan: Reading Engine — Bài Tập Đọc Hiểu Tiếng Anh Thi Lớp 6
Created: 2026-05-01 16:43
Status: 🟡 In Progress

---

## Overview

Xây dựng hệ thống bài tập Reading Comprehension cho lộ trình **Thi Lớp 6 / Tiếng Anh**, tích hợp vào QuizEngine hiện có dưới dạng một engine riêng (`ReadingEngine`).

**9 bài tập** × 2 sections/bài × 2 passages/bài — đúng format đề thi tuyển sinh lớp 6 thật.

---

## Quyết định đã chốt (Decision Log)

| # | Quyết định | Lý do |
|---|------------|-------|
| D1 | Hướng 2 — ReadingEngine riêng | UX chuẩn format thi, dư địa Mock Test |
| D2 | Phương án A — Mỗi section có passage panel riêng | Đúng format đề thi, học sinh quen dạng này |
| D3 | URL: `/lop6/tieng-anh/reading/READING-EASY-GRADE3-P1` | Phân cấp rõ ràng theo kỹ năng (Phương án B) |
| D4 | File JSON: `content/lop6/tieng-anh/reading/READING-EASY-GRADE3-P1.json` | Khớp với URL, dễ tìm |
| D5 | Tooltip nhúng sẵn trong JSON | Không gọi API từ điển online |
| D6 | Metadata: `skill`, `difficulty`, `grade_min`, `grade_max`, `in_pool` | Dư địa cho Mock Test sau này |

---

## Cấu trúc 9 bài tập

| File JSON | Trình độ | Lớp phù hợp |
|-----------|----------|-------------|
| `READING-EASY-GRADE3-P1.json` | Easy | Lớp 3–4 |
| `READING-EASY-GRADE4-P1.json` | Easy | Lớp 4–5 |
| `READING-EASY-GRADE5-P1.json` | Easy | Lớp 5–6 |
| `READING-MED-GRADE3-P1.json`  | Medium | Lớp 3–4 |
| `READING-MED-GRADE4-P1.json`  | Medium | Lớp 4–5 |
| `READING-MED-GRADE5-P1.json`  | Medium | Lớp 5–6 |
| `READING-HARD-GRADE3-P1.json` | Hard | Lớp 3–4 |
| `READING-HARD-GRADE4-P1.json` | Hard | Lớp 4–5 |
| `READING-HARD-GRADE5-P1.json` | Hard | Lớp 5–6 |

---

## Tech Stack (kế thừa từ dự án)

- Frontend: React 19 + Vite + CSS Custom Properties
- Backend: Hono + Cloudflare Workers
- Storage: Cloudflare R2 (JSON files)
- Font: Nunito | Theme: CSS Variables | Design: Mobile-first

---

## Phases

| Phase | Tên | Status | Ước tính |
|-------|-----|--------|----------|
| 01 | JSON Schema + 9 bài nội dung | ⬜ Pending | 1 session |
| 02 | ReadingEngine Component | ⬜ Pending | 1–2 sessions |
| 03 | Đăng ký bài vào hệ thống | ⬜ Pending | 0.5 session |
| 04 | QuizPage Integration + Scoring | ⬜ Pending | 0.5 session |
| 05 | Polish, Test, Deploy | ⬜ Pending | 0.5 session |

**Tổng ước tính:** 3.5–4.5 sessions

---

## Quick Commands

```bash
# Bắt đầu
/code phase-01   # Tạo JSON Schema + 9 bài nội dung

# Kiểm tra TypeScript sau mỗi phase
npx tsc -b

# Xem bài trên dev server
npm run dev
# URL mẫu: http://localhost:5174/lop6/tieng-anh/reading/READING-EASY-GRADE3-P1
```

---

## Mục tiêu sau khi hoàn thành

- ✅ `/lop6/tieng-anh` chuyển từ "Sắp có" → Available
- ✅ 9 bài Reading có thể truy cập, làm bài được
- ✅ Passage thu gọn/mở rộng mượt mà
- ✅ Score tính đúng, submit được
- ✅ Metadata đủ cho Mock Test sau này (`in_pool: true`)
