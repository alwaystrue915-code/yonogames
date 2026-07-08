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
  const [descExpanded, setDescExpanded] = useState(false);
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

  return (
    <div className="space-y-5 pb-10 animate-fadeIn px-1">

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
                alt={`${app.name} app icon`}
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
              {app.description && (
                <div className="mt-3 max-w-xl">
                  <p className={`text-xs font-semibold leading-relaxed text-slate-500 sm:text-sm ${!descExpanded ? 'line-clamp-2' : ''}`}>
                    {app.description}
                  </p>
                  {app.description.split(' ').length > 25 && (
                    <button type="button" onClick={() => setDescExpanded(!descExpanded)}
                      className="mt-1 text-[#2C3EFE] font-extrabold hover:underline cursor-pointer border-0 bg-transparent p-0 text-xs">
                      {descExpanded ? 'Show less' : 'Read more'}
                    </button>
                  )}
                </div>
              )}
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
          <a href="#install-guide" className="inline-flex shrink-0 items-center gap-1 text-xs font-black text-[#2C3EFE] no-underline hover:text-[#2230d6]">
            Read full guide <ChevronRight size={15} />
          </a>
        </div>
      </section>

      {/* SEO-friendly full description with tables */}
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
        <div className="space-y-4 text-[13px] font-medium leading-7 text-slate-600 sm:text-sm">

          <p>{app.name} is a premium skill-based card gaming platform built exclusively for Android users who seek high-speed matches, real cash rewards, and a trustworthy gaming environment. Whether you are a beginner looking to learn the basics or a seasoned player aiming for tournament glory, this app delivers a complete package that blends entertainment with earning potential.</p>

          <h3 className="pt-2 text-sm font-extrabold text-slate-900">What is {app.name}?</h3>
          <p>{app.name} is an online multiplayer rummy application that allows players to compete in real-time across multiple game formats including Points Rummy, Pool Rummy, and Deals Rummy. The app is designed to offer a smooth and lag-free experience even on low-bandwidth networks, making it accessible to players across India. With a clean interface and one-tap matchmaking, you can jump into a game within seconds of logging in.</p>

          {/* Specs Table */}
          <div className="my-5 overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full min-w-[460px] text-[12px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left px-4 py-2.5 font-black text-slate-700 uppercase tracking-wider border-b border-slate-200 w-1/3">Specification</th>
                  <th className="text-left px-4 py-2.5 font-black text-slate-700 uppercase tracking-wider border-b border-slate-200">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2.5 font-bold text-slate-500">App Name</td>
                  <td className="px-4 py-2.5 text-slate-700 font-semibold">{app.name}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2.5 font-bold text-slate-500">Category</td>
                  <td className="px-4 py-2.5 text-slate-700 font-semibold">{app.category}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2.5 font-bold text-slate-500">Rating</td>
                  <td className="px-4 py-2.5 text-slate-700 font-semibold">{app.rating} / 5</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2.5 font-bold text-slate-500">Total Installs</td>
                  <td className="px-4 py-2.5 text-slate-700 font-semibold">{app.installs}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2.5 font-bold text-slate-500">Welcome Bonus</td>
                  <td className="px-4 py-2.5 text-emerald-700 font-black">{app.bonus}</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2.5 font-bold text-slate-500">Min Withdrawal</td>
                  <td className="px-4 py-2.5 text-slate-700 font-semibold">{app.minWithdrawal}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-bold text-slate-500">Platform</td>
                  <td className="px-4 py-2.5 text-slate-700 font-semibold">Android APK</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="pt-2 text-sm font-extrabold text-slate-900">Signup Bonus and Promotions</h3>
          <p>New players who register on {app.name} receive a welcome bonus of {app.bonus} credited instantly to their in-app wallet after OTP verification. This bonus can be used to enter low-stake tables and get a feel for the platform without risking your own money. In addition to the signup bonus, the app features daily bonus wheel spins where players can win up to Rs. 500 in extra rewards. Regular promotions and referral bonuses keep the excitement alive for returning users.</p>

          <h3 className="pt-2 text-sm font-extrabold text-slate-900">Game Modes and Variants</h3>
          <p>{app.name} supports several popular rummy variants to suit different playing styles.</p>

          {/* Game Variants Table */}
          <div className="my-5 overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full min-w-[620px] text-[12px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="text-left px-4 py-2.5 font-black text-slate-700 uppercase tracking-wider border-b border-slate-200">Variant</th>
                  <th className="text-left px-4 py-2.5 font-black text-slate-700 uppercase tracking-wider border-b border-slate-200">Description</th>
                  <th className="text-left px-4 py-2.5 font-black text-slate-700 uppercase tracking-wider border-b border-slate-200">Best For</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2.5 font-bold text-slate-700">Points Rummy</td>
                  <td className="px-4 py-2.5 text-slate-600 font-medium">Quick rounds with pre-decided point value. Played until a player declares.</td>
                  <td className="px-4 py-2.5 text-slate-600 font-medium">Fast-paced action</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="px-4 py-2.5 font-bold text-slate-700">Pool Rummy</td>
                  <td className="px-4 py-2.5 text-slate-600 font-medium">Players compete in larger groups with fixed entry fee and prize pool.</td>
                  <td className="px-4 py-2.5 text-slate-600 font-medium">Group competitions</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-bold text-slate-700">Deals Rummy</td>
                  <td className="px-4 py-2.5 text-slate-600 font-medium">Fixed number of deals per match. Strategic and skill-intensive format.</td>
                  <td className="px-4 py-2.5 text-slate-600 font-medium">Strategic players</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="pt-2 text-sm font-extrabold text-slate-900">Security and Fair Play</h3>
          <p>The platform uses 256-bit encryption to protect all financial transactions and user data. Every game is monitored to ensure fair play, and the random card distribution is certified to prevent any manipulation. Players can deposit and withdraw funds through multiple channels including UPI, bank transfer, and digital wallets. With a minimum withdrawal of just {app.minWithdrawal}, cashing out your winnings is straightforward and hassle-free.</p>

          <h3 className="pt-2 text-sm font-extrabold text-slate-900">Customer Support and User Experience</h3>
          <p>{app.name} provides 24/7 dedicated customer support via live chat and email. Whether you have a query about a transaction, a technical glitch, or game rules, the support team is responsive and helpful. The app interface is intuitive, with clearly labeled menus, quick deposit options, and a match history section that lets you track your performance over time.</p>

          <div className="my-5 rounded-lg border border-amber-200 bg-amber-50 p-4 text-left sm:p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-amber-600 shadow-sm">
                <ShieldCheck size={19} />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-amber-950">Play Responsibly</h3>
                <p className="mt-2 text-xs font-semibold leading-6 text-amber-900">
                  Real-money gaming should be treated as entertainment, never as a guaranteed source of income. Set a spending and time limit before playing {app.name}, avoid chasing losses, and take regular breaks. Only users aged 18 or above should participate. Check whether cash games are permitted in your state or district before downloading, depositing, or joining a paid contest.
                </p>
                <p className="mt-2 text-[11px] font-medium leading-5 text-amber-800">
                  We provide independent app information and download guidance; we do not own, host, or operate {app.name}. Review the app&apos;s official terms, bonus conditions, privacy policy, withdrawal rules, and self-exclusion options before creating an account.
                </p>
              </div>
            </div>
          </div>

          <h3 className="pt-2 text-sm font-extrabold text-slate-900">Why Choose {app.name}?</h3>
          <p>With over {app.installs} downloads and a rating of {app.rating} stars, {app.name} has built a strong reputation in the online rummy community. Players appreciate the fast withdrawals, generous bonus structure, and the variety of game formats available. The app is regularly updated to fix bugs and introduce new features, ensuring a consistently high-quality experience. If you are looking for a reliable rummy app that combines skill-based gameplay with real cash rewards, {app.name} is a solid choice.</p>

          <p className="mt-5 border-t border-slate-100 pt-4 text-[11px] italic leading-relaxed text-slate-400">Disclaimer: This content is for informational purposes only. Playing real-money games involves financial risk. Please read the terms and conditions carefully before participating.</p>
        </div>
      </section>

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
          {[
            ...(app.faqs || []),
            { question: `Is ${app.name} safe to use?`, answer: `Yes, ${app.name} is a verified platform with 256-bit encryption for all transactions. It uses secure payment gateways and follows fair play policies. Always download the app from the official link provided on this page.` },
            { question: `How do I claim the ${app.bonus} bonus on ${app.name}?`, answer: `To claim the ${app.bonus} welcome bonus, click the "Claim Bonus" button on this page, complete your registration via OTP verification, and the bonus will be credited to your in-app wallet instantly. Check the app's terms for wagering requirements.` },
            { question: `What is the minimum withdrawal on ${app.name}?`, answer: `The minimum withdrawal amount on ${app.name} is ${app.minWithdrawal}. Withdrawals are processed through UPI, bank transfer, or digital wallets and typically take 24-48 hours to reflect in your account.` },
            { question: `Can I play ${app.name} on multiple devices?`, answer: `Yes, you can use the same account on multiple Android devices. Simply log in with your registered mobile number and OTP on any device. The app supports seamless sync across devices.` },
            { question: `Does ${app.name} offer free practice games?`, answer: `Yes, ${app.name} offers free practice tables where you can play without depositing real money. This is a great way to learn the rules and improve your skills before playing cash games.` },
          ].map((faq, idx) => {
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
