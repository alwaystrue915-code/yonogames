'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts';
import {
  Eye, MousePointerClick, Users, Timer, Radio, TrendingUp, Share2, Link2, Search,
  Earth, Chrome, Globe2, Instagram, Facebook, ChevronDown, Filter,
} from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import AdminShell from '@/components/admin/AdminShell';

type TopPage = { path: string; title: string; viewCount: number; lastViewedAt: string | null };
type TrafficPoint = { key: string; label: string; newVisitor: number; returningVisitor: number };
type DailyPoint = { key: string; label: string; views: number };
type DevicePoint = { name: string; value: number; code?: string };
type EngagementStat = { label: string; value: number; color: string; softColor: string; width: number };
type RealtimePage = { page: string; activeUsers: number };
type RealtimeData = { activeUsers: number; pages: RealtimePage[] };

type StatsPayload = {
  totalViews: number; totalClicks: number; totalUsers: number; sessions: number;
  pageViews: number; realtimeUsers: number; newUsers: number; returningUsers: number;
  traffic: TrafficPoint[]; dailyViews: DailyPoint[]; devices: DevicePoint[];
  countries: DevicePoint[]; browsers: DevicePoint[];
  socialTraffic: DevicePoint[]; referralTraffic: DevicePoint[]; organicTraffic: DevicePoint[];
  topPages: TopPage[]; engagementStats: EngagementStat[];
};

const deviceColors = ['#ff6b00', '#ff2d55', '#5856d6', '#0a84ff'];
const rangeOptions = [
  { label: 'Last 7 days', value: '7daysAgo' },
  { label: 'Last 30 days', value: '30daysAgo' },
  { label: 'Last 90 days', value: '90daysAgo' },
  { label: 'Last 12 months', value: '365daysAgo' },
];

function formatNumber(value: number) {
  return new Intl.NumberFormat('en-US').format(value || 0);
}

function itemIcon(name: string, fallback = Globe2) {
  const lower = name.toLowerCase();
  if (lower.includes('instagram')) return Instagram;
  if (lower.includes('facebook')) return Facebook;
  if (lower.includes('chrome') || lower.includes('browser')) return Chrome;
  if (lower.includes('organic')) return Search;
  if (lower.includes('referral')) return Link2;
  if (lower.includes('social')) return Share2;
  return fallback;
}

function browserDomain(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('chrome')) return 'google.com/chrome';
  if (lower.includes('safari')) return 'apple.com/safari';
  if (lower.includes('edge')) return 'microsoft.com/edge';
  if (lower.includes('firefox')) return 'mozilla.org/firefox';
  if (lower.includes('samsung')) return 'samsung.com';
  if (lower.includes('opera')) return 'opera.com';
  return '';
}

function sourceDomain(name: string) {
  const clean = name.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  if (clean === 'instagram' || clean === 'ig') return 'instagram.com';
  if (clean === 'facebook') return 'facebook.com';
  if (clean === 'telegram') return 'telegram.org';
  if (clean === 'youtube') return 'youtube.com';
  if (clean === 'google' || clean.includes('google')) return 'google.com';
  if (clean === 'bing') return 'bing.com';
  if (clean === 'duckduckgo') return 'duckduckgo.com';
  if (clean.includes('.')) return clean;
  return '';
}

function faviconUrl(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;
}

function MetricIcon({ item, kind, color, fallback }: { item: DevicePoint; kind: 'country' | 'browser' | 'source' | 'generic'; color: string; fallback: any }) {
  if (kind === 'country') {
    const cc = item.code?.toLowerCase();
    if (cc?.length === 2) return <img src={`https://flagcdn.com/w40/${cc}.png`} alt="" className="h-4 w-6 flex-shrink-0 rounded-[3px] object-cover shadow-sm ring-1 ring-black/5" loading="lazy" />;
  }
  const domain = kind === 'browser' ? browserDomain(item.name) : kind === 'source' ? sourceDomain(item.name) : '';
  if (domain) return <img src={faviconUrl(domain)} alt="" className="h-5 w-5 flex-shrink-0 rounded-sm" loading="lazy" />;
  const FallbackIcon = itemIcon(item.name, fallback);
  return <FallbackIcon className="h-4 w-4 flex-shrink-0" style={{ color }} />;
}

