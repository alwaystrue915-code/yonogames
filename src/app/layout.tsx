import './globals.css';
import React from 'react';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import { CompareProvider } from '../context/CompareContext';
import { Nunito } from 'next/font/google';
import type { Metadata, Viewport } from 'next';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yononewgamess.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Yono Games - Yono Game APK Directory and App Guides',
    template: '%s | Yono Games',
  },
  description: 'Discover, compare and research Yono game and Yono Games APK listings, rummy apps, signup bonuses, withdrawal details and Android installation guides.',
  applicationName: 'Yono Games',
  category: 'Games',
  referrer: 'origin-when-cross-origin',
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
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'light',
};

const sitePages = [
  { name: 'Home', url: '/' },
  { name: 'All Yono Apps', url: '/all-yonoapps' },
  { name: 'About Us', url: '/about-us' },
  { name: 'Contact Us', url: '/contact-us' },
  { name: 'Privacy Policy', url: '/privacy-policy' },
];

const siteGraphJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      name: 'Yono Games',
      alternateName: ['Yono Game', 'Yono Games APK', 'Yono Game APK Directory'],
      url: siteUrl,
      description: 'Yono Games helps users discover, compare, and research Yono game APK listings, Yono Games apps, rummy APK listings, bonuses, withdrawal details, and official app links.',
      inLanguage: 'en-IN',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/all-yonoapps?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      },
      hasPart: sitePages.map((page) => ({
        '@id': `${siteUrl}${page.url}#webpage`
      }))
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Yono Games',
      alternateName: ['Yono Game', 'Yono Games APK'],
      url: siteUrl,
      sameAs: ['https://telegram.me/aaron7512']
    },
    {
      '@type': 'ItemList',
      '@id': `${siteUrl}/#site-navigation`,
      name: 'Yono Games main pages',
      itemListElement: sitePages.map((page, index) => ({
        '@type': 'SiteNavigationElement',
        position: index + 1,
        name: page.name,
        url: `${siteUrl}${page.url}`
      }))
    },
    ...sitePages.map((page) => ({
      '@type': 'WebPage',
      '@id': `${siteUrl}${page.url}#webpage`,
      name: page.name,
      url: `${siteUrl}${page.url}`,
      isPartOf: {
        '@id': `${siteUrl}/#website`
      },
      about: {
        '@id': `${siteUrl}/#organization`
      }
    }))
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN" className={nunito.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraphJsonLd) }}
        />
        <AdminAuthProvider>
          <CompareProvider>
            {children}
          </CompareProvider>
        </AdminAuthProvider>
      </body>
    </html>
  );
}
