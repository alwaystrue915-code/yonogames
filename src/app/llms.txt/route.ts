import { db } from '@/lib/db';

export async function GET() {
  const settings = await db.settings.get();
  const domain = settings?.siteDomain || 'https://yononewgamess.com';
  const siteName = settings?.siteName || 'Yono Games';
  const siteDesc = settings?.siteDescription || 'Yono Game and Yono Games APK discovery, comparison and download guide directory for India-focused Android app research.';

  const apps = await db.apps.find({ status: 'active' });
  const posts = await db.blog.find({ status: 'published' });

  const appList = apps.map(a => `- [${a.name}](${domain}/app/${a.slug}): ${a.description?.substring(0, 120)}...`).join('\n');
  const blogList = posts.map(p => `- [${p.title}](${domain}/blog/${p.slug})`).join('\n');

  const llms = `# ${siteName}

> ${siteDesc}

Yono Games is an independent comparison directory for people researching Yono game and Yono Games APK listings. The site organizes third-party app names, bonuses, ratings, minimum withdrawal details, features, safety notes, FAQs and outgoing download links. Yono Games does not own listed apps, process deposits, approve withdrawals or operate gaming accounts.

Primary topics: Yono Game, Yono Games, Yono Games APK, Yono Game APK download, rummy APK listings, Android skill-game apps, app bonus comparison, minimum withdrawal information, India eligibility notes.

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
