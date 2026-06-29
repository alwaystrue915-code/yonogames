"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import AdminShell from '../../../../components/admin/AdminShell';
import { AppForm } from '../../../../components/admin/AppForm';
import { useAdminAuth } from '../../../../context/AdminAuthContext';

export default function EditAppPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isAuthenticated, loading: authLoading } = useAdminAuth();
  const [app, setApp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/apps/${slug}`)
      .then(res => res.json())
      .then(data => { setApp(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (authLoading) {
    return <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center"><div className="w-8 h-8 border-[3px] border-[#34C759]/20 border-t-[#34C759] rounded-full animate-spin" /></div>;
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center w-full">{null}</div>;
  }

  return (
    <AdminShell>
      {loading ? (
        <div className="py-20 flex items-center justify-center">
          <div className="w-8 h-8 border-[3px] border-[#34C759]/20 border-t-[#34C759] rounded-full animate-spin" />
        </div>
      ) : app ? (
        <AppForm initialData={app} />
      ) : (
        <div className="text-center py-20 text-gray-400 font-medium">App not found</div>
      )}
    </AdminShell>
  );
}
