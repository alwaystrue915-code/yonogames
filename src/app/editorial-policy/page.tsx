import React from 'react';
import type { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';
import { FileText, CheckCircle, RefreshCw, Users } from 'lucide-react';

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
            <span className="text-[10px] bg-slate-800 text-slate-300 font-extrabold uppercase px-2.5 py-1 rounded-full border border-slate-700/50">
              Standards
            </span>
            <h1 className="text-xl font-extrabold uppercase tracking-wide">Editorial Policy</h1>
            <p className="text-xs text-slate-200 leading-relaxed font-semibold">
              Our commitment to delivering accurate, unbiased, and transparent APK listing details and gaming guides.
            </p>
          </div>
        </div>

        <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4 text-xs text-slate-600 leading-relaxed font-medium">
          <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
            <FileText size={16} className="text-blue-600" /> Content Standards & Editorial Rules
          </h2>

          <p><strong>1. Our Mission for Honest Information</strong></p>
          <p>Hey there. We want to tell you exactly how we write and verify everything you see on Yono Games. Our main goal is simple: to give you honest, unbiased, and genuinely useful details about Rummy APKs, Teen Patti downloads, slots, and other mobile card games. Finding real and accurate information about online gaming in India can be frustrating — there is a lot of misleading content out there. That is exactly why we have set strict editorial standards for ourselves, so that whatever you read here is factual, clear, and actually helpful.</p>

          <p><strong>2. How We Collect and Double-Check Data</strong></p>
          <p>Before any app goes live on our portal, our editorial team digs deep into its details. We do not just copy-paste whatever the developer puts on their website. Instead, we manually verify the signup bonus claims, download the APK packages ourselves, confirm the minimum withdrawal limits, test the game categories that are available, and note the supported payment methods. We keep this data up to date because apps change their terms frequently. If we find that an app has revised its bonus wagering requirements or changed its withdrawal minimums, we update the listing as quickly as possible so you always have current information.</p>

          <p><strong>3. Independence from App Developers</strong></p>
          <p>Yono Games is a fully independent directory. We do not have any ownership ties to the apps we list, and we are not employed by any Rummy platform or gaming network. Even if a developer reaches out and asks us to change how we describe their app, our editorial team makes the final call based on factual data and real user experience — not on requests or payments. If we run sponsored content or display paid advertisements, we always label them clearly so you can tell the difference between our honest editorial content and paid promotion. We will never inflate ratings, hide negative information, or suppress legitimate concerns about an app just to maintain a business relationship.</p>

          <p><strong>4. Who Writes Our Content</strong></p>
          <p>Our content is written by people who are familiar with the Indian mobile gaming space. Our writers understand how UPI payments work, what wagering terms actually mean, and what players genuinely look for in a Rummy or card gaming platform. We do not use automated tools to generate our app descriptions — every listing is written and reviewed by a human editor before it goes live. This ensures that the tone, accuracy, and relevance of each piece meets our quality standards.</p>

          <p><strong>5. Natural Language and Easy Readability</strong></p>
          <p>We write everything in plain, spoken English — the kind you would use when explaining something to a friend. Gaming policies and bonus terms can get overly technical and confusing. Our job is to break all of that down into language that is easy for anyone to follow, whether you are checking how to make a UPI withdrawal or figuring out the wagering requirement on a welcome bonus. No jargon, no legal mumbo-jumbo — just straightforward, honest explanations.</p>

          <p><strong>6. Corrections and Updates</strong></p>
          <p>We are human and we make mistakes. If you ever spot an error in any of our listings — a wrong bonus amount, an outdated withdrawal limit, or incorrect game information — please reach out to us through our Contact page. We take correction requests seriously and aim to review and resolve them within 48 hours. Our editorial standards require us to correct factual errors promptly and transparently, without making quiet edits that erase the mistake without acknowledgement.</p>

          <p>We are committed to being a trustworthy resource for the Indian mobile gaming community. Every piece of content on Yono Games is published with the goal of helping you make better, safer, and more informed decisions.</p>
        </section>
      </div>
    </PublicShell>
  );
}