function RingChart({ devices, total }: { devices: DevicePoint[]; total: number }) {
  const chartData = devices.filter((item) => item.value > 0);
  return (
    <div className="rounded-[22px] bg-white/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04] sm:p-5">
      <h3 className="text-lg font-black text-gray-950">Devices</h3>
      <div className="relative mx-auto mt-3 h-44 w-44 sm:h-52 sm:w-52">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} innerRadius={70} outerRadius={98} paddingAngle={2} dataKey="value">
                {chartData.map((_, i) => <Cell key={i} fill={deviceColors[i % deviceColors.length]} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="absolute inset-5 rounded-full border-[28px] border-gray-100" />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-sm font-bold text-gray-500">Total</span>
          <span className="text-3xl font-black text-gray-950">{formatNumber(total)}</span>
        </div>
      </div>
      <div className="mt-2 space-y-3">
        {(chartData.length ? chartData : [{ name: 'No data', value: 0 }]).map((item, i) => {
          const pct = total > 0 ? Math.round((item.value / total) * 100) : 0;
          return (
            <div key={item.name} className="flex items-center gap-2 text-sm">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: deviceColors[i % deviceColors.length] }} />
              <span className="flex-1 font-bold text-gray-700">{item.name}</span>
              <span className="font-black text-gray-950">{formatNumber(item.value)}</span>
              <span className="text-gray-400">/</span>
              <span className="font-bold text-gray-500">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminAnalyticsPage() {
  const { token } = useAdminAuth();
  const [stats, setStats] = useState<StatsPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('30daysAgo');
  const [showFilter, setShowFilter] = useState(false);
  const [realtimePages, setRealtimePages] = useState<RealtimePage[]>([]);

  useEffect(() => {
    if (!token) return;
    let mounted = true;
    setLoading(true);
    fetch(`/api/admin/stats?range=${encodeURIComponent(dateRange)}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => { if (mounted && data && !data.message) setStats(data); })
      .catch(() => {})
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [token, dateRange]);

  useEffect(() => {
    if (!token) return;
    let mounted = true;
    const evtSource = new EventSource(`/api/admin/ga-live?token=${token}`);
    evtSource.onmessage = (e) => {
      try {
        const data: RealtimeData = JSON.parse(e.data);
        if (!mounted) return;
        if (data.activeUsers !== undefined) {
          setStats((prev) => prev ? { ...prev, realtimeUsers: data.activeUsers } : prev);
        }
        if (Array.isArray(data.pages)) setRealtimePages(data.pages);
      } catch {}
    };
    evtSource.onerror = () => evtSource.close();
    return () => { mounted = false; evtSource.close(); };
  }, [token]);

  const s = stats || {
    totalViews: 0, totalClicks: 0, totalUsers: 0, sessions: 0, pageViews: 0, realtimeUsers: 0,
    newUsers: 0, returningUsers: 0, traffic: [], dailyViews: [], devices: [], countries: [],
    browsers: [], socialTraffic: [], referralTraffic: [], organicTraffic: [], topPages: [], engagementStats: [],
  };

  const maxPageViews = Math.max(1, ...s.topPages.map((p) => p.viewCount));
  const deviceTotal = s.devices.reduce((a, i) => a + i.value, 0);
  const socialTotal = s.socialTraffic.reduce((a, i) => a + i.value, 0);
  const referralTotal = s.referralTraffic.reduce((a, i) => a + i.value, 0);
  const organicTotal = s.organicTraffic.reduce((a, i) => a + i.value, 0);

  const filteredPages = s.topPages.filter((p) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return `${p.title} ${p.path}`.toLowerCase().includes(q);
  });

  const activeRangeLabel = rangeOptions.find((o) => o.value === dateRange)?.label || 'Last 30 days';

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight sm:text-4xl">Analytics</h1>
            <p className="mt-1 text-xs font-bold text-gray-400">{activeRangeLabel}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowFilter(!showFilter)}
                className="flex h-11 items-center gap-2 rounded-xl bg-white px-4 text-xs font-bold shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04] sm:h-12 sm:text-sm">
                <Filter className="h-4 w-4" /> {activeRangeLabel} <ChevronDown className="h-3 w-3" />
              </button>
              {showFilter && (
                <div className="absolute right-0 top-[calc(100%+8px)] z-30 w-56 rounded-2xl bg-white p-3 shadow-[0_18px_45px_rgba(15,23,42,0.16)] ring-1 ring-black/[0.06]">
                  {rangeOptions.map((o) => (
                    <button key={o.value} onClick={() => { setDateRange(o.value); setShowFilter(false); }}
                      className={`block w-full rounded-xl px-3 py-2 text-left text-xs font-black transition-all ${dateRange === o.value ? 'bg-[#34c759] text-white' : 'text-gray-600 hover:bg-gray-50'}`}>
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <label className="flex h-11 min-w-0 items-center gap-3 rounded-xl bg-white px-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04] sm:h-12 sm:min-w-[200px]">
              <Search className="h-5 w-5 text-gray-500" />
              <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search pages" className="w-full bg-transparent text-sm font-bold text-gray-700 outline-none placeholder:text-gray-400" />
            </label>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5 xl:gap-5">
          {[
            { label: 'Total Views', value: s.totalViews, color: '#5856d6', icon: Eye },
            { label: 'Total Clicks', value: s.totalClicks, color: '#0a84ff', icon: MousePointerClick },
            { label: 'Total Users', value: s.totalUsers, color: '#ff6b00', icon: Users },
            { label: 'Sessions', value: s.sessions, color: '#ff2d55', icon: Timer },
            { label: 'Real-time', value: s.realtimeUsers, color: '#34c759', icon: Radio },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-4 sm:p-5">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3" style={{ backgroundColor: `${item.color}14` }}>
                  <Icon className="w-5 h-5" style={{ color: item.color }} />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">{loading ? '--' : formatNumber(item.value)}</div>
                <div className="text-xs sm:text-sm text-gray-400 font-semibold mt-0.5">{item.label}</div>
              </div>
            );
          })}
        </div>

        {/* Site Traffic + Pages */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-[1.85fr_0.95fr]">
          <div className="rounded-[22px] bg-white/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04] sm:p-5">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-black text-gray-950">Site traffic</h3>
              <div className="flex flex-wrap items-center gap-5 text-sm font-bold">
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#34c759]" /> New</span>
                <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-full bg-[#0a9ff0]" /> Returning</span>
              </div>
            </div>
            <div className="h-[260px] sm:h-[315px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={s.traffic}>
                  <defs>
                    <linearGradient id="nv" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#34c759" stopOpacity={0.26} /><stop offset="100%" stopColor="#34c759" stopOpacity={0} /></linearGradient>
                    <linearGradient id="rv" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0a9ff0" stopOpacity={0.26} /><stop offset="100%" stopColor="#0a9ff0" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e8ebf5" strokeWidth={1} vertical={false} />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#73788a', fontSize: 12, fontWeight: 700 }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#73788a', fontSize: 12, fontWeight: 700 }} />
                  <Tooltip contentStyle={{ borderRadius: 14, border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 12px 30px rgba(15,23,42,0.12)' }} />
                  <Area type="monotone" dataKey="newVisitor" stroke="#34c759" strokeWidth={4} fill="url(#nv)" dot={{ r: 0 }} activeDot={{ r: 7, strokeWidth: 4, stroke: '#fff' }} />
                  <Area type="monotone" dataKey="returningVisitor" stroke="#0a9ff0" strokeWidth={4} fill="url(#rv)" dot={{ r: 0 }} activeDot={{ r: 7, strokeWidth: 4, stroke: '#fff' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-[22px] bg-white/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04] sm:p-5">
            <h3 className="mb-5 flex items-center gap-2 text-lg font-black text-gray-950"><MousePointerClick className="h-5 w-5 text-[#ff2d55]" /> Pages</h3>
            <div className="space-y-4">
              {(filteredPages.length ? filteredPages : [{ path: '/', title: 'No tracked pages yet', viewCount: 0, lastViewedAt: null }]).map((page) => (
                <div key={page.path}>
                  <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                    <span className="flex min-w-0 items-center gap-2 truncate font-bold text-gray-700">
                      <img src="/favicon-96x96.png" alt="" className="h-5 w-5 flex-shrink-0 rounded-md object-contain shadow-sm ring-1 ring-black/5" />
                      <span className="truncate">{page.path === '/' ? 'Homepage' : page.title || page.path}</span>
                    </span>
                    <span className="font-black text-gray-950">{formatNumber(page.viewCount)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-[#ff2d55]" style={{ width: `${Math.min(100, (page.viewCount / maxPageViews) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Views */}
        <div className="rounded-[22px] bg-white/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04] sm:p-5">
          <h3 className="mb-5 text-lg font-black text-gray-950">Daily Views</h3>
          <div className="h-[220px] sm:h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={s.dailyViews}>
                <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#73788a', fontSize: 12, fontWeight: 700 }} />
                <YAxis hide />
                <Tooltip cursor={{ fill: 'rgba(52,199,89,0.08)' }} contentStyle={{ borderRadius: 14, border: '1px solid rgba(0,0,0,0.06)' }} />
                <Bar dataKey="views" radius={[10, 10, 10, 10]} fill="#34c759" barSize={18} background={{ fill: '#e9f8ee', radius: 10 }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Realtime Pages */}
        {realtimePages.length > 0 && (
          <div className="rounded-[22px] bg-white/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04] sm:p-5">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-black text-gray-950"><Radio className="h-5 w-5 text-[#34c759]" /> Real-time Pages</h3>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {realtimePages.map((rp) => (
                <div key={rp.page} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-sm">
                  <span className="truncate font-bold text-gray-700">{rp.page}</span>
                  <span className="ml-2 font-black text-[#34c759]">{rp.activeUsers}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Devices + Countries + Browsers + Engagement */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          <RingChart devices={s.devices} total={deviceTotal} />
          {[
            { title: 'Countries', data: s.countries, color: '#34c759', icon: Earth, fallbackIcon: Globe2, kind: 'country' as const },
            { title: 'Browsers', data: s.browsers, color: '#0a84ff', icon: Chrome, fallbackIcon: Chrome, kind: 'browser' as const },
          ].map((section) => {
            const maxV = Math.max(1, ...section.data.map((i) => i.value));
            const HeaderIcon = section.icon;
            return (
              <div key={section.title} className="rounded-[22px] bg-white/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04] sm:p-5">
                <h3 className="flex items-center gap-2 text-lg font-black text-gray-950">
                  <HeaderIcon className="h-5 w-5" style={{ color: section.color }} />
                  {section.title}
                </h3>
                <div className="mt-5 space-y-4">
                  {(section.data.length ? section.data : [{ name: 'No data', value: 0 }]).map((item) => (
                    <div key={item.name}>
                      <div className="mb-1 flex items-center justify-between gap-3 text-sm">
                        <span className="flex min-w-0 items-center gap-2 truncate font-bold text-gray-700">
                          <MetricIcon item={item} kind={section.kind} color={section.color} fallback={section.fallbackIcon} />
                          <span className="truncate">{item.name}</span>
                        </span>
                        <span className="font-black text-gray-950">{formatNumber(item.value)}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-gray-100">
                        <div className="h-full rounded-full" style={{ width: `${Math.min(100, (item.value / maxV) * 100)}%`, backgroundColor: section.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="rounded-[22px] bg-white p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04] sm:p-5">
            <h3 className="flex items-center gap-2 text-lg font-black text-gray-950">
              <TrendingUp className="h-5 w-5 text-[#5856d6]" /> Engagement
            </h3>
            <div className="mt-5 space-y-4">
              {(s.engagementStats.length ? s.engagementStats : []).map((item) => {
                const M = itemIcon(item.label, MousePointerClick);
                return (
                  <div key={item.label} className="rounded-2xl bg-gray-50/70 p-3">
                    <div className="mb-2.5 flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-xl" style={{ color: item.color, backgroundColor: item.softColor }}>
                        <M className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-bold text-gray-600">{item.label}</span>
                      <span className="text-xl font-black text-gray-950">{loading ? '--' : item.value.toFixed(2)}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-100/90">
                      <div className="h-full rounded-full shadow-[0_0_10px_currentColor] transition-[width] duration-1000 ease-out" style={{ width: `${item.width}%`, backgroundColor: item.color, color: item.color }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Social / Referral / Organic */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-3">
          {[
            { title: 'Social Media Traffic', value: socialTotal, data: s.socialTraffic, color: '#af52de', icon: Share2, kind: 'source' as const },
            { title: 'Referral Traffic', value: referralTotal, data: s.referralTraffic, color: '#ff2d55', icon: Link2, kind: 'source' as const },
            { title: 'Organic Traffic', value: organicTotal, data: s.organicTraffic, color: '#34c759', icon: Search, kind: 'source' as const },
          ].map((section) => (
            <div key={section.title} className="rounded-[22px] bg-white/80 p-4 shadow-[0_16px_45px_rgba(15,23,42,0.08)] ring-1 ring-black/[0.04] sm:p-5">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-lg font-black text-gray-950">
                  <section.icon className="h-5 w-5" style={{ color: section.color }} />
                  {section.title}
                </h3>
                <span className="text-2xl font-black" style={{ color: section.color }}>{formatNumber(section.value)}</span>
              </div>
              <div className="mt-5 space-y-3">
                {(section.data.length ? section.data : [{ name: 'No data', value: 0 }]).map((item) => (
                  <div key={item.name} className="flex items-center justify-between rounded-2xl bg-gray-50 px-4 py-3 text-sm">
                    <span className="flex min-w-0 items-center gap-2 font-bold text-gray-700">
                      <MetricIcon item={item} kind={section.kind} color={section.color} fallback={section.icon} />
                      <span className="truncate">{item.name}</span>
                    </span>
                    <span className="font-black text-gray-950">{formatNumber(item.value)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminShell>
  );
}