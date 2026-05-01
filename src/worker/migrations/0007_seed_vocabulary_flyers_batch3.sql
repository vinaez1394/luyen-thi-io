-- ============================================================
-- Migration: 0007_seed_vocabulary_flyers_batch3.sql
-- Kho từ vựng Cambridge A2 Flyers — BATCH 3/3
-- Topics: Sports | Transport | Materials | Time | Adjectives
-- Generated: 2026-04-30 | Sprint 1 — 80 words
-- ============================================================

-- ── SPORTS AND LEISURE (15 từ) ───────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-sp-001','badminton','cầu lông','/ˈbædmɪntən/','noun','She plays badminton after school.','Cô ấy chơi cầu lông sau giờ học.','sports','medium',1),
('fl-sp-002','camping','cắm trại','/ˈkæmpɪŋ/','noun','We go camping in the summer.','Chúng tôi đi cắm trại vào mùa hè.','sports','medium',1),
('fl-sp-003','chess','cờ vua','/tʃes/','noun','He plays chess with his grandfather.','Anh ấy chơi cờ vua với ông nội.','sports','easy',1),
('fl-sp-004','climbing','leo trèo / leo núi','/ˈklaɪmɪŋ/','noun','Rock climbing is an exciting sport.','Leo núi là môn thể thao thú vị.','sports','medium',1),
('fl-sp-005','cycling','đạp xe','/ˈsaɪklɪŋ/','noun','Cycling is good for your health.','Đạp xe tốt cho sức khỏe.','sports','medium',1),
('fl-sp-006','gymnastics','thể dục dụng cụ','/dʒɪmˈnæstɪks/','noun','She does gymnastics every day.','Cô ấy tập thể dục dụng cụ mỗi ngày.','sports','hard',1),
('fl-sp-007','hiking','đi bộ đường dài','/ˈhaɪkɪŋ/','noun','We went hiking in the mountains.','Chúng tôi đi bộ đường dài trên núi.','sports','medium',1),
('fl-sp-008','skiing','trượt tuyết','/ˈskiːɪŋ/','noun','They went skiing in the Alps.','Họ đi trượt tuyết ở dãy Alps.','sports','medium',1),
('fl-sp-009','snowboarding','trượt ván tuyết','/ˈsnəʊbɔːdɪŋ/','noun','Snowboarding is a popular winter sport.','Trượt ván tuyết là môn thể thao mùa đông phổ biến.','sports','hard',1),
('fl-sp-010','surfing','lướt sóng','/ˈsɜːfɪŋ/','noun','He loves surfing in the ocean.','Anh ấy thích lướt sóng trên đại dương.','sports','medium',1),
('fl-sp-011','concert','buổi hòa nhạc','/ˈkɒnsət/','noun','We went to a rock concert last night.','Chúng tôi đến buổi hòa nhạc rock tối qua.','sports','medium',1),
('fl-sp-012','competition','cuộc thi / giải đấu','/ˌkɒmpɪˈtɪʃən/','noun','He won a painting competition.','Anh ấy thắng một cuộc thi vẽ tranh.','sports','hard',1),
('fl-sp-013','hobby','sở thích','/ˈhɒbi/','noun','My hobby is collecting stamps.','Sở thích của tôi là sưu tập tem.','sports','medium',1),
('fl-sp-014','prize','giải thưởng','/praɪz/','noun','She won first prize in the race.','Cô ấy giành giải nhất trong cuộc đua.','sports','easy',1),
('fl-sp-015','team','đội / nhóm','/tiːm/','noun','Our team won the match.','Đội của chúng tôi thắng trận đấu.','sports','easy',1);

