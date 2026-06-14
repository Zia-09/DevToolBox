/** @type {import('next').NextConfig} */

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://plausible.io",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://www.google-analytics.com https://plausible.io",
      "frame-src 'none'",
    ].join('; '),
  },
];

const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  async redirects() {
    return [
      {
        source: '/json-formatter',
        destination: '/tools/json-formatter',
        permanent: true,
      },
      {
        source: '/css-flexbox-generator',
        destination: '/tools/css-flexbox-generator',
        permanent: true,
      },
      {
        source: '/git-command-builder',
        destination: '/tools/git-command-builder',
        permanent: true,
      },
      {
        source: '/base64-encoder',
        destination: '/tools/base64-encoder',
        permanent: true,
      },
      {
        source: '/color-converter',
        destination: '/tools/color-converter',
        permanent: true,
      },
      {
        source: '/regex-tester',
        destination: '/tools/regex-tester',
        permanent: true,
      },
      {
        source: '/uuid-generator',
        destination: '/tools/uuid-generator',
        permanent: true,
      },
      {
        source: '/yaml-to-json',
        destination: '/tools/yaml-to-json',
        permanent: true,
      },
      {
        source: '/css-grid-generator',
        destination: '/tools/css-grid-generator',
        permanent: true,
      },
      {
        source: '/markdown-editor',
        destination: '/tools/markdown-editor',
        permanent: true,
      },
      {
        source: '/jwt-decoder',
        destination: '/tools/jwt-decoder',
        permanent: true,
      },
      {
        source: '/diff-checker',
        destination: '/tools/diff-checker',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/icons/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

module.exports = nextConfig;
