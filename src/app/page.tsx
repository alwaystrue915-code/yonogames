import React from 'react';
import { db } from '../lib/db';
import { LandingPageContainer } from '../components/LandingPageContainer';
import PublicShell from '../components/PublicShell';
import { Metadata } from 'next';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await db.settings.get();
  const domain = settings?.siteDomain || 'https://yonogamelive.app';
  const title = settings?.siteTitle || 'Yono Games - Yono Game APK Download, Bonus & App Comparison';
  const description = settings?.siteDescription || 'Find Yono game and Yono Games APK listings in one India-focused directory. Compare bonuses, ratings, minimum withdrawals, app features, safety notes and download guides.';
  const image = settings?.banner1
    ? (settings.banner1.startsWith('http') ? settings.banner1 : `${domain}${settings.banner1}`)
    : `${domain}/scrapperv2/allrummybonus_com/wp-content/uploads/2025/12/all-rummy-bonus-banner1.jpg`;

  return {
    title,
    description,
    keywords: [
      'Yono Games',
      'Yono Game',
      'Yono Games APK',
      'Yono Game APK',
      'Yono game download',
      'Yono Games download',
      'Yono games download',
      'Yono game app',
      'Yono games app',
      'best Yono game',
      'best Yono games',
      'Yono rummy apps',
      'Yono app bonus',
      'Android rummy APK',
      'Yono game withdrawal',
      'Yono Games India',
    ],
    alternates: {
      canonical: domain,
      languages: { 'en-IN': domain, 'x-default': domain },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: domain,
      siteName: settings?.siteName || 'Yono Games',
      locale: 'en_IN',
      images: [{ url: image, alt: 'Yono Games app discovery and comparison directory' }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function HomeRoute() {
  const [apps, categories, collections, settings] = await Promise.all([
    db.apps.find(),
    db.categories.find(),
    db.collections.find(),
    db.settings.get()
  ]);

  // Clean data for client components
  const cleanApps = JSON.parse(JSON.stringify(apps));
  const cleanCategories = JSON.parse(JSON.stringify(categories));
  const cleanCollections = JSON.parse(JSON.stringify(collections));
  const cleanSettings = JSON.parse(JSON.stringify(settings));
  const domain = cleanSettings?.siteDomain || 'https://yonogamelive.app';
  const image = cleanSettings?.banner1
    ? (cleanSettings.banner1.startsWith('http') ? cleanSettings.banner1 : `${domain}${cleanSettings.banner1}`)
    : `${domain}/scrapperv2/allrummybonus_com/wp-content/uploads/2025/12/all-rummy-bonus-banner1.jpg`;
  const activeApps = cleanApps.filter((app: any) => app.status === 'active');
  const homeFaqs = [
    ['What is Yono Game?', 'Yono Game is a search term people use for Android card, rummy and skill-game apps with signup rewards, tournaments, wallet features and withdrawal options. This homepage helps users compare those Yono game listings before opening any download link.'],
    ['What are Yono Games?', 'Yono Games refers to a group of Android skill-game and rummy app listings. Yono Games independently organizes app names, bonuses, ratings, minimum withdrawals, features and installation guidance for comparison.'],
    ['How can I download a Yono Game APK?', 'Choose a Yono game listing, review its details, then open the download link on the app page. Check Android permissions, publisher information, bonus rules and local eligibility before installing any APK.'],
    ['Which Yono game is best for new users?', 'Compare game formats, minimum withdrawal, bonus terms, ratings, support options and practice modes. New users should not select a Yono game only because it advertises a large bonus.'],
    ['Are Yono Games available in every Indian state?', 'Real-money gaming rules vary by state. Users must be at least 18 years old and should confirm local eligibility before registering, depositing or joining a paid contest.'],
    ['Does Yono Games own the listed apps?', 'No. Yono Games is an independent discovery website and does not own, host or operate the listed games.'],
  ];
  const homeJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['CollectionPage', 'WebPage'],
        '@id': `${domain}/#webpage`,
        url: domain,
        name: 'Yono Games - Yono Game APK Directory and App Comparison',
        headline: 'Yono Games and Yono Game APK Download Directory',
        description: 'Compare Yono game and Yono Games APK listings, bonuses, ratings, withdrawal details, safety notes and Android installation guides.',
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${domain}/#website` },
        mainEntity: { '@id': `${domain}/#yono-games-list` },
        about: ['Yono Game', 'Yono Games', 'Yono Games APK', 'Android rummy apps', 'Skill game apps India'],
        audience: {
          '@type': 'Audience',
          audienceType: 'Adults in India researching Yono game APK and Yono Games app listings',
          geographicArea: { '@type': 'Country', name: 'India' },
        },
        primaryImageOfPage: { '@type': 'ImageObject', url: image },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '#choose-yono-app', '#yono-faq'] },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${domain}/#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Yono Games Home', item: domain },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${domain}/#yono-games-list`,
        name: 'Yono Game and Yono Games APK Directory',
        description: 'Ranked Yono game listings with bonus, rating, Android APK and comparison details.',
        numberOfItems: activeApps.length,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: activeApps.slice(0, 30).map((app: any, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${domain}/app/${app.slug}`,
          name: app.name,
          item: {
            '@type': 'SoftwareApplication',
            '@id': `${domain}/app/${app.slug}#software`,
            name: app.name,
            operatingSystem: 'Android',
            applicationCategory: 'GameApplication',
          },
        })),
      },
      {
        '@type': 'FAQPage',
        '@id': `${domain}/#faq`,
        mainEntity: homeFaqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };

  return (
    <PublicShell initialSettings={cleanSettings} initialTopApp={activeApps[0] || null}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <LandingPageContainer
        apps={cleanApps}
        categories={cleanCategories}
        collections={cleanCollections}
        settings={cleanSettings}
      />
    </PublicShell>
  );
}
