import React from 'react';
import type { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';
import { ShieldCheck, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Responsible Gaming - Yono Games',
  description: 'Understand the guidelines, spending limits, age restrictions, and health warnings related to mobile cash Rummy games.',
  alternates: {
    canonical: '/responsible-gaming',
  },
};

export default function ResponsibleGamingPage() {
  return (
    <PublicShell>
      <div className="space-y-6 animate-fadeIn pb-10">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#0284c7] to-[#0369a1] text-white p-6 shadow-md border border-white/10">
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] bg-sky-955 text-sky-200 font-extrabold uppercase px-2.5 py-1 rounded-full border border-sky-800/40">
              Guidance
            </span>
            <h1 className="text-xl font-extrabold uppercase tracking-wide">Responsible Gaming</h1>
            <p className="text-xs text-sky-100 leading-relaxed font-semibold">
              Essential tips, warnings, and strategies to play safely and prevent financial losses.
            </p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-slate-650 leading-relaxed font-medium">
          <h2 className="text-sm font-extrabold text-slate-850 flex items-center gap-2 border-b border-slate-100 pb-2">
            <HeartHandshake size={16} className="text-sky-600" /> Play Responsibly
          </h2>
          <p>Online Rummy, slots, and casino apps should be treated as casual entertainment, never as a primary source of income or a method to clear debts. Real-money gaming is strictly limited to players aged 18 and older.</p>
          
          <h3 className="text-xs font-extrabold text-slate-800 pt-2">Best Practices:</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Define Limits:</strong> Set a strict daily budget for deposits and stick to it.</li>
            <li><strong>Set Time Controls:</strong> Avoid playing when tired, stressed, or distracted. Take frequent breaks.</li>
            <li><strong>Winnings Aren\'t Earnings:</strong> Treat any gaming payout as a bonus, not a guaranteed wage.</li>
          </ul>
        </section>
      </div>
    </PublicShell>
  );
}
