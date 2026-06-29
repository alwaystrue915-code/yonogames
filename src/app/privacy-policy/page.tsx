import React from 'react';
import { Eye, ShieldAlert, FileText } from 'lucide-react';
import { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';

const privacySeoSections = [
  {
    title: 'Directory Role And User Privacy',
    body: 'Yono Games works as an independent rummy APK and Yono games directory. The website is designed to help visitors compare app listings, bonus information, withdrawal details, features, categories, and official redirect links. We do not ask visitors to create a gaming account on Yono Games, we do not collect deposits, and we do not operate wallets for third-party apps. This privacy policy explains how directory-level information may be handled when someone browses pages, clicks app links, reads FAQs, or contacts us for corrections and business inquiries.'
  },
  {
    title: 'Analytics, Logs, And Basic Website Data',
    body: 'Like most websites, Yono Games may use basic technical data to understand page performance, search traffic, popular listings, broken routes, and download click trends. This can include browser type, device category, approximate traffic source, page views, clicked app links, and general server logs. This information helps us improve the directory, update rankings, detect broken APK redirect links, and understand which rummy APK pages are useful to visitors. We do not use this information to create player accounts, process payments, or guarantee app results.'
  },
  {
    title: 'Third-Party APK Links And App Policies',
    body: 'Many pages on Yono Games link to third-party websites, developer pages, APK files, or app destinations. When a visitor leaves Yono Games and opens another website or installs an app, that third-party service may collect its own data, apply its own terms, request permissions, or manage payment and wallet systems. Users should read the privacy policy and terms of each app before installing, registering, depositing, or playing. Yono Games cannot control how external apps handle KYC, transactions, gameplay records, notifications, bonuses, or withdrawal requests.'
  },
  {
    title: 'Responsible Gaming And Local Rules',
    body: 'Real cash gaming, rummy apps, and skill-based game platforms may involve financial risk and legal restrictions depending on location. Users should confirm whether an app is allowed in their state or country before downloading or playing. Yono Games does not provide legal advice, does not promise income, and does not recommend treating gaming as a source of guaranteed earnings. Visitors should set limits, avoid chasing losses, protect personal data, and stop using any app that appears unsafe, misleading, or inconsistent with local rules.'
  },
  {
    title: 'Content Accuracy And Listing Updates',
    body: 'We try to keep app names, bonuses, download references, categories, and descriptions useful, but third-party app details can change. Bonuses may expire, withdrawal limits may update, and official links may move. Yono Games may revise content when we find better information or receive a valid correction request. Users should verify important details inside the official app or website before acting on any listing. A directory page is a research starting point, not a guarantee that every third-party promotion remains unchanged forever.'
  },
  {
    title: 'GEO Friendly Privacy Answers',
    body: 'Generative engine optimization works best when privacy answers are direct and easy to summarize. For that reason, this policy clearly states that Yono Games is a directory, not a gambling operator; that third-party apps have separate policies; that basic analytics may be used for website improvement; and that users should check local laws. These points help visitors, Google, and AI answer systems understand the boundaries of the website without confusing Yono Games with the apps listed on it.'
  }
];

const privacyFaqs = [
  {
    question: 'Does Yono Games collect payment details?',
    answer: 'No. Yono Games does not collect deposits, card details, wallet information, UPI data, or withdrawal information. Any payment-related action happens on third-party apps or websites.'
  },
  {
    question: 'Are third-party APK links controlled by Yono Games?',
    answer: 'No. We may provide redirect links for discovery, but external app pages, APK files, permissions, privacy rules, and account systems are controlled by their respective owners.'
  },
  {
    question: 'Does Yono Games guarantee bonuses or winnings?',
    answer: 'No. Bonus values, eligibility rules, withdrawal limits, gameplay outcomes, and promotions are controlled by third-party apps. Users should verify all details on the official app before playing.'
  },
  {
    question: 'Can privacy and gaming rules change?',
    answer: 'Yes. App policies, local laws, and online gaming rules can change. Users should check the latest rules in their location and read each app policy before downloading or registering.'
  }
];

export const metadata: Metadata = {
  title: 'Privacy Policy - Yono Games APK Directory',
  description: 'Read the Yono Games privacy policy for our rummy APK directory, third-party download links, data usage, cookies, analytics, and responsible gaming disclaimer.',
  keywords: ['Yono Games privacy policy', 'rummy APK privacy', 'third-party APK links', 'gaming app disclaimer', 'responsible gaming'],
  alternates: {
    canonical: '/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  const privacyFaqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: privacyFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <PublicShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyFaqJsonLd) }}
      />
      <div className="space-y-6 animate-fadeIn pb-10">
      
      {/* 1. Header Card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#0f172a] to-[#1e293b] text-white p-6 shadow-md border border-white/10">
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-slate-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <span className="text-[10px] bg-slate-800 text-slate-300 font-extrabold uppercase px-2.5 py-1 rounded-full border border-slate-700/50">
            Terms & Privacy
          </span>
          <h1 className="text-xl font-extrabold uppercase tracking-wide">Privacy Policy & Disclaimers</h1>
          <p className="text-xs text-slate-300 leading-relaxed font-semibold">
            Last Updated: June 2026. Learn how Yono Games handles directory data, analytics, third-party APK links, and user privacy.
          </p>
        </div>
      </div>

      {/* 2. Structured Policy Sections */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-5">
        
        {/* Section 1 */}
        <div className="space-y-2 text-left">
          <h3 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
            <Eye size={13} className="text-blue-500" />
            1. Information Collection
          </h3>
          <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
            Yono Games is a rummy APK directory. We do not collect deposits, process payments, or require player accounts. Basic analytics such as page views and download clicks may be used to improve listings, rankings, and user experience.
          </p>
        </div>

        {/* Section 2 */}
        <div className="space-y-2 text-left">
          <h3 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
            <ShieldAlert size={13} className="text-amber-500" />
            2. Third-Party Websites & Games
          </h3>
          <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
            Our APK download links may open third-party websites, game pages, or developer-hosted files. Their privacy rules, login systems, payment terms, and gameplay policies are separate from Yono Games.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-2 text-left">
          <h3 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
            <FileText size={13} className="text-[#b91c1c]" />
            3. Disclaimer & Disclosures
          </h3>
          <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
            Yono Games shares app information for comparison and educational use. Real cash gaming involves financial risk and may be restricted by local laws. Users should verify legality, read app terms, and play responsibly.
          </p>
        </div>

      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2.5">
          <h2 className="text-sm font-extrabold text-slate-800">
            Privacy, Third-Party Links & Responsible Use
          </h2>
        </div>
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed font-medium text-left">
          {privacySeoSections.map((section) => (
            <div key={section.title} className="space-y-1.5">
              <h3 className="text-xs font-extrabold text-slate-800">{section.title}</h3>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
        <h2 className="text-sm font-extrabold text-slate-800">Privacy Policy FAQ</h2>
        <div className="space-y-3 text-left">
          {privacyFaqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <h3 className="text-[11px] font-extrabold text-slate-800">{faq.question}</h3>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      </div>
    </PublicShell>
  );
}
