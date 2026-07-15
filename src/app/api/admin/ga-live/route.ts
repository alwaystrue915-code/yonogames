import { verifyAdmin } from '@/lib/auth';
import { getGa4Realtime } from '@/lib/ga4';

export async function GET(request: Request) {
  try {
    if (!(await verifyAdmin(request))) {
      return new Response('Unauthorized', { status: 401 });
    }

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      start(controller) {
        let active = true;
        const enqueue = (data: string) => { try { controller.enqueue(encoder.encode(data)); } catch { /* controller closed */ } };

        const send = async () => {
          if (!active) return;
          try {
            const data = await getGa4Realtime();
            if (!active) return;
            if (data.available) enqueue(`data: ${JSON.stringify(data)}\n\n`);
            else enqueue(`event: ping\ndata: {}\n\n`);
          } catch {
            enqueue(`event: ping\ndata: {}\n\n`);
          }
          if (active) setTimeout(send, 10000);
        };

        send();

        request.signal.addEventListener('abort', () => { active = false; });
      },
      cancel() { /* noop */ },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch {
    return new Response('Error', { status: 500 });
  }
}
