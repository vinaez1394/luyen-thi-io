-- ============================================================
-- Migration: 0006_seed_vocabulary_flyers_batch2.sql
-- Kho từ vựng Cambridge A2 Flyers — BATCH 2/3
-- Topics: Home (cont) | Nature | People/Feelings | Places | School
-- Generated: 2026-04-30 | Sprint 1 — 90 words
-- ============================================================

-- ── HOME — PART 2 (8 từ) ─────────────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-hm-007','drawer','ngăn kéo','/drɔː/','noun','The keys are in the top drawer.','Chìa khóa ở ngăn kéo trên cùng.','home','medium',1),
('fl-hm-008','gate','cổng','/ɡeɪt/','noun','Please close the gate behind you.','Xin đóng cổng lại sau khi vào.','home','easy',1),
('fl-hm-009','lamp','đèn bàn / đèn','/læmp/','noun','Turn on the lamp. It is dark.','Bật đèn lên. Tối quá.','home','easy',1),
('fl-hm-010','mattress','tấm nệm','/ˈmætrəs/','noun','The mattress is very comfortable.','Tấm nệm này rất thoải mái.','home','medium',1),
('fl-hm-011','mirror','cái gương','/ˈmɪrə/','noun','She looked in the mirror.','Cô ấy nhìn vào gương.','home','medium',1),
('fl-hm-012','pillow','cái gối','/ˈpɪləʊ/','noun','I have two pillows on my bed.','Tôi có hai cái gối trên giường.','home','medium',1),
('fl-hm-013','shelf','cái kệ','/ʃelf/','noun','Put the books on the shelf.','Để sách lên kệ.','home','easy',1),
('fl-hm-014','tap','vòi nước','/tæp/','noun','Turn off the tap after washing.','Vặn vòi nước lại sau khi rửa.','home','easy',1);

-- ── NATURE AND ENVIRONMENT (20 từ) ───────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-nt-001','bridge','cây cầu','/brɪdʒ/','noun','We crossed the bridge over the river.','Chúng tôi qua cây cầu bắc qua sông.','nature','easy',1),
('fl-nt-002','cave','hang động','/keɪv/','noun','Bats live in the cave.','Dơi sống trong hang động.','nature','easy',1),
('fl-nt-003','cliff','vách đá','/klɪf/','noun','She stood on the cliff looking at the sea.','Cô ấy đứng trên vách đá nhìn ra biển.','nature','easy',1),
('fl-nt-004','coast','bờ biển','/kəʊst/','noun','We drove along the coast.','Chúng tôi lái xe dọc bờ biển.','nature','easy',1),
('fl-nt-005','desert','sa mạc','/ˈdezət/','noun','It is very hot in the desert.','Trời rất nóng trong sa mạc.','nature','easy',1),
('fl-nt-006','environment','môi trường','/ɪnˈvaɪrənmənt/','noun','We must protect the environment.','Chúng ta phải bảo vệ môi trường.','nature','hard',1),
('fl-nt-007','field','cánh đồng','/fiːld/','noun','The cows are in the field.','Những con bò đang ở cánh đồng.','nature','easy',1),
('fl-nt-008','forest','rừng','/ˈfɒrɪst/','noun','We walked through the forest.','Chúng tôi đi xuyên qua rừng.','nature','easy',1),
('fl-nt-009','island','hòn đảo','/ˈaɪlənd/','noun','They sailed to a small island.','Họ đi thuyền đến một hòn đảo nhỏ.','nature','easy',1),
('fl-nt-010','jungle','rừng nhiệt đới','/ˈdʒʌŋɡəl/','noun','Tigers live in the jungle.','Hổ sống trong rừng nhiệt đới.','nature','medium',1),
('fl-nt-011','lake','hồ nước','/leɪk/','noun','We went fishing at the lake.','Chúng tôi đi câu cá ở hồ.','nature','easy',1),
('fl-nt-012','ocean','đại dương','/ˈəʊʃən/','noun','The ocean is very deep.','Đại dương rất sâu.','nature','easy',1),
('fl-nt-013','path','con đường mòn','/pɑːθ/','noun','Follow the path through the park.','Đi theo đường mòn qua công viên.','nature','easy',1),
('fl-nt-014','pond','ao','/pɒnd/','noun','There are ducks swimming in the pond.','Có vịt đang bơi trong ao.','nature','easy',1),
('fl-nt-015','rock','tảng đá','/rɒk/','noun','She sat on a large rock.','Cô ấy ngồi trên một tảng đá lớn.','nature','easy',1),
('fl-nt-016','sand','cát','/sænd/','noun','Children love playing in the sand.','Trẻ em thích chơi trên cát.','nature','easy',1),
('fl-nt-017','stream','con suối','/striːm/','noun','We sat by the stream.','Chúng tôi ngồi bên con suối.','nature','easy',1),
('fl-nt-018','valley','thung lũng','/ˈvæli/','noun','The village is in a green valley.','Làng nằm trong một thung lũng xanh.','nature','medium',1),
('fl-nt-019','waterfall','thác nước','/ˈwɔːtəfɔːl/','noun','The waterfall is beautiful.','Thác nước thật đẹp.','nature','medium',1),
('fl-nt-020','wing','cánh','/wɪŋ/','noun','The bird spread its wings and flew away.','Con chim xòe cánh và bay đi.','nature','easy',1);

