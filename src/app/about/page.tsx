import AboutPage, { metadata as originalMetadata } from '../about-us/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: '/about',
  },
};

export default AboutPage;
