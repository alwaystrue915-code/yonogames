import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '../../../lib/db';
import { AppDetailPage } from '../../../components/AppDetailPage';
import { Metadata } from 'next';
import PublicShell from '../../../components/PublicShell';

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

// 1. Dynamic Server-Side Metadata Generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const app = await db.apps.findOne({ slug });
  const settings = await db.settings.get();

  if (!app) {
    return {
      title: 'App Not Found | Yono Games',
      description: 'The requested Rummy or skill app details could not be found.',
    };
  }

  const domain = settings?.siteDomain || 'https://yononewgamess.com';
  const pageUrl = `${domain}/app/${app.slug}`;
  const imageUrl = app.logo.startsWith('http') ? app.logo : `${domain}${app.logo}`;

  const title = app.seoTitle || `${app.name} - Download APK & Play | Yono Games`;
  const description = app.seoDescription || `Download ${app.name} APK. Bonus: ${app.bonus || 'N/A'}, Min Withdrawal: ${app.minWithdrawal || 'N/A'}. Discover key features, FAQs and details.`;
  const userKeywords = app.keywords ? app.keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : [];
  const keywords = [
    ...userKeywords,
    `${app.name} APK`,
    `${app.name} download`,
    `${app.name} bonus`,
    `${app.name} app`,
    `${app.name} review`,
    `${app.name} withdrawal`,
    'Yono games',
    'rummy app',
    'Android APK',
    ...(app.tags || []),
  ];

  return {
    title,
    description,
    keywords,
    applicationName: app.name,
    category: 'Android Games',
    creator: 'Yono Games Editorial Team',
    publisher: 'Yono Games',
    robots: {
      index: app.status === 'active',
      follow: true,
      googleBot: {
        index: app.status === 'active',
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'en-IN': pageUrl,
        'x-default': pageUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'website',
      siteName: settings?.siteName || 'Yono Games',
      locale: 'en_IN',
      images: imageUrl ? [{ url: imageUrl, width: 512, height: 512, alt: `${app.name} Android app icon` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
    other: {
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
    },
  };
}

export default async function AppRoute({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const [app, apps, settings] = await Promise.all([
    db.apps.findOne({ slug }),
    db.apps.find(),
    db.settings.get()
  ]);

  if (!app) {
    notFound();
  }

  // Record page view count in backend analytics database
  try {
    await db.analytics.recordView(slug);
  } catch (err) {
    console.error('Failed to log page view view analytics:', err);
  }

  // Clean objects for client components
  const cleanApp = JSON.parse(JSON.stringify(app));
  const cleanApps = JSON.parse(JSON.stringify(apps));
  const cleanSettings = JSON.parse(JSON.stringify(settings));

  const domain = cleanSettings?.siteDomain || 'https://yononewgamess.com';
  const imageUrl = cleanApp.logo.startsWith('http') ? cleanApp.logo : `${domain}${cleanApp.logo}`;
  const seoDesc = cleanApp.seoDescription || `Download ${cleanApp.name} APK. Bonus: ${cleanApp.bonus || 'N/A'}.`;
  const pageUrl = `${domain}/app/${cleanApp.slug}`;
  const categoryUrl = `${domain}/all-yonoapps`;
  const ratingValue = Math.min(5, Math.max(1, Number(cleanApp.rating) || 4.5));
  const ratingCount = Number(cleanSettings?.ratingCount) || 125;
  const faqItems = [
    ...(cleanApp.faqs || []),
    { question: `Is ${cleanApp.name} safe to use?`, answer: `${cleanApp.name} should only be downloaded from the verified link. Review its permissions, payment terms and local gaming rules before installing.` },
    { question: `How do I claim the ${cleanApp.bonus} bonus?`, answer: `Open the verified ${cleanApp.name} link, register with your mobile number, complete verification and review the current bonus terms shown inside the app.` },
    { question: `What is the minimum withdrawal on ${cleanApp.name}?`, answer: `The listed minimum withdrawal is ${cleanApp.minWithdrawal}. Processing methods and times are controlled by the app and may change.` },
  ];

  // Connected graph helps search and answer engines understand every page entity.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: cleanApp.seoTitle || `${cleanApp.name} APK Download`,
        description: seoDesc,
        inLanguage: 'en-IN',
        isPartOf: { '@id': `${domain}/#website` },
        about: { '@id': `${pageUrl}#software` },
        mainEntity: { '@id': `${pageUrl}#software` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'section p'],
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${pageUrl}#software`,
        name: cleanApp.name,
        url: pageUrl,
        operatingSystem: 'Android',
        applicationCategory: 'GameApplication',
        applicationSubCategory: cleanApp.category || 'Rummy Game',
        image: imageUrl,
        description: seoDesc,
        isAccessibleForFree: true,
        contentRating: '18+',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
          availability: 'https://schema.org/OnlineOnly',
          url: `${domain}/go/${cleanApp.slug}`,
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue,
          ratingCount,
          bestRating: 5,
          worstRating: 1,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: domain },
          { '@type': 'ListItem', position: 2, name: cleanApp.category || 'Rummy Apps', item: categoryUrl },
          { '@type': 'ListItem', position: 3, name: cleanApp.name, item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqItems.map((faq: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'HowTo',
        '@id': `${pageUrl}#install-guide`,
        name: `How to download and install ${cleanApp.name} APK`,
        description: `Three steps to download, install and register on ${cleanApp.name} for Android.`,
        totalTime: 'PT5M',
        tool: [{ '@type': 'HowToTool', name: 'Android smartphone' }],
        step: [
          { '@type': 'HowToStep', position: 1, name: 'Download the APK', text: `Open the verified download link for ${cleanApp.name}.`, url: `${pageUrl}#download` },
          { '@type': 'HowToStep', position: 2, name: 'Allow installation', text: 'Allow installation from the browser when Android requests permission.' },
          { '@type': 'HowToStep', position: 3, name: 'Register and verify', text: 'Open the app, register and complete mobile verification.' },
        ],
      },
    ],
  };

  return (
    <PublicShell>
      {/* Structured data LD-JSON element */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <AppDetailPage
        app={cleanApp}
        apps={cleanApps}
        settings={cleanSettings}
      />
    </PublicShell>
  );
}
