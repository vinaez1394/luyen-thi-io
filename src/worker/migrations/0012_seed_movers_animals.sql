-- ============================================================
-- Migration: 0012_seed_movers_animals.sql
-- A1 Movers — Animals topic (8 từ mới)
-- Note: bat/dolphin/kangaroo/parrot/penguin/shark/whale đã có trong DB
--       dưới dạng fl-an-* → dùng INSERT OR IGNORE để bỏ qua
-- ============================================================

INSERT OR IGNORE INTO vocabulary_bank
  (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,
   certificate,cert_order,emoji,game_hangman,game_flashcard,game_choice)
VALUES
('mv-an-001','cage','cái lồng','/keɪdʒ/','noun',
 'The bird is in a small cage.',
 'Con chim ở trong một chiếc lồng nhỏ.',
 'animals','medium','movers',2,'🔒',1,1,1),

('mv-an-002','fly','con ruồi','/flaɪ/','noun',
 'There is a fly on the window.',
 'Có một con ruồi trên cửa sổ.',
 'animals','easy','movers',2,'🪰',1,1,1),

('mv-an-003','kitten','con mèo con','/ˈkɪtɪn/','noun',
 'The kitten is very small and cute.',
 'Con mèo con rất nhỏ và dễ thương.',
 'animals','easy','movers',2,'🐱',1,1,1),

('mv-an-004','lion','con sư tử','/ˈlaɪən/','noun',
 'The lion is the king of the jungle.',
 'Sư tử là chúa tể của rừng.',
 'animals','easy','movers',2,'🦁',1,1,1),

('mv-an-005','panda','con gấu trúc','/ˈpændə/','noun',
 'A panda eats bamboo all day.',
 'Gấu trúc ăn tre cả ngày.',
 'animals','easy','movers',2,'🐼',1,1,1),

('mv-an-006','puppy','con chó con','/ˈpʌpi/','noun',
 'The puppy is playing in the garden.',
 'Con chó con đang chơi trong vườn.',
 'animals','easy','movers',2,'🐶',1,1,1),

('mv-an-007','rabbit','con thỏ','/ˈræbɪt/','noun',
 'The rabbit has long white ears.',
 'Con thỏ có đôi tai trắng dài.',
 'animals','easy','movers',2,'🐰',1,1,1),

('mv-an-008','snail','con ốc sên','/sneɪl/','noun',
 'A snail moves very slowly.',
 'Con ốc sên di chuyển rất chậm.',
 'animals','easy','movers',2,'🐌',1,1,1);
