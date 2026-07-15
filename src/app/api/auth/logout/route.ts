import { NextResponse } from 'next/server';
import { clearAdminSessionCookie, revokeAdminSession } from '@/lib/auth';

export async function POST(request: Request) {
  await revokeAdminSession(request);
  return NextResponse.json(
    { ok: true },
    { headers: { 'Set-Cookie': clearAdminSessionCookie(), 'Cache-Control': 'no-store' } }
  );
}
