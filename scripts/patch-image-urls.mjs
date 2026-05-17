/**
 * patch-image-urls.mjs
 * Thêm image_url vào từng lesson entry trong subjects.ts
 * Cách: tìm dòng `id: "FW*"` rồi chèn image_url ngay trước dấu `}`
 * 
 * AN TOÀN: chỉ thêm image_url nếu chưa có, không động vào bất kỳ field nào khác.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SUBJECTS_PATH = path.join(__dirname, "../src/react-app/data/subjects.ts");

// Map quiz_id → image_url (lấy từ D1)
const IMAGE_URLS = {
  // ── Part 1 ──────────────────────────────────────────────────────────────────
  "FW1-EASY-001": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-EASY-01-things-around-us.jpg",
  "FW1-EASY-002": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-EASY-02-food-and-drink.jpg",
  "FW1-EASY-003": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-EASY-03-clothes-and-weather.jpg",
  "FW1-EASY-004": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-EASY-04-hobbies-and-leisure.jpg",
  "FW1-MED-001": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-MED-01-jobs-travel-and-places.jpg",
  "FW1-MED-002": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-MED-02-sports-and-health.jpg",
  "FW1-MED-003": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-MED-03-travel-and-transportation.jpg",
  "FW1-MED-004": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-MED-04-computing-and-technology.jpg",
  "FW1-MED-005": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-MED-05-nature-and-animals.jpg",
  "FW1-MED-006": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-MED-06-health-and-body.jpg",
  "FW1-HARD-001": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-HARD-01-education-and-professions.jpg",
  "FW1-HARD-002": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-HARD-02-science-and-discovery.jpg",
  "FW1-HARD-003": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-HARD-03-society-and-culture.jpg",
  "FW1-HARD-004": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-HARD-04-history-and-society.jpg",
  "FW1-HARD-005": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P1-HARD-05-technology-and-modern-world.jpg",
  // ── Part 2 ──────────────────────────────────────────────────────────────────
  "FW2-EASY-001": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-EASY-01-a-visit-to-the-zoo.jpg",
  "FW2-EASY-002": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-EASY-02-a-day-at-school.jpg",
  "FW2-EASY-003": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-EASY-03-our-solar-system.jpg",
  "FW2-EASY-004": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-EASY-04-amazing-animals.jpg",
  "FW2-EASY-005": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-EASY-05-a-birthday-party.jpg",
  "FW2-MED-001": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-01-a-trip-to-the-museum.jpg",
  "FW2-MED-002": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-02-a-camping-trip.jpg",
  "FW2-MED-003": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-03-the-science-project.jpg",
  "FW2-MED-004": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-04-the-lost-suitcase.jpg",
  "FW2-MED-005": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-05-the-new-music-club.jpg",
  "FW2-MED-006": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-06-preparing-for-a-party.jpg",
  "FW2-MED-007": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-07-shopping-for-new-clothes.jpg",
  "FW2-MED-008": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-08-a-holiday-in-the-mountains.jpg",
  "FW2-MED-009": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-09-a-new-pet.jpg",
  "FW2-MED-010": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-10-THE-COOKING-CLUB.jpg",
  "FW2-MED-011": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-11-AT-THE-LIBRARY.jpg",
  "FW2-MED-012": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-12-A-VISIT-TO-THE-DOCTOR.jpg",
  "FW2-MED-013": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-13-CLEANING-THE-BEACH.jpg",
  "FW2-MED-014": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-14-THE-NEW-COMPUTER.jpg",
  "FW2-MED-015": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-MED-15-HELPING-AT-A-CAFE.jpg",
  "FW2-HARD-001": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-HARD-01-the-school-robot-competition.jpg",
  "FW2-HARD-002": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-HARD-02-mysterious-visit-to-the-museum.jpg",
  "FW2-HARD-003": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-HARD-03-a-day-at-the-tv-studio.jpg",
  "FW2-HARD-004": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-HARD-04-the-volcano-project.jpg",
  "FW2-HARD-005": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P2-HARD-05-the-new-art-gallery.jpg",
  // ── Part 3 ──────────────────────────────────────────────────────────────────
  "FW3-MED-001": "https://cdn.luyenthi.io.vn/Cambridge/FLYER-R%26W-P3-MED-01-a-camping-adventure.jpg",
  "FW3-MED-002": "https://cdn.luyenthi.io.vn/Cambridge/FLYER-R%26W-P3-MED-02-busy-day-at-the-farm.jpg",
  "FW3-MED-003": "https://cdn.luyenthi.io.vn/Cambridge/FLYER-RW-P3-MED-03-a-day-at-the-sea.jpg",
  "FW3-MED-004": "https://cdn.luyenthi.io.vn/Cambridge/FLYER-RW-P3-MED-04-the-space-museum.jpg",
  "FW3-MED-005": "https://cdn.luyenthi.io.vn/Cambridge/FLYER-RW-P3-MED-05-a-visit-to-the-hospital.jpg",
  "FW3-MED-006": "https://cdn.luyenthi.io.vn/Cambridge/FLYER-RW-P3-MED-06-the-big-football-match.jpg",
  "FW3-MED-007": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-MED-07-the-cooking-competition.jpg",
  "FW3-MED-008": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-MED-08-a-trip-to-the-desert.jpg",
  "FW3-MED-009": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-MED-09-the-new-invention.jpg",
  "FW3-MED-010": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-MED-10-a-rainy-day-at-the-zoo.jpg",
  "FW3-HARD-001": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-HARD-01-the-secret-of-the-ancient-cave.jpg",
  "FW3-HARD-002": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-HARD-02-saving-the-green-valley.jpg",
  "FW3-HARD-003": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-HARD-03-the-new-software.jpg",
  "FW3-HARD-004": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-HARD-04-the-weather-station.jpg",
  "FW3-HARD-005": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-HARD-05-the-mysterious-signal.jpg",
  "FW3-HARD-006": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-HARD-06-the-deep-sea-adventure.jpg",
  "FW3-HARD-007": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-HARD-07-the-endangered-forest.jpg",
  "FW3-HARD-008": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-HARD-08-the-robot-competition.jpg",
  "FW3-HARD-009": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-HARD-09-the-digital-discovery.jpg",
  "FW3-HARD-010": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P3-HARD-10-the-science-project.jpg",
  // ── Part 4 ──────────────────────────────────────────────────────────────────
  "FW4-MED-001": "https://cdn.luyenthi.io.vn/Cambridge/FLYER-R%26W-P4-MED-01-LIVING%20IN%20SPACE.jpeg",
  "FW4-MED-002": "https://cdn.luyenthi.io.vn/Cambridge/FLYER-R%26W-P4-MED-02-THE%20AMAZING%20GIANT%20PANDA.jpeg",
  "FW4-MED-003": "https://cdn.luyenthi.io.vn/Cambridge/FLYER-R%26W-P4-MED-03-the-world-of-volcanoes.jpeg",
  "FW4-MED-004": "https://cdn.luyenthi.io.vn/Cambridge/FLYER-R%26W-P4-MED-04-the-story-of-money.jpeg",
  "FW4-MED-005": "https://cdn.luyenthi.io.vn/Cambridge/FLYER-R%26W-P4-MED-05-the-ship-of-the-desert.jpeg",
  "FW4-MED-006": "https://cdn.luyenthi.io.vn/Cambridge/FLYER-R%26W-P4-MED-06-high-in-the-sky.jpeg",
  // ── Part 5 ──────────────────────────────────────────────────────────────────
  "FW5-EASY-001": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P5-EASY-01-sports-day-at-school.jpg",
  "FW5-EASY-002": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P5-EASY-02-a-visit-to-the-zoo.jpg",
  "FW5-EASY-003": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P5-EASY-03-baking-cookies-at-home.jpg",
  "FW5-EASY-004": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P5-EASY-04-a-birthday-surprise.jpg",
  "FW5-EASY-005": "https://cdn.luyenthi.io.vn/Cambridge/FLYERS/FLYER-RW-P5-EASY-05-a-day-at-the-beach.jpg",
};

const content = fs.readFileSync(SUBJECTS_PATH, "utf8");
const lines = content.split("\n");

let patchedCount = 0;
let skippedCount = 0;
let currentId = null;
const result = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Detect id: "FW*-*-*"
  const idMatch = line.match(/id:\s*"(FW\d+-[A-Z]+-\d+)"/);
  if (idMatch) {
    currentId = idMatch[1];
  }

  result.push(line);

  // Detect closing `},` or `}` after a lesson block that has our currentId
  // Strategy: khi gặp dòng `est_minutes:` hoặc `recommended:` là dòng cuối,
  // thì ngay dòng tiếp theo là `      },` → ta thêm image_url vào TRƯỚC dòng est_minutes
  // Thực ra cách đơn giản nhất: tìm pattern `est_minutes: N,` và insert image_url ngay sau nó
  if (currentId && IMAGE_URLS[currentId]) {
    const estMatch = line.match(/^(\s+)est_minutes:\s*\d+,\s*$/);
    if (estMatch) {
      const nextLine = lines[i + 1];
      // Chỉ chèn nếu dòng tiếp theo KHÔNG phải image_url (tránh duplicate)
      if (nextLine && !nextLine.includes("image_url")) {
        const indent = estMatch[1];
        const imageUrl = IMAGE_URLS[currentId];
        result.push(`${indent}image_url: "${imageUrl}",`);
        patchedCount++;
        console.log(`✅ Patched: ${currentId}`);
      } else {
        skippedCount++;
        console.log(`⏭️  Skipped (already has image_url): ${currentId}`);
      }
      currentId = null; // reset sau khi xử lý
    }
  }
}

const patched = result.join("\n");
fs.writeFileSync(SUBJECTS_PATH, patched, "utf8");

console.log(`\n✨ Done! Patched: ${patchedCount} | Skipped: ${skippedCount}`);