-- ── PEOPLE AND FEELINGS (20 từ) ──────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-pf-001','angry','tức giận','/ˈæŋɡri/','adj','She was angry because she lost.','Cô ấy tức giận vì thua cuộc.','feelings','easy',1),
('fl-pf-002','bored','chán nản','/bɔːd/','adj','He was bored with nothing to do.','Anh ấy chán nản vì không có gì làm.','feelings','easy',1),
('fl-pf-003','brave','dũng cảm','/breɪv/','adj','The firefighter was very brave.','Người lính cứu hỏa rất dũng cảm.','feelings','easy',1),
('fl-pf-004','careful','cẩn thận','/ˈkeəfəl/','adj','Be careful when crossing the road.','Hãy cẩn thận khi qua đường.','feelings','medium',1),
('fl-pf-005','clever','thông minh','/ˈklevə/','adj','She is a very clever student.','Cô ấy là một học sinh rất thông minh.','feelings','medium',1),
('fl-pf-006','confident','tự tin','/ˈkɒnfɪdənt/','adj','She felt confident before her exam.','Cô ấy cảm thấy tự tin trước kỳ thi.','feelings','hard',1),
('fl-pf-007','disappointed','thất vọng','/ˌdɪsəˈpɔɪntɪd/','adj','He was disappointed with his score.','Anh ấy thất vọng với điểm số của mình.','feelings','hard',1),
('fl-pf-008','embarrassed','ngượng ngùng','/ɪmˈbærəst/','adj','She felt embarrassed when she fell.','Cô ấy cảm thấy ngượng khi bị ngã.','feelings','hard',1),
('fl-pf-009','excited','hào hứng','/ɪkˈsaɪtɪd/','adj','The children were excited about the trip.','Bọn trẻ hào hứng với chuyến đi.','feelings','medium',1),
('fl-pf-010','frightened','hoảng sợ','/ˈfraɪtənd/','adj','She was frightened by the loud noise.','Cô ấy hoảng sợ vì tiếng ồn lớn.','feelings','medium',1),
('fl-pf-011','generous','hào phóng','/ˈdʒenərəs/','adj','He is very generous with his time.','Anh ấy rất hào phóng với thời gian.','feelings','hard',1),
('fl-pf-012','jealous','ghen tị','/ˈdʒeləs/','adj','She felt jealous of her sister.','Cô ấy cảm thấy ghen tị với chị gái.','feelings','medium',1),
('fl-pf-013','kind','tốt bụng','/kaɪnd/','adj','She is very kind to everyone.','Cô ấy rất tốt bụng với mọi người.','feelings','easy',1),
('fl-pf-014','lonely','cô đơn','/ˈləʊnli/','adj','He felt lonely in the new city.','Anh ấy cảm thấy cô đơn ở thành phố mới.','feelings','medium',1),
('fl-pf-015','nervous','lo lắng / hồi hộp','/ˈnɜːvəs/','adj','She was nervous before the concert.','Cô ấy hồi hộp trước buổi biểu diễn.','feelings','medium',1),
('fl-pf-016','patient','kiên nhẫn','/ˈpeɪʃənt/','adj','A good teacher is always patient.','Một giáo viên tốt luôn kiên nhẫn.','feelings','medium',1),
('fl-pf-017','proud','tự hào','/praʊd/','adj','Her parents were proud of her.','Bố mẹ rất tự hào về cô ấy.','feelings','easy',1),
('fl-pf-018','shy','nhút nhát','/ʃaɪ/','adj','He is too shy to speak in class.','Anh ấy quá nhút nhát để phát biểu.','feelings','easy',1),
('fl-pf-019','upset','buồn bã / khó chịu','/ʌpˈset/','adj','She was upset when she heard the news.','Cô ấy buồn khi nghe tin đó.','feelings','easy',1),
('fl-pf-020','worried','lo lắng','/ˈwʌrid/','adj','She was worried about her exam.','Cô ấy lo lắng về kỳ thi.','feelings','medium',1);

