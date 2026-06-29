"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit3, Trash2 } from 'lucide-react';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import AdminShell from '../../../components/admin/AdminShell';
import { AppDetail } from '../../../types';

export default function AppsListPage() {
  const { token, isAuthenticated, loading: authLoading } = useAdminAuth();
  const [apps, setApps] = useState<AppDetail[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchApps = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/apps');
      if (res.ok) setApps(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchApps(); }, []);

  const handleDelete = async (slug: string) => {
    if (!confirm('Delete this app?')) return;
    try {
      await fetch(`/api/apps/${slug}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      fetchApps();
    } catch (e) { console.error(e); }
  };

  if (authLoading) {
    return <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center"><div className="w-8 h-8 border-[3px] border-[#34C759]/20 border-t-[#34C759] rounded-full animate-spin" /></div>;
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center w-full" />;
  }

  const filtered = apps.filter(a => a.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Apps</h1>
            <p className="text-sm text-gray-400 font-medium mt-0.5">{apps.length} total apps</p>
          </div>
          <Link href="/admin/apps/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#2C3EFE] text-white rounded-2xl font-bold text-sm hover:bg-[#2230d6] transition-all shadow-sm">
            <Plus className="w-4 h-4" /> New App
          </Link>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search apps..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-[300px] pl-10 pr-4 py-2.5 bg-white/80 backdrop-blur-sm border border-black/[0.06] rounded-2xl text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2C3EFE]/20 focus:border-[#2C3EFE]/40 transition-all" />
        </div>

        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] p-12 text-center">
            <p className="text-sm font-semibold text-gray-900">{search ? 'No apps match your search' : 'No apps yet'}</p>
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-black/[0.04] overflow-hidden">
            {filtered.map(app => (
              <div key={app.slug} className="flex items-center gap-4 p-4 border-b border-black/[0.04] hover:bg-gray-50 transition-colors">
                <img src={app.logo} alt="" className="w-12 h-12 rounded-xl object-cover border shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-gray-900 truncate">{app.name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-gray-400">{app.category}</span>
                    <span className="text-[11px] text-gray-400">|</span>
                    <span className="text-[11px] text-gray-400">{app.bonus}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      app.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
                    }`}>{app.status}</span>
                  </div>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <Link href={`/admin/apps/${app.slug}`}
                    className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50">
                    <Edit3 size={12} />
                  </Link>
                  <button onClick={() => handleDelete(app.slug)}
                    className="p-2 rounded-lg bg-white border border-gray-200 text-red-500 hover:bg-red-50 cursor-pointer">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
