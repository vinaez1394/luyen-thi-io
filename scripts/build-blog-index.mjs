#!/usr/bin/env node
/**
 * scripts/build-blog-index.mjs
 *
 * Script tự động quét tất cả file .md trong content/blog/
 * và tạo ra 2 file:
 *   1. content/blog/blog-index.json   — Metadata cho trang danh sách
 *   2. content/blog/blog-posts-dev.json — Full content cho local dev Worker
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
const INDEX_OUTPUT = join(BLOG_DIR, "blog-index.json");
const POSTS_DEV_OUTPUT = join(BLOG_DIR, "blog-posts-dev.json");

// ─── Parse Frontmatter YAML đơn giản (không cần thư viện) ──────────────────
function parseFrontmatter(fileContent) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: null, content: fileContent };

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

  // Bóc tách content (phần sau --- thứ 2)
  const contentMatch = fileContent.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/);
  const content = contentMatch ? contentMatch[1].trim() : "";

  return { frontmatter: result, content };
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
    (f) => !f.includes("blog-index") && !f.includes("blog-posts-dev")
  );

  const posts = [];        // Dùng cho blog-index.json (metadata)
  const postsDevMap = {};  // Dùng cho blog-posts-dev.json (full content)
  const errors = [];

  for (const filePath of mdFiles) {
    const rawContent = readFileSync(filePath, "utf-8");
    const { frontmatter, content } = parseFrontmatter(rawContent);

    if (!frontmatter) {
      errors.push(`⚠️  Bỏ qua (không có frontmatter): ${relative(ROOT, filePath)}`);
      continue;
    }

    if (!frontmatter.id || !frontmatter.title) {
      errors.push(`⚠️  Bỏ qua (thiếu id hoặc title): ${relative(ROOT, filePath)}`);
      continue;
    }

    const slug = frontmatter.id;

    // Metadata cho index
    posts.push({ ...frontmatter, slug });

    // Full content cho local dev
    postsDevMap[slug] = {
      frontmatter: { ...frontmatter, slug },
      content,
    };
  }

  // Sắp xếp index: Bài nổi bật lên trên, sau đó theo ngày mới nhất
  posts.sort((a, b) => {
    if (a.is_featured && !b.is_featured) return -1;
    if (!a.is_featured && b.is_featured) return 1;
    return (b.published_date || "").localeCompare(a.published_date || "");
  });

  // ── Ghi blog-index.json ──────────────────────────────────────────────────
  const index = {
    generated_at: new Date().toISOString(),
    total: posts.length,
    posts,
  };
  writeFileSync(INDEX_OUTPUT, JSON.stringify(index, null, 2), "utf-8");

  // ── Ghi blog-posts-dev.json ──────────────────────────────────────────────
  writeFileSync(POSTS_DEV_OUTPUT, JSON.stringify(postsDevMap, null, 2), "utf-8");

  // Báo cáo kết quả
  console.log(`\n✅ Đã tạo thành công 2 file:`);
  console.log(`   📝 Tổng bài viết: ${posts.length}`);
  console.log(`   📂 content/blog/blog-index.json     (metadata)`);
  console.log(`   📂 content/blog/blog-posts-dev.json (full content - local dev)`);

  if (errors.length > 0) {
    console.log(`\n⚠️  Cảnh báo (${errors.length} file bị bỏ qua):`);
    errors.forEach((e) => console.log(`   ${e}`));
  }
}

main();
