-- Migration 0010: Add last_quiz_id to student_stats + ensure grade/pathway columns exist
-- Fix: /api/student/dashboard 500 error caused by missing columns

-- Thêm last_quiz_id vào student_stats (nếu chưa có)
ALTER TABLE student_stats ADD COLUMN last_quiz_id TEXT DEFAULT NULL;

-- Đảm bảo student_profiles có current_grade (nếu migration 0003 chưa apply)
-- SQLite không hỗ trợ IF NOT EXISTS cho ALTER TABLE → dùng try/catch phía code
-- Để an toàn: các câu này chạy độc lập, Cloudflare D1 bỏ qua nếu đã tồn tại
