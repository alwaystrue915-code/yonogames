import React from 'react';
import type { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';
import { ShieldAlert, Mail, FileWarning, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DMCA Policy - Yono Games',
  description: 'Submit copyright claims or report trademark issues regarding Yono Games directory listings. We take intellectual property seriously.',
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
              How we handle copyright complaints, trademark disputes, and content removal requests on Yono Games.
            </p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-slate-600 leading-relaxed font-medium">
          <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
            <ShieldAlert size={16} className="text-red-600" /> Our Commitment to Copyright Compliance
          </h2>

          <p><strong>1. Respecting Intellectual Property</strong></p>
          <p>Yono Games is a directory and review platform. We feature app listings, screenshots, logos, and written descriptions related to Rummy, Teen Patti, and other mobile cash gaming apps. We make every effort to ensure that the content on our website is either original, properly licensed, or falls within the boundaries of fair use for informational and review purposes.</p>
          <p>That said, we fully understand that mistakes can happen. If you are a developer, brand owner, or copyright holder and believe that content on our website infringes on your intellectual property rights under the Digital Millennium Copyright Act (DMCA) or any applicable copyright law, we want to hear from you. We take every complaint seriously and act on valid claims quickly.</p>

          <p><strong>2. What Counts as a Valid DMCA Complaint</strong></p>
          <p>Not every removal request qualifies as a valid DMCA claim. For your request to be processed, it must meet the following basic criteria:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Identification of the Copyrighted Work:</strong> You must clearly describe the original copyrighted material that you believe has been infringed. For example, a specific image, logo, app icon, or written piece of content.</li>
            <li><strong>Location of the Infringing Content:</strong> You must provide the direct URL of the page on Yono Games where the allegedly infringing content appears. Vague references like &quot;your website&quot; will not be sufficient for us to locate and review the material.</li>
            <li><strong>Proof of Ownership:</strong> You must provide reasonable evidence that you are the original owner of the content or an authorized agent acting on their behalf. This could be a link to the original source, a registration certificate, or a signed statement of authority.</li>
            <li><strong>Your Contact Details:</strong> Your full legal name, email address, and if applicable, the name of your organization or company. We need to be able to reach you if we have questions about the claim.</li>
            <li><strong>Good Faith Statement:</strong> A written statement confirming that you believe, in good faith, that the use of the content is unauthorized and not covered by fair use or any other legal exception.</li>
          </ul>

          <p><strong>3. How to Submit a Request</strong></p>
          <p>Send all DMCA takedown requests to our official contact email. Please use the subject line &quot;DMCA Takedown Request&quot; so our team can identify and prioritize it properly. We aim to review and respond to all valid DMCA notices within 5 to 10 business days.</p>

          <p className="flex items-center gap-1.5 font-bold text-slate-800">
            <Mail size={14} className="text-blue-600" /> contact@yonogamelive.app
          </p>

          <p><strong>4. Counter-Notices</strong></p>
          <p>If you believe that content was wrongly removed from our website due to a DMCA claim, you have the right to submit a counter-notice. Your counter-notice must include your contact information, a description of the removed content, a statement that you believe the removal was a mistake, and your consent to legal jurisdiction. We will review all counter-notices in accordance with the provisions of the DMCA.</p>

          <p><strong>5. Abuse of the DMCA Process</strong></p>
          <p>We take DMCA abuse seriously. Filing a false or misleading DMCA claim can have legal consequences under Section 512(f) of the DMCA. If we determine that a claim was filed in bad faith, we reserve the right to disregard it and report it to appropriate authorities if needed.</p>

          <p>We appreciate your cooperation in helping us maintain a fair, honest, and legally compliant platform.</p>
        </section>
      </div>
    </PublicShell>
  );
}
