import fs from 'fs';
import path from 'path';

const CONTENT_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
};

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string[] }> }
) {
  try {
    const root = path.resolve(path.join(process.cwd(), '..', 'scrapperv2'));
    const candidate = path.resolve(root, ...(await params).file);
    const relative = path.relative(root, candidate);

    if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
      return new Response('Not found', { status: 404 });
    }

    const extension = path.extname(candidate).toLowerCase();
    const contentType = CONTENT_TYPES[extension];
    if (!contentType || !fs.existsSync(candidate) || fs.statSync(candidate).isDirectory()) {
      return new Response('Not found', { status: 404 });
    }

    return new Response(fs.readFileSync(candidate), {
      headers: {
        'Content-Type': contentType,
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch {
    return new Response('Not found', { status: 404 });
  }
}
