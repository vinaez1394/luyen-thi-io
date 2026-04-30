-- ============================================================
-- Master seed file: Gộp tất cả 3 batch vocabulary Flyers
-- Chạy file này để seed toàn bộ 250 từ vào D1
-- ============================================================
-- Stats:
--   Animals      20 từ  | topic: animals
--   Body         12 từ  | topic: body
--   Clothes      12 từ  | topic: clothes
--   Food/Drink   20 từ  | topic: food
--   Health       10 từ  | topic: health
--   Home         14 từ  | topic: home
--   Nature       20 từ  | topic: nature
--   Feelings     20 từ  | topic: feelings
--   Places       20 từ  | topic: places
--   School       12 từ  | topic: school
--   Sports       15 từ  | topic: sports
--   Transport    12 từ  | topic: transport
--   Materials    10 từ  | topic: materials
--   Time         10 từ  | topic: time
--   Adjectives   13 từ  | topic: adjectives
-- ─────────────────────────────────────────────────────────────
--   TOTAL:      250 từ  | group_tag: flyers | level_order: 3
-- ============================================================

.read 0005_seed_vocabulary_flyers_batch1.sql
.read 0006_seed_vocabulary_flyers_batch2.sql
.read 0007_seed_vocabulary_flyers_batch3.sql

-- Verification query
SELECT topic, COUNT(*) as word_count
FROM vocabulary_bank
GROUP BY topic
ORDER BY topic;
