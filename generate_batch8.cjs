const fs = require('fs');

function getCertOrder(cert) {
  if (cert === 'starters') return 1;
  if (cert === 'movers') return 2;
  if (cert === 'flyers') return 3;
  return 3;
}

// word_type helpers per topic
const VERB_WORDS = new Set([
  'listen','play','draw','drive','enjoy','fish','fly','hop','kick','ride','run',
  'sail','sing','skip','swim','throw','watch','bounce','catch','dance','go shopping',
  'meet','join','collect','practise','practice',
  // time
  'watch',
  // transport
  'drive','fly','go','ride','run','swim',
  // work
  'work',
]);

const ADJ_WORDS = new Set([
  'cloudy','foggy','sunny','windy','favourite','online','early','future',
]);

function getWordType(word, topic) {
  if (VERB_WORDS.has(word)) return 'verb';
  if (ADJ_WORDS.has(word)) return 'adjective';
  if (['afternoon','morning','evening','night','today','yesterday','tomorrow','tonight',
       'weekend','midday','midnight','always','never','sometimes','before','after','every'].includes(word)) return 'adverb';
  return 'noun';
}

// translation map (complete for all 7 topics)
const TRANSLATIONS = {
  // Sports & Leisure
  'badminton':'cầu lông','ball':'quả bóng','baseball':'bóng chày','basketball':'bóng rổ',
  'bat':'gậy đánh bóng','beach':'bãi biển','bike':'xe đạp','boat':'thuyền',
  'book':'cuốn sách','bounce':'nảy bóng','camera':'máy ảnh','catch':'bắt (bóng)',
  'doll':'búp bê','draw':'vẽ','drawing':'bức vẽ','drive':'lái xe',
  'enjoy':'thích thú','favourite':'yêu thích','fishing':'câu cá','fly':'bay',
  'football':'bóng đá','game':'trò chơi','guitar':'đàn guitar','hobby':'sở thích',
  'hockey':'khúc côn cầu','jump':'nhảy','kick':'đá','kite':'con diều',
  'listen':'nghe','music':'âm nhạc','photo':'ảnh','piano':'đàn piano',
  'picture':'bức tranh','play':'chơi','radio':'radio','read':'đọc',
  'ride':'cưỡi / đi xe','run':'chạy','sing':'hát','skateboard':'ván trượt',
  'skateboarding':'trượt ván','soccer':'bóng đá (Mỹ)','song':'bài hát',
  'sport':'thể thao','story':'câu chuyện','swim':'bơi lội','table tennis':'bóng bàn',
  'take a photo':'chụp ảnh','television':'ti vi','tennis':'quần vợt',
  'tennis racket':'vợt tennis','throw':'ném','toy':'đồ chơi','TV':'ti vi',
  'walk':'đi bộ','watch':'xem / đồng hồ','band':'ban nhạc','CD':'đĩa CD',
  'cinema':'rạp chiếu phim','comic':'truyện tranh','comic book':'truyện tranh',
  'dance':'nhảy múa','DVD':'đĩa DVD','email':'thư điện tử','film':'phim',
  'go shopping':'đi mua sắm','goal':'bàn thắng','holiday':'kỳ nghỉ','hop':'nhảy lò cò',
  'ice skates':'giày trượt băng','ice skating':'trượt băng','movie':'phim',
  'net':'lưới','party':'bữa tiệc','player':'người chơi','pool':'bể bơi',
  'practice':'luyện tập','practise':'luyện tập','present':'quà tặng',
  'roller skates':'giày patin','roller skating':'trượt patin','sail':'chèo thuyền',
  'score':'điểm số','skate':'trượt patin','skip':'nhảy dây','sports centre':'trung tâm thể thao',
  'text':'tin nhắn','towel':'khăn tắm','video':'video','backpack':'ba lô',
  'cartoon':'phim hoạt hình','channel':'kênh truyền hình','chess':'cờ vua',
  'collect':'sưu tầm','concert':'buổi hòa nhạc','diary':'nhật ký','drum':'trống',
  'festival':'lễ hội','flashlight':'đèn pin','golf':'golf','hotel':'khách sạn',
  'instrument':'nhạc cụ','invitation':'lời mời','join':'tham gia','magazine':'tạp chí',
  'match':'trận đấu','meet':'gặp gỡ','member':'thành viên','online':'trực tuyến',
  'pop music':'nhạc pop','prize':'giải thưởng','programme':'chương trình','puzzle':'bài đố',
  'pyramid':'kim tự tháp','quiz':'câu đố','race':'cuộc đua','rock music':'nhạc rock',
  'rucksack':'ba lô','ski':'trượt tuyết','sledge':'xe trượt tuyết','snowball':'quả cầu tuyết',
  'snowboard':'ván trượt tuyết','snowboarding':'trượt ván tuyết','snowman':'người tuyết',
  'stage':'sân khấu','suitcase':'vali','swing':'đu quay','team':'đội','tent':'lều trại',
  'torch':'đèn pin','tune':'giai điệu','tyre':'lốp xe','umbrella':'ô / dù',
  'violin':'đàn violin','volleyball':'bóng chuyền','winner':'người chiến thắng',

  // Time
  'afternoon':'buổi chiều','birthday':'sinh nhật','clock':'đồng hồ','day':'ngày',
  'evening':'buổi tối','morning':'buổi sáng','night':'đêm','today':'hôm nay',
  'year':'năm','after':'sau','always':'luôn luôn','before':'trước','every':'mỗi',
  'never':'không bao giờ','o\'clock':'giờ (đúng)','sometimes':'đôi khi','week':'tuần',
  'weekend':'cuối tuần','yesterday':'hôm qua',
  'Monday':'Thứ Hai','Tuesday':'Thứ Ba','Wednesday':'Thứ Tư','Thursday':'Thứ Năm',
  'Friday':'Thứ Sáu','Saturday':'Thứ Bảy','Sunday':'Chủ Nhật',
  'a.m.':'buổi sáng (giờ)','ago':'trước đây','autumn':'mùa thu','calendar':'lịch',
  'century':'thế kỷ','date':'ngày tháng','early':'sớm','end':'kết thúc','fall':'mùa thu (Mỹ)',
  'future':'tương lai','hour':'giờ','how long':'bao lâu','late':'muộn','later':'muộn hơn',
  'midday':'giữa trưa','midnight':'nửa đêm','minute':'phút','month':'tháng',
  'p.m.':'buổi chiều (giờ)','past':'quá khứ / quá','quarter':'một phần tư',
  'spring':'mùa xuân','summer':'mùa hè','time':'thời gian','tomorrow':'ngày mai',
  'tonight':'tối nay','winter':'mùa đông',
  'January':'Tháng Một','February':'Tháng Hai','March':'Tháng Ba','April':'Tháng Tư',
  'May':'Tháng Năm','June':'Tháng Sáu','July':'Tháng Bảy','August':'Tháng Tám',
  'September':'Tháng Chín','October':'Tháng Mười','November':'Tháng Mười Một','December':'Tháng Mười Hai',
  'in':'vào (thời điểm)',

  // Toys
  'alien':'người ngoài hành tinh','balloon':'bóng bay','board game':'trò chơi cờ',
  'car':'ô tô đồ chơi','doll':'búp bê','helicopter':'máy bay trực thăng',
  'lorry':'xe tải','monster':'quái vật','motorbike':'xe máy','plane':'máy bay',
  'robot':'người máy','teddy':'gấu bông','train':'tàu hỏa','truck':'xe tải','model':'mô hình',

  // Transport
  'bus':'xe buýt','ship':'tàu thủy','station':'nhà ga','ticket':'vé',
  'tractor':'máy cày','trip':'chuyến đi','bus station':'bến xe buýt',
  'bus stop':'trạm xe buýt','driver':'tài xế','ambulance':'xe cứu thương',
  'bicycle':'xe đạp','fire engine':'xe cứu hỏa','journey':'hành trình',
  'lift':'thang máy / đi nhờ xe','motorway':'đường cao tốc','passenger':'hành khách',
  'platform':'sân ga','racing':'đua xe','railway':'đường sắt','rocket':'tên lửa',
  'spaceship':'tàu vũ trụ','taxi':'xe taxi','tour':'tour du lịch','traffic':'giao thông',
  'wheel':'bánh xe','go':'đi',

  // Weather
  'sun':'mặt trời','cloud':'đám mây','cloudy':'nhiều mây','ice':'băng',
  'rain':'mưa','rainbow':'cầu vồng','sky':'bầu trời','snow':'tuyết',
  'sunny':'nắng','weather':'thời tiết','wind':'gió','windy':'có gió',
  'fog':'sương mù','foggy':'có sương mù','storm':'bão',

  // Work
  'teacher':'giáo viên','circus':'rạp xiếc','clown':'chú hề','cook':'đầu bếp',
  'dentist':'nha sĩ','doctor':'bác sĩ','farmer':'nông dân','film star':'ngôi sao điện ảnh',
  'hospital':'bệnh viện','nurse':'y tá','pirate':'cướp biển','pop star':'ngôi sao nhạc pop',
  'work':'làm việc','actor':'diễn viên','airport':'sân bay','artist':'nghệ sĩ',
  'astronaut':'phi hành gia','business':'kinh doanh','businessman':'doanh nhân',
  'businesswoman':'nữ doanh nhân','designer':'nhà thiết kế','engineer':'kỹ sư',
  'factory':'nhà máy','fire fighter':'lính cứu hỏa','job':'công việc',
  'journalist':'nhà báo','manager':'quản lý','mechanic':'thợ cơ khí',
  'meeting':'cuộc họp','news':'tin tức','newspaper':'báo','office':'văn phòng',
  'photographer':'nhiếp ảnh gia','pilot':'phi công','police officer':'cảnh sát',
  'police station':'đồn cảnh sát','queen':'nữ hoàng','singer':'ca sĩ','waiter':'bồi bàn',

  // The world around us
  'sand':'cát','sea':'biển','shell':'vỏ sò','street':'đường phố','tree':'cây',
  'water':'nước','building':'tòa nhà','city':'thành phố','country':'đất nước',
  'countryside':'vùng nông thôn','field':'cánh đồng','forest':'rừng','grass':'cỏ',
  'ground':'mặt đất','island':'hòn đảo','lake':'hồ','leaf':'chiếc lá','moon':'mặt trăng',
  'mountain':'núi','plant':'cây cối','river':'sông','road':'con đường','rock':'tảng đá',
  'star':'ngôi sao','town':'thị trấn','village':'làng','waterfall':'thác nước',
  'wave':'con sóng','world':'thế giới','air':'không khí','bridge':'cây cầu',
  'castle':'lâu đài','cave':'hang động','desert':'sa mạc','Earth':'Trái Đất',
  'entrance':'lối vào','environment':'môi trường','exit':'lối ra','fire':'lửa',
  'hill':'ngọn đồi','land':'đất liền','ocean':'đại dương','planet':'hành tinh',
  'pond':'ao','space':'vũ trụ','stone':'đá','stream':'suối','view':'cảnh quan','wood':'rừng nhỏ',
};

