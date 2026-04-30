# Plan: IA Restructure — luyenthi.io.vn
> Created: 2026-04-30 13:50  
> Feature: Tái cấu trúc Information Architecture (2 lộ trình + Grade Leveling)  
> Nguồn: `docs/BRIEF.md`  
> Status: 🟡 In Progress

---

## Overview

Tái cấu trúc toàn bộ Information Architecture của `luyenthi.io.vn` từ cấu trúc phẳng (flat) sang đa tầng (multi-layer), phân tách rõ 2 lộ trình học tập độc lập:
- 🇬🇧 **Cambridge** (Starters → Movers → Flyers → KET → PET)
- 🏫 **Thi Lớp 6** (4 nhóm môn: Toán / Tiếng Việt / Tiếng Anh / Khoa học)

Tích hợp phân cấp độ khó theo lớp hiện tại (Grade Leveling — Hybrid A+C).

---

## Tech Stack
- **Frontend:** React + React Router v6 + TypeScript
- **Backend:** Cloudflare Workers + Hono
- **Database:** Cloudflare D1 (SQLite)
- **Content:** JSON files trên Cloudflare R2
- **Deploy:** GitHub Actions → Cloudflare

---

## Phases

| Phase | Tên | Rủi ro | Status | Tasks |
|-------|-----|--------|--------|-------|
| 01 | Schema Foundation | 🟢 Thấp | ⬜ Pending | 8 tasks |
| 02 | Routing Architecture | 🔴 Cao | ⬜ Pending | 10 tasks |
| 03 | Navigation & Breadcrumbs | 🟡 Trung bình | ⬜ Pending | 8 tasks |
| 04 | Onboarding & Dashboard | 🟡 Trung bình | ⬜ Pending | 9 tasks |
| 05 | Game Integration Closing | 🟢 Thấp | ⬜ Pending | 5 tasks |
| 06 | Testing & Deploy | 🟡 Trung bình | ⬜ Pending | 6 tasks |

**Tổng:** 46 tasks

---

## Dependencies

```
Phase 01 → (unlock) → Phase 02 → Phase 03
                            ↓
                       Phase 04 → Phase 05 → Phase 06
```

**Phase 01 là hard dependency** — không thể làm phase nào khác nếu chưa xong schema.

---

## Quick Commands
- Bắt đầu Phase 1: `/code phase-01`
- Xem tiến độ: `/next`
- Đọc spec chi tiết: xem `phase-XX-*.md` tương ứng
