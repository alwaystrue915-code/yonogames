import React from 'react';
import ContactPage from '../../components/ContactPage';
import PublicShell from '../../components/PublicShell';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Yono Games - Rummy APK Listing Support',
  description: 'Contact Yono Games for rummy APK listing updates, advertising, partnership queries, app information corrections, and business support related to Yono games.',
  keywords: ['contact Yono Games', 'rummy APK listing', 'Yono games support', 'APK advertising', 'gaming app partnership'],
  alternates: {
    canonical: '/contact-us',
  },
};

const contactFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can Yono Games fix my withdrawal or deposit issue?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Withdrawal, deposit, KYC, login, gameplay, and account issues must be handled by the official support team of the third-party app where the issue happened.'
      }
    },
    {
      '@type': 'Question',
      name: 'How can I report wrong app information?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Send the app name, page URL, incorrect detail, and an official source that proves the correct information. This helps us review and update the listing more accurately.'
      }
    },
    {
      '@type': 'Question',
      name: 'Can app owners request listing changes?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. App owners or representatives can contact us for corrections, brand asset updates, category changes, and business inquiries, but the request should be transparent and verifiable.'
      }
    }
  ]
};

export default function ContactUsRoute() {
  return (
    <PublicShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqJsonLd) }}
      />
      <ContactPage />
    </PublicShell>
  );
}
