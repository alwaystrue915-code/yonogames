"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BadgeCheck,
  ChevronRight,
  HelpCircle,
  Send,
  Star,
} from 'lucide-react';
import { AppCard } from './AppCard';
import { SearchBar } from './SearchBar';
import { AppDetail, Category, Collection, SiteSettings } from '../types';

interface LandingPageProps {
  apps: AppDetail[];
  categories: Category[];
  collections: Collection[];
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  onSelectApp?: (app: AppDetail) => void;
  settings: SiteSettings | null;
}

const homeFaqs = [
  {
    question: 'What is Yono Game?',
    answer: 'Yono Game is a search phrase people use for Android card, rummy and skill-game apps that may include signup rewards, tournaments, wallet features and withdrawal options. This homepage helps visitors compare Yono game APK listings before they open a download link.',
  },
  {
    question: 'What are Yono Games?',
    answer: 'Yono Games is a commonly used search term for multiple Android skill-game and rummy applications. Yono Games independently organizes app names, bonuses, ratings, minimum withdrawals, features and installation guidance so visitors can compare listings before downloading.',
  },
  {
    question: 'How can I download a Yono Game APK?',
    answer: 'Choose a Yono game listing, review its bonus, rating and withdrawal information, then use the download button on its detail page. Android may ask you to allow installation from your browser. Always review permissions, publisher details and local eligibility before installing an APK.',
  },
  {
    question: 'Which Yono game is best for new users?',
    answer: 'There is no single best app for every player. Compare game format, minimum withdrawal, current bonus terms, user rating and support options. New users should begin with free practice modes and avoid choosing an app based only on a large promotional bonus.',
  },
  {
    question: 'Are Yono Games available in every Indian state?',
    answer: 'Real-money gaming rules vary by state and may change. Users must be at least 18 years old and should confirm local eligibility before registering, depositing or joining a paid contest. An app being listed here does not guarantee availability in your location.',
  },
  {
    question: 'Does Yono Games own the listed apps?',
    answer: 'No. Yono Games is an independent discovery and comparison website. It does not own, host or operate the listed games. Account, payment, bonus and withdrawal support must be requested from the respective app operator.',
  },
];

