import React from 'react';
import type { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';
import { ShieldAlert, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DMCA Policy - Yono Games',
  description: 'Submit copyright claims or report trademark issues regarding Yono Games directory listings.',
  alternates: {
    canonical: '/dmca',
  },
};

export default function DmcaPage() {
  return (
    <PublicShell>
      <div className="space-y-6 animate-fadeIn pb-10">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#7f1d1d] to-[#991b1b] text-white p-6 shadow-md border border-white/10">
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] bg-red-950 text-red-200 font-extrabold uppercase px-2.5 py-1 rounded-full border border-red-800/40">
              Intellectual Property
            </span>
            <h1 className="text-xl font-extrabold uppercase tracking-wide">DMCA Copyright Policy</h1>
            <p className="text-xs text-red-100 leading-relaxed font-semibold">
              Read how we address trademark claims, copyright complaints, and asset removal requests.
            </p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-slate-650 leading-relaxed font-medium">
          <h2 className="text-sm font-extrabold text-slate-850 flex items-center gap-2 border-b border-slate-100 pb-2">
            <ShieldAlert size={16} className="text-red-650" /> Copyright Claims
          </h2>
          <p>Yono Games respects copyright ownership. If you believe your trademark or copyrighted image is displayed on our portal without proper authorization, please email us a clear removal request.</p>
          
          <h3 className="text-xs font-extrabold text-slate-800 pt-2">How to Submit a Request:</h3>
          <p>Your request must include:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Identification of the copyrighted material claimed to have been infringed.</li>
            <li>Direct URL link to the page hosting the contested file or screenshot.</li>
            <li>Your contact info (name, official email address, and signature authority).</li>
          </ul>
          <p className="flex items-center gap-1.5 font-bold text-slate-800 mt-2">
            <Mail size={14} className="text-blue-600" /> Support Email: contact@yonogamelive.app
          </p>
        </section>
      </div>
    </PublicShell>
  );
}
