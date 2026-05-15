import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');

function scanJsonFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      scanJsonFiles(filePath, fileList);
    } else if (filePath.endsWith('.json')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allJsonFiles = scanJsonFiles(CONTENT_DIR);
let sql = '-- Sync image_url from JSON to D1\n';

for (const file of allJsonFiles) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    if (data.id && data.image_url) {
      const quizId = data.id.replace(/'/g, "''");
      const imgUrl = data.image_url.replace(/'/g, "''");
      sql += `UPDATE quiz_catalog SET image_url = '${imgUrl}' WHERE quiz_id = '${quizId}';\n`;
    }
  } catch (e) {
    console.error(`Error parsing ${file}`);
  }
}

const outSql = path.join(__dirname, 'update-images.sql');
fs.writeFileSync(outSql, sql);
console.log(`Generated ${outSql}`);

console.log('Applying to local and remote DB...');
try {
  execSync(`npx wrangler d1 execute luyen-thi-db --file=scripts/update-images.sql --remote`, { stdio: 'inherit' });
  console.log('Successfully updated remote database!');
} catch(e) {
  console.error('Failed to update remote DB');
}
