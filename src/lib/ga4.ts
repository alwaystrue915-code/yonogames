import { BetaAnalyticsDataClient } from '@google-analytics/data';

const cache = new Map<string, { data: any; ts: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function getCached<T>(key: string, ttl: number): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.ts < ttl) return entry.data as T;
  return null;
}
function setCache(key: string, data: any) { cache.set(key, { data, ts: Date.now() }); }

function getCredentials(): object | null {
  const json = process.env.GA_SERVICE_ACCOUNT_JSON;
  if (json) {
    try { return JSON.parse(json); } catch { return null; }
  }
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  if (clientEmail && privateKey) {
    return { client_email: clientEmail, private_key: privateKey.replace(/\\n/g, '\n') };
  }
  return null;
}

let _client: BetaAnalyticsDataClient | null = null;

function getClient() {
  if (_client) return _client;
  const creds = getCredentials();
  if (!creds) return null;
  _client = new BetaAnalyticsDataClient({ credentials: creds });
  return _client;
}

const propertyId = process.env.GA4_PROPERTY_ID || process.env.GA_PROPERTY_ID || '544306569';

async function report(client: BetaAnalyticsDataClient, req: any) {
  const result = await (client.runReport(req) as Promise<[any, any, any]>);
  return result[0];
}

async function realtime(client: BetaAnalyticsDataClient, req: any) {
  const result = await (client.runRealtimeReport(req) as Promise<[any, any, any]>);
  return result[0];
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) => setTimeout(() => reject(new Error(`GA4 timeout: ${label}`)), ms)),
  ]);
}

