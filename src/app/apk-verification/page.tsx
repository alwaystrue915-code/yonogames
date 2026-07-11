import React from 'react';
import type { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';
import { ShieldCheck, Cpu, AlertTriangle, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'APK Verification - Yono Games',
  description: 'Understand the standard security checks, hash verifications, and safety scans applied to Android APK packages listed on Yono Games.',
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
              How we inspect APK packages to protect users against corrupted files, malware, and fake app clones.
            </p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-slate-600 leading-relaxed font-medium">
          <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
            <ShieldCheck size={16} className="text-emerald-600" /> Why APK Verification Matters
          </h2>

          <p><strong>1. The Problem with Unverified APKs</strong></p>
          <p>Most popular Rummy, Teen Patti, and cash gaming apps in India are distributed as APK files directly from the developer&apos;s website — not through the Google Play Store. This means there is no automatic safety check by Google. Anyone can create a fake APK that looks exactly like a real app but contains hidden malware, spyware, or code that steals your banking credentials once installed. This is a serious risk for players who just want to enjoy a casual game of Rummy.</p>
          <p>At Yono Games, we take APK safety seriously. We do not just link to whatever URL a developer sends us. Every APK that we reference goes through a proper verification process before it appears anywhere on our platform.</p>

          <p><strong>2. Our Verification Process — Step by Step</strong></p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Signature Verification:</strong> We cross-verify the SHA-256 package hash of each APK against the developer&apos;s official build certificates. If the hash does not match, the file has been tampered with and we do not list it.</li>
            <li><strong>Malware Scanning via VirusTotal:</strong> Every APK file link is scanned using the VirusTotal API, which runs the file through over 70 antivirus engines simultaneously. We only publish download references that come back clean across all major engines.</li>
            <li><strong>Permissions Review:</strong> We check the permissions the app requests during installation. A Rummy app should not need access to your call logs, contacts, or microphone. If an app requests permissions that seem excessive or unrelated to gaming, we flag it and mention it in our review.</li>
            <li><strong>Runtime Testing on Emulators:</strong> We install each APK on a controlled Android test environment to confirm it runs without crashing, does not execute suspicious background processes, and does not attempt unauthorized network requests during a normal session.</li>
            <li><strong>Source URL Confirmation:</strong> We verify that the download link we publish leads directly to the official developer domain or CDN. We never link to third-party mirror sites that could host modified versions of the APK.</li>
          </ul>

          <p><strong>3. What Happens When We Find a Problem</strong></p>
          <p>If any part of our verification process raises a red flag, the app is immediately removed from our active listings. We do not give developers a chance to &quot;fix it later&quot; while the listing stays live. Player safety comes first, and we would rather have fewer listings than risk pointing someone to a harmful file.</p>

          <p><strong>4. Keeping Listings Updated</strong></p>
          <p>APK files change with every app update. When an app releases a new version, we re-run our full verification process on the new build before updating the download reference on our page. This ensures that the version you download through Yono Games is always the most recent verified build.</p>

          <p><strong>5. Report a Suspicious APK</strong></p>
          <p>If you ever download an app through our site and notice something suspicious — like unusual battery drain, unexpected permission prompts, or strange network activity — please report it to us through our Contact page immediately. We take every report seriously and will investigate and act quickly.</p>
        </section>
      </div>
    </PublicShell>
  );
}
