import { cdata, escapeXml, SITE_URL } from '@/lib/security';
import { db } from '@/lib/db';

export async function GET() {
  const settings = await db.settings.get();
  const domain = SITE_URL;
  const siteName = settings?.siteName || 'Yono Games';
  const siteDesc = settings?.siteDescription || 'Premium App Discovery & Play Platform';

  const posts = await db.blog.find({ status: 'published' });

  const items = posts.map(post => `
    <item>
      <title><![CDATA[${cdata(post.title)}]]></title>
      <link>${escapeXml(`${domain}/blog/${post.slug}`)}</link>
      <guid>${escapeXml(`${domain}/blog/${post.slug}`)}</guid>
      <description><![CDATA[${post.metaDescription || post.htmlContent?.substring(0, 200) || ''}]]></description>
      <pubDate>${post.date ? new Date(post.date).toUTCString() : new Date().toUTCString()}</pubDate>
      <category>${post.category || 'General'}</category>
      ${post.authorName ? `<author>${post.authorName}</author>` : ''}
    </item>
  `).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteName)} - Blog</title>
    <link>${domain}/blog</link>
    <description>${escapeXml(siteDesc)}</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
