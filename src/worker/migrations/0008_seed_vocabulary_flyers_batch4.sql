-- ============================================================
-- Migration: 0008_seed_vocabulary_flyers_batch4.sql
-- BATCH 4: Verbs (15) + Occupations (15) = 30 từ → Total: 250
-- ============================================================

-- ── VERBS — COMMON FLYERS ACTIONS (15 từ) ────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-vb-001','borrow','mượn','/ˈbɒrəʊ/','verb','Can I borrow your pen, please?','Tôi có thể mượn bút của bạn không?','verbs','easy',1),
('fl-vb-002','celebrate','kỷ niệm / ăn mừng','/ˈselɪbreɪt/','verb','We celebrate our birthdays together.','Chúng tôi ăn mừng sinh nhật cùng nhau.','verbs','medium',1),
('fl-vb-003','collect','sưu tập / thu thập','/kəˈlekt/','verb','She collects stickers from around the world.','Cô ấy sưu tập sticker từ khắp nơi trên thế giới.','verbs','medium',1),
('fl-vb-004','describe','mô tả','/dɪˈskraɪb/','verb','Can you describe what you saw?','Bạn có thể mô tả những gì bạn thấy không?','verbs','medium',1),
('fl-vb-005','discover','khám phá','/dɪˈskʌvə/','verb','Scientists discovered a new animal.','Các nhà khoa học đã khám phá ra một loài động vật mới.','verbs','medium',1),
('fl-vb-006','explain','giải thích','/ɪkˈspleɪn/','verb','Please explain how this works.','Hãy giải thích cách thức hoạt động này.','verbs','medium',1),
('fl-vb-007','improve','cải thiện','/ɪmˈpruːv/','verb','She improved her English a lot.','Cô ấy đã cải thiện tiếng Anh rất nhiều.','verbs','medium',1),
('fl-vb-008','invite','mời','/ɪnˈvaɪt/','verb','I want to invite you to my party.','Tôi muốn mời bạn đến bữa tiệc của tôi.','verbs','medium',1),
('fl-vb-009','lend','cho mượn','/lend/','verb','Can you lend me your book?','Bạn có thể cho tôi mượn sách không?','verbs','easy',1),
('fl-vb-010','miss','nhớ / lỡ','/mɪs/','verb','I miss my friends from school.','Tôi nhớ những người bạn ở trường.','verbs','easy',1),
('fl-vb-011','prefer','thích hơn','/prɪˈfɜː/','verb','I prefer tea to coffee.','Tôi thích trà hơn cà phê.','verbs','medium',1),
('fl-vb-012','prepare','chuẩn bị','/prɪˈpeə/','verb','She prepared carefully for the exam.','Cô ấy chuẩn bị cẩn thận cho kỳ thi.','verbs','medium',1),
('fl-vb-013','spend','tiêu / dành thời gian','/spend/','verb','We spent the day at the beach.','Chúng tôi dành cả ngày ở bãi biển.','verbs','easy',1),
('fl-vb-014','suggest','đề nghị / gợi ý','/səˈdʒest/','verb','Can you suggest a good restaurant?','Bạn có thể gợi ý một nhà hàng ngon không?','verbs','medium',1),
('fl-vb-015','travel','đi du lịch / di chuyển','/ˈtrævəl/','verb','She loves to travel to new places.','Cô ấy thích đi du lịch đến những nơi mới.','verbs','easy',1);

-- ── OCCUPATIONS / PEOPLE (15 từ) ─────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-oc-001','architect','kiến trúc sư','/ˈɑːkɪtekt/','noun','The architect designed the new school.','Kiến trúc sư thiết kế ngôi trường mới.','people','hard',1),
('fl-oc-002','chef','đầu bếp','/ʃef/','noun','The chef cooked a wonderful meal.','Đầu bếp nấu một bữa ăn tuyệt vời.','people','easy',1),
('fl-oc-003','dentist','nha sĩ','/ˈdentɪst/','noun','I go to the dentist twice a year.','Tôi đến gặp nha sĩ hai lần một năm.','people','medium',1),
('fl-oc-004','engineer','kỹ sư','/ˌendʒɪˈnɪə/','noun','The engineer fixed the broken machine.','Kỹ sư sửa chiếc máy bị hỏng.','people','medium',1),
('fl-oc-005','farmer','nông dân','/ˈfɑːmə/','noun','The farmer grows vegetables and fruit.','Người nông dân trồng rau củ và hoa quả.','people','easy',1),
('fl-oc-006','firefighter','lính cứu hỏa','/ˈfaɪəfaɪtə/','noun','The firefighter saved the family.','Lính cứu hỏa đã cứu gia đình.','people','medium',1),
('fl-oc-007','guide','hướng dẫn viên','/ɡaɪd/','noun','The guide showed us around the museum.','Hướng dẫn viên dẫn chúng tôi tham quan bảo tàng.','people','easy',1),
('fl-oc-008','journalist','nhà báo','/ˈdʒɜːnəlɪst/','noun','The journalist wrote about the event.','Nhà báo viết về sự kiện đó.','people','hard',1),
('fl-oc-009','librarian','thủ thư','/laɪˈbreəriən/','noun','Ask the librarian for help finding books.','Hỏi thủ thư để được giúp tìm sách.','people','hard',1),
('fl-oc-010','nurse','y tá','/nɜːs/','noun','The nurse helped the patient.','Y tá giúp đỡ bệnh nhân.','people','easy',1),
('fl-oc-011','passenger','hành khách','/ˈpæsɪndʒə/','noun','The passengers got on the train.','Các hành khách lên tàu hỏa.','people','medium',1),
('fl-oc-012','photographer','nhiếp ảnh gia','/fəˈtɒɡrəfə/','noun','The photographer took great pictures.','Nhiếp ảnh gia chụp những bức ảnh đẹp.','people','hard',1),
('fl-oc-013','pilot','phi công','/ˈpaɪlət/','noun','The pilot flew the plane safely.','Phi công lái máy bay an toàn.','people','easy',1),
('fl-oc-014','scientist','nhà khoa học','/ˈsaɪəntɪst/','noun','The scientist discovered a new medicine.','Nhà khoa học phát hiện ra một loại thuốc mới.','people','medium',1),
('fl-oc-015','vet','bác sĩ thú y','/vet/','noun','We took our dog to the vet.','Chúng tôi đưa chó đến gặp bác sĩ thú y.','people','easy',1);
