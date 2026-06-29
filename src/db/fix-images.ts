import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const BASE = 'https://yononextjs.vercel.app';

async function fixImages() {
  await mongoose.connect(process.env.MONGO_URI || '', { serverSelectionTimeoutMS: 5000 });
  const apps = await mongoose.connection.collection('apps').find({}).toArray();
  let fixed = 0;
  for (const app of apps) {
    const updates: any = {};
    if (app.logo && app.logo.startsWith('/')) { updates.logo = BASE + app.logo; }
    if (app.banner && app.banner.startsWith('/')) { updates.banner = BASE + app.banner; }
    if (app.screenshots && Array.isArray(app.screenshots)) {
      updates.screenshots = app.screenshots.map((s: string) => s.startsWith('/') ? BASE + s : s);
    }
    if (Object.keys(updates).length > 0) {
      await mongoose.connection.collection('apps').updateOne({ _id: app._id }, { $set: updates });
      fixed++;
    }
  }
  console.log(`Fixed ${fixed} apps.`);
  await mongoose.disconnect();
}
fixImages().catch(e => { console.error(e); process.exit(1); });
