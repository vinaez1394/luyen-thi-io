-- 0018: Seed 7 topics còn lại: sports_leisure, time, toys, transport, weather, work, world
-- Certificate = group_tag (starters/movers/flyers)
-- Generated: 2026-05-07T22:59:46.295Z

-- ===== SPORTS_LEISURE | starters (56 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-001', 'badminton', 'cầu lông', 'starters', 1, '/badminton/', 'noun', 'Badminton is important.', 'cầu lông rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-002', 'ball', 'quả bóng', 'starters', 1, '/ball/', 'noun', 'Ball is important.', 'quả bóng rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-003', 'baseball', 'bóng chày', 'starters', 1, '/baseball/', 'noun', 'Baseball is important.', 'bóng chày rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-004', 'basketball', 'bóng rổ', 'starters', 1, '/basketball/', 'noun', 'Basketball is important.', 'bóng rổ rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-005', 'bat', 'gậy đánh bóng', 'starters', 1, '/bat/', 'noun', 'Bat is important.', 'gậy đánh bóng rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-006', 'beach', 'bãi biển', 'starters', 1, '/beach/', 'noun', 'Beach is important.', 'bãi biển rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-007', 'bike', 'xe đạp', 'starters', 1, '/bike/', 'noun', 'Bike is important.', 'xe đạp rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-008', 'boat', 'thuyền', 'starters', 1, '/boat/', 'noun', 'Boat is important.', 'thuyền rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-009', 'book', 'cuốn sách', 'starters', 1, '/book/', 'noun', 'Book is important.', 'cuốn sách rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-010', 'bounce', 'nảy bóng', 'starters', 1, '/bounce/', 'verb', 'Bounce is important.', 'nảy bóng rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-011', 'camera', 'máy ảnh', 'starters', 1, '/camera/', 'noun', 'Camera is important.', 'máy ảnh rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-012', 'catch', 'bắt (bóng)', 'starters', 1, '/catch/', 'verb', 'Catch is important.', 'bắt (bóng) rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-013', 'doll', 'búp bê', 'starters', 1, '/doll/', 'noun', 'Doll is important.', 'búp bê rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-014', 'draw', 'vẽ', 'starters', 1, '/draw/', 'verb', 'Draw is important.', 'vẽ rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-015', 'drawing', 'bức vẽ', 'starters', 1, '/drawing/', 'noun', 'Drawing is important.', 'bức vẽ rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-016', 'drive', 'lái xe', 'starters', 1, '/drive/', 'verb', 'Drive is important.', 'lái xe rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-017', 'enjoy', 'thích thú', 'starters', 1, '/enjoy/', 'verb', 'Enjoy is important.', 'thích thú rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-018', 'favourite', 'yêu thích', 'starters', 1, '/favourite/', 'adjective', 'Favourite is important.', 'yêu thích rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-019', 'fishing', 'câu cá', 'starters', 1, '/fishing/', 'noun', 'Fishing is important.', 'câu cá rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-020', 'fly', 'bay', 'starters', 1, '/fly/', 'verb', 'Fly is important.', 'bay rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-021', 'football', 'bóng đá', 'starters', 1, '/football/', 'noun', 'Football is important.', 'bóng đá rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-022', 'game', 'trò chơi', 'starters', 1, '/game/', 'noun', 'Game is important.', 'trò chơi rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-023', 'guitar', 'đàn guitar', 'starters', 1, '/guitar/', 'noun', 'Guitar is important.', 'đàn guitar rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-024', 'hobby', 'sở thích', 'starters', 1, '/hobby/', 'noun', 'Hobby is important.', 'sở thích rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-025', 'hockey', 'khúc côn cầu', 'starters', 1, '/hockey/', 'noun', 'Hockey is important.', 'khúc côn cầu rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-026', 'jump', 'nhảy', 'starters', 1, '/jump/', 'noun', 'Jump is important.', 'nhảy rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-027', 'kick', 'đá', 'starters', 1, '/kick/', 'verb', 'Kick is important.', 'đá rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-028', 'kite', 'con diều', 'starters', 1, '/kite/', 'noun', 'Kite is important.', 'con diều rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-029', 'listen', 'nghe', 'starters', 1, '/listen/', 'verb', 'Listen is important.', 'nghe rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-030', 'music', 'âm nhạc', 'starters', 1, '/music/', 'noun', 'Music is important.', 'âm nhạc rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-031', 'photo', 'ảnh', 'starters', 1, '/photo/', 'noun', 'Photo is important.', 'ảnh rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-032', 'piano', 'đàn piano', 'starters', 1, '/piano/', 'noun', 'Piano is important.', 'đàn piano rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-033', 'picture', 'bức tranh', 'starters', 1, '/picture/', 'noun', 'Picture is important.', 'bức tranh rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-034', 'play', 'chơi', 'starters', 1, '/play/', 'verb', 'Play is important.', 'chơi rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-035', 'radio', 'radio', 'starters', 1, '/radio/', 'noun', 'Radio is important.', 'radio rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-036', 'read', 'đọc', 'starters', 1, '/read/', 'noun', 'Read is important.', 'đọc rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-037', 'ride', 'cưỡi / đi xe', 'starters', 1, '/ride/', 'verb', 'Ride is important.', 'cưỡi / đi xe rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-038', 'run', 'chạy', 'starters', 1, '/run/', 'verb', 'Run is important.', 'chạy rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-039', 'sing', 'hát', 'starters', 1, '/sing/', 'verb', 'Sing is important.', 'hát rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-040', 'skateboard', 'ván trượt', 'starters', 1, '/skateboard/', 'noun', 'Skateboard is important.', 'ván trượt rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-041', 'skateboarding', 'trượt ván', 'starters', 1, '/skateboarding/', 'noun', 'Skateboarding is important.', 'trượt ván rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-042', 'soccer', 'bóng đá (Mỹ)', 'starters', 1, '/soccer/', 'noun', 'Soccer is important.', 'bóng đá (Mỹ) rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-043', 'song', 'bài hát', 'starters', 1, '/song/', 'noun', 'Song is important.', 'bài hát rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-044', 'sport', 'thể thao', 'starters', 1, '/sport/', 'noun', 'Sport is important.', 'thể thao rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-045', 'story', 'câu chuyện', 'starters', 1, '/story/', 'noun', 'Story is important.', 'câu chuyện rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-046', 'swim', 'bơi lội', 'starters', 1, '/swim/', 'verb', 'Swim is important.', 'bơi lội rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-047', 'table tennis', 'bóng bàn', 'starters', 1, '/table tennis/', 'noun', 'Table tennis is important.', 'bóng bàn rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-048', 'take a photo', 'chụp ảnh', 'starters', 1, '/take a photo/', 'noun', 'Take a photo is important.', 'chụp ảnh rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-049', 'television', 'ti vi', 'starters', 1, '/television/', 'noun', 'Television is important.', 'ti vi rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-050', 'tennis', 'quần vợt', 'starters', 1, '/tennis/', 'noun', 'Tennis is important.', 'quần vợt rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-051', 'tennis racket', 'vợt tennis', 'starters', 1, '/tennis racket/', 'noun', 'Tennis racket is important.', 'vợt tennis rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-052', 'throw', 'ném', 'starters', 1, '/throw/', 'verb', 'Throw is important.', 'ném rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-053', 'toy', 'đồ chơi', 'starters', 1, '/toy/', 'noun', 'Toy is important.', 'đồ chơi rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-054', 'TV', 'ti vi', 'starters', 1, '/TV/', 'noun', 'TV is important.', 'ti vi rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-055', 'walk', 'đi bộ', 'starters', 1, '/walk/', 'noun', 'Walk is important.', 'đi bộ rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-056', 'watch', 'xem / đồng hồ', 'starters', 1, '/watch/', 'verb', 'Watch is important.', 'xem / đồng hồ rất quan trọng.', 'english', 'starters', 1, 'sports_leisure', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== SPORTS_LEISURE | movers (37 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-001', 'band', 'ban nhạc', 'movers', 2, '/band/', 'noun', 'Band is important.', 'ban nhạc rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-002', 'CD', 'đĩa CD', 'movers', 2, '/CD/', 'noun', 'CD is important.', 'đĩa CD rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-003', 'cinema', 'rạp chiếu phim', 'movers', 2, '/cinema/', 'noun', 'Cinema is important.', 'rạp chiếu phim rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-004', 'comic', 'truyện tranh', 'movers', 2, '/comic/', 'noun', 'Comic is important.', 'truyện tranh rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-005', 'comic book', 'truyện tranh', 'movers', 2, '/comic book/', 'noun', 'Comic book is important.', 'truyện tranh rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-006', 'dance', 'nhảy múa', 'movers', 2, '/dance/', 'verb', 'Dance is important.', 'nhảy múa rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-007', 'DVD', 'đĩa DVD', 'movers', 2, '/DVD/', 'noun', 'DVD is important.', 'đĩa DVD rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-008', 'email', 'thư điện tử', 'movers', 2, '/email/', 'noun', 'Email is important.', 'thư điện tử rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-009', 'film', 'phim', 'movers', 2, '/film/', 'noun', 'Film is important.', 'phim rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-010', 'go shopping', 'đi mua sắm', 'movers', 2, '/go shopping/', 'verb', 'Go shopping is important.', 'đi mua sắm rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-011', 'goal', 'bàn thắng', 'movers', 2, '/goal/', 'noun', 'Goal is important.', 'bàn thắng rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-012', 'holiday', 'kỳ nghỉ', 'movers', 2, '/holiday/', 'noun', 'Holiday is important.', 'kỳ nghỉ rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-013', 'hop', 'nhảy lò cò', 'movers', 2, '/hop/', 'verb', 'Hop is important.', 'nhảy lò cò rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-014', 'ice skates', 'giày trượt băng', 'movers', 2, '/ice skates/', 'noun', 'Ice skates is important.', 'giày trượt băng rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-015', 'ice skating', 'trượt băng', 'movers', 2, '/ice skating/', 'noun', 'Ice skating is important.', 'trượt băng rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-016', 'kick', 'đá', 'movers', 2, '/kick/', 'verb', 'Kick is important.', 'đá rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-017', 'movie', 'phim', 'movers', 2, '/movie/', 'noun', 'Movie is important.', 'phim rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-018', 'net', 'lưới', 'movers', 2, '/net/', 'noun', 'Net is important.', 'lưới rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-019', 'party', 'bữa tiệc', 'movers', 2, '/party/', 'noun', 'Party is important.', 'bữa tiệc rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-020', 'player', 'người chơi', 'movers', 2, '/player/', 'noun', 'Player is important.', 'người chơi rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-021', 'pool', 'bể bơi', 'movers', 2, '/pool/', 'noun', 'Pool is important.', 'bể bơi rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-022', 'practice', 'luyện tập', 'movers', 2, '/practice/', 'verb', 'Practice is important.', 'luyện tập rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-023', 'practise', 'luyện tập', 'movers', 2, '/practise/', 'verb', 'Practise is important.', 'luyện tập rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-024', 'present', 'quà tặng', 'movers', 2, '/present/', 'noun', 'Present is important.', 'quà tặng rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-025', 'ride', 'cưỡi / đi xe', 'movers', 2, '/ride/', 'verb', 'Ride is important.', 'cưỡi / đi xe rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-026', 'roller skates', 'giày patin', 'movers', 2, '/roller skates/', 'noun', 'Roller skates is important.', 'giày patin rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-027', 'roller skating', 'trượt patin', 'movers', 2, '/roller skating/', 'noun', 'Roller skating is important.', 'trượt patin rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-028', 'sail', 'chèo thuyền', 'movers', 2, '/sail/', 'verb', 'Sail is important.', 'chèo thuyền rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-029', 'score', 'điểm số', 'movers', 2, '/score/', 'noun', 'Score is important.', 'điểm số rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-030', 'skate', 'trượt patin', 'movers', 2, '/skate/', 'noun', 'Skate is important.', 'trượt patin rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-031', 'skip', 'nhảy dây', 'movers', 2, '/skip/', 'verb', 'Skip is important.', 'nhảy dây rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-032', 'sports centre', 'trung tâm thể thao', 'movers', 2, '/sports centre/', 'noun', 'Sports centre is important.', 'trung tâm thể thao rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-033', 'swim', 'bơi lội', 'movers', 2, '/swim/', 'verb', 'Swim is important.', 'bơi lội rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-034', 'text', 'tin nhắn', 'movers', 2, '/text/', 'noun', 'Text is important.', 'tin nhắn rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-035', 'towel', 'khăn tắm', 'movers', 2, '/towel/', 'noun', 'Towel is important.', 'khăn tắm rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-036', 'video', 'video', 'movers', 2, '/video/', 'noun', 'Video is important.', 'video rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-037', 'walk', 'đi bộ', 'movers', 2, '/walk/', 'noun', 'Walk is important.', 'đi bộ rất quan trọng.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== SPORTS_LEISURE | flyers (48 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-001', 'backpack', 'ba lô', 'flyers', 3, '/backpack/', 'noun', 'Backpack is important.', 'ba lô rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-002', 'cartoon', 'phim hoạt hình', 'flyers', 3, '/cartoon/', 'noun', 'Cartoon is important.', 'phim hoạt hình rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-003', 'channel', 'kênh truyền hình', 'flyers', 3, '/channel/', 'noun', 'Channel is important.', 'kênh truyền hình rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-004', 'chess', 'cờ vua', 'flyers', 3, '/chess/', 'noun', 'Chess is important.', 'cờ vua rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-005', 'collect', 'sưu tầm', 'flyers', 3, '/collect/', 'verb', 'Collect is important.', 'sưu tầm rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-006', 'concert', 'buổi hòa nhạc', 'flyers', 3, '/concert/', 'noun', 'Concert is important.', 'buổi hòa nhạc rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-007', 'diary', 'nhật ký', 'flyers', 3, '/diary/', 'noun', 'Diary is important.', 'nhật ký rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-008', 'drum', 'trống', 'flyers', 3, '/drum/', 'noun', 'Drum is important.', 'trống rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-009', 'festival', 'lễ hội', 'flyers', 3, '/festival/', 'noun', 'Festival is important.', 'lễ hội rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-010', 'flashlight', 'đèn pin', 'flyers', 3, '/flashlight/', 'noun', 'Flashlight is important.', 'đèn pin rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-011', 'golf', 'golf', 'flyers', 3, '/golf/', 'noun', 'Golf is important.', 'golf rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-012', 'hotel', 'khách sạn', 'flyers', 3, '/hotel/', 'noun', 'Hotel is important.', 'khách sạn rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-013', 'instrument', 'nhạc cụ', 'flyers', 3, '/instrument/', 'noun', 'Instrument is important.', 'nhạc cụ rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-014', 'invitation', 'lời mời', 'flyers', 3, '/invitation/', 'noun', 'Invitation is important.', 'lời mời rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-015', 'join', 'tham gia', 'flyers', 3, '/join/', 'verb', 'Join is important.', 'tham gia rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-016', 'magazine', 'tạp chí', 'flyers', 3, '/magazine/', 'noun', 'Magazine is important.', 'tạp chí rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-017', 'match', 'trận đấu', 'flyers', 3, '/match/', 'noun', 'Match is important.', 'trận đấu rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-018', 'meet', 'gặp gỡ', 'flyers', 3, '/meet/', 'verb', 'Meet is important.', 'gặp gỡ rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-019', 'member', 'thành viên', 'flyers', 3, '/member/', 'noun', 'Member is important.', 'thành viên rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-020', 'online', 'trực tuyến', 'flyers', 3, '/online/', 'adjective', 'Online is important.', 'trực tuyến rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-021', 'pop music', 'nhạc pop', 'flyers', 3, '/pop music/', 'noun', 'Pop music is important.', 'nhạc pop rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-022', 'prize', 'giải thưởng', 'flyers', 3, '/prize/', 'noun', 'Prize is important.', 'giải thưởng rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-023', 'programme', 'chương trình', 'flyers', 3, '/programme/', 'noun', 'Programme is important.', 'chương trình rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-024', 'puzzle', 'bài đố', 'flyers', 3, '/puzzle/', 'noun', 'Puzzle is important.', 'bài đố rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-025', 'pyramid', 'kim tự tháp', 'flyers', 3, '/pyramid/', 'noun', 'Pyramid is important.', 'kim tự tháp rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-026', 'quiz', 'câu đố', 'flyers', 3, '/quiz/', 'noun', 'Quiz is important.', 'câu đố rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-027', 'race', 'cuộc đua', 'flyers', 3, '/race/', 'noun', 'Race is important.', 'cuộc đua rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-028', 'rock music', 'nhạc rock', 'flyers', 3, '/rock music/', 'noun', 'Rock music is important.', 'nhạc rock rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-029', 'rucksack', 'ba lô', 'flyers', 3, '/rucksack/', 'noun', 'Rucksack is important.', 'ba lô rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-030', 'score', 'điểm số', 'flyers', 3, '/score/', 'noun', 'Score is important.', 'điểm số rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-031', 'ski', 'trượt tuyết', 'flyers', 3, '/ski/', 'noun', 'Ski is important.', 'trượt tuyết rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-032', 'sledge', 'xe trượt tuyết', 'flyers', 3, '/sledge/', 'noun', 'Sledge is important.', 'xe trượt tuyết rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-033', 'snowball', 'quả cầu tuyết', 'flyers', 3, '/snowball/', 'noun', 'Snowball is important.', 'quả cầu tuyết rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-034', 'snowboard', 'ván trượt tuyết', 'flyers', 3, '/snowboard/', 'noun', 'Snowboard is important.', 'ván trượt tuyết rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-035', 'snowboarding', 'trượt ván tuyết', 'flyers', 3, '/snowboarding/', 'noun', 'Snowboarding is important.', 'trượt ván tuyết rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-036', 'snowman', 'người tuyết', 'flyers', 3, '/snowman/', 'noun', 'Snowman is important.', 'người tuyết rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-037', 'stage', 'sân khấu', 'flyers', 3, '/stage/', 'noun', 'Stage is important.', 'sân khấu rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-038', 'suitcase', 'vali', 'flyers', 3, '/suitcase/', 'noun', 'Suitcase is important.', 'vali rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-039', 'swing', 'đu quay', 'flyers', 3, '/swing/', 'noun', 'Swing is important.', 'đu quay rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-040', 'team', 'đội', 'flyers', 3, '/team/', 'noun', 'Team is important.', 'đội rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-041', 'tent', 'lều trại', 'flyers', 3, '/tent/', 'noun', 'Tent is important.', 'lều trại rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-042', 'torch', 'đèn pin', 'flyers', 3, '/torch/', 'noun', 'Torch is important.', 'đèn pin rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-043', 'tune', 'giai điệu', 'flyers', 3, '/tune/', 'noun', 'Tune is important.', 'giai điệu rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-044', 'tyre', 'lốp xe', 'flyers', 3, '/tyre/', 'noun', 'Tyre is important.', 'lốp xe rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-045', 'umbrella', 'ô / dù', 'flyers', 3, '/umbrella/', 'noun', 'Umbrella is important.', 'ô / dù rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-046', 'violin', 'đàn violin', 'flyers', 3, '/violin/', 'noun', 'Violin is important.', 'đàn violin rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-047', 'volleyball', 'bóng chuyền', 'flyers', 3, '/volleyball/', 'noun', 'Volleyball is important.', 'bóng chuyền rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-048', 'winner', 'người chiến thắng', 'flyers', 3, '/winner/', 'noun', 'Winner is important.', 'người chiến thắng rất quan trọng.', 'english', 'flyers', 3, 'sports_leisure', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== TIME | starters (11 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-001', 'afternoon', 'buổi chiều', 'starters', 1, '/afternoon/', 'adverb', 'Afternoon is important.', 'buổi chiều rất quan trọng.', 'english', 'starters', 1, 'time', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-002', 'birthday', 'sinh nhật', 'starters', 1, '/birthday/', 'noun', 'Birthday is important.', 'sinh nhật rất quan trọng.', 'english', 'starters', 1, 'time', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-003', 'clock', 'đồng hồ', 'starters', 1, '/clock/', 'noun', 'Clock is important.', 'đồng hồ rất quan trọng.', 'english', 'starters', 1, 'time', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-004', 'day', 'ngày', 'starters', 1, '/day/', 'noun', 'Day is important.', 'ngày rất quan trọng.', 'english', 'starters', 1, 'time', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-005', 'evening', 'buổi tối', 'starters', 1, '/evening/', 'adverb', 'Evening is important.', 'buổi tối rất quan trọng.', 'english', 'starters', 1, 'time', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-006', 'in', 'vào (thời điểm)', 'starters', 1, '/in/', 'noun', 'In is important.', 'vào (thời điểm) rất quan trọng.', 'english', 'starters', 1, 'time', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-007', 'morning', 'buổi sáng', 'starters', 1, '/morning/', 'adverb', 'Morning is important.', 'buổi sáng rất quan trọng.', 'english', 'starters', 1, 'time', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-008', 'night', 'đêm', 'starters', 1, '/night/', 'adverb', 'Night is important.', 'đêm rất quan trọng.', 'english', 'starters', 1, 'time', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-009', 'today', 'hôm nay', 'starters', 1, '/today/', 'adverb', 'Today is important.', 'hôm nay rất quan trọng.', 'english', 'starters', 1, 'time', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-010', 'watch', 'xem / đồng hồ', 'starters', 1, '/watch/', 'verb', 'Watch is important.', 'xem / đồng hồ rất quan trọng.', 'english', 'starters', 1, 'time', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-011', 'year', 'năm', 'starters', 1, '/year/', 'noun', 'Year is important.', 'năm rất quan trọng.', 'english', 'starters', 1, 'time', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== TIME | movers (17 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-001', 'after', 'sau', 'movers', 2, '/after/', 'adverb', 'After is important.', 'sau rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-002', 'always', 'luôn luôn', 'movers', 2, '/always/', 'adverb', 'Always is important.', 'luôn luôn rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-003', 'before', 'trước', 'movers', 2, '/before/', 'adverb', 'Before is important.', 'trước rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-004', 'every', 'mỗi', 'movers', 2, '/every/', 'adverb', 'Every is important.', 'mỗi rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-005', 'never', 'không bao giờ', 'movers', 2, '/never/', 'adverb', 'Never is important.', 'không bao giờ rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-006', 'o''clock', 'giờ (đúng)', 'movers', 2, '/o''clock/', 'noun', 'O''clock is important.', 'giờ (đúng) rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-007', 'sometimes', 'đôi khi', 'movers', 2, '/sometimes/', 'adverb', 'Sometimes is important.', 'đôi khi rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-008', 'week', 'tuần', 'movers', 2, '/week/', 'noun', 'Week is important.', 'tuần rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-009', 'weekend', 'cuối tuần', 'movers', 2, '/weekend/', 'adverb', 'Weekend is important.', 'cuối tuần rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-010', 'yesterday', 'hôm qua', 'movers', 2, '/yesterday/', 'adverb', 'Yesterday is important.', 'hôm qua rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-011', 'Monday', 'Thứ Hai', 'movers', 2, '/Monday/', 'noun', 'Monday is important.', 'Thứ Hai rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-012', 'Tuesday', 'Thứ Ba', 'movers', 2, '/Tuesday/', 'noun', 'Tuesday is important.', 'Thứ Ba rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-013', 'Wednesday', 'Thứ Tư', 'movers', 2, '/Wednesday/', 'noun', 'Wednesday is important.', 'Thứ Tư rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-014', 'Thursday', 'Thứ Năm', 'movers', 2, '/Thursday/', 'noun', 'Thursday is important.', 'Thứ Năm rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-015', 'Friday', 'Thứ Sáu', 'movers', 2, '/Friday/', 'noun', 'Friday is important.', 'Thứ Sáu rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-016', 'Saturday', 'Thứ Bảy', 'movers', 2, '/Saturday/', 'noun', 'Saturday is important.', 'Thứ Bảy rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-017', 'Sunday', 'Chủ Nhật', 'movers', 2, '/Sunday/', 'noun', 'Sunday is important.', 'Chủ Nhật rất quan trọng.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== TIME | flyers (41 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-001', 'a.m.', 'buổi sáng (giờ)', 'flyers', 3, '/a.m./', 'noun', 'A.m. is important.', 'buổi sáng (giờ) rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-002', 'after', 'sau', 'flyers', 3, '/after/', 'adverb', 'After is important.', 'sau rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-003', 'ago', 'trước đây', 'flyers', 3, '/ago/', 'noun', 'Ago is important.', 'trước đây rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-004', 'autumn', 'mùa thu', 'flyers', 3, '/autumn/', 'noun', 'Autumn is important.', 'mùa thu rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-005', 'before', 'trước', 'flyers', 3, '/before/', 'adverb', 'Before is important.', 'trước rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-006', 'calendar', 'lịch', 'flyers', 3, '/calendar/', 'noun', 'Calendar is important.', 'lịch rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-007', 'century', 'thế kỷ', 'flyers', 3, '/century/', 'noun', 'Century is important.', 'thế kỷ rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-008', 'date', 'ngày tháng', 'flyers', 3, '/date/', 'noun', 'Date is important.', 'ngày tháng rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-009', 'early', 'sớm', 'flyers', 3, '/early/', 'adjective', 'Early is important.', 'sớm rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-010', 'end', 'kết thúc', 'flyers', 3, '/end/', 'noun', 'End is important.', 'kết thúc rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-011', 'fall', 'mùa thu (Mỹ)', 'flyers', 3, '/fall/', 'noun', 'Fall is important.', 'mùa thu (Mỹ) rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-012', 'future', 'tương lai', 'flyers', 3, '/future/', 'adjective', 'Future is important.', 'tương lai rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-013', 'hour', 'giờ', 'flyers', 3, '/hour/', 'noun', 'Hour is important.', 'giờ rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-014', 'how long', 'bao lâu', 'flyers', 3, '/how long/', 'noun', 'How long is important.', 'bao lâu rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-015', 'late', 'muộn', 'flyers', 3, '/late/', 'noun', 'Late is important.', 'muộn rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-016', 'later', 'muộn hơn', 'flyers', 3, '/later/', 'noun', 'Later is important.', 'muộn hơn rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-017', 'midday', 'giữa trưa', 'flyers', 3, '/midday/', 'adverb', 'Midday is important.', 'giữa trưa rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-018', 'midnight', 'nửa đêm', 'flyers', 3, '/midnight/', 'adverb', 'Midnight is important.', 'nửa đêm rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-019', 'minute', 'phút', 'flyers', 3, '/minute/', 'noun', 'Minute is important.', 'phút rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-020', 'month', 'tháng', 'flyers', 3, '/month/', 'noun', 'Month is important.', 'tháng rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-021', 'p.m.', 'buổi chiều (giờ)', 'flyers', 3, '/p.m./', 'noun', 'P.m. is important.', 'buổi chiều (giờ) rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-022', 'past', 'quá khứ / quá', 'flyers', 3, '/past/', 'noun', 'Past is important.', 'quá khứ / quá rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-023', 'quarter', 'một phần tư', 'flyers', 3, '/quarter/', 'noun', 'Quarter is important.', 'một phần tư rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-024', 'spring', 'mùa xuân', 'flyers', 3, '/spring/', 'noun', 'Spring is important.', 'mùa xuân rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-025', 'summer', 'mùa hè', 'flyers', 3, '/summer/', 'noun', 'Summer is important.', 'mùa hè rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-026', 'time', 'thời gian', 'flyers', 3, '/time/', 'noun', 'Time is important.', 'thời gian rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-027', 'tomorrow', 'ngày mai', 'flyers', 3, '/tomorrow/', 'adverb', 'Tomorrow is important.', 'ngày mai rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-028', 'tonight', 'tối nay', 'flyers', 3, '/tonight/', 'adverb', 'Tonight is important.', 'tối nay rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-029', 'winter', 'mùa đông', 'flyers', 3, '/winter/', 'noun', 'Winter is important.', 'mùa đông rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-030', 'January', 'Tháng Một', 'flyers', 3, '/January/', 'noun', 'January is important.', 'Tháng Một rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-031', 'February', 'Tháng Hai', 'flyers', 3, '/February/', 'noun', 'February is important.', 'Tháng Hai rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-032', 'March', 'Tháng Ba', 'flyers', 3, '/March/', 'noun', 'March is important.', 'Tháng Ba rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-033', 'April', 'Tháng Tư', 'flyers', 3, '/April/', 'noun', 'April is important.', 'Tháng Tư rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-034', 'May', 'Tháng Năm', 'flyers', 3, '/May/', 'noun', 'May is important.', 'Tháng Năm rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-035', 'June', 'Tháng Sáu', 'flyers', 3, '/June/', 'noun', 'June is important.', 'Tháng Sáu rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-036', 'July', 'Tháng Bảy', 'flyers', 3, '/July/', 'noun', 'July is important.', 'Tháng Bảy rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-037', 'August', 'Tháng Tám', 'flyers', 3, '/August/', 'noun', 'August is important.', 'Tháng Tám rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-038', 'September', 'Tháng Chín', 'flyers', 3, '/September/', 'noun', 'September is important.', 'Tháng Chín rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-039', 'October', 'Tháng Mười', 'flyers', 3, '/October/', 'noun', 'October is important.', 'Tháng Mười rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-040', 'November', 'Tháng Mười Một', 'flyers', 3, '/November/', 'noun', 'November is important.', 'Tháng Mười Một rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-041', 'December', 'Tháng Mười Hai', 'flyers', 3, '/December/', 'noun', 'December is important.', 'Tháng Mười Hai rất quan trọng.', 'english', 'flyers', 3, 'time', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== TOYS | starters (23 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-001', 'alien', 'người ngoài hành tinh', 'starters', 1, '/alien/', 'noun', 'Alien is important.', 'người ngoài hành tinh rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-002', 'ball', 'quả bóng', 'starters', 1, '/ball/', 'noun', 'Ball is important.', 'quả bóng rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-003', 'balloon', 'bóng bay', 'starters', 1, '/balloon/', 'noun', 'Balloon is important.', 'bóng bay rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-004', 'baseball', 'bóng chày', 'starters', 1, '/baseball/', 'noun', 'Baseball is important.', 'bóng chày rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-005', 'basketball', 'bóng rổ', 'starters', 1, '/basketball/', 'noun', 'Basketball is important.', 'bóng rổ rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-006', 'bike', 'xe đạp', 'starters', 1, '/bike/', 'noun', 'Bike is important.', 'xe đạp rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-007', 'board game', 'trò chơi cờ', 'starters', 1, '/board game/', 'noun', 'Board game is important.', 'trò chơi cờ rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-008', 'boat', 'thuyền', 'starters', 1, '/boat/', 'noun', 'Boat is important.', 'thuyền rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-009', 'car', 'ô tô đồ chơi', 'starters', 1, '/car/', 'noun', 'Car is important.', 'ô tô đồ chơi rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-010', 'doll', 'búp bê', 'starters', 1, '/doll/', 'noun', 'Doll is important.', 'búp bê rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-011', 'football', 'bóng đá', 'starters', 1, '/football/', 'noun', 'Football is important.', 'bóng đá rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-012', 'game', 'trò chơi', 'starters', 1, '/game/', 'noun', 'Game is important.', 'trò chơi rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-013', 'helicopter', 'máy bay trực thăng', 'starters', 1, '/helicopter/', 'noun', 'Helicopter is important.', 'máy bay trực thăng rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-014', 'lorry', 'xe tải', 'starters', 1, '/lorry/', 'noun', 'Lorry is important.', 'xe tải rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-015', 'monster', 'quái vật', 'starters', 1, '/monster/', 'noun', 'Monster is important.', 'quái vật rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-016', 'motorbike', 'xe máy', 'starters', 1, '/motorbike/', 'noun', 'Motorbike is important.', 'xe máy rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-017', 'plane', 'máy bay', 'starters', 1, '/plane/', 'noun', 'Plane is important.', 'máy bay rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-018', 'robot', 'người máy', 'starters', 1, '/robot/', 'noun', 'Robot is important.', 'người máy rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-019', 'soccer', 'bóng đá (Mỹ)', 'starters', 1, '/soccer/', 'noun', 'Soccer is important.', 'bóng đá (Mỹ) rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-020', 'teddy', 'gấu bông', 'starters', 1, '/teddy/', 'noun', 'Teddy is important.', 'gấu bông rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-021', 'toy', 'đồ chơi', 'starters', 1, '/toy/', 'noun', 'Toy is important.', 'đồ chơi rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-022', 'train', 'tàu hỏa', 'starters', 1, '/train/', 'noun', 'Train is important.', 'tàu hỏa rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-023', 'truck', 'xe tải', 'starters', 1, '/truck/', 'noun', 'Truck is important.', 'xe tải rất quan trọng.', 'english', 'starters', 1, 'toys', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== TOYS | movers (1 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-to-001', 'model', 'mô hình', 'movers', 2, '/model/', 'noun', 'Model is important.', 'mô hình rất quan trọng.', 'english', 'movers', 2, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== TRANSPORT | starters (15 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-001', 'bike', 'xe đạp', 'starters', 1, '/bike/', 'noun', 'Bike is important.', 'xe đạp rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-002', 'boat', 'thuyền', 'starters', 1, '/boat/', 'noun', 'Boat is important.', 'thuyền rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-003', 'bus', 'xe buýt', 'starters', 1, '/bus/', 'noun', 'Bus is important.', 'xe buýt rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-004', 'car', 'ô tô đồ chơi', 'starters', 1, '/car/', 'noun', 'Car is important.', 'ô tô đồ chơi rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-005', 'drive', 'lái xe', 'starters', 1, '/drive/', 'verb', 'Drive is important.', 'lái xe rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-006', 'fly', 'bay', 'starters', 1, '/fly/', 'verb', 'Fly is important.', 'bay rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-007', 'go', 'đi', 'starters', 1, '/go/', 'verb', 'Go is important.', 'đi rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-008', 'helicopter', 'máy bay trực thăng', 'starters', 1, '/helicopter/', 'noun', 'Helicopter is important.', 'máy bay trực thăng rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-009', 'lorry', 'xe tải', 'starters', 1, '/lorry/', 'noun', 'Lorry is important.', 'xe tải rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-010', 'plane', 'máy bay', 'starters', 1, '/plane/', 'noun', 'Plane is important.', 'máy bay rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-011', 'ride', 'cưỡi / đi xe', 'starters', 1, '/ride/', 'verb', 'Ride is important.', 'cưỡi / đi xe rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-012', 'run', 'chạy', 'starters', 1, '/run/', 'verb', 'Run is important.', 'chạy rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-013', 'ship', 'tàu thủy', 'starters', 1, '/ship/', 'noun', 'Ship is important.', 'tàu thủy rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-014', 'swim', 'bơi lội', 'starters', 1, '/swim/', 'verb', 'Swim is important.', 'bơi lội rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-015', 'truck', 'xe tải', 'starters', 1, '/truck/', 'noun', 'Truck is important.', 'xe tải rất quan trọng.', 'english', 'starters', 1, 'transport', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== TRANSPORT | movers (9 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-001', 'bus station', 'bến xe buýt', 'movers', 2, '/bus station/', 'noun', 'Bus station is important.', 'bến xe buýt rất quan trọng.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-002', 'bus stop', 'trạm xe buýt', 'movers', 2, '/bus stop/', 'noun', 'Bus stop is important.', 'trạm xe buýt rất quan trọng.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-003', 'drive', 'lái xe', 'movers', 2, '/drive/', 'verb', 'Drive is important.', 'lái xe rất quan trọng.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-004', 'driver', 'tài xế', 'movers', 2, '/driver/', 'noun', 'Driver is important.', 'tài xế rất quan trọng.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-005', 'ride', 'cưỡi / đi xe', 'movers', 2, '/ride/', 'verb', 'Ride is important.', 'cưỡi / đi xe rất quan trọng.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-006', 'station', 'nhà ga', 'movers', 2, '/station/', 'noun', 'Station is important.', 'nhà ga rất quan trọng.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-007', 'ticket', 'vé', 'movers', 2, '/ticket/', 'noun', 'Ticket is important.', 'vé rất quan trọng.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-008', 'tractor', 'máy cày', 'movers', 2, '/tractor/', 'noun', 'Tractor is important.', 'máy cày rất quan trọng.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-009', 'trip', 'chuyến đi', 'movers', 2, '/trip/', 'noun', 'Trip is important.', 'chuyến đi rất quan trọng.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== TRANSPORT | flyers (16 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-001', 'ambulance', 'xe cứu thương', 'flyers', 3, '/ambulance/', 'noun', 'Ambulance is important.', 'xe cứu thương rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-002', 'bicycle', 'xe đạp', 'flyers', 3, '/bicycle/', 'noun', 'Bicycle is important.', 'xe đạp rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-003', 'fire engine', 'xe cứu hỏa', 'flyers', 3, '/fire engine/', 'noun', 'Fire engine is important.', 'xe cứu hỏa rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-004', 'journey', 'hành trình', 'flyers', 3, '/journey/', 'noun', 'Journey is important.', 'hành trình rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-005', 'lift', 'thang máy / đi nhờ xe', 'flyers', 3, '/lift/', 'noun', 'Lift is important.', 'thang máy / đi nhờ xe rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-006', 'motorway', 'đường cao tốc', 'flyers', 3, '/motorway/', 'noun', 'Motorway is important.', 'đường cao tốc rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-007', 'passenger', 'hành khách', 'flyers', 3, '/passenger/', 'noun', 'Passenger is important.', 'hành khách rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-008', 'platform', 'sân ga', 'flyers', 3, '/platform/', 'noun', 'Platform is important.', 'sân ga rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-009', 'racing', 'đua xe', 'flyers', 3, '/racing/', 'noun', 'Racing is important.', 'đua xe rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-010', 'railway', 'đường sắt', 'flyers', 3, '/railway/', 'noun', 'Railway is important.', 'đường sắt rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-011', 'rocket', 'tên lửa', 'flyers', 3, '/rocket/', 'noun', 'Rocket is important.', 'tên lửa rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-012', 'spaceship', 'tàu vũ trụ', 'flyers', 3, '/spaceship/', 'noun', 'Spaceship is important.', 'tàu vũ trụ rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-013', 'taxi', 'xe taxi', 'flyers', 3, '/taxi/', 'noun', 'Taxi is important.', 'xe taxi rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-014', 'tour', 'tour du lịch', 'flyers', 3, '/tour/', 'noun', 'Tour is important.', 'tour du lịch rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-015', 'traffic', 'giao thông', 'flyers', 3, '/traffic/', 'noun', 'Traffic is important.', 'giao thông rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-016', 'wheel', 'bánh xe', 'flyers', 3, '/wheel/', 'noun', 'Wheel is important.', 'bánh xe rất quan trọng.', 'english', 'flyers', 3, 'transport', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== WEATHER | starters (1 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-we-001', 'sun', 'mặt trời', 'starters', 1, '/sun/', 'noun', 'Sun is important.', 'mặt trời rất quan trọng.', 'english', 'starters', 1, 'weather', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== WEATHER | movers (11 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-001', 'cloud', 'đám mây', 'movers', 2, '/cloud/', 'noun', 'Cloud is important.', 'đám mây rất quan trọng.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-002', 'cloudy', 'nhiều mây', 'movers', 2, '/cloudy/', 'adjective', 'Cloudy is important.', 'nhiều mây rất quan trọng.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-003', 'ice', 'băng', 'movers', 2, '/ice/', 'noun', 'Ice is important.', 'băng rất quan trọng.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-004', 'rain', 'mưa', 'movers', 2, '/rain/', 'noun', 'Rain is important.', 'mưa rất quan trọng.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-005', 'rainbow', 'cầu vồng', 'movers', 2, '/rainbow/', 'noun', 'Rainbow is important.', 'cầu vồng rất quan trọng.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-006', 'sky', 'bầu trời', 'movers', 2, '/sky/', 'noun', 'Sky is important.', 'bầu trời rất quan trọng.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-007', 'snow', 'tuyết', 'movers', 2, '/snow/', 'noun', 'Snow is important.', 'tuyết rất quan trọng.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-008', 'sunny', 'nắng', 'movers', 2, '/sunny/', 'adjective', 'Sunny is important.', 'nắng rất quan trọng.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-009', 'weather', 'thời tiết', 'movers', 2, '/weather/', 'noun', 'Weather is important.', 'thời tiết rất quan trọng.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-010', 'wind', 'gió', 'movers', 2, '/wind/', 'noun', 'Wind is important.', 'gió rất quan trọng.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-011', 'windy', 'có gió', 'movers', 2, '/windy/', 'adjective', 'Windy is important.', 'có gió rất quan trọng.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== WEATHER | flyers (3 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-we-001', 'fog', 'sương mù', 'flyers', 3, '/fog/', 'noun', 'Fog is important.', 'sương mù rất quan trọng.', 'english', 'flyers', 3, 'weather', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-we-002', 'foggy', 'có sương mù', 'flyers', 3, '/foggy/', 'adjective', 'Foggy is important.', 'có sương mù rất quan trọng.', 'english', 'flyers', 3, 'weather', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-we-003', 'storm', 'bão', 'flyers', 3, '/storm/', 'noun', 'Storm is important.', 'bão rất quan trọng.', 'english', 'flyers', 3, 'weather', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== WORK | movers (14 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-001', 'circus', 'rạp xiếc', 'movers', 2, '/circus/', 'noun', 'Circus is important.', 'rạp xiếc rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-002', 'clown', 'chú hề', 'movers', 2, '/clown/', 'noun', 'Clown is important.', 'chú hề rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-003', 'cook', 'đầu bếp', 'movers', 2, '/cook/', 'noun', 'Cook is important.', 'đầu bếp rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-004', 'dentist', 'nha sĩ', 'movers', 2, '/dentist/', 'noun', 'Dentist is important.', 'nha sĩ rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-005', 'doctor', 'bác sĩ', 'movers', 2, '/doctor/', 'noun', 'Doctor is important.', 'bác sĩ rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-006', 'driver', 'tài xế', 'movers', 2, '/driver/', 'noun', 'Driver is important.', 'tài xế rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-007', 'farmer', 'nông dân', 'movers', 2, '/farmer/', 'noun', 'Farmer is important.', 'nông dân rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-008', 'film star', 'ngôi sao điện ảnh', 'movers', 2, '/film star/', 'noun', 'Film star is important.', 'ngôi sao điện ảnh rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-009', 'hospital', 'bệnh viện', 'movers', 2, '/hospital/', 'noun', 'Hospital is important.', 'bệnh viện rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-010', 'nurse', 'y tá', 'movers', 2, '/nurse/', 'noun', 'Nurse is important.', 'y tá rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-011', 'pirate', 'cướp biển', 'movers', 2, '/pirate/', 'noun', 'Pirate is important.', 'cướp biển rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-012', 'pop star', 'ngôi sao nhạc pop', 'movers', 2, '/pop star/', 'noun', 'Pop star is important.', 'ngôi sao nhạc pop rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-013', 'teacher', 'giáo viên', 'movers', 2, '/teacher/', 'noun', 'Teacher is important.', 'giáo viên rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wk-014', 'work', 'làm việc', 'movers', 2, '/work/', 'verb', 'Work is important.', 'làm việc rất quan trọng.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== WORK | flyers (30 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-001', 'actor', 'diễn viên', 'flyers', 3, '/actor/', 'noun', 'Actor is important.', 'diễn viên rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-002', 'airport', 'sân bay', 'flyers', 3, '/airport/', 'noun', 'Airport is important.', 'sân bay rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-003', 'ambulance', 'xe cứu thương', 'flyers', 3, '/ambulance/', 'noun', 'Ambulance is important.', 'xe cứu thương rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-004', 'artist', 'nghệ sĩ', 'flyers', 3, '/artist/', 'noun', 'Artist is important.', 'nghệ sĩ rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-005', 'astronaut', 'phi hành gia', 'flyers', 3, '/astronaut/', 'noun', 'Astronaut is important.', 'phi hành gia rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-006', 'business', 'kinh doanh', 'flyers', 3, '/business/', 'noun', 'Business is important.', 'kinh doanh rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-007', 'businessman', 'doanh nhân', 'flyers', 3, '/businessman/', 'noun', 'Businessman is important.', 'doanh nhân rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-008', 'businesswoman', 'nữ doanh nhân', 'flyers', 3, '/businesswoman/', 'noun', 'Businesswoman is important.', 'nữ doanh nhân rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-009', 'designer', 'nhà thiết kế', 'flyers', 3, '/designer/', 'noun', 'Designer is important.', 'nhà thiết kế rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-010', 'engineer', 'kỹ sư', 'flyers', 3, '/engineer/', 'noun', 'Engineer is important.', 'kỹ sư rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-011', 'factory', 'nhà máy', 'flyers', 3, '/factory/', 'noun', 'Factory is important.', 'nhà máy rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-012', 'fire engine', 'xe cứu hỏa', 'flyers', 3, '/fire engine/', 'noun', 'Fire engine is important.', 'xe cứu hỏa rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-013', 'fire fighter', 'lính cứu hỏa', 'flyers', 3, '/fire fighter/', 'noun', 'Fire fighter is important.', 'lính cứu hỏa rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-014', 'job', 'công việc', 'flyers', 3, '/job/', 'noun', 'Job is important.', 'công việc rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-015', 'journalist', 'nhà báo', 'flyers', 3, '/journalist/', 'noun', 'Journalist is important.', 'nhà báo rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-016', 'manager', 'quản lý', 'flyers', 3, '/manager/', 'noun', 'Manager is important.', 'quản lý rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-017', 'mechanic', 'thợ cơ khí', 'flyers', 3, '/mechanic/', 'noun', 'Mechanic is important.', 'thợ cơ khí rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-018', 'meeting', 'cuộc họp', 'flyers', 3, '/meeting/', 'noun', 'Meeting is important.', 'cuộc họp rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-019', 'news', 'tin tức', 'flyers', 3, '/news/', 'noun', 'News is important.', 'tin tức rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-020', 'newspaper', 'báo', 'flyers', 3, '/newspaper/', 'noun', 'Newspaper is important.', 'báo rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-021', 'office', 'văn phòng', 'flyers', 3, '/office/', 'noun', 'Office is important.', 'văn phòng rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-022', 'photographer', 'nhiếp ảnh gia', 'flyers', 3, '/photographer/', 'noun', 'Photographer is important.', 'nhiếp ảnh gia rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-023', 'pilot', 'phi công', 'flyers', 3, '/pilot/', 'noun', 'Pilot is important.', 'phi công rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-024', 'police officer', 'cảnh sát', 'flyers', 3, '/police officer/', 'noun', 'Police officer is important.', 'cảnh sát rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-025', 'police station', 'đồn cảnh sát', 'flyers', 3, '/police station/', 'noun', 'Police station is important.', 'đồn cảnh sát rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-026', 'queen', 'nữ hoàng', 'flyers', 3, '/queen/', 'noun', 'Queen is important.', 'nữ hoàng rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-027', 'rocket', 'tên lửa', 'flyers', 3, '/rocket/', 'noun', 'Rocket is important.', 'tên lửa rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-028', 'singer', 'ca sĩ', 'flyers', 3, '/singer/', 'noun', 'Singer is important.', 'ca sĩ rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-029', 'taxi', 'xe taxi', 'flyers', 3, '/taxi/', 'noun', 'Taxi is important.', 'xe taxi rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wk-030', 'waiter', 'bồi bàn', 'flyers', 3, '/waiter/', 'noun', 'Waiter is important.', 'bồi bàn rất quan trọng.', 'english', 'flyers', 3, 'work', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== WORLD | starters (8 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-001', 'beach', 'bãi biển', 'starters', 1, '/beach/', 'noun', 'Beach is important.', 'bãi biển rất quan trọng.', 'english', 'starters', 1, 'world', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-002', 'sand', 'cát', 'starters', 1, '/sand/', 'noun', 'Sand is important.', 'cát rất quan trọng.', 'english', 'starters', 1, 'world', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-003', 'sea', 'biển', 'starters', 1, '/sea/', 'noun', 'Sea is important.', 'biển rất quan trọng.', 'english', 'starters', 1, 'world', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-004', 'shell', 'vỏ sò', 'starters', 1, '/shell/', 'noun', 'Shell is important.', 'vỏ sò rất quan trọng.', 'english', 'starters', 1, 'world', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-005', 'street', 'đường phố', 'starters', 1, '/street/', 'noun', 'Street is important.', 'đường phố rất quan trọng.', 'english', 'starters', 1, 'world', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-006', 'sun', 'mặt trời', 'starters', 1, '/sun/', 'noun', 'Sun is important.', 'mặt trời rất quan trọng.', 'english', 'starters', 1, 'world', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-007', 'tree', 'cây', 'starters', 1, '/tree/', 'noun', 'Tree is important.', 'cây rất quan trọng.', 'english', 'starters', 1, 'world', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-008', 'water', 'nước', 'starters', 1, '/water/', 'noun', 'Water is important.', 'nước rất quan trọng.', 'english', 'starters', 1, 'world', 'easy')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== WORLD | movers (24 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-001', 'building', 'tòa nhà', 'movers', 2, '/building/', 'noun', 'Building is important.', 'tòa nhà rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-002', 'city', 'thành phố', 'movers', 2, '/city/', 'noun', 'City is important.', 'thành phố rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-003', 'country', 'đất nước', 'movers', 2, '/country/', 'noun', 'Country is important.', 'đất nước rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-004', 'countryside', 'vùng nông thôn', 'movers', 2, '/countryside/', 'noun', 'Countryside is important.', 'vùng nông thôn rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-005', 'field', 'cánh đồng', 'movers', 2, '/field/', 'noun', 'Field is important.', 'cánh đồng rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-006', 'forest', 'rừng', 'movers', 2, '/forest/', 'noun', 'Forest is important.', 'rừng rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-007', 'grass', 'cỏ', 'movers', 2, '/grass/', 'noun', 'Grass is important.', 'cỏ rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-008', 'ground', 'mặt đất', 'movers', 2, '/ground/', 'noun', 'Ground is important.', 'mặt đất rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-009', 'island', 'hòn đảo', 'movers', 2, '/island/', 'noun', 'Island is important.', 'hòn đảo rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-010', 'lake', 'hồ', 'movers', 2, '/lake/', 'noun', 'Lake is important.', 'hồ rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-011', 'leaf', 'chiếc lá', 'movers', 2, '/leaf/', 'noun', 'Leaf is important.', 'chiếc lá rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-012', 'moon', 'mặt trăng', 'movers', 2, '/moon/', 'noun', 'Moon is important.', 'mặt trăng rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-013', 'mountain', 'núi', 'movers', 2, '/mountain/', 'noun', 'Mountain is important.', 'núi rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-014', 'plant', 'cây cối', 'movers', 2, '/plant/', 'noun', 'Plant is important.', 'cây cối rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-015', 'river', 'sông', 'movers', 2, '/river/', 'noun', 'River is important.', 'sông rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-016', 'road', 'con đường', 'movers', 2, '/road/', 'noun', 'Road is important.', 'con đường rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-017', 'rock', 'tảng đá', 'movers', 2, '/rock/', 'noun', 'Rock is important.', 'tảng đá rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-018', 'sky', 'bầu trời', 'movers', 2, '/sky/', 'noun', 'Sky is important.', 'bầu trời rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-019', 'star', 'ngôi sao', 'movers', 2, '/star/', 'noun', 'Star is important.', 'ngôi sao rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-020', 'town', 'thị trấn', 'movers', 2, '/town/', 'noun', 'Town is important.', 'thị trấn rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-021', 'village', 'làng', 'movers', 2, '/village/', 'noun', 'Village is important.', 'làng rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-022', 'waterfall', 'thác nước', 'movers', 2, '/waterfall/', 'noun', 'Waterfall is important.', 'thác nước rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-023', 'wave', 'con sóng', 'movers', 2, '/wave/', 'noun', 'Wave is important.', 'con sóng rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-024', 'world', 'thế giới', 'movers', 2, '/world/', 'noun', 'World is important.', 'thế giới rất quan trọng.', 'english', 'movers', 2, 'world', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;

-- ===== WORLD | flyers (21 words) =====
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-001', 'air', 'không khí', 'flyers', 3, '/air/', 'noun', 'Air is important.', 'không khí rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-002', 'bridge', 'cây cầu', 'flyers', 3, '/bridge/', 'noun', 'Bridge is important.', 'cây cầu rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-003', 'castle', 'lâu đài', 'flyers', 3, '/castle/', 'noun', 'Castle is important.', 'lâu đài rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-004', 'cave', 'hang động', 'flyers', 3, '/cave/', 'noun', 'Cave is important.', 'hang động rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-005', 'desert', 'sa mạc', 'flyers', 3, '/desert/', 'noun', 'Desert is important.', 'sa mạc rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-006', 'Earth', 'Trái Đất', 'flyers', 3, '/Earth/', 'noun', 'Earth is important.', 'Trái Đất rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-007', 'entrance', 'lối vào', 'flyers', 3, '/entrance/', 'noun', 'Entrance is important.', 'lối vào rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-008', 'environment', 'môi trường', 'flyers', 3, '/environment/', 'noun', 'Environment is important.', 'môi trường rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-009', 'exit', 'lối ra', 'flyers', 3, '/exit/', 'noun', 'Exit is important.', 'lối ra rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-010', 'fire', 'lửa', 'flyers', 3, '/fire/', 'noun', 'Fire is important.', 'lửa rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-011', 'future', 'tương lai', 'flyers', 3, '/future/', 'adjective', 'Future is important.', 'tương lai rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-012', 'hill', 'ngọn đồi', 'flyers', 3, '/hill/', 'noun', 'Hill is important.', 'ngọn đồi rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-013', 'land', 'đất liền', 'flyers', 3, '/land/', 'noun', 'Land is important.', 'đất liền rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-014', 'ocean', 'đại dương', 'flyers', 3, '/ocean/', 'noun', 'Ocean is important.', 'đại dương rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-015', 'planet', 'hành tinh', 'flyers', 3, '/planet/', 'noun', 'Planet is important.', 'hành tinh rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-016', 'pond', 'ao', 'flyers', 3, '/pond/', 'noun', 'Pond is important.', 'ao rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-017', 'space', 'vũ trụ', 'flyers', 3, '/space/', 'noun', 'Space is important.', 'vũ trụ rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-018', 'stone', 'đá', 'flyers', 3, '/stone/', 'noun', 'Stone is important.', 'đá rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-019', 'stream', 'suối', 'flyers', 3, '/stream/', 'noun', 'Stream is important.', 'suối rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-020', 'view', 'cảnh quan', 'flyers', 3, '/view/', 'noun', 'View is important.', 'cảnh quan rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-021', 'wood', 'rừng nhỏ', 'flyers', 3, '/wood/', 'noun', 'Wood is important.', 'rừng nhỏ rất quan trọng.', 'english', 'flyers', 3, 'world', 'hard')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;
