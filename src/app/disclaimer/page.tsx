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

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed font-medium">
            <p><strong>1. Introduction to our Directory Role</strong></p>
            <p>Hey, thanks for stopping by Yono Games. Before you click any buttons or get excited about the mobile card games we review, we need to make some things completely clear. Yono Games works only as an independent informational reviews portal and app directory. We write helpful guides, list game specifications (like welcome offers or withdrawal limits), and give redirect download links. However, we do not claim any official partnership, trademark ownership, or direct endorsement from the companies or developers who make these apps.</p>

            <p><strong>2. Financial Risk Warning (Real Money Games)</strong></p>
            <p>Playing Rummy, Teen Patti, Slots, or online casinos involves real money, which means there is a real risk of losing your cash. These games can also become addictive if not played responsibly. We want to be 100% honest with you: Yono Games does not encourage you to gamble, we do not sponsor tournaments, and we do not manage card tables or bets. Any cash you deposit on third-party apps is your own decision. Never play with money you cannot afford to lose, and do not treat card gaming as a job or a way to earn a steady income.</p>

            <p><strong>3. Regional Legal Rules in India</strong></p>
            <p>Online gaming laws in India are highly localized. Some states, including Andhra Pradesh, Telangana, Assam, Odisha, Sikkim, and Nagaland, have put restrictions or complete bans on skill-based real money card games. If you live in one of these states, you should not download cash gaming APK files. It is your job to check the local regulations in your state or city before you install any game from this site. Yono Games is not responsible for any legal issues or account blocks you experience due to playing from restricted areas.</p>

            <p><strong>4. Accuracy and Validity of App Information</strong></p>
            <p>We do our best to list verified signup bonuses, features, download links, and specifications. But app features, promotional bonuses, and payment systems are updated frequently by their respective developers. We cannot guarantee that all details will always be 100% current. Please double-check the rules, signup terms, and transaction policies inside the official app before you register or add any funds to your wallet.</p>

            <p><strong>5. Zero Liability for Financial Losses</strong></p>
            <p>Yono Games, its team, and operators are not liable for any money lost, app installation failures, transaction delays, account closures, or poor game experiences on external platforms. If something goes wrong with your deposits or payouts on a listed app, you must reach out to their customer support team. We do not have control over their servers, wallets, or payment channels.</p>
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
