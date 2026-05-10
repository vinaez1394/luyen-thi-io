/**
 * email-auth.ts — Đăng ký bằng email + mã xác nhận OTP
 *
 * POST /api/auth/email/send-code  → Gửi mã 6 số vào email
 * POST /api/auth/email/verify     → Xác nhận mã → tạo session
 *
 * ⚠️  Cần thêm RESEND_API_KEY secret để gửi email thật.
 *     Hiện tại nếu chưa có RESEND_API_KEY, mã sẽ log ra console
 *     (chỉ dùng để test local, không dùng trên production).
 */

import { Hono } from "hono";
import {
  createSession,
  buildSetCookieHeader,
} from "../lib/session";
import type { DbUser } from "../db/types";

type Env = {
  DB: D1Database;
  SESSION: KVNamespace;
  RESEND_API_KEY?: string; // optional — cần để gửi email thật
};

export const emailAuthRoute = new Hono<{ Bindings: Env }>();

// ─── Helpers ──────────────────────────────────────────────────
/** Sinh OTP 6 số bằng crypto (an toàn, không đoán được) */
function generateOtp(): string {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return String(100000 + (arr[0] % 900000));
}

/** Max số lần thử nhập OTP sai trước khi OTP bị xóa */
const MAX_OTP_ATTEMPTS = 5;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Gửi email qua Resend API */
async function sendOtpEmail(
  to: string,
  name: string,
  otp: string,
  resendApiKey: string
): Promise<boolean> {
  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto">
      <h2 style="color:#7c3aed">Xin chào, ${name}! 👋</h2>
      <p>Mã xác nhận đăng ký tài khoản <strong>Luyện Thi</strong> của bạn là:</p>
      <div style="font-size:2.5rem;font-weight:900;letter-spacing:0.5em;
                  text-align:center;background:#f3f0ff;color:#7c3aed;
                  padding:20px;border-radius:12px;margin:20px 0">
        ${otp}
      </div>
      <p style="color:#666">Mã có hiệu lực trong <strong>5 phút</strong>. Không chia sẻ mã này với ai.</p>
      <p style="color:#999;font-size:0.85em">Nếu bạn không yêu cầu đăng ký, hãy bỏ qua email này.</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Luyện Thi <noreply@luyenthi.io.vn>",
      to: [to],
      subject: `${otp} — Mã xác nhận đăng ký Luyện Thi`,
      html,
    }),
  });

  return res.ok;
}

// ─────────────────────────────────────────────────────────────
// POST /api/auth/email/send-code
// Body: { email: string, name: string }
// ─────────────────────────────────────────────────────────────
emailAuthRoute.post("/send-code", async (c) => {
  const body = await c.req.json<Record<string, string>>().catch(() => ({} as Record<string, string>));
  const email = (body["email"] ?? "").trim().toLowerCase();
  const name  = (body["name"]  ?? "").trim();

  // Validate
  if (!email || !isValidEmail(email)) {
    return c.json({ ok: false, error: "email_invalid" }, 400);
  }
  if (!name) {
    return c.json({ ok: false, error: "name_required" }, 400);
  }

  // Rate limit: check if code was sent in last 60s
  const rateLimitKey = `otp:rate:${email}`;
  const existing = await c.env.SESSION.get(rateLimitKey);
  if (existing) {
    return c.json({ ok: false, error: "too_soon", message: "Vui lòng đợi 60 giây trước khi gửi lại." }, 429);
  }

  // Generate OTP
  const otp = generateOtp();

  // Store OTP in KV: 5 minute TTL, kèm số lần thử = 0
  const otpKey = `otp:${email}`;
  await c.env.SESSION.put(otpKey, JSON.stringify({ otp, name, attempts: 0 }), {
    expirationTtl: 300, // 5 phút
  });

  // Rate limit key: 60s
  await c.env.SESSION.put(rateLimitKey, "1", { expirationTtl: 60 });

  // Send email
  if (c.env.RESEND_API_KEY) {
    const sent = await sendOtpEmail(email, name, otp, c.env.RESEND_API_KEY);
    if (!sent) {
      console.error("Failed to send OTP email to:", email);
      return c.json({ ok: false, error: "email_failed" }, 500);
    }
  } else {
    // Dev mode only: log OTP khi chạy local (wrangler dev dùng localhost)
    const isLocal = new URL(c.req.url).hostname === "localhost";
    if (isLocal) {
      console.log(`[DEV] OTP for ${email}: ${otp}`);
    }
    // Production không có RESEND_API_KEY → lỗi cấu hình
    if (!isLocal) {
      console.error("RESEND_API_KEY not set — email not sent for:", email);
      return c.json({ ok: false, error: "email_not_configured" }, 500);
    }
  }

  return c.json({ ok: true });
});

