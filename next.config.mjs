/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      }
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
