#!/usr/bin/env node
/**
 * scripts/build-blog-index.mjs
 *
 * Script tự động quét tất cả file .md trong content/blog/
 * và tạo ra file content/blog/blog-index.json (danh sách metadata).
 *
 * Cách chạy:
 *   node scripts/build-blog-index.mjs
 *
 * Tích hợp vào build pipeline:
 *   Chạy script này TRƯỚC khi build để đảm bảo index luôn cập nhật.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, extname, relative } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");
const BLOG_DIR = join(ROOT, "content", "blog");
const OUTPUT = join(BLOG_DIR, "blog-index.json");

// ─── Parse Frontmatter YAML đơn giản (không cần thư viện) ──────────────────
function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const yamlStr = match[1];
  const result = {};

  for (const line of yamlStr.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Parse array: ["#tag1", "#tag2"]
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim().replace(/^["']|["']$/g, ""));
    }
    // Parse boolean
    else if (value === "true") value = true;
    else if (value === "false") value = false;
    // Parse number
    else if (!isNaN(value) && value !== "") value = Number(value);
    // Parse string (xóa quotes)
    else value = value.replace(/^["']|["']$/g, "");

    result[key] = value;
  }

  return result;
}

// ─── Đệ quy quét thư mục để lấy file .md ──────────────────────────────────
function scanMarkdownFiles(dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const fullPath = join(dir, name);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...scanMarkdownFiles(fullPath));
    } else if (extname(name) === ".md" && !name.startsWith("_")) {
      files.push(fullPath);
    }
  }
  return files;
}

// ─── Main ───────────────────────────────────────────────────────────────────
function main() {
  console.log("📚 Đang quét bài viết trong content/blog/...");

  const mdFiles = scanMarkdownFiles(BLOG_DIR).filter(
    (f) => !f.includes("blog-index")
  );

  const posts = [];
  const errors = [];

  for (const filePath of mdFiles) {
    const content = readFileSync(filePath, "utf-8");
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter) {
      errors.push(`⚠️  Bỏ qua (không có frontmatter): ${relative(ROOT, filePath)}`);
      continue;
    }

    if (!frontmatter.id || !frontmatter.title) {
      errors.push(`⚠️  Bỏ qua (thiếu id hoặc title): ${relative(ROOT, filePath)}`);
      continue;
    }

    posts.push({
      ...frontmatter,
      slug: frontmatter.id,
    });
  }

  // Sắp xếp: Bài nổi bật lên trên, sau đó theo ngày mới nhất
  posts.sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1;
    if (!a.is_featured && b.is_featured) return 1;
    return (b.published_date || "").localeCompare(a.published_date || "");
  });

  const index = {
    generated_at: new Date().toISOString(),
    total: posts.length,
    posts,
  };

  writeFileSync(OUTPUT, JSON.stringify(index, null, 2), "utf-8");

  // Báo cáo kết quả
  console.log(`\n✅ Đã tạo blog-index.json thành công!`);
  console.log(`   📝 Tổng bài viết: ${posts.length}`);
  console.log(`   📂 Output: content/blog/blog-index.json`);

  if (errors.length > 0) {
    console.log(`\n⚠️  Cảnh báo (${errors.length} file bị bỏ qua):`);
    errors.forEach((e) => console.log(`   ${e}`));
  }
}

main();
