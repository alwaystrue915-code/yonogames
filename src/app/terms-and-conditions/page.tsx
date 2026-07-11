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

          <div className="space-y-4 text-xs text-slate-600 leading-relaxed font-medium">
            <div className="space-y-1.5">
              <h3 className="text-xs font-extrabold text-slate-800">1. Welcome to Yono Games Directory</h3>
              <p>Hey there! Welcome to Yono Games. Before you start looking through all the Rummy, Teen Patti, and card gaming apps we have listed here, please take a quick minute to read these terms. By using our website, you agree to follow these basic rules. If you do not agree with anything written here, it is best if you do not use this site. We keep this platform clean and straightforward to help you compare different gaming apps available online.</p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xs font-extrabold text-slate-800">2. We Are Just a Directory (Not a Casino!)</h3>
              <p>First things first, let\'s make it absolutely clear: Yono Games is an independent informational directory. We do not host any of these games on our own servers, we do not handle your money, we do not accept deposits, and we certainly do not process withdrawals. All the app download links, logos, welcome bonuses, and features you see here are for review and discovery. When you click a download button, you are redirected to third-party app stores or official developer websites. Everything that happens next is entirely between you and that third-party app.</p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xs font-extrabold text-slate-850">3. Age Limit and Local Game Laws</h3>
              <p>Since the apps we review involve skill-based cash gaming and card matches, you must be at least 18 years old to use our website and download any listed APK files. Online real-money gaming has strict legal boundaries. For example, states like Andhra Pradesh, Telangana, Assam, Odisha, Sikkim, and Nagaland have restricted cash-based gaming apps. It is your job to make sure online gaming is legal in your city, state, or country before you install anything or deposit any cash. We do not provide legal advice, so please stay informed and follow your local rules.</p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xs font-extrabold text-slate-850">4. Listing Accuracy & Outdated Information</h3>
              <p>We work really hard to keep our app database updated with correct signup bonuses, minimum withdrawal limits, game categories, and download URLs. However, app developers change their terms, bonuses, and policies all the time without letting us know. Because of this, we cannot promise that 100% of the details are accurate at all times. We highly recommend that you verify the bonus rates and gameplay terms inside the official app once you download it. Think of Yono Games as your starting point for research, not as a permanent guarantee of third-party offers.</p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xs font-extrabold text-slate-850">5. Limitation of Liability</h3>
              <p>Yono Games, its creators, and team members are not responsible for any financial losses, gameplay disputes, account bans, or withdrawal delays you might face on third-party apps. We supply comparison data to help you make your own choices. Any money you deposit or spend on listed apps is at your own risk. If you face any account issues, you should contact the customer support team of that specific game app directly, as we do not have access to their database or payment systems.</p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xs font-extrabold text-slate-850">6. Changes to these Terms</h3>
              <p>We might update these Terms & Conditions from time to time to keep up with new laws or changes in our directory features. Whenever we make changes, we will update the "Last Updated" date at the top of this page. Your continued use of the website after an update means you accept the new terms. We suggest checking back once in a while to stay updated on how we operate.</p>
            </div>
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
