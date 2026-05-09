
-- Cập nhật vocabulary_bank với 4 chủ đề mới: home, materials, places_directions, school
-- Group tag được set trùng với certificate (starters, movers, flyers)
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-001', 'apartment', '(nghĩa của apartment)', 'starters', 1, '/apartment/', 'noun', 'This is a apartment.', 'Đây là một apartment.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-002', 'armchair', '(nghĩa của armchair)', 'starters', 1, '/armchair/', 'noun', 'This is a armchair.', 'Đây là một armchair.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-003', 'bath', '(nghĩa của bath)', 'starters', 1, '/bath/', 'noun', 'This is a bath.', 'Đây là một bath.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-004', 'bathroom', '(nghĩa của bathroom)', 'starters', 1, '/bathroom/', 'noun', 'This is a bathroom.', 'Đây là một bathroom.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-005', 'bed', '(nghĩa của bed)', 'starters', 1, '/bed/', 'noun', 'This is a bed.', 'Đây là một bed.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-006', 'bedroom', '(nghĩa của bedroom)', 'starters', 1, '/bedroom/', 'noun', 'This is a bedroom.', 'Đây là một bedroom.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-007', 'bookcase', '(nghĩa của bookcase)', 'starters', 1, '/bookcase/', 'noun', 'This is a bookcase.', 'Đây là một bookcase.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-008', 'box', '(nghĩa của box)', 'starters', 1, '/box/', 'noun', 'This is a box.', 'Đây là một box.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-009', 'camera', '(nghĩa của camera)', 'starters', 1, '/camera/', 'noun', 'This is a camera.', 'Đây là một camera.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-010', 'chair', '(nghĩa của chair)', 'starters', 1, '/chair/', 'noun', 'This is a chair.', 'Đây là một chair.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-011', 'clock', '(nghĩa của clock)', 'starters', 1, '/clock/', 'noun', 'This is a clock.', 'Đây là một clock.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-012', 'computer', '(nghĩa của computer)', 'starters', 1, '/computer/', 'noun', 'This is a computer.', 'Đây là một computer.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-013', 'cupboard', '(nghĩa của cupboard)', 'starters', 1, '/cupboard/', 'noun', 'This is a cupboard.', 'Đây là một cupboard.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-014', 'desk', '(nghĩa của desk)', 'starters', 1, '/desk/', 'noun', 'This is a desk.', 'Đây là một desk.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-015', 'dining room', '(nghĩa của dining room)', 'starters', 1, '/dining room/', 'noun', 'This is a dining room.', 'Đây là một dining room.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-016', 'doll', '(nghĩa của doll)', 'starters', 1, '/doll/', 'noun', 'This is a doll.', 'Đây là một doll.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-017', 'door', '(nghĩa của door)', 'starters', 1, '/door/', 'noun', 'This is a door.', 'Đây là một door.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-018', 'flat', '(nghĩa của flat)', 'starters', 1, '/flat/', 'noun', 'This is a flat.', 'Đây là một flat.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-019', 'flower', '(nghĩa của flower)', 'starters', 1, '/flower/', 'noun', 'This is a flower.', 'Đây là một flower.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-020', 'garden', '(nghĩa của garden)', 'starters', 1, '/garden/', 'noun', 'This is a garden.', 'Đây là một garden.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-021', 'hall', '(nghĩa của hall)', 'starters', 1, '/hall/', 'noun', 'This is a hall.', 'Đây là một hall.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-022', 'home', '(nghĩa của home)', 'starters', 1, '/home/', 'noun', 'This is a home.', 'Đây là một home.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-023', 'house', '(nghĩa của house)', 'starters', 1, '/house/', 'noun', 'This is a house.', 'Đây là một house.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-024', 'kitchen', '(nghĩa của kitchen)', 'starters', 1, '/kitchen/', 'noun', 'This is a kitchen.', 'Đây là một kitchen.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-025', 'lamp', '(nghĩa của lamp)', 'starters', 1, '/lamp/', 'noun', 'This is a lamp.', 'Đây là một lamp.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-026', 'living room', '(nghĩa của living room)', 'starters', 1, '/living room/', 'noun', 'This is a living room.', 'Đây là một living room.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-027', 'mat', '(nghĩa của mat)', 'starters', 1, '/mat/', 'noun', 'This is a mat.', 'Đây là một mat.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-028', 'mirror', '(nghĩa của mirror)', 'starters', 1, '/mirror/', 'noun', 'This is a mirror.', 'Đây là một mirror.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-029', 'phone', '(nghĩa của phone)', 'starters', 1, '/phone/', 'noun', 'This is a phone.', 'Đây là một phone.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-030', 'picture', '(nghĩa của picture)', 'starters', 1, '/picture/', 'noun', 'This is a picture.', 'Đây là một picture.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-031', 'radio', '(nghĩa của radio)', 'starters', 1, '/radio/', 'noun', 'This is a radio.', 'Đây là một radio.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-032', 'room', '(nghĩa của room)', 'starters', 1, '/room/', 'noun', 'This is a room.', 'Đây là một room.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-033', 'rug', '(nghĩa của rug)', 'starters', 1, '/rug/', 'noun', 'This is a rug.', 'Đây là một rug.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-034', 'sleep', '(nghĩa của sleep)', 'starters', 1, '/sleep/', 'noun', 'This is a sleep.', 'Đây là một sleep.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-035', 'sofa', '(nghĩa của sofa)', 'starters', 1, '/sofa/', 'noun', 'This is a sofa.', 'Đây là một sofa.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-036', 'table', '(nghĩa của table)', 'starters', 1, '/table/', 'noun', 'This is a table.', 'Đây là một table.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-037', 'television', '(nghĩa của television)', 'starters', 1, '/television/', 'noun', 'This is a television.', 'Đây là một television.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-038', 'toy', '(nghĩa của toy)', 'starters', 1, '/toy/', 'noun', 'This is a toy.', 'Đây là một toy.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-039', 'tree', '(nghĩa của tree)', 'starters', 1, '/tree/', 'noun', 'This is a tree.', 'Đây là một tree.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-040', 'TV', '(nghĩa của TV)', 'starters', 1, '/TV/', 'noun', 'This is a TV.', 'Đây là một TV.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-041', 'wall', '(nghĩa của wall)', 'starters', 1, '/wall/', 'noun', 'This is a wall.', 'Đây là một wall.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-042', 'watch', '(nghĩa của watch)', 'starters', 1, '/watch/', 'noun', 'This is a watch.', 'Đây là một watch.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ho-043', 'window', '(nghĩa của window)', 'starters', 1, '/window/', 'noun', 'This is a window.', 'Đây là một window.', 'english', 'starters', 1, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-001', 'address', '(nghĩa của address)', 'movers', 2, '/address/', 'noun', 'This is a address.', 'Đây là một address.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-002', 'balcony', '(nghĩa của balcony)', 'movers', 2, '/balcony/', 'noun', 'This is a balcony.', 'Đây là một balcony.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-003', 'basement', '(nghĩa của basement)', 'movers', 2, '/basement/', 'noun', 'This is a basement.', 'Đây là một basement.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-004', 'blanket', '(nghĩa của blanket)', 'movers', 2, '/blanket/', 'noun', 'This is a blanket.', 'Đây là một blanket.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-005', 'downstairs', '(nghĩa của downstairs)', 'movers', 2, '/downstairs/', 'noun', 'This is a downstairs.', 'Đây là một downstairs.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-006', 'dream', '(nghĩa của dream)', 'movers', 2, '/dream/', 'noun', 'This is a dream.', 'Đây là một dream.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-007', 'elevator', '(nghĩa của elevator)', 'movers', 2, '/elevator/', 'noun', 'This is a elevator.', 'Đây là một elevator.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-008', 'floor', '(nghĩa của floor)', 'movers', 2, '/floor/', 'noun', 'This is a floor.', 'Đây là một floor.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-009', 'internet', '(nghĩa của internet)', 'movers', 2, '/internet/', 'noun', 'This is a internet.', 'Đây là một internet.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-010', 'lift', '(nghĩa của lift)', 'movers', 2, '/lift/', 'noun', 'This is a lift.', 'Đây là một lift.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-011', 'message', '(nghĩa của message)', 'movers', 2, '/message/', 'noun', 'This is a message.', 'Đây là một message.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-012', 'roof', '(nghĩa của roof)', 'movers', 2, '/roof/', 'noun', 'This is a roof.', 'Đây là một roof.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-013', 'seat', '(nghĩa của seat)', 'movers', 2, '/seat/', 'noun', 'This is a seat.', 'Đây là một seat.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-014', 'shower', '(nghĩa của shower)', 'movers', 2, '/shower/', 'noun', 'This is a shower.', 'Đây là một shower.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-015', 'stairs', '(nghĩa của stairs)', 'movers', 2, '/stairs/', 'noun', 'This is a stairs.', 'Đây là một stairs.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-016', 'toothbrush', '(nghĩa của toothbrush)', 'movers', 2, '/toothbrush/', 'noun', 'This is a toothbrush.', 'Đây là một toothbrush.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-017', 'toothpaste', '(nghĩa của toothpaste)', 'movers', 2, '/toothpaste/', 'noun', 'This is a toothpaste.', 'Đây là một toothpaste.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-018', 'towel', '(nghĩa của towel)', 'movers', 2, '/towel/', 'noun', 'This is a towel.', 'Đây là một towel.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-019', 'upstairs', '(nghĩa của upstairs)', 'movers', 2, '/upstairs/', 'noun', 'This is a upstairs.', 'Đây là một upstairs.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-ho-020', 'wash', '(nghĩa của wash)', 'movers', 2, '/wash/', 'noun', 'This is a wash.', 'Đây là một wash.', 'english', 'movers', 2, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-001', 'brush', '(nghĩa của brush)', 'flyers', 3, '/brush/', 'noun', 'This is a brush.', 'Đây là một brush.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-002', 'comb', '(nghĩa của comb)', 'flyers', 3, '/comb/', 'noun', 'This is a comb.', 'Đây là một comb.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-003', 'cooker', '(nghĩa của cooker)', 'flyers', 3, '/cooker/', 'noun', 'This is a cooker.', 'Đây là một cooker.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-004', 'cushion', '(nghĩa của cushion)', 'flyers', 3, '/cushion/', 'noun', 'This is a cushion.', 'Đây là một cushion.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-005', 'diary', '(nghĩa của diary)', 'flyers', 3, '/diary/', 'noun', 'This is a diary.', 'Đây là một diary.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-006', 'entrance', '(nghĩa của entrance)', 'flyers', 3, '/entrance/', 'noun', 'This is a entrance.', 'Đây là một entrance.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-007', 'envelope', '(nghĩa của envelope)', 'flyers', 3, '/envelope/', 'noun', 'This is a envelope.', 'Đây là một envelope.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-008', 'fridge', '(nghĩa của fridge)', 'flyers', 3, '/fridge/', 'noun', 'This is a fridge.', 'Đây là một fridge.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-009', 'gate', '(nghĩa của gate)', 'flyers', 3, '/gate/', 'noun', 'This is a gate.', 'Đây là một gate.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-010', 'key', '(nghĩa của key)', 'flyers', 3, '/key/', 'noun', 'This is a key.', 'Đây là một key.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-011', 'letter', '(nghĩa của letter)', 'flyers', 3, '/letter/', 'noun', 'This is a letter.', 'Đây là một letter.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-012', 'oven', '(nghĩa của oven)', 'flyers', 3, '/oven/', 'noun', 'This is a oven.', 'Đây là một oven.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-013', 'screen', '(nghĩa của screen)', 'flyers', 3, '/screen/', 'noun', 'This is a screen.', 'Đây là một screen.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-014', 'shampoo', '(nghĩa của shampoo)', 'flyers', 3, '/shampoo/', 'noun', 'This is a shampoo.', 'Đây là một shampoo.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-015', 'shelf', '(nghĩa của shelf)', 'flyers', 3, '/shelf/', 'noun', 'This is a shelf.', 'Đây là một shelf.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-016', 'soap', '(nghĩa của soap)', 'flyers', 3, '/soap/', 'noun', 'This is a soap.', 'Đây là một soap.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-017', 'stamp', '(nghĩa của stamp)', 'flyers', 3, '/stamp/', 'noun', 'This is a stamp.', 'Đây là một stamp.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-018', 'step', '(nghĩa của step)', 'flyers', 3, '/step/', 'noun', 'This is a step.', 'Đây là một step.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-019', 'swing', '(nghĩa của swing)', 'flyers', 3, '/swing/', 'noun', 'This is a swing.', 'Đây là một swing.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ho-020', 'telephone', '(nghĩa của telephone)', 'flyers', 3, '/telephone/', 'noun', 'This is a telephone.', 'Đây là một telephone.', 'english', 'flyers', 3, 'home', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-ma-001', 'paper', '(nghĩa của paper)', 'starters', 1, '/paper/', 'noun', 'This is a paper.', 'Đây là một paper.', 'english', 'starters', 1, 'materials', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ma-001', 'card', '(nghĩa của card)', 'flyers', 3, '/card/', 'noun', 'This is a card.', 'Đây là một card.', 'english', 'flyers', 3, 'materials', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ma-002', 'glass', '(nghĩa của glass)', 'flyers', 3, '/glass/', 'noun', 'This is a glass.', 'Đây là một glass.', 'english', 'flyers', 3, 'materials', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ma-003', 'gold', '(nghĩa của gold)', 'flyers', 3, '/gold/', 'noun', 'This is a gold.', 'Đây là một gold.', 'english', 'flyers', 3, 'materials', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ma-004', 'metal', '(nghĩa của metal)', 'flyers', 3, '/metal/', 'noun', 'This is a metal.', 'Đây là một metal.', 'english', 'flyers', 3, 'materials', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ma-005', 'plastic', '(nghĩa của plastic)', 'flyers', 3, '/plastic/', 'noun', 'This is a plastic.', 'Đây là một plastic.', 'english', 'flyers', 3, 'materials', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ma-006', 'silver', '(nghĩa của silver)', 'flyers', 3, '/silver/', 'noun', 'This is a silver.', 'Đây là một silver.', 'english', 'flyers', 3, 'materials', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ma-007', 'wood', '(nghĩa của wood)', 'flyers', 3, '/wood/', 'noun', 'This is a wood.', 'Đây là một wood.', 'english', 'flyers', 3, 'materials', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-ma-008', 'wool', '(nghĩa của wool)', 'flyers', 3, '/wool/', 'noun', 'This is a wool.', 'Đây là một wool.', 'english', 'flyers', 3, 'materials', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-001', 'behind', '(nghĩa của behind)', 'starters', 1, '/behind/', 'preposition', 'This is a behind.', 'Đây là một behind.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-002', 'between', '(nghĩa của between)', 'starters', 1, '/between/', 'preposition', 'This is a between.', 'Đây là một between.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-003', 'bookshop', '(nghĩa của bookshop)', 'starters', 1, '/bookshop/', 'noun', 'This is a bookshop.', 'Đây là một bookshop.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-004', 'end', '(nghĩa của end)', 'starters', 1, '/end/', 'noun', 'This is a end.', 'Đây là một end.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-005', 'here', '(nghĩa của here)', 'starters', 1, '/here/', 'noun', 'This is a here.', 'Đây là một here.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-006', 'in', '(nghĩa của in)', 'starters', 1, '/in/', 'preposition', 'This is a in.', 'Đây là một in.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-007', 'in front of', '(nghĩa của in front of)', 'starters', 1, '/in front of/', 'noun', 'This is a in front of.', 'Đây là một in front of.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-008', 'on', '(nghĩa của on)', 'starters', 1, '/on/', 'preposition', 'This is a on.', 'Đây là một on.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-009', 'park', '(nghĩa của park)', 'starters', 1, '/park/', 'noun', 'This is a park.', 'Đây là một park.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-010', 'playground', '(nghĩa của playground)', 'starters', 1, '/playground/', 'noun', 'This is a playground.', 'Đây là một playground.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-011', 'shop', '(nghĩa của shop)', 'starters', 1, '/shop/', 'noun', 'This is a shop.', 'Đây là một shop.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-012', 'store', '(nghĩa của store)', 'starters', 1, '/store/', 'noun', 'This is a store.', 'Đây là một store.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-013', 'street', '(nghĩa của street)', 'starters', 1, '/street/', 'noun', 'This is a street.', 'Đây là một street.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-014', 'there', '(nghĩa của there)', 'starters', 1, '/there/', 'noun', 'This is a there.', 'Đây là một there.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-015', 'under', '(nghĩa của under)', 'starters', 1, '/under/', 'preposition', 'This is a under.', 'Đây là một under.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-pd-016', 'zoo', '(nghĩa của zoo)', 'starters', 1, '/zoo/', 'noun', 'This is a zoo.', 'Đây là một zoo.', 'english', 'starters', 1, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-001', 'above', '(nghĩa của above)', 'movers', 2, '/above/', 'preposition', 'This is a above.', 'Đây là một above.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-002', 'below', '(nghĩa của below)', 'movers', 2, '/below/', 'preposition', 'This is a below.', 'Đây là một below.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-003', 'building', '(nghĩa của building)', 'movers', 2, '/building/', 'noun', 'This is a building.', 'Đây là một building.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-004', 'bus station', '(nghĩa của bus station)', 'movers', 2, '/bus station/', 'noun', 'This is a bus station.', 'Đây là một bus station.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-005', 'bus stop', '(nghĩa của bus stop)', 'movers', 2, '/bus stop/', 'noun', 'This is a bus stop.', 'Đây là một bus stop.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-006', 'café', '(nghĩa của café)', 'movers', 2, '/café/', 'noun', 'This is a café.', 'Đây là một café.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-007', 'car park', '(nghĩa của car park)', 'movers', 2, '/car park/', 'noun', 'This is a car park.', 'Đây là một car park.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-008', 'centre', '(nghĩa của centre)', 'movers', 2, '/centre/', 'noun', 'This is a centre.', 'Đây là một centre.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-009', 'cinema', '(nghĩa của cinema)', 'movers', 2, '/cinema/', 'noun', 'This is a cinema.', 'Đây là một cinema.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-010', 'circle', '(nghĩa của circle)', 'movers', 2, '/circle/', 'noun', 'This is a circle.', 'Đây là một circle.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-011', 'circus', '(nghĩa của circus)', 'movers', 2, '/circus/', 'noun', 'This is a circus.', 'Đây là một circus.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-012', 'city centre', '(nghĩa của city centre)', 'movers', 2, '/city centre/', 'noun', 'This is a city centre.', 'Đây là một city centre.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-013', 'farm', '(nghĩa của farm)', 'movers', 2, '/farm/', 'noun', 'This is a farm.', 'Đây là một farm.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-014', 'funfair', '(nghĩa của funfair)', 'movers', 2, '/funfair/', 'noun', 'This is a funfair.', 'Đây là một funfair.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-015', 'hospital', '(nghĩa của hospital)', 'movers', 2, '/hospital/', 'noun', 'This is a hospital.', 'Đây là một hospital.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-016', 'library', '(nghĩa của library)', 'movers', 2, '/library/', 'noun', 'This is a library.', 'Đây là một library.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-017', 'map', '(nghĩa của map)', 'movers', 2, '/map/', 'noun', 'This is a map.', 'Đây là một map.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-018', 'market', '(nghĩa của market)', 'movers', 2, '/market/', 'noun', 'This is a market.', 'Đây là một market.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-019', 'near', '(nghĩa của near)', 'movers', 2, '/near/', 'preposition', 'This is a near.', 'Đây là một near.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-020', 'opposite', '(nghĩa của opposite)', 'movers', 2, '/opposite/', 'preposition', 'This is a opposite.', 'Đây là một opposite.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-021', 'place', '(nghĩa của place)', 'movers', 2, '/place/', 'noun', 'This is a place.', 'Đây là một place.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-022', 'shopping centre', '(nghĩa của shopping centre)', 'movers', 2, '/shopping centre/', 'noun', 'This is a shopping centre.', 'Đây là một shopping centre.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-023', 'sports centre', '(nghĩa của sports centre)', 'movers', 2, '/sports centre/', 'noun', 'This is a sports centre.', 'Đây là một sports centre.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-024', 'square', '(nghĩa của square)', 'movers', 2, '/square/', 'noun', 'This is a square.', 'Đây là một square.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-025', 'station', '(nghĩa của station)', 'movers', 2, '/station/', 'noun', 'This is a station.', 'Đây là một station.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-026', 'straight', '(nghĩa của straight)', 'movers', 2, '/straight/', 'noun', 'This is a straight.', 'Đây là một straight.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-027', 'supermarket', '(nghĩa của supermarket)', 'movers', 2, '/supermarket/', 'noun', 'This is a supermarket.', 'Đây là một supermarket.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-028', 'swimming pool', '(nghĩa của swimming pool)', 'movers', 2, '/swimming pool/', 'noun', 'This is a swimming pool.', 'Đây là một swimming pool.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-pd-029', 'town centre', '(nghĩa của town centre)', 'movers', 2, '/town centre/', 'noun', 'This is a town centre.', 'Đây là một town centre.', 'english', 'movers', 2, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-001', 'airport', '(nghĩa của airport)', 'flyers', 3, '/airport/', 'noun', 'This is a airport.', 'Đây là một airport.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-002', 'bank', '(nghĩa của bank)', 'flyers', 3, '/bank/', 'noun', 'This is a bank.', 'Đây là một bank.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-003', 'bridge', '(nghĩa của bridge)', 'flyers', 3, '/bridge/', 'noun', 'This is a bridge.', 'Đây là một bridge.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-004', 'castle', '(nghĩa của castle)', 'flyers', 3, '/castle/', 'noun', 'This is a castle.', 'Đây là một castle.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-005', 'chemist', '(nghĩa của chemist)', 'flyers', 3, '/chemist/', 'noun', 'This is a chemist.', 'Đây là một chemist.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-006', 'club', '(nghĩa của club)', 'flyers', 3, '/club/', 'noun', 'This is a club.', 'Đây là một club.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-007', 'college', '(nghĩa của college)', 'flyers', 3, '/college/', 'noun', 'This is a college.', 'Đây là một college.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-008', 'corner', '(nghĩa của corner)', 'flyers', 3, '/corner/', 'noun', 'This is a corner.', 'Đây là một corner.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-009', 'east', '(nghĩa của east)', 'flyers', 3, '/east/', 'preposition', 'This is a east.', 'Đây là một east.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-010', 'factory', '(nghĩa của factory)', 'flyers', 3, '/factory/', 'noun', 'This is a factory.', 'Đây là một factory.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-011', 'fire station', '(nghĩa của fire station)', 'flyers', 3, '/fire station/', 'noun', 'This is a fire station.', 'Đây là một fire station.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-012', 'front', '(nghĩa của front)', 'flyers', 3, '/front/', 'preposition', 'This is a front.', 'Đây là một front.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-013', 'get to', '(nghĩa của get to)', 'flyers', 3, '/get to/', 'noun', 'This is a get to.', 'Đây là một get to.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-014', 'hotel', '(nghĩa của hotel)', 'flyers', 3, '/hotel/', 'noun', 'This is a hotel.', 'Đây là một hotel.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-015', 'kilometre', '(nghĩa của kilometre)', 'flyers', 3, '/kilometre/', 'noun', 'This is a kilometre.', 'Đây là một kilometre.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-016', 'left', '(nghĩa của left)', 'flyers', 3, '/left/', 'preposition', 'This is a left.', 'Đây là một left.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-017', 'London', '(nghĩa của London)', 'flyers', 3, '/London/', 'noun', 'This is a London.', 'Đây là một London.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-018', 'middle', '(nghĩa của middle)', 'flyers', 3, '/middle/', 'noun', 'This is a middle.', 'Đây là một middle.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-019', 'museum', '(nghĩa của museum)', 'flyers', 3, '/museum/', 'noun', 'This is a museum.', 'Đây là một museum.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-020', 'north', '(nghĩa của north)', 'flyers', 3, '/north/', 'preposition', 'This is a north.', 'Đây là một north.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-021', 'over', '(nghĩa của over)', 'flyers', 3, '/over/', 'preposition', 'This is a over.', 'Đây là một over.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-022', 'path', '(nghĩa của path)', 'flyers', 3, '/path/', 'noun', 'This is a path.', 'Đây là một path.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-023', 'police station', '(nghĩa của police station)', 'flyers', 3, '/police station/', 'noun', 'This is a police station.', 'Đây là một police station.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-024', 'post office', '(nghĩa của post office)', 'flyers', 3, '/post office/', 'noun', 'This is a post office.', 'Đây là một post office.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-025', 'restaurant', '(nghĩa của restaurant)', 'flyers', 3, '/restaurant/', 'noun', 'This is a restaurant.', 'Đây là một restaurant.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-026', 'right', '(nghĩa của right)', 'flyers', 3, '/right/', 'preposition', 'This is a right.', 'Đây là một right.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-027', 'skyscraper', '(nghĩa của skyscraper)', 'flyers', 3, '/skyscraper/', 'noun', 'This is a skyscraper.', 'Đây là một skyscraper.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-028', 'south', '(nghĩa của south)', 'flyers', 3, '/south/', 'preposition', 'This is a south.', 'Đây là một south.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-029', 'stadium', '(nghĩa của stadium)', 'flyers', 3, '/stadium/', 'noun', 'This is a stadium.', 'Đây là một stadium.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-030', 'straight on', '(nghĩa của straight on)', 'flyers', 3, '/straight on/', 'noun', 'This is a straight on.', 'Đây là một straight on.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-031', 'theatre', '(nghĩa của theatre)', 'flyers', 3, '/theatre/', 'noun', 'This is a theatre.', 'Đây là một theatre.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-032', 'university', '(nghĩa của university)', 'flyers', 3, '/university/', 'noun', 'This is a university.', 'Đây là một university.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-033', 'way', '(nghĩa của way)', 'flyers', 3, '/way/', 'noun', 'This is a way.', 'Đây là một way.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-pd-034', 'west', '(nghĩa của west)', 'flyers', 3, '/west/', 'preposition', 'This is a west.', 'Đây là một west.', 'english', 'flyers', 3, 'places_directions', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-001', 'alphabet', '(nghĩa của alphabet)', 'starters', 1, '/alphabet/', 'noun', 'This is a alphabet.', 'Đây là một alphabet.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-002', 'answer', '(nghĩa của answer)', 'starters', 1, '/answer/', 'verb', 'This is a answer.', 'Đây là một answer.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-003', 'ask', '(nghĩa của ask)', 'starters', 1, '/ask/', 'verb', 'This is a ask.', 'Đây là một ask.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-004', 'board', '(nghĩa của board)', 'starters', 1, '/board/', 'noun', 'This is a board.', 'Đây là một board.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-005', 'book', '(nghĩa của book)', 'starters', 1, '/book/', 'noun', 'This is a book.', 'Đây là một book.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-006', 'bookcase', '(nghĩa của bookcase)', 'starters', 1, '/bookcase/', 'noun', 'This is a bookcase.', 'Đây là một bookcase.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-007', 'class', '(nghĩa của class)', 'starters', 1, '/class/', 'noun', 'This is a class.', 'Đây là một class.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-008', 'classroom', '(nghĩa của classroom)', 'starters', 1, '/classroom/', 'noun', 'This is a classroom.', 'Đây là một classroom.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-009', 'close', '(nghĩa của close)', 'starters', 1, '/close/', 'verb', 'This is a close.', 'Đây là một close.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-010', 'colour', '(nghĩa của colour)', 'starters', 1, '/colour/', 'noun', 'This is a colour.', 'Đây là một colour.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-011', 'computer', '(nghĩa của computer)', 'starters', 1, '/computer/', 'noun', 'This is a computer.', 'Đây là một computer.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-012', 'correct', '(nghĩa của correct)', 'starters', 1, '/correct/', 'noun', 'This is a correct.', 'Đây là một correct.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-013', 'crayon', '(nghĩa của crayon)', 'starters', 1, '/crayon/', 'noun', 'This is a crayon.', 'Đây là một crayon.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-014', 'cross', '(nghĩa của cross)', 'starters', 1, '/cross/', 'noun', 'This is a cross.', 'Đây là một cross.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-015', 'cupboard', '(nghĩa của cupboard)', 'starters', 1, '/cupboard/', 'noun', 'This is a cupboard.', 'Đây là một cupboard.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-016', 'desk', '(nghĩa của desk)', 'starters', 1, '/desk/', 'noun', 'This is a desk.', 'Đây là một desk.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-017', 'door', '(nghĩa của door)', 'starters', 1, '/door/', 'noun', 'This is a door.', 'Đây là một door.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-018', 'draw', '(nghĩa của draw)', 'starters', 1, '/draw/', 'verb', 'This is a draw.', 'Đây là một draw.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-019', 'English', '(nghĩa của English)', 'starters', 1, '/English/', 'noun', 'This is a English.', 'Đây là một English.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-020', 'eraser', '(nghĩa của eraser)', 'starters', 1, '/eraser/', 'noun', 'This is a eraser.', 'Đây là một eraser.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-021', 'example', '(nghĩa của example)', 'starters', 1, '/example/', 'noun', 'This is a example.', 'Đây là một example.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-022', 'find', '(nghĩa của find)', 'starters', 1, '/find/', 'verb', 'This is a find.', 'Đây là một find.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-023', 'floor', '(nghĩa của floor)', 'starters', 1, '/floor/', 'noun', 'This is a floor.', 'Đây là một floor.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-024', 'keyboard', '(nghĩa của keyboard)', 'starters', 1, '/keyboard/', 'noun', 'This is a keyboard.', 'Đây là một keyboard.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-025', 'learn', '(nghĩa của learn)', 'starters', 1, '/learn/', 'verb', 'This is a learn.', 'Đây là một learn.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-026', 'lesson', '(nghĩa của lesson)', 'starters', 1, '/lesson/', 'noun', 'This is a lesson.', 'Đây là một lesson.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-027', 'letter', '(nghĩa của letter)', 'starters', 1, '/letter/', 'noun', 'This is a letter.', 'Đây là một letter.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-028', 'line', '(nghĩa của line)', 'starters', 1, '/line/', 'noun', 'This is a line.', 'Đây là một line.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-029', 'listen', '(nghĩa của listen)', 'starters', 1, '/listen/', 'verb', 'This is a listen.', 'Đây là một listen.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-030', 'look', '(nghĩa của look)', 'starters', 1, '/look/', 'verb', 'This is a look.', 'Đây là một look.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-031', 'mouse', '(nghĩa của mouse)', 'starters', 1, '/mouse/', 'noun', 'This is a mouse.', 'Đây là một mouse.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-032', 'music', '(nghĩa của music)', 'starters', 1, '/music/', 'noun', 'This is a music.', 'Đây là một music.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-033', 'number', '(nghĩa của number)', 'starters', 1, '/number/', 'noun', 'This is a number.', 'Đây là một number.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-034', 'open', '(nghĩa của open)', 'starters', 1, '/open/', 'verb', 'This is a open.', 'Đây là một open.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-035', 'page', '(nghĩa của page)', 'starters', 1, '/page/', 'noun', 'This is a page.', 'Đây là một page.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-036', 'painting', '(nghĩa của painting)', 'starters', 1, '/painting/', 'noun', 'This is a painting.', 'Đây là một painting.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-037', 'paper', '(nghĩa của paper)', 'starters', 1, '/paper/', 'noun', 'This is a paper.', 'Đây là một paper.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-038', 'part', '(nghĩa của part)', 'starters', 1, '/part/', 'noun', 'This is a part.', 'Đây là một part.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-039', 'pen', '(nghĩa của pen)', 'starters', 1, '/pen/', 'noun', 'This is a pen.', 'Đây là một pen.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-040', 'pencil', '(nghĩa của pencil)', 'starters', 1, '/pencil/', 'noun', 'This is a pencil.', 'Đây là một pencil.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-041', 'picture', '(nghĩa của picture)', 'starters', 1, '/picture/', 'noun', 'This is a picture.', 'Đây là một picture.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-042', 'playground', '(nghĩa của playground)', 'starters', 1, '/playground/', 'noun', 'This is a playground.', 'Đây là một playground.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-043', 'poster', '(nghĩa của poster)', 'starters', 1, '/poster/', 'noun', 'This is a poster.', 'Đây là một poster.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-044', 'question', '(nghĩa của question)', 'starters', 1, '/question/', 'noun', 'This is a question.', 'Đây là một question.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-045', 'read', '(nghĩa của read)', 'starters', 1, '/read/', 'verb', 'This is a read.', 'Đây là một read.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-046', 'right', '(nghĩa của right)', 'starters', 1, '/right/', 'noun', 'This is a right.', 'Đây là một right.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-047', 'rubber', '(nghĩa của rubber)', 'starters', 1, '/rubber/', 'noun', 'This is a rubber.', 'Đây là một rubber.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-048', 'ruler', '(nghĩa của ruler)', 'starters', 1, '/ruler/', 'noun', 'This is a ruler.', 'Đây là một ruler.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-049', 'school', '(nghĩa của school)', 'starters', 1, '/school/', 'noun', 'This is a school.', 'Đây là một school.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-050', 'sentence', '(nghĩa của sentence)', 'starters', 1, '/sentence/', 'noun', 'This is a sentence.', 'Đây là một sentence.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-051', 'sit', '(nghĩa của sit)', 'starters', 1, '/sit/', 'verb', 'This is a sit.', 'Đây là một sit.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-052', 'spell', '(nghĩa của spell)', 'starters', 1, '/spell/', 'verb', 'This is a spell.', 'Đây là một spell.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-053', 'stand', '(nghĩa của stand)', 'starters', 1, '/stand/', 'verb', 'This is a stand.', 'Đây là một stand.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-054', 'story', '(nghĩa của story)', 'starters', 1, '/story/', 'noun', 'This is a story.', 'Đây là một story.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-055', 'teacher', '(nghĩa của teacher)', 'starters', 1, '/teacher/', 'noun', 'This is a teacher.', 'Đây là một teacher.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-056', 'tell', '(nghĩa của tell)', 'starters', 1, '/tell/', 'verb', 'This is a tell.', 'Đây là một tell.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-057', 'tick', '(nghĩa của tick)', 'starters', 1, '/tick/', 'noun', 'This is a tick.', 'Đây là một tick.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-058', 'understand', '(nghĩa của understand)', 'starters', 1, '/understand/', 'verb', 'This is a understand.', 'Đây là một understand.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-059', 'wall', '(nghĩa của wall)', 'starters', 1, '/wall/', 'noun', 'This is a wall.', 'Đây là một wall.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-060', 'window', '(nghĩa của window)', 'starters', 1, '/window/', 'noun', 'This is a window.', 'Đây là một window.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-061', 'word', '(nghĩa của word)', 'starters', 1, '/word/', 'noun', 'This is a word.', 'Đây là một word.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-sc-062', 'write', '(nghĩa của write)', 'starters', 1, '/write/', 'verb', 'This is a write.', 'Đây là một write.', 'english', 'starters', 1, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sc-001', 'break', '(nghĩa của break)', 'movers', 2, '/break/', 'noun', 'This is a break.', 'Đây là một break.', 'english', 'movers', 2, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sc-002', 'homework', '(nghĩa của homework)', 'movers', 2, '/homework/', 'noun', 'This is a homework.', 'Đây là một homework.', 'english', 'movers', 2, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sc-003', 'mistake', '(nghĩa của mistake)', 'movers', 2, '/mistake/', 'noun', 'This is a mistake.', 'Đây là một mistake.', 'english', 'movers', 2, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sc-004', 'teach', '(nghĩa của teach)', 'movers', 2, '/teach/', 'verb', 'This is a teach.', 'Đây là một teach.', 'english', 'movers', 2, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sc-005', 'text', '(nghĩa của text)', 'movers', 2, '/text/', 'noun', 'This is a text.', 'Đây là một text.', 'english', 'movers', 2, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-sc-006', 'website', '(nghĩa của website)', 'movers', 2, '/website/', 'noun', 'This is a website.', 'Đây là một website.', 'english', 'movers', 2, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-001', 'art', '(nghĩa của art)', 'flyers', 3, '/art/', 'noun', 'This is a art.', 'Đây là một art.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-002', 'backpack', '(nghĩa của backpack)', 'flyers', 3, '/backpack/', 'noun', 'This is a backpack.', 'Đây là một backpack.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-003', 'bin', '(nghĩa của bin)', 'flyers', 3, '/bin/', 'noun', 'This is a bin.', 'Đây là một bin.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-004', 'club', '(nghĩa của club)', 'flyers', 3, '/club/', 'noun', 'This is a club.', 'Đây là một club.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-005', 'college', '(nghĩa của college)', 'flyers', 3, '/college/', 'noun', 'This is a college.', 'Đây là một college.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-006', 'competition', '(nghĩa của competition)', 'flyers', 3, '/competition/', 'noun', 'This is a competition.', 'Đây là một competition.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-007', 'dictionary', '(nghĩa của dictionary)', 'flyers', 3, '/dictionary/', 'noun', 'This is a dictionary.', 'Đây là một dictionary.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-008', 'flag', '(nghĩa của flag)', 'flyers', 3, '/flag/', 'noun', 'This is a flag.', 'Đây là một flag.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-009', 'geography', '(nghĩa của geography)', 'flyers', 3, '/geography/', 'noun', 'This is a geography.', 'Đây là một geography.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-010', 'glue', '(nghĩa của glue)', 'flyers', 3, '/glue/', 'noun', 'This is a glue.', 'Đây là một glue.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-011', 'group', '(nghĩa của group)', 'flyers', 3, '/group/', 'noun', 'This is a group.', 'Đây là một group.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-012', 'gym', '(nghĩa của gym)', 'flyers', 3, '/gym/', 'noun', 'This is a gym.', 'Đây là một gym.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-013', 'history', '(nghĩa của history)', 'flyers', 3, '/history/', 'noun', 'This is a history.', 'Đây là một history.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-014', 'language', '(nghĩa của language)', 'flyers', 3, '/language/', 'noun', 'This is a language.', 'Đây là một language.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-015', 'maths', '(nghĩa của maths)', 'flyers', 3, '/maths/', 'noun', 'This is a maths.', 'Đây là một maths.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-016', 'online', '(nghĩa của online)', 'flyers', 3, '/online/', 'noun', 'This is a online.', 'Đây là một online.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-017', 'project', '(nghĩa của project)', 'flyers', 3, '/project/', 'noun', 'This is a project.', 'Đây là một project.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-018', 'rucksack', '(nghĩa của rucksack)', 'flyers', 3, '/rucksack/', 'noun', 'This is a rucksack.', 'Đây là một rucksack.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-019', 'science', '(nghĩa của science)', 'flyers', 3, '/science/', 'noun', 'This is a science.', 'Đây là một science.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-020', 'scissors', '(nghĩa của scissors)', 'flyers', 3, '/scissors/', 'noun', 'This is a scissors.', 'Đây là một scissors.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-021', 'screen', '(nghĩa của screen)', 'flyers', 3, '/screen/', 'noun', 'This is a screen.', 'Đây là một screen.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-022', 'shelf', '(nghĩa của shelf)', 'flyers', 3, '/shelf/', 'noun', 'This is a shelf.', 'Đây là một shelf.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-023', 'student', '(nghĩa của student)', 'flyers', 3, '/student/', 'noun', 'This is a student.', 'Đây là một student.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-024', 'study', '(nghĩa của study)', 'flyers', 3, '/study/', 'noun', 'This is a study.', 'Đây là một study.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-025', 'subject', '(nghĩa của subject)', 'flyers', 3, '/subject/', 'noun', 'This is a subject.', 'Đây là một subject.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-026', 'timetable', '(nghĩa của timetable)', 'flyers', 3, '/timetable/', 'noun', 'This is a timetable.', 'Đây là một timetable.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-sc-027', 'university', '(nghĩa của university)', 'flyers', 3, '/university/', 'noun', 'This is a university.', 'Đây là một university.', 'english', 'flyers', 3, 'school', 'medium')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic;
