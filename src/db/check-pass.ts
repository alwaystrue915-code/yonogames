import { db } from '../lib/db';

async function checkAdminConfiguration() {
  const settings = await db.settings.get();
  console.log({ adminEmailConfigured: Boolean(settings.adminEmail), passwordHashConfigured: Boolean(settings.adminPasswordHash) });
}

checkAdminConfiguration().catch(() => { process.exitCode = 1; });
