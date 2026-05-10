-- Migration 0009: Thêm metadata vào quiz_attempts
-- Mục đích: hỗ trợ tính progress theo pathway/subject trong Dashboard
-- Phase 2 — Dashboard Redesign

-- Thêm cột pathway: 'lop6' | 'cambridge'
ALTER TABLE quiz_attempts ADD COLUMN pathway TEXT DEFAULT NULL;

-- Thêm cột subject:
--   lop6:      'toan' | 'tieng-anh' | 'tieng-viet' | 'khoa-hoc'
--   cambridge: 'reading' | 'listening' | 'writing' | 'speaking' | 'vocabulary'
ALTER TABLE quiz_attempts ADD COLUMN subject TEXT DEFAULT NULL;

-- Thêm cột is_free: 1 = bài miễn phí | 0 = bài premium
ALTER TABLE quiz_attempts ADD COLUMN is_free INTEGER DEFAULT 1;

-- Index tối ưu query dashboard summary
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_pathway_subject
  ON quiz_attempts(student_id, pathway, subject, completed_at DESC);
