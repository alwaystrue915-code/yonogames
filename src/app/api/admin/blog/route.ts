import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';
import { blogInputSchema } from '@/lib/security';

export async function GET(request: Request) {
  try {
    if (!(await verifyAdmin(request))) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const posts = await db.blog.find({});
    const mapped = posts.map((p: any) => { const { _id, ...r } = p; return { id: r.id || _id, ...r }; });
    return NextResponse.json(mapped);
  } catch (e: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await verifyAdmin(request))) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const raw = await request.json();
    const { _id, id, __v, createdAt, updatedAt, ...input } = raw;
    const parsed = blogInputSchema.safeParse(input);
    if (!parsed.success) {
      return NextResponse.json({ message: 'Invalid blog data.', issues: parsed.error.flatten().fieldErrors }, { status: 400 });
    }
    const post = await db.blog.create({ ...parsed.data, views: parsed.data.views || 0, likes: parsed.data.likes || 0 }) as any;
    return NextResponse.json({ id: post.id || post._id, ...post }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ message: 'Request failed.' }, { status: 500 });
  }
}
