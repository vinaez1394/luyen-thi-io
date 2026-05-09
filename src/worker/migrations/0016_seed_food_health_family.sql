
-- Cập nhật vocabulary_bank với 2 chủ đề mới: food_drink, health
-- Group tag được set trùng với certificate (starters, movers, flyers) như yêu cầu

INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-001', 'apple', 'quả táo', 'starters', 1, '/ˈæp.əl/', 'noun', 'I eat an apple every day.', 'Tôi ăn một quả táo mỗi ngày.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍎' WHERE id = 'st-fd-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-002', 'banana', 'quả chuối', 'starters', 1, '/bəˈnæn.ə/', 'noun', 'Monkeys love to eat bananas.', 'Khỉ rất thích ăn chuối.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍌' WHERE id = 'st-fd-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-003', 'bean', 'hạt đậu', 'starters', 1, '/biːn/', 'noun', 'I had rice and beans for lunch.', 'Tôi đã ăn cơm và hạt đậu vào bữa trưa.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🫘' WHERE id = 'st-fd-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-004', 'bread', 'bánh mì', 'starters', 1, '/bred/', 'noun', 'I like to eat bread with butter.', 'Tôi thích ăn bánh mì với bơ.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍞' WHERE id = 'st-fd-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-005', 'breakfast', 'bữa sáng', 'starters', 1, '/ˈbrek.fəst/', 'noun', 'What did you have for breakfast?', 'Bạn đã ăn gì cho bữa sáng?', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍳' WHERE id = 'st-fd-005';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-006', 'burger', 'bánh kẹp thịt', 'starters', 1, '/ˈbɜː.ɡər/', 'noun', 'He ordered a chicken burger.', 'Anh ấy đã gọi một chiếc bánh kẹp thịt gà.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍔' WHERE id = 'st-fd-006';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-007', 'cake', 'bánh ngọt', 'starters', 1, '/keɪk/', 'noun', 'She baked a chocolate cake.', 'Cô ấy đã nướng một chiếc bánh sô-cô-la.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍰' WHERE id = 'st-fd-007';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-008', 'candy', 'kẹo (US)', 'starters', 1, '/ˈkæn.di/', 'noun', 'Eating too much candy is bad for your teeth.', 'Ăn quá nhiều kẹo không tốt cho răng của bạn.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍬' WHERE id = 'st-fd-008';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-009', 'carrot', 'củ cà rốt', 'starters', 1, '/ˈkær.ət/', 'noun', 'Rabbits eat carrots.', 'Những con thỏ ăn cà rốt.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥕' WHERE id = 'st-fd-009';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-010', 'chicken', 'thịt gà', 'starters', 1, '/ˈtʃɪk.ɪn/', 'noun', 'We are having roast chicken for dinner.', 'Chúng tôi sẽ ăn gà quay cho bữa tối.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍗' WHERE id = 'st-fd-010';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-011', 'chips', 'khoai tây chiên (US/UK)', 'starters', 1, '/tʃɪps/', 'noun', 'I bought a bag of chips.', 'Tôi đã mua một túi khoai tây chiên.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍟' WHERE id = 'st-fd-011';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-012', 'chocolate', 'sô-cô-la', 'starters', 1, '/ˈtʃɒk.lət/', 'noun', 'Do you like dark chocolate?', 'Bạn có thích sô-cô-la đen không?', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍫' WHERE id = 'st-fd-012';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-013', 'coconut', 'quả dừa', 'starters', 1, '/ˈkoʊ.kə.nʌt/', 'noun', 'I love drinking coconut water.', 'Tôi rất thích uống nước dừa.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥥' WHERE id = 'st-fd-013';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-014', 'dinner', 'bữa tối', 'starters', 1, '/ˈdɪn.ɚ/', 'noun', 'We had dinner at 7 PM.', 'Chúng tôi đã ăn tối lúc 7 giờ tối.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍽️' WHERE id = 'st-fd-014';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-015', 'drink', 'đồ uống / uống', 'starters', 1, '/drɪŋk/', 'noun/verb', 'What would you like to drink?', 'Bạn muốn uống gì?', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥤' WHERE id = 'st-fd-015';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-016', 'eat', 'ăn', 'starters', 1, '/iːt/', 'verb', 'I eat an apple every morning.', 'Tôi ăn một quả táo mỗi sáng.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍽️' WHERE id = 'st-fd-016';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-017', 'egg', 'quả trứng', 'starters', 1, '/eɡ/', 'noun', 'She boiled an egg for breakfast.', 'Cô ấy luộc một quả trứng cho bữa sáng.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥚' WHERE id = 'st-fd-017';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-018', 'fish', 'con cá / thịt cá', 'starters', 1, '/fɪʃ/', 'noun', 'Fish live in the water.', 'Cá sống dưới nước.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🐟' WHERE id = 'st-fd-018';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-019', 'food', 'thức ăn', 'starters', 1, '/fuːd/', 'noun', 'I love Italian food.', 'Tôi yêu thức ăn Ý.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍲' WHERE id = 'st-fd-019';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-020', 'fries', 'khoai tây chiên (US)', 'starters', 1, '/fraɪz/', 'noun', 'I''d like a burger and fries.', 'Tôi muốn một chiếc bánh mì kẹp thịt và khoai tây chiên.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍟' WHERE id = 'st-fd-020';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-021', 'fruit', 'trái cây', 'starters', 1, '/fruːt/', 'noun', 'Eat more fresh fruit.', 'Hãy ăn nhiều trái cây tươi hơn.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍎' WHERE id = 'st-fd-021';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-022', 'grape', 'quả nho', 'starters', 1, '/ɡreɪp/', 'noun', 'These grapes are very sweet.', 'Những quả nho này rất ngọt.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍇' WHERE id = 'st-fd-022';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-023', 'ice cream', 'kem', 'starters', 1, '/ˌaɪs ˈkriːm/', 'noun', 'He is eating vanilla ice cream.', 'Anh ấy đang ăn kem vani.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍦' WHERE id = 'st-fd-023';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-024', 'juice', 'nước ép', 'starters', 1, '/dʒuːs/', 'noun', 'I drink orange juice every morning.', 'Tôi uống nước cam ép mỗi sáng.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🧃' WHERE id = 'st-fd-024';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-025', 'kiwi', 'quả kiwi', 'starters', 1, '/ˈkiː.wiː/', 'noun', 'A kiwi is green inside.', 'Quả kiwi có màu xanh bên trong.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥝' WHERE id = 'st-fd-025';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-026', 'lemon', 'quả chanh tây', 'starters', 1, '/ˈlem.ən/', 'noun', 'Lemons are very sour.', 'Những quả chanh tây rất chua.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍋' WHERE id = 'st-fd-026';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-027', 'lemonade', 'nước chanh', 'starters', 1, '/ˌlem.əˈneɪd/', 'noun', 'She made cold lemonade for us.', 'Cô ấy đã pha nước chanh lạnh cho chúng tôi.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍋' WHERE id = 'st-fd-027';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-028', 'lime', 'quả chanh ta', 'starters', 1, '/laɪm/', 'noun', 'Add some lime juice to the soup.', 'Hãy vắt một chút nước chanh ta vào súp.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍋‍🟩' WHERE id = 'st-fd-028';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-029', 'lunch', 'bữa trưa', 'starters', 1, '/lʌntʃ/', 'noun', 'What did you bring for lunch?', 'Bạn mang theo món gì cho bữa trưa?', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍱' WHERE id = 'st-fd-029';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-030', 'mango', 'quả xoài', 'starters', 1, '/ˈmæŋ.ɡoʊ/', 'noun', 'This mango is very sweet and juicy.', 'Quả xoài này rất ngọt và mọng nước.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥭' WHERE id = 'st-fd-030';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-031', 'meat', 'thịt', 'starters', 1, '/miːt/', 'noun', 'I don''t eat meat, I am vegetarian.', 'Tôi không ăn thịt, tôi là người ăn chay.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥩' WHERE id = 'st-fd-031';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-032', 'meatballs', 'thịt viên', 'starters', 1, '/ˈmiːt.bɑːlz/', 'noun', 'We had spaghetti and meatballs.', 'Chúng tôi đã ăn mì Ý và thịt viên.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🧆' WHERE id = 'st-fd-032';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-033', 'milk', 'sữa', 'starters', 1, '/mɪlk/', 'noun', 'Drink a glass of milk before bed.', 'Hãy uống một ly sữa trước khi ngủ.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥛' WHERE id = 'st-fd-033';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-034', 'onion', 'củ hành', 'starters', 1, '/ˈʌn.jən/', 'noun', 'Chopping onions makes me cry.', 'Thái hành tây làm tôi rơi nước mắt.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🧅' WHERE id = 'st-fd-034';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-035', 'orange', 'quả cam', 'starters', 1, '/ˈɔːr.ɪndʒ/', 'noun', 'Oranges are full of vitamin C.', 'Cam chứa rất nhiều vitamin C.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍊' WHERE id = 'st-fd-035';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-036', 'pea', 'hạt đậu Hà Lan', 'starters', 1, '/piː/', 'noun', 'We had green peas with our dinner.', 'Chúng tôi ăn đậu Hà Lan xanh vào bữa tối.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🫛' WHERE id = 'st-fd-036';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-037', 'pear', 'quả lê', 'starters', 1, '/per/', 'noun', 'A pear is a sweet fruit.', 'Quả lê là một loại trái cây ngọt.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍐' WHERE id = 'st-fd-037';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-038', 'pie', 'bánh nướng', 'starters', 1, '/paɪ/', 'noun', 'My mom baked an apple pie.', 'Mẹ tôi đã nướng một chiếc bánh táo.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥧' WHERE id = 'st-fd-038';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-039', 'pineapple', 'quả dứa (khóm)', 'starters', 1, '/ˈpaɪnˌæp.əl/', 'noun', 'I like pineapple juice.', 'Tôi thích nước ép dứa.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍍' WHERE id = 'st-fd-039';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-040', 'potato', 'củ khoai tây', 'starters', 1, '/pəˈteɪ.toʊ/', 'noun', 'She made mashed potatoes.', 'Cô ấy đã làm món khoai tây nghiền.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥔' WHERE id = 'st-fd-040';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-041', 'rice', 'cơm, gạo', 'starters', 1, '/raɪs/', 'noun', 'Vietnamese people eat rice every day.', 'Người Việt Nam ăn cơm mỗi ngày.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍚' WHERE id = 'st-fd-041';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-042', 'sausage', 'xúc xích', 'starters', 1, '/ˈsɑː.sɪdʒ/', 'noun', 'He grilled a sausage for his hot dog.', 'Anh ấy đã nướng một cái xúc xích cho bánh hot dog của mình.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🌭' WHERE id = 'st-fd-042';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-043', 'sweet', 'kẹo (UK)', 'starters', 1, '/swiːt/', 'noun', 'She gave me a sweet.', 'Cô ấy đã cho tôi một chiếc kẹo.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍬' WHERE id = 'st-fd-043';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-044', 'tomato', 'quả cà chua', 'starters', 1, '/təˈmeɪ.toʊ/', 'noun', 'I put tomatoes in my salad.', 'Tôi cho cà chua vào món rau trộn của mình.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍅' WHERE id = 'st-fd-044';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-045', 'water', 'nước', 'starters', 1, '/ˈwɑː.t̬ɚ/', 'noun', 'Drink plenty of water.', 'Hãy uống nhiều nước.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '💧' WHERE id = 'st-fd-045';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('st-fd-046', 'watermelon', 'quả dưa hấu', 'starters', 1, '/ˈwɑː.t̬ɚˌmel.ən/', 'noun', 'Watermelon is my favorite summer fruit.', 'Dưa hấu là loại trái cây mùa hè yêu thích của tôi.', 'english', 'starters', 1, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍉' WHERE id = 'st-fd-046';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-001', 'bottle', 'cái chai', 'movers', 2, '/ˈbɑː.t̬əl/', 'noun', 'I bought a bottle of water.', 'Tôi đã mua một chai nước.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍾' WHERE id = 'mv-fd-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-002', 'bowl', 'cái bát, cái chén', 'movers', 2, '/boʊl/', 'noun', 'I ate a bowl of soup.', 'Tôi đã ăn một bát súp.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥣' WHERE id = 'mv-fd-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-003', 'cheese', 'phô mai', 'movers', 2, '/tʃiːz/', 'noun', 'Mice like to eat cheese.', 'Chuột rất thích ăn phô mai.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🧀' WHERE id = 'mv-fd-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-004', 'coffee', 'cà phê', 'movers', 2, '/ˈkɑː.fi/', 'noun', 'My father drinks coffee every morning.', 'Bố tôi uống cà phê mỗi buổi sáng.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '☕' WHERE id = 'mv-fd-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-005', 'cup', 'cái cốc', 'movers', 2, '/kʌp/', 'noun', 'Would you like a cup of tea?', 'Bạn có muốn một tách trà không?', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍵' WHERE id = 'mv-fd-005';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-006', 'glass', 'ly thủy tinh', 'movers', 2, '/ɡlæs/', 'noun', 'She drank a glass of milk.', 'Cô ấy đã uống một ly sữa.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥛' WHERE id = 'mv-fd-006';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-007', 'hungry', 'đói bụng', 'movers', 2, '/ˈhʌŋ.ɡri/', 'adjective', 'I am very hungry, let''s eat.', 'Tôi đang rất đói, chúng ta ăn thôi.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🤤' WHERE id = 'mv-fd-007';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-008', 'milkshake', 'sữa lắc', 'movers', 2, '/ˈmɪlk.ʃeɪk/', 'noun', 'He ordered a chocolate milkshake.', 'Anh ấy đã gọi một ly sữa lắc sô-cô-la.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥤' WHERE id = 'mv-fd-008';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-009', 'noodles', 'mì sợi', 'movers', 2, '/ˈnuː.dəlz/', 'noun', 'We ate noodles for lunch.', 'Chúng tôi đã ăn mì sợi vào bữa trưa.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍜' WHERE id = 'mv-fd-009';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-010', 'pancake', 'bánh kếp', 'movers', 2, '/ˈpæn.keɪk/', 'noun', 'I like pancakes with honey.', 'Tôi thích ăn bánh kếp với mật ong.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥞' WHERE id = 'mv-fd-010';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-011', 'pasta', 'mì Ý', 'movers', 2, '/ˈpɑː.stə/', 'noun', 'Pasta is a popular Italian dish.', 'Mì Ý là một món ăn phổ biến của nước Ý.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍝' WHERE id = 'mv-fd-011';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-012', 'picnic', 'chuyến dã ngoại', 'movers', 2, '/ˈpɪk.nɪk/', 'noun', 'We had a picnic in the park.', 'Chúng tôi đã có một chuyến dã ngoại trong công viên.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🧺' WHERE id = 'mv-fd-012';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-013', 'plate', 'cái đĩa', 'movers', 2, '/pleɪt/', 'noun', 'Put the food on the plate.', 'Hãy đặt thức ăn lên đĩa.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍽️' WHERE id = 'mv-fd-013';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-014', 'salad', 'món rau trộn', 'movers', 2, '/ˈsæl.əd/', 'noun', 'I made a healthy salad.', 'Tôi đã làm một món rau trộn tốt cho sức khỏe.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥗' WHERE id = 'mv-fd-014';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-015', 'sandwich', 'bánh kẹp', 'movers', 2, '/ˈsæn.wɪtʃ/', 'noun', 'He ate a cheese sandwich.', 'Anh ấy đã ăn một chiếc bánh mì kẹp phô mai.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥪' WHERE id = 'mv-fd-015';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-016', 'sauce', 'nước sốt', 'movers', 2, '/sɑːs/', 'noun', 'Put some tomato sauce on the pasta.', 'Hãy cho một ít nước sốt cà chua lên mì Ý.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥫' WHERE id = 'mv-fd-016';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-017', 'soup', 'món súp', 'movers', 2, '/suːp/', 'noun', 'Chicken soup is good when you are sick.', 'Súp gà rất tốt khi bạn bị ốm.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍲' WHERE id = 'mv-fd-017';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-018', 'tea', 'trà', 'movers', 2, '/tiː/', 'noun', 'Would you like a cup of green tea?', 'Bạn có muốn một tách trà xanh không?', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍵' WHERE id = 'mv-fd-018';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-019', 'thirsty', 'khát nước', 'movers', 2, '/ˈθɝː.sti/', 'adjective', 'I am thirsty, I need some water.', 'Tôi đang khát nước, tôi cần uống nước.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥵' WHERE id = 'mv-fd-019';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-fd-020', 'vegetable', 'rau củ', 'movers', 2, '/ˈvedʒ.tə.bəl/', 'noun', 'Carrots are a type of vegetable.', 'Cà rốt là một loại rau củ.', 'english', 'movers', 2, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥦' WHERE id = 'mv-fd-020';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-001', 'biscuit', 'bánh quy (UK)', 'flyers', 3, '/ˈbɪs.kɪt/', 'noun', 'I had a chocolate biscuit with my tea.', 'Tôi đã ăn một chiếc bánh quy sô-cô-la cùng với trà.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍪' WHERE id = 'fl-fd-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-002', 'butter', 'bơ', 'flyers', 3, '/ˈbʌt̬.ɚ/', 'noun', 'Spread some butter on the bread.', 'Hãy phết một ít bơ lên bánh mì.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🧈' WHERE id = 'fl-fd-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-003', 'cereal', 'ngũ cốc', 'flyers', 3, '/ˈsɪr.i.əl/', 'noun', 'I eat cereal with milk every morning.', 'Tôi ăn ngũ cốc với sữa mỗi sáng.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥣' WHERE id = 'fl-fd-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-004', 'chopsticks', 'đôi đũa', 'flyers', 3, '/ˈtʃɑːp.stɪks/', 'noun', 'Can you eat with chopsticks?', 'Bạn có biết ăn bằng đũa không?', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥢' WHERE id = 'fl-fd-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-005', 'cookie', 'bánh quy (US)', 'flyers', 3, '/ˈkʊk.i/', 'noun', 'She baked some chocolate chip cookies.', 'Cô ấy đã nướng vài chiếc bánh quy sô-cô-la chip.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍪' WHERE id = 'fl-fd-005';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-006', 'flour', 'bột mì', 'flyers', 3, '/flaʊr/', 'noun', 'We need flour to make a cake.', 'Chúng ta cần bột mì để làm bánh.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🌾' WHERE id = 'fl-fd-006';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-007', 'fork', 'cái nĩa', 'flyers', 3, '/fɔːrk/', 'noun', 'Use a fork to eat your salad.', 'Hãy dùng một chiếc nĩa để ăn món rau trộn của bạn.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍴' WHERE id = 'fl-fd-007';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-008', 'honey', 'mật ong', 'flyers', 3, '/ˈhʌn.i/', 'noun', 'Bees make sweet honey.', 'Những con ong tạo ra mật ong ngọt ngào.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍯' WHERE id = 'fl-fd-008';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-009', 'jam', 'mứt', 'flyers', 3, '/dʒæm/', 'noun', 'I like strawberry jam on my toast.', 'Tôi thích mứt dâu tây ăn kèm bánh mì nướng.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍓' WHERE id = 'fl-fd-009';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-010', 'knife', 'con dao', 'flyers', 3, '/naɪf/', 'noun', 'Be careful with that sharp knife.', 'Hãy cẩn thận với con dao sắc đó.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🔪' WHERE id = 'fl-fd-010';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-011', 'meal', 'bữa ăn', 'flyers', 3, '/miːl/', 'noun', 'Dinner is my favourite meal of the day.', 'Bữa tối là bữa ăn yêu thích nhất trong ngày của tôi.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍽️' WHERE id = 'fl-fd-011';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-012', 'olives', 'quả ô-liu', 'flyers', 3, '/ˈɑː.lɪvz/', 'noun', 'I put green olives on my pizza.', 'Tôi cho những quả ô-liu xanh lên bánh pizza của mình.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🫒' WHERE id = 'fl-fd-012';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-013', 'pepper', 'hạt tiêu', 'flyers', 3, '/ˈpep.ɚ/', 'noun', 'Do you want salt and pepper on your food?', 'Bạn có muốn thêm muối và hạt tiêu vào thức ăn không?', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🧂' WHERE id = 'fl-fd-013';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-014', 'piece', 'mẩu, miếng', 'flyers', 3, '/piːs/', 'noun', 'Can I have a piece of cake?', 'Cho tôi một miếng bánh ngọt nhé?', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍰' WHERE id = 'fl-fd-014';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-015', 'pizza', 'bánh pizza', 'flyers', 3, '/ˈpiːt.sə/', 'noun', 'We ordered a large cheese pizza.', 'Chúng tôi đã gọi một chiếc pizza phô mai lớn.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍕' WHERE id = 'fl-fd-015';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-016', 'salt', 'muối', 'flyers', 3, '/sɑːlt/', 'noun', 'The soup needs a little more salt.', 'Món súp cần thêm một chút muối.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🧂' WHERE id = 'fl-fd-016';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-017', 'smell', 'ngửi / mùi hương', 'flyers', 3, '/smel/', 'verb/noun', 'The flowers smell very nice.', 'Những bông hoa tỏa mùi hương rất thơm.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '👃' WHERE id = 'fl-fd-017';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-018', 'snack', 'món ăn nhẹ', 'flyers', 3, '/snæk/', 'noun', 'I always have a snack in the afternoon.', 'Tôi luôn có một bữa ăn nhẹ vào buổi chiều.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥨' WHERE id = 'fl-fd-018';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-019', 'spoon', 'cái thìa', 'flyers', 3, '/spuːn/', 'noun', 'You eat soup with a spoon.', 'Bạn dùng thìa để ăn súp.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥄' WHERE id = 'fl-fd-019';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-020', 'strawberry', 'quả dâu tây', 'flyers', 3, '/ˈstrɑːˌber.i/', 'noun', 'She loves strawberry ice cream.', 'Cô ấy thích kem dâu tây.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍓' WHERE id = 'fl-fd-020';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-021', 'sugar', 'đường', 'flyers', 3, '/ˈʃʊɡ.ɚ/', 'noun', 'Do you put sugar in your tea?', 'Bạn có cho đường vào trà không?', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🍚' WHERE id = 'fl-fd-021';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-022', 'taste', 'nếm / hương vị', 'flyers', 3, '/teɪst/', 'verb/noun', 'This soup tastes delicious.', 'Món súp này có vị rất ngon.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '👅' WHERE id = 'fl-fd-022';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-fd-023', 'yoghurt', 'sữa chua', 'flyers', 3, '/ˈjoʊ.ɡɚt/', 'noun', 'I eat a bowl of yoghurt every day.', 'Tôi ăn một bát sữa chua mỗi ngày.', 'english', 'flyers', 3, 'food_drink', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥣' WHERE id = 'fl-fd-023';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-001', 'cold', 'cảm lạnh', 'movers', 2, '/koʊld/', 'noun', 'He caught a cold because of the rain.', 'Anh ấy bị cảm lạnh vì đi mưa.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🤧' WHERE id = 'mv-hl-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-002', 'cough', 'ho', 'movers', 2, '/kɑːf/', 'verb/noun', 'She has a bad cough.', 'Cô ấy bị ho rất nặng.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🗣️' WHERE id = 'mv-hl-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-003', 'cry', 'khóc', 'movers', 2, '/kraɪ/', 'verb', 'The baby is crying because he is hungry.', 'Đứa bé đang khóc vì đói.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '😭' WHERE id = 'mv-hl-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-004', 'dentist', 'nha sĩ', 'movers', 2, '/ˈden.tɪst/', 'noun', 'You should visit the dentist twice a year.', 'Bạn nên đến khám nha sĩ hai lần một năm.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🦷' WHERE id = 'mv-hl-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-005', 'doctor', 'bác sĩ', 'movers', 2, '/ˈdɑːk.tɚ/', 'noun', 'The doctor gave me some medicine.', 'Bác sĩ đã đưa cho tôi một ít thuốc.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🩺' WHERE id = 'mv-hl-005';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-006', 'earache', 'đau tai', 'movers', 2, '/ˈɪr.eɪk/', 'noun', 'I have a terrible earache today.', 'Hôm nay tôi bị đau tai khủng khiếp.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '👂' WHERE id = 'mv-hl-006';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-007', 'fall', 'ngã, rơi', 'movers', 2, '/fɑːl/', 'verb', 'Be careful not to fall down the stairs.', 'Hãy cẩn thận đừng để ngã xuống cầu thang.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🤕' WHERE id = 'mv-hl-007';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-008', 'fine', 'tốt, khỏe', 'movers', 2, '/faɪn/', 'adjective', 'I was sick, but now I feel fine.', 'Tôi đã bị ốm, nhưng bây giờ tôi cảm thấy khỏe rồi.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '😊' WHERE id = 'mv-hl-008';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-009', 'headache', 'đau đầu', 'movers', 2, '/ˈhed.eɪk/', 'noun', 'I have a headache because of the loud noise.', 'Tôi bị đau đầu vì tiếng ồn lớn.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🤕' WHERE id = 'mv-hl-009';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-010', 'hospital', 'bệnh viện', 'movers', 2, '/ˈhɑː.spɪ.t̬əl/', 'noun', 'They took him to the hospital.', 'Họ đã đưa anh ấy đến bệnh viện.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🏥' WHERE id = 'mv-hl-010';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-011', 'ill', 'ốm, bệnh', 'movers', 2, '/ɪl/', 'adjective', 'She cannot go to school because she is ill.', 'Cô ấy không thể đến trường vì cô ấy bị ốm.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🤒' WHERE id = 'mv-hl-011';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-012', 'matter', 'vấn đề', 'movers', 2, '/ˈmæt̬.ɚ/', 'noun', 'What is the matter with you?', 'Có chuyện gì xảy ra với bạn vậy?', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '❓' WHERE id = 'mv-hl-012';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-013', 'nurse', 'y tá', 'movers', 2, '/nɝːs/', 'noun', 'The nurse helped the doctor.', 'Y tá đã giúp đỡ bác sĩ.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '👩‍⚕️' WHERE id = 'mv-hl-013';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-014', 'sick', 'ốm, bệnh', 'movers', 2, '/sɪk/', 'adjective', 'He felt sick after eating too much.', 'Anh ấy cảm thấy buồn nôn sau khi ăn quá nhiều.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🤢' WHERE id = 'mv-hl-014';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-015', 'stomach-ache', 'đau bụng', 'movers', 2, '/ˈstʌm.ək.eɪk/', 'noun', 'Eating too much candy gives you a stomach-ache.', 'Ăn quá nhiều kẹo làm cho bạn bị đau bụng.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🤰' WHERE id = 'mv-hl-015';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-016', 'temperature', 'nhiệt độ, sốt', 'movers', 2, '/ˈtem.pɚ.ə.tʃɚ/', 'noun', 'You have a high temperature.', 'Bạn đang bị sốt cao.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🌡️' WHERE id = 'mv-hl-016';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-017', 'tired', 'mệt mỏi', 'movers', 2, '/taɪrd/', 'adjective', 'I am very tired after a long walk.', 'Tôi rất mệt mỏi sau một chuyến đi bộ dài.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🥱' WHERE id = 'mv-hl-017';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('mv-hl-018', 'toothache', 'đau răng', 'movers', 2, '/ˈtuːθ.eɪk/', 'noun', 'I have a toothache, I need to see a dentist.', 'Tôi bị đau răng, tôi cần đi khám nha sĩ.', 'english', 'movers', 2, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🦷' WHERE id = 'mv-hl-018';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-hl-001', 'bandage', 'băng gạc', 'flyers', 3, '/ˈbæn.dɪdʒ/', 'noun', 'The nurse put a bandage on my finger.', 'Y tá đã quấn một miếng băng gạc lên ngón tay tôi.', 'english', 'flyers', 3, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🩹' WHERE id = 'fl-hl-001';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-hl-002', 'chemist', 'hiệu thuốc / dược sĩ', 'flyers', 3, '/ˈkem.ɪst/', 'noun', 'I bought some medicine at the chemist.', 'Tôi đã mua vài viên thuốc ở hiệu thuốc.', 'english', 'flyers', 3, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '💊' WHERE id = 'fl-hl-002';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-hl-003', 'cut', 'vết cắt', 'flyers', 3, '/kʌt/', 'noun', 'I have a small cut on my hand.', 'Tôi có một vết cắt nhỏ trên tay.', 'english', 'flyers', 3, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '✂️' WHERE id = 'fl-hl-003';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-hl-004', 'fall over', 'ngã lộn nhào', 'flyers', 3, '/fɑːl ˈoʊ.vɚ/', 'verb', 'He tripped and fell over.', 'Anh ấy bị vấp và ngã lộn nhào.', 'english', 'flyers', 3, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🤸' WHERE id = 'fl-hl-004';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-hl-005', 'medicine', 'thuốc', 'flyers', 3, '/ˈmed.ɪ.sən/', 'noun', 'Take this medicine twice a day.', 'Hãy uống loại thuốc này hai lần một ngày.', 'english', 'flyers', 3, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '💊' WHERE id = 'fl-hl-005';
INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('fl-hl-006', 'x-ray', 'chụp X-quang', 'flyers', 3, '/ˈeks.reɪ/', 'noun', 'The doctor needs an x-ray of your arm.', 'Bác sĩ cần chụp phim X-quang cánh tay của bạn.', 'english', 'flyers', 3, 'health', 'medium')
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
UPDATE vocabulary_bank SET emoji = '🩻' WHERE id = 'fl-hl-006';

-- UPDATE FAMILY TOPIC TO MATCH group_tag with certificate
UPDATE vocabulary_bank SET group_tag = certificate WHERE topic = 'family';
