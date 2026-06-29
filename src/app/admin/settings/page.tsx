"use client";

import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import AdminShell from '../../../components/admin/AdminShell';
import { AdminSettings } from '../../../components/admin/AdminSettings';
import { SiteSettings } from '../../../types';

export default function AdminSettingsPage() {
  const { isAuthenticated, loading: authLoading } = useAdminAuth();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      if (res.ok) setSettings(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  if (authLoading) {
    return <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center"><div className="w-8 h-8 border-[3px] border-[#34C759]/20 border-t-[#34C759] rounded-full animate-spin" /></div>;
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center w-full">{null}</div>;
  }

  if (loading) {
    return (
      <AdminShell>
        <div className="py-32 flex flex-col items-center justify-center gap-2">
          <RefreshCw className="animate-spin text-[#34C759] w-6 h-6" />
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Loading...</span>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell>
      <AdminSettings settings={settings} onRefreshSettings={fetchSettings} />
    </AdminShell>
  );
}
