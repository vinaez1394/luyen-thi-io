
-- Cập nhật vocabulary_bank với 3 chủ đề mới: body_face, clothes, colours
-- Group tag được set trùng với certificate (starters, movers, flyers) như yêu cầu

INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-001', 'arm', 'cánh tay', 'starters', 1, '/ɑːrm/', 'noun', 'He has strong arms.', 'Anh ấy có đôi cánh tay khỏe mạnh.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '💪' WHERE id = 'st-bf-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-002', 'body', 'cơ thể', 'starters', 1, '/ˈbɑː.di/', 'noun', 'Exercise is good for your body.', 'Tập thể dục rất tốt cho cơ thể của bạn.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧍' WHERE id = 'st-bf-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-003', 'ear', 'cái tai', 'starters', 1, '/ɪr/', 'noun', 'An elephant has big ears.', 'Một con voi có đôi tai to.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👂' WHERE id = 'st-bf-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-004', 'eye', 'con mắt', 'starters', 1, '/aɪ/', 'noun', 'She has blue eyes.', 'Cô ấy có đôi mắt màu xanh dương.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👁️' WHERE id = 'st-bf-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-005', 'face', 'khuôn mặt', 'starters', 1, '/feɪs/', 'noun', 'Wash your face every morning.', 'Hãy rửa mặt vào mỗi buổi sáng.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👦' WHERE id = 'st-bf-005';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-006', 'foot', 'bàn chân', 'starters', 1, '/fʊt/', 'noun', 'My left foot hurts.', 'Bàn chân trái của tôi bị đau.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🦶' WHERE id = 'st-bf-006';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-007', 'feet', 'những bàn chân', 'starters', 1, '/fiːt/', 'noun', 'He has very big feet.', 'Anh ấy có đôi bàn chân rất to.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🦶' WHERE id = 'st-bf-007';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-008', 'hair', 'mái tóc', 'starters', 1, '/her/', 'noun', 'She has long black hair.', 'Cô ấy có mái tóc đen dài.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '💇' WHERE id = 'st-bf-008';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-009', 'hand', 'bàn tay', 'starters', 1, '/hænd/', 'noun', 'Wash your hands before eating.', 'Hãy rửa tay trước khi ăn.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '✋' WHERE id = 'st-bf-009';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-010', 'head', 'cái đầu', 'starters', 1, '/hed/', 'noun', 'He is wearing a hat on his head.', 'Anh ấy đang đội mũ trên đầu.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🗣️' WHERE id = 'st-bf-010';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-011', 'leg', 'cái chân', 'starters', 1, '/leɡ/', 'noun', 'A spider has eight legs.', 'Một con nhện có tám cái chân.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🦵' WHERE id = 'st-bf-011';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-012', 'mouth', 'cái miệng', 'starters', 1, '/maʊθ/', 'noun', 'Open your mouth, please.', 'Vui lòng mở miệng ra.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👄' WHERE id = 'st-bf-012';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-013', 'nose', 'cái mũi', 'starters', 1, '/noʊz/', 'noun', 'A dog has a good nose.', 'Một con chó có cái mũi thính.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👃' WHERE id = 'st-bf-013';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-bf-014', 'smile', 'nụ cười / mỉm cười', 'starters', 1, '/smaɪl/', 'noun/verb', 'She has a beautiful smile.', 'Cô ấy có một nụ cười đẹp.', 'english', 'starters', 1, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '😊' WHERE id = 'st-bf-014';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-001', 'back', 'cái lưng', 'movers', 2, '/bæk/', 'noun', 'My back hurts after carrying heavy boxes.', 'Lưng tôi bị đau sau khi vác những chiếc hộp nặng.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🔙' WHERE id = 'mv-bf-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-002', 'beard', 'râu quai nón', 'movers', 2, '/bɪrd/', 'noun', 'My grandfather has a long white beard.', 'Ông của tôi có một bộ râu quai nón dài màu trắng.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧔' WHERE id = 'mv-bf-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-003', 'blond', 'màu vàng hoe (tóc)', 'movers', 2, '/blɑːnd/', 'adjective', 'The boy has short blond hair.', 'Cậu bé có mái tóc ngắn màu vàng hoe.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👱' WHERE id = 'mv-bf-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-004', 'curly', 'xoăn (tóc)', 'movers', 2, '/ˈkɜːr.li/', 'adjective', 'She has curly brown hair.', 'Cô ấy có mái tóc xoăn màu nâu.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '➰' WHERE id = 'mv-bf-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-005', 'fair', 'sáng màu (tóc/da)', 'movers', 2, '/fer/', 'adjective', 'People in cold countries often have fair skin.', 'Người ở những vùng lạnh thường có làn da sáng màu.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👱🏻' WHERE id = 'mv-bf-005';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-006', 'fat', 'béo, mập', 'movers', 2, '/fæt/', 'adjective', 'The cat is too fat to jump.', 'Con mèo quá béo nên không thể nhảy được.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🫃' WHERE id = 'mv-bf-006';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-007', 'moustache', 'ria mép', 'movers', 2, '/ˈmʌs.tæʃ/', 'noun', 'He shaved his moustache this morning.', 'Anh ấy đã cạo ria mép sáng nay.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧔' WHERE id = 'mv-bf-007';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-008', 'neck', 'cái cổ', 'movers', 2, '/nek/', 'noun', 'A giraffe has a very long neck.', 'Một con hươu cao cổ có cái cổ rất dài.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🦒' WHERE id = 'mv-bf-008';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-009', 'shoulder', 'bờ vai', 'movers', 2, '/ˈʃoʊl.dɚ/', 'noun', 'She tapped him on the shoulder.', 'Cô ấy vỗ nhẹ lên vai anh ấy.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🤷' WHERE id = 'mv-bf-009';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-010', 'stomach', 'bụng, dạ dày', 'movers', 2, '/ˈstʌm.ək/', 'noun', 'My stomach is full after a big meal.', 'Bụng tôi đã no sau một bữa ăn lớn.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🤰' WHERE id = 'mv-bf-010';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-011', 'thin', 'gầy, ốm', 'movers', 2, '/θɪn/', 'adjective', 'The dog was very thin and hungry.', 'Con chó rất gầy và đói.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🥢' WHERE id = 'mv-bf-011';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-012', 'tooth', 'chiếc răng', 'movers', 2, '/tuːθ/', 'noun', 'My front tooth is loose.', 'Chiếc răng cửa của tôi bị lung lay.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🦷' WHERE id = 'mv-bf-012';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-bf-013', 'teeth', 'những chiếc răng', 'movers', 2, '/tiːθ/', 'noun', 'Brush your teeth twice a day.', 'Hãy đánh răng hai lần một ngày.', 'english', 'movers', 2, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🦷' WHERE id = 'mv-bf-013';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-bf-001', 'elbow', 'cùi chỏ, khuỷu tay', 'flyers', 3, '/ˈel.boʊ/', 'noun', 'He hit his elbow on the table.', 'Anh ấy đập cùi chỏ vào bàn.', 'english', 'flyers', 3, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '💪' WHERE id = 'fl-bf-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-bf-002', 'finger', 'ngón tay', 'flyers', 3, '/ˈfɪŋ.ɡɚ/', 'noun', 'You have five fingers on each hand.', 'Bạn có năm ngón tay trên mỗi bàn tay.', 'english', 'flyers', 3, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '☝️' WHERE id = 'fl-bf-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-bf-003', 'knee', 'đầu gối', 'flyers', 3, '/niː/', 'noun', 'She fell and hurt her knee.', 'Cô ấy ngã và làm đau đầu gối.', 'english', 'flyers', 3, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧎' WHERE id = 'fl-bf-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-bf-004', 'toe', 'ngón chân', 'flyers', 3, '/toʊ/', 'noun', 'These shoes are too tight, my toes hurt.', 'Đôi giày này quá chật, các ngón chân của tôi bị đau.', 'english', 'flyers', 3, 'body_face', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🦶' WHERE id = 'fl-bf-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-001', 'bag', 'cái túi', 'starters', 1, '/bæɡ/', 'noun', 'She put her books in her bag.', 'Cô ấy cất sách vào trong túi.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👜' WHERE id = 'st-cl-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-002', 'baseball cap', 'mũ lưỡi trai', 'starters', 1, '/ˈbeɪs.bɑːl kæp/', 'noun', 'He always wears a baseball cap.', 'Anh ấy luôn đội một chiếc mũ lưỡi trai.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧢' WHERE id = 'st-cl-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-003', 'boots', 'ủng, bốt', 'starters', 1, '/buːts/', 'noun', 'Wear your boots because it is raining.', 'Hãy mang ủng vào vì trời đang mưa.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👢' WHERE id = 'st-cl-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-004', 'clothes', 'quần áo', 'starters', 1, '/kloʊðz/', 'noun', 'I need to wash my dirty clothes.', 'Tôi cần giặt những bộ quần áo bẩn.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👕' WHERE id = 'st-cl-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-005', 'dress', 'cái váy liền', 'starters', 1, '/dres/', 'noun', 'She wore a beautiful pink dress.', 'Cô ấy mặc một chiếc váy liền màu hồng tuyệt đẹp.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👗' WHERE id = 'st-cl-005';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-006', 'glasses', 'mắt kính', 'starters', 1, '/ˈɡlæs.ɪz/', 'noun', 'He needs glasses for reading.', 'Anh ấy cần mắt kính để đọc sách.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👓' WHERE id = 'st-cl-006';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-007', 'handbag', 'túi xách tay', 'starters', 1, '/ˈhænd.bæɡ/', 'noun', 'Her handbag is very heavy.', 'Túi xách tay của cô ấy rất nặng.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👜' WHERE id = 'st-cl-007';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-008', 'hat', 'cái mũ', 'starters', 1, '/hæt/', 'noun', 'Put on your hat when you go out.', 'Hãy đội mũ khi bạn ra ngoài.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👒' WHERE id = 'st-cl-008';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-009', 'jacket', 'áo khoác', 'starters', 1, '/ˈdʒæk.ɪt/', 'noun', 'It''s cold outside, wear a jacket.', 'Ngoài trời lạnh lắm, hãy mặc áo khoác vào.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧥' WHERE id = 'st-cl-009';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-010', 'jeans', 'quần jean', 'starters', 1, '/dʒiːnz/', 'noun', 'He usually wears blue jeans.', 'Anh ấy thường mặc quần jean màu xanh.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👖' WHERE id = 'st-cl-010';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-011', 'shirt', 'áo sơ mi', 'starters', 1, '/ʃɜːrt/', 'noun', 'He bought a new white shirt.', 'Anh ấy đã mua một chiếc áo sơ mi trắng mới.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👔' WHERE id = 'st-cl-011';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-012', 'shoe', 'chiếc giày', 'starters', 1, '/ʃuː/', 'noun', 'I can''t find my left shoe.', 'Tôi không tìm thấy chiếc giày trái của mình.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👞' WHERE id = 'st-cl-012';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-013', 'shorts', 'quần đùi', 'starters', 1, '/ʃɔːrts/', 'noun', 'He is wearing shorts in summer.', 'Anh ấy mặc quần đùi vào mùa hè.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🩳' WHERE id = 'st-cl-013';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-014', 'skirt', 'chân váy', 'starters', 1, '/skɜːrt/', 'noun', 'She has a long black skirt.', 'Cô ấy có một chiếc chân váy dài màu đen.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👗' WHERE id = 'st-cl-014';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-015', 'sock', 'chiếc tất', 'starters', 1, '/sɑːk/', 'noun', 'There is a hole in my sock.', 'Có một lỗ thủng trên chiếc tất của tôi.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧦' WHERE id = 'st-cl-015';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-016', 'trousers', 'quần dài', 'starters', 1, '/ˈtraʊ.zɚz/', 'noun', 'He wears grey trousers to work.', 'Anh ấy mặc quần dài màu xám đi làm.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👖' WHERE id = 'st-cl-016';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-017', 'T-shirt', 'áo thun', 'starters', 1, '/ˈtiː.ʃɜːrt/', 'noun', 'He gave me a white T-shirt.', 'Anh ấy đã tặng tôi một chiếc áo thun trắng.', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👕' WHERE id = 'st-cl-017';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-cl-018', 'wear', 'mặc, đội, mang', 'starters', 1, '/wer/', 'verb', 'What are you going to wear today?', 'Hôm nay bạn định mặc gì?', 'english', 'starters', 1, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👚' WHERE id = 'st-cl-018';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-cl-001', 'coat', 'áo choàng', 'movers', 2, '/koʊt/', 'noun', 'Put on your winter coat.', 'Hãy mặc áo choàng mùa đông vào.', 'english', 'movers', 2, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧥' WHERE id = 'mv-cl-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-cl-002', 'helmet', 'mũ bảo hiểm', 'movers', 2, '/ˈhel.mət/', 'noun', 'Always wear a helmet when riding a bike.', 'Luôn đội mũ bảo hiểm khi đạp xe.', 'english', 'movers', 2, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '⛑️' WHERE id = 'mv-cl-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-cl-003', 'scarf', 'khăn quàng cổ', 'movers', 2, '/skɑːrf/', 'noun', 'She wrapped a scarf around her neck.', 'Cô ấy quấn một chiếc khăn quanh cổ.', 'english', 'movers', 2, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧣' WHERE id = 'mv-cl-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-cl-004', 'sweater', 'áo len', 'movers', 2, '/ˈswet.ɚ/', 'noun', 'My grandmother knitted me a red sweater.', 'Bà nội tôi đã đan cho tôi một chiếc áo len đỏ.', 'english', 'movers', 2, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧶' WHERE id = 'mv-cl-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-cl-005', 'swimsuit', 'đồ bơi', 'movers', 2, '/ˈswɪm.suːt/', 'noun', 'Don''t forget to pack your swimsuit for the beach.', 'Đừng quên chuẩn bị đồ bơi để đi biển.', 'english', 'movers', 2, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👙' WHERE id = 'mv-cl-005';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-001', 'belt', 'thắt lưng', 'flyers', 3, '/belt/', 'noun', 'These trousers are too big, I need a belt.', 'Chiếc quần này quá rộng, tôi cần một cái thắt lưng.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🥋' WHERE id = 'fl-cl-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-002', 'bracelet', 'vòng tay', 'flyers', 3, '/ˈbreɪ.slət/', 'noun', 'She gave me a silver bracelet.', 'Cô ấy đã tặng tôi một chiếc vòng tay bạc.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '📿' WHERE id = 'fl-cl-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-003', 'costume', 'trang phục hóa trang', 'flyers', 3, '/ˈkɑː.stuːm/', 'noun', 'He wore a pirate costume to the party.', 'Anh ấy đã mặc trang phục cướp biển đến bữa tiệc.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧛' WHERE id = 'fl-cl-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-004', 'crown', 'vương miện', 'flyers', 3, '/kraʊn/', 'noun', 'The queen wears a golden crown.', 'Nữ hoàng đội một chiếc vương miện bằng vàng.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👑' WHERE id = 'fl-cl-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-005', 'glove', 'găng tay', 'flyers', 3, '/ɡlʌv/', 'noun', 'I lost one glove in the snow.', 'Tôi đã làm mất một chiếc găng tay trong tuyết.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧤' WHERE id = 'fl-cl-005';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-006', 'necklace', 'vòng cổ', 'flyers', 3, '/ˈnek.ləs/', 'noun', 'She wears a diamond necklace.', 'Cô ấy đeo một chiếc vòng cổ kim cương.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '📿' WHERE id = 'fl-cl-006';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-007', 'pajamas', 'đồ ngủ (US)', 'flyers', 3, '/pəˈdʒɑː.məz/', 'noun', 'I put on my pajamas and went to bed.', 'Tôi mặc đồ ngủ và đi ngủ.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👘' WHERE id = 'fl-cl-007';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-008', 'pyjamas', 'đồ ngủ (UK)', 'flyers', 3, '/pɪˈdʒɑː.məz/', 'noun', 'He sleeps in his blue pyjamas.', 'Anh ấy ngủ trong bộ đồ ngủ màu xanh lam.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👘' WHERE id = 'fl-cl-008';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-009', 'pocket', 'túi quần/áo', 'flyers', 3, '/ˈpɑː.kɪt/', 'noun', 'He put the money in his pocket.', 'Anh ấy đã cất tiền vào túi quần.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👖' WHERE id = 'fl-cl-009';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-010', 'ring', 'chiếc nhẫn', 'flyers', 3, '/rɪŋ/', 'noun', 'He bought her a diamond ring.', 'Anh ấy đã mua cho cô một chiếc nhẫn kim cương.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '💍' WHERE id = 'fl-cl-010';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-011', 'sunglasses', 'kính râm', 'flyers', 3, '/ˈsʌnˌɡlæs.ɪz/', 'noun', 'Wear your sunglasses to protect your eyes.', 'Hãy đeo kính râm để bảo vệ đôi mắt của bạn.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🕶️' WHERE id = 'fl-cl-011';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-012', 'trainers', 'giày thể thao', 'flyers', 3, '/ˈtreɪ.nɚz/', 'noun', 'I bought a new pair of trainers for running.', 'Tôi đã mua một đôi giày thể thao mới để chạy bộ.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '👟' WHERE id = 'fl-cl-012';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-013', 'umbrella', 'cái ô, cái dù', 'flyers', 3, '/ʌmˈbrel.ə/', 'noun', 'It''s raining, take an umbrella with you.', 'Trời đang mưa, hãy mang theo ô.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '☂️' WHERE id = 'fl-cl-013';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-cl-014', 'uniform', 'đồng phục', 'flyers', 3, '/ˈjuː.nə.fɔːrm/', 'noun', 'Students have to wear a school uniform.', 'Học sinh phải mặc đồng phục trường.', 'english', 'flyers', 3, 'clothes', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🧑‍✈️' WHERE id = 'fl-cl-014';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-001', 'black', 'màu đen', 'starters', 1, '/blæk/', 'noun/adjective', 'She has a black cat.', 'Cô ấy có một con mèo đen.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '⬛' WHERE id = 'st-co-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-002', 'blue', 'màu xanh dương', 'starters', 1, '/bluː/', 'noun/adjective', 'The sky is blue today.', 'Bầu trời hôm nay có màu xanh dương.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🟦' WHERE id = 'st-co-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-003', 'brown', 'màu nâu', 'starters', 1, '/braʊn/', 'noun/adjective', 'The tree trunk is brown.', 'Thân cây có màu nâu.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🟫' WHERE id = 'st-co-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-004', 'colour', 'màu sắc (UK)', 'starters', 1, '/ˈkʌl.ɚ/', 'noun', 'What is your favourite colour?', 'Màu sắc yêu thích của bạn là gì?', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🎨' WHERE id = 'st-co-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-005', 'color', 'màu sắc (US)', 'starters', 1, '/ˈkʌl.ɚ/', 'noun', 'I like bright colors.', 'Tôi thích những màu sắc sặc sỡ.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🎨' WHERE id = 'st-co-005';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-006', 'gray', 'màu xám (US)', 'starters', 1, '/ɡreɪ/', 'noun/adjective', 'The clouds are gray.', 'Những đám mây có màu xám.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '⬜' WHERE id = 'st-co-006';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-007', 'grey', 'màu xám (UK)', 'starters', 1, '/ɡreɪ/', 'noun/adjective', 'He wears a grey shirt.', 'Anh ấy mặc một chiếc áo màu xám.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '⬜' WHERE id = 'st-co-007';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-008', 'green', 'màu xanh lá', 'starters', 1, '/ɡriːn/', 'noun/adjective', 'The grass is green.', 'Cỏ có màu xanh lá.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🟩' WHERE id = 'st-co-008';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-009', 'orange', 'màu cam', 'starters', 1, '/ˈɔːr.ɪndʒ/', 'noun/adjective', 'I have an orange T-shirt.', 'Tôi có một chiếc áo thun màu cam.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🟧' WHERE id = 'st-co-009';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-010', 'pink', 'màu hồng', 'starters', 1, '/pɪŋk/', 'noun/adjective', 'She loves her pink dress.', 'Cô ấy yêu chiếc váy màu hồng của mình.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🟪' WHERE id = 'st-co-010';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-011', 'purple', 'màu tím', 'starters', 1, '/ˈpɝː.pəl/', 'noun/adjective', 'Grapes can be green or purple.', 'Nho có thể có màu xanh lá hoặc màu tím.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🟪' WHERE id = 'st-co-011';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-012', 'red', 'màu đỏ', 'starters', 1, '/red/', 'noun/adjective', 'Apples are often red.', 'Những quả táo thường có màu đỏ.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🟥' WHERE id = 'st-co-012';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-013', 'white', 'màu trắng', 'starters', 1, '/waɪt/', 'noun/adjective', 'Snow is white.', 'Tuyết có màu trắng.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '⬜' WHERE id = 'st-co-013';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-co-014', 'yellow', 'màu vàng', 'starters', 1, '/ˈjel.oʊ/', 'noun/adjective', 'The sun is yellow.', 'Mặt trời có màu vàng.', 'english', 'starters', 1, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🟨' WHERE id = 'st-co-014';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-co-001', 'gold', 'màu vàng kim', 'flyers', 3, '/ɡoʊld/', 'noun/adjective', 'She wears a gold ring.', 'Cô ấy đeo một chiếc nhẫn vàng kim.', 'english', 'flyers', 3, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🥇' WHERE id = 'fl-co-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-co-002', 'silver', 'màu bạc', 'flyers', 3, '/ˈsɪl.vɚ/', 'noun/adjective', 'He drives a silver car.', 'Anh ấy lái một chiếc xe hơi màu bạc.', 'english', 'flyers', 3, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🥈' WHERE id = 'fl-co-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-co-003', 'spot', 'dấu chấm, đốm', 'flyers', 3, '/spɑːt/', 'noun', 'The dog has a black spot on its eye.', 'Con chó có một đốm đen trên mắt.', 'english', 'flyers', 3, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '⏺️' WHERE id = 'fl-co-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-co-004', 'spotted', 'có đốm', 'flyers', 3, '/ˈspɑː.t̬ɪd/', 'adjective', 'She wore a spotted dress.', 'Cô ấy đã mặc một chiếc váy có đốm.', 'english', 'flyers', 3, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🐆' WHERE id = 'fl-co-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-co-005', 'stripe', 'đường sọc', 'flyers', 3, '/straɪp/', 'noun', 'The zebra has black and white stripes.', 'Con ngựa vằn có những đường sọc đen và trắng.', 'english', 'flyers', 3, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🦓' WHERE id = 'fl-co-005';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-co-006', 'striped', 'có sọc', 'flyers', 3, '/straɪpt/', 'adjective', 'He is wearing a striped shirt.', 'Anh ấy đang mặc một chiếc áo sơ mi có sọc.', 'english', 'flyers', 3, 'colours', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  ipa = excluded.ipa,
  word_type = excluded.word_type,
  example_en = excluded.example_en,
  example_vi = excluded.example_vi,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
UPDATE vocabulary_bank SET emoji = '🦓' WHERE id = 'fl-co-006';

-- UPDATE ANIMALS TO MATCH THE PROVIDED IMAGE
UPDATE vocabulary_bank SET certificate = 'movers', cert_order = 2, group_tag = 'movers', level_order = 2 
WHERE topic = 'animals' AND word IN ('bat', 'dolphin', 'kangaroo', 'penguin', 'shark', 'whale');

-- And 'crocodile', 'jellyfish' are in 'flyers' in DB, but 'starters' in image
UPDATE vocabulary_bank SET certificate = 'starters', cert_order = 1, group_tag = 'starters', level_order = 1 
WHERE topic = 'animals' AND word IN ('crocodile', 'jellyfish');

-- Also, let's make sure group_tag matches certificate for all existing animals as requested:
UPDATE vocabulary_bank SET group_tag = certificate WHERE topic = 'animals';
