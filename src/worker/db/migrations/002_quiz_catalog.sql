-- Migration 002: Quiz Catalog — Dynamic content registry
-- Thay thế subjects.ts hardcode, scale lên 500+ bài không cần rebuild

CREATE TABLE IF NOT EXISTS quiz_catalog (
  -- Identity
  quiz_id       TEXT PRIMARY KEY,        -- "FW2-MED-001"
  slug          TEXT NOT NULL UNIQUE,    -- "fw2-med-001"

  -- Routing
  pathway       TEXT NOT NULL,           -- "cambridge" | "lop6"
  subject_slug  TEXT NOT NULL,           -- "flyers" | "toan" | "tieng-anh"
  level         TEXT,                    -- "Flyers" | "Movers" | "Level 1"
  group_tag     TEXT,                    -- "flyers" | "movers" | "starters"

  -- Display metadata
  title         TEXT NOT NULL,
  emoji         TEXT DEFAULT '📖',
  skill         TEXT NOT NULL DEFAULT 'reading',
                                         -- "reading"|"writing"|"math"|"mixed"
  part          INTEGER DEFAULT 1,
  difficulty    TEXT DEFAULT 'easy',     -- "easy" | "medium" | "hard"
  questions     INTEGER DEFAULT 5,
  est_minutes   INTEGER DEFAULT 5,

  -- Flags (UI only — paywall auth vẫn dùng quiz_configs)
  is_free       INTEGER DEFAULT 0,       -- 0=premium badge, 1=free badge
  is_published  INTEGER DEFAULT 1,       -- 0=ẩn khỏi SubjectPage
  show_on_home  INTEGER DEFAULT 0,       -- hiện trong HomePage lessons

  -- Curriculum metadata
  grade_target  TEXT,                    -- "3-4" | "4-5" | "5-6"
  grade_min     INTEGER,
  grade_max     INTEGER,
  in_pool       INTEGER DEFAULT 0,
  recommended   INTEGER DEFAULT 0,

  -- Advanced
  unlocks_game  TEXT,                    -- "hangman" | null
  r2_key_override TEXT,                  -- override getR2Key() nếu cần

  -- Admin
  sort_order    INTEGER DEFAULT 0,
  created_at    INTEGER DEFAULT (unixepoch()),
  updated_at    INTEGER DEFAULT (unixepoch())
);

-- Indexes cho các query phổ biến nhất
CREATE INDEX IF NOT EXISTS idx_qcat_pathway_subject
  ON quiz_catalog(pathway, subject_slug, is_published);

CREATE INDEX IF NOT EXISTS idx_qcat_difficulty
  ON quiz_catalog(subject_slug, difficulty, is_free);

CREATE INDEX IF NOT EXISTS idx_qcat_slug
  ON quiz_catalog(slug);

-- View hữu ích cho Admin Dashboard sau này
CREATE VIEW IF NOT EXISTS v_quiz_summary AS
SELECT
  pathway,
  subject_slug,
  difficulty,
  COUNT(*) as total,
  SUM(is_free) as free_count,
  SUM(CASE WHEN is_free = 0 THEN 1 ELSE 0 END) as premium_count
FROM quiz_catalog
WHERE is_published = 1
GROUP BY pathway, subject_slug, difficulty;
