'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Database, Settings, FileText, BarChart3, Menu, X, ArrowLeft, LogOut, Zap } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

interface AdminShellProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, color: '#2C3EFE' },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, color: '#5856D6' },
  { href: '/admin/apps', label: 'Apps', icon: Database, color: '#007AFF' },
  { href: '/admin/blog', label: 'Blog', icon: FileText, color: '#FF9F0A' },
  { href: '/admin/settings', label: 'Settings', icon: Settings, color: '#8E8E93' },
];

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, isAuthenticated, loading: authLoading } = useAdminAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const getActiveTab = () => {
    if (pathname === '/admin') return 'dashboard';
    if (pathname.startsWith('/admin/apps')) return 'apps';
    if (pathname.startsWith('/admin/blog')) return 'blog';
    if (pathname.startsWith('/admin/analytics')) return 'analytics';
    if (pathname.startsWith('/admin/settings')) return 'settings';
    return 'dashboard';
  };

  const activeTab = getActiveTab();

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#f2f2f7] flex items-center justify-center">
        <div className="w-8 h-8 border-[3px] border-[#2C3EFE]/20 border-t-[#2C3EFE] rounded-full animate-spin" />
      </div>
    );
  }

  useEffect(() => {
    if (!authLoading && !isAuthenticated && pathname !== '/admin') {
      router.replace('/admin');
    }
  }, [authLoading, isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#f2f2f7] flex overflow-x-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[280px] bg-white/80 backdrop-blur-xl border-r border-black/5 fixed inset-y-0 left-0 z-30">
        <div className="px-6 h-16 flex items-center gap-3 border-b border-black/5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2C3EFE] to-[#6270ff] flex items-center justify-center shadow-sm">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-gray-900 tracking-tight truncate">Yono Games</div>
            <div className="text-[10px] text-gray-400 font-medium -mt-0.5 truncate">Admin Panel</div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => {
            const isActive = activeTab === item.href.replace('/admin/', '').replace('/admin', 'dashboard') || 
              (item.href !== '/admin' && pathname.startsWith(item.href)) ||
              (item.href === '/admin' && pathname === '/admin');
            const tabId = item.href === '/admin' ? 'dashboard' : item.href.replace('/admin/', '');
            const isItemActive = activeTab === tabId;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all overflow-hidden ${
                  isItemActive
                    ? 'bg-[#2C3EFE]/10 text-[#2C3EFE]'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                <item.icon className="w-5 h-5" style={{ color: isItemActive ? item.color : `${item.color}80` }} />
                <span className="flex-1">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-4 border-t border-black/5 space-y-1">
          <button onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-50 hover:text-red-600 transition-all w-full cursor-pointer">
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
          <Link href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all block">
            <ArrowLeft className="w-4 h-4" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[280px] bg-white shadow-2xl">
            <div className="px-6 h-16 flex items-center justify-between border-b border-black/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2C3EFE] to-[#6270ff] flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold text-gray-900">Yono Games</span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 cursor-pointer">
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <nav className="px-3 py-4 space-y-1">
              {navItems.map(item => {
                const tabId = item.href === '/admin' ? 'dashboard' : item.href.replace('/admin/', '');
                const isItemActive = activeTab === tabId;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}
                    className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all overflow-hidden ${
                      isItemActive ? 'bg-[#2C3EFE]/10 text-[#2C3EFE]' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }`}>
                    <item.icon className="w-5 h-5" style={{ color: isItemActive ? item.color : `${item.color}80` }} />
                    <span className="flex-1">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="px-4 py-4 border-t border-black/5 space-y-1">
              <button onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-50 hover:text-red-600 transition-all w-full cursor-pointer">
                <LogOut className="w-4 h-4" /> Sign Out
              </button>
              <Link href="/" onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-gray-400 hover:bg-gray-100 transition-all block">
                <ArrowLeft className="w-4 h-4" /> Back to Site
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-[280px] min-h-screen overflow-x-hidden">
        <header className="sticky top-0 z-20 h-14 bg-[#f2f2f7]/80 backdrop-blur-xl border-b border-black/5 flex items-center px-4 lg:hidden">
          <button onClick={() => setMobileOpen(true)} className="p-2 -ml-2 rounded-xl hover:bg-gray-200/50 cursor-pointer">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2 ml-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#2C3EFE] to-[#6270ff] flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold text-gray-900">Yono Admin</span>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
