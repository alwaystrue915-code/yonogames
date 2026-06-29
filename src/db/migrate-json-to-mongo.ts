import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { AppModel, CategoryModel, TagModel, CollectionModel, SettingsModel, BlogPostModel, AnalyticsModel } from '../lib/db';

dotenv.config();

const JSON_DB_PATH = path.join(process.cwd(), 'data', 'db.json');

async function migrate() {
  const mongoUri = process.env.MONGO_URI || '';
  if (!mongoUri) { console.error('MONGO_URI not set'); process.exit(1); }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  const raw = fs.readFileSync(JSON_DB_PATH, 'utf-8');
  const data = JSON.parse(raw);

  // Migrate settings
  if (data.settings) {
    await SettingsModel.deleteMany({});
    await SettingsModel.create(data.settings);
    console.log('Settings migrated');
  }

  // Migrate apps
  if (data.apps?.length) {
    await AppModel.deleteMany({});
    await AppModel.insertMany(data.apps);
    console.log(`${data.apps.length} apps migrated`);
  }

  // Migrate categories
  if (data.categories?.length) {
    await CategoryModel.deleteMany({});
    await CategoryModel.insertMany(data.categories);
    console.log(`${data.categories.length} categories migrated`);
  }

  // Migrate tags
  if (data.tags?.length) {
    await TagModel.deleteMany({});
    await TagModel.insertMany(data.tags);
    console.log(`${data.tags.length} tags migrated`);
  }

  // Migrate collections
  if (data.collections?.length) {
    await CollectionModel.deleteMany({});
    await CollectionModel.insertMany(data.collections);
    console.log(`${data.collections.length} collections migrated`);
  }

  // Migrate blog posts
  if (data.blogPosts?.length) {
    await BlogPostModel.deleteMany({});
    await BlogPostModel.insertMany(data.blogPosts);
    console.log(`${data.blogPosts.length} blog posts migrated`);
  }

  // Migrate analytics
  if (data.analytics?.length) {
    await AnalyticsModel.deleteMany({});
    await AnalyticsModel.insertMany(data.analytics);
    console.log(`${data.analytics.length} analytics records migrated`);
  }

  console.log('Migration complete');
  await mongoose.disconnect();
  process.exit(0);
}

migrate().catch(err => { console.error(err); process.exit(1); });
