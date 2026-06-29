import React from 'react';
import { db } from '../lib/db';
import { LandingPageContainer } from '../components/LandingPageContainer';
import PublicShell from '../components/PublicShell';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await db.settings.get();
  const domain = settings?.siteDomain || 'https://yononewgamess.com';
  const title = settings?.siteTitle || 'Yono Games - Download Yono Game APKs & Compare Apps';
  const description = settings?.siteDescription || 'Explore Yono Games and compare Android APK listings, signup bonuses, ratings, minimum withdrawals, app features and installation guides.';
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
      'Yono Games download',
      'Yono rummy apps',
      'Yono app bonus',
      'Android rummy APK',
      'Yono game withdrawal',
      'Yono Games',
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
  const domain = cleanSettings?.siteDomain || 'https://yononewgamess.com';
  const activeApps = cleanApps.filter((app: any) => app.status === 'active');
  const homeFaqs = [
    ['What are Yono Games?', 'Yono Games is a common search term for Android skill-game and rummy applications offering card games, tournaments, signup rewards and withdrawal features. Yono Games independently organizes these app listings for comparison.'],
    ['How can I download a Yono Games APK?', 'Choose an app, review its details and open the verified download link on its listing page. Review Android permissions and publisher information before installing any APK.'],
    ['Which Yono game is best for new users?', 'Compare game formats, minimum withdrawal, bonus terms, ratings and support options. New users should start with free practice modes and should not select an app only because it advertises a large bonus.'],
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
        name: 'Yono Games - APK Directory and App Comparison',
        description: 'Compare Yono Games APK listings, bonuses, ratings, withdrawal details and Android installation guides.',
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${domain}/#website` },
        mainEntity: { '@id': `${domain}/#yono-games-list` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '#choose-yono-app', '#yono-faq'] },
      },
      {
        '@type': 'ItemList',
        '@id': `${domain}/#yono-games-list`,
        name: 'Yono Games APK Directory',
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
    <PublicShell>
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
