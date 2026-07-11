import React from 'react';
import type { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';
import { ShieldCheck, Cpu } from 'lucide-react';

export const metadata: Metadata = {
  title: 'APK Verification - Yono Games',
  description: 'Understand the standard security checks, hash verifications, and safety scans applied to Android APK packages.',
  alternates: {
    canonical: '/apk-verification',
  },
};

export default function ApkVerificationPage() {
  return (
    <PublicShell>
      <div className="space-y-6 animate-fadeIn pb-10">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#065f46] to-[#047857] text-white p-6 shadow-md border border-white/10">
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] bg-emerald-950 text-emerald-200 font-extrabold uppercase px-2.5 py-1 rounded-full border border-emerald-800/40">
              Security
            </span>
            <h1 className="text-xl font-extrabold uppercase tracking-wide">APK Verification</h1>
            <p className="text-xs text-emerald-100 leading-relaxed font-semibold">
              How we inspect APK packages to protect users against corrupted files and malware.
            </p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-slate-650 leading-relaxed font-medium">
          <h2 className="text-sm font-extrabold text-slate-850 flex items-center gap-2 border-b border-slate-100 pb-2">
            <ShieldCheck size={16} className="text-emerald-600" /> Verification Protocol
          </h2>
          <p>We believe app safety is critical for mobile players. Before listing any redirect links or APK file options, we perform standard system verifications.</p>
          
          <h3 className="text-xs font-extrabold text-slate-800 pt-2">Security Inspections Include:</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Signature Scans:</strong> We cross-verify SHA-256 package hashes against the developer\'s official build certificates.</li>
            <li><strong>Malware Screening:</strong> All direct files are scanned using Virustotal APIs to ensure they are free of adware, trojans, or malicious scripts.</li>
            <li><strong>Runtime Testing:</strong> Android packages are briefly executed on test simulators to confirm the setup installs clean without causing background errors.</li>
          </ul>
        </section>
      </div>
    </PublicShell>
  );
}
