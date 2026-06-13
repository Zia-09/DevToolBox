import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtoolbox.io';

export const metadata: Metadata = {
  title: 'Blog — Developer Tutorials & Guides | DevToolbox',
  description:
    'Tutorials, guides, and tips for web developers. Learn about CSS layouts, git workflows, JSON handling, regex patterns, and more.',
  keywords: ['developer blog', 'web development tutorials', 'css guides', 'git tutorials', 'javascript tips'],
  openGraph: {
    title: 'DevToolbox Blog — Developer Tutorials & Guides',
    description: 'Tutorials, guides, and tips for web developers. Learn CSS, git, JSON, regex, and more.',
    url: `${baseUrl}/blog`,
    type: 'website',
    siteName: 'DevToolbox',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: 'DevToolbox Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevToolbox Blog — Developer Tutorials & Guides',
    description: 'Tutorials, guides, and tips for web developers.',
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: { canonical: `${baseUrl}/blog` },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
