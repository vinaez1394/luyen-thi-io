#!/usr/bin/env node
// generate_migration_0019.cjs
// Generates SQL migration to fix translation_vi placeholders + add emoji
// for all 266 words from 0017_seed_home_materials_places_school.sql
// Run: node generate_migration_0019.cjs

const fs = require('fs');
const path = require('path');

// =====================================================
// DATA: translation_vi + emoji cho từng topic
// =====================================================

const HOME_STARTERS = [
  ['st-ho-001','apartment','căn hộ chung cư','🏢'],
  ['st-ho-002','armchair','ghế bành','🪑'],
  ['st-ho-003','bath','bồn tắm','🛁'],
  ['st-ho-004','bathroom','phòng tắm','🚿'],
  ['st-ho-005','bed','giường ngủ','🛏️'],
  ['st-ho-006','bedroom','phòng ngủ','🛏️'],
  ['st-ho-007','bookcase','tủ sách','📚'],
  ['st-ho-008','box','hộp','📦'],
  ['st-ho-009','camera','máy ảnh','📷'],
  ['st-ho-010','chair','ghế','🪑'],
  ['st-ho-011','clock','đồng hồ treo tường','🕐'],
  ['st-ho-012','computer','máy tính','💻'],
  ['st-ho-013','cupboard','tủ đựng đồ','🪵'],
  ['st-ho-014','desk','bàn học/làm việc','🪵'],
  ['st-ho-015','dining room','phòng ăn','🍽️'],
  ['st-ho-016','doll','búp bê','🪆'],
  ['st-ho-017','door','cánh cửa','🚪'],
  ['st-ho-018','flat','căn hộ','🏠'],
  ['st-ho-019','flower','bông hoa','🌸'],
  ['st-ho-020','garden','khu vườn','🌿'],
  ['st-ho-021','hall','hành lang/sảnh','🚪'],
  ['st-ho-022','home','ngôi nhà/tổ ấm','🏡'],
  ['st-ho-023','house','ngôi nhà','🏠'],
  ['st-ho-024','kitchen','nhà bếp','🍳'],
  ['st-ho-025','lamp','đèn để bàn','💡'],
  ['st-ho-026','living room','phòng khách','🛋️'],
  ['st-ho-027','mat','tấm thảm chùi chân','🪴'],
  ['st-ho-028','mirror','gương','🪞'],
  ['st-ho-029','phone','điện thoại','📞'],
  ['st-ho-030','picture','bức tranh/ảnh','🖼️'],
  ['st-ho-031','radio','đài phát thanh','📻'],
  ['st-ho-032','room','căn phòng','🚪'],
  ['st-ho-033','rug','tấm thảm','🟫'],
  ['st-ho-034','sleep','ngủ','😴'],
  ['st-ho-035','sofa','ghế sofa','🛋️'],
  ['st-ho-036','table','bàn','🪵'],
  ['st-ho-037','television','ti vi','📺'],
  ['st-ho-038','toy','đồ chơi','🧸'],
  ['st-ho-039','tree','cái cây','🌳'],
  ['st-ho-040','TV','ti vi','📺'],
  ['st-ho-041','wall','bức tường','🧱'],
  ['st-ho-042','watch','đồng hồ đeo tay','⌚'],
  ['st-ho-043','window','cửa sổ','🪟'],
];

const HOME_MOVERS = [
  ['mv-ho-001','address','địa chỉ','📍'],
  ['mv-ho-002','balcony','ban công','🌇'],
  ['mv-ho-003','basement','tầng hầm','🏚️'],
  ['mv-ho-004','blanket','chăn/mền','🛏️'],
  ['mv-ho-005','downstairs','tầng dưới','⬇️'],
  ['mv-ho-006','dream','giấc mơ','💭'],
  ['mv-ho-007','elevator','thang máy','🛗'],
  ['mv-ho-008','floor','sàn nhà','🟫'],
  ['mv-ho-009','internet','mạng internet','🌐'],
  ['mv-ho-010','lift','thang máy','🛗'],
  ['mv-ho-011','message','tin nhắn','💬'],
  ['mv-ho-012','roof','mái nhà','🏠'],
  ['mv-ho-013','seat','chỗ ngồi','💺'],
  ['mv-ho-014','shower','vòi sen','🚿'],
  ['mv-ho-015','stairs','cầu thang','🪜'],
  ['mv-ho-016','toothbrush','bàn chải đánh răng','🪥'],
  ['mv-ho-017','toothpaste','kem đánh răng','🦷'],
  ['mv-ho-018','towel','khăn tắm','🧺'],
  ['mv-ho-019','upstairs','tầng trên','⬆️'],
  ['mv-ho-020','wash','rửa/giặt','🧼'],
];

