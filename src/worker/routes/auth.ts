/**
 * auth.ts — Google OAuth routes
 *
 * GET  /api/auth/google    → redirect đến Google consent screen
 * GET  /api/auth/callback  → nhận code, exchange token, tạo session
 * GET  /api/auth/me        → trả về user hiện tại (từ session cookie)
 * POST /api/auth/logout    → xóa session cookie + KV
 */

import { Hono } from "hono";
import {
  createSession,
  deleteSession,
  getSession,
  getSessionTokenFromCookie,
  buildSetCookieHeader,
  buildClearCookieHeader,
} from "../lib/session";
import type { DbUser } from "../db/types";

type Env = {
  DB: D1Database;
  SESSION: KVNamespace;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
};

export const authRoute = new Hono<{ Bindings: Env }>();

// =============================================
// Google user info type
// =============================================
interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

// =============================================
// GET /api/auth/google — Redirect to Google
// =============================================
authRoute.get("/google", (c) => {
  const clientId = c.env.GOOGLE_CLIENT_ID;

  // Guard: nếu chưa set secret trên Cloudflare → trả lỗi rõ ràng
  if (!clientId) {
    return c.json({ error: "GOOGLE_CLIENT_ID not configured" }, 500);
  }

  const redirectUri = new URL("/api/auth/callback", c.req.url).toString();

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "select_account",
  });

  // ⚠️ FIX: phải dùng params.toString() — template literal không tự convert URLSearchParams
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return c.redirect(googleAuthUrl);
});

// =============================================
// GET /api/auth/callback — Handle OAuth callback
// =============================================
authRoute.get("/callback", async (c) => {
  const code = c.req.query("code");
  const error = c.req.query("error");

  // User từ chối hoặc lỗi từ Google
  if (error || !code) {
    return c.redirect(`/?auth_error=cancelled&detail=${encodeURIComponent(error ?? "no_code")}`);
  }

  // Guard: thiếu secrets
  const clientId = (c.env.GOOGLE_CLIENT_ID ?? "").trim();
  const clientSecret = (c.env.GOOGLE_CLIENT_SECRET ?? "").trim();
  if (!clientId || !clientSecret) {
    console.error("Missing OAuth secrets", { clientId: !!clientId, clientSecret: !!clientSecret });
    return c.redirect("/?auth_error=config_missing");
  }

  try {
    // Dùng origin cố định từ request để build redirect_uri
    const reqUrl = new URL(c.req.url);
    const redirectUri = `${reqUrl.origin}/api/auth/callback`;

    // 1. Exchange code for access token
    const tokenBody = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    });

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenBody,
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      console.error("Token exchange failed:", errText);
      // Parse lỗi từ Google để debug
      let googleErrCode = "token_failed";
      try { googleErrCode = (JSON.parse(errText) as { error: string }).error ?? "token_failed"; } catch { /* ignore */ }
      return c.redirect(`/?auth_error=${encodeURIComponent(googleErrCode)}`);
    }

    const tokenData = (await tokenRes.json()) as { access_token: string };

    // 2. Get Google user info
    const userInfoRes = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    if (!userInfoRes.ok) {
      return c.redirect("/?auth_error=userinfo_failed");
    }

    const googleUser = (await userInfoRes.json()) as GoogleUserInfo;

    // 3. Find or create user in D1
    let user = await c.env.DB.prepare(
      "SELECT * FROM users WHERE google_id = ?"
    )
      .bind(googleUser.id)
      .first<DbUser>();

    if (!user) {
      // Tạo user mới
      const newUserId = crypto.randomUUID();
      await c.env.DB.prepare(
        `INSERT INTO users (id, email, name, google_id, subscription_tier)
         VALUES (?, ?, ?, ?, 'free')`
      )
        .bind(newUserId, googleUser.email, googleUser.name, googleUser.id)
        .run();

      user = await c.env.DB.prepare("SELECT * FROM users WHERE id = ?")
        .bind(newUserId)
        .first<DbUser>();
    }

    if (!user) {
      return c.redirect("/?auth_error=db_failed");
    }

    // 4. Check if student profile exists (để biết redirect về onboarding hay dashboard)
    const profile = await c.env.DB.prepare(
      "SELECT id FROM student_profiles WHERE user_id = ? LIMIT 1"
    )
      .bind(user.id)
      .first<{ id: string }>();

    // 5. Tạo session
    const sessionToken = await createSession(c.env.SESSION, user.id);

    // 6. Set cookie và redirect
    const redirectTo = profile ? "/dashboard" : "/onboarding";

    return new Response(null, {
      status: 302,
      headers: {
        Location: redirectTo,
        "Set-Cookie": buildSetCookieHeader(sessionToken),
      },
    });
  } catch (err) {
    console.error("Auth callback error:", err);
    return c.redirect("/?auth_error=server_error");
  }
});

// =============================================
// GET /api/auth/me — Current user info
// =============================================
authRoute.get("/me", async (c) => {
  const cookieHeader = c.req.header("Cookie") ?? null;
  const token = getSessionTokenFromCookie(cookieHeader);

  if (!token) {
    return c.json({ user: null }, 401);
  }

  const userId = await getSession(c.env.SESSION, token);
  if (!userId) {
    return c.json({ user: null }, 401);
  }

  const user = await c.env.DB.prepare(
    "SELECT id, email, name, subscription_tier FROM users WHERE id = ?"
  )
    .bind(userId)
    .first<Pick<DbUser, "id" | "email" | "name" | "subscription_tier">>();

  if (!user) {
    return c.json({ user: null }, 401);
  }

  // Lấy student profile (nếu có)
  const profile = await c.env.DB.prepare(
    "SELECT id, display_name, avatar_id, theme FROM student_profiles WHERE user_id = ? LIMIT 1"
  )
    .bind(userId)
    .first<{ id: string; display_name: string; avatar_id: string; theme: string }>();

  return c.json({
    user: {
      ...user,
      profile: profile ?? null,
    },
  });
});

// =============================================
// POST /api/auth/logout
// =============================================
authRoute.post("/logout", async (c) => {
  const cookieHeader = c.req.header("Cookie") ?? null;
  const token = getSessionTokenFromCookie(cookieHeader);

  if (token) {
    await deleteSession(c.env.SESSION, token);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": buildClearCookieHeader(),
    },
  });
});
