import { MetadataRoute } from 'next';
import { db } from '../lib/db';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const settings = await db.settings.get();
  const domain = settings?.siteDomain || 'https://yonogamelive.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${domain}/sitemap.xml`,
  };
}
