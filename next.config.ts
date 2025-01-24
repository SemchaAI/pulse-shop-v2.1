import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_BASE_ADDRESS!,
        // port: process.env.NEXT_PUBLIC_BASE_PORT || '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_BASE_ADDRESS3!,
        pathname: '**',
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