-- ── PLACES (20 từ) ───────────────────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-pl-001','airport','sân bay','/ˈeəpɔːt/','noun','We arrived at the airport early.','Chúng tôi đến sân bay sớm.','places','easy',1),
('fl-pl-002','castle','lâu đài','/ˈkɑːsəl/','noun','We visited an old castle.','Chúng tôi thăm một lâu đài cổ.','places','medium',1),
('fl-pl-003','cave','hang động','/keɪv/','noun','The explorers went into the cave.','Các nhà thám hiểm đi vào hang động.','places','easy',1),
('fl-pl-004','circus','rạp xiếc','/ˈsɜːkəs/','noun','We saw acrobats at the circus.','Chúng tôi xem diễn viên nhào lộn ở rạp xiếc.','places','medium',1),
('fl-pl-005','college','trường cao đẳng','/ˈkɒlɪdʒ/','noun','Her brother goes to college.','Anh trai cô ấy học cao đẳng.','places','medium',1),
('fl-pl-006','factory','nhà máy','/ˈfæktri/','noun','Cars are made in a factory.','Ô tô được sản xuất trong nhà máy.','places','medium',1),
('fl-pl-007','gallery','phòng trưng bày','/ˈɡæləri/','noun','We looked at paintings in the gallery.','Chúng tôi xem tranh ở phòng trưng bày.','places','hard',1),
('fl-pl-008','harbour','bến cảng','/ˈhɑːbə/','noun','The boats were in the harbour.','Những chiếc thuyền đang ở bến cảng.','places','medium',1),
('fl-pl-009','library','thư viện','/ˈlaɪbrəri/','noun','She borrowed books from the library.','Cô ấy mượn sách từ thư viện.','places','medium',1),
('fl-pl-010','market','chợ','/ˈmɑːkɪt/','noun','We bought fruit at the market.','Chúng tôi mua hoa quả ở chợ.','places','easy',1),
('fl-pl-011','museum','bảo tàng','/mjuːˈziːəm/','noun','We learned history at the museum.','Chúng tôi học lịch sử ở bảo tàng.','places','medium',1),
('fl-pl-012','palace','cung điện','/ˈpæləs/','noun','The king lives in a palace.','Nhà vua sống trong cung điện.','places','medium',1),
('fl-pl-013','pyramid','kim tự tháp','/ˈpɪrəmɪd/','noun','The pyramids are in Egypt.','Các kim tự tháp ở Ai Cập.','places','hard',1),
('fl-pl-014','railway','đường sắt / ga tàu','/ˈreɪlweɪ/','noun','The railway station is near the hotel.','Ga tàu hỏa gần khách sạn.','places','medium',1),
('fl-pl-015','restaurant','nhà hàng','/ˈrestrɒnt/','noun','We had dinner at a nice restaurant.','Chúng tôi ăn tối ở một nhà hàng đẹp.','places','medium',1),
('fl-pl-016','stadium','sân vận động','/ˈsteɪdiəm/','noun','The match was played at the stadium.','Trận đấu được tổ chức tại sân vận động.','places','hard',1),
('fl-pl-017','supermarket','siêu thị','/ˈsuːpəmɑːkɪt/','noun','We buy food at the supermarket.','Chúng tôi mua thức ăn ở siêu thị.','places','medium',1),
('fl-pl-018','theatre','nhà hát','/ˈθɪətə/','noun','We watched a play at the theatre.','Chúng tôi xem kịch ở nhà hát.','places','medium',1),
('fl-pl-019','university','trường đại học','/ˌjuːnɪˈvɜːsɪti/','noun','She studies at university.','Cô ấy học ở trường đại học.','places','hard',1),
('fl-pl-020','zoo','vườn thú','/zuː/','noun','We saw lions at the zoo.','Chúng tôi thấy sư tử ở vườn thú.','places','easy',1);

