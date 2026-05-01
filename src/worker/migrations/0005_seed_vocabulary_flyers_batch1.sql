-- ============================================================
-- Migration: 0005_seed_vocabulary_flyers_batch1.sql
-- Kho từ vựng Cambridge A2 Flyers — BATCH 1/3
-- Topics: Animals | Body | Clothes | Food & Drink | Health | Home (part)
-- Source: Cambridge Young Learners English Wordlist (A2 Flyers)
-- Generated: 2026-04-30 | Sprint 1 — 80 words
-- ============================================================

CREATE TABLE IF NOT EXISTS vocabulary_bank (
  id              TEXT PRIMARY KEY,
  word            TEXT NOT NULL,
  translation_vi  TEXT NOT NULL,
  ipa             TEXT,
  word_type       TEXT,
  example_en      TEXT,
  example_vi      TEXT,
  subject         TEXT NOT NULL DEFAULT 'english',
  group_tag       TEXT NOT NULL DEFAULT 'flyers',
  level_order     INTEGER NOT NULL DEFAULT 3,
  topic           TEXT,
  difficulty      TEXT DEFAULT 'medium',
  game_hangman    INTEGER DEFAULT 1,
  game_flashcard  INTEGER DEFAULT 1,
  game_choice     INTEGER DEFAULT 1,
  is_active       INTEGER DEFAULT 1,
  created_at      INTEGER DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_vocab_group   ON vocabulary_bank(group_tag, level_order);
CREATE INDEX IF NOT EXISTS idx_vocab_subject ON vocabulary_bank(subject, difficulty);
CREATE INDEX IF NOT EXISTS idx_vocab_topic   ON vocabulary_bank(topic);

-- ── ANIMALS (20 từ) ─────────────────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-an-001','bat','con dơi','/bæt/','noun','A bat sleeps during the day.','Con dơi ngủ vào ban ngày.','animals','medium',1),
('fl-an-002','butterfly','con bướm','/ˈbʌtəflaɪ/','noun','The butterfly has colourful wings.','Con bướm có đôi cánh đầy màu sắc.','animals','medium',1),
('fl-an-003','camel','con lạc đà','/ˈkæməl/','noun','A camel can walk across the desert.','Con lạc đà có thể đi qua sa mạc.','animals','medium',1),
('fl-an-004','cheetah','con báo săn','/ˈtʃiːtə/','noun','The cheetah is the fastest animal.','Con báo săn là động vật nhanh nhất.','animals','hard',1),
('fl-an-005','crab','con cua','/kræb/','noun','We saw a crab on the beach.','Chúng tôi thấy một con cua trên bãi biển.','animals','easy',1),
('fl-an-006','crocodile','con cá sấu','/ˈkrɒkədaɪl/','noun','The crocodile lives near the river.','Con cá sấu sống gần sông.','animals','medium',1),
('fl-an-007','deer','con hươu','/dɪə/','noun','A deer ran into the forest.','Con hươu chạy vào rừng.','animals','easy',1),
('fl-an-008','dolphin','con cá heo','/ˈdɒlfɪn/','noun','Dolphins are very clever animals.','Cá heo là động vật rất thông minh.','animals','medium',1),
('fl-an-009','eagle','con đại bàng','/ˈiːɡəl/','noun','An eagle can fly very high.','Con đại bàng có thể bay rất cao.','animals','medium',1),
('fl-an-010','flamingo','chim hồng hạc','/fləˈmɪŋɡoʊ/','noun','Flamingos are pink birds.','Hồng hạc là loài chim màu hồng.','animals','hard',1),
('fl-an-011','gorilla','con khỉ đột','/ɡəˈrɪlə/','noun','The gorilla lives in the jungle.','Con khỉ đột sống trong rừng nhiệt đới.','animals','hard',1),
('fl-an-012','jellyfish','con sứa','/ˈdʒelɪfɪʃ/','noun','Do not touch a jellyfish!','Đừng chạm vào con sứa!','animals','medium',1),
('fl-an-013','kangaroo','con chuột túi','/ˌkæŋɡəˈruː/','noun','Kangaroos live in Australia.','Chuột túi sống ở Úc.','animals','medium',1),
('fl-an-014','octopus','con bạch tuộc','/ˈɒktəpəs/','noun','An octopus has eight arms.','Bạch tuộc có tám xúc tu.','animals','medium',1),
('fl-an-015','parrot','con vẹt','/ˈpærət/','noun','The parrot can repeat words.','Con vẹt có thể nhắc lại các từ.','animals','medium',1),
('fl-an-016','penguin','chim cánh cụt','/ˈpeŋɡwɪn/','noun','Penguins live near the South Pole.','Chim cánh cụt sống gần Nam Cực.','animals','medium',1),
('fl-an-017','shark','con cá mập','/ʃɑːk/','noun','I saw a shark in the ocean.','Tôi thấy con cá mập trong đại dương.','animals','easy',1),
('fl-an-018','swan','con thiên nga','/swɒn/','noun','The swan swam across the lake.','Con thiên nga bơi qua hồ.','animals','easy',1),
('fl-an-019','whale','con cá voi','/weɪl/','noun','Blue whales are the biggest animals.','Cá voi xanh là động vật lớn nhất.','animals','easy',1),
('fl-an-020','wolf','con sói','/wʊlf/','noun','Wolves live in groups called packs.','Sói sống thành bầy đàn.','animals','easy',1);

-- ── BODY (12 từ) ─────────────────────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-bd-001','ankle','mắt cá chân','/ˈæŋkəl/','noun','I hurt my ankle playing football.','Tôi bị đau mắt cá chân khi chơi bóng.','body','medium',1),
('fl-bd-002','beard','râu','/bɪəd/','noun','My grandfather has a long beard.','Ông tôi có bộ râu dài.','body','easy',1),
('fl-bd-003','chin','cằm','/tʃɪn/','noun','She has a small chin.','Cô ấy có cái cằm nhỏ.','body','easy',1),
('fl-bd-004','elbow','khuỷu tay','/ˈelbəʊ/','noun','He bumped his elbow on the table.','Anh ấy va khuỷu tay vào bàn.','body','medium',1),
('fl-bd-005','forehead','trán','/ˈfɔːhed/','noun','She touched her forehead because she felt hot.','Cô ấy chạm vào trán vì cảm thấy nóng.','body','medium',1),
('fl-bd-006','heel','gót chân','/hiːl/','noun','My heel hurts from walking too much.','Gót chân tôi đau vì đi bộ quá nhiều.','body','easy',1),
('fl-bd-007','hip','hông','/hɪp/','noun','She put her hands on her hips.','Cô ấy đặt tay lên hông.','body','easy',1),
('fl-bd-008','knee','đầu gối','/niː/','noun','I fell and hurt my knee.','Tôi ngã và đau đầu gối.','body','easy',1),
('fl-bd-009','shoulder','vai','/ˈʃəʊldə/','noun','He has broad shoulders.','Anh ấy có đôi vai rộng.','body','medium',1),
('fl-bd-010','stomach','dạ dày','/ˈstʌmək/','noun','My stomach hurts after eating too much.','Dạ dày tôi đau sau khi ăn quá nhiều.','body','medium',1),
('fl-bd-011','thumb','ngón tay cái','/θʌm/','noun','She gave a thumbs up.','Cô ấy giơ ngón cái lên.','body','easy',1),
('fl-bd-012','wrist','cổ tay','/rɪst/','noun','She wore a bracelet on her wrist.','Cô ấy đeo vòng ở cổ tay.','body','easy',1);

-- ── CLOTHES (12 từ) ──────────────────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-cl-001','belt','thắt lưng','/belt/','noun','He wears a leather belt.','Anh ấy đeo thắt lưng da.','clothes','easy',1),
('fl-cl-002','boots','ủng','/buːts/','noun','She wears boots in winter.','Cô ấy đi ủng vào mùa đông.','clothes','easy',1),
('fl-cl-003','cap','mũ lưỡi trai','/kæp/','noun','He wore a cap to protect from the sun.','Anh ấy đội mũ để tránh nắng.','clothes','easy',1),
('fl-cl-004','coat','áo khoác dài','/kəʊt/','noun','Put on your coat. It is cold outside.','Mặc áo khoác vào. Bên ngoài lạnh.','clothes','easy',1),
('fl-cl-005','gloves','găng tay','/ɡlʌvz/','noun','Do not forget your gloves in winter!','Đừng quên găng tay vào mùa đông!','clothes','medium',1),
('fl-cl-006','helmet','mũ bảo hiểm','/ˈhelmɪt/','noun','Always wear a helmet when cycling.','Luôn đội mũ bảo hiểm khi đạp xe.','clothes','medium',1),
('fl-cl-007','jacket','áo khoác','/ˈdʒækɪt/','noun','She wore a red jacket.','Cô ấy mặc áo khoác màu đỏ.','clothes','medium',1),
('fl-cl-008','pyjamas','đồ ngủ','/pəˈdʒɑːməz/','noun','I put on my pyjamas before bed.','Tôi mặc đồ ngủ trước khi đi ngủ.','clothes','hard',1),
('fl-cl-009','raincoat','áo mưa','/ˈreɪnkəʊt/','noun','Take your raincoat. It might rain.','Mang áo mưa đi. Trời có thể mưa.','clothes','medium',1),
('fl-cl-010','scarf','khăn quàng cổ','/skɑːf/','noun','She wore a warm scarf.','Cô ấy quàng khăn ấm.','clothes','easy',1),
('fl-cl-011','uniform','đồng phục','/ˈjuːnɪfɔːm/','noun','Students wear a uniform at school.','Học sinh mặc đồng phục ở trường.','clothes','medium',1),
('fl-cl-012','rucksack','ba lô cỡ lớn','/ˈrʌksæk/','noun','He carried a heavy rucksack.','Anh ấy mang một chiếc ba lô nặng.','clothes','hard',1);

-- ── FOOD AND DRINK (20 từ) ───────────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-fd-001','chopsticks','đũa','/ˈtʃɒpstɪks/','noun','She ate rice with chopsticks.','Cô ấy ăn cơm bằng đũa.','food','medium',1),
('fl-fd-002','cream','kem tươi','/kriːm/','noun','She put cream on the cake.','Cô ấy phết kem lên bánh.','food','easy',1),
('fl-fd-003','dessert','món tráng miệng','/dɪˈzɜːt/','noun','What would you like for dessert?','Bạn muốn dùng món tráng miệng gì?','food','medium',1),
('fl-fd-004','diet','chế độ ăn uống','/ˈdaɪət/','noun','She has a healthy diet.','Cô ấy có chế độ ăn uống lành mạnh.','food','medium',1),
('fl-fd-005','dish','món ăn','/dɪʃ/','noun','This is a traditional dish.','Đây là một món ăn truyền thống.','food','easy',1),
('fl-fd-006','fridge','tủ lạnh','/frɪdʒ/','noun','Put the milk in the fridge.','Để sữa vào tủ lạnh.','food','medium',1),
('fl-fd-007','honey','mật ong','/ˈhʌni/','noun','I like honey in my tea.','Tôi thích mật ong trong trà.','food','medium',1),
('fl-fd-008','jam','mứt trái cây','/dʒæm/','noun','She spread jam on her toast.','Cô ấy phết mứt lên bánh mì nướng.','food','easy',1),
('fl-fd-009','jug','bình rót nước','/dʒʌɡ/','noun','There is a jug of water on the table.','Có một bình nước trên bàn.','food','easy',1),
('fl-fd-010','kettle','ấm đun nước','/ˈketəl/','noun','Boil the kettle to make tea.','Đun ấm nước để pha trà.','food','medium',1),
('fl-fd-011','menu','thực đơn','/ˈmenjuː/','noun','Can I see the menu, please?','Cho tôi xem thực đơn được không?','food','medium',1),
('fl-fd-012','pepper','tiêu','/ˈpepə/','noun','Add a little pepper to the soup.','Thêm một ít tiêu vào súp.','food','medium',1),
('fl-fd-013','recipe','công thức nấu ăn','/ˈresɪpi/','noun','She followed the recipe carefully.','Cô ấy làm theo công thức cẩn thận.','food','hard',1),
('fl-fd-014','sausage','xúc xích','/ˈsɒsɪdʒ/','noun','We had sausages for breakfast.','Chúng tôi ăn xúc xích vào bữa sáng.','food','medium',1),
('fl-fd-015','spoon','cái thìa','/spuːn/','noun','Stir the soup with a spoon.','Khuấy súp bằng thìa.','food','easy',1),
('fl-fd-016','sugar','đường','/ˈʃʊɡə/','noun','Do not put too much sugar in tea.','Đừng cho quá nhiều đường vào trà.','food','medium',1),
('fl-fd-017','taste','vị / nếm','/teɪst/','verb','This soup tastes delicious!','Món súp này có vị ngon tuyệt!','food','easy',1),
('fl-fd-018','tray','cái khay','/treɪ/','noun','The waiter carried the tray carefully.','Người phục vụ bưng khay cẩn thận.','food','easy',1),
('fl-fd-019','vegetarian','người ăn chay / chay','/ˌvedʒɪˈteəriən/','adj','She is vegetarian.','Cô ấy ăn chay.','food','hard',1),
('fl-fd-020','waiter','người phục vụ','/ˈweɪtə/','noun','The waiter brought our food.','Người phục vụ mang thức ăn đến.','food','medium',1);

-- ── HEALTH (10 từ) ───────────────────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-hl-001','accident','tai nạn','/ˈæksɪdənt/','noun','There was an accident on the road.','Có một vụ tai nạn trên đường.','health','medium',1),
('fl-hl-002','ambulance','xe cứu thương','/ˈæmbjʊləns/','noun','Call an ambulance quickly!','Gọi xe cứu thương nhanh lên!','health','hard',1),
('fl-hl-003','bandage','băng bó','/ˈbændɪdʒ/','noun','The nurse put a bandage on his arm.','Y tá băng cánh tay của anh ấy.','health','medium',1),
('fl-hl-004','cough','ho','/kɒf/','verb','He has a bad cough.','Anh ấy bị ho nặng.','health','easy',1),
('fl-hl-005','fever','cơn sốt','/ˈfiːvə/','noun','She has a high fever.','Cô ấy bị sốt cao.','health','medium',1),
('fl-hl-006','headache','đau đầu','/ˈhedeɪk/','noun','I have a terrible headache.','Tôi bị đau đầu rất nặng.','health','medium',1),
('fl-hl-007','hospital','bệnh viện','/ˈhɒspɪtəl/','noun','She went to hospital with a broken leg.','Cô ấy vào bệnh viện với chân gãy.','health','medium',1),
('fl-hl-008','medicine','thuốc','/ˈmedsɪn/','noun','Take this medicine twice a day.','Uống thuốc này hai lần mỗi ngày.','health','medium',1),
('fl-hl-009','temperature','nhiệt độ / sốt','/ˈtemprɪtʃə/','noun','The doctor took her temperature.','Bác sĩ đo nhiệt độ của cô ấy.','health','hard',1),
('fl-hl-010','toothache','đau răng','/ˈtuːθeɪk/','noun','I have a terrible toothache.','Tôi bị đau răng rất nặng.','health','medium',1);

-- ── HOME — PART 1 (6 từ) ─────────────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-hm-001','attic','gác mái','/ˈætɪk/','noun','Old things are stored in the attic.','Đồ cũ được cất ở gác mái.','home','medium',1),
('fl-hm-002','balcony','ban công','/ˈbælkəni/','noun','She drinks coffee on the balcony.','Cô ấy uống cà phê trên ban công.','home','medium',1),
('fl-hm-003','carpet','tấm thảm','/ˈkɑːpɪt/','noun','There is a beautiful carpet in the living room.','Có tấm thảm đẹp trong phòng khách.','home','medium',1),
('fl-hm-004','ceiling','trần nhà','/ˈsiːlɪŋ/','noun','The ceiling in this room is very high.','Trần nhà trong phòng này rất cao.','home','medium',1),
('fl-hm-005','curtain','rèm cửa','/ˈkɜːtən/','noun','Please close the curtains.','Xin hãy kéo rèm lại.','home','medium',1),
('fl-hm-006','cushion','gối tựa','/ˈkʊʃən/','noun','She put a cushion on the chair.','Cô ấy đặt gối tựa lên ghế.','home','medium',1);
