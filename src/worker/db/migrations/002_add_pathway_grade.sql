-- ============================================================
-- Migration: 002_add_pathway_grade.sql
-- Purpose:   Phase IA — Thêm lộ trình và trình độ lớp vào student_profiles
-- Date:      2026-04-30
-- ============================================================

-- Thêm cột lộ trình đã chọn
-- 'cambridge' | 'lop6' | NULL (chưa chọn)
ALTER TABLE student_profiles ADD COLUMN selected_pathway TEXT;

-- Thêm cột lớp hiện tại của bé (3, 4, hoặc 5)
-- NULL = chưa trả lời trong onboarding
ALTER TABLE student_profiles ADD COLUMN current_grade INTEGER;

-- Index để filter dashboard theo pathway nhanh hơn
CREATE INDEX IF NOT EXISTS idx_student_pathway
  ON student_profiles(selected_pathway)
  WHERE selected_pathway IS NOT NULL;
