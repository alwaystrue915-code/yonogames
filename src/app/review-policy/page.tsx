import React from 'react';
import type { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';
import { Award, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Review Policy - Yono Games',
  description: 'Learn how we score, analyze, and review Rummy APKs, withdrawal rates, and user bonuses on Yono Games.',
  alternates: {
    canonical: '/review-policy',
  },
};

export default function ReviewPolicyPage() {
  return (
    <PublicShell>
      <div className="space-y-6 animate-fadeIn pb-10">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#0f172a] to-[#334155] text-white p-6 shadow-md border border-white/10">
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] bg-slate-800 text-slate-350 font-extrabold uppercase px-2.5 py-1 rounded-full border border-slate-700/50">
              Evaluations
            </span>
            <h1 className="text-xl font-extrabold uppercase tracking-wide">Review Policy</h1>
            <p className="text-xs text-slate-200 leading-relaxed font-semibold">
              Discover how we compile scores, verify promotional bonuses, and assess withdrawal safety.
            </p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-slate-650 leading-relaxed font-medium">
          <h2 className="text-sm font-extrabold text-slate-850 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Award size={16} className="text-blue-600" /> Scoring Criteria
          </h2>
          <p>Each app is evaluated based on concrete metrics that players care about. We check withdrawal timeframes, welcome bonus transparency, gameplay smoothness, active player lobbies, and overall security.</p>
          
          <h3 className="text-xs font-extrabold text-slate-800 pt-2">How We Rate:</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Withdrawal Speed:</strong> How fast payout transactions are reported to settle (e.g. UPI vs Bank).</li>
            <li><strong>Bonus Fairness:</strong> The actual wagering requirement of welcome rewards and signup bonuses.</li>
            <li><strong>Interface Security:</strong> Presence of SSL, transaction encryption, and fair RNG certifications.</li>
          </ul>
        </section>
      </div>
    </PublicShell>
  );
}
