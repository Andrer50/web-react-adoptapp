import type { NextConfig } from 'next';

const backendUrl = process.env.BACKEND_URL;
let backendHost = '';

if (backendUrl) {
  try {
    backendHost = new URL(backendUrl).hostname;
  } catch (e) {
    // fallback
  }
}

const nextConfig: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      ...(backendHost
        ? [
            {
              protocol: 'https' as const,
              hostname: backendHost,
              pathname: '/media/**',
            },
            {
              protocol: 'http' as const,
              hostname: backendHost,
              pathname: '/media/**',
            },
          ]
        : []),
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path((?!auth/).*)',
        destination: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
