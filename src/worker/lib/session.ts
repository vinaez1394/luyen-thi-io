/**
 * session.ts — Session management via Cloudflare KV
 *
 * Flow:
 *   createSession(kv, userId) → token (random UUID)
 *   getSession(kv, token) → userId | null
 *   deleteSession(kv, token) → void
 *
 * Token được lưu vào KV với TTL 30 ngày.
 * Token được set làm httpOnly cookie tên "session".
 */

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 ngày
const COOKIE_NAME = "session";

// =============================================
// Create session
// =============================================
export async function createSession(
  kv: KVNamespace,
  userId: string
): Promise<string> {
  const token = crypto.randomUUID();

  await kv.put(
    `session:${token}`,
    JSON.stringify({ userId, createdAt: Date.now() }),
    { expirationTtl: SESSION_TTL_SECONDS }
  );

  return token;
}

// =============================================
// Get session (returns userId or null)
// =============================================
export async function getSession(
  kv: KVNamespace,
  token: string
): Promise<string | null> {
  if (!token) return null;

  const raw = await kv.get(`session:${token}`);
  if (!raw) return null;

  try {
    const data = JSON.parse(raw) as { userId: string };
    return data.userId;
  } catch {
    return null;
  }
}

// =============================================
// Delete session (logout)
// =============================================
export async function deleteSession(
  kv: KVNamespace,
  token: string
): Promise<void> {
  await kv.delete(`session:${token}`);
}

// =============================================
// Cookie helpers
// =============================================
export function getSessionTokenFromCookie(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const match = cookieHeader
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`));

  return match ? match.slice(COOKIE_NAME.length + 1) : null;
}

export function buildSetCookieHeader(token: string): string {
  return [
    `${COOKIE_NAME}=${token}`,
    `Max-Age=${SESSION_TTL_SECONDS}`,
    `Path=/`,
    `HttpOnly`,
    `Secure`,
    `SameSite=Lax`,
  ].join("; ");
}

export function buildClearCookieHeader(): string {
  return [
    `${COOKIE_NAME}=`,
    `Max-Age=0`,
    `Path=/`,
    `HttpOnly`,
    `Secure`,
    `SameSite=Lax`,
  ].join("; ");
}
