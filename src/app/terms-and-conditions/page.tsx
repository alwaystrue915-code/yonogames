import React from 'react';
import type { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';
import { FileText, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Yono Games APK Lobby',
  description: 'Review the Terms & Conditions of Yono Games directory website. Understand our app comparisons, redirect links, user policy, and platform boundaries.',
  keywords: ['Yono Games terms', 'rummy APK terms', 'directory disclaimer', 'user policy'],
  alternates: {
    canonical: '/terms-and-conditions',
  },
};

const terms = [
  {
    title: '1. Directory Purpose Only',
    body: 'Yono Games is an independent informational directory for skill-based and Rummy APK platforms. We do not host games, process money, handle player deposits, or manage withdrawals. All downloads, registration bonuses, and play actions occur on external third-party servers.'
  },
  {
    title: '2. User Eligibility & Jurisdiction',
    body: 'By browsing Yono Games, you represent that you are at least 18 years of age and that real-money online gaming is legal in your state or region. It is your sole responsibility to check local restrictions before installing any listed application.'
  },
  {
    title: '3. Accuracy of Listings',
    body: 'While we work to supply correct bonus amounts, minimum withdrawal amounts, rating scales, and download URLs, developer offers can change without notice. We are not responsible for any outdated information or changed app terms.'
  },
  {
    title: '4. Third-Party Relationships',
    body: 'Any transaction, deposit, account registration, gameplay history, or dispute is strictly between you and the respective third-party app operator. Yono Games does not provide customer support for external services.'
  }
];

export default function TermsPage() {
  return (
    <PublicShell>
      <div className="space-y-6 animate-fadeIn pb-10">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#1e293b] to-[#334155] text-white p-6 shadow-md border border-white/10">
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] bg-slate-800 text-slate-300 font-extrabold uppercase px-2.5 py-1 rounded-full border border-slate-700/50">
              Policies
            </span>
            <h1 className="text-xl font-extrabold uppercase tracking-wide">Terms & Conditions</h1>
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              Last Updated: June 2026. Please read our service parameters and informational directory policies.
            </p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-2.5 flex items-center gap-2">
            <FileText size={16} className="text-blue-650" />
            <h2 className="text-sm font-extrabold text-slate-800">Website Usage Terms</h2>
          </div>

          <div className="space-y-4 text-xs text-slate-650 leading-relaxed font-medium">
            {terms.map((term, i) => (
              <div key={i} className="space-y-1.5">
                <h3 className="text-xs font-extrabold text-slate-800">{term.title}</h3>
                <p>{term.body}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 space-y-2 text-center">
          <div className="flex items-center gap-1.5 justify-center text-red-750 font-black text-[11px] uppercase tracking-wide">
            <ShieldAlert size={14} />
            <span>Responsible Behavior</span>
          </div>
          <p className="text-[10px] text-red-650 font-semibold leading-relaxed">
            Real cash gaming apps include financial risk. Ensure you play responsibly and verify the authenticity of all third-party apps yourself.
          </p>
        </div>
      </div>
    </PublicShell>
  );
}
