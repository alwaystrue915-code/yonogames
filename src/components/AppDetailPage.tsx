"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BadgeCheck,
  ChevronRight,
  Download,
  Gift,
  HelpCircle,
  ShieldCheck,
  Smartphone,
  Star,
  ThumbsUp,
  TrendingUp,
  WalletCards,
} from 'lucide-react';
import { AppDetail, SiteSettings } from '../types';
import { AppCard } from './AppCard';

interface AppDetailPageProps {
  app: AppDetail;
  apps: AppDetail[];
  settings?: SiteSettings | null;
}

export const AppDetailPage: React.FC<AppDetailPageProps> = ({
  app,
  apps,
  settings
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const downloadLink = `/go/${app.slug}`;

  // Find related apps in the same category (excluding current app)
  const relatedApps = apps
    .filter(a => a.category === app.category && a.slug !== app.slug && a.status === 'active')
    .slice(0, 8);
  const popularityScore = Math.min(98, Math.max(60, Math.round((Number(app.rating) || 4.2) * 20)));
  const popularityBars = [70, 84, 92, 88, 72, 51, 32, 24, 38, 59, 78, 86, 73, 55, 42, 50, 68, 81, 74, 57, 36, 24, 31, 49, 69, 82, 64, 45];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Full FAQ list — reused for both JSON-LD schema and the accordion UI
  const faqList = [
    ...(app.faqs || []),
    { question: `Is ${app.name} safe to use?`, answer: `Yes, ${app.name} is a verified platform with 256-bit encryption for all transactions. It uses secure payment gateways and follows fair play policies. Always download the app from the official link provided on this page.` },
    { question: `How do I claim the ${app.bonus} bonus on ${app.name}?`, answer: `To claim the ${app.bonus} welcome bonus, click the "Claim Bonus" button on this page, complete your registration via OTP verification, and the bonus will be credited to your in-app wallet instantly. Check the app's terms for wagering requirements.` },
    { question: `What is the minimum withdrawal on ${app.name}?`, answer: `The minimum withdrawal amount on ${app.name} is ${app.minWithdrawal}. Withdrawals are processed through UPI, bank transfer, or digital wallets and typically take 24-48 hours to reflect in your account.` },
    { question: `Can I play ${app.name} on multiple devices?`, answer: `Yes, you can use the same account on multiple Android devices. Simply log in with your registered mobile number and OTP on any device. The app supports seamless sync across devices.` },
    { question: `Does ${app.name} offer free practice games?`, answer: `Yes, ${app.name} offers free practice tables where you can play without depositing real money. This is a great way to learn the rules and improve your skills before playing cash games.` },
  ];

  // JSON-LD schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://yonogamelive.app/' },
      { '@type': 'ListItem', position: 2, name: app.category || 'Rummy', item: 'https://yonogamelive.app/all-yonoapps' },
      { '@type': 'ListItem', position: 3, name: app.name, item: `https://yonogamelive.app/apps/${app.slug}` },
    ],
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(app.rating || '4.2'),
      ratingCount: String(settings?.ratingCount || 125),
      bestRating: '5',
      worstRating: '1',
    },
    description: app.seoDescription || `Download ${app.name} APK and get ${app.bonus} bonus. Min withdrawal ${app.minWithdrawal}. Android Rummy app.`,
    image: app.logo,
    url: `https://yonogamelive.app/apps/${app.slug}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqList.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  return (
    <div className="space-y-5 pb-10 animate-fadeIn px-1">

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Breadcrumb with Schema */}
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 p-0 m-0 list-none" itemScope itemType="https://schema.org/BreadcrumbList">
          <li className="inline-flex items-center font-bold" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/" className="text-[#2C3EFE] hover:text-[#2230d6] transition-colors text-[11px] no-underline" itemProp="item">
              <span itemProp="name">Home</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          <li className="inline-flex items-center text-slate-400 text-[11px]" aria-hidden="true"> / </li>
          <li className="inline-flex items-center font-bold" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link href="/all-yonoapps" className="text-[#2C3EFE] hover:text-[#2230d6] transition-colors text-[11px] no-underline" itemProp="item">
              <span itemProp="name">{app.category || 'Rummy'}</span>
            </Link>
            <meta itemProp="position" content="2" />
          </li>
          <li className="inline-flex items-center text-slate-400 text-[11px]" aria-hidden="true"> / </li>
          <li className="inline-flex items-center font-bold text-slate-400 text-[11px]" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <span itemProp="name">{app.name}</span>
            <meta itemProp="position" content="3" />
          </li>
        </ol>
      </nav>

      {/* Product header */}
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1fr_320px] lg:items-center">
          <div className="flex items-start gap-4 sm:gap-5">
            <a href={downloadLink} target="_blank" rel="noreferrer noopener nofollow" className="block shrink-0">
              <img
                src={app.logo}
                alt={`${app.name} APK download – ${app.category} app logo`}
                className="h-24 w-24 rounded-lg border border-slate-200 bg-white object-cover shadow-md sm:h-32 sm:w-32"
              />
            </a>
            <div className="min-w-0 flex-1 pt-0.5">
              <div className="mb-1.5 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase text-emerald-700">
                  <BadgeCheck size={14} /> Verified listing
                </span>
                <span className="text-[10px] font-bold text-slate-400">Android APK</span>
              </div>
              <h1 className="break-words text-xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
                {app.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold text-slate-600">
                <span className="inline-flex items-center gap-1 text-amber-600"><Star size={14} fill="currentColor" /> {app.rating} / 5</span>
                <span>{app.installs} installs</span>
                <span>{app.category}</span>
              </div>

            </div>
          </div>

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-black uppercase text-[#2C3EFE]">New user offer</span>
                <p className="mt-0.5 text-2xl font-black text-slate-900">{app.bonus}</p>
              </div>
              <Gift size={28} className="text-[#2C3EFE]" />
            </div>
            <p className="mt-2 text-[11px] font-semibold leading-relaxed text-slate-500">Bonus eligibility and usage rules are set by the app. Check the offer terms during signup.</p>
          </div>
        </div>

        <div className="grid grid-cols-3 border-t border-slate-200 bg-slate-50">
          <div className="flex min-w-0 items-center justify-center gap-2 border-r border-slate-200 px-2 py-3">
            <Smartphone size={16} className="shrink-0 text-[#2C3EFE]" />
            <div className="min-w-0"><span className="block text-[9px] font-black uppercase text-slate-400">Platform</span><strong className="block truncate text-xs text-slate-800">Android</strong></div>
          </div>
          <div className="flex min-w-0 items-center justify-center gap-2 border-r border-slate-200 px-2 py-3">
            <WalletCards size={16} className="shrink-0 text-[#2C3EFE]" />
            <div className="min-w-0"><span className="block text-[9px] font-black uppercase text-slate-400">Min. withdrawal</span><strong className="block truncate text-xs text-slate-800">{app.minWithdrawal}</strong></div>
          </div>
          <div className="flex min-w-0 items-center justify-center gap-2 px-2 py-3">
            <ShieldCheck size={16} className="shrink-0 text-emerald-600" />
            <div className="min-w-0"><span className="block text-[9px] font-black uppercase text-slate-400">Access</span><strong className="block truncate text-xs text-slate-800">18+ only</strong></div>
          </div>
        </div>
      </section>

      {/* Primary actions */}
      <section id="download" className="grid scroll-mt-24 gap-3 sm:grid-cols-2">
        <a href={downloadLink} target="_blank" rel="noreferrer noopener nofollow" className="btn-download-red flex h-14 items-center justify-center gap-2 rounded-lg px-5 text-sm no-underline">
          <Download size={19} /> Download {app.name} APK
        </a>
        <a href={downloadLink} target="_blank" rel="noreferrer noopener nofollow" className="flex h-14 items-center justify-center gap-2 rounded-lg bg-[#2C3EFE] px-5 text-sm font-black text-white no-underline shadow-md transition-colors hover:bg-[#2230d6]">
          <Gift size={19} /> Claim {app.bonus} Bonus
        </a>
      </section>

      {/* Screenshots Gallery */}
      {app.screenshots && app.screenshots.length > 0 && (
        <section className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="flex items-center gap-2.5 px-4 pt-4 pb-3 border-b border-slate-100">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-[#2C3EFE]">
              <Smartphone size={16} />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase text-[#2C3EFE]">App Gallery</span>
              <h2 className="text-sm font-extrabold text-slate-900 leading-none mt-0.5">Screenshots</h2>
            </div>
          </div>
          {/* Horizontal scroll on mobile, wrap on desktop */}
          <div className="px-4 pb-4 pt-3">
            <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 sm:overflow-visible sm:pb-0">
              {app.screenshots.map((src, i) => (
                <div
                  key={i}
                  className="shrink-0 snap-start w-[120px] sm:w-auto rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-sm"
                  style={{ aspectRatio: '9/16' }}
                >
                  <img
                    src={src}
                    alt={`${app.name} ${app.category} app screenshot ${i + 1} – how to play and win real cash on Android`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={270}
                    height={480}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Quick install guide */}
      <section id="install-guide" className="scroll-mt-24 rounded-lg border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">How to install {app.name}</h2>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-bold text-slate-500">
              <span><b className="mr-1 text-[#2C3EFE]">1.</b> Download APK</span>
              <span><b className="mr-1 text-[#2C3EFE]">2.</b> Allow installation</span>
              <span><b className="mr-1 text-[#2C3EFE]">3.</b> Sign up and verify</span>
            </div>
          </div>
          <a href="https://yonogamelive.app/blog/how-to-download-yono-games" target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 text-xs font-black text-[#2C3EFE] no-underline hover:text-[#2230d6]">
            Read full guide <ChevronRight size={15} />
          </a>
        </div>
      </section>

      {/* Admin-entered article content */}
      {app.description && app.description.trim() !== '' && (
        <section className="rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm sm:p-6">
          <div className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#2C3EFE]">
              <Smartphone size={18} />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase text-[#2C3EFE]">Complete app review</span>
              <h2 className="text-base font-extrabold text-slate-900 sm:text-lg">About {app.name} APK</h2>
            </div>
          </div>
          <div 
            className="blog-content text-sm text-slate-600 leading-relaxed space-y-4 [&_h2]:text-base [&_h2]:font-extrabold [&_h2]:text-slate-800 [&_h2]:mt-6 [&_h2]:mb-3 [&_h3]:text-base [&_h3]:font-extrabold [&_h3]:text-slate-800 [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-sm [&_p]:text-slate-600 [&_p]:leading-relaxed [&_p]:mb-4 [&_ul]:space-y-1.5 [&_ul]:mb-4 [&_li]:text-sm [&_li]:text-slate-600 [&_li]:font-medium [&_li]:list-disc [&_li]:ml-5 [&_ol]:space-y-1.5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:ml-5 [&_strong]:text-slate-800 [&_strong]:font-extrabold [&_a]:text-[#2C3EFE] [&_a]:font-bold [&_a]:underline [&_img]:rounded-xl [&_img]:border [&_img]:border-slate-200 [&_img]:my-4 [&_img]:max-w-full [&_table]:w-full [&_table]:border-collapse [&_table]:mb-4 [&_table]:text-sm [&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-100 [&_th]:px-3 [&_th]:py-2 [&_th]:font-extrabold [&_th]:text-slate-700 [&_td]:border [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2 [&_td]:text-slate-600 [&_tr]:even:bg-slate-50 [&_blockquote]:border-l-4 [&_blockquote]:border-[#2C3EFE] [&_blockquote]:pl-4 [&_blockquote]:py-1 [&_blockquote]:text-slate-500 [&_blockquote]:italic [&_blockquote]:my-4 [&_pre]:bg-slate-900 [&_pre]:text-slate-100 [&_pre]:p-4 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_pre]:text-xs [&_pre]:my-4 [&_code]:bg-slate-100 [&_code]:text-slate-800 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-xs [&_code]:font-mono [&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:p-0 [&_hr]:border-slate-200 [&_hr]:my-6 break-words whitespace-normal" 
            dangerouslySetInnerHTML={{ __html: app.description }} 
          />
        </section>
      )}

      {/* Highlights checklist */}
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600"><ShieldCheck size={18} /></div>
        <h3 className="text-left text-sm font-extrabold text-slate-900">
          Gameplay Features
        </h3>
        <ul className="mt-3 flex flex-col gap-2.5 text-left">
          {app.features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs font-semibold leading-5 text-slate-600">
              <BadgeCheck size={14} className="mt-0.5 shrink-0 text-emerald-600" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Accordion FAQs */}
      <section className="rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-6">
        <div className="mb-4 flex items-center gap-3 text-left">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#2C3EFE] shadow-sm"><HelpCircle size={18} /></div>
          <div><span className="text-[9px] font-black uppercase text-slate-400">Need help?</span><h3 className="text-base font-extrabold text-slate-900">Frequently Asked Questions</h3></div>
        </div>
        <div className="flex flex-col gap-2.5">
          {faqList.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full cursor-pointer items-center justify-between border-0 bg-white p-4 text-left text-xs font-extrabold text-slate-700 outline-none transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  <span>{faq.question}</span>
                  <span className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-extrabold text-slate-500">
                    {isOpen ? '–' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 bg-white px-4 py-3.5 text-left text-xs leading-6 text-slate-500">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* App-specific popularity */}
      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-10">
          <div className="text-center lg:text-left">
            <div className="mb-4 flex items-center justify-center gap-2 lg:justify-start">
              <TrendingUp size={18} className="text-emerald-600" />
              <h2 className="text-base font-extrabold text-slate-900 sm:text-lg">Application Popularity</h2>
            </div>
            <div className="flex items-center justify-center gap-4 sm:gap-7 lg:justify-start">
              <strong className="text-5xl font-black text-emerald-600 sm:text-7xl">{popularityScore}%</strong>
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full sm:h-24 sm:w-24" style={{ background: `conic-gradient(#10b981 ${popularityScore}%, #d1fae5 0)` }} aria-label={`${popularityScore}% popularity score`}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white sm:h-[68px] sm:w-[68px]">
                  <ThumbsUp size={27} className="text-emerald-600" />
                </div>
              </div>
            </div>
            <p className="mx-auto mt-4 max-w-sm text-xs font-semibold leading-5 text-slate-500 lg:mx-0">Popularity indicator based on the listed rating and app activity.</p>
          </div>

          <div className="min-w-0">
            <div className="flex h-11 items-end justify-center gap-1 overflow-hidden border-b border-slate-200 px-1">
              {popularityBars.map((height, index) => (
                <span key={index} className={`w-1.5 shrink-0 rounded-t-sm ${index < 8 ? 'bg-red-500' : index < 15 ? 'bg-amber-500' : index < 22 ? 'bg-lime-500' : 'bg-slate-300'}`} style={{ height: `${height}%` }} />
              ))}
            </div>
            <div className="grid grid-cols-3 divide-x divide-slate-200 py-5 text-center">
              <div className="min-w-0 px-2"><span className="block text-[9px] font-black uppercase text-slate-400">Rating</span><strong className="mt-1 block text-sm text-slate-900">{app.rating} / 5</strong></div>
              <div className="min-w-0 px-2"><span className="block text-[9px] font-black uppercase text-slate-400">Downloads</span><strong className="mt-1 block truncate text-sm text-slate-900">{app.installs}</strong></div>
              <div className="min-w-0 px-2"><span className="block text-[9px] font-black uppercase text-slate-400">Votes</span><strong className="mt-1 block text-sm text-slate-900">{settings?.ratingCount || 125}</strong></div>
            </div>
            <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row">
              <span className="text-xs font-semibold text-slate-500">Community rating for {app.name}</span>
              <div className="flex items-center gap-1" aria-label={`${app.rating} out of 5 stars`}>
                {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={20} className={star <= Math.round(Number(app.rating) || 0) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar games list */}
      {relatedApps.length > 0 && (
        <section className="space-y-4 border-t border-slate-200 pt-6">
          <div className="flex items-end justify-between px-1">
            <div><span className="text-[9px] font-black uppercase text-[#2C3EFE]">You may also like</span><h3 className="text-base font-extrabold text-slate-900">
              Other Popular Rummy Apps
            </h3></div>
            <Link href="/all-yonoapps" className="inline-flex items-center gap-1 text-xs font-black text-[#2C3EFE] no-underline">View all <ChevronRight size={14} /></Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 md:border-none md:shadow-none bg-transparent divide-y divide-slate-100 md:divide-y-0 border border-slate-100 rounded-xl overflow-hidden shadow-sm p-0">
            {relatedApps.map((rel, idx) => (
              <div key={rel.slug} className="bg-white md:border md:border-slate-200 md:rounded-2xl md:shadow-xs overflow-hidden">
                <AppCard
                  app={rel}
                  variant="medium"
                  rank={idx + 1}
                  cardStyle={settings?.cardStyle || 'default'}
                />
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
export default AppDetailPage;
