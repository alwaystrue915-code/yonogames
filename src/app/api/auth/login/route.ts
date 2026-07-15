import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { adminSessionCookie, createAdminSession } from '@/lib/auth';

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function clientKey(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

export async function POST(request: Request) {
  const key = clientKey(request);
  const now = Date.now();
  const current = attempts.get(key);
  if (current && current.resetAt > now && current.count >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { message: 'Too many login attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((current.resetAt - now) / 1000)) } }
    );
  }

  try {
    const body = await request.json();
    const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
    const password = typeof body?.password === 'string' ? body.password : '';
    if (!email || !password || email.length > 254 || password.length > 200) {
      return NextResponse.json({ message: 'Invalid credentials.' }, { status: 400 });
    }

    const settings = await db.settings.get();
    const emailMatch = email === settings.adminEmail?.toLowerCase();
    const passwordMatch = settings.adminPasswordHash
      ? await bcrypt.compare(password, settings.adminPasswordHash)
      : false;

    if (!emailMatch || !passwordMatch) {
      const next = current && current.resetAt > now
        ? { count: current.count + 1, resetAt: current.resetAt }
        : { count: 1, resetAt: now + WINDOW_MS };
      attempts.set(key, next);
      return NextResponse.json({ message: 'Incorrect email or password.' }, { status: 401 });
    }

    attempts.delete(key);
    const session = await createAdminSession();
    return NextResponse.json(
      { ok: true },
      {
        headers: {
          'Set-Cookie': adminSessionCookie(session.token, session.maxAge),
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch {
    return NextResponse.json({ message: 'Login failed.' }, { status: 500 });
  }
}
