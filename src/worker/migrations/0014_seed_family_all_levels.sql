-- ============================================================
-- Migration: 0014_seed_family_all_levels.sql
-- Family & Friends — Tất cả 3 cấp (38 từ)
-- Pre-A1 Starters: 25 từ (st-fm-001 → st-fm-025)
-- A1 Movers:        9 từ (mv-fm-001 → mv-fm-009)
-- A2 Flyers:        4 từ (fl-fm-001 → fl-fm-004)
-- ============================================================

-- ── PRE-A1 STARTERS — Family & Friends (25 từ) ───────────────
INSERT OR IGNORE INTO vocabulary_bank
  (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,
   certificate,cert_order,emoji,game_hangman,game_flashcard,game_choice)
VALUES
('st-fm-001','baby','em bé','/ˈbeɪbi/','noun',
 'The baby is sleeping in the bed.',
 'Em bé đang ngủ trên giường.',
 'family','easy','starters',1,'👶',1,1,1),

('st-fm-002','boy','bé trai','/bɔɪ/','noun',
 'The boy is playing football.',
 'Bé trai đang chơi bóng đá.',
 'family','easy','starters',1,'👦',1,1,1),

('st-fm-003','brother','anh / em trai','/ˈbrʌðə/','noun',
 'My brother plays computer games.',
 'Anh trai tôi chơi trò chơi điện tử.',
 'family','easy','starters',1,'👦',1,1,1),

('st-fm-004','child','đứa trẻ','/tʃaɪld/','noun',
 'Every child in the class has a book.',
 'Mỗi đứa trẻ trong lớp đều có một cuốn sách.',
 'family','easy','starters',1,'🧒',1,1,1),

('st-fm-005','classmate','bạn cùng lớp','/ˈklɑːsmeɪt/','noun',
 'She is my classmate and my friend.',
 'Cô ấy là bạn cùng lớp và là bạn của tôi.',
 'family','easy','starters',1,'🧑‍🏫',1,1,1),

('st-fm-006','cousin','anh / chị / em họ','/ˈkʌzən/','noun',
 'My cousin lives in another city.',
 'Anh họ tôi sống ở thành phố khác.',
 'family','easy','starters',1,'👫',1,1,1),

('st-fm-007','dad','ba / bố','/dæd/','noun',
 'My dad makes breakfast every morning.',
 'Ba tôi làm bữa sáng mỗi buổi sáng.',
 'family','easy','starters',1,'👨',1,1,1),

('st-fm-008','family','gia đình','/ˈfæməli/','noun',
 'My family has five people.',
 'Gia đình tôi có năm người.',
 'family','easy','starters',1,'👨‍👩‍👧',1,1,1),

('st-fm-009','father','cha / bố','/ˈfɑːðə/','noun',
 'My father works at a hospital.',
 'Cha tôi làm việc ở bệnh viện.',
 'family','easy','starters',1,'👨',1,1,1),

('st-fm-010','friend','bạn bè','/frend/','noun',
 'She is my best friend at school.',
 'Cô ấy là người bạn thân nhất của tôi ở trường.',
 'family','easy','starters',1,'🤝',1,1,1),

('st-fm-011','girl','bé gái','/ɡɜːl/','noun',
 'The girl has long hair.',
 'Bé gái có mái tóc dài.',
 'family','easy','starters',1,'👧',1,1,1),

('st-fm-012','grandfather','ông nội / ông ngoại','/ˈɡrænfɑːðə/','noun',
 'My grandfather tells me stories.',
 'Ông tôi kể chuyện cho tôi nghe.',
 'family','easy','starters',1,'👴',1,1,1),

('st-fm-013','grandma','bà (thân mật)','/ˈɡrænmɑː/','noun',
 'Grandma makes the best cakes.',
 'Bà làm những chiếc bánh ngon nhất.',
 'family','easy','starters',1,'👵',1,1,1),

('st-fm-014','grandmother','bà nội / bà ngoại','/ˈɡrænmʌðə/','noun',
 'My grandmother lives with us.',
 'Bà nội tôi sống cùng chúng tôi.',
 'family','easy','starters',1,'👵',1,1,1),

('st-fm-015','grandpa','ông (thân mật)','/ˈɡrænpɑː/','noun',
 'Grandpa reads the newspaper every day.',
 'Ông đọc báo mỗi ngày.',
 'family','easy','starters',1,'👴',1,1,1),

('st-fm-016','kid','đứa trẻ (thân mật)','/kɪd/','noun',
 'The kids are playing in the park.',
 'Những đứa trẻ đang chơi trong công viên.',
 'family','easy','starters',1,'🧒',1,1,1),

('st-fm-017','live','sống / sinh sống','/lɪv/','verb',
 'Where do you live?',
 'Bạn sống ở đâu?',
 'family','easy','starters',1,'🏠',1,1,1),

('st-fm-018','man','người đàn ông','/mæn/','noun',
 'That man is my teacher.',
 'Người đàn ông đó là giáo viên của tôi.',
 'family','easy','starters',1,'👨',1,1,1),

('st-fm-019','mother','mẹ','/ˈmʌðə/','noun',
 'My mother is a teacher.',
 'Mẹ tôi là giáo viên.',
 'family','easy','starters',1,'👩',1,1,1),

