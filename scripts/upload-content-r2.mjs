#!/usr/bin/env node
/**
 * upload-content-r2.mjs
 *
 * Upload các file JSON bài tập Flyers (Part 1/2/3/4) lên R2 bucket.
 * R2 key format: quizzes/cambridge/flyers/partX/{filename}
 *
 * Cách dùng:
 *   node scripts/upload-content-r2.mjs [--parts=1,2,3,4] [--dry-run]
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const DRY_RUN = process.argv.includes('--dry-run');
const PARTS_ARG = process.argv.find(a => a.startsWith('--parts='));
const PARTS = PARTS_ARG
  ? PARTS_ARG.replace('--parts=', '').split(',').map(Number)
  : [1, 2, 3, 4];

const BUCKET = 'luyen-thi-content';

let uploaded = 0;
let skipped = 0;
let errors = 0;

for (const part of PARTS) {
  const dir = path.join(ROOT, `content/Cambridge/flyers/part${part}`);

  if (!fs.existsSync(dir)) {
    console.warn(`⚠️  Không tìm thấy: content/Cambridge/flyers/part${part}`);
    continue;
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json')).sort();
  console.log(`\n📁 Part ${part}: ${files.length} files → R2 quizzes/cambridge/flyers/part${part}/`);

  for (const filename of files) {
    const localPath = path.join(dir, filename);
    const r2Key = `${BUCKET}/quizzes/cambridge/flyers/part${part}/${filename}`;

    if (DRY_RUN) {
      console.log(`  [DRY-RUN] would upload: ${filename} → ${r2Key}`);
      skipped++;
      continue;
    }

    try {
      execSync(
        `npx wrangler r2 object put "${r2Key}" --file "${localPath}" --remote`,
        { stdio: 'pipe' }
      );
      console.log(`  ✅ ${filename}`);
      uploaded++;
    } catch (err) {
      console.error(`  ❌ ${filename}: ${err.message}`);
      errors++;
    }
  }
}

console.log(`
═══════════════════════════════════════════
📊 KẾT QUẢ UPLOAD R2
─────────────────────────────────────────
 Đã upload  : ${uploaded}
 Bỏ qua     : ${skipped}
 Lỗi        : ${errors}
 Mode       : ${DRY_RUN ? '🔍 DRY-RUN' : '✍️  WRITE'}
═══════════════════════════════════════════
`);
