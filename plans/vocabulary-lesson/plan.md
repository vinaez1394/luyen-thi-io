# Plan: Vocabulary Lesson System
Created: 2026-05-07
Status: 🟡 In Progress

## Overview
Xây dựng module học từ vựng Cambridge đầy đủ theo flow LEARN → PRACTICE → USE với SRS.
Pilot: 2 topics (Animals + Family), cert Flyers (cumulative 3 cấp).

## Tech Stack
- Frontend: React 19 + Vite (không thay đổi)
- Backend: Hono on Cloudflare Workers (không thay đổi)
- Database: Cloudflare D1 (thêm cột + bảng mới)
- Storage: Cloudflare R2 (audio + images — Phase 5)
- Design doc: `docs/vocabulary-design.md`

## Phases

| Phase | Name | Status | Tasks |
|-------|------|--------|-------|
| 01 | Database Migration | ✅ Complete | 6/6 tasks |
| 02 | API Endpoints | ✅ Complete | 6/6 tasks |
| 03 | Frontend Core (Page + LEARN) | ✅ Complete | 10/10 tasks |
| 04 | Games (PRACTICE + USE) | ✅ Complete | 9/9 tasks |
| 05 | Data Seeding + Polish | ✅ Complete | 8/8 tasks |

**Tổng:** 41 tasks

## Quick Reference
- Design doc: `docs/vocabulary-design.md`
- Route mới: `/cambridge/vocabulary` và `/cambridge/vocabulary/:topic`
- Không đụng vào: `HomeHangman.tsx`, `HomeFlashcard.tsx`, `/api/vocabulary/random`
- Pilot topics: `animals`, `family`
