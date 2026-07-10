import { verifyAdmin } from '@/lib/auth';
import { getGa4Realtime } from '@/lib/ga4';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    if (!token) return new Response('Unauthorized', { status: 401 });
    const authRequest = new Request(request.url, { headers: { Authorization: `Bearer ${token}` } });
    if (!(await verifyAdmin(authRequest))) {
      return new Response('Unauthorized', { status: 401 });
    }

    const encoder = new TextEncoder();
    let interval: ReturnType<typeof setInterval>;

    const stream = new ReadableStream({
      start(controller) {
        const send = async () => {
          try {
            const data = await getGa4Realtime();
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
          } catch {
            controller.enqueue(encoder.encode(`data: {"activeUsers":0}\n\n`));
          }
        };

        send();
        interval = setInterval(send, 10000);

        request.signal.addEventListener('abort', () => {
          clearInterval(interval);
          controller.close();
        });
      },
      cancel() {
        clearInterval(interval);
      },
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
