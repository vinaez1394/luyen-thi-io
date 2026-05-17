#!/usr/bin/env node
/**
 * deploy-staging.js
 *
 * Giải quyết vấn đề: Cloudflare Vite Plugin luôn copy topLevelName "luyen-thi-io"
 * vào dist/luyen_thi_io/wrangler.json, bỏ qua env.staging.name.
 * Script này:
 *   1. Build project
 *   2. Patch dist/luyen_thi_io/wrangler.json → đổi name thành "luyen-thi-io-staging"
 *   3. Deploy lên staging worker riêng biệt
 */

import { execSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const DIST_WRANGLER = join(ROOT, "dist/luyen_thi_io/wrangler.json");

const STAGING_WORKER_NAME = "luyen-thi-io-staging";
const PROD_WORKER_NAME    = "luyen-thi-io";

// ── 1. Build ─────────────────────────────────────────────────────────────────
console.log("🔨 Building project...");
execSync("npm run build", { stdio: "inherit" });

// ── 2. Patch dist wrangler ─────────────────────────────────────────────────────
console.log(`\n🔧 Patching ${DIST_WRANGLER}`);
const raw    = readFileSync(DIST_WRANGLER, "utf8");
const config = JSON.parse(raw);

if (config.name !== STAGING_WORKER_NAME) {
  console.log(`   name: "${config.name}" → "${STAGING_WORKER_NAME}"`);
  config.name = STAGING_WORKER_NAME;
  writeFileSync(DIST_WRANGLER, JSON.stringify(config, null, 2));
} else {
  console.log(`   name already "${STAGING_WORKER_NAME}", no patch needed.`);
}

// ── 3. Deploy ─────────────────────────────────────────────────────────────────
console.log(`\n🚀 Deploying to staging worker: ${STAGING_WORKER_NAME}`);
execSync("npx wrangler deploy --env staging", { stdio: "inherit", cwd: ROOT });

console.log(`\n✅ Staging deployed! Worker: ${STAGING_WORKER_NAME}`);
console.log(`   URL: https://luyen-thi-io-staging.vinaez1394.workers.dev`);
console.log(`   Domain: https://dev.luyenthi.io.vn`);

// ── 4. Kiểm tra secrets đã được set chưa ──────────────────────────────────────
console.log(`\n🔑 Checking secrets on staging worker...`);
try {
  const secretsOut = execSync(
    `npx wrangler secret list --name ${STAGING_WORKER_NAME} 2>/dev/null`,
    { encoding: "utf8" }
  );
  const secrets = JSON.parse(secretsOut || "[]");
  const required = ["GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "SESSION_SECRET", "CACHE_ADMIN_KEY"];
  const missing = required.filter(
    (k) => !secrets.some((s) => s.name === k)
  );
  if (missing.length > 0) {
    console.warn(`\n⚠️  Missing secrets on ${STAGING_WORKER_NAME}:`);
    missing.forEach((k) => console.warn(`   - ${k}`));
    console.warn(`\n   Fix: Run the following commands:`);
    missing.forEach((k) =>
      console.warn(`   echo "VALUE" | npx wrangler secret put ${k} --name ${STAGING_WORKER_NAME}`)
    );
    console.warn(`   Or copy from .dev.vars:\n   node scripts/sync-staging-secrets.mjs`);
  } else {
    console.log(`   ✅ All required secrets are set.`);
  }
} catch {
  console.warn(`   ⚠️  Could not verify secrets (non-fatal). Check manually if login fails.`);
}

// ── 5. Invalidate KV Cache (QUAN TRỌNG) ──────────────────────────────────────
// Sau deploy, KV cache vẫn giữ data cũ (30 phút TTL).
// Phải invalidate ngay để user thấy bài mới và thumbnail đúng.
console.log(`\n🧹 Invalidating KV cache on staging...`);
try {
  const { execFileSync } = await import("child_process");
  // Chờ 3 giây để worker khởi động xong trước khi gọi API
  await new Promise((r) => setTimeout(r, 3000));
  // Đọc key từ env var trước, fallback về .dev.vars
  let adminKey = process.env.CACHE_ADMIN_KEY || "";
  if (!adminKey) {
    try {
      const { readFileSync } = await import("fs");
      const devVars = readFileSync(join(ROOT, ".dev.vars"), "utf8");
      const match = devVars.match(/^CACHE_ADMIN_KEY=(.+)$/m);
      if (match) adminKey = match[1].trim();
    } catch { /* không có .dev.vars, bỏ qua */ }
  }
  const res = execSync(
    `curl -s -X POST "https://dev.luyenthi.io.vn/api/subjects/cache/invalidate" -H "Content-Type: application/json" -H "x-admin-key: ${adminKey}" -d '{}'`,
    { encoding: "utf8" }
  );
  const parsed = JSON.parse(res || "{}");
  if (parsed.ok) {
    console.log(`   ✅ KV cache invalidated. Deleted ${parsed.deleted} key(s).`);
  } else if (res.includes("Unauthorized")) {
    console.warn(`   ⚠️  Cache invalidation failed: Unauthorized. Set CACHE_ADMIN_KEY env var or wrangler secret.`);
  } else {
    console.warn(`   ⚠️  Cache invalidation returned unexpected response:`, res);
  }
} catch (e) {
  console.warn(`   ⚠️  Could not invalidate KV cache (non-fatal). Run manually if needed:`);
  console.warn(`   curl -X POST "https://dev.luyenthi.io.vn/api/subjects/cache/invalidate" -H "Content-Type: application/json" -d '{}'`);
}

