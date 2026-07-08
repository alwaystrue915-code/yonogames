import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!(await verifyAdmin(request))) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const data = await request.json();
    const { _id, id, ...clean } = data;
    const post = await db.blog.update(params.id, clean);
    if (!post) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    const p = post as any;
    return NextResponse.json({ id: p.id || p._id, ...p });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    if (!(await verifyAdmin(request))) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const ok = await db.blog.delete(params.id);
    if (!ok) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
