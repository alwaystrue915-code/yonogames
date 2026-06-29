import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
dotenv.config();
async function check() {
  await mongoose.connect(process.env.MONGO_URI || '', { serverSelectionTimeoutMS: 5000 });
  const settings = await mongoose.connection.collection('settings').findOne({});
  if (settings) {
    console.log('Admin email:', settings.adminEmail);
    console.log('Admin password hash:', settings.adminPasswordHash);
    if (settings.adminPasswordHash) {
      const match = await bcrypt.compare('gaurav15557', settings.adminPasswordHash);
      console.log('Password "gaurav15557" matches:', match);
    }
  } else {
    console.log('No settings found');
  }
  await mongoose.disconnect();
}
check().catch(e => { console.error(e); process.exit(1); });
