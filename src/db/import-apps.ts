import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { db, connectDb, AppDetail } from '../lib/db';

dotenv.config();

async function importApps() {
  await connectDb();

  console.log('Fetching apps from yononextjs.vercel.app...');
  const res = await fetch('https://yononextjs.vercel.app/api/apps');
  const apps: any[] = await res.json();
  console.log(`Fetched ${apps.length} apps.`);

  // Clear existing apps
  if (db.isMongo()) {
    console.log('Clearing existing apps...');
    await mongoose.connection.collection('apps').deleteMany({});
  }

  // Import each app
  let count = 0;
  for (const a of apps) {
    const appData: AppDetail = {
      name: a.name,
      slug: a.slug,
      logo: a.logo || '',
      banner: a.banner || '',
      screenshots: a.screenshots || [],
      description: a.description || '',
      category: a.category || 'Rummy',
      categories: a.categories || [a.category || 'Rummy'],
      tags: a.tags || [],
      features: a.features || [],
      rating: a.rating || 4.5,
      installs: a.installs || '100K+',
      bonus: a.bonus || '',
      minWithdrawal: a.minWithdrawal || '',
      downloadUrl: a.downloadUrl || '',
      status: a.status || 'active',
      featured: a.featured || false,
      priority: a.priority || 0,
      seoTitle: a.seoTitle || '',
      seoDescription: a.seoDescription || '',
      faqs: Array.isArray(a.faqs) ? a.faqs.map((f: any) => ({ question: f.question || '', answer: f.answer || '' })) : [],
      isRecommended: a.isRecommended || false,
      isNewPick: a.isNewPick || false,
      isAllApps: a.isAllApps !== undefined ? a.isAllApps : true
    };
    await db.apps.create(appData);
    count++;
    if (count % 10 === 0) console.log(`Imported ${count}/${apps.length}...`);
  }

  console.log(`Successfully imported ${count} apps.`);
  process.exit(0);
}

importApps().catch(err => {
  console.error('Import failed:', err);
  process.exit(1);
});