-- ── TRANSPORT (12 từ) ────────────────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-tr-001','caravan','xe kéo nhà lưu động','/ˈkærəvæn/','noun','They spent the holiday in a caravan.','Họ đi nghỉ trong xe kéo nhà lưu động.','transport','hard',1),
('fl-tr-002','helicopter','máy bay trực thăng','/ˈhelɪkɒptə/','noun','The helicopter flew over the city.','Máy bay trực thăng bay qua thành phố.','transport','medium',1),
('fl-tr-003','lorry','xe tải lớn','/ˈlɒri/','noun','The lorry carried boxes to the store.','Xe tải mang hộp đến cửa hàng.','transport','medium',1),
('fl-tr-004','motorbike','xe máy','/ˈməʊtəbaɪk/','noun','He rides a motorbike to work.','Anh ấy đi xe máy đến nơi làm việc.','transport','medium',1),
('fl-tr-005','passenger','hành khách','/ˈpæsɪndʒə/','noun','The passengers waited for the train.','Các hành khách chờ tàu hỏa.','transport','medium',1),
('fl-tr-006','sailboat','thuyền buồm','/ˈseɪlbəʊt/','noun','We sailed on a sailboat.','Chúng tôi đi trên thuyền buồm.','transport','medium',1),
('fl-tr-007','skateboard','ván trượt','/ˈskeɪtbɔːd/','noun','He practises skateboarding every day.','Anh ấy tập ván trượt mỗi ngày.','transport','medium',1),
('fl-tr-008','submarine','tàu ngầm','/ˈsʌbməriːn/','noun','A submarine can travel underwater.','Tàu ngầm có thể di chuyển dưới nước.','transport','hard',1),
('fl-tr-009','taxi','xe taxi','/ˈtæksi/','noun','We took a taxi to the airport.','Chúng tôi đi taxi đến sân bay.','transport','easy',1),
('fl-tr-010','tram','xe điện','/træm/','noun','The tram goes through the city centre.','Xe điện đi qua trung tâm thành phố.','transport','easy',1),
('fl-tr-011','van','xe tải nhỏ','/væn/','noun','The van is full of boxes.','Xe tải nhỏ đầy hộp.','transport','easy',1),
('fl-tr-012','yacht','du thuyền','/jɒt/','noun','They sailed their yacht around the island.','Họ lái du thuyền quanh đảo.','transport','easy',1);

-- ── MATERIALS (10 từ) ────────────────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-mt-001','cotton','vải bông / cotton','/ˈkɒtən/','noun','This shirt is made of cotton.','Chiếc áo này làm từ vải bông.','materials','medium',1),
('fl-mt-002','glass','thủy tinh','/ɡlɑːs/','noun','The window is made of glass.','Cửa sổ làm bằng thủy tinh.','materials','easy',1),
('fl-mt-003','gold','vàng','/ɡəʊld/','noun','She has a gold ring.','Cô ấy có chiếc nhẫn vàng.','materials','easy',1),
('fl-mt-004','leather','da','/ˈleðə/','noun','His shoes are made of leather.','Giày của anh ấy làm từ da.','materials','medium',1),
('fl-mt-005','metal','kim loại','/ˈmetəl/','noun','The bridge is made of metal.','Cây cầu làm bằng kim loại.','materials','easy',1),
('fl-mt-006','plastic','nhựa','/ˈplæstɪk/','noun','The bottle is made of plastic.','Cái chai làm bằng nhựa.','materials','easy',1),
('fl-mt-007','rubber','cao su','/ˈrʌbə/','noun','The tyres are made of rubber.','Bánh xe làm từ cao su.','materials','medium',1),
('fl-mt-008','silver','bạc','/ˈsɪlvə/','noun','She wore a silver necklace.','Cô ấy đeo vòng cổ bạc.','materials','easy',1),
('fl-mt-009','stone','đá','/stəʊn/','noun','The old castle was built of stone.','Lâu đài cổ được xây bằng đá.','materials','easy',1),
('fl-mt-010','wood','gỗ','/wʊd/','noun','The table is made of wood.','Cái bàn làm bằng gỗ.','materials','easy',1);

