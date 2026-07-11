import React from 'react';
import type { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';
import { FileText, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Policy - Yono Games',
  description: 'Understand the editorial guidelines, content verification standards, and listing criteria of Yono Games APK directory.',
  alternates: {
    canonical: '/editorial-policy',
  },
};

export default function EditorialPolicyPage() {
  return (
    <PublicShell>
      <div className="space-y-6 animate-fadeIn pb-10">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#1e293b] to-[#475569] text-white p-6 shadow-md border border-white/10">
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] bg-slate-800 text-slate-350 font-extrabold uppercase px-2.5 py-1 rounded-full border border-slate-700/50">
              Standards
            </span>
            <h1 className="text-xl font-extrabold uppercase tracking-wide">Editorial Policy</h1>
            <p className="text-xs text-slate-200 leading-relaxed font-semibold">
              Our commitment to delivering accurate, unbiased, and transparent APK listing details and gaming guides.
            </p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-slate-650 leading-relaxed font-medium">
          <h2 className="text-sm font-extrabold text-slate-850 flex items-center gap-2 border-b border-slate-100 pb-2">
            <FileText size={16} className="text-blue-600" /> Content Standards
          </h2>
          <p>At Yono Games, we aim to provide objective, direct, and fact-verified information about mobile apps and Rummy APK files. We write for players and researchers who need honest specifications before playing. Our editorial processes ensure that reviews are not influenced by developer incentives.</p>
          
          <h3 className="text-xs font-extrabold text-slate-800 pt-2">Key Guidelines:</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Accuracy First:</strong> We regularly cross-reference listed bonus values, withdrawal limits, and developer references to reflect real-world values.</li>
            <li><strong>Transparent Redirects:</strong> We only provide links pointing to official sources or verified APK platforms.</li>
            <li><strong>No Paid Hype:</strong> Sponsored promotions are explicitly tagged as sponsored advertisements to maintain trust.</li>
          </ul>
        </section>
      </div>
    </PublicShell>
  );
}
