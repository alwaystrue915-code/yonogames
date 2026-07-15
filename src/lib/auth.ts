import { createHash, randomBytes } from 'crypto';
import { db } from './db';

const SESSION_COOKIE = '__Host-yono_admin';
const SESSION_TTL_MS = 30 * 60 * 1000;

function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

function readCookie(request: Request, name: string) {
  const cookies = request.headers.get('cookie') || '';
  for (const entry of cookies.split(';')) {
    const [key, ...value] = entry.trim().split('=');
    if (key === name) return decodeURIComponent(value.join('='));
  }
  return null;
}

export async function createAdminSession() {
  const token = randomBytes(32).toString('base64url');
  await db.adminSessions.create(hashToken(token), new Date(Date.now() + SESSION_TTL_MS));
  return { token, maxAge: Math.floor(SESSION_TTL_MS / 1000) };
}

export async function verifyAdmin(request: Request): Promise<boolean> {
  if (!['GET', 'HEAD', 'OPTIONS'].includes(request.method)) {
    const origin = request.headers.get('origin');
    if (!origin || new URL(origin).host !== new URL(request.url).host) return false;
  }
  const token = readCookie(request, SESSION_COOKIE);
  if (!token || token.length < 32) return false;
  return db.adminSessions.verify(hashToken(token));
}

export async function revokeAdminSession(request: Request) {
  const token = readCookie(request, SESSION_COOKIE);
  if (token) await db.adminSessions.delete(hashToken(token));
}

export function adminSessionCookie(token: string, maxAge: number) {
  return `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;
}

export function clearAdminSessionCookie() {
  return `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict`;
}