-- ── TIME AND CALENDAR (10 từ) ─────────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-tm-001','century','thế kỷ','/ˈsentʃəri/','noun','This castle is five centuries old.','Lâu đài này đã năm thế kỷ tuổi.','time','hard',1),
('fl-tm-002','decade','thập kỷ','/ˈdekeɪd/','noun','A decade is ten years.','Một thập kỷ là mười năm.','time','hard',1),
('fl-tm-003','diary','nhật ký','/ˈdaɪəri/','noun','She writes in her diary every day.','Cô ấy viết nhật ký mỗi ngày.','time','medium',1),
('fl-tm-004','fortnight','hai tuần','/ˈfɔːtnaɪt/','noun','We are going on holiday in a fortnight.','Chúng tôi đi nghỉ sau hai tuần.','time','hard',1),
('fl-tm-005','midnight','nửa đêm','/ˈmɪdnaɪt/','noun','The party ended at midnight.','Bữa tiệc kết thúc lúc nửa đêm.','time','medium',1),
('fl-tm-006','month','tháng','/mʌnθ/','noun','There are twelve months in a year.','Có mười hai tháng trong một năm.','time','easy',1),
('fl-tm-007','schedule','lịch trình','/ˈʃedjuːl/','noun','What is on your schedule today?','Lịch trình của bạn hôm nay là gì?','time','hard',1),
('fl-tm-008','season','mùa','/ˈsiːzən/','noun','My favourite season is autumn.','Mùa yêu thích của tôi là mùa thu.','time','easy',1),
('fl-tm-009','calendar','lịch','/ˈkælɪndə/','noun','He wrote the date in his calendar.','Anh ấy ghi ngày vào lịch.','time','medium',1),
('fl-tm-010','weekend','cuối tuần','/ˌwiːkˈend/','noun','We went to the beach at the weekend.','Chúng tôi đến bãi biển vào cuối tuần.','time','easy',1);

-- ── ADJECTIVES — DESCRIBING (13 từ) ──────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-aj-001','ancient','cổ đại / xưa','/ˈeɪnʃənt/','adj','The ancient temple is very beautiful.','Ngôi đền cổ rất đẹp.','adjectives','medium',1),
('fl-aj-002','bright','sáng / rực rỡ','/braɪt/','adj','The bright sun woke me up.','Ánh nắng rực rỡ đánh thức tôi dậy.','adjectives','easy',1),
('fl-aj-003','comfortable','thoải mái','/ˈkʌmftəbəl/','adj','This sofa is very comfortable.','Chiếc ghế sofa này rất thoải mái.','adjectives','medium',1),
('fl-aj-004','dangerous','nguy hiểm','/ˈdeɪndʒərəs/','adj','It is dangerous to swim here.','Bơi ở đây rất nguy hiểm.','adjectives','medium',1),
('fl-aj-005','delicious','ngon','/dɪˈlɪʃəs/','adj','The cake was absolutely delicious.','Chiếc bánh thật sự ngon tuyệt.','adjectives','medium',1),
('fl-aj-006','empty','trống rỗng','/ˈempti/','adj','The bottle is empty.','Cái chai rỗng rồi.','adjectives','easy',1),
('fl-aj-007','enormous','khổng lồ','/ɪˈnɔːməs/','adj','The blue whale is enormous.','Cá voi xanh thật khổng lồ.','adjectives','hard',1),
('fl-aj-008','expensive','đắt tiền','/ɪkˈspensɪv/','adj','This jacket is too expensive.','Chiếc áo khoác này quá đắt.','adjectives','medium',1),
('fl-aj-009','famous','nổi tiếng','/ˈfeɪməs/','adj','Paris is famous for the Eiffel Tower.','Paris nổi tiếng với tháp Eiffel.','adjectives','medium',1),
('fl-aj-010','fantastic','tuyệt vời','/fænˈtæstɪk/','adj','You did a fantastic job!','Bạn đã làm tuyệt vời lắm!','adjectives','medium',1),
('fl-aj-011','important','quan trọng','/ɪmˈpɔːtənt/','adj','Sleep is important for good health.','Giấc ngủ rất quan trọng cho sức khỏe tốt.','adjectives','medium',1),
('fl-aj-012','lucky','may mắn','/ˈlʌki/','adj','You are lucky to have such good friends.','Bạn thật may mắn có những người bạn tốt.','adjectives','easy',1),
('fl-aj-013','wonderful','tuyệt diệu','/ˈwʌndəfəl/','adj','What a wonderful surprise!','Thật là một bất ngờ tuyệt diệu!','adjectives','medium',1);