// ─────────────────────────────────────────────────────────────
// POST /api/auth/email/verify
// Body: { email: string, code: string }
// ─────────────────────────────────────────────────────────────
emailAuthRoute.post("/verify", async (c) => {
  const body = await c.req.json<Record<string, string>>().catch(() => ({} as Record<string, string>));
  const email = (body["email"] ?? "").trim().toLowerCase();
  const code  = (body["code"]  ?? "").trim();

  if (!email || !code) {
    return c.json({ ok: false, error: "missing_fields" }, 400);
  }

  // Retrieve OTP from KV
  const otpKey = `otp:${email}`;
  const stored = await c.env.SESSION.get(otpKey);
  if (!stored) {
    return c.json({ ok: false, error: "code_invalid" }, 400);
  }

  const parsed = JSON.parse(stored) as { otp: string; name: string; attempts?: number };
  const { otp, name } = parsed;
  const attempts = parsed.attempts ?? 0;

  // Brute-force protection: tối đa 5 lần thử
  if (code !== otp) {
    const newAttempts = attempts + 1;
    if (newAttempts >= MAX_OTP_ATTEMPTS) {
      // Quá 5 lần sai → xóa OTP, buộc gửi mã mới
      await c.env.SESSION.delete(otpKey);
      return c.json(
        { ok: false, error: "code_expired", message: "Bạn đã nhập sai quá nhiều lần. Vui lòng gửi mã mới." },
        400
      );
    }
    // Lưu lại số lần thử, giữ nguyên TTL còn lại
    await c.env.SESSION.put(otpKey, JSON.stringify({ otp, name, attempts: newAttempts }), {
      expirationTtl: 300, // refresh 5 phút
    });
    return c.json(
      { ok: false, error: "code_invalid", remaining: MAX_OTP_ATTEMPTS - newAttempts },
      400
    );
  }

  // OTP đúng → xóa khỏi KV
  await c.env.SESSION.delete(otpKey);
  await c.env.SESSION.delete(`otp:rate:${email}`);

  // Find or create user in D1
  let user = await c.env.DB
    .prepare("SELECT * FROM users WHERE email = ?")
    .bind(email)
    .first<DbUser>();

  if (!user) {
    const newId = crypto.randomUUID();
    await c.env.DB
      .prepare(`INSERT INTO users (id, email, name, google_id, subscription_tier) VALUES (?, ?, ?, '', 'free')`)
      .bind(newId, email, name)
      .run();

    user = await c.env.DB
      .prepare("SELECT * FROM users WHERE id = ?")
      .bind(newId)
      .first<DbUser>();
  }

  if (!user) {
    return c.json({ ok: false, error: "db_failed" }, 500);
  }

  // Check profile để quyết định redirect
  const profile = await c.env.DB
    .prepare("SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1")
    .bind(user.id)
    .first<{ id: string }>();

  const redirectTo = profile ? "/dashboard" : "/onboarding";

  // Tạo session
  const sessionToken = await createSession(c.env.SESSION, user.id);

  return c.json(
    { ok: true, redirect: redirectTo },
    200,
    { "Set-Cookie": buildSetCookieHeader(sessionToken) }
  );
});
