import React from 'react';
import { Shield, Sparkles, Award } from 'lucide-react';
import { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';

const aboutSeoSections = [
  {
    title: 'Why Yono Games Exists',
    body: 'Yono Games was created for users who search for Yono games, rummy APK download options, signup bonus details, withdrawal limits, app features, and safe install information in one simple place. Many visitors do not want a confusing chain of popups, duplicate pages, or unclear claims. They want a clean directory where each listing explains what the app offers, what type of game it promotes, what bonus is mentioned, and where the official install or redirect link can be found. Our goal is to organize this information in a readable way for Indian users who compare gaming apps before making any decision.'
  },
  {
    title: 'How We Organize Yono Game Listings',
    body: 'A good rummy APK listing should not be only a download button. It should include the app name, logo, bonus, install count, minimum withdrawal information, category, tags, features, FAQs, and a short explanation written in plain language. Yono Games structures these details so users can compare multiple Yono game apps quickly. Instead of forcing visitors to open many unrelated pages, we keep app cards, ranking sections, filters, related app suggestions, and app detail pages connected. This helps people understand the difference between new picks, recommended apps, popular apps, and other listed games.'
  },
  {
    title: 'SEO And GEO Friendly App Discovery',
    body: 'Search engines and AI answer engines work best when information is clear, complete, and written naturally. That is why Yono Games uses descriptive headings, short summaries, comparison-friendly cards, FAQ answers, and responsible gaming notes. GEO, or generative engine optimization, means the content should answer real questions directly: what is the app, is the link official, what bonus is shown, what should users check before downloading, and who should avoid real-money gaming. We write for humans first, while keeping the page structure easy for Google and AI systems to understand.'
  },
  {
    title: 'What Makes A Helpful Rummy APK Directory',
    body: 'Users often compare rummy APK and Yono game pages by looking for trust signals. A helpful page should show current app information, avoid exaggerated earning promises, explain that third-party apps have their own terms, and remind users to follow local rules. Yono Games focuses on discovery, comparison, and organization. We do not run the listed games, process deposits, guarantee winnings, or control withdrawals. The directory is designed to help users research apps more carefully before they leave our website and visit a third-party download destination.'
  },
  {
    title: 'India Focused Search Intent',
    body: 'Most visitors searching for Yono games are looking from India and use phrases like Yono APK download, Yono rummy app, best rummy bonus, new Yono game, safe APK, official app link, and withdrawal app list. We include these natural keyword variations where they make sense, without stuffing the page. The aim is to match user intent: finding a verified-looking app listing, checking basic details, reading safety notes, and comparing similar options. This makes the website more useful for organic search and more understandable for AI-generated search summaries.'
  },
  {
    title: 'Responsible And Transparent Approach',
    body: 'Real cash gaming can involve financial risk, legal restrictions, age limits, and personal responsibility. Yono Games encourages users to check laws in their state or country, read the terms of each app, avoid unverified payment requests, and never treat gaming as guaranteed income. If an app asks for sensitive information, users should verify the official source before installing anything. Our content is informational, and every app owner remains responsible for its own service, privacy policy, wallet rules, gameplay, promotions, and customer support.'
  }
];

const aboutFaqs = [
  {
    question: 'What is Yono Games?',
    answer: 'Yono Games is an independent app directory that organizes Yono games, rummy APK listings, bonus details, withdrawal information, and official redirect links for users who want to compare apps before downloading.'
  },
  {
    question: 'Does Yono Games own the listed games?',
    answer: 'No. Yono Games does not own, operate, or manage third-party games. We provide app information and links for discovery. Each app has its own owner, terms, privacy policy, and support system.'
  },
  {
    question: 'Why are FAQs added on app and information pages?',
    answer: 'FAQs help users, Google, and AI answer engines understand the page clearly. They cover common search intent such as APK safety, bonus details, download links, support, legality, and responsible use.'
  },
  {
    question: 'Should users check local rules before downloading?',
    answer: 'Yes. Gaming and real-money app rules can vary by location and can change over time. Users should always check local laws and the official app terms before installing or playing.'
  }
];

export const metadata: Metadata = {
  title: 'About Yono Games - Rummy APK Download Directory',
  description: 'Yono Games is an independent rummy APK download directory with verified app listings, bonus details, withdrawal info, and safe gaming guidance for Indian users.',
  keywords: ['Yono Games', 'rummy APK download', 'Yono games', 'verified APK', 'real cash gaming apps'],
  alternates: {
    canonical: '/about-us',
  },
};

export default function AboutPage() {
  const aboutFaqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: aboutFaqs.map((faq) => ({
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutFaqJsonLd) }}
      />
      <div className="space-y-6 animate-fadeIn pb-10">
      
      {/* 1. Header Banner Card */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-tr from-[#003a92] to-[#002868] text-white p-6 shadow-md border border-white/10">
        {/* Decorative background lights */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <span className="text-[10px] bg-amber-400/20 text-amber-300 font-extrabold uppercase px-2.5 py-1 rounded-full border border-amber-300/20">
            About Yono Games
          </span>
          <h1 className="text-xl font-extrabold uppercase tracking-wide">Premium APK Lobby Directory</h1>
          <p className="text-xs text-slate-200 leading-relaxed font-semibold">
            Yono Games helps users discover verified rummy APK download links, compare bonuses, and review trusted real cash gaming apps in one place.
          </p>
        </div>
      </div>

      {/* 2. Key Pillars Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-2 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
            <Shield size={16} />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">100% Safe APKs</h3>
            <p className="text-[10px] text-slate-500 mt-1 font-semibold leading-relaxed">
              App listings are reviewed for basic safety signals, official download access, and useful player information.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs space-y-2 flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
            <Award size={16} />
          </div>
          <div>
            <h3 className="text-xs font-extrabold text-slate-800">Top Rank Picks</h3>
            <p className="text-[10px] text-slate-500 mt-1 font-semibold leading-relaxed">
              Rankings highlight bonus value, app details, withdrawal information, and overall listing quality.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Detailed Information Section */}
      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2.5">
          <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5">
            <Sparkles size={14} className="text-blue-600" />
            Who We Are & What We Do
          </h2>
        </div>

        <div className="space-y-3.5 text-xs text-slate-600 leading-relaxed font-medium">
          <p>
            <strong className="text-slate-800">Yono Games</strong> is an independent rummy APK download directory made for users who want quick, clear app information. We organize Yono games, signup bonus details, withdrawal limits, features, and official install links so visitors can compare real cash gaming apps before downloading. We do not own or operate listed third-party apps.
          </p>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2.5">
          <h2 className="text-sm font-extrabold text-slate-800">
            Yono Game Directory, SEO Signals & Trust
          </h2>
        </div>
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed font-medium text-left">
          {aboutSeoSections.map((section) => (
            <div key={section.title} className="space-y-1.5">
              <h3 className="text-xs font-extrabold text-slate-800">{section.title}</h3>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
        <h2 className="text-sm font-extrabold text-slate-800">Yono Games FAQ</h2>
        <div className="space-y-3 text-left">
          {aboutFaqs.map((faq) => (
            <div key={faq.question} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <h3 className="text-[11px] font-extrabold text-slate-800">{faq.question}</h3>
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed mt-1">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Play Responsibly Strip */}
      <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 space-y-2 text-center">
        <div className="flex items-center gap-1.5 justify-center text-red-750 font-black text-[11px] uppercase tracking-wide">
          <span>Play Responsibly</span>
        </div>
        <p className="text-[10px] text-red-600 font-semibold leading-relaxed">
          Real money gaming carries financial risk. These games are intended for users aged 18 and above residing in permitted jurisdictions. Please play within your limits.
        </p>
      </div>
      </div>
    </PublicShell>
  );
}
