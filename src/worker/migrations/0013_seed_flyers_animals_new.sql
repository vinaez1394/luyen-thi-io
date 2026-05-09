-- ============================================================
-- Migration: 0013_seed_flyers_animals_new.sql
-- A2 Flyers — Animals topic bổ sung (10 từ chưa có trong DB)
-- Đã có: butterfly(002), camel(003), eagle(009), octopus(014), swan(018)
-- Mới thêm: beetle, creature, dinosaur, extinct, fur, insect, nest, tortoise, wild, wing
-- ============================================================

INSERT OR IGNORE INTO vocabulary_bank
  (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,
   certificate,cert_order,emoji,game_hangman,game_flashcard,game_choice)
VALUES
('fl-an-021','beetle','con bọ cánh cứng','/ˈbiːtəl/','noun',
 'The beetle has a hard shell on its back.',
 'Con bọ cánh cứng có một lớp vỏ cứng trên lưng.',
 'animals','medium','flyers',3,'🪲',1,1,1),

('fl-an-022','creature','sinh vật','/ˈkriːtʃə/','noun',
 'A dolphin is a wonderful sea creature.',
 'Cá heo là một sinh vật biển tuyệt vời.',
 'animals','medium','flyers',3,'🐾',1,1,1),

('fl-an-023','dinosaur','khủng long','/ˈdaɪnəsɔː/','noun',
 'Dinosaurs lived millions of years ago.',
 'Khủng long đã sống cách đây hàng triệu năm.',
 'animals','medium','flyers',3,'🦕',1,1,1),

('fl-an-024','extinct','tuyệt chủng','/ɪkˈstɪŋkt/','adjective',
 'The dinosaur is now extinct.',
 'Khủng long hiện đã tuyệt chủng.',
 'animals','hard','flyers',3,'❌',1,1,1),

('fl-an-025','fur','bộ lông (thú)','/fɜː/','noun',
 'The bear has thick brown fur to keep it warm.',
 'Con gấu có bộ lông nâu dày để giữ ấm.',
 'animals','medium','flyers',3,'🦱',1,1,1),

('fl-an-026','insect','côn trùng','/ˈɪnsekt/','noun',
 'An ant is a very small insect.',
 'Con kiến là một loài côn trùng rất nhỏ.',
 'animals','medium','flyers',3,'🐛',1,1,1),

('fl-an-027','nest','tổ chim','/nest/','noun',
 'The bird built a nest in the tree.',
 'Con chim xây một cái tổ trên cây.',
 'animals','easy','flyers',3,'🪹',1,1,1),

('fl-an-028','tortoise','con rùa','/ˈtɔːtəs/','noun',
 'A tortoise moves very slowly but lives a long time.',
 'Con rùa di chuyển rất chậm nhưng sống rất lâu.',
 'animals','medium','flyers',3,'🐢',1,1,1),

('fl-an-029','wild','hoang dã','/waɪld/','adjective',
 'Tigers are wild animals that live in the jungle.',
 'Hổ là động vật hoang dã sống trong rừng.',
 'animals','medium','flyers',3,'🌿',1,1,1),

('fl-an-030','wing','cánh','/wɪŋ/','noun',
 'The eagle spread its wings and flew away.',
 'Con đại bàng xoè cánh và bay đi.',
 'animals','easy','flyers',3,'🪶',1,1,1);
