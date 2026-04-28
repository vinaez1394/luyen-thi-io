# Phase 01: Foundation — D1 Schema + Wrangler
> Trạng thái: ⬜ Chưa làm | Phụ thuộc: Không có
> Đây là nền móng của toàn bộ app. Làm SAI ở đây = sửa rất đau sau.

---

## 🎯 Mục tiêu

Thiết lập xong infrastructure Cloudflare (D1 database đầy đủ schema, R2 bucket, KV namespace) và đảm bảo kết nối hoạt động từ Hono Worker.

---

## ✅ Danh sách công việc

### 1. Kiểm tra & cập nhật wrangler.json
- [ ] Thêm D1 binding tên `DB`
- [ ] Thêm R2 binding tên `CONTENT` (cho JSON, audio, images)
- [ ] Thêm KV binding tên `SESSION`
- [ ] Verify `entry_point` trỏ đúng vào `./src/worker/index.ts`

### 2. Tạo D1 Database
- [ ] Chạy: `wrangler d1 create luyen-thi-db`
- [ ] Copy `database_id` vào `wrangler.json`
- [ ] Tạo file: `src/worker/db/schema.sql`

### 3. Viết SQL Schema đầy đủ
- [ ] Bảng `users`
- [ ] Bảng `student_profiles`
- [ ] Bảng `student_stats`
- [ ] Bảng `dream_goals`
- [ ] Bảng `quiz_attempts`
- [ ] Bảng `daily_activity`
- [ ] Bảng `subscriptions`
- [ ] Tạo indexes cần thiết

### 4. Apply schema lên D1
- [ ] `wrangler d1 execute luyen-thi-db --file=src/worker/db/schema.sql`
- [ ] Verify bằng: `wrangler d1 execute luyen-thi-db --command="SELECT name FROM sqlite_master WHERE type='table'"`

### 5. Tạo R2 Bucket
- [ ] `wrangler r2 bucket create luyen-thi-content`
- [ ] Tạo folder structure trên R2 (upload test file)

### 6. Test connection từ Hono
- [ ] Thêm route test: `GET /api/health` → query D1, return `{ ok: true, tables: [...] }`
- [ ] Deploy local và gọi thử

---

## 📄 Files cần tạo/sửa

| File | Hành động | Mục đích |
|------|-----------|---------|
| `wrangler.json` | SỬA | Thêm D1, R2, KV bindings |
| `src/worker/db/schema.sql` | TẠO MỚI | SQL tạo toàn bộ bảng |
| `src/worker/db/types.ts` | TẠO MỚI | TypeScript types cho D1 rows |
| `src/worker/routes/health.ts` | TẠO MỚI | Route test connection |
| `src/worker/index.ts` | SỬA | Mount route /api/health |

---

## 📝 Schema SQL đầy đủ (copy vào schema.sql)

