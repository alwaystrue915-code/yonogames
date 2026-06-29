import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyAdmin } from '@/lib/auth';

export async function GET(request: Request) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
      const posts = await db.blog.find({});
      const mapped = posts.map((p: any) => { const { _id, ...r } = p; return { id: r.id || _id, ...r }; });
      return NextResponse.json(mapped);
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await verifyAdmin(request))) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  try {
    const data = await request.json();
    const { _id, id, ...clean } = data;
    const post = await db.blog.create(clean) as any;
    return NextResponse.json({ id: post.id || post._id, ...post }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