function esc(s) { return s.replace(/'/g, "''"); }

function genSQL(topicCode, topicName, cert, wordsList) {
  const certOrder = getCertOrder(cert);
  const certCode = cert === 'starters' ? 'st' : cert === 'movers' ? 'mv' : 'fl';
  const lines = [];

  wordsList.forEach((word, i) => {
    const id = `${certCode}-${topicCode}-${String(i + 1).padStart(3, '0')}`;
    const trans = TRANSLATIONS[word] || `(nghĩa của ${word})`;
    const ipa = `/${esc(word)}/`;
    const wtype = getWordType(word, topicName);
    const ex_en = `${word.charAt(0).toUpperCase() + word.slice(1)} is important.`;
    const ex_vi = `${trans} rất quan trọng.`;
    const difficulty = certOrder === 1 ? 'easy' : certOrder === 2 ? 'medium' : 'hard';

    lines.push(
`INSERT INTO vocabulary_bank (id, word, translation_vi, certificate, cert_order, ipa, word_type, example_en, example_vi, subject, group_tag, level_order, topic, difficulty)
VALUES ('${id}', '${esc(word)}', '${esc(trans)}', '${cert}', ${certOrder}, '${ipa}', '${wtype}', '${esc(ex_en)}', '${esc(ex_vi)}', 'english', '${cert}', ${certOrder}, '${topicName}', '${difficulty}')
ON CONFLICT(id) DO UPDATE SET
  word = excluded.word,
  translation_vi = excluded.translation_vi,
  certificate = excluded.certificate,
  cert_order = excluded.cert_order,
  word_type = excluded.word_type,
  group_tag = excluded.group_tag,
  level_order = excluded.level_order,
  topic = excluded.topic,
  difficulty = excluded.difficulty;`
    );
  });
  return lines.join('\n');
}

// ============================================================
// TOPIC DATA (from Cambridge YLE wordlist images)
// ============================================================
const topics = [

  // SPORTS & LEISURE
  { code: 'sl', name: 'sports_leisure', cert: 'starters', words: [
    'badminton','ball','baseball','basketball','bat','beach','bike','boat','book','bounce',
    'camera','catch','doll','draw','drawing','drive','enjoy','favourite','fishing','fly',
    'football','game','guitar','hobby','hockey','jump','kick','kite','listen','music',
    'photo','piano','picture','play','radio','read','ride','run','sing','skateboard',
    'skateboarding','soccer','song','sport','story','swim','table tennis','take a photo',
    'television','tennis','tennis racket','throw','toy','TV','walk','watch',
  ]},
  { code: 'sl', name: 'sports_leisure', cert: 'movers', words: [
    'band','CD','cinema','comic','comic book','dance','DVD','email','film','go shopping',
    'goal','holiday','hop','ice skates','ice skating','kick','movie','net','party','player',
    'pool','practice','practise','present','ride','roller skates','roller skating','sail',
    'score','skate','skip','sports centre','swim','text','towel','video','walk',
  ]},
  { code: 'sl', name: 'sports_leisure', cert: 'flyers', words: [
    'backpack','cartoon','channel','chess','collect','concert','diary','drum','festival',
    'flashlight','golf','hotel','instrument','invitation','join','magazine','match','meet',
    'member','online','pop music','prize','programme','puzzle','pyramid','quiz','race',
    'rock music','rucksack','score','ski','sledge','snowball','snowboard','snowboarding',
    'snowman','stage','suitcase','swing','team','tent','torch','tune','tyre','umbrella',
    'violin','volleyball','winner',
  ]},

  // TIME
  { code: 'ti', name: 'time', cert: 'starters', words: [
    'afternoon','birthday','clock','day','evening','in','morning','night','today','watch','year',
  ]},
  { code: 'ti', name: 'time', cert: 'movers', words: [
    'after','always','before','every','never','o\'clock','sometimes','week','weekend','yesterday',
    'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday',
  ]},
  { code: 'ti', name: 'time', cert: 'flyers', words: [
    'a.m.','after','ago','autumn','before','calendar','century','date','early','end',
    'fall','future','hour','how long','late','later','midday','midnight','minute','month',
    'p.m.','past','quarter','spring','summer','time','tomorrow','tonight','winter',
    'January','February','March','April','May','June','July','August',
    'September','October','November','December',
  ]},

  // TOYS
  { code: 'to', name: 'toys', cert: 'starters', words: [
    'alien','ball','balloon','baseball','basketball','bike','board game','boat','car',
    'doll','football','game','helicopter','lorry','monster','motorbike','plane','robot',
    'soccer','teddy','toy','train','truck',
  ]},
  { code: 'to', name: 'toys', cert: 'movers', words: ['model']},

  // TRANSPORT
  { code: 'tr', name: 'transport', cert: 'starters', words: [
    'bike','boat','bus','car','drive','fly','go','helicopter','lorry','plane','ride',
    'run','ship','swim','truck',
  ]},
  { code: 'tr', name: 'transport', cert: 'movers', words: [
    'bus station','bus stop','drive','driver','ride','station','ticket','tractor','trip',
  ]},
  { code: 'tr', name: 'transport', cert: 'flyers', words: [
    'ambulance','bicycle','fire engine','journey','lift','motorway','passenger','platform',
    'racing','railway','rocket','spaceship','taxi','tour','traffic','wheel',
  ]},

  // WEATHER
  { code: 'we', name: 'weather', cert: 'starters', words: ['sun']},
  { code: 'we', name: 'weather', cert: 'movers', words: [
    'cloud','cloudy','ice','rain','rainbow','sky','snow','sunny','weather','wind','windy',
  ]},
  { code: 'we', name: 'weather', cert: 'flyers', words: ['fog','foggy','storm']},

  // WORK
  { code: 'wk', name: 'work', cert: 'movers', words: [
    'circus','clown','cook','dentist','doctor','driver','farmer','film star','hospital',
    'nurse','pirate','pop star','teacher','work',
  ]},
  { code: 'wk', name: 'work', cert: 'flyers', words: [
    'actor','airport','ambulance','artist','astronaut','business','businessman',
    'businesswoman','designer','engineer','factory','fire engine','fire fighter',
    'job','journalist','manager','mechanic','meeting','news','newspaper','office',
    'photographer','pilot','police officer','police station','queen','rocket',
    'singer','taxi','waiter',
  ]},

  // THE WORLD AROUND US
  { code: 'wa', name: 'world', cert: 'starters', words: [
    'beach','sand','sea','shell','street','sun','tree','water',
  ]},
  { code: 'wa', name: 'world', cert: 'movers', words: [
    'building','city','country','countryside','field','forest','grass','ground',
    'island','lake','leaf','moon','mountain','plant','river','road','rock',
    'sky','star','town','village','waterfall','wave','world',
  ]},
  { code: 'wa', name: 'world', cert: 'flyers', words: [
    'air','bridge','castle','cave','desert','Earth','entrance','environment',
    'exit','fire','future','hill','land','ocean','planet','pond','space',
    'stone','stream','view','wood',
  ]},
];

// Generate SQL
let sql = `-- 0018: Seed 7 topics còn lại: sports_leisure, time, toys, transport, weather, work, world
-- Certificate = group_tag (starters/movers/flyers)
-- Generated: ${new Date().toISOString()}
`;

for (const t of topics) {
  sql += `\n-- ===== ${t.name.toUpperCase()} | ${t.cert} (${t.words.length} words) =====\n`;
  sql += genSQL(t.code, t.name, t.cert, t.words);
  sql += '\n';
}

fs.writeFileSync('src/worker/migrations/0018_seed_remaining_topics.sql', sql);
console.log('✅ Generated: src/worker/migrations/0018_seed_remaining_topics.sql');

// Count stats
let total = 0;
const byTopic = {};
for (const t of topics) {
  total += t.words.length;
  byTopic[t.name] = (byTopic[t.name] || 0) + t.words.length;
}
console.log(`\n📊 Total words: ${total}`);
for (const [topic, count] of Object.entries(byTopic)) {
  console.log(`   ${topic}: ${count} từ`);
}
