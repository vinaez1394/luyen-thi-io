-- ============================================================
-- Migration: 0011_seed_starters_animals.sql
-- Pre-A1 Starters — Animals topic (29 từ mới)
-- Source: Cambridge Young Learners English Wordlist (Pre-A1 Starters)
-- Note: crocodile (fl-an-006) và jellyfish (fl-an-012) đã có → dùng INSERT OR IGNORE
-- ============================================================

INSERT OR IGNORE INTO vocabulary_bank
  (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,
   certificate,cert_order,emoji,game_hangman,game_flashcard,game_choice)
VALUES
('st-an-001','animal','con vật / động vật','/ˈænɪməl/','noun',
 'A dog is my favourite animal.',
 'Con chó là con vật yêu thích của tôi.',
 'animals','easy','starters',1,'🐾',1,1,1),

('st-an-002','bear','con gấu','/beə/','noun',
 'The bear lives in the forest.',
 'Con gấu sống trong rừng.',
 'animals','easy','starters',1,'🐻',1,1,1),

('st-an-003','bee','con ong','/biː/','noun',
 'A bee makes honey.',
 'Con ong tạo ra mật ong.',
 'animals','easy','starters',1,'🐝',1,1,1),

('st-an-004','bird','con chim','/bɜːd/','noun',
 'The bird sings in the tree.',
 'Con chim hót trên cây.',
 'animals','easy','starters',1,'🐦',1,1,1),

('st-an-005','cat','con mèo','/kæt/','noun',
 'My cat sleeps on the sofa.',
 'Con mèo của tôi ngủ trên ghế sofa.',
 'animals','easy','starters',1,'🐱',1,1,1),

('st-an-006','chicken','con gà','/ˈtʃɪkɪn/','noun',
 'There are three chickens in the garden.',
 'Có ba con gà trong vườn.',
 'animals','easy','starters',1,'🐔',1,1,1),

('st-an-007','cow','con bò','/kaʊ/','noun',
 'The cow eats grass in the field.',
 'Con bò ăn cỏ ngoài cánh đồng.',
 'animals','easy','starters',1,'🐄',1,1,1),

('st-an-008','dog','con chó','/dɒɡ/','noun',
 'My dog is very friendly.',
 'Con chó của tôi rất thân thiện.',
 'animals','easy','starters',1,'🐶',1,1,1),

('st-an-009','donkey','con lừa','/ˈdɒŋki/','noun',
 'The donkey carries heavy bags.',
 'Con lừa chở những chiếc túi nặng.',
 'animals','easy','starters',1,'🫏',1,1,1),

('st-an-010','duck','con vịt','/dʌk/','noun',
 'The duck swims in the pond.',
 'Con vịt bơi trong ao.',
 'animals','easy','starters',1,'🦆',1,1,1),

('st-an-011','elephant','con voi','/ˈelɪfənt/','noun',
 'Elephants are very big animals.',
 'Voi là những con vật rất to lớn.',
 'animals','easy','starters',1,'🐘',1,1,1),

('st-an-012','fish','con cá','/fɪʃ/','noun',
 'I can see many fish in the sea.',
 'Tôi có thể thấy nhiều con cá ở biển.',
 'animals','easy','starters',1,'🐟',1,1,1),

('st-an-013','frog','con ếch','/frɒɡ/','noun',
 'The frog jumps into the water.',
 'Con ếch nhảy xuống nước.',
 'animals','easy','starters',1,'🐸',1,1,1),

('st-an-014','giraffe','con hươu cao cổ','/dʒɪˈrɑːf/','noun',
 'The giraffe has a very long neck.',
 'Con hươu cao cổ có cái cổ rất dài.',
 'animals','easy','starters',1,'🦒',1,1,1),

('st-an-015','goat','con dê','/ɡəʊt/','noun',
 'The goat eats leaves from the tree.',
 'Con dê ăn lá cây.',
 'animals','easy','starters',1,'🐐',1,1,1),

('st-an-016','hippo','con hà mã','/ˈhɪpəʊ/','noun',
 'A hippo likes to swim in the river.',
 'Con hà mã thích bơi trong sông.',
 'animals','easy','starters',1,'🦛',1,1,1),

('st-an-017','horse','con ngựa','/hɔːs/','noun',
 'She rides a horse every morning.',
 'Cô ấy cưỡi ngựa mỗi buổi sáng.',
 'animals','easy','starters',1,'🐴',1,1,1),

('st-an-018','lizard','con thằn lằn','/ˈlɪzəd/','noun',
 'A lizard is sitting on the wall.',
 'Một con thằn lằn đang ngồi trên tường.',
 'animals','easy','starters',1,'🦎',1,1,1),

('st-an-019','monkey','con khỉ','/ˈmʌŋki/','noun',
 'The monkey climbs up the tree.',
 'Con khỉ leo lên cây.',
 'animals','easy','starters',1,'🐒',1,1,1),

('st-an-020','mouse','con chuột','/maʊs/','noun',
 'There is a mouse in the kitchen.',
 'Có một con chuột trong nhà bếp.',
 'animals','easy','starters',1,'🐭',1,1,1),

('st-an-021','pet','thú cưng','/pet/','noun',
 'My pet is a small rabbit.',
 'Thú cưng của tôi là một con thỏ nhỏ.',
 'animals','easy','starters',1,'🐾',1,1,1),

('st-an-022','polar bear','gấu Bắc Cực','/ˈpəʊlə beə/','noun',
 'A polar bear lives in the snow.',
 'Gấu Bắc Cực sống trên tuyết.',
 'animals','medium','starters',1,'🐻‍❄️',1,1,1),

('st-an-023','sheep','con cừu','/ʃiːp/','noun',
 'The sheep eat grass in the field.',
 'Những con cừu ăn cỏ trên cánh đồng.',
 'animals','easy','starters',1,'🐑',1,1,1),

('st-an-024','snake','con rắn','/sneɪk/','noun',
 'That snake is very long.',
 'Con rắn đó rất dài.',
 'animals','easy','starters',1,'🐍',1,1,1),

('st-an-025','spider','con nhện','/ˈspaɪdə/','noun',
 'The spider makes a web.',
 'Con nhện tạo ra mạng nhện.',
 'animals','easy','starters',1,'🕷️',1,1,1),

('st-an-026','tail','đuôi','/teɪl/','noun',
 'The dog wags its tail.',
 'Con chó vẫy đuôi.',
 'animals','easy','starters',1,'🐕',1,1,1),

('st-an-027','tiger','con hổ','/ˈtaɪɡə/','noun',
 'The tiger is orange with black stripes.',
 'Con hổ có màu cam với những sọc đen.',
 'animals','easy','starters',1,'🐯',1,1,1),

('st-an-028','zebra','con ngựa vằn','/ˈziːbrə/','noun',
 'A zebra has black and white stripes.',
 'Con ngựa vằn có sọc đen và trắng.',
 'animals','easy','starters',1,'🦓',1,1,1),

('st-an-029','zoo','vườn thú','/zuː/','noun',
 'We saw many animals at the zoo.',
 'Chúng tôi thấy nhiều con vật ở vườn thú.',
 'animals','easy','starters',1,'🎡',1,1,1);
