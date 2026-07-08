import React from 'react';
import { db } from '../../lib/db';
import { AllYonoAppsPage } from '../../components/AllYonoAppsPage';
import { Metadata } from 'next';
import PublicShell from '../../components/PublicShell';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'All Yono Apps Download 2026 - Yono Games APK List, Bonus & Reviews',
  description: 'Explore all Yono apps in one searchable directory. Compare Yono Games APK bonus, ratings, categories, minimum withdrawal, download guides and India eligibility notes.',
  keywords: [
    'all yono apps',
    'yono games',
    'yono app download',
    'yono apk',
    'yono games apk',
    'all yono games',
    'new yono app',
    'yono rummy app',
    'best yono apps India',
    'yono bonus app',
  ],
  alternates: {
    canonical: '/all-yonoapps',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'All Yono Apps - Search Yono Games APK, Bonus & Reviews',
    description: 'Filter and compare active Yono app APK listings by bonus, rating, category and download information.',
    url: '/all-yonoapps',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Yono Apps - Yono Games APK Directory',
    description: 'Search and compare Yono Games APK listings, bonus offers, ratings and safety notes.',
  },
};

export default async function AllYonoAppsRoute() {
  // Server-side fetching
  const [apps, categories, settings] = await Promise.all([
    db.apps.find(),
    db.categories.find(),
    db.settings.get()
  ]);

  // Clean data for client (remove MongoDB Mongo ObjectID instances)
  const cleanApps = JSON.parse(JSON.stringify(apps));
  const cleanCategories = JSON.parse(JSON.stringify(categories));
  const cleanSettings = JSON.parse(JSON.stringify(settings));
  const domain = cleanSettings?.siteDomain || process.env.NEXT_PUBLIC_SITE_URL || 'https://yononewgamess.com';
  const activeApps = cleanApps.filter((app: any) => app.status === 'active' && app.isAllApps !== false);
  const topApps = [...activeApps]
    .sort((a: any, b: any) => (b.priority || 0) - (a.priority || 0))
    .slice(0, 20);
  const pageUrl = `${domain}/all-yonoapps`;
  const faqItems = [
    {
      question: 'What is the All Yono Apps page?',
      answer: 'The All Yono Apps page is a searchable directory where users can compare active Yono Games APK listings by name, category, bonus, rating and download information.',
    },
    {
      question: 'Can I filter Yono apps by category?',
      answer: 'Yes. The page includes category chips, quick filters, search and sorting controls so users can find rummy, card game and bonus-focused Yono apps faster.',
    },
    {
      question: 'Are Yono Games legal in every Indian state?',
      answer: 'Real-money gaming rules can vary by Indian state and may change. Users should confirm local eligibility and be at least 18 years old before using paid features.',
    },
    {
      question: 'Which Yono app gives the best bonus?',
      answer: 'The best bonus changes by app and offer period. Users can sort by highest bonus, then review eligibility, bonus terms and withdrawal rules on the app detail page.',
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
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${pageUrl}#collection`,
        url: pageUrl,
        name: 'All Yono Apps',
        headline: 'All Yono Apps Download and Yono Games APK Directory',
        description: 'Search and compare Yono Games APK listings by bonus, rating, category, minimum withdrawal and download guidance.',
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${domain}/#website` },
        about: ['Yono Games', 'Yono APK', 'Android game apps', 'Rummy apps India'],
        audience: {
          '@type': 'Audience',
          audienceType: 'Adults in India researching Android skill-game apps',
          geographicArea: { '@type': 'Country', name: 'India' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: domain },
          { '@type': 'ListItem', position: 2, name: 'All Yono Apps', item: pageUrl },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${pageUrl}#itemlist`,
        name: 'Yono Games APK List',
        itemListOrder: 'https://schema.org/ItemListOrderDescending',
        numberOfItems: topApps.length,
        itemListElement: topApps.map((app: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${domain}/app/${app.slug}`,
          item: {
            '@type': 'SoftwareApplication',
            name: app.name,
            applicationCategory: 'GameApplication',
            operatingSystem: 'Android',
            url: `${domain}/app/${app.slug}`,
            aggregateRating: app.rating ? {
              '@type': 'AggregateRating',
              ratingValue: app.rating,
              ratingCount: cleanSettings?.ratingCount || 12842,
            } : undefined,
            offers: app.bonus ? {
              '@type': 'Offer',
              description: app.bonus,
              availability: 'https://schema.org/OnlineOnly',
            } : undefined,
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <PublicShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <AllYonoAppsPage
        apps={cleanApps}
        categories={cleanCategories}
        cardStyle={cleanSettings?.cardStyle || 'default'}
      />
    </PublicShell>
  );
}
