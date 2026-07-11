import React from 'react';
import type { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';
import { Award, Star, CheckCircle, Clock, Lock } from 'lucide-react';

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
            <span className="text-[10px] bg-slate-800 text-slate-300 font-extrabold uppercase px-2.5 py-1 rounded-full border border-slate-700/50">
              Evaluations
            </span>
            <h1 className="text-xl font-extrabold uppercase tracking-wide">Review Policy</h1>
            <p className="text-xs text-slate-200 leading-relaxed font-semibold">
              Discover how we compile scores, verify promotional bonuses, and assess withdrawal safety for every app we list.
            </p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-slate-600 leading-relaxed font-medium">
          <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
            <Award size={16} className="text-blue-600" /> How We Review Apps
          </h2>

          <p><strong>1. We Actually Test the Apps</strong></p>
          <p>We do not just skim through an app&apos;s official website and call it done. Our review team installs the APK on real Android devices, creates accounts, checks the signup flow, and goes through the bonus claim process step by step. We want to know what a real player actually experiences — not just what the developer promises on their marketing page. This hands-on testing is the foundation of every review we publish on Yono Games.</p>

          <p><strong>2. Scoring Criteria — What We Actually Look At</strong></p>
          <p>Every app listed on our platform is evaluated using a fixed set of metrics that real players care about. Our scoring is not random. It is structured and repeatable so that every app gets a fair chance. Here is what we check:</p>

          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Withdrawal Speed:</strong> How fast does the app actually pay out? We compare reported UPI settlement times, bank transfer durations, and paytm payout timelines. Apps that settle within 24 hours score higher.</li>
            <li><strong>Bonus Fairness:</strong> Welcome bonuses look attractive on the surface, but many come with very high wagering requirements. We read the fine print so you do not have to. If a bonus requires 30x rollover before withdrawal, we mention it clearly.</li>
            <li><strong>Interface Security:</strong> We check whether the app uses SSL encryption on login screens, whether it holds a valid RNG certificate for fair game randomness, and whether its transaction layer is encrypted end-to-end.</li>
            <li><strong>Game Variety:</strong> We note how many table types are available — Points Rummy, Pool Rummy, Deals Rummy, and whether there are active player lobbies at different stake levels.</li>
            <li><strong>Customer Support:</strong> We evaluate whether the support team is reachable via live chat, email, or in-app ticket, and how quickly they respond to standard queries.</li>
          </ul>

          <p><strong>3. Rating Scale</strong></p>
          <p>Our apps are rated on a scale from 1 to 5. A score of 4.5 or above means the app is excellent across all categories. A score below 3 means there are significant concerns players should know before depositing. We always describe what brought the score up or down in plain language inside the review.</p>

          <p><strong>4. Update Frequency</strong></p>
          <p>Rummy apps change their bonus terms, withdrawal rules, and supported game formats quite frequently. We revisit our top-rated listings every 30 to 60 days to confirm that the information is still accurate. If something changes significantly — like a withdrawal minimum going from ₹100 to ₹500 — we update it right away.</p>

          <p><strong>5. No Paid Rankings</strong></p>
          <p>Our review scores are never for sale. App developers cannot pay us to receive a higher star rating. While we do run ads and some sponsored content, those are clearly marked and kept completely separate from our editorial reviews. You can always trust that our scores reflect our genuine assessment of the app&apos;s quality and user experience.</p>

          <p>If you believe one of our reviews contains outdated or incorrect information, feel free to reach out via our contact page and we will look into it promptly.</p>
        </section>
      </div>
    </PublicShell>
  );
}