```sql
-- =====================
-- USERS (Phụ huynh đăng ký)
-- =====================
CREATE TABLE IF NOT EXISTS users (
  id               TEXT PRIMARY KEY,
  email            TEXT UNIQUE NOT NULL,
  name             TEXT,
  google_id        TEXT UNIQUE,
  subscription_tier TEXT DEFAULT 'free',  -- 'free' | 'basic' | 'premium'
  notification_email TEXT,               -- Email nhận báo cáo (có thể khác email đăng nhập)
  created_at       INTEGER DEFAULT (unixepoch())
);

-- =====================
-- STUDENT PROFILES (Hồ sơ học sinh)
-- =====================
CREATE TABLE IF NOT EXISTS student_profiles (
  id           TEXT PRIMARY KEY,
  user_id      TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  avatar_id    TEXT DEFAULT 'cat',           -- key từ kho avatar preset
  theme        TEXT DEFAULT 'purple',        -- 'purple'|'ocean'|'sakura'|'forest'|'night'|'sunset'
  created_at   INTEGER DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_student_profiles_user ON student_profiles(user_id);

-- =====================
-- STUDENT STATS (Thống kê — KHÔNG dùng JSON_EXTRACT để filter)
-- =====================
CREATE TABLE IF NOT EXISTS student_stats (
  student_id       TEXT PRIMARY KEY REFERENCES student_profiles(id) ON DELETE CASCADE,
  total_stars      INTEGER DEFAULT 0,
  current_streak   INTEGER DEFAULT 0,
  longest_streak   INTEGER DEFAULT 0,
  total_sessions   INTEGER DEFAULT 0,
  last_active      INTEGER,
  -- Skill levels (0–5 mỗi kỹ năng/part)
  lvl_listening_p1 INTEGER DEFAULT 0,
  lvl_listening_p2 INTEGER DEFAULT 0,
  lvl_listening_p3 INTEGER DEFAULT 0,
  lvl_listening_p4 INTEGER DEFAULT 0,
  lvl_reading_p1   INTEGER DEFAULT 0,
  lvl_reading_p2   INTEGER DEFAULT 0,
  lvl_reading_p3   INTEGER DEFAULT 0,
  lvl_reading_p4   INTEGER DEFAULT 0,
  lvl_writing_p1   INTEGER DEFAULT 0,
  preferences_json TEXT DEFAULT '{}'        -- theme, sound on/off, v.v.
);

-- =====================
-- DREAM GOALS (Hộp Quà Ước Mơ)
-- =====================
CREATE TABLE IF NOT EXISTS dream_goals (
  id               TEXT PRIMARY KEY,
  student_id       TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  exam_id          TEXT NOT NULL,            -- 'flyers' | 'movers' | 'ket'
  goal_type        TEXT NOT NULL,            -- 'stars' | 'shields' | 'complete'
  goal_target      INTEGER NOT NULL,
  reward_label     TEXT NOT NULL,            -- "Du lịch Đà Nẵng"
  reward_image_key TEXT,                     -- preset key hoặc R2 path
  status           TEXT DEFAULT 'pending',   -- 'pending'|'approved'|'rejected'|'achieved'
  approval_token   TEXT UNIQUE,              -- token trong email link
  token_expires    INTEGER,                  -- unixepoch, hạn 7 ngày
  current_progress INTEGER DEFAULT 0,
  approved_at      INTEGER,
  achieved_at      INTEGER,
  created_at       INTEGER DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_dream_goals_student ON dream_goals(student_id, status);

-- =====================
-- QUIZ ATTEMPTS (Kết quả từng bài)
-- =====================
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id                   TEXT PRIMARY KEY,
  student_id           TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  quiz_id              TEXT NOT NULL,
  skill                TEXT NOT NULL,        -- 'listening' | 'reading' | 'writing'
  part_number          INTEGER,              -- 1, 2, 3, 4...
  score                INTEGER,
  max_score            INTEGER,
  stars_earned         INTEGER DEFAULT 0,
  answers_json         TEXT,                 -- {"q1": "a", "q2": "c"}
  time_spent           INTEGER,              -- giây
  is_challenge         INTEGER DEFAULT 0,    -- 0 | 1
  challenge_threshold  INTEGER,              -- 80 = phải đạt ≥ 80%
  challenge_multiplier REAL DEFAULT 1.0,     -- 2.0 = gấp đôi
  stars_base           INTEGER DEFAULT 0,
  completed_at         INTEGER DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student ON quiz_attempts(student_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_skill ON quiz_attempts(student_id, skill, part_number);

-- =====================
-- DAILY ACTIVITY (Streak tracking)
-- =====================
CREATE TABLE IF NOT EXISTS daily_activity (
  student_id TEXT NOT NULL REFERENCES student_profiles(id) ON DELETE CASCADE,
  date_key   TEXT NOT NULL,                  -- '2026-04-28' (YYYY-MM-DD)
  sessions   INTEGER DEFAULT 0,
  stars      INTEGER DEFAULT 0,
  PRIMARY KEY (student_id, date_key)
);

-- =====================
-- SUBSCRIPTIONS
-- =====================
CREATE TABLE IF NOT EXISTS subscriptions (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan        TEXT NOT NULL,                 -- 'basic' | 'premium' | 'family'
  expires_at  INTEGER NOT NULL,
  payment_ref TEXT,
  created_at  INTEGER DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions(user_id, expires_at DESC);
```

---

## wrangler.json cần có

```json
{
  "name": "luyen-thi-io",
  "main": "./src/worker/index.ts",
  "compatibility_date": "2024-09-23",
  "assets": {
    "directory": "./dist/client",
    "binding": "ASSETS"
  },
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "luyen-thi-db",
      "database_id": "COPY_FROM_WRANGLER_D1_CREATE_OUTPUT"
    }
  ],
  "r2_buckets": [
    {
      "binding": "CONTENT",
      "bucket_name": "luyen-thi-content"
    }
  ],
  "kv_namespaces": [
    {
      "binding": "SESSION",
      "id": "COPY_FROM_WRANGLER_KV_CREATE_OUTPUT"
    }
  ]
}
```

---

## 🧪 Tiêu chí hoàn thành

- [ ] `wrangler dev` chạy không lỗi
- [ ] `GET /api/health` trả về `{ ok: true }` và list tên các tables
- [ ] 7 bảng tồn tại trong D1 (verify bằng wrangler d1 execute)
- [ ] R2 bucket đã tạo
- [ ] TypeScript không có lỗi type

---

*Sau khi xong → Cập nhật plan.md: Phase 01 = ✅ Hoàn thành*
*Tiếp theo: Phase 02 — Theme System*
