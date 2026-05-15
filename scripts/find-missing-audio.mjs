import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT, 'docs');
const OUT_FILE = path.join(DOCS_DIR, 'missing_audio_words.md');

const PARTS = [1, 2, 3];
const missingWords = new Map(); // word -> { translation_vi, files: Set<string> }

for (const part of PARTS) {
  const dir = path.join(ROOT, `content/Cambridge/flyers/part${part}`);
  if (!fs.existsSync(dir)) continue;

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

  for (const filename of files) {
    const filePath = path.join(dir, filename);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (!Array.isArray(content.vocab_highlight)) continue;

    for (const item of content.vocab_highlight) {
      if (!item.audio_url) {
        const word = item.word?.toLowerCase().trim();
        if (!word) continue;

        if (!missingWords.has(word)) {
          missingWords.set(word, {
            translation_vi: item.translation_vi,
            files: new Set()
          });
        }
        missingWords.get(word).files.add(filename);
      }
    }
  }
}

// Format output
let markdown = `# Danh sách từ vựng chưa có Audio (Part 1, 2, 3)\n\n`;
markdown += `*Danh sách này bao gồm các từ chưa có \`audio_url\` trong database. Cần upload file MP3 lên CDN và thêm vào bảng \`vocabulary_bank\`.*\n\n`;
markdown += `| Từ vựng | Nghĩa tiếng Việt | Xuất hiện trong |\n`;
markdown += `|---------|------------------|-----------------|\n`;

const sortedWords = Array.from(missingWords.keys()).sort();

for (const word of sortedWords) {
  const data = missingWords.get(word);
  const files = Array.from(data.files).join(', ');
  markdown += `| **${word}** | ${data.translation_vi} | ${files} |\n`;
}

markdown += `\n**Tổng cộng: ${sortedWords.length} từ duy nhất.**\n`;

if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

fs.writeFileSync(OUT_FILE, markdown, 'utf8');
console.log(`✅ Đã xuất danh sách ${sortedWords.length} từ ra file: ${OUT_FILE}`);
