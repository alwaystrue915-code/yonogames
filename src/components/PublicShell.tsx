import React from 'react';
import Link from 'next/link';
import { db } from '../lib/db';
import { Header } from './Header';
import { AnimatedBackground } from './AnimatedBackground';
import { StickyCta } from './StickyCta';
import { CompareDeck } from './CompareDeck';
import { PageTransition } from './PageTransition';
import { Download } from 'lucide-react';

interface PublicShellProps {
  children: React.ReactNode;
}

export default async function PublicShell({ children }: PublicShellProps) {
  const [settings, apps] = await Promise.all([
    db.settings.get(),
    db.apps.find()
  ]);

  const cleanSettings = JSON.parse(JSON.stringify(settings));
  const cleanApps = JSON.parse(JSON.stringify(apps));

  const activeApps = cleanApps.filter((a: any) => a.status === 'active');
  const topApp = activeApps[0] || null;

  const isDarkBg = cleanSettings?.backgroundType === 'dark-luxury-coin' || cleanSettings?.backgroundType === 'card-suit-green';

  const internalLinks = [
    { href: '/', label: 'Home', desc: 'Latest Yono game picks' },
    { href: '/all-yonoapps', label: 'All Yono Apps', desc: 'Browse every APK listing' },
    { href: '/about-us', label: 'About Us', desc: 'How Yono Games works' },
    { href: '/contact-us', label: 'Contact Us', desc: 'Corrections and business queries' },
    { href: '/privacy-policy', label: 'Privacy Policy', desc: 'Data, links and disclaimers' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFE] flex items-start justify-center w-full">
      <div className={`mobile-container min-h-screen flex flex-col justify-between relative w-full shadow-xl transition-all duration-300 ${isDarkBg ? 'theme-dark-bg text-slate-100' : 'text-slate-800'
        }`}>

        {/* Falling rupees / luxury coin floating effects */}
        <AnimatedBackground backgroundType={cleanSettings?.backgroundType} />

        {/* Global navigation top header */}
        <Header settings={cleanSettings} />

        {/* Dynamic page content wrapper */}
        <main className="flex-1 p-4 lg:p-8 w-full relative z-10 overflow-x-hidden">
          <PageTransition>
            {children}
          </PageTransition>
        </main>

        {/* Public footer section (sponsored promo cards + responsible warning) */}
        {cleanSettings && (
          <div className="space-y-4 relative z-10">
            {/* Sponsored Promo Banner */}
            {cleanSettings.footerAdActive && (
              <section className="border border-slate-200 bg-white/80 backdrop-blur-md rounded-2xl shadow-md p-3.5 flex items-center justify-between gap-3 relative overflow-hidden text-left">
                {/* Gold/emerald light glow */}
                <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />

                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={cleanSettings.footerAdLogo || '/scrapperv2/allrummybonus_com/wp-content/uploads/2025/12/all-rummy-bonus-banner1.jpg'}
                    alt=""
                    className="w-12 h-12 rounded-xl object-cover bg-white border border-slate-200 shrink-0 shadow-xs"
                  />
                  <div className="min-w-0 space-y-0.5">
                    <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full font-black uppercase tracking-wider inline-block">
                      SPONSORED AD
                    </span>
                    <h4 className="text-xs font-black text-slate-800 truncate">
                      {cleanSettings.footerAdName || 'Elite Skill App'}
                    </h4>
                    <p className="text-[10.5px] text-slate-500 leading-tight font-semibold line-clamp-2">
                      {cleanSettings.footerAdDesc || 'Get the ultimate rummy and skill gaming experience now.'}
                    </p>
                  </div>
                </div>

                <a
                  href={cleanSettings.footerAdLink || '#'}
                  target="_blank"
                  rel="noreferrer noopener nofollow"
                  className="px-3.5 py-2 h-9 rounded-xl bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black text-[10.5px] flex items-center justify-center gap-1 shrink-0 shadow-md active:scale-95 transition-all no-underline"
                >
                  <Download size={11} /> GET
                </a>
              </section>
            )}

            {/* Site footer */}
            <footer>
              {/* Footer links */}
              <div className="mt-2 p-2.5" style={{ backgroundColor: 'rgb(17, 24, 39)' }}>
                <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                  {internalLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-[10px] font-extrabold text-slate-400 hover:text-white no-underline transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

            </footer>
          </div>
        )}

        {/* Sticky bottom CTA banner */}
        <StickyCta topApp={topApp} />

        {/* Compare matrix deck tray */}
        <CompareDeck />

      </div>
    </div>
  );
}