const HOME_FLYERS = [
  ['fl-ho-001','brush','bàn chải','🪥'],
  ['fl-ho-002','comb','chiếc lược','💇'],
  ['fl-ho-003','cooker','bếp nấu ăn','🍳'],
  ['fl-ho-004','cushion','gối tựa/đệm ghế','🛋️'],
  ['fl-ho-005','diary','nhật ký','📔'],
  ['fl-ho-006','entrance','lối vào','🚪'],
  ['fl-ho-007','envelope','phong bì thư','✉️'],
  ['fl-ho-008','fridge','tủ lạnh','🧊'],
  ['fl-ho-009','gate','cổng','🚧'],
  ['fl-ho-010','key','chìa khóa','🔑'],
  ['fl-ho-011','letter','bức thư','✉️'],
  ['fl-ho-012','oven','lò nướng','🔥'],
  ['fl-ho-013','screen','màn hình','🖥️'],
  ['fl-ho-014','shampoo','dầu gội đầu','🧴'],
  ['fl-ho-015','shelf','kệ tủ','📚'],
  ['fl-ho-016','soap','xà phòng','🧼'],
  ['fl-ho-017','stamp','tem thư','📮'],
  ['fl-ho-018','step','bậc thềm','🪜'],
  ['fl-ho-019','swing','xích đu','🎠'],
  ['fl-ho-020','telephone','điện thoại','📞'],
];

const MATERIALS_STARTERS = [
  ['st-ma-001','paper','giấy','📄'],
];

const MATERIALS_FLYERS = [
  ['fl-ma-001','card','bìa cứng/thẻ','📋'],
  ['fl-ma-002','glass','thủy tinh','🪟'],
  ['fl-ma-003','gold','vàng (kim loại)','🥇'],
  ['fl-ma-004','metal','kim loại','⚙️'],
  ['fl-ma-005','plastic','nhựa','♻️'],
  ['fl-ma-006','silver','bạc (kim loại)','🥈'],
  ['fl-ma-007','wood','gỗ','🪵'],
  ['fl-ma-008','wool','len','🧶'],
];

const PLACES_STARTERS = [
  ['st-pd-001','behind','phía sau','↩️'],
  ['st-pd-002','between','ở giữa (hai vật)','↔️'],
  ['st-pd-003','bookshop','hiệu sách','📚'],
  ['st-pd-004','end','điểm cuối/cuối đường','🏁'],
  ['st-pd-005','here','ở đây','📍'],
  ['st-pd-006','in','trong','📦'],
  ['st-pd-007','in front of','trước mặt','⬆️'],
  ['st-pd-008','on','trên','⬆️'],
  ['st-pd-009','park','công viên','🌳'],
  ['st-pd-010','playground','sân chơi','🛝'],
  ['st-pd-011','shop','cửa hàng','🏪'],
  ['st-pd-012','store','cửa hàng lớn','🏬'],
  ['st-pd-013','street','con phố','🛣️'],
  ['st-pd-014','there','ở đó','📍'],
  ['st-pd-015','under','bên dưới','⬇️'],
  ['st-pd-016','zoo','sở thú','🦁'],
];

