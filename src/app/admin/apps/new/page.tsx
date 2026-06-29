"use client";

import React from 'react';
import AdminShell from '../../../../components/admin/AdminShell';
import { AppForm } from '../../../../components/admin/AppForm';
import { useAdminAuth } from '../../../../context/AdminAuthContext';

export default function NewAppPage() {
  const { isAuthenticated, loading: authLoading } = useAdminAuth();

  if (authLoading) {
    return <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center"><div className="w-8 h-8 border-[3px] border-[#34C759]/20 border-t-[#34C759] rounded-full animate-spin" /></div>;
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center w-full">{null}</div>;
  }

  return (
    <AdminShell>
      <AppForm />
    </AdminShell>
  );
}
