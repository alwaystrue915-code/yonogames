import { MetadataRoute } from 'next';
import { db } from '../lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await db.settings.get();
  const domain = settings?.siteDomain || 'https://yononewgamess.com';

  const apps = await db.apps.find({ status: 'active' });
  const posts = await db.blog.find({ status: 'published' });

  const staticPaths = [
    { url: `${domain}/`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${domain}/all-yonoapps`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${domain}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${domain}/about-us`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${domain}/contact-us`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${domain}/privacy-policy`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  const appPaths = apps.map(app => ({
    url: `${domain}/app/${app.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const blogPaths = posts.map(post => ({
    url: `${domain}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPaths, ...appPaths, ...blogPaths];
}
