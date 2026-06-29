"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Send, Zap } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeaderProps {
  settings: SiteSettings | null;
}

export const Header: React.FC<HeaderProps> = ({ settings }) => {
  const pathname = usePathname();

  const getHeaderStyles = (bgType?: string) => {
    switch (bgType) {
      case 'money-rain':
        return {
          topBar: 'bg-[#065f46]/90 text-white border-b border-emerald-950/20',
          nav: 'bg-white/95 border-b border-emerald-100 text-emerald-900/80',
          tabActive: 'text-emerald-700 bg-emerald-50/70 border-b-2 border-emerald-600 font-extrabold',
          tabInactive: 'text-slate-500 hover:bg-emerald-50/30 hover:text-emerald-900',
          tabBorder: 'border-r border-emerald-50/50',
          brandGlow: 'from-amber-400 to-emerald-300 text-emerald-950 shadow-emerald-500/10',
          telegramBtn: 'bg-[#065f46] hover:bg-[#047857] text-white border-emerald-300/40 shadow-emerald-800/25'
        };
      case 'royal-gold':
        return {
          topBar: 'bg-gradient-to-r from-amber-700 to-amber-600 text-white border-b border-amber-800/10',
          nav: 'bg-[#fffbeb]/95 border-b border-amber-200/50 text-amber-950/80',
          tabActive: 'text-amber-800 bg-amber-50/60 border-b-2 border-amber-600 font-extrabold',
          tabInactive: 'text-slate-500 hover:bg-amber-100/30 hover:text-amber-900',
          tabBorder: 'border-r border-amber-100/40',
          brandGlow: 'from-amber-400 to-amber-300 text-slate-950 shadow-amber-500/10',
          telegramBtn: 'bg-[#B45309] hover:bg-[#92400e] text-white border-amber-300/40 shadow-amber-800/25'
        };
      case 'dark-luxury-coin':
        return {
          topBar: 'bg-[#001f54]/90 text-white border-b border-white/5',
          nav: 'bg-[#0a0f24]/90 border-b border-slate-900 text-slate-450',
          tabActive: 'text-cyan-400 bg-white/5 border-b-2 border-cyan-400 font-extrabold',
          tabInactive: 'text-slate-400 hover:bg-white/5 hover:text-slate-200',
          tabBorder: 'border-r border-slate-950/55',
          brandGlow: 'from-cyan-400 to-blue-500 text-slate-950 shadow-cyan-500/10',
          telegramBtn: 'bg-[#001f54] hover:bg-[#001a45] text-white border-blue-300/40 shadow-blue-900/25'
        };
      case 'card-suit-green':
        return {
          topBar: 'bg-[#022c22]/90 text-white border-b border-white/5',
          nav: 'bg-[#064e3b]/90 border-b border-emerald-950/50 text-emerald-100/80',
          tabActive: 'text-amber-400 bg-white/5 border-b-2 border-amber-400 font-extrabold',
          tabInactive: 'text-emerald-200/60 hover:bg-white/5 hover:text-white',
          tabBorder: 'border-r border-emerald-950/40',
          brandGlow: 'from-amber-400 to-yellow-300 text-slate-950 shadow-amber-500/10',
          telegramBtn: 'bg-[#022c22] hover:bg-[#011a15] text-white border-emerald-300/40 shadow-emerald-900/25'
        };
      default: // 'white' or default
        return {
          topBar: 'bg-gradient-to-r from-[#2C3EFE] to-[#2230d6]/95 text-white border-b border-blue-900/10',
          nav: 'bg-white border-b border-slate-200 text-slate-500',
          tabActive: 'text-[#b91c1c] bg-slate-50/50 border-b-2 border-[#b91c1c] font-extrabold',
          tabInactive: 'text-slate-500 hover:bg-slate-50/50 hover:text-slate-800',
          tabBorder: 'border-r border-slate-100',
          brandGlow: 'from-amber-400 to-amber-300 text-slate-950 shadow-blue-500/10',
          telegramBtn: 'bg-[#2C3EFE] hover:bg-[#2230d6] text-white border-blue-300/40 shadow-blue-900/25'
        };
    }
  };

  const hStyles = getHeaderStyles(settings?.backgroundType);

  const tabs = [
    { href: '/', label: 'Home', minWidth: '65px' },
    { href: '/all-yonoapps', label: 'All Yono Apps', minWidth: '120px' },
    { href: '/blog', label: 'Blog', minWidth: '65px' },
    { href: '/about-us', label: 'About Us', minWidth: '85px' },
    { href: '/contact-us', label: 'Contact Us', minWidth: '95px' },
    { href: '/privacy-policy', label: 'Privacy Policy', minWidth: '120px' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full select-none shadow-md backdrop-blur-md">
      {/* Top Bar */}
      <div className={`px-3.5 py-2.5 flex items-center justify-between transition-all duration-300 ${hStyles.topBar}`}>
        <Link href="/" className="flex items-center cursor-pointer group no-underline text-inherit">
          {settings?.headerLogo ? (
            <img
              src={settings.headerLogo}
              alt={settings.headerTitle || "Logo"}
              className="h-6 w-auto object-contain"
            />
          ) : (
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${hStyles.brandGlow} flex items-center justify-center font-black text-base shadow transition-all duration-300 group-hover:scale-105 active:scale-95`}>
                <Zap size={16} />
              </div>
              <div className="text-left">
                <strong className="text-xs font-black tracking-wide block leading-none font-header">
                  {settings?.headerTitle || 'YONO GAMES'}
                </strong>
                <span className="text-[9px] opacity-90 font-bold uppercase tracking-wider block mt-0.5">
                  {settings?.headerSubtitle || 'Verified APK Lobbies'}
                </span>
              </div>
            </div>
          )}
        </Link>

        <a
          href={settings?.telegramLink || 'https://telegram.me/aaron7512'}
          target="_blank"
          rel="noreferrer noopener nofollow"
          className={`inline-flex items-center gap-1 border text-white font-extrabold text-[10px] px-3 py-1.5 rounded-full active:scale-95 transition-all shadow-md no-underline ${hStyles.telegramBtn}`}
        >
          <Send size={11} />
          Join Telegram
        </a>
      </div>

      {/* Scrollable Sub-Navigation tabs */}
      <nav className={`flex overflow-x-auto whitespace-nowrap scrollbar-none text-[10.5px] lg:text-xs transition-all duration-300 ${hStyles.nav} lg:justify-center`}>
        {tabs.map((tab, idx) => {
          const isActive = pathname === tab.href;
          const isLast = idx === tabs.length - 1;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{ minWidth: tab.minWidth }}
              className={`flex-1 lg:flex-none py-3.5 px-3 lg:px-5 transition-all flex items-center justify-center gap-1 no-underline ${
                !isLast ? hStyles.tabBorder : ''
              } ${isActive ? hStyles.tabActive : hStyles.tabInactive}`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
export default Header;
