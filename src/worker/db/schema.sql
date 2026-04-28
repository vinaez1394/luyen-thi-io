-- =============================================
-- luyen-thi-io — D1 SQLite Schema
-- Cập nhật: 2026-04-28
-- ⚠️ KHÔNG dùng JSON_EXTRACT để filter — dùng indexed columns
-- =============================================

-- =============================================
-- USERS (Phụ huynh đăng ký)
-- =============================================
CREATE TABLE IF NOT EXISTS users (
  id                TEXT PRIMARY KEY,          -- UUID
  email             TEXT UNIQUE NOT NULL,
  name              TEXT,
  google_id         TEXT UNIQUE,
  subscription_tier TEXT DEFAULT 'free',       -- 'free' | 'basic' | 'premium'
  notification_email TEXT,                    -- Email nhận báo cáo tuần
  created_at        INTEGER DEFAULT (unixepoch())
);

-- =============================================
-- STUDENT PROFILES (Hồ sơ học sinh)
-- =============================================
CREATE TABLE IF NOT EXISTS student_profiles (
  id           TEXT PRIMARY KEY,              -- UUID
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_id    TEXT DEFAULT 'cat',            -- key từ kho avatar preset
  theme        TEXT DEFAULT 'purple',         -- 'purple'|'ocean'|'sakura'|'forest'|'night'|'sunset'
  created_at   INTEGER DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_student_profiles_user ON student_profiles(user_id);

-- =============================================
-- STUDENT STATS (Thống kê — Indexed, KHÔNG dùng JSON_EXTRACT để filter)
-- =============================================
CREATE TABLE IF NOT EXISTS student_stats (
  student_id        TEXT PRIMARY KEY REFERENCES student_profiles(id) ON DELETE CASCADE,
  total_stars       INTEGER DEFAULT 0,
  current_streak    INTEGER DEFAULT 0,
  longest_streak    INTEGER DEFAULT 0,
  total_sessions    INTEGER DEFAULT 0,
  last_active       INTEGER,
  -- Skill levels per part (0–5 scale)
  lvl_listening_p1  INTEGER DEFAULT 0,
  lvl_listening_p2  INTEGER DEFAULT 0,
  lvl_listening_p3  INTEGER DEFAULT 0,
  lvl_listening_p4  INTEGER DEFAULT 0,
  lvl_reading_p1    INTEGER DEFAULT 0,
  lvl_reading_p2    INTEGER DEFAULT 0,
  lvl_reading_p3    INTEGER DEFAULT 0,
  lvl_reading_p4    INTEGER DEFAULT 0,
  lvl_writing_p1    INTEGER DEFAULT 0,
  preferences_json  TEXT DEFAULT '{}'         -- theme, sound on/off, v.v.
);

-- =============================================
-- DREAM GOALS (Hộp Quà Ước Mơ)
-- =============================================
CREATE TABLE IF NOT EXISTS dream_goals (
  id               TEXT PRIMARY KEY,          -- UUID
  student_id       TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  exam_id          TEXT NOT NULL,             -- 'flyers' | 'movers' | 'ket'
  goal_type        TEXT NOT NULL,             -- 'stars' | 'shields' | 'complete'
  goal_target      INTEGER NOT NULL,
  reward_label     TEXT NOT NULL,             -- "Du lịch Đà Nẵng"
  reward_image_key TEXT,                      -- preset key hoặc R2 path
  status           TEXT DEFAULT 'pending',    -- 'pending'|'approved'|'rejected'|'achieved'
  approval_token   TEXT UNIQUE,               -- token trong email link (UUID)
  token_expires    INTEGER,                   -- unixepoch, hạn 7 ngày
  current_progress INTEGER DEFAULT 0,
  approved_at      INTEGER,
  achieved_at      INTEGER,
  created_at       INTEGER DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_dream_goals_student ON dream_goals(student_id, status);
CREATE INDEX IF NOT EXISTS idx_dream_goals_token ON dream_goals(approval_token) WHERE approval_token IS NOT NULL;

-- =============================================
-- QUIZ ATTEMPTS (Kết quả từng bài làm)
-- =============================================
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id                   TEXT PRIMARY KEY,      -- UUID
  student_id           TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  quiz_id              TEXT NOT NULL,         -- ID bài JSON (vd: 'L001', 'RW002')
  skill                TEXT NOT NULL,         -- 'listening' | 'reading' | 'writing'
  part_number          INTEGER,               -- 1, 2, 3, 4
  score                INTEGER,               -- số câu đúng
  max_score            INTEGER,               -- tổng số câu
  stars_earned         INTEGER DEFAULT 0,     -- ⭐ nhận được (dựa trên % + bonus)
  answers_json         TEXT,                  -- {"q1": "a", "q2": "c"}
  time_spent           INTEGER,               -- giây
  is_challenge         INTEGER DEFAULT 0,     -- 0=normal | 1=challenge mode
  challenge_threshold  INTEGER,               -- 80 = phải đạt ≥ 80%
  challenge_multiplier REAL DEFAULT 1.0,      -- 2.0 = gấp đôi sao
  stars_base           INTEGER DEFAULT 0,     -- sao trước bonus
  completed_at         INTEGER DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student ON quiz_attempts(student_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_skill   ON quiz_attempts(student_id, skill, part_number);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz    ON quiz_attempts(quiz_id);

-- =============================================
-- DAILY ACTIVITY (Streak tracking)
-- =============================================
CREATE TABLE IF NOT EXISTS daily_activity (
  student_id TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  date_key   TEXT NOT NULL,                   -- 'YYYY-MM-DD'
  sessions   INTEGER DEFAULT 0,
  stars      INTEGER DEFAULT 0,
  PRIMARY KEY (student_id, date_key)
);

-- =============================================
-- SUBSCRIPTIONS
-- =============================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id          TEXT PRIMARY KEY,              -- UUID
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan        TEXT NOT NULL,                 -- 'basic' | 'premium' | 'family'
  expires_at  INTEGER NOT NULL,              -- unixepoch
  payment_ref TEXT,                          -- PayOS reference
  created_at  INTEGER DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id, expires_at DESC);
