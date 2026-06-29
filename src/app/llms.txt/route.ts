import { db } from '@/lib/db';

export async function GET() {
  const settings = await db.settings.get();
  const domain = settings?.siteDomain || 'https://yononewgamess.com';
  const siteName = settings?.siteName || 'Yono Games';
  const siteDesc = settings?.siteDescription || 'Premium App Discovery & Play Platform';

  const apps = await db.apps.find({ status: 'active' });
  const posts = await db.blog.find({ status: 'published' });

  const appList = apps.map(a => `- [${a.name}](${domain}/app/${a.slug}): ${a.description?.substring(0, 120)}...`).join('\n');
  const blogList = posts.map(p => `- [${p.title}](${domain}/blog/${p.slug})`).join('\n');

  const llms = `# ${siteName}

> ${siteDesc}

## Useful Links

- [Home](${domain}/)
- [All Apps](${domain}/all-yonoapps)
- [Blog](${domain}/blog)
- [About Us](${domain}/about-us)
- [Contact Us](${domain}/contact-us)
- [Privacy Policy](${domain}/privacy-policy)
- [RSS Feed](${domain}/rss.xml)
- [Sitemap](${domain}/sitemap.xml)

## Apps

${appList || '- No apps available'}

## Blog Posts

${blogList || '- No blog posts yet'}

---

*Last updated: ${new Date().toISOString().split('T')[0]}*
`;

  return new Response(llms, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
