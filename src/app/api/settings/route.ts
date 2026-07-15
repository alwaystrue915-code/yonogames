import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';
import { settingsInputSchema, SITE_URL } from '@/lib/security';

const stripSensitive = (data: any) => {
  const { adminPasscode, adminPasswordHash, adminEmail, ...rest } = data || {};
  return { ...rest, siteDomain: SITE_URL };
};

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const settings = await db.settings.get();
    return NextResponse.json(stripSensitive(settings));
  } catch (error: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: 'Invalid admin credentials.' }, { status: 403 });
    }

    const body = await request.json();
    const { _id, __v, adminPasscode, adminPasswordHash, adminEmail, siteDomain, ...input } = body;
    const parsed = settingsInputSchema.safeParse(input);
    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid settings data.', issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const updated = await db.settings.update(parsed.data);
    return NextResponse.json(stripSensitive(updated));
  } catch (error: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}
