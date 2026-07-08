import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';

const stripSensitive = (data: any) => {
  const { adminPasscode, adminPasswordHash, ...rest } = data || {};
  return rest;
};

export async function GET() {
  try {
    const settings = await db.settings.get();
    return NextResponse.json(stripSensitive(settings));
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const isAdmin = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ message: 'Invalid admin credentials.' }, { status: 403 });
    }

    const body = await request.json();
    const { _id, __v, adminPasscode, adminPasswordHash, ...safeBody } = body;
    const updated = await db.settings.update(safeBody);
    return NextResponse.json(stripSensitive(updated));
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Failed to save settings.' }, { status: 500 });
  }
}
