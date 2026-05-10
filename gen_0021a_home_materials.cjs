#!/usr/bin/env node
// gen_0021a_home_materials.cjs — home (83) + materials (9) = 92 words
const fs = require('fs'), path = require('path');

// [id, ipa, example_en, example_vi]
const DATA = [
// HOME - STARTERS
['st-ho-001','/əˈpɑːt.mənt/','We live in a small apartment on the third floor.','Chúng tôi sống trong một căn hộ nhỏ ở tầng ba.'],
['st-ho-002','/ˈɑːm.tʃeə/','My dad always sits in the armchair after dinner.','Bố tôi luôn ngồi trên ghế bành sau bữa tối.'],
['st-ho-003','/bɑːθ/','The children love to play in the bath.','Lũ trẻ thích chơi trong bồn tắm.'],
['st-ho-004','/ˈbɑːθ.ruːm/','There are two bathrooms in our new house.','Nhà mới của chúng tôi có hai phòng tắm.'],
['st-ho-005','/bed/','She went to bed at nine o\'clock last night.','Cô ấy đi ngủ lúc chín giờ tối qua.'],
['st-ho-006','/ˈbed.ruːm/','My bedroom has a big window facing the garden.','Phòng ngủ của tôi có một cửa sổ lớn nhìn ra vườn.'],
['st-ho-007','/ˈbʊk.keɪs/','The bookcase in the living room is full of novels.','Tủ sách trong phòng khách chứa đầy tiểu thuyết.'],
['st-ho-008','/bɒks/','We put all the old toys in a cardboard box.','Chúng tôi để tất cả đồ chơi cũ vào một chiếc hộp bìa cứng.'],
['st-ho-009','/ˈkæm.ər.ə/','She took a photo of us with her new camera.','Cô ấy chụp ảnh chúng tôi bằng chiếc máy ảnh mới của mình.'],
['st-ho-010','/tʃeə/','Please sit on the chair next to the window.','Hãy ngồi vào chiếc ghế gần cửa sổ.'],
['st-ho-011','/klɒk/','The clock on the wall says half past seven.','Đồng hồ trên tường chỉ bảy giờ rưỡi.'],
['st-ho-012','/kəmˈpjuː.tə/','My sister uses the computer to do her homework.','Chị tôi dùng máy tính để làm bài tập về nhà.'],
['st-ho-013','/ˈkʌb.əd/','The plates are in the cupboard above the sink.','Những chiếc đĩa ở trong tủ phía trên bồn rửa.'],
['st-ho-014','/desk/','She does her homework at the desk in her room.','Cô ấy làm bài tập tại bàn học trong phòng mình.'],
['st-ho-015','/ˈdaɪ.nɪŋ ruːm/','Our family eats dinner together in the dining room.','Gia đình tôi ăn tối cùng nhau trong phòng ăn.'],
['st-ho-016','/dɒl/','My little sister has a favourite doll with red hair.','Em gái tôi có một búp bê yêu thích với mái tóc đỏ.'],
['st-ho-017','/dɔː/','Please close the door quietly when you leave.','Hãy đóng cửa nhẹ nhàng khi bạn ra ngoài.'],
['st-ho-018','/flæt/','They rent a small flat near the city centre.','Họ thuê một căn hộ nhỏ gần trung tâm thành phố.'],
['st-ho-019','/ˈflaʊ.ə/','She put a yellow flower in a vase on the table.','Cô ấy cắm một bông hoa vàng vào lọ trên bàn.'],
['st-ho-020','/ˈɡɑː.dən/','We grow tomatoes and herbs in our garden.','Chúng tôi trồng cà chua và thảo mộc trong vườn.'],
['st-ho-021','/hɔːl/','Leave your shoes in the hall when you come in.','Để giày ở sảnh khi bạn bước vào nhà.'],
['st-ho-022','/həʊm/','After a long holiday, it felt great to be home.','Sau kỳ nghỉ dài, được về nhà thật tuyệt.'],
['st-ho-023','/haʊs/','Their house has a big garden at the back.','Ngôi nhà của họ có một khu vườn lớn phía sau.'],
['st-ho-024','/ˈkɪtʃ.ɪn/','Mum is cooking soup in the kitchen right now.','Mẹ đang nấu súp trong bếp lúc này.'],
['st-ho-025','/læmp/','Turn on the lamp — it is getting dark outside.','Bật đèn lên — trời đang tối dần rồi.'],
['st-ho-026','/ˈlɪv.ɪŋ ruːm/','The whole family watches TV in the living room.','Cả gia đình xem ti vi trong phòng khách.'],
['st-ho-027','/mæt/','Wipe your feet on the mat before coming inside.','Hãy lau chân trên tấm thảm trước khi vào nhà.'],
['st-ho-028','/ˈmɪr.ə/','She looked at herself in the bathroom mirror.','Cô ấy nhìn vào gương trong phòng tắm.'],
['st-ho-029','/fəʊn/','Can I use your phone to call my mum?','Tôi có thể dùng điện thoại của bạn gọi cho mẹ tôi không?'],
['st-ho-030','/ˈpɪk.tʃə/','There is a picture of our family on the living room wall.','Có một bức ảnh gia đình trên tường phòng khách.'],
['st-ho-031','/ˈreɪ.di.əʊ/','Dad listens to the radio while he drives to work.','Bố nghe đài khi lái xe đi làm.'],
['st-ho-032','/ruːm/','Every room in the house has a window.','Mỗi căn phòng trong nhà đều có cửa sổ.'],
['st-ho-033','/rʌɡ/','The cat is sleeping on the rug in front of the fireplace.','Con mèo đang ngủ trên tấm thảm trước lò sưởi.'],
['st-ho-034','/sliːp/','Children need to sleep for at least nine hours a night.','Trẻ em cần ngủ ít nhất chín tiếng mỗi đêm.'],
['st-ho-035','/ˈsəʊ.fə/','We all sat on the sofa to watch the film together.','Chúng tôi cùng ngồi trên sofa để xem phim.'],
['st-ho-036','/ˈteɪ.bəl/','Please set the table — dinner is nearly ready.','Hãy bày bàn ra — bữa tối gần xong rồi.'],
['st-ho-037','/ˈtel.ɪ.vɪʒ.ən/','They watch television every evening after dinner.','Họ xem ti vi mỗi buổi tối sau bữa ăn.'],
['st-ho-038','/tɔɪ/','The children put their toys away before going to bed.','Bọn trẻ dọn đồ chơi trước khi đi ngủ.'],
['st-ho-039','/triː/','There is a tall apple tree in our garden.','Có một cây táo cao trong vườn nhà tôi.'],
['st-ho-040','/ˌtiːˈviː/','We have a large TV mounted on the living room wall.','Chúng tôi có một chiếc ti vi lớn gắn trên tường phòng khách.'],
['st-ho-041','/wɔːl/','She painted the bedroom wall a pale blue colour.','Cô ấy sơn bức tường phòng ngủ màu xanh nhạt.'],
['st-ho-042','/wɒtʃ/','My grandfather gave me his old silver watch.','Ông nội tặng cho tôi chiếc đồng hồ bạc cũ của ông.'],
['st-ho-043','/ˈwɪn.dəʊ/','Open the window — it is very hot in here.','Mở cửa sổ ra — trong này rất nóng.'],
// HOME - MOVERS
['mv-ho-001','/ˈæd.res/','Write your name and address clearly on the envelope.','Hãy viết tên và địa chỉ của bạn rõ ràng lên phong bì.'],
['mv-ho-002','/ˈbæl.kə.ni/','We have breakfast on the balcony when it is sunny.','Chúng tôi ăn sáng trên ban công khi trời nắng.'],
['mv-ho-003','/ˈbeɪs.mənt/','We store old furniture in the basement.','Chúng tôi cất đồ nội thất cũ ở tầng hầm.'],
['mv-ho-004','/ˈblæŋ.kɪt/','She pulled the warm blanket over her shoulders.','Cô ấy kéo chiếc chăn ấm lên vai.'],
['mv-ho-005','/ˌdaʊnˈsteəz/','Dad is downstairs making breakfast for everyone.','Bố đang ở tầng dưới chuẩn bị bữa sáng cho mọi người.'],
['mv-ho-006','/driːm/','Last night I had a strange dream about flying over the sea.','Tối qua tôi có một giấc mơ kỳ lạ về việc bay trên biển.'],
['mv-ho-007','/ˈel.ɪ.veɪ.tə/','We took the elevator to the fifteenth floor.','Chúng tôi đi thang máy lên tầng mười lăm.'],
['mv-ho-008','/flɔː/','Their flat is on the fourth floor of the building.','Căn hộ của họ ở tầng bốn của tòa nhà.'],
['mv-ho-009','/ˈɪn.tə.net/','We use the internet to do research for school projects.','Chúng tôi dùng internet để nghiên cứu cho các dự án ở trường.'],
['mv-ho-010','/lɪft/','The lift in our building is broken, so we use the stairs.','Thang máy trong tòa nhà hỏng nên chúng tôi dùng cầu thang.'],
['mv-ho-011','/ˈmes.ɪdʒ/','She sent me a message to say she would be late.','Cô ấy nhắn tin cho tôi nói rằng cô ấy sẽ đến muộn.'],
['mv-ho-012','/ruːf/','A bird is sitting on the roof of the house.','Một con chim đang ngồi trên mái nhà.'],
['mv-ho-013','/siːt/','Is this seat taken? Can I sit here?','Chỗ này có ai ngồi chưa? Tôi có thể ngồi đây không?'],
['mv-ho-014','/ˈʃaʊ.ə/','He has a cold shower every morning to wake himself up.','Anh ấy tắm nước lạnh mỗi sáng để tỉnh ngủ.'],
['mv-ho-015','/steəz/','She walked up the stairs to the second floor.','Cô ấy leo cầu thang lên tầng hai.'],
['mv-ho-016','/ˈtuːθ.brʌʃ/','You should replace your toothbrush every three months.','Bạn nên thay bàn chải đánh răng mỗi ba tháng.'],
['mv-ho-017','/ˈtuːθ.peɪst/','Squeeze a little toothpaste onto your brush before cleaning.','Vắt một ít kem đánh răng lên bàn chải trước khi đánh.'],
['mv-ho-018','/ˈtaʊ.əl/','Dry your hands on the towel next to the sink.','Lau tay bằng chiếc khăn bên cạnh bồn rửa.'],
['mv-ho-019','/ˌʌpˈsteəz/','My bedroom is upstairs, next to the bathroom.','Phòng ngủ của tôi ở tầng trên, bên cạnh phòng tắm.'],
['mv-ho-020','/wɒʃ/','Wash the vegetables carefully before cooking them.','Hãy rửa rau kỹ trước khi nấu.'],
// HOME - FLYERS
['fl-ho-001','/brʌʃ/','Use this brush to scrub the floor clean.','Dùng chiếc bàn chải này để kỳ cọ sàn nhà sạch sẽ.'],
['fl-ho-002','/kəʊm/','Run a comb through your hair before you go to school.','Hãy chải tóc trước khi đến trường.'],
['fl-ho-003','/ˈkʊk.ə/','The cooker has four gas rings on top.','Bếp nấu ăn có bốn vòng đốt ga ở trên.'],
['fl-ho-004','/ˈkʊʃ.ən/','She placed a soft cushion behind her back for support.','Cô ấy đặt một chiếc gối mềm sau lưng để tựa.'],
['fl-ho-005','/ˈdaɪ.ər.i/','She writes in her diary every night before going to sleep.','Cô ấy viết nhật ký mỗi tối trước khi ngủ.'],
['fl-ho-006','/ˈen.trəns/','Please wait for me at the entrance to the building.','Hãy đợi tôi ở lối vào tòa nhà.'],
['fl-ho-007','/ˈen.və.ləʊp/','She put the letter in an envelope and took it to the post office.','Cô ấy bỏ thư vào phong bì và mang đến bưu điện.'],
['fl-ho-008','/frɪdʒ/','There is some cold milk and juice in the fridge.','Có một ít sữa lạnh và nước ép trong tủ lạnh.'],
['fl-ho-009','/ɡeɪt/','Please close the garden gate after you come in.','Hãy đóng cổng vườn lại sau khi bạn vào.'],
['fl-ho-010','/kiː/','I lost my house key and had to wait outside.','Tôi làm mất chìa khóa nhà và phải đợi bên ngoài.'],
['fl-ho-011','/ˈlet.ə/','She received a long letter from her friend in Australia.','Cô ấy nhận được một bức thư dài từ người bạn ở Úc.'],
['fl-ho-012','/ˈʌv.ən/','Put the pizza in the oven for twenty-five minutes.','Cho bánh pizza vào lò nướng trong hai mươi lăm phút.'],
['fl-ho-013','/skriːn/','The screen on his laptop is cracked.','Màn hình máy tính xách tay của anh ấy bị vỡ.'],
['fl-ho-014','/ʃæmˈpuː/','Use this shampoo to wash your hair twice a week.','Dùng dầu gội này để gội đầu hai lần mỗi tuần.'],
['fl-ho-015','/ʃelf/','The books are on the shelf above the computer desk.','Những cuốn sách ở trên kệ phía trên bàn máy tính.'],
['fl-ho-016','/səʊp/','Wash your hands with soap and water for twenty seconds.','Rửa tay bằng xà phòng và nước trong hai mươi giây.'],
['fl-ho-017','/stæmp/','You need to put a stamp on the envelope before posting it.','Bạn cần dán tem thư lên phong bì trước khi gửi.'],
['fl-ho-018','/step/','Mind the step at the front door — it is slippery when wet.','Chú ý bậc thềm ở cửa trước — trơn khi ướt đấy.'],
['fl-ho-019','/swɪŋ/','The children played happily on the swing in the park.','Bọn trẻ vui vẻ chơi xích đu trong công viên.'],
['fl-ho-020','/ˈtel.ɪ.fəʊn/','The telephone rang while she was cooking in the kitchen.','Điện thoại đổ chuông trong khi cô ấy đang nấu ăn trong bếp.'],
// MATERIALS - STARTERS
['st-ma-001','/ˈpeɪ.pə/','Write your answers on a piece of paper.','Hãy viết câu trả lời lên một tờ giấy.'],
// MATERIALS - FLYERS
['fl-ma-001','/kɑːd/','She made a birthday card for her best friend.','Cô ấy làm một tấm thiệp sinh nhật cho người bạn thân.'],
['fl-ma-002','/ɡlɑːs/','Be careful — that vase is made of glass and can break.','Hãy cẩn thận — chiếc bình đó làm bằng thủy tinh và có thể vỡ.'],
['fl-ma-003','/ɡəʊld/','She wears a gold ring on her left hand.','Cô ấy đeo một chiếc nhẫn vàng ở tay trái.'],
['fl-ma-004','/ˈmet.əl/','The bridge is built from steel and other types of metal.','Cây cầu được xây dựng từ thép và các loại kim loại khác.'],
['fl-ma-005','/ˈplæs.tɪk/','We should use less plastic to protect the environment.','Chúng ta nên dùng ít nhựa hơn để bảo vệ môi trường.'],
['fl-ma-006','/ˈsɪl.və/','Her grandmother gave her a beautiful silver necklace.','Bà của cô ấy tặng cho cô một chiếc vòng cổ bạc đẹp.'],
['fl-ma-007','/wʊd/','This table is made from solid dark wood.','Chiếc bàn này được làm từ gỗ tối màu chắc chắn.'],
['fl-ma-008','/wʊl/','This warm scarf is knitted from soft wool.','Chiếc khăn quàng ấm này được đan từ len mềm.'],
];

let sql = `-- 0021a: Fix ipa + example_en + example_vi — home (83) + materials (9)
-- Generated: ${new Date().toISOString()}
-- Safe: UPDATE only, touches only ipa, example_en, example_vi columns\n\n`;

for (const [id, ipa, en, vi] of DATA) {
  const safeIpa = ipa.replace(/'/g, "''");
  const safeEn  = en.replace(/'/g, "''");
  const safeVi  = vi.replace(/'/g, "''");
  sql += `UPDATE vocabulary_bank SET ipa = '${safeIpa}', example_en = '${safeEn}', example_vi = '${safeVi}' WHERE id = '${id}';\n`;
}

sql += `\n-- Total: ${DATA.length} rows\n`;
const out = path.join(__dirname, 'src/worker/migrations/0021a_fix_ipa_examples_home_materials.sql');
fs.writeFileSync(out, sql);
console.log(`✅ ${out}\n📊 ${DATA.length} rows`);
