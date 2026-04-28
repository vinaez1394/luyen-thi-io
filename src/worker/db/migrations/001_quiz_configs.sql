-- Migration: Thêm bảng quiz_configs cho Freemium Model
-- Chạy: wrangler d1 execute luyen-thi-db --file=src/worker/db/migrations/001_quiz_configs.sql --remote

CREATE TABLE IF NOT EXISTS quiz_configs (
  quiz_id      TEXT PRIMARY KEY,
  is_free      INTEGER DEFAULT 0,      -- 0=premium, 1=free
  is_published INTEGER DEFAULT 1,      -- 0=draft, 1=published
  sort_order   INTEGER DEFAULT 0,
  created_at   INTEGER DEFAULT (unixepoch()),
  updated_at   INTEGER DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_quiz_configs_free ON quiz_configs(is_free, is_published);
CREATE INDEX IF NOT EXISTS idx_quiz_configs_order ON quiz_configs(sort_order);

-- Thêm cột is_admin vào users (cho Admin Panel)
ALTER TABLE users ADD COLUMN is_admin INTEGER DEFAULT 0;
