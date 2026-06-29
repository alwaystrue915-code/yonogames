"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AppDetail } from '../types';

interface StickyCtaProps {
  topApp: AppDetail | null;
}

export const StickyCta: React.FC<StickyCtaProps> = ({ topApp }) => {
  const pathname = usePathname();
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    if (pathname !== '/') {
      setShowStickyCta(false);
      return;
    }

    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  if (!showStickyCta || !topApp || pathname !== '/') {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-slate-950/95 border-t border-white/10 px-3.5 py-2.5 shadow-2xl">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <img src={topApp.logo} alt="" className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0 bg-white" />
          <div className="text-left min-w-0">
            <strong className="text-xs text-white block truncate max-w-[130px] font-black">{topApp.name}</strong>
            <span className="text-[10px] text-emerald-400 block font-bold">{topApp.bonus} Sign Up Reward</span>
          </div>
        </div>
        <a
          href={`/go/${topApp.slug}`}
          target="_blank"
          rel="noreferrer noopener nofollow"
          className="px-5 py-2.5 rounded-xl text-white font-black text-[11px] shrink-0 cursor-pointer no-underline tracking-wider"
          style={{ background: 'linear-gradient(135deg, #2563eb, #1e40af)' }}
          onMouseOver={(e) => { (e.target as HTMLElement).style.background = 'linear-gradient(135deg, #1e40af, #1e3a8a)'; (e.target as HTMLElement).style.transform = 'scale(1.04)'; (e.target as HTMLElement).style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.45)'; }}
          onMouseOut={(e) => { (e.target as HTMLElement).style.background = 'linear-gradient(135deg, #2563eb, #1e40af)'; (e.target as HTMLElement).style.transform = 'scale(1)'; (e.target as HTMLElement).style.boxShadow = 'none'; }}
        >
          Download APK
        </a>
      </div>
    </div>
  );
};
export default StickyCta;