-- ── SCHOOL (12 từ) ───────────────────────────────────────────
INSERT OR IGNORE INTO vocabulary_bank (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,game_hangman) VALUES
('fl-sc-001','calculator','máy tính','/ˈkælkjʊleɪtə/','noun','Use a calculator for maths.','Dùng máy tính cho môn Toán.','school','medium',1),
('fl-sc-002','classroom','phòng học','/ˈklɑːsruːm/','noun','The classroom has 30 students.','Phòng học có 30 học sinh.','school','medium',1),
('fl-sc-003','competition','cuộc thi','/ˌkɒmpɪˈtɪʃən/','noun','She won first place in the competition.','Cô ấy đoạt giải nhất trong cuộc thi.','school','hard',1),
('fl-sc-004','exam','bài thi / kỳ thi','/ɪɡˈzæm/','noun','I studied hard for the exam.','Tôi học chăm chỉ cho kỳ thi.','school','easy',1),
('fl-sc-005','guess','đoán','/ɡes/','verb','Can you guess the answer?','Bạn có thể đoán câu trả lời không?','school','easy',1),
('fl-sc-006','information','thông tin','/ˌɪnfəˈmeɪʃən/','noun','I need more information about this.','Tôi cần thêm thông tin về điều này.','school','hard',1),
('fl-sc-007','language','ngôn ngữ','/ˈlæŋɡwɪdʒ/','noun','English is an important language.','Tiếng Anh là một ngôn ngữ quan trọng.','school','medium',1),
('fl-sc-008','lesson','bài học','/ˈlesən/','noun','Our English lesson starts at eight.','Bài học tiếng Anh của chúng tôi bắt đầu lúc 8 giờ.','school','easy',1),
('fl-sc-009','notebook','vở ghi chép','/ˈnəʊtbʊk/','noun','She wrote notes in her notebook.','Cô ấy ghi chú vào vở.','school','medium',1),
('fl-sc-010','project','dự án / bài tập lớn','/ˈprɒdʒekt/','noun','We worked on a school project together.','Chúng tôi cùng làm bài tập lớn ở trường.','school','medium',1),
('fl-sc-011','textbook','sách giáo khoa','/ˈtekstbʊk/','noun','Open your textbook to page ten.','Mở sách giáo khoa đến trang mười.','school','medium',1),
('fl-sc-012','timetable','thời khóa biểu','/ˈtaɪmteɪbəl/','noun','The timetable shows all our lessons.','Thời khóa biểu cho thấy tất cả các bài học.','school','medium',1);
