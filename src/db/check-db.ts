import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
async function check() {
  await mongoose.connect(process.env.MONGO_URI || '', { serverSelectionTimeoutMS: 5000 });
  const total = await mongoose.connection.collection('apps').countDocuments();
  const active = await mongoose.connection.collection('apps').countDocuments({ status: 'active' });
  const rec = await mongoose.connection.collection('apps').countDocuments({ isRecommended: true });
  const newpick = await mongoose.connection.collection('apps').countDocuments({ isNewPick: true });
  console.log('Total:', total, 'Active:', active, 'Recommended:', rec, 'NewPicks:', newpick);
  const apps = await mongoose.connection.collection('apps').find({}).sort({ priority: -1 }).limit(10).toArray();
  console.log('Top 10 slugs:', apps.map((a: any) => a.slug).join(', '));
  await mongoose.disconnect();
}
check().catch(e => { console.error(e); process.exit(1); });