export async function getGa4Analytics(dateRange?: string) {
  const cacheKey = dateRange || '30daysAgo';
  const cached = getCached<any>('analytics-' + cacheKey, CACHE_TTL);
  if (cached) return cached;

  try {
    const client = getClient();
    if (!client) return null;

    const pid = `properties/${propertyId}`;
    const range30 = [{ startDate: dateRange || '30daysAgo', endDate: 'today' }];
    const ccMap: Record<string, string> = { India: 'IN', 'United States': 'US', 'United Kingdom': 'GB', Canada: 'CA', Australia: 'AU', Germany: 'DE', France: 'FR', Brazil: 'BR', Japan: 'JP', UAE: 'AE' };
    const socialSources = ['telegram', 'youtube', 'instagram', 'facebook', 'whatsapp', 'twitter', 'linkedin'];
    const organicSources = ['google', 'bing', 'yahoo', 'duckduckgo', 'baidu'];
    const T = 10000;

    const [overviewReport, dailyReport, deviceReport, countryReport, browserReport, sourceReport, topPagesReport, realtimeReport] = await Promise.all([
      withTimeout(report(client, { property: pid, dateRanges: range30, metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }, { name: 'screenPageViews' }, { name: 'sessions' }, { name: 'totalUsers' }] }), T, 'overview'),
      withTimeout(report(client, { property: pid, dateRanges: range30, dimensions: [{ name: 'date' }], metrics: [{ name: 'activeUsers' }, { name: 'newUsers' }], orderBy: [{ dimension: { dimensionName: 'date' }, desc: false }] }), T, 'daily'),
      withTimeout(report(client, { property: pid, dateRanges: range30, dimensions: [{ name: 'deviceCategory' }], metrics: [{ name: 'activeUsers' }] }), T, 'devices'),
      withTimeout(report(client, { property: pid, dateRanges: range30, dimensions: [{ name: 'country' }], metrics: [{ name: 'activeUsers' }], orderBy: [{ metric: { metricName: 'activeUsers' }, desc: true }], limit: 10 }), T, 'countries'),
      withTimeout(report(client, { property: pid, dateRanges: range30, dimensions: [{ name: 'browser' }], metrics: [{ name: 'activeUsers' }], orderBy: [{ metric: { metricName: 'activeUsers' }, desc: true }], limit: 10 }), T, 'browsers'),
      withTimeout(report(client, { property: pid, dateRanges: range30, dimensions: [{ name: 'sessionSource' }], metrics: [{ name: 'activeUsers' }], orderBy: [{ metric: { metricName: 'activeUsers' }, desc: true }], limit: 20 }), T, 'sources'),
      withTimeout(report(client, { property: pid, dateRanges: range30, dimensions: [{ name: 'pagePath' }, { name: 'pageTitle' }], metrics: [{ name: 'screenPageViews' }], orderBy: [{ metric: { metricName: 'screenPageViews' }, desc: true }], limit: 10 }), T, 'topPages'),
      withTimeout(realtime(client, { property: pid, metrics: [{ name: 'activeUsers' }] }), T, 'realtime'),
    ]);

    const overviewRow = overviewReport?.rows?.[0];
    const totalUsers = parseInt(overviewRow?.metricValues?.[0]?.value || '0', 10);
    const newUsers = parseInt(overviewRow?.metricValues?.[1]?.value || '0', 10);
    const pageViews = parseInt(overviewRow?.metricValues?.[2]?.value || '0', 10);
    const sessions = parseInt(overviewRow?.metricValues?.[3]?.value || '0', 10);
    const totalUsersUnique = parseInt(overviewRow?.metricValues?.[4]?.value || '0', 10);

    const dailyViews = (dailyReport?.rows || []).map((row: any) => {
      const dateStr = row.dimensionValues?.[0]?.value || '';
      return { key: dateStr, label: `${dateStr.slice(4, 6)}/${dateStr.slice(6, 8)}`, views: parseInt(row.metricValues?.[0]?.value || '0', 10) };
    });

    const traffic = (dailyReport?.rows || []).map((row: any) => {
      const dateStr = row.dimensionValues?.[0]?.value || '';
      const active = parseInt(row.metricValues?.[0]?.value || '0', 10);
      const newV = parseInt(row.metricValues?.[1]?.value || '0', 10);
      return { key: dateStr, label: `${dateStr.slice(4, 6)}/${dateStr.slice(6, 8)}`, newVisitor: newV, returningVisitor: Math.max(0, active - newV) };
    });

    const devices = (deviceReport?.rows || []).map((row: any) => ({ name: row.dimensionValues?.[0]?.value || 'Unknown', value: parseInt(row.metricValues?.[0]?.value || '0', 10) }));
    const countries = (countryReport?.rows || []).map((row: any) => ({ name: row.dimensionValues?.[0]?.value || 'Unknown', value: parseInt(row.metricValues?.[0]?.value || '0', 10), code: ccMap[row.dimensionValues?.[0]?.value || ''] || '' }));
    const browsers = (browserReport?.rows || []).map((row: any) => ({ name: row.dimensionValues?.[0]?.value || 'Unknown', value: parseInt(row.metricValues?.[0]?.value || '0', 10) }));

    const socialData: { name: string; value: number }[] = [];
    const referralData: { name: string; value: number }[] = [];
    const organicData: { name: string; value: number }[] = [];
    for (const row of (sourceReport?.rows || [])) {
      const source = (row.dimensionValues?.[0]?.value || '').toLowerCase();
      const value = parseInt(row.metricValues?.[0]?.value || '0', 10);
      if (!source || source === '(direct)' || source === '(not set)') continue;
      const displayName = row.dimensionValues?.[0]?.value || 'Unknown';
      if (socialSources.some(s => source.includes(s))) socialData.push({ name: displayName, value });
      else if (organicSources.some(s => source.includes(s))) organicData.push({ name: displayName, value });
      else referralData.push({ name: displayName, value });
    }
    socialData.sort((a, b) => b.value - a.value);
    referralData.sort((a, b) => b.value - a.value);
    organicData.sort((a, b) => b.value - a.value);

    const topPages = (topPagesReport?.rows || []).map((row: any) => ({ path: row.dimensionValues?.[0]?.value || '/', title: row.dimensionValues?.[1]?.value || row.dimensionValues?.[0]?.value || '/', viewCount: parseInt(row.metricValues?.[0]?.value || '0', 10), lastViewedAt: null }));
    const realtimeUsers = parseInt(realtimeReport?.rows?.[0]?.metricValues?.[0]?.value || '0', 10);

    const pagesPerSession = sessions > 0 ? pageViews / sessions : 0;
    const sessionsPerUser = totalUsersUnique > 0 ? sessions / totalUsersUnique : 0;
    const viewsPerUser = totalUsersUnique > 0 ? pageViews / totalUsersUnique : 0;

    const result = {
      totalViews: pageViews, totalClicks: sessions, totalUsers, sessions, pageViews, realtimeUsers,
      newUsers, returningUsers: Math.max(0, totalUsers - newUsers),
      devices, countries, browsers,
      socialTraffic: socialData.slice(0, 5), referralTraffic: referralData.slice(0, 5), organicTraffic: organicData.slice(0, 5),
      topPages, dailyViews, traffic,
      engagementStats: [
        { label: 'Pages / session', value: pagesPerSession, color: '#5856d6', softColor: '#eeedff', width: Math.min(100, (pagesPerSession / 5) * 100) },
        { label: 'Sessions / user', value: sessionsPerUser, color: '#ff9f0a', softColor: '#fff4dc', width: Math.min(100, (sessionsPerUser / 3) * 100) },
        { label: 'Views / user', value: viewsPerUser, color: '#34c759', softColor: '#e6f8eb', width: Math.min(100, (viewsPerUser / 8) * 100) },
      ],
    };
    setCache('analytics-' + cacheKey, result);
    return result;
  } catch (error: any) {
    console.error('GA4 API error:', error);
    return null;
  }
}

export async function getGa4Realtime() {
  try {
    const client = getClient();
    if (!client) return { activeUsers: 0, pages: [] };
    const [summary, pages] = await Promise.all([
      withTimeout(realtime(client, { property: `properties/${propertyId}`, metrics: [{ name: 'activeUsers' }] }), 10000, 'realtime-summary'),
      withTimeout(realtime(client, { property: `properties/${propertyId}`, dimensions: [{ name: 'unifiedScreenName' }], metrics: [{ name: 'activeUsers' }], orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }], limit: 12 }), 10000, 'realtime-pages'),
    ]);
    return {
      activeUsers: parseInt(summary?.rows?.[0]?.metricValues?.[0]?.value || '0', 10),
      pages: (pages?.rows || []).map((row: any) => ({ page: row.dimensionValues?.[0]?.value || 'Unknown', activeUsers: parseInt(row.metricValues?.[0]?.value || '0', 10) })),
    };
  } catch { return { activeUsers: 0, pages: [] }; }
}
