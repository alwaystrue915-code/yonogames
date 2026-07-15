import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';
import { blogInputSchema } from '@/lib/security';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await verifyAdmin(request))) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const raw = await request.json();
    const { _id, id, __v, createdAt, updatedAt, ...input } = raw;
    const parsed = blogInputSchema.safeParse(input);
    if (!parsed.success || !/^[a-f0-9]{24}$/i.test((await params).id)) {
      return NextResponse.json({ message: 'Invalid blog data.' }, { status: 400 });
    }
    const post = await db.blog.update((await params).id, parsed.data);
    if (!post) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    const p = post as any;
    return NextResponse.json({ id: p.id || p._id, ...p });
  } catch (e: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    if (!(await verifyAdmin(request))) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const ok = await db.blog.delete((await params).id);
    if (!ok) {
      return NextResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}
