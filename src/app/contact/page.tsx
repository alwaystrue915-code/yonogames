import ContactUsRoute, { metadata as originalMetadata } from '../contact-us/page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  ...originalMetadata,
  alternates: {
    canonical: '/contact',
  },
};

export default ContactUsRoute;
