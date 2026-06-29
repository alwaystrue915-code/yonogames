"use client";

import { useAdminAuth } from '../../../context/AdminAuthContext';
import AdminShell from '../../../components/admin/AdminShell';
import { BlogManager } from '../../../components/admin/BlogManager';

export default function AdminBlogPage() {
  const { isAuthenticated, loading: authLoading } = useAdminAuth();

  if (authLoading) {
    return <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center"><div className="w-8 h-8 border-[3px] border-[#34C759]/20 border-t-[#34C759] rounded-full animate-spin" /></div>;
  }

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center w-full">{null}</div>;
  }

  return (
    <AdminShell>
      <BlogManager />
    </AdminShell>
  );
}
