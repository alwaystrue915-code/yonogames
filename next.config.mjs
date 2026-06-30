/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'allrummybonus.com' },
      { protocol: 'https', hostname: 'app.nexapk.in' },
      { protocol: 'https', hostname: '*.wp.com' },
      { protocol: 'https', hostname: '*.wordpress.com' },
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/scrapperv2/allrummybonus_com/wp-content/uploads/:path*',
        destination: 'https://allrummybonus.com/wp-content/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
