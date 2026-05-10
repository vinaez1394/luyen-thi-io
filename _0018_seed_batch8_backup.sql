
-- Cập nhật vocabulary_bank với 7 chủ đề: sports_leisure, time, toys, transport, weather, work, world_around_us
-- Group tag được set trùng với certificate (starters, movers, flyers)
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-001', 'badminton', '(nghĩa của badminton)', 'starters', 1, '/badminton/', 'noun', 'This is a badminton.', 'Đây là một badminton.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-002', 'ball', '(nghĩa của ball)', 'starters', 1, '/ball/', 'noun', 'This is a ball.', 'Đây là một ball.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-003', 'baseball', '(nghĩa của baseball)', 'starters', 1, '/baseball/', 'noun', 'This is a baseball.', 'Đây là một baseball.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-004', 'basketball', '(nghĩa của basketball)', 'starters', 1, '/basketball/', 'noun', 'This is a basketball.', 'Đây là một basketball.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-005', 'bat', '(nghĩa của bat)', 'starters', 1, '/bat/', 'noun', 'This is a bat.', 'Đây là một bat.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-006', 'beach', '(nghĩa của beach)', 'starters', 1, '/beach/', 'noun', 'This is a beach.', 'Đây là một beach.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-007', 'bike', '(nghĩa của bike)', 'starters', 1, '/bike/', 'noun', 'This is a bike.', 'Đây là một bike.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-008', 'boat', '(nghĩa của boat)', 'starters', 1, '/boat/', 'noun', 'This is a boat.', 'Đây là một boat.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-009', 'book', '(nghĩa của book)', 'starters', 1, '/book/', 'noun', 'This is a book.', 'Đây là một book.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-010', 'bounce', '(nghĩa của bounce)', 'starters', 1, '/bounce/', 'noun', 'This is a bounce.', 'Đây là một bounce.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-011', 'camera', '(nghĩa của camera)', 'starters', 1, '/camera/', 'noun', 'This is a camera.', 'Đây là một camera.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-012', 'catch', '(nghĩa của catch)', 'starters', 1, '/catch/', 'noun', 'This is a catch.', 'Đây là một catch.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-013', 'doll', '(nghĩa của doll)', 'starters', 1, '/doll/', 'noun', 'This is a doll.', 'Đây là một doll.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-014', 'draw', '(nghĩa của draw)', 'starters', 1, '/draw/', 'noun', 'This is a draw.', 'Đây là một draw.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-015', 'drawing', '(nghĩa của drawing)', 'starters', 1, '/drawing/', 'noun', 'This is a drawing.', 'Đây là một drawing.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-016', 'drive', '(nghĩa của drive)', 'starters', 1, '/drive/', 'noun', 'This is a drive.', 'Đây là một drive.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-017', 'enjoy', '(nghĩa của enjoy)', 'starters', 1, '/enjoy/', 'noun', 'This is a enjoy.', 'Đây là một enjoy.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-018', 'favourite', '(nghĩa của favourite)', 'starters', 1, '/favourite/', 'noun', 'This is a favourite.', 'Đây là một favourite.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-019', 'fishing', '(nghĩa của fishing)', 'starters', 1, '/fishing/', 'noun', 'This is a fishing.', 'Đây là một fishing.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-020', 'fly', '(nghĩa của fly)', 'starters', 1, '/fly/', 'noun', 'This is a fly.', 'Đây là một fly.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-021', 'football', '(nghĩa của football)', 'starters', 1, '/football/', 'noun', 'This is a football.', 'Đây là một football.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-022', 'game', '(nghĩa của game)', 'starters', 1, '/game/', 'noun', 'This is a game.', 'Đây là một game.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-023', 'guitar', '(nghĩa của guitar)', 'starters', 1, '/guitar/', 'noun', 'This is a guitar.', 'Đây là một guitar.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-024', 'hobby', '(nghĩa của hobby)', 'starters', 1, '/hobby/', 'noun', 'This is a hobby.', 'Đây là một hobby.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-025', 'hockey', '(nghĩa của hockey)', 'starters', 1, '/hockey/', 'noun', 'This is a hockey.', 'Đây là một hockey.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-026', 'jump', '(nghĩa của jump)', 'starters', 1, '/jump/', 'noun', 'This is a jump.', 'Đây là một jump.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-027', 'kick', '(nghĩa của kick)', 'starters', 1, '/kick/', 'noun', 'This is a kick.', 'Đây là một kick.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-028', 'kite', '(nghĩa của kite)', 'starters', 1, '/kite/', 'noun', 'This is a kite.', 'Đây là một kite.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-029', 'listen', '(nghĩa của listen)', 'starters', 1, '/listen/', 'noun', 'This is a listen.', 'Đây là một listen.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-030', 'music', '(nghĩa của music)', 'starters', 1, '/music/', 'noun', 'This is a music.', 'Đây là một music.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-031', 'photo', '(nghĩa của photo)', 'starters', 1, '/photo/', 'noun', 'This is a photo.', 'Đây là một photo.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-032', 'piano', '(nghĩa của piano)', 'starters', 1, '/piano/', 'noun', 'This is a piano.', 'Đây là một piano.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-033', 'picture', '(nghĩa của picture)', 'starters', 1, '/picture/', 'noun', 'This is a picture.', 'Đây là một picture.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-034', 'play', '(nghĩa của play)', 'starters', 1, '/play/', 'noun', 'This is a play.', 'Đây là một play.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-035', 'radio', '(nghĩa của radio)', 'starters', 1, '/radio/', 'noun', 'This is a radio.', 'Đây là một radio.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-036', 'read', '(nghĩa của read)', 'starters', 1, '/read/', 'noun', 'This is a read.', 'Đây là một read.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-037', 'ride', '(nghĩa của ride)', 'starters', 1, '/ride/', 'noun', 'This is a ride.', 'Đây là một ride.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-038', 'run', '(nghĩa của run)', 'starters', 1, '/run/', 'noun', 'This is a run.', 'Đây là một run.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-039', 'sing', '(nghĩa của sing)', 'starters', 1, '/sing/', 'noun', 'This is a sing.', 'Đây là một sing.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-040', 'skateboard', '(nghĩa của skateboard)', 'starters', 1, '/skateboard/', 'noun', 'This is a skateboard.', 'Đây là một skateboard.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-041', 'skateboarding', '(nghĩa của skateboarding)', 'starters', 1, '/skateboarding/', 'noun', 'This is a skateboarding.', 'Đây là một skateboarding.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-042', 'soccer', '(nghĩa của soccer)', 'starters', 1, '/soccer/', 'noun', 'This is a soccer.', 'Đây là một soccer.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-043', 'song', '(nghĩa của song)', 'starters', 1, '/song/', 'noun', 'This is a song.', 'Đây là một song.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-044', 'sport', '(nghĩa của sport)', 'starters', 1, '/sport/', 'noun', 'This is a sport.', 'Đây là một sport.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-045', 'story', '(nghĩa của story)', 'starters', 1, '/story/', 'noun', 'This is a story.', 'Đây là một story.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-046', 'swim', '(nghĩa của swim)', 'starters', 1, '/swim/', 'noun', 'This is a swim.', 'Đây là một swim.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-047', 'table tennis', '(nghĩa của table tennis)', 'starters', 1, '/table tennis/', 'noun', 'This is a table tennis.', 'Đây là một table tennis.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-048', 'take a photo', '(nghĩa của take a photo)', 'starters', 1, '/take a photo/', 'noun', 'This is a take a photo.', 'Đây là một take a photo.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-049', 'television', '(nghĩa của television)', 'starters', 1, '/television/', 'noun', 'This is a television.', 'Đây là một television.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-050', 'tennis', '(nghĩa của tennis)', 'starters', 1, '/tennis/', 'noun', 'This is a tennis.', 'Đây là một tennis.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-051', 'tennis racket', '(nghĩa của tennis racket)', 'starters', 1, '/tennis racket/', 'noun', 'This is a tennis racket.', 'Đây là một tennis racket.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-052', 'throw', '(nghĩa của throw)', 'starters', 1, '/throw/', 'noun', 'This is a throw.', 'Đây là một throw.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-053', 'toy', '(nghĩa của toy)', 'starters', 1, '/toy/', 'noun', 'This is a toy.', 'Đây là một toy.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-054', 'TV', '(nghĩa của TV)', 'starters', 1, '/TV/', 'noun', 'This is a TV.', 'Đây là một TV.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-055', 'walk', '(nghĩa của walk)', 'starters', 1, '/walk/', 'noun', 'This is a walk.', 'Đây là một walk.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sl-056', 'watch', '(nghĩa của watch)', 'starters', 1, '/watch/', 'noun', 'This is a watch.', 'Đây là một watch.', 'english', 'starters', 1, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-001', 'band', '(nghĩa của band)', 'movers', 2, '/band/', 'noun', 'This is a band.', 'Đây là một band.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-002', 'CD', '(nghĩa của CD)', 'movers', 2, '/CD/', 'noun', 'This is a CD.', 'Đây là một CD.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-003', 'cinema', '(nghĩa của cinema)', 'movers', 2, '/cinema/', 'noun', 'This is a cinema.', 'Đây là một cinema.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-004', 'comic', '(nghĩa của comic)', 'movers', 2, '/comic/', 'noun', 'This is a comic.', 'Đây là một comic.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-005', 'comic book', '(nghĩa của comic book)', 'movers', 2, '/comic book/', 'noun', 'This is a comic book.', 'Đây là một comic book.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-006', 'dance', '(nghĩa của dance)', 'movers', 2, '/dance/', 'noun', 'This is a dance.', 'Đây là một dance.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-007', 'drive', '(nghĩa của drive)', 'movers', 2, '/drive/', 'noun', 'This is a drive.', 'Đây là một drive.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-008', 'DVD', '(nghĩa của DVD)', 'movers', 2, '/DVD/', 'noun', 'This is a DVD.', 'Đây là một DVD.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-009', 'email', '(nghĩa của email)', 'movers', 2, '/email/', 'noun', 'This is a email.', 'Đây là một email.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-010', 'film', '(nghĩa của film)', 'movers', 2, '/film/', 'noun', 'This is a film.', 'Đây là một film.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-011', 'fish', '(nghĩa của fish)', 'movers', 2, '/fish/', 'noun', 'This is a fish.', 'Đây là một fish.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-012', 'go shopping', '(nghĩa của go shopping)', 'movers', 2, '/go shopping/', 'noun', 'This is a go shopping.', 'Đây là một go shopping.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-013', 'goal', '(nghĩa của goal)', 'movers', 2, '/goal/', 'noun', 'This is a goal.', 'Đây là một goal.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-014', 'holiday', '(nghĩa của holiday)', 'movers', 2, '/holiday/', 'noun', 'This is a holiday.', 'Đây là một holiday.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-015', 'hop', '(nghĩa của hop)', 'movers', 2, '/hop/', 'noun', 'This is a hop.', 'Đây là một hop.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-016', 'ice skates', '(nghĩa của ice skates)', 'movers', 2, '/ice skates/', 'noun', 'This is a ice skates.', 'Đây là một ice skates.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-017', 'ice skating', '(nghĩa của ice skating)', 'movers', 2, '/ice skating/', 'noun', 'This is a ice skating.', 'Đây là một ice skating.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-018', 'kick', '(nghĩa của kick)', 'movers', 2, '/kick/', 'noun', 'This is a kick.', 'Đây là một kick.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-019', 'movie', '(nghĩa của movie)', 'movers', 2, '/movie/', 'noun', 'This is a movie.', 'Đây là một movie.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-020', 'net', '(nghĩa của net)', 'movers', 2, '/net/', 'noun', 'This is a net.', 'Đây là một net.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-021', 'party', '(nghĩa của party)', 'movers', 2, '/party/', 'noun', 'This is a party.', 'Đây là một party.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-022', 'player', '(nghĩa của player)', 'movers', 2, '/player/', 'noun', 'This is a player.', 'Đây là một player.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-023', 'pool', '(nghĩa của pool)', 'movers', 2, '/pool/', 'noun', 'This is a pool.', 'Đây là một pool.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-024', 'practice', '(nghĩa của practice)', 'movers', 2, '/practice/', 'noun', 'This is a practice.', 'Đây là một practice.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-025', 'practise', '(nghĩa của practise)', 'movers', 2, '/practise/', 'noun', 'This is a practise.', 'Đây là một practise.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-026', 'present', '(nghĩa của present)', 'movers', 2, '/present/', 'noun', 'This is a present.', 'Đây là một present.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-027', 'ride', '(nghĩa của ride)', 'movers', 2, '/ride/', 'noun', 'This is a ride.', 'Đây là một ride.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-028', 'roller skates', '(nghĩa của roller skates)', 'movers', 2, '/roller skates/', 'noun', 'This is a roller skates.', 'Đây là một roller skates.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-029', 'roller skating', '(nghĩa của roller skating)', 'movers', 2, '/roller skating/', 'noun', 'This is a roller skating.', 'Đây là một roller skating.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-030', 'sail', '(nghĩa của sail)', 'movers', 2, '/sail/', 'noun', 'This is a sail.', 'Đây là một sail.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-031', 'score', '(nghĩa của score)', 'movers', 2, '/score/', 'noun', 'This is a score.', 'Đây là một score.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-032', 'skate', '(nghĩa của skate)', 'movers', 2, '/skate/', 'noun', 'This is a skate.', 'Đây là một skate.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-033', 'skip', '(nghĩa của skip)', 'movers', 2, '/skip/', 'noun', 'This is a skip.', 'Đây là một skip.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-034', 'sports centre', '(nghĩa của sports centre)', 'movers', 2, '/sports centre/', 'noun', 'This is a sports centre.', 'Đây là một sports centre.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-035', 'swim', '(nghĩa của swim)', 'movers', 2, '/swim/', 'noun', 'This is a swim.', 'Đây là một swim.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-036', 'swimming pool', '(nghĩa của swimming pool)', 'movers', 2, '/swimming pool/', 'noun', 'This is a swimming pool.', 'Đây là một swimming pool.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-037', 'text', '(nghĩa của text)', 'movers', 2, '/text/', 'noun', 'This is a text.', 'Đây là một text.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-038', 'towel', '(nghĩa của towel)', 'movers', 2, '/towel/', 'noun', 'This is a towel.', 'Đây là một towel.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-039', 'video', '(nghĩa của video)', 'movers', 2, '/video/', 'noun', 'This is a video.', 'Đây là một video.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sl-040', 'walk', '(nghĩa của walk)', 'movers', 2, '/walk/', 'noun', 'This is a walk.', 'Đây là một walk.', 'english', 'movers', 2, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-001', 'backpack', '(nghĩa của backpack)', 'flyers', 3, '/backpack/', 'noun', 'This is a backpack.', 'Đây là một backpack.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-002', 'cartoon', '(nghĩa của cartoon)', 'flyers', 3, '/cartoon/', 'noun', 'This is a cartoon.', 'Đây là một cartoon.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-003', 'channel', '(nghĩa của channel)', 'flyers', 3, '/channel/', 'noun', 'This is a channel.', 'Đây là một channel.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-004', 'chess', '(nghĩa của chess)', 'flyers', 3, '/chess/', 'noun', 'This is a chess.', 'Đây là một chess.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-005', 'collect', '(nghĩa của collect)', 'flyers', 3, '/collect/', 'noun', 'This is a collect.', 'Đây là một collect.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-006', 'concert', '(nghĩa của concert)', 'flyers', 3, '/concert/', 'noun', 'This is a concert.', 'Đây là một concert.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-007', 'diary', '(nghĩa của diary)', 'flyers', 3, '/diary/', 'noun', 'This is a diary.', 'Đây là một diary.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-008', 'drum', '(nghĩa của drum)', 'flyers', 3, '/drum/', 'noun', 'This is a drum.', 'Đây là một drum.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-009', 'festival', '(nghĩa của festival)', 'flyers', 3, '/festival/', 'noun', 'This is a festival.', 'Đây là một festival.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-010', 'flashlight', '(nghĩa của flashlight)', 'flyers', 3, '/flashlight/', 'noun', 'This is a flashlight.', 'Đây là một flashlight.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-011', 'golf', '(nghĩa của golf)', 'flyers', 3, '/golf/', 'noun', 'This is a golf.', 'Đây là một golf.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-012', 'hotel', '(nghĩa của hotel)', 'flyers', 3, '/hotel/', 'noun', 'This is a hotel.', 'Đây là một hotel.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-013', 'instrument', '(nghĩa của instrument)', 'flyers', 3, '/instrument/', 'noun', 'This is a instrument.', 'Đây là một instrument.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-014', 'invitation', '(nghĩa của invitation)', 'flyers', 3, '/invitation/', 'noun', 'This is a invitation.', 'Đây là một invitation.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-015', 'join', '(nghĩa của join)', 'flyers', 3, '/join/', 'noun', 'This is a join.', 'Đây là một join.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-016', 'magazine', '(nghĩa của magazine)', 'flyers', 3, '/magazine/', 'noun', 'This is a magazine.', 'Đây là một magazine.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-017', 'match', '(nghĩa của match)', 'flyers', 3, '/match/', 'noun', 'This is a match.', 'Đây là một match.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-018', 'meet', '(nghĩa của meet)', 'flyers', 3, '/meet/', 'noun', 'This is a meet.', 'Đây là một meet.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-019', 'member', '(nghĩa của member)', 'flyers', 3, '/member/', 'noun', 'This is a member.', 'Đây là một member.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-020', 'online', '(nghĩa của online)', 'flyers', 3, '/online/', 'noun', 'This is a online.', 'Đây là một online.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-021', 'pop music', '(nghĩa của pop music)', 'flyers', 3, '/pop music/', 'noun', 'This is a pop music.', 'Đây là một pop music.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-022', 'prize', '(nghĩa của prize)', 'flyers', 3, '/prize/', 'noun', 'This is a prize.', 'Đây là một prize.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-023', 'programme', '(nghĩa của programme)', 'flyers', 3, '/programme/', 'noun', 'This is a programme.', 'Đây là một programme.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-024', 'puzzle', '(nghĩa của puzzle)', 'flyers', 3, '/puzzle/', 'noun', 'This is a puzzle.', 'Đây là một puzzle.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-025', 'pyramid', '(nghĩa của pyramid)', 'flyers', 3, '/pyramid/', 'noun', 'This is a pyramid.', 'Đây là một pyramid.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-026', 'quiz', '(nghĩa của quiz)', 'flyers', 3, '/quiz/', 'noun', 'This is a quiz.', 'Đây là một quiz.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-027', 'race', '(nghĩa của race)', 'flyers', 3, '/race/', 'noun', 'This is a race.', 'Đây là một race.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-028', 'rock music', '(nghĩa của rock music)', 'flyers', 3, '/rock music/', 'noun', 'This is a rock music.', 'Đây là một rock music.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-029', 'rucksack', '(nghĩa của rucksack)', 'flyers', 3, '/rucksack/', 'noun', 'This is a rucksack.', 'Đây là một rucksack.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-030', 'score', '(nghĩa của score)', 'flyers', 3, '/score/', 'noun', 'This is a score.', 'Đây là một score.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-031', 'ski', '(nghĩa của ski)', 'flyers', 3, '/ski/', 'noun', 'This is a ski.', 'Đây là một ski.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-032', 'sledge', '(nghĩa của sledge)', 'flyers', 3, '/sledge/', 'noun', 'This is a sledge.', 'Đây là một sledge.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-033', 'snowball', '(nghĩa của snowball)', 'flyers', 3, '/snowball/', 'noun', 'This is a snowball.', 'Đây là một snowball.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-034', 'snowboard', '(nghĩa của snowboard)', 'flyers', 3, '/snowboard/', 'noun', 'This is a snowboard.', 'Đây là một snowboard.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-035', 'snowboarding', '(nghĩa của snowboarding)', 'flyers', 3, '/snowboarding/', 'noun', 'This is a snowboarding.', 'Đây là một snowboarding.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-036', 'snowman', '(nghĩa của snowman)', 'flyers', 3, '/snowman/', 'noun', 'This is a snowman.', 'Đây là một snowman.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-037', 'stage', '(nghĩa của stage)', 'flyers', 3, '/stage/', 'noun', 'This is a stage.', 'Đây là một stage.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-038', 'suitcase', '(nghĩa của suitcase)', 'flyers', 3, '/suitcase/', 'noun', 'This is a suitcase.', 'Đây là một suitcase.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-039', 'swing', '(nghĩa của swing)', 'flyers', 3, '/swing/', 'noun', 'This is a swing.', 'Đây là một swing.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-040', 'team', '(nghĩa của team)', 'flyers', 3, '/team/', 'noun', 'This is a team.', 'Đây là một team.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-041', 'tent', '(nghĩa của tent)', 'flyers', 3, '/tent/', 'noun', 'This is a tent.', 'Đây là một tent.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-042', 'torch', '(nghĩa của torch)', 'flyers', 3, '/torch/', 'noun', 'This is a torch.', 'Đây là một torch.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-043', 'tune', '(nghĩa của tune)', 'flyers', 3, '/tune/', 'noun', 'This is a tune.', 'Đây là một tune.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-044', 'tyre', '(nghĩa của tyre)', 'flyers', 3, '/tyre/', 'noun', 'This is a tyre.', 'Đây là một tyre.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-045', 'umbrella', '(nghĩa của umbrella)', 'flyers', 3, '/umbrella/', 'noun', 'This is a umbrella.', 'Đây là một umbrella.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-046', 'violin', '(nghĩa của violin)', 'flyers', 3, '/violin/', 'noun', 'This is a violin.', 'Đây là một violin.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-047', 'volleyball', '(nghĩa của volleyball)', 'flyers', 3, '/volleyball/', 'noun', 'This is a volleyball.', 'Đây là một volleyball.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sl-048', 'winner', '(nghĩa của winner)', 'flyers', 3, '/winner/', 'noun', 'This is a winner.', 'Đây là một winner.', 'english', 'flyers', 3, 'sports_leisure', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-001', 'afternoon', '(nghĩa của afternoon)', 'starters', 1, '/afternoon/', 'noun', 'This is a afternoon.', 'Đây là một afternoon.', 'english', 'starters', 1, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-002', 'birthday', '(nghĩa của birthday)', 'starters', 1, '/birthday/', 'noun', 'This is a birthday.', 'Đây là một birthday.', 'english', 'starters', 1, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-003', 'clock', '(nghĩa của clock)', 'starters', 1, '/clock/', 'noun', 'This is a clock.', 'Đây là một clock.', 'english', 'starters', 1, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-004', 'day', '(nghĩa của day)', 'starters', 1, '/day/', 'noun', 'This is a day.', 'Đây là một day.', 'english', 'starters', 1, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-005', 'evening', '(nghĩa của evening)', 'starters', 1, '/evening/', 'noun', 'This is a evening.', 'Đây là một evening.', 'english', 'starters', 1, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-006', 'in', '(nghĩa của in)', 'starters', 1, '/in/', 'noun', 'This is a in.', 'Đây là một in.', 'english', 'starters', 1, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-007', 'morning', '(nghĩa của morning)', 'starters', 1, '/morning/', 'noun', 'This is a morning.', 'Đây là một morning.', 'english', 'starters', 1, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-008', 'night', '(nghĩa của night)', 'starters', 1, '/night/', 'noun', 'This is a night.', 'Đây là một night.', 'english', 'starters', 1, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-009', 'today', '(nghĩa của today)', 'starters', 1, '/today/', 'noun', 'This is a today.', 'Đây là một today.', 'english', 'starters', 1, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-010', 'watch', '(nghĩa của watch)', 'starters', 1, '/watch/', 'noun', 'This is a watch.', 'Đây là một watch.', 'english', 'starters', 1, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ti-011', 'year', '(nghĩa của year)', 'starters', 1, '/year/', 'noun', 'This is a year.', 'Đây là một year.', 'english', 'starters', 1, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-001', 'after', '(nghĩa của after)', 'movers', 2, '/after/', 'noun', 'This is a after.', 'Đây là một after.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-002', 'always', '(nghĩa của always)', 'movers', 2, '/always/', 'noun', 'This is a always.', 'Đây là một always.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-003', 'before', '(nghĩa của before)', 'movers', 2, '/before/', 'noun', 'This is a before.', 'Đây là một before.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-004', 'every', '(nghĩa của every)', 'movers', 2, '/every/', 'noun', 'This is a every.', 'Đây là một every.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-005', 'never', '(nghĩa của never)', 'movers', 2, '/never/', 'noun', 'This is a never.', 'Đây là một never.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-006', 'o''clock', '(nghĩa của o''clock)', 'movers', 2, '/o''clock/', 'noun', 'This is a o''clock.', 'Đây là một o''clock.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-007', 'sometimes', '(nghĩa của sometimes)', 'movers', 2, '/sometimes/', 'noun', 'This is a sometimes.', 'Đây là một sometimes.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-008', 'week', '(nghĩa của week)', 'movers', 2, '/week/', 'noun', 'This is a week.', 'Đây là một week.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-009', 'weekend', '(nghĩa của weekend)', 'movers', 2, '/weekend/', 'noun', 'This is a weekend.', 'Đây là một weekend.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ti-010', 'yesterday', '(nghĩa của yesterday)', 'movers', 2, '/yesterday/', 'noun', 'This is a yesterday.', 'Đây là một yesterday.', 'english', 'movers', 2, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-001', 'Monday', '(nghĩa của Monday)', 'flyers', 3, '/Monday/', 'noun', 'This is a Monday.', 'Đây là một Monday.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-002', 'Tuesday', '(nghĩa của Tuesday)', 'flyers', 3, '/Tuesday/', 'noun', 'This is a Tuesday.', 'Đây là một Tuesday.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-003', 'Wednesday', '(nghĩa của Wednesday)', 'flyers', 3, '/Wednesday/', 'noun', 'This is a Wednesday.', 'Đây là một Wednesday.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-004', 'Thursday', '(nghĩa của Thursday)', 'flyers', 3, '/Thursday/', 'noun', 'This is a Thursday.', 'Đây là một Thursday.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-005', 'Friday', '(nghĩa của Friday)', 'flyers', 3, '/Friday/', 'noun', 'This is a Friday.', 'Đây là một Friday.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-006', 'Saturday', '(nghĩa của Saturday)', 'flyers', 3, '/Saturday/', 'noun', 'This is a Saturday.', 'Đây là một Saturday.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-007', 'Sunday', '(nghĩa của Sunday)', 'flyers', 3, '/Sunday/', 'noun', 'This is a Sunday.', 'Đây là một Sunday.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-008', 'a.m.', '(nghĩa của a.m.)', 'flyers', 3, '/a.m./', 'noun', 'This is a a.m..', 'Đây là một a.m..', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-009', 'after', '(nghĩa của after)', 'flyers', 3, '/after/', 'noun', 'This is a after.', 'Đây là một after.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-010', 'ago', '(nghĩa của ago)', 'flyers', 3, '/ago/', 'noun', 'This is a ago.', 'Đây là một ago.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-011', 'autumn', '(nghĩa của autumn)', 'flyers', 3, '/autumn/', 'noun', 'This is a autumn.', 'Đây là một autumn.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-012', 'before', '(nghĩa của before)', 'flyers', 3, '/before/', 'noun', 'This is a before.', 'Đây là một before.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-013', 'calendar', '(nghĩa của calendar)', 'flyers', 3, '/calendar/', 'noun', 'This is a calendar.', 'Đây là một calendar.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-014', 'century', '(nghĩa của century)', 'flyers', 3, '/century/', 'noun', 'This is a century.', 'Đây là một century.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-015', 'date', '(nghĩa của date)', 'flyers', 3, '/date/', 'noun', 'This is a date.', 'Đây là một date.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-016', 'early', '(nghĩa của early)', 'flyers', 3, '/early/', 'noun', 'This is a early.', 'Đây là một early.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-017', 'end', '(nghĩa của end)', 'flyers', 3, '/end/', 'noun', 'This is a end.', 'Đây là một end.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-018', 'fall', '(nghĩa của fall)', 'flyers', 3, '/fall/', 'noun', 'This is a fall.', 'Đây là một fall.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-019', 'future', '(nghĩa của future)', 'flyers', 3, '/future/', 'noun', 'This is a future.', 'Đây là một future.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-020', 'hour', '(nghĩa của hour)', 'flyers', 3, '/hour/', 'noun', 'This is a hour.', 'Đây là một hour.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-021', 'how long', '(nghĩa của how long)', 'flyers', 3, '/how long/', 'noun', 'This is a how long.', 'Đây là một how long.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-022', 'late', '(nghĩa của late)', 'flyers', 3, '/late/', 'noun', 'This is a late.', 'Đây là một late.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-023', 'later', '(nghĩa của later)', 'flyers', 3, '/later/', 'noun', 'This is a later.', 'Đây là một later.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-024', 'midday', '(nghĩa của midday)', 'flyers', 3, '/midday/', 'noun', 'This is a midday.', 'Đây là một midday.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-025', 'midnight', '(nghĩa của midnight)', 'flyers', 3, '/midnight/', 'noun', 'This is a midnight.', 'Đây là một midnight.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-026', 'minute', '(nghĩa của minute)', 'flyers', 3, '/minute/', 'noun', 'This is a minute.', 'Đây là một minute.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-027', 'month', '(nghĩa của month)', 'flyers', 3, '/month/', 'noun', 'This is a month.', 'Đây là một month.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-028', 'p.m.', '(nghĩa của p.m.)', 'flyers', 3, '/p.m./', 'noun', 'This is a p.m..', 'Đây là một p.m..', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-029', 'past', '(nghĩa của past)', 'flyers', 3, '/past/', 'noun', 'This is a past.', 'Đây là một past.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-030', 'quarter', '(nghĩa của quarter)', 'flyers', 3, '/quarter/', 'noun', 'This is a quarter.', 'Đây là một quarter.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-031', 'spring', '(nghĩa của spring)', 'flyers', 3, '/spring/', 'noun', 'This is a spring.', 'Đây là một spring.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-032', 'summer', '(nghĩa của summer)', 'flyers', 3, '/summer/', 'noun', 'This is a summer.', 'Đây là một summer.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-033', 'time', '(nghĩa của time)', 'flyers', 3, '/time/', 'noun', 'This is a time.', 'Đây là một time.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-034', 'tomorrow', '(nghĩa của tomorrow)', 'flyers', 3, '/tomorrow/', 'noun', 'This is a tomorrow.', 'Đây là một tomorrow.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-035', 'tonight', '(nghĩa của tonight)', 'flyers', 3, '/tonight/', 'noun', 'This is a tonight.', 'Đây là một tonight.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-036', 'winter', '(nghĩa của winter)', 'flyers', 3, '/winter/', 'noun', 'This is a winter.', 'Đây là một winter.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-037', 'January', '(nghĩa của January)', 'flyers', 3, '/January/', 'noun', 'This is a January.', 'Đây là một January.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-038', 'February', '(nghĩa của February)', 'flyers', 3, '/February/', 'noun', 'This is a February.', 'Đây là một February.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-039', 'March', '(nghĩa của March)', 'flyers', 3, '/March/', 'noun', 'This is a March.', 'Đây là một March.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-040', 'April', '(nghĩa của April)', 'flyers', 3, '/April/', 'noun', 'This is a April.', 'Đây là một April.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-041', 'May', '(nghĩa của May)', 'flyers', 3, '/May/', 'noun', 'This is a May.', 'Đây là một May.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-042', 'June', '(nghĩa của June)', 'flyers', 3, '/June/', 'noun', 'This is a June.', 'Đây là một June.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-043', 'July', '(nghĩa của July)', 'flyers', 3, '/July/', 'noun', 'This is a July.', 'Đây là một July.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-044', 'August', '(nghĩa của August)', 'flyers', 3, '/August/', 'noun', 'This is a August.', 'Đây là một August.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-045', 'September', '(nghĩa của September)', 'flyers', 3, '/September/', 'noun', 'This is a September.', 'Đây là một September.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-046', 'October', '(nghĩa của October)', 'flyers', 3, '/October/', 'noun', 'This is a October.', 'Đây là một October.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-047', 'November', '(nghĩa của November)', 'flyers', 3, '/November/', 'noun', 'This is a November.', 'Đây là một November.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ti-048', 'December', '(nghĩa của December)', 'flyers', 3, '/December/', 'noun', 'This is a December.', 'Đây là một December.', 'english', 'flyers', 3, 'time', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-001', 'alien', '(nghĩa của alien)', 'starters', 1, '/alien/', 'noun', 'This is a alien.', 'Đây là một alien.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-002', 'ball', '(nghĩa của ball)', 'starters', 1, '/ball/', 'noun', 'This is a ball.', 'Đây là một ball.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-003', 'balloon', '(nghĩa của balloon)', 'starters', 1, '/balloon/', 'noun', 'This is a balloon.', 'Đây là một balloon.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-004', 'baseball', '(nghĩa của baseball)', 'starters', 1, '/baseball/', 'noun', 'This is a baseball.', 'Đây là một baseball.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-005', 'basketball', '(nghĩa của basketball)', 'starters', 1, '/basketball/', 'noun', 'This is a basketball.', 'Đây là một basketball.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-006', 'bike', '(nghĩa của bike)', 'starters', 1, '/bike/', 'noun', 'This is a bike.', 'Đây là một bike.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-007', 'board game', '(nghĩa của board game)', 'starters', 1, '/board game/', 'noun', 'This is a board game.', 'Đây là một board game.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-008', 'boat', '(nghĩa của boat)', 'starters', 1, '/boat/', 'noun', 'This is a boat.', 'Đây là một boat.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-009', 'car', '(nghĩa của car)', 'starters', 1, '/car/', 'noun', 'This is a car.', 'Đây là một car.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-010', 'doll', '(nghĩa của doll)', 'starters', 1, '/doll/', 'noun', 'This is a doll.', 'Đây là một doll.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-011', 'football', '(nghĩa của football)', 'starters', 1, '/football/', 'noun', 'This is a football.', 'Đây là một football.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-012', 'game', '(nghĩa của game)', 'starters', 1, '/game/', 'noun', 'This is a game.', 'Đây là một game.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-013', 'helicopter', '(nghĩa của helicopter)', 'starters', 1, '/helicopter/', 'noun', 'This is a helicopter.', 'Đây là một helicopter.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-014', 'lorry', '(nghĩa của lorry)', 'starters', 1, '/lorry/', 'noun', 'This is a lorry.', 'Đây là một lorry.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-015', 'monster', '(nghĩa của monster)', 'starters', 1, '/monster/', 'noun', 'This is a monster.', 'Đây là một monster.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-016', 'motorbike', '(nghĩa của motorbike)', 'starters', 1, '/motorbike/', 'noun', 'This is a motorbike.', 'Đây là một motorbike.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-017', 'plane', '(nghĩa của plane)', 'starters', 1, '/plane/', 'noun', 'This is a plane.', 'Đây là một plane.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-018', 'robot', '(nghĩa của robot)', 'starters', 1, '/robot/', 'noun', 'This is a robot.', 'Đây là một robot.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-019', 'soccer', '(nghĩa của soccer)', 'starters', 1, '/soccer/', 'noun', 'This is a soccer.', 'Đây là một soccer.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-020', 'teddy bear', '(nghĩa của teddy bear)', 'starters', 1, '/teddy bear/', 'noun', 'This is a teddy bear.', 'Đây là một teddy bear.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-021', 'toy', '(nghĩa của toy)', 'starters', 1, '/toy/', 'noun', 'This is a toy.', 'Đây là một toy.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-022', 'train', '(nghĩa của train)', 'starters', 1, '/train/', 'noun', 'This is a train.', 'Đây là một train.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-to-023', 'truck', '(nghĩa của truck)', 'starters', 1, '/truck/', 'noun', 'This is a truck.', 'Đây là một truck.', 'english', 'starters', 1, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-to-001', 'model', '(nghĩa của model)', 'movers', 2, '/model/', 'noun', 'This is a model.', 'Đây là một model.', 'english', 'movers', 2, 'toys', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-001', 'bike', '(nghĩa của bike)', 'starters', 1, '/bike/', 'noun', 'This is a bike.', 'Đây là một bike.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-002', 'boat', '(nghĩa của boat)', 'starters', 1, '/boat/', 'noun', 'This is a boat.', 'Đây là một boat.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-003', 'bus', '(nghĩa của bus)', 'starters', 1, '/bus/', 'noun', 'This is a bus.', 'Đây là một bus.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-004', 'car', '(nghĩa của car)', 'starters', 1, '/car/', 'noun', 'This is a car.', 'Đây là một car.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-005', 'drive', '(nghĩa của drive)', 'starters', 1, '/drive/', 'noun', 'This is a drive.', 'Đây là một drive.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-006', 'fly', '(nghĩa của fly)', 'starters', 1, '/fly/', 'noun', 'This is a fly.', 'Đây là một fly.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-007', 'go', '(nghĩa của go)', 'starters', 1, '/go/', 'noun', 'This is a go.', 'Đây là một go.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-008', 'helicopter', '(nghĩa của helicopter)', 'starters', 1, '/helicopter/', 'noun', 'This is a helicopter.', 'Đây là một helicopter.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-009', 'lorry', '(nghĩa của lorry)', 'starters', 1, '/lorry/', 'noun', 'This is a lorry.', 'Đây là một lorry.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-010', 'plane', '(nghĩa của plane)', 'starters', 1, '/plane/', 'noun', 'This is a plane.', 'Đây là một plane.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-011', 'ride', '(nghĩa của ride)', 'starters', 1, '/ride/', 'noun', 'This is a ride.', 'Đây là một ride.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-012', 'run', '(nghĩa của run)', 'starters', 1, '/run/', 'noun', 'This is a run.', 'Đây là một run.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-013', 'ship', '(nghĩa của ship)', 'starters', 1, '/ship/', 'noun', 'This is a ship.', 'Đây là một ship.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-014', 'swim', '(nghĩa của swim)', 'starters', 1, '/swim/', 'noun', 'This is a swim.', 'Đây là một swim.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-015', 'train', '(nghĩa của train)', 'starters', 1, '/train/', 'noun', 'This is a train.', 'Đây là một train.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-tr-016', 'truck', '(nghĩa của truck)', 'starters', 1, '/truck/', 'noun', 'This is a truck.', 'Đây là một truck.', 'english', 'starters', 1, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-001', 'bus station', '(nghĩa của bus station)', 'movers', 2, '/bus station/', 'noun', 'This is a bus station.', 'Đây là một bus station.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-002', 'bus stop', '(nghĩa của bus stop)', 'movers', 2, '/bus stop/', 'noun', 'This is a bus stop.', 'Đây là một bus stop.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-003', 'drive', '(nghĩa của drive)', 'movers', 2, '/drive/', 'noun', 'This is a drive.', 'Đây là một drive.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-004', 'driver', '(nghĩa của driver)', 'movers', 2, '/driver/', 'noun', 'This is a driver.', 'Đây là một driver.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-005', 'ride', '(nghĩa của ride)', 'movers', 2, '/ride/', 'noun', 'This is a ride.', 'Đây là một ride.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-006', 'station', '(nghĩa của station)', 'movers', 2, '/station/', 'noun', 'This is a station.', 'Đây là một station.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-007', 'ticket', '(nghĩa của ticket)', 'movers', 2, '/ticket/', 'noun', 'This is a ticket.', 'Đây là một ticket.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-008', 'tractor', '(nghĩa của tractor)', 'movers', 2, '/tractor/', 'noun', 'This is a tractor.', 'Đây là một tractor.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-tr-009', 'trip', '(nghĩa của trip)', 'movers', 2, '/trip/', 'noun', 'This is a trip.', 'Đây là một trip.', 'english', 'movers', 2, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-001', 'ambulance', '(nghĩa của ambulance)', 'flyers', 3, '/ambulance/', 'noun', 'This is a ambulance.', 'Đây là một ambulance.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-002', 'bicycle', '(nghĩa của bicycle)', 'flyers', 3, '/bicycle/', 'noun', 'This is a bicycle.', 'Đây là một bicycle.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-003', 'fire engine', '(nghĩa của fire engine)', 'flyers', 3, '/fire engine/', 'noun', 'This is a fire engine.', 'Đây là một fire engine.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-004', 'journey', '(nghĩa của journey)', 'flyers', 3, '/journey/', 'noun', 'This is a journey.', 'Đây là một journey.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-005', 'lift', '(nghĩa của lift)', 'flyers', 3, '/lift/', 'noun', 'This is a lift.', 'Đây là một lift.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-006', 'motorway', '(nghĩa của motorway)', 'flyers', 3, '/motorway/', 'noun', 'This is a motorway.', 'Đây là một motorway.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-007', 'passenger', '(nghĩa của passenger)', 'flyers', 3, '/passenger/', 'noun', 'This is a passenger.', 'Đây là một passenger.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-008', 'platform', '(nghĩa của platform)', 'flyers', 3, '/platform/', 'noun', 'This is a platform.', 'Đây là một platform.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-009', 'racing', '(nghĩa của racing)', 'flyers', 3, '/racing/', 'noun', 'This is a racing.', 'Đây là một racing.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-010', 'railway', '(nghĩa của railway)', 'flyers', 3, '/railway/', 'noun', 'This is a railway.', 'Đây là một railway.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-011', 'rocket', '(nghĩa của rocket)', 'flyers', 3, '/rocket/', 'noun', 'This is a rocket.', 'Đây là một rocket.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-012', 'spaceship', '(nghĩa của spaceship)', 'flyers', 3, '/spaceship/', 'noun', 'This is a spaceship.', 'Đây là một spaceship.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-013', 'taxi', '(nghĩa của taxi)', 'flyers', 3, '/taxi/', 'noun', 'This is a taxi.', 'Đây là một taxi.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-014', 'tour', '(nghĩa của tour)', 'flyers', 3, '/tour/', 'noun', 'This is a tour.', 'Đây là một tour.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-015', 'traffic', '(nghĩa của traffic)', 'flyers', 3, '/traffic/', 'noun', 'This is a traffic.', 'Đây là một traffic.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-tr-016', 'wheel', '(nghĩa của wheel)', 'flyers', 3, '/wheel/', 'noun', 'This is a wheel.', 'Đây là một wheel.', 'english', 'flyers', 3, 'transport', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-we-001', 'sun', '(nghĩa của sun)', 'starters', 1, '/sun/', 'noun', 'This is a sun.', 'Đây là một sun.', 'english', 'starters', 1, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-001', 'cloud', '(nghĩa của cloud)', 'movers', 2, '/cloud/', 'noun', 'This is a cloud.', 'Đây là một cloud.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-002', 'cloudy', '(nghĩa của cloudy)', 'movers', 2, '/cloudy/', 'noun', 'This is a cloudy.', 'Đây là một cloudy.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-003', 'ice', '(nghĩa của ice)', 'movers', 2, '/ice/', 'noun', 'This is a ice.', 'Đây là một ice.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-004', 'rain', '(nghĩa của rain)', 'movers', 2, '/rain/', 'noun', 'This is a rain.', 'Đây là một rain.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-005', 'rainbow', '(nghĩa của rainbow)', 'movers', 2, '/rainbow/', 'noun', 'This is a rainbow.', 'Đây là một rainbow.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-006', 'sky', '(nghĩa của sky)', 'movers', 2, '/sky/', 'noun', 'This is a sky.', 'Đây là một sky.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-007', 'snow', '(nghĩa của snow)', 'movers', 2, '/snow/', 'noun', 'This is a snow.', 'Đây là một snow.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-008', 'sunny', '(nghĩa của sunny)', 'movers', 2, '/sunny/', 'noun', 'This is a sunny.', 'Đây là một sunny.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-009', 'weather', '(nghĩa của weather)', 'movers', 2, '/weather/', 'noun', 'This is a weather.', 'Đây là một weather.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-010', 'wind', '(nghĩa của wind)', 'movers', 2, '/wind/', 'noun', 'This is a wind.', 'Đây là một wind.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-we-011', 'windy', '(nghĩa của windy)', 'movers', 2, '/windy/', 'noun', 'This is a windy.', 'Đây là một windy.', 'english', 'movers', 2, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-we-001', 'fog', '(nghĩa của fog)', 'flyers', 3, '/fog/', 'noun', 'This is a fog.', 'Đây là một fog.', 'english', 'flyers', 3, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-we-002', 'foggy', '(nghĩa của foggy)', 'flyers', 3, '/foggy/', 'noun', 'This is a foggy.', 'Đây là một foggy.', 'english', 'flyers', 3, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-we-003', 'storm', '(nghĩa của storm)', 'flyers', 3, '/storm/', 'noun', 'This is a storm.', 'Đây là một storm.', 'english', 'flyers', 3, 'weather', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wo-001', 'teacher', '(nghĩa của teacher)', 'starters', 1, '/teacher/', 'noun', 'This is a teacher.', 'Đây là một teacher.', 'english', 'starters', 1, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-001', 'circus', '(nghĩa của circus)', 'movers', 2, '/circus/', 'noun', 'This is a circus.', 'Đây là một circus.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-002', 'clown', '(nghĩa của clown)', 'movers', 2, '/clown/', 'noun', 'This is a clown.', 'Đây là một clown.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-003', 'cook', '(nghĩa của cook)', 'movers', 2, '/cook/', 'noun', 'This is a cook.', 'Đây là một cook.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-004', 'dentist', '(nghĩa của dentist)', 'movers', 2, '/dentist/', 'noun', 'This is a dentist.', 'Đây là một dentist.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-005', 'doctor', '(nghĩa của doctor)', 'movers', 2, '/doctor/', 'noun', 'This is a doctor.', 'Đây là một doctor.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-006', 'driver', '(nghĩa của driver)', 'movers', 2, '/driver/', 'noun', 'This is a driver.', 'Đây là một driver.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-007', 'farmer', '(nghĩa của farmer)', 'movers', 2, '/farmer/', 'noun', 'This is a farmer.', 'Đây là một farmer.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-008', 'film star', '(nghĩa của film star)', 'movers', 2, '/film star/', 'noun', 'This is a film star.', 'Đây là một film star.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-009', 'hospital', '(nghĩa của hospital)', 'movers', 2, '/hospital/', 'noun', 'This is a hospital.', 'Đây là một hospital.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-010', 'nurse', '(nghĩa của nurse)', 'movers', 2, '/nurse/', 'noun', 'This is a nurse.', 'Đây là một nurse.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-011', 'pirate', '(nghĩa của pirate)', 'movers', 2, '/pirate/', 'noun', 'This is a pirate.', 'Đây là một pirate.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-012', 'pop star', '(nghĩa của pop star)', 'movers', 2, '/pop star/', 'noun', 'This is a pop star.', 'Đây là một pop star.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wo-013', 'work', '(nghĩa của work)', 'movers', 2, '/work/', 'noun', 'This is a work.', 'Đây là một work.', 'english', 'movers', 2, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-001', 'actor', '(nghĩa của actor)', 'flyers', 3, '/actor/', 'noun', 'This is a actor.', 'Đây là một actor.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-002', 'airport', '(nghĩa của airport)', 'flyers', 3, '/airport/', 'noun', 'This is a airport.', 'Đây là một airport.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-003', 'ambulance', '(nghĩa của ambulance)', 'flyers', 3, '/ambulance/', 'noun', 'This is a ambulance.', 'Đây là một ambulance.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-004', 'artist', '(nghĩa của artist)', 'flyers', 3, '/artist/', 'noun', 'This is a artist.', 'Đây là một artist.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-005', 'astronaut', '(nghĩa của astronaut)', 'flyers', 3, '/astronaut/', 'noun', 'This is a astronaut.', 'Đây là một astronaut.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-006', 'business', '(nghĩa của business)', 'flyers', 3, '/business/', 'noun', 'This is a business.', 'Đây là một business.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-007', 'businessman', '(nghĩa của businessman)', 'flyers', 3, '/businessman/', 'noun', 'This is a businessman.', 'Đây là một businessman.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-008', 'businesswoman', '(nghĩa của businesswoman)', 'flyers', 3, '/businesswoman/', 'noun', 'This is a businesswoman.', 'Đây là một businesswoman.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-009', 'designer', '(nghĩa của designer)', 'flyers', 3, '/designer/', 'noun', 'This is a designer.', 'Đây là một designer.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-010', 'engineer', '(nghĩa của engineer)', 'flyers', 3, '/engineer/', 'noun', 'This is a engineer.', 'Đây là một engineer.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-011', 'factory', '(nghĩa của factory)', 'flyers', 3, '/factory/', 'noun', 'This is a factory.', 'Đây là một factory.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-012', 'fire engine', '(nghĩa của fire engine)', 'flyers', 3, '/fire engine/', 'noun', 'This is a fire engine.', 'Đây là một fire engine.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-013', 'fire fighter', '(nghĩa của fire fighter)', 'flyers', 3, '/fire fighter/', 'noun', 'This is a fire fighter.', 'Đây là một fire fighter.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-014', 'job', '(nghĩa của job)', 'flyers', 3, '/job/', 'noun', 'This is a job.', 'Đây là một job.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-015', 'journalist', '(nghĩa của journalist)', 'flyers', 3, '/journalist/', 'noun', 'This is a journalist.', 'Đây là một journalist.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-016', 'manager', '(nghĩa của manager)', 'flyers', 3, '/manager/', 'noun', 'This is a manager.', 'Đây là một manager.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-017', 'mechanic', '(nghĩa của mechanic)', 'flyers', 3, '/mechanic/', 'noun', 'This is a mechanic.', 'Đây là một mechanic.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-018', 'meeting', '(nghĩa của meeting)', 'flyers', 3, '/meeting/', 'noun', 'This is a meeting.', 'Đây là một meeting.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-019', 'news', '(nghĩa của news)', 'flyers', 3, '/news/', 'noun', 'This is a news.', 'Đây là một news.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-020', 'newspaper', '(nghĩa của newspaper)', 'flyers', 3, '/newspaper/', 'noun', 'This is a newspaper.', 'Đây là một newspaper.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-021', 'office', '(nghĩa của office)', 'flyers', 3, '/office/', 'noun', 'This is a office.', 'Đây là một office.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-022', 'photographer', '(nghĩa của photographer)', 'flyers', 3, '/photographer/', 'noun', 'This is a photographer.', 'Đây là một photographer.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-023', 'pilot', '(nghĩa của pilot)', 'flyers', 3, '/pilot/', 'noun', 'This is a pilot.', 'Đây là một pilot.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-024', 'police officer', '(nghĩa của police officer)', 'flyers', 3, '/police officer/', 'noun', 'This is a police officer.', 'Đây là một police officer.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-025', 'police station', '(nghĩa của police station)', 'flyers', 3, '/police station/', 'noun', 'This is a police station.', 'Đây là một police station.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-026', 'queen', '(nghĩa của queen)', 'flyers', 3, '/queen/', 'noun', 'This is a queen.', 'Đây là một queen.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-027', 'rocket', '(nghĩa của rocket)', 'flyers', 3, '/rocket/', 'noun', 'This is a rocket.', 'Đây là một rocket.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-028', 'singer', '(nghĩa của singer)', 'flyers', 3, '/singer/', 'noun', 'This is a singer.', 'Đây là một singer.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-029', 'taxi', '(nghĩa của taxi)', 'flyers', 3, '/taxi/', 'noun', 'This is a taxi.', 'Đây là một taxi.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wo-030', 'waiter', '(nghĩa của waiter)', 'flyers', 3, '/waiter/', 'noun', 'This is a waiter.', 'Đây là một waiter.', 'english', 'flyers', 3, 'work', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-001', 'beach', '(nghĩa của beach)', 'starters', 1, '/beach/', 'noun', 'This is a beach.', 'Đây là một beach.', 'english', 'starters', 1, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-002', 'sand', '(nghĩa của sand)', 'starters', 1, '/sand/', 'noun', 'This is a sand.', 'Đây là một sand.', 'english', 'starters', 1, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-003', 'sea', '(nghĩa của sea)', 'starters', 1, '/sea/', 'noun', 'This is a sea.', 'Đây là một sea.', 'english', 'starters', 1, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-004', 'shell', '(nghĩa của shell)', 'starters', 1, '/shell/', 'noun', 'This is a shell.', 'Đây là một shell.', 'english', 'starters', 1, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-005', 'street', '(nghĩa của street)', 'starters', 1, '/street/', 'noun', 'This is a street.', 'Đây là một street.', 'english', 'starters', 1, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-006', 'sun', '(nghĩa của sun)', 'starters', 1, '/sun/', 'noun', 'This is a sun.', 'Đây là một sun.', 'english', 'starters', 1, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-007', 'tree', '(nghĩa của tree)', 'starters', 1, '/tree/', 'noun', 'This is a tree.', 'Đây là một tree.', 'english', 'starters', 1, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-wa-008', 'water', '(nghĩa của water)', 'starters', 1, '/water/', 'noun', 'This is a water.', 'Đây là một water.', 'english', 'starters', 1, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-001', 'building', '(nghĩa của building)', 'movers', 2, '/building/', 'noun', 'This is a building.', 'Đây là một building.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-002', 'city', '(nghĩa của city)', 'movers', 2, '/city/', 'noun', 'This is a city.', 'Đây là một city.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-003', 'country', '(nghĩa của country)', 'movers', 2, '/country/', 'noun', 'This is a country.', 'Đây là một country.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-004', 'countryside', '(nghĩa của countryside)', 'movers', 2, '/countryside/', 'noun', 'This is a countryside.', 'Đây là một countryside.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-005', 'field', '(nghĩa của field)', 'movers', 2, '/field/', 'noun', 'This is a field.', 'Đây là một field.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-006', 'forest', '(nghĩa của forest)', 'movers', 2, '/forest/', 'noun', 'This is a forest.', 'Đây là một forest.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-007', 'grass', '(nghĩa của grass)', 'movers', 2, '/grass/', 'noun', 'This is a grass.', 'Đây là một grass.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-008', 'ground', '(nghĩa của ground)', 'movers', 2, '/ground/', 'noun', 'This is a ground.', 'Đây là một ground.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-009', 'island', '(nghĩa của island)', 'movers', 2, '/island/', 'noun', 'This is a island.', 'Đây là một island.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-010', 'lake', '(nghĩa của lake)', 'movers', 2, '/lake/', 'noun', 'This is a lake.', 'Đây là một lake.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-011', 'leaf', '(nghĩa của leaf)', 'movers', 2, '/leaf/', 'noun', 'This is a leaf.', 'Đây là một leaf.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-012', 'leaves', '(nghĩa của leaves)', 'movers', 2, '/leaves/', 'noun', 'This is a leaves.', 'Đây là một leaves.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-013', 'moon', '(nghĩa của moon)', 'movers', 2, '/moon/', 'noun', 'This is a moon.', 'Đây là một moon.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-014', 'mountain', '(nghĩa của mountain)', 'movers', 2, '/mountain/', 'noun', 'This is a mountain.', 'Đây là một mountain.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-015', 'plant', '(nghĩa của plant)', 'movers', 2, '/plant/', 'noun', 'This is a plant.', 'Đây là một plant.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-016', 'river', '(nghĩa của river)', 'movers', 2, '/river/', 'noun', 'This is a river.', 'Đây là một river.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-017', 'road', '(nghĩa của road)', 'movers', 2, '/road/', 'noun', 'This is a road.', 'Đây là một road.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-018', 'rock', '(nghĩa của rock)', 'movers', 2, '/rock/', 'noun', 'This is a rock.', 'Đây là một rock.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-019', 'sky', '(nghĩa của sky)', 'movers', 2, '/sky/', 'noun', 'This is a sky.', 'Đây là một sky.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-020', 'star', '(nghĩa của star)', 'movers', 2, '/star/', 'noun', 'This is a star.', 'Đây là một star.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-021', 'town', '(nghĩa của town)', 'movers', 2, '/town/', 'noun', 'This is a town.', 'Đây là một town.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-022', 'village', '(nghĩa của village)', 'movers', 2, '/village/', 'noun', 'This is a village.', 'Đây là một village.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-023', 'waterfall', '(nghĩa của waterfall)', 'movers', 2, '/waterfall/', 'noun', 'This is a waterfall.', 'Đây là một waterfall.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-024', 'wave', '(nghĩa của wave)', 'movers', 2, '/wave/', 'noun', 'This is a wave.', 'Đây là một wave.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-wa-025', 'world', '(nghĩa của world)', 'movers', 2, '/world/', 'noun', 'This is a world.', 'Đây là một world.', 'english', 'movers', 2, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-001', 'air', '(nghĩa của air)', 'flyers', 3, '/air/', 'noun', 'This is a air.', 'Đây là một air.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-002', 'bridge', '(nghĩa của bridge)', 'flyers', 3, '/bridge/', 'noun', 'This is a bridge.', 'Đây là một bridge.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-003', 'castle', '(nghĩa của castle)', 'flyers', 3, '/castle/', 'noun', 'This is a castle.', 'Đây là một castle.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-004', 'cave', '(nghĩa của cave)', 'flyers', 3, '/cave/', 'noun', 'This is a cave.', 'Đây là một cave.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-005', 'desert', '(nghĩa của desert)', 'flyers', 3, '/desert/', 'noun', 'This is a desert.', 'Đây là một desert.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-006', 'Earth', '(nghĩa của Earth)', 'flyers', 3, '/Earth/', 'noun', 'This is a Earth.', 'Đây là một Earth.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-007', 'entrance', '(nghĩa của entrance)', 'flyers', 3, '/entrance/', 'noun', 'This is a entrance.', 'Đây là một entrance.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-008', 'environment', '(nghĩa của environment)', 'flyers', 3, '/environment/', 'noun', 'This is a environment.', 'Đây là một environment.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-009', 'exit', '(nghĩa của exit)', 'flyers', 3, '/exit/', 'noun', 'This is a exit.', 'Đây là một exit.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-010', 'fire', '(nghĩa của fire)', 'flyers', 3, '/fire/', 'noun', 'This is a fire.', 'Đây là một fire.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-011', 'future', '(nghĩa của future)', 'flyers', 3, '/future/', 'noun', 'This is a future.', 'Đây là một future.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-012', 'hill', '(nghĩa của hill)', 'flyers', 3, '/hill/', 'noun', 'This is a hill.', 'Đây là một hill.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-013', 'land', '(nghĩa của land)', 'flyers', 3, '/land/', 'noun', 'This is a land.', 'Đây là một land.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-014', 'ocean', '(nghĩa của ocean)', 'flyers', 3, '/ocean/', 'noun', 'This is a ocean.', 'Đây là một ocean.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-015', 'planet', '(nghĩa của planet)', 'flyers', 3, '/planet/', 'noun', 'This is a planet.', 'Đây là một planet.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-016', 'pond', '(nghĩa của pond)', 'flyers', 3, '/pond/', 'noun', 'This is a pond.', 'Đây là một pond.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-017', 'space', '(nghĩa của space)', 'flyers', 3, '/space/', 'noun', 'This is a space.', 'Đây là một space.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-018', 'stone', '(nghĩa của stone)', 'flyers', 3, '/stone/', 'noun', 'This is a stone.', 'Đây là một stone.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-019', 'stream', '(nghĩa của stream)', 'flyers', 3, '/stream/', 'noun', 'This is a stream.', 'Đây là một stream.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-020', 'view', '(nghĩa của view)', 'flyers', 3, '/view/', 'noun', 'This is a view.', 'Đây là một view.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-wa-021', 'wood', '(nghĩa của wood)', 'flyers', 3, '/wood/', 'noun', 'This is a wood.', 'Đây là một wood.', 'english', 'flyers', 3, 'world_around_us', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;

DELETE FROM vocabulary_bank 
WHERE topic IN ('sports_leisure', 'time', 'toys', 'transport', 'weather', 'work', 'world_around_us') 
AND id NOT LIKE 'st-sl-%' AND id NOT LIKE 'mv-sl-%' AND id NOT LIKE 'fl-sl-%'
AND id NOT LIKE 'st-ti-%' AND id NOT LIKE 'mv-ti-%' AND id NOT LIKE 'fl-ti-%'
AND id NOT LIKE 'st-to-%' AND id NOT LIKE 'mv-to-%' AND id NOT LIKE 'fl-to-%'
AND id NOT LIKE 'st-tr-%' AND id NOT LIKE 'mv-tr-%' AND id NOT LIKE 'fl-tr-%'
AND id NOT LIKE 'st-we-%' AND id NOT LIKE 'mv-we-%' AND id NOT LIKE 'fl-we-%'
AND id NOT LIKE 'st-wo-%' AND id NOT LIKE 'mv-wo-%' AND id NOT LIKE 'fl-wo-%'
AND id NOT LIKE 'st-wa-%' AND id NOT LIKE 'mv-wa-%' AND id NOT LIKE 'fl-wa-%';
