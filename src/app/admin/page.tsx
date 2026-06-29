"use client";

import React, { useState, useEffect } from 'react';
import { CalendarDays, RefreshCw } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminAuth } from '../../components/admin/AdminAuth';
import AdminShell from '../../components/admin/AdminShell';
import { AdminAnalytics } from '../../components/admin/AdminAnalytics';
import { DashboardAnalytics } from '../../types';

type DailyPoint = { key: string; label: string; views: number };
type StatsPayload = { dailyViews: DailyPoint[] };

export default function AdminPage() {
  const { isAuthenticated, token, loading: authLoading } = useAdminAuth();
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [totalApps, setTotalApps] = useState<number>(0);
  const [totalBlogPosts, setTotalBlogPosts] = useState<number>(0);
  const [stats, setStats] = useState<StatsPayload | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  const fetchData = async () => {
    if (!isAuthenticated || !token) return;
    setAnalyticsLoading(true);
    try {
      const [analyticsRes, appsRes, blogRes] = await Promise.all([
        fetch('/api/analytics', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('/api/apps'),
        fetch('/api/admin/blog', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
      if (appsRes.ok) { const data = await appsRes.json(); setTotalApps(Array.isArray(data) ? data.length : 0); }
      if (blogRes.ok) { const data = await blogRes.json(); setTotalBlogPosts(Array.isArray(data) ? data.length : 0); }
    } catch (e) { console.error(e); }
    setAnalyticsLoading(false);
  };

  useEffect(() => { if (isAuthenticated) fetchData(); }, [isAuthenticated, token]);

  useEffect(() => {
    if (!isAuthenticated || !token) return;
    setStatsLoading(true);
    fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => res.json())
      .then((data) => { if (data && !data.message) setStats({ dailyViews: data.dailyViews || [] }); })
      .catch(() => {})
      .finally(() => setStatsLoading(false));
  }, [isAuthenticated, token]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-[#34C759]/20 border-t-[#34C759] rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center w-full">
        <AdminAuth />
      </div>
    );
  }

  const dailyViews = stats?.dailyViews || [];
  const chartData = dailyViews.map((d) => ({ date: d.key, count: d.views }));

  return (
    <AdminShell>
      <div className="space-y-6">
        <AdminAnalytics analytics={analytics} loading={analyticsLoading} totalApps={totalApps} totalBlogPosts={totalBlogPosts} />

        {/* Daily Active Users */}
        <div className="bg-white/80 rounded-[22px] border border-black/[0.04] p-5 sm:p-6 shadow-[0_16px_45px_rgba(15,23,42,0.08)]">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900">Daily Active Users</h3>
              <p className="text-xs text-gray-400 font-medium mt-0.5">User activity over the selected period</p>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-black/5 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-500">
              <CalendarDays className="w-3.5 h-3.5" />
              Last 30 Days
            </div>
          </div>
          {statsLoading ? (
            <div className="h-[360px] flex items-center justify-center">
              <div className="w-8 h-8 border-[3px] border-[#34C759]/20 border-t-[#34C759] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="h-[360px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} barCategoryGap="10%" margin={{ top: 8, right: 4, left: 4, bottom: 4 }}>
                  <defs>
                    <linearGradient id="dailyBarGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#34C759" stopOpacity={1} />
                      <stop offset="100%" stopColor="#34C759" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis
                    dataKey="date"
                    axisLine={false} tickLine={false}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    tickFormatter={(val) => { const d = new Date(val + 'T00:00:00'); return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); }}
                  />
                  <YAxis
                    axisLine={false} tickLine={false}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    tickFormatter={(val: number) => val >= 1000 ? `${(val / 1000).toFixed(0)}k` : String(val)}
                  />
                  <Tooltip
                    content={({ active, payload, label }: any) => {
                      if (!active || !payload?.length) return null;
                      const d = new Date(label + 'T00:00:00');
                      return (
                        <div className="bg-white rounded-xl border border-black/5 shadow-lg shadow-black/5 p-3">
                          <p className="text-[11px] font-semibold text-gray-400 mb-1">{d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          <p className="text-sm font-black text-gray-900">{payload[0].value.toLocaleString()} users</p>
                        </div>
                      );
                    }}
                    cursor={{ fill: '#f8fafc' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]} fill="url(#dailyBarGrad)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