const PLACES_MOVERS = [
  ['mv-pd-001','above','phía trên','⬆️'],
  ['mv-pd-002','below','phía dưới','⬇️'],
  ['mv-pd-003','building','tòa nhà','🏢'],
  ['mv-pd-004','bus station','bến xe buýt','🚌'],
  ['mv-pd-005','bus stop','trạm xe buýt','🚏'],
  ['mv-pd-006','café','quán cà phê','☕'],
  ['mv-pd-007','car park','bãi đỗ xe','🅿️'],
  ['mv-pd-008','centre','trung tâm','📍'],
  ['mv-pd-009','cinema','rạp chiếu phim','🎬'],
  ['mv-pd-010','circle','vòng tròn','⭕'],
  ['mv-pd-011','circus','rạp xiếc','🎪'],
  ['mv-pd-012','city centre','trung tâm thành phố','🏙️'],
  ['mv-pd-013','farm','trang trại','🌾'],
  ['mv-pd-014','funfair','hội chợ vui','🎡'],
  ['mv-pd-015','hospital','bệnh viện','🏥'],
  ['mv-pd-016','library','thư viện','📖'],
  ['mv-pd-017','map','bản đồ','🗺️'],
  ['mv-pd-018','market','chợ','🛒'],
  ['mv-pd-019','near','gần','📍'],
  ['mv-pd-020','opposite','đối diện','↔️'],
  ['mv-pd-021','place','địa điểm','📍'],
  ['mv-pd-022','shopping centre','trung tâm mua sắm','🛍️'],
  ['mv-pd-023','sports centre','trung tâm thể thao','⚽'],
  ['mv-pd-024','square','quảng trường','🏛️'],
  ['mv-pd-025','station','nhà ga','🚉'],
  ['mv-pd-026','straight','thẳng','➡️'],
  ['mv-pd-027','supermarket','siêu thị','🛒'],
  ['mv-pd-028','swimming pool','bể bơi','🏊'],
  ['mv-pd-029','town centre','trung tâm thị trấn','🏘️'],
];

const PLACES_FLYERS = [
  ['fl-pd-001','airport','sân bay','✈️'],
  ['fl-pd-002','bank','ngân hàng','🏦'],
  ['fl-pd-003','bridge','cây cầu','🌉'],
  ['fl-pd-004','castle','lâu đài','🏰'],
  ['fl-pd-005','chemist','hiệu thuốc','💊'],
  ['fl-pd-006','club','câu lạc bộ','🏟️'],
  ['fl-pd-007','college','trường cao đẳng','🏫'],
  ['fl-pd-008','corner','góc đường','↩️'],
  ['fl-pd-009','east','phía đông','🧭'],
  ['fl-pd-010','factory','nhà máy/xưởng','🏭'],
  ['fl-pd-011','fire station','trạm cứu hỏa','🚒'],
  ['fl-pd-012','front','phía trước','⬆️'],
  ['fl-pd-013','get to','đến được (nơi nào đó)','📍'],
  ['fl-pd-014','hotel','khách sạn','🏨'],
  ['fl-pd-015','kilometre','ki-lô-mét','📏'],
  ['fl-pd-016','left','bên trái','⬅️'],
  ['fl-pd-017','London','thành phố Luân Đôn','🎡'],
  ['fl-pd-018','middle','ở giữa','↔️'],
  ['fl-pd-019','museum','bảo tàng','🏛️'],
  ['fl-pd-020','north','phía bắc','🧭'],
  ['fl-pd-021','over','qua/vượt qua','↗️'],
  ['fl-pd-022','path','con đường mòn','🛤️'],
  ['fl-pd-023','police station','đồn cảnh sát','🚔'],
  ['fl-pd-024','post office','bưu điện','📮'],
  ['fl-pd-025','restaurant','nhà hàng','🍽️'],
  ['fl-pd-026','right','bên phải','➡️'],
  ['fl-pd-027','skyscraper','tòa nhà chọc trời','🏙️'],
  ['fl-pd-028','south','phía nam','🧭'],
  ['fl-pd-029','stadium','sân vận động','🏟️'],
  ['fl-pd-030','straight on','đi thẳng','➡️'],
  ['fl-pd-031','theatre','nhà hát','🎭'],
  ['fl-pd-032','university','trường đại học','🎓'],
  ['fl-pd-033','way','đường đi/hướng','🛤️'],
  ['fl-pd-034','west','phía tây','🧭'],
];

const SCHOOL_STARTERS = [
  ['st-sc-001','alphabet','bảng chữ cái','🔤'],
  ['st-sc-002','answer','câu trả lời','✅'],
  ['st-sc-003','ask','hỏi','🙋'],
  ['st-sc-004','board','bảng đen','📋'],
  ['st-sc-005','book','cuốn sách','📖'],
  ['st-sc-006','bookcase','tủ sách','📚'],
  ['st-sc-007','class','lớp học','🏫'],
  ['st-sc-008','classroom','phòng học','🏫'],
  ['st-sc-009','close','đóng lại','🚪'],
  ['st-sc-010','colour','màu sắc','🎨'],
  ['st-sc-011','computer','máy tính','💻'],
  ['st-sc-012','correct','đúng/chính xác','✔️'],
  ['st-sc-013','crayon','bút màu sáp','🖍️'],
  ['st-sc-014','cross','dấu chéo/sai','❌'],
  ['st-sc-015','cupboard','tủ đựng đồ','🪵'],
  ['st-sc-016','desk','bàn học','🪵'],
  ['st-sc-017','door','cánh cửa','🚪'],
  ['st-sc-018','draw','vẽ','✏️'],
  ['st-sc-019','English','tiếng Anh','🇬🇧'],
  ['st-sc-020','eraser','cục tẩy','🧹'],
  ['st-sc-021','example','ví dụ','📝'],
  ['st-sc-022','find','tìm thấy','🔍'],
  ['st-sc-023','floor','sàn nhà','🟫'],
  ['st-sc-024','keyboard','bàn phím','⌨️'],
  ['st-sc-025','learn','học','📚'],
  ['st-sc-026','lesson','bài học/tiết học','📖'],
  ['st-sc-027','letter','chữ cái/bức thư','✉️'],
  ['st-sc-028','line','đường kẻ','📏'],
  ['st-sc-029','listen','lắng nghe','👂'],
  ['st-sc-030','look','nhìn','👀'],
  ['st-sc-031','mouse','chuột máy tính','🖱️'],
  ['st-sc-032','music','âm nhạc','🎵'],
  ['st-sc-033','number','con số','🔢'],
  ['st-sc-034','open','mở ra','🔓'],
  ['st-sc-035','page','trang sách','📄'],
  ['st-sc-036','painting','bức tranh sơn','🎨'],
  ['st-sc-037','paper','giấy','📄'],
  ['st-sc-038','part','phần','📑'],
  ['st-sc-039','pen','bút bi','🖊️'],
  ['st-sc-040','pencil','bút chì','✏️'],
  ['st-sc-041','picture','hình ảnh/bức tranh','🖼️'],
  ['st-sc-042','playground','sân chơi','🛝'],
  ['st-sc-043','poster','tờ áp phích','📌'],
  ['st-sc-044','question','câu hỏi','❓'],
  ['st-sc-045','read','đọc','📖'],
  ['st-sc-046','right','đúng/phải','✔️'],
  ['st-sc-047','rubber','cục tẩy','🧹'],
  ['st-sc-048','ruler','thước kẻ','📏'],
  ['st-sc-049','school','trường học','🏫'],
  ['st-sc-050','sentence','câu văn','📝'],
  ['st-sc-051','sit','ngồi','🪑'],
  ['st-sc-052','spell','đánh vần','🔤'],
  ['st-sc-053','stand','đứng','🧍'],
  ['st-sc-054','story','câu chuyện','📖'],
  ['st-sc-055','teacher','giáo viên','👩‍🏫'],
  ['st-sc-056','tell','kể/nói','🗣️'],
  ['st-sc-057','tick','dấu tích đúng','✔️'],
  ['st-sc-058','understand','hiểu','💡'],
  ['st-sc-059','wall','bức tường','🧱'],
  ['st-sc-060','window','cửa sổ','🪟'],
  ['st-sc-061','word','từ ngữ','📝'],
  ['st-sc-062','write','viết','✍️'],
];

const SCHOOL_MOVERS = [
  ['mv-sc-001','break','giờ ra chơi','⏸️'],
  ['mv-sc-002','homework','bài tập về nhà','📝'],
  ['mv-sc-003','mistake','lỗi/sai lầm','❌'],
  ['mv-sc-004','teach','dạy học','👩‍🏫'],
  ['mv-sc-005','text','văn bản/nhắn tin','📱'],
  ['mv-sc-006','website','trang web','🌐'],
];

const SCHOOL_FLYERS = [
  ['fl-sc-001','art','nghệ thuật/mỹ thuật','🎨'],
  ['fl-sc-002','backpack','ba lô','🎒'],
  ['fl-sc-003','bin','thùng rác','🗑️'],
  ['fl-sc-004','club','câu lạc bộ','🏅'],
  ['fl-sc-005','college','trường cao đẳng','🎓'],
  ['fl-sc-006','competition','cuộc thi','🏆'],
  ['fl-sc-007','dictionary','từ điển','📚'],
  ['fl-sc-008','flag','lá cờ','🚩'],
  ['fl-sc-009','geography','môn địa lý','🌍'],
  ['fl-sc-010','glue','keo dán','🔧'],
  ['fl-sc-011','group','nhóm','👥'],
  ['fl-sc-012','gym','phòng tập thể dục','🏋️'],
  ['fl-sc-013','history','môn lịch sử','📜'],
  ['fl-sc-014','language','ngôn ngữ','🗣️'],
  ['fl-sc-015','maths','môn toán','🔢'],
  ['fl-sc-016','online','trực tuyến','🌐'],
  ['fl-sc-017','project','dự án/đề tài','📋'],
  ['fl-sc-018','rucksack','ba lô','🎒'],
  ['fl-sc-019','science','môn khoa học','🔬'],
  ['fl-sc-020','scissors','cái kéo','✂️'],
  ['fl-sc-021','screen','màn hình','🖥️'],
  ['fl-sc-022','shelf','kệ tủ','📚'],
  ['fl-sc-023','student','học sinh/sinh viên','🧑‍🎓'],
  ['fl-sc-024','study','học tập/nghiên cứu','📖'],
  ['fl-sc-025','subject','môn học','📚'],
  ['fl-sc-026','timetable','thời khóa biểu','📅'],
  ['fl-sc-027','university','trường đại học','🎓'],
];

// =====================================================
// BUILD SQL
// =====================================================
const allWords = [
  ...HOME_STARTERS,
  ...HOME_MOVERS,
  ...HOME_FLYERS,
  ...MATERIALS_STARTERS,
  ...MATERIALS_FLYERS,
  ...PLACES_STARTERS,
  ...PLACES_MOVERS,
  ...PLACES_FLYERS,
  ...SCHOOL_STARTERS,
  ...SCHOOL_MOVERS,
  ...SCHOOL_FLYERS,
];

let sql = `-- 0019: Fix translation_vi placeholders + add emoji
-- Topics: home, materials, places_directions, school (from 0017)
-- Total: ${allWords.length} words
-- Generated: ${new Date().toISOString()}
-- Safe: uses UPDATE only — không thêm/xóa row nào

`;

for (const [id, word, translation, emoji] of allWords) {
  sql += `UPDATE vocabulary_bank SET translation_vi = '${translation.replace(/'/g, "''")}', emoji = '${emoji}' WHERE id = '${id}';\n`;
}

sql += `\n-- Verify: SELECT id, word, translation_vi, emoji FROM vocabulary_bank WHERE translation_vi LIKE '(nghĩa%';\n`;

const outPath = path.join(__dirname, 'src/worker/migrations/0019_fix_translations_emoji.sql');
fs.writeFileSync(outPath, sql, 'utf8');
console.log(`✅ Generated: ${outPath}`);
console.log(`📊 Total UPDATE statements: ${allWords.length}`);
