import React from 'react';
import type { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';
import { HeartHandshake, AlertTriangle, Clock, PhoneCall } from 'lucide-react';

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
            <span className="text-[10px] bg-sky-900 text-sky-200 font-extrabold uppercase px-2.5 py-1 rounded-full border border-sky-700/40">
              Guidance
            </span>
            <h1 className="text-xl font-extrabold uppercase tracking-wide">Responsible Gaming</h1>
            <p className="text-xs text-sky-100 leading-relaxed font-semibold">
              Essential tips, warnings, and strategies to help you play safely and protect your financial wellbeing.
            </p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-slate-600 leading-relaxed font-medium">
          <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
            <HeartHandshake size={16} className="text-sky-600" /> Playing Smart and Staying Safe
          </h2>

          <p><strong>1. Gaming is Entertainment, Not Income</strong></p>
          <p>Let us be straightforward about this. Online Rummy, Teen Patti, and other real-money mobile games are a form of entertainment. They are skill-based games that can be a lot of fun when approached the right way. But they are absolutely not a reliable or sustainable source of income. Winnings are not guaranteed — they depend on skill, strategy, and in some cases, luck. If you are playing with the expectation of making consistent money to cover your rent, bills, or debts, please step back and reconsider. That is not a healthy relationship with gaming.</p>

          <p><strong>2. Age Restriction — 18+ Only</strong></p>
          <p>This is non-negotiable. Real-money gaming is strictly for adults aged 18 years and above. If you are under 18, you are not allowed to participate in any form of cash-based gameplay. All the platforms we list on Yono Games are required to verify user age during the registration process. If you are a parent or guardian, please make sure your children cannot access these apps through your device or accounts.</p>

          <p><strong>3. Set Limits Before You Start</strong></p>
          <p>One of the most effective habits for responsible gaming is setting hard limits before you even open the app. Decide in advance how much money you are willing to spend in a session and stick to it no matter what happens. Most reputable Rummy platforms have built-in deposit limit features in their account settings — use them. Setting a limit when you are calm and thinking clearly is much easier than trying to stop yourself mid-game when emotions are running high.</p>

          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Daily Deposit Limit:</strong> Set the maximum amount you are comfortable depositing in a single day.</li>
            <li><strong>Session Time Limit:</strong> Decide how long you will play before you stop, regardless of whether you are winning or losing.</li>
            <li><strong>Loss Limit:</strong> Choose an amount you are okay with losing. If you hit that number, close the app and walk away.</li>
            <li><strong>Winning Target:</strong> Set a goal. If you reach it, cash out and enjoy the win instead of risking it again.</li>
          </ul>

          <p><strong>4. Warning Signs to Watch Out For</strong></p>
          <p>Sometimes gaming habits can develop into something unhealthy without us even realizing it. Here are some warning signs that suggest you might need to take a break or seek support:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>You keep playing even after losing more than you planned to.</li>
            <li>You find yourself thinking about gaming constantly, even when you are doing something else.</li>
            <li>You borrow money or delay paying bills to fund your gaming sessions.</li>
            <li>You feel irritated or anxious when you cannot play.</li>
            <li>You hide your gaming activity from family or friends.</li>
          </ul>
          <p>If any of these sound familiar, please talk to someone you trust or reach out to a professional support helpline.</p>

          <p><strong>5. Take Breaks and Rest</strong></p>
          <p>Fatigue and stress are two of the biggest contributors to poor decision-making in gaming. Avoid playing late at night or when you are emotionally upset. Take regular breaks during long sessions — even a five-minute walk can help clear your head. Playing with a clear mind gives you a much better shot at making smart decisions.</p>

          <p><strong>6. Where to Get Help</strong></p>
          <p>If you feel your gaming habits are becoming a problem, do not hesitate to reach out for support. iCall (India) offers free counselling and can be reached at 9152987821. You can also speak to a trusted family member or healthcare professional. Asking for help is a sign of strength, not weakness.</p>

          <p>Yono Games is committed to promoting a safe and enjoyable gaming environment. We encourage all our users to game responsibly, stay informed, and prioritize their mental and financial health above everything else.</p>
        </section>
      </div>
    </PublicShell>
  );
}
