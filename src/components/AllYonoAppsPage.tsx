"use client";

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { AppDetail, Category } from '../types';
import { AppCard } from './AppCard';
import { BadgeCheck, ChevronRight, Filter, HelpCircle, Search, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface AllYonoAppsPageProps {
  apps: AppDetail[];
  categories: Category[];
  onSelectApp?: (app: AppDetail) => void;
  cardStyle?: string;
}

const directoryFaqs = [
  {
    question: 'How do I find the best Yono game APK?',
    answer: 'Use search, category filters and sorting to compare bonus value, rating, minimum withdrawal, tags and app details before opening the app page.',
  },
  {
    question: 'Are all Yono apps available everywhere in India?',
    answer: 'Availability can depend on state rules, operator policy and age eligibility. Users should confirm local rules before joining paid contests or depositing money.',
  },
  {
    question: 'What should I check before downloading a Yono APK?',
    answer: 'Check the app name, logo, bonus terms, permissions, withdrawal information, support options and responsible play notes on the detail page.',
  },
  {
    question: 'Which Yono app gives the best bonus?',
    answer: 'The best bonus changes by app and offer period. Use the highest bonus sort option, then open the app page to check eligibility, wagering terms and withdrawal rules.',
  },
  {
    question: 'Is Yono Games an official game operator?',
    answer: 'No. Yono Games is an independent information and comparison platform. It helps users research Yono apps but does not operate games, deposits, withdrawals or accounts.',
  },
  {
    question: 'How often are Yono app listings updated?',
    answer: 'Listings are reviewed regularly for app details, bonus information, rating signals and download guidance so users can compare current Yono APK options more easily.',
  },
];

const getNumber = (value?: string | number) => {
  if (typeof value === 'number') return value;
  return Number(String(value || '').replace(/[^0-9.]/g, '')) || 0;
};

export const AllYonoAppsPage: React.FC<AllYonoAppsPageProps> = ({
  apps,
  categories,
  onSelectApp,
  cardStyle = 'default',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'bonus' | 'name'>('rating');
  const [quickFilter, setQuickFilter] = useState<'all' | 'new' | 'top'>('all');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const activeApps = useMemo(
    () => apps.filter((app) => app.status === 'active' && app.isAllApps !== false),
    [apps]
  );

  const filteredList = useMemo(() => {
    let list = [...activeApps];
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      list = list.filter((app) => {
        const haystack = [
          app.name,
          app.category,
          app.bonus,
          app.minWithdrawal,
          app.description,
          ...(app.tags || []),
          ...(app.features || []),
          ...(app.categories || []),
        ].join(' ').toLowerCase();
        return haystack.includes(query);
      });
    }

    if (selectedCategory) {
      list = list.filter((app) => {
        const appCategories = app.categories?.length ? app.categories : [app.category];
        return appCategories.some((category) => category.toLowerCase() === selectedCategory.toLowerCase());
      });
    }

    if (quickFilter === 'new') {
      list = list.filter((app) => app.isNewPick || app.tags?.some((tag) => /new|latest/i.test(tag)));
    }
    if (quickFilter === 'top') {
      list = list.filter((app) => (app.rating || 0) >= 4.5);
    }

    if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0) || a.name.localeCompare(b.name));
    } else if (sortBy === 'bonus') {
      list.sort((a, b) => getNumber(b.bonus) - getNumber(a.bonus) || a.name.localeCompare(b.name));
    } else {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [activeApps, quickFilter, searchQuery, selectedCategory, sortBy]);

  const avgRating = activeApps.length
    ? (activeApps.reduce((sum, app) => sum + (app.rating || 0), 0) / activeApps.length).toFixed(1)
    : '4.8';

  return (
    <div className="space-y-8 pb-12">
      <section className="border-b border-slate-200 pb-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="text-[10px] font-black uppercase text-[#2C3EFE]">Yono games directory India</span>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl">All Yono Apps</h1>
            <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
              Search verified Yono game APK listings, compare welcome bonus, rating, withdrawal details and categories, then open any app page for download guidance and safety notes.
            </p>
          </div>
          <div className="grid w-full grid-cols-3 gap-0 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:w-auto">
            {[
              { value: `${activeApps.length}+`, label: 'Apps', color: 'bg-blue-50 text-blue-700', border: 'border-blue-200' },
              { value: avgRating, label: 'Avg rating', color: 'bg-emerald-50 text-emerald-700', border: 'border-emerald-200' },
              { value: `${categories.length}+`, label: 'Categories', color: 'bg-amber-50 text-amber-700', border: 'border-amber-200' },
            ].map(({ value, label, color, border }) => (
              <div key={label} className={`px-2 py-3 text-center sm:px-4 border-r last:border-r-0 ${border}`}>
                <strong className={`block text-base font-black sm:text-lg rounded-full px-2 py-0.5 inline-block mx-auto ${color}`}>{value}</strong>
                <span className="mt-1.5 block text-[9px] font-black uppercase text-slate-500">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-3 bg-slate-50 p-3 sm:p-4 lg:grid-cols-[1fr_auto_auto] lg:items-center">
          <div className="relative">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search Yono apps, bonus, rummy..."
              className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm font-bold text-slate-900 outline-none transition focus:border-[#2C3EFE] focus:ring-2 focus:ring-[#2C3EFE]/10"
            />
          </div>

          <div className="flex overflow-x-auto rounded-lg bg-white p-1" aria-label="Quick filter">
            {[
              { id: 'all', label: 'All' },
              { id: 'new', label: 'New' },
              { id: 'top', label: 'Top Rated' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setQuickFilter(item.id as typeof quickFilter)}
                className={`h-10 flex-1 shrink-0 rounded-md border-0 px-3 text-[11px] font-black sm:flex-none ${quickFilter === item.id ? 'bg-[#2C3EFE] text-white' : 'bg-transparent text-slate-600 hover:text-slate-950'}`}
              >
                {item.label}
              </button>
            ))}
          </div>

        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-thin" aria-label="Category filters">
          <button type="button" onClick={() => setSelectedCategory(null)}
            className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-black transition-all ${selectedCategory === null ? 'border-[#2C3EFE] bg-[#2C3EFE] text-white shadow-md' : 'border-slate-200 bg-white text-slate-600 hover:border-[#2C3EFE] hover:text-[#2C3EFE]'}`}>All</button>
          {categories.map((cat, idx) => {
            const colors = ['#2C3EFE', '#34C759', '#FF6B35', '#AF52DE', '#FF2D55', '#5856D6', '#00C7BE', '#FF9500'];
            const color = colors[idx % colors.length];
            return (
              <button key={cat.slug} type="button" onClick={() => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-black transition-all ${selectedCategory === cat.slug ? 'text-white shadow-md' : 'bg-white text-slate-600 hover:text-white'}`}
                style={selectedCategory === cat.slug ? { backgroundColor: color, borderColor: color } : { borderColor: color, color: color }}>{cat.name}</button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="all-yono-results">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="all-yono-results" className="text-xl font-extrabold text-slate-950">Yono APK Listings</h2>
            <p className="mt-1 text-xs font-bold text-slate-500">{filteredList.length} active apps found for your current search.</p>
          </div>
          {(searchQuery || selectedCategory || quickFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory(null);
                setQuickFilter('all');
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 hover:border-slate-300"
            >
              <Filter size={14} /> Clear filters
            </button>
          )}
        </div>

        {filteredList.length > 0 ? (
          <motion.div
            key={`${sortBy}-${quickFilter}-${selectedCategory || 'all'}-${searchQuery}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredList.map((app, index) => (
              <AppCard
                key={app.slug}
                app={app}
                rank={undefined}
                onSelect={onSelectApp}
                cardStyle={cardStyle}
              />
            ))}
          </motion.div>
        ) : (
          <div className="border border-dashed border-slate-300 bg-white px-4 py-14 text-center">
            <Search size={26} className="mx-auto text-slate-300" />
            <p className="mt-3 text-sm font-black text-slate-700">No matching Yono apps found</p>
            <p className="mt-1 text-xs font-semibold text-slate-500">Try another keyword, category or sorting option.</p>
          </div>
        )}
      </section>

      <section className="grid gap-4 lg:grid-cols-3" aria-label="Yono app comparison guidance">
        {[
          { icon: BadgeCheck, title: 'User ka fayda', text: 'Search, filter aur sort se user jaldi best Yono app compare kar sakta hai without time waste.' },
          { icon: Star, title: 'Hamari platform best kyu hai', text: 'Har listing me bonus, rating, withdrawal, category aur guide ek jagah milta hai, isliye decision simple hota hai.' },
          { icon: ShieldCheck, title: 'Trust aur safety focus', text: 'App pages me eligibility, permissions, support aur responsible play notes add hain taaki download se pehle clear info mile.' },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="border border-slate-200 bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#2C3EFE]"><Icon size={19} /></div>
            <h2 className="mt-3 text-base font-extrabold text-slate-950">{title}</h2>
            <p className="mt-2 text-sm font-medium leading-6 text-slate-600">{text}</p>
          </div>
        ))}
      </section>

      <section className="border-t border-slate-200 pt-7" aria-labelledby="all-yono-seo-guide">
        <span className="text-[10px] font-black uppercase text-[#2C3EFE]">Yono games guide</span>
        <h2 id="all-yono-seo-guide" className="mt-1 text-2xl font-extrabold text-slate-950">Find Yono Games by Bonus, Rating and Category</h2>
        <div className="mt-3 grid gap-4 text-sm font-medium leading-7 text-slate-600 lg:grid-cols-2">
          <p>
            This All Yono Apps directory helps users discover Android APK listings for rummy, card games and casual game formats in one searchable page. Filters make it easier to compare categories, popular picks, new listings and bonus-focused apps without opening every page manually.
          </p>
          <p>
            Every listing links to a dedicated app page with structured details, FAQs, download guidance and safety notes. Yono Games is an independent comparison website and does not operate the games, process payments or manage user accounts.
          </p>
        </div>
      </section>

      <section aria-labelledby="all-yono-faq" className="border-t border-slate-200 pt-7">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-[#2C3EFE]"><HelpCircle size={19} /></div>
          <div>
            <span className="text-[10px] font-black uppercase text-slate-400">FAQ</span>
            <h2 id="all-yono-faq" className="text-xl font-extrabold text-slate-950">All Yono Apps FAQ</h2>
          </div>
        </div>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {directoryFaqs.map((faq, index) => (
            <div key={faq.question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 border-0 bg-white py-4 text-left text-sm font-black text-slate-800 hover:text-[#2C3EFE]">
                <span>{faq.question}</span>
                <span className="text-lg text-slate-400">{openFaq === index ? '-' : '+'}</span>
              </button>
              {openFaq === index && <p className="max-w-4xl pb-5 text-sm font-medium leading-7 text-slate-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
        <Link href="/" className="mt-5 inline-flex items-center gap-1 text-xs font-black text-[#2C3EFE] no-underline">Back to Yono Games homepage <ChevronRight size={15} /></Link>
      </section>
    </div>
  );
};

export default AllYonoAppsPage;
