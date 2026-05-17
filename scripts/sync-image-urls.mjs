// sync-image-urls.mjs
// Doc: Đồng bộ image_url từ JSON content files vào subjects.ts
// Nguồn sự thật: content/Cambridge/flyers/part*/FW*.json
// Chỉ thêm/cập nhật image_url, không động vào field nào khác
// Idempotent: chạy nhiều lần không tạo duplicate
//
// Cách dùng: node scripts/sync-image-urls.mjs
// Khi nào cần chạy: sau khi thêm bài mới hoặc cập nhật ảnh → chạy script → build → deploy

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SUBJECTS_PATH = path.join(ROOT, "src/react-app/data/subjects.ts");
const CONTENT_DIR = path.join(ROOT, "content/Cambridge/flyers");

// Step 1: Quét tất cả JSON files, build map { quizId -> image_url }
function scanJsonFiles() {
  const imageMap = {};
  const partDirs = fs.readdirSync(CONTENT_DIR).filter(d => {
    const full = path.join(CONTENT_DIR, d);
    return fs.statSync(full).isDirectory();
  });

  for (const partDir of partDirs) {
    const dir = path.join(CONTENT_DIR, partDir);
    const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
    for (const file of files) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
        if (data.id && data.image_url) {
          imageMap[data.id] = data.image_url;
        }
      } catch (_) {
        // skip invalid JSON
      }
    }
  }
  return imageMap;
}

// Step 2: Patch subjects.ts
function patchSubjects(imageMap) {
  const lines = fs.readFileSync(SUBJECTS_PATH, "utf8").split("\n");
  let currentId = null;
  let patched = 0;
  let updated = 0;
  let skipped = 0;
  const result = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect id: "FW*"
    const idMatch = line.match(/^\s+id:\s*"(FW\d+-[A-Z]+-\d+)"/);
    if (idMatch) currentId = idMatch[1];

    // Neu dong nay da co image_url va ta dang trong block co currentId
    if (currentId && line.match(/^\s+image_url:/) && imageMap[currentId]) {
      const url = imageMap[currentId];
      const indentMatch = line.match(/^(\s+)/);
      const indent = indentMatch ? indentMatch[1] : "        ";
      const newLine = `${indent}image_url: "${url}",`;
      if (line.trim() === `image_url: "${url}",`) {
        result.push(line);
        skipped++;
      } else {
        result.push(newLine);
        updated++;
        console.log(`📝 Updated: ${currentId}`);
      }
      currentId = null;
      continue;
    }

    result.push(line);

    // Sau dong est_minutes: -> chen image_url neu chua co
    if (currentId && imageMap[currentId]) {
      const estMatch = line.match(/^(\s+)est_minutes:\s*\d+,\s*$/);
      if (estMatch) {
        const nextLine = lines[i + 1];
        if (nextLine && !nextLine.match(/^\s+image_url:/)) {
          const indent = estMatch[1];
          result.push(`${indent}image_url: "${imageMap[currentId]}",`);
          patched++;
          console.log(`✅ Added:   ${currentId}`);
        }
        currentId = null;
      }
    }
  }

  fs.writeFileSync(SUBJECTS_PATH, result.join("\n"), "utf8");
  return { patched, updated, skipped };
}

// Main
console.log("Scanning JSON content files...");
const imageMap = scanJsonFiles();
console.log(`Found ${Object.keys(imageMap).length} quizzes with image_url\n`);

console.log("Patching subjects.ts...");
const { patched, updated, skipped } = patchSubjects(imageMap);

console.log(`\nDone!`);
console.log(`  Added new:    ${patched}`);
console.log(`  Updated old:  ${updated}`);
console.log(`  Already OK:   ${skipped}`);
console.log(`\nNext steps: npm run build && npm run deploy:staging`);