export const LandingPage: React.FC<LandingPageProps> = ({
  apps,
  categories,
  selectedCategory,
  setSelectedCategory,
  onSelectApp,
  settings,
}) => {
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'all'>('trending');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const activeApps = apps.filter((app) => app.status === 'active' && app.isAllApps !== false);

  const topApps = [...activeApps]
    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
    .slice(0, 4);

  let displayedApps = [...activeApps];

  if (selectedCategory) {
    displayedApps = displayedApps.filter((app) => {
      const appCategories = app.categories?.length ? app.categories : [app.category];
      return appCategories.some((category) => category.toLowerCase() === selectedCategory.toLowerCase());
    });
  }

  if (activeTab === 'trending') {
    displayedApps = [...displayedApps].sort((a, b) => (b.priority || 0) - (a.priority || 0));
  } else if (activeTab === 'new') {
    displayedApps = displayedApps.filter((app) => app.isNewPick || app.tags?.some((tag) => /new/i.test(tag)));
  }

  const bannerSlides = [
    settings?.banner1 || '/scrapperv2/allrummybonus_com/wp-content/uploads/2025/12/all-rummy-bonus-banner1.jpg',
    settings?.banner2 || '/scrapperv2/allrummybonus_com/wp-content/uploads/2025/12/all-rummy-bonus-banner2.jpg',
    settings?.banner3 || '/scrapperv2/allrummybonus_com/wp-content/uploads/2025/12/all-rummy-bonus-banner3.jpg',
    settings?.banner4 || '/scrapperv2/allrummybonus_com/wp-content/uploads/2025/12/all-rummy-bonus-banner4.jpg',
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIndex((current) => (current + 1) % bannerSlides.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [bannerSlides.length]);

  return (
    <div className="space-y-9 pb-12">
      <div className="space-y-3">
        <section className="relative aspect-[16/7] min-h-[180px] overflow-hidden rounded-lg bg-slate-100 sm:min-h-[260px] lg:min-h-[350px]">
          {bannerSlides.map((image, index) => (
            <img
              key={image}
              src={image}
              alt={index === 0 ? 'Popular Yono Games and Android rummy apps' : ''}
              aria-hidden={index !== slideIndex}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${index === slideIndex ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </section>
        <div className="flex items-center justify-center gap-2" aria-label="Carousel indicators">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSlideIndex(index)}
              aria-label={`Show banner ${index + 1}`}
              aria-current={index === slideIndex}
              className={`h-2.5 rounded-full border-0 p-0 transition-all ${index === slideIndex ? 'w-8 bg-[#2C3EFE]' : 'w-2.5 bg-slate-300 hover:bg-slate-400'}`}
            />
          ))}
        </div>
      </div>

      <section className="space-y-3" aria-labelledby="home-search-title">
        <div className="space-y-3">
          <div>
            <h1 id="home-search-title" className="text-xl font-bold text-slate-900 sm:text-3xl whitespace-nowrap truncate">Yono Games - Yono Game APK Directory</h1>
            <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">Search and compare Yono game and Yono Games APK listings, bonuses, ratings, minimum withdrawals and safe download details.</p>
          </div>
          <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-stretch">
            <div className="min-w-0">
              <SearchBar onSelectApp={onSelectApp} apps={activeApps} />
            </div>
            <div className="grid grid-cols-3 gap-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              {[
                { value: `${activeApps.length}+`, label: 'Active apps', color: 'bg-blue-50 text-blue-700', border: 'border-blue-200' },
                { value: settings?.userRating || '4.8', label: 'Avg rating', color: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-200' },
                { value: topApps[0]?.bonus || 'Updated', label: 'Top bonus', color: 'bg-amber-50 text-amber-700', border: 'border-amber-200' },
              ].map(({ value, label, color, border }, i) => (
                <div key={label} className={`flex min-h-[60px] flex-col justify-center px-2 py-2 text-center border-r last:border-r-0 ${border} ${i > 0 ? 'border-l-0' : ''}`}>
                  <strong className={`block text-sm font-black leading-none sm:text-base rounded-full px-2 py-0.5 inline-block mx-auto ${color}`}>{value}</strong>
                  <span className="mt-1.5 block text-[8px] font-black uppercase leading-tight text-slate-500 sm:text-[9px]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="top-yono-games">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-black uppercase text-[#2C3EFE]">Editor shortlist</span>
            <h2 id="top-yono-games" className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">Top Yono Game Picks</h2>
            <p className="mt-1 text-xs font-semibold text-slate-500">Popular Yono Games listings ranked by current priority, app information and comparison value.</p>
          </div>
          <Link href="/all-yonoapps" className="inline-flex shrink-0 items-center gap-1 text-xs font-black text-[#2C3EFE] no-underline">View all <ChevronRight size={15} /></Link>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {topApps.map((app, index) => (
            <AppCard key={app.slug} app={app} variant="medium" rank={index + 1} onSelect={onSelectApp} cardStyle={settings?.cardStyle || 'default'} />
          ))}
        </div>
      </section>

      <section aria-labelledby="all-yono-games" className="border-y border-slate-200 py-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-[#2C3EFE]">Browse and compare</span>
            <h2 id="all-yono-games" className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">Yono Game and Yono Games APK Directory</h2>
            <p className="mt-1 max-w-2xl text-xs font-semibold leading-5 text-slate-500">Filter current Yono apps by category, then open any listing for bonus terms, minimum withdrawal, features, FAQs, safety notes and installation steps.</p>
          </div>
          <div className="inline-flex w-full rounded-lg bg-slate-100 p-1 sm:w-auto" aria-label="App listing view">
            {[
              { id: 'trending', label: 'Trending' },
              { id: 'new', label: 'New' },
              { id: 'all', label: 'All Apps' },
            ].map((tab) => (
              <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id as typeof activeTab)} className={`flex-1 rounded-md border-0 px-4 py-2 text-[11px] font-black transition-colors sm:flex-none ${activeTab === tab.id ? 'bg-white text-[#2C3EFE] shadow-sm' : 'bg-transparent text-slate-500 hover:text-slate-900'}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button type="button" onClick={() => setSelectedCategory(null)} className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-black transition-all ${!selectedCategory ? 'border-[#2C3EFE] bg-[#2C3EFE] text-white shadow-md' : 'border-slate-200 bg-white text-slate-600 hover:border-[#2C3EFE] hover:text-[#2C3EFE]'}`}>All categories</button>
          {categories.map((category, idx) => {
            const colors = ['#2C3EFE', '#34C759', '#FF6B35', '#AF52DE', '#FF2D55', '#5856D6', '#00C7BE', '#FF9500'];
            const color = colors[idx % colors.length];
            return (
              <button key={category.slug} type="button" onClick={() => setSelectedCategory(selectedCategory === category.slug ? null : category.slug)} className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-black transition-all ${selectedCategory === category.slug ? 'text-white shadow-md' : 'bg-white text-slate-600 hover:text-white'}`} style={selectedCategory === category.slug ? { backgroundColor: color, borderColor: color } : { borderColor: color, color: color }}>
                {category.name}
              </button>
            );
          })}
        </div>

        {displayedApps.length ? (
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayedApps.map((app, index) => (
              <AppCard key={app.slug} app={app} variant="medium" rank={activeTab === 'trending' ? index + 1 : undefined} onSelect={onSelectApp} cardStyle={settings?.cardStyle || 'default'} />
            ))}
          </div>
        ) : (
          <div className="mt-4 border border-dashed border-slate-300 py-12 text-center text-xs font-bold text-slate-500">No Yono games match this filter.</div>
        )}
      </section>

      <section className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-start" aria-labelledby="choose-yono-app">
        <article>
          <span className="text-[10px] font-black uppercase text-[#2C3EFE]">Practical comparison guide</span>
          <h2 id="choose-yono-app" className="mt-1 text-xl font-extrabold text-slate-900 sm:text-2xl">How to Compare Yono Game Apps</h2>
          <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
            A large welcome offer does not automatically make a Yono game suitable for you. Start by checking the available game modes, minimum withdrawal, payment methods, customer support, bonus conditions and update status. Read the individual app page before downloading and confirm that the operator supports your location.
          </p>
          <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
            APK files are installed outside the Google Play flow, so Android may request permission to install from your browser. Verify the app name and icon, review requested permissions and keep your phone security features enabled. Yono Games provides research and outgoing links but does not operate user accounts, process deposits or approve withdrawals.
          </p>
          <p className="mt-3 text-sm font-medium leading-7 text-slate-600">
            For answer engines and search visitors, the short answer is simple: Yono Games is a comparison directory, while each Yono game listing belongs to a third-party app operator. Use this page to compare app details, then verify final terms inside the official destination before registering or playing.
          </p>
        </article>

        <aside className="border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex items-start gap-3 border-b border-slate-200 pb-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2C3EFE] text-white"><BadgeCheck size={19} /></div>
            <div>
              <span className="text-[10px] font-black uppercase text-[#2C3EFE]">Verified overview</span>
              <h2 className="mt-1 text-lg font-extrabold text-slate-900">Yono Games at a glance</h2>
              <p className="mt-1 text-xs font-semibold leading-5 text-slate-500">Quick trust signals for listings, community and offer updates.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 divide-x divide-y divide-slate-200 border-b border-slate-200 sm:grid-cols-4 lg:grid-cols-2">
            {[
              [settings?.verifiedApps || `${activeApps.length}+`, 'App listings'],
              [settings?.userRating || '4.8', 'User rating'],
              [settings?.telegramSubscribers || '32K+', 'Community'],
              [settings?.dailyPayouts || 'Updated', 'Offer data'],
            ].map(([value, label]) => (
              <div key={label} className="p-4">
                <strong className="block text-xl font-black text-slate-900">{value}</strong>
                <span className="mt-1 block text-[9px] font-bold uppercase text-slate-500">{label}</span>
              </div>
            ))}
          </div>
          {(() => {
            const tgColor = settings?.backgroundType === 'money-rain' ? 'bg-[#065f46] hover:bg-[#047857]' :
              settings?.backgroundType === 'royal-gold' ? 'bg-[#B45309] hover:bg-[#92400e]' :
              settings?.backgroundType === 'dark-luxury-coin' ? 'bg-[#001f54] hover:bg-[#001a45]' :
              settings?.backgroundType === 'card-suit-green' ? 'bg-[#022c22] hover:bg-[#011a15]' :
              'bg-[#2C3EFE] hover:bg-[#2230d6]';
            return (
              <a href={settings?.telegramLink || 'https://telegram.me/aaron7512'} target="_blank" rel="noreferrer noopener nofollow" className={`mt-4 flex h-11 items-center justify-center gap-2 rounded-lg ${tgColor} text-xs font-black text-white no-underline`}>
                <Send size={15} /> Join official Telegram
              </a>
            );
          })()}
        </aside>
      </section>

      <section aria-labelledby="yono-faq" className="border-t border-slate-200 pt-7">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#2C3EFE]"><HelpCircle size={19} /></div>
          <div><span className="text-[10px] font-black uppercase text-slate-400">Quick answers</span>          <h2 id="yono-faq" className="text-xl font-extrabold text-slate-900">Yono Games FAQ</h2></div>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {homeFaqs.map((faq, index) => (
            <div key={faq.question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 border-0 bg-white py-4 text-left text-sm font-black text-slate-800 hover:text-[#2C3EFE]">
                <span>{faq.question}</span><span className="text-lg text-slate-400">{openFaq === index ? '−' : '+'}</span>
              </button>
              {openFaq === index && <p className="max-w-4xl pb-5 text-sm font-medium leading-7 text-slate-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-1 text-amber-500">{[1, 2, 3, 4, 5].map((item) => <Star key={item} size={15} fill="currentColor" />)}</div>
          <p className="mt-2 text-sm font-black text-slate-900">Research before you download</p>
          <p className="mt-1 text-xs font-semibold text-slate-500">Browse all app listings, guides and independent comparisons.</p>
        </div>
        <Link href="/all-yonoapps" className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2C3EFE] px-5 text-xs font-black text-white no-underline hover:bg-[#2230d6]">Explore all Yono apps <ChevronRight size={15} /></Link>
      </section>
    </div>
  );
};

export default LandingPage;
