/** @type {import('next').NextConfig} */
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com; img-src 'self' data: blob: https://app.nexapk.in https://cdn.nexapk.in https://allrummybonus.com https://flagcdn.com https://www.google.com; style-src 'self' 'unsafe-inline'; font-src 'self' data:; upgrade-insecure-requests"
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'allrummybonus.com' },
      { protocol: 'https', hostname: 'app.nexapk.in' },
      { protocol: 'https', hostname: 'cdn.nexapk.in' },
    ],
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  async rewrites() {
    return [{
      source: '/scrapperv2/allrummybonus_com/wp-content/uploads/:path*',
      destination: 'https://allrummybonus.com/wp-content/uploads/:path*',
    }];
  },
};

export default nextConfig;
