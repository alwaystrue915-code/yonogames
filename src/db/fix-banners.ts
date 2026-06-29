import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const BASE = 'https://yononextjs.vercel.app';

async function fixBanners() {
  await mongoose.connect(process.env.MONGO_URI || '', { serverSelectionTimeoutMS: 5000 });
  const settings = await mongoose.connection.collection('settings').findOne({});
  if (settings) {
    const updates: any = {};
    for (const key of ['banner1', 'banner2', 'banner3', 'banner4', 'footerAdImage', 'footerAdLogo', 'headerLogo']) {
      if (settings[key] && typeof settings[key] === 'string' && settings[key].startsWith('/')) {
        updates[key] = BASE + settings[key];
      }
    }
    if (Object.keys(updates).length > 0) {
      await mongoose.connection.collection('settings').updateOne({}, { $set: updates });
      console.log('Updated banners:', Object.keys(updates).join(', '));
    } else {
      console.log('No banners to fix');
    }
  }
  await mongoose.disconnect();
}
fixBanners().catch(e => { console.error(e); process.exit(1); });
