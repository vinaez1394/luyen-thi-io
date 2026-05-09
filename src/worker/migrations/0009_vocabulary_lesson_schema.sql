-- ============================================================
-- Migration: 0009_vocabulary_lesson_schema.sql
-- Vocabulary Lesson System — Schema Update
-- Thêm: certificate, cert_order, image_url, audio_url, emoji
-- Tạo: student_vocabulary với SRS support
-- Xóa: vocabulary_words (unused)
-- ============================================================

-- ── Step 1: Thêm cột mới vào vocabulary_bank ─────────────────
ALTER TABLE vocabulary_bank ADD COLUMN certificate TEXT NOT NULL DEFAULT 'flyers';
-- Giá trị: 'starters' | 'movers' | 'flyers' | 'ket' | 'pet'

ALTER TABLE vocabulary_bank ADD COLUMN cert_order INTEGER NOT NULL DEFAULT 3;
-- starters=1, movers=2, flyers=3, ket=4, pet=5
-- Logic filter: WHERE cert_order <= N (cumulative)

ALTER TABLE vocabulary_bank ADD COLUMN image_url TEXT;
-- NULL = dùng emoji fallback
-- Path: 'images/vocabulary/{id}.jpg' (Cloudflare R2)

ALTER TABLE vocabulary_bank ADD COLUMN audio_url TEXT;
-- NULL = dùng Web Speech API fallback
-- Path: 'audio/vocabulary/{id}.mp3' (Cloudflare R2)

ALTER TABLE vocabulary_bank ADD COLUMN emoji TEXT;
-- Emoji đại diện cho từ, dùng khi image_url = NULL
-- Ví dụ: '🐱' cho cat, '🦈' cho shark

-- ── Step 2: Index mới cho Vocabulary Lesson ──────────────────
CREATE INDEX IF NOT EXISTS idx_vocab_cert    ON vocabulary_bank(certificate, cert_order);
CREATE INDEX IF NOT EXISTS idx_vocab_lesson  ON vocabulary_bank(topic, cert_order, is_active);

-- ── Step 3: Xóa bảng cũ không dùng ──────────────────────────
-- vocabulary_words: referenced in brain.json nhưng không có migration, không có code dùng
DROP TABLE IF EXISTS vocabulary_words;

-- ── Step 4: student_vocabulary với SRS ───────────────────────
CREATE TABLE IF NOT EXISTS student_vocabulary (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id      TEXT NOT NULL,
  word_id         TEXT NOT NULL,
  mastery_level   INTEGER NOT NULL DEFAULT 0,
  -- 0 = new (chưa học)
  -- 1 = learning (đang học, đúng ≥ 1 lần)
  -- 2 = mastered (thành thạo, vào maintenance)

  correct_count   INTEGER NOT NULL DEFAULT 0,
  seen_count      INTEGER NOT NULL DEFAULT 0,

  -- SRS Fields (Spaced Repetition System)
  interval_days   INTEGER NOT NULL DEFAULT 1,
  -- Khoảng cách ôn lại: 1 → 3 → 7 → 14 → 30 ngày
  -- Reset về 1 khi trả lời sai

  next_review_at  INTEGER,
  -- Unix timestamp khi cần ôn lại
  -- NULL = chưa học lần nào
  -- Query: WHERE next_review_at <= unixepoch() → "đến hạn ôn"

  last_seen_at    INTEGER,
  first_seen_at   INTEGER DEFAULT (unixepoch()),

  UNIQUE(student_id, word_id)
  -- Mỗi học sinh chỉ có 1 record per từ
);

CREATE INDEX IF NOT EXISTS idx_sv_student_word
  ON student_vocabulary(student_id, word_id);

CREATE INDEX IF NOT EXISTS idx_sv_review
  ON student_vocabulary(student_id, next_review_at);
-- Dùng để query "từ đến hạn ôn hôm nay"

CREATE INDEX IF NOT EXISTS idx_sv_mastery
  ON student_vocabulary(student_id, mastery_level);
-- Dùng để query "từ chưa thành thạo" cho session mới
