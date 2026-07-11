import React from 'react';
import type { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer - Yono Games APK Directory',
  description: 'Read the official Yono Games disclaimer. We list and review rummy APK and mobile skill game directories but we do not host, own, or manage cash tournaments.',
  keywords: ['Yono Games disclaimer', 'rummy APK risk warning', 'mobile cash gaming disclaimer'],
  alternates: {
    canonical: '/disclaimer',
  },
};

const disclaimerParagraphs = [
  'Yono Games operates strictly as an independent review portal and app directory. All graphics, brand names, product logos, and download redirect destinations displayed on this site remain the intellectual property of their respective owners. We do not claim any partnership, ownership, or endorsement by the listed app developers.',
  'Online gaming involving real money carries substantial financial risk and can be addictive. Yono Games does not encourage, sponsor, or host paid tournaments, betting pools, or card tables. The information on this website is for comparison, informational, and educational purposes only.',
  'Certain Indian states (such as Andhra Pradesh, Telangana, Assam, Odisha, Sikkim, Nagaland, and others) may restrict or ban real-money gaming activities. It is your responsibility to examine the public regulations and state laws in your specific region before choosing to install any external APK, deposit cash, or join cash tables.'
];

export default function DisclaimerPage() {
  return (
    <PublicShell>
      <div className="space-y-6 animate-fadeIn pb-10">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#991b1b] to-[#7f1d1d] text-white p-6 shadow-md border border-white/10">
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] bg-red-950 text-red-200 font-extrabold uppercase px-2.5 py-1 rounded-full border border-red-800/40">
              Disclaimer
            </span>
            <h1 className="text-xl font-extrabold uppercase tracking-wide">Risk Warning & Disclaimer</h1>
            <p className="text-xs text-red-100 leading-relaxed font-semibold">
              Please read carefully to understand directory boundaries, regional rules, and gameplay liabilities.
            </p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-2.5 flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-650" />
            <h2 className="text-sm font-extrabold text-slate-800">Operational Disclaimers</h2>
          </div>

          <div className="space-y-4 text-xs text-slate-650 leading-relaxed font-medium">
            {disclaimerParagraphs.map((p, index) => (
              <p key={index}>{p}</p>
            ))}
          </div>
        </section>

        <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2 text-center">
          <div className="flex items-center gap-1.5 justify-center text-emerald-750 font-black text-[11px] uppercase tracking-wide">
            <ShieldCheck size={14} />
            <span>Fair Play Research</span>
          </div>
          <p className="text-[10px] text-emerald-650 font-semibold leading-relaxed">
            Verify every app\'s customer support, license credentials, and withdrawal timeframes independently inside their official channels.
          </p>
        </div>
      </div>
    </PublicShell>
  );
}
