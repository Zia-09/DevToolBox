import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-tool-box-eight.vercel.app';

export const metadata: Metadata = {
  title: 'About — Built for Developers',
  description:
    'DevToolbox is a free, privacy-first collection of developer utilities that run entirely in your browser. No login, no tracking, no ads — just tools that work.',
  keywords: ['about devtoolbox', 'developer tools website', 'free dev utilities', 'privacy first tools'],
  openGraph: {
    title: 'About',
    description: 'Learn about DevToolbox — fast, free, privacy-first developer tools that run in your browser.',
    url: `${baseUrl}/about`,
    type: 'website',
    siteName: 'DevToolbox',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: 'About DevToolbox' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About',
    description: 'Free, privacy-first developer tools that run in your browser.',
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: { canonical: `${baseUrl}/about` },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
