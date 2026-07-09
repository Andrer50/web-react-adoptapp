import type { NextConfig } from 'next';

const backendUrl = process.env.BACKEND_URL;
let backendHost = '';
let backendPort = '';

if (backendUrl) {
  try {
    const urlObj = new URL(backendUrl);
    backendHost = urlObj.hostname;
    backendPort = urlObj.port;
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
              port: backendPort || undefined,
              pathname: '/media/**',
            },
            {
              protocol: 'http' as const,
              hostname: backendHost,
              port: backendPort || undefined,
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
      {
        source: '/media/:path*',
        destination: `${process.env.BACKEND_URL || 'http://localhost:8000'}/media/:path*`,
      },
    ];
  },
};

export default nextConfig;

