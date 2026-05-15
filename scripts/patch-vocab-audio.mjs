/**
 * patch-vocab-audio.mjs
 *
 * Script patch audio_url + vocabulary_bank_id vào vocab_highlight của các bài tập Flyers.
 *
 * Cách dùng:
 *   node scripts/patch-vocab-audio.mjs [--dry-run] [--parts=1,2,3]
 *
 * Logic:
 *  1. Đọc lookup map từ DB (word → {id, audio_url}) đã export ra /tmp/vocab_audio_map.json
 *  2. Với mỗi file JSON trong content/Cambridge/flyers/partX:
 *     - Với mỗi entry trong vocab_highlight:
 *       + Nếu word khớp với DB → điền vocabulary_bank_id + audio_url
 *  3. Ghi lại file (hoặc chỉ in ra nếu --dry-run)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// ── Config ──────────────────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes('--dry-run');
const PARTS_ARG = process.argv.find(a => a.startsWith('--parts='));
const PARTS = PARTS_ARG
  ? PARTS_ARG.replace('--parts=', '').split(',').map(Number)
  : [1, 2, 3];

const AUDIO_MAP_PATH = '/tmp/vocab_audio_map.json';

// ── Load lookup map ──────────────────────────────────────────────────────────
if (!fs.existsSync(AUDIO_MAP_PATH)) {
  console.error(`❌ Không tìm thấy file map: ${AUDIO_MAP_PATH}`);
  console.error('   Chạy query D1 trước để tạo file này.');
  process.exit(1);
}

const wordMap = JSON.parse(fs.readFileSync(AUDIO_MAP_PATH, 'utf8'));
console.log(`📦 Loaded ${Object.keys(wordMap).length} từ có audio từ DB`);

// ── Stats ─────────────────────────────────────────────────────────────────────
let totalFiles = 0;
let totalVocab = 0;
let totalMatched = 0;
let totalAlreadyHad = 0;

// ── Process files ─────────────────────────────────────────────────────────────
for (const part of PARTS) {
  const dir = path.join(ROOT, `content/Cambridge/flyers/part${part}`);

  if (!fs.existsSync(dir)) {
    console.warn(`⚠️  Không tìm thấy thư mục: content/Cambridge/flyers/part${part}`);
    continue;
  }

  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.json'))
    .sort();

  console.log(`\n📁 Part ${part}: ${files.length} files`);

  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (!Array.isArray(content.vocab_highlight) || content.vocab_highlight.length === 0) {
      continue;
    }

    let fileChanged = false;
    let fileMatched = 0;

    for (const item of content.vocab_highlight) {
      totalVocab++;

      // Đã có audio_url rồi → skip
      if (item.audio_url) {
        totalAlreadyHad++;
        continue;
      }

      // Tra cứu theo word (lowercase)
      const key = item.word?.toLowerCase().trim();
      const match = wordMap[key];

      if (match) {
        item.vocabulary_bank_id = match.id;
        item.audio_url = match.audio_url;
        fileChanged = true;
        fileMatched++;
        totalMatched++;
      }
    }

    if (fileChanged) {
      if (!DRY_RUN) {
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
      }
      console.log(`  ✅ ${filename} — matched ${fileMatched}/${content.vocab_highlight.length} từ${DRY_RUN ? ' [DRY-RUN]' : ''}`);
    } else {
      console.log(`  ⏭  ${filename} — không có từ mới nào khớp`);
    }

    totalFiles++;
  }
}

// ── Summary ────────────────────────────────────────────────────────────────
console.log(`
═══════════════════════════════════════════
📊 KẾT QUẢ PATCH
─────────────────────────────────────────
 Files đã xử lý   : ${totalFiles}
 Tổng vocab entry : ${totalVocab}
 Đã có audio_url  : ${totalAlreadyHad}
 Khớp & cập nhật  : ${totalMatched}
 Không khớp       : ${totalVocab - totalAlreadyHad - totalMatched}
 Mode             : ${DRY_RUN ? '🔍 DRY-RUN (không ghi file)' : '✍️  WRITE'}
═══════════════════════════════════════════
`);

if (DRY_RUN) {
  console.log('💡 Chạy không có --dry-run để áp dụng thực sự.');
}
