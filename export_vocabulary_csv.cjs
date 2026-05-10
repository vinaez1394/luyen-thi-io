const fs = require('fs');
const path = require('path');
const emojiDict = require('emoji-dictionary');
const stringSimilarity = require('string-similarity');

const dataPath = '/tmp/vocab.json';
const outPath = path.join(__dirname, 'docs/vocabulary_export_with_evaluation.csv');

const raw = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const records = raw[0].results;

// A manual override list for known bad or acceptable emojis
const manualOverrides = {
  'snowball': '❌ (Hình người tuyết - không đúng nghĩa quả cầu tuyết)',
  'stomach': '❌ (Hình người đàn ông mang thai)',
  'chin': '❌ (Hình mặt thở ra khói)',
  'pajamas': '❌ (Hình áo kimono)',
  'pyjamas': '❌ (Hình áo kimono)',
  'belt': '❌ (Hình võ phục)',
  'shoulder': '❌ (Hình người nhún vai)',
  'rubber': '❌ (Hình cái chổi - nên là cục tẩy)',
  'eraser': '❌ (Hình cái chổi - nên là cục tẩy)',
  'board': '❌ (Hình bảng kẹp tài liệu - nên là bảng đen/trắng)',
  'rug': '❌ (Hình ô vuông màu nâu)',
  'floor': '❌ (Hình ô vuông màu nâu)',
  'room': '❌ (Hình cánh cửa)',
  'basement': '❌ (Hình ngôi nhà đổ nát)',
  'cushion': '❌ (Hình ghế sofa - nên là cái gối)',
  'fridge': '❌ (Hình cục đá)',
  'programme': '❌ (Hình bảng kẹp tài liệu - nên là tivi)',
  'channel': '❌ (Hình chảo vệ tinh - nên là tivi)',
  'jump': '❌ (Hình nhào lộn - không rõ ràng)',
  'lift': '❌ (Hình thang máy - từ này còn nghĩa là nâng lên)',
  'passenger': '❌ (Hình cái ghế ngồi)'
};

const escapeCsv = (str) => {
  if (!str) return '""';
  const escaped = String(str).replace(/"/g, '""');
  return `"${escaped}"`;
};

const rows = [];
// CSV Headers
rows.push(['id', 'word', 'translation_vi', 'topic', 'certificate', 'emoji', 'emoji_name', 'emoji_evaluation', 'image_url'].join(','));

records.forEach(r => {
  const word = r.word.toLowerCase();
  const emoji = r.emoji || '';
  
  let evalResult = '';
  let emojiName = '';

  if (!emoji) {
    evalResult = '❌ (Chưa có emoji)';
  } else if (manualOverrides[word]) {
    evalResult = manualOverrides[word];
    emojiName = emojiDict.getName(emoji) || '';
  } else {
    // Try to get emoji name
    emojiName = emojiDict.getName(emoji) || '';
    
    if (emojiName) {
      const cleanEmojiName = emojiName.replace(/_/g, ' ').toLowerCase();
      // Calculate similarity
      const similarity = stringSimilarity.compareTwoStrings(word, cleanEmojiName);
      
      // Check if word is in emoji name or vice versa
      const isIncluded = cleanEmojiName.includes(word) || word.includes(cleanEmojiName);
      
      if (isIncluded || similarity > 0.4) {
        evalResult = '✅';
      } else {
        // If similarity is low and no direct match, flag it
        evalResult = `⚠️ Cần xem lại (Tên emoji: ${cleanEmojiName})`;
      }
    } else {
      evalResult = '⚠️ Cần xem lại (Không xác định được tên emoji)';
    }
  }

  // Construct row
  const row = [
    r.id,
    r.word,
    r.translation_vi,
    r.topic,
    r.certificate,
    emoji,
    emojiName,
    evalResult,
    r.image_url || ''
  ];

  rows.push(row.map(escapeCsv).join(','));
});

fs.writeFileSync(outPath, rows.join('\n'), 'utf8');
console.log(`Exported ${records.length} records to ${outPath}`);