('st-fm-020','mum','mẹ (thân mật)','/mʌm/','noun',
 'Mum, can I go to the park?',
 'Mẹ ơi, con có thể ra công viên không?',
 'family','easy','starters',1,'👩',1,1,1),

('st-fm-021','old','già / nhiều tuổi','/əʊld/','adjective',
 'My grandfather is very old but very healthy.',
 'Ông tôi rất già nhưng rất khoẻ mạnh.',
 'family','easy','starters',1,'👴',1,1,1),

('st-fm-022','person','người','/ˈpɜːsən/','noun',
 'She is a kind person.',
 'Cô ấy là một người tốt bụng.',
 'family','easy','starters',1,'🧑',1,1,1),

('st-fm-023','sister','chị / em gái','/ˈsɪstə/','noun',
 'My sister and I go to the same school.',
 'Chị gái và tôi học cùng trường.',
 'family','easy','starters',1,'👧',1,1,1),

('st-fm-024','woman','người phụ nữ','/ˈwʊmən/','noun',
 'The woman is reading a book.',
 'Người phụ nữ đang đọc sách.',
 'family','easy','starters',1,'👩',1,1,1),

('st-fm-025','young','trẻ / ít tuổi','/jʌŋ/','adjective',
 'My little sister is very young.',
 'Em gái tôi còn rất nhỏ.',
 'family','easy','starters',1,'🌱',1,1,1);

-- ── A1 MOVERS — Family & Friends (9 từ) ──────────────────────
INSERT OR IGNORE INTO vocabulary_bank
  (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,
   certificate,cert_order,emoji,game_hangman,game_flashcard,game_choice)
VALUES
('mv-fm-001','aunt','cô / dì / thím','/ɑːnt/','noun',
 'My aunt lives in the city and works as a doctor.',
 'Cô tôi sống ở thành phố và làm bác sĩ.',
 'family','easy','movers',2,'👩',1,1,1),

('mv-fm-002','daughter','con gái','/ˈdɔːtə/','noun',
 'They have two sons and one daughter.',
 'Họ có hai con trai và một con gái.',
 'family','easy','movers',2,'👧',1,1,1),

('mv-fm-003','granddaughter','cháu gái','/ˈɡrændɔːtə/','noun',
 'My grandmother has three granddaughters.',
 'Bà tôi có ba cháu gái.',
 'family','medium','movers',2,'👧',1,1,1),

('mv-fm-004','grandparent','ông bà','/ˈɡrænpeərənt/','noun',
 'My grandparents live in the countryside.',
 'Ông bà tôi sống ở vùng quê.',
 'family','medium','movers',2,'👴',1,1,1),

('mv-fm-005','grandson','cháu trai','/ˈɡrænsʌn/','noun',
 'He is the youngest grandson in the family.',
 'Anh ấy là cháu trai út trong gia đình.',
 'family','medium','movers',2,'👦',1,1,1),

('mv-fm-006','grown-up','người lớn','/ˈɡrəʊn ʌp/','noun',
 'Children must listen to grown-ups.',
 'Trẻ em phải nghe lời người lớn.',
 'family','medium','movers',2,'🧑',1,1,1),

('mv-fm-007','parent','phụ huynh / cha mẹ','/ˈpeərənt/','noun',
 'My parents take me to school every day.',
 'Cha mẹ tôi đưa tôi đến trường mỗi ngày.',
 'family','easy','movers',2,'👨‍👩‍👧',1,1,1),

('mv-fm-008','son','con trai','/sʌn/','noun',
 'They are very proud of their son.',
 'Họ rất tự hào về con trai của mình.',
 'family','easy','movers',2,'👦',1,1,1),

('mv-fm-009','uncle','chú / bác / cậu','/ˈʌŋkəl/','noun',
 'My uncle is very funny and kind.',
 'Chú tôi rất vui tính và tốt bụng.',
 'family','easy','movers',2,'👨',1,1,1);

-- ── A2 FLYERS — Family & Friends (4 từ) ──────────────────────
INSERT OR IGNORE INTO vocabulary_bank
  (id,word,translation_vi,ipa,word_type,example_en,example_vi,topic,difficulty,
   certificate,cert_order,emoji,game_hangman,game_flashcard,game_choice)
VALUES
('fl-fm-001','husband','chồng','/ˈhʌzbənd/','noun',
 'Her husband works in a bank.',
 'Chồng của cô ấy làm việc ở ngân hàng.',
 'family','medium','flyers',3,'👨',1,1,1),

('fl-fm-002','married','đã kết hôn','/ˈmærid/','adjective',
 'They got married last summer.',
 'Họ kết hôn vào mùa hè năm ngoái.',
 'family','medium','flyers',3,'💍',1,1,1),

('fl-fm-003','surname','họ (tên họ)','/ˈsɜːneɪm/','noun',
 'My surname is Nguyen.',
 'Họ của tôi là Nguyễn.',
 'family','medium','flyers',3,'📛',1,1,1),

('fl-fm-004','wife','vợ','/waɪf/','noun',
 'His wife is a teacher at our school.',
 'Vợ của anh ấy là giáo viên ở trường chúng tôi.',
 'family','medium','flyers',3,'👩',1,1,1);
