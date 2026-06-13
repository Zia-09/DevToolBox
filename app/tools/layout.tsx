import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtoolbox.io';

export const metadata: Metadata = {
  title: 'All Developer Tools — Free Online Utilities | DevToolbox',
  description:
    'Browse 12 free online developer tools — JSON formatter, CSS flexbox & grid generators, git command builder, regex tester, UUID generator, Base64 encoder, JWT decoder, Diff checker, Markdown editor, YAML converter, and more.',
  keywords: [
    'all developer tools',
    'free online dev tools',
    'developer utilities list',
    'web developer tools',
    'coding tools online',
  ],
  openGraph: {
    title: 'All Developer Tools — DevToolbox',
    description: 'Browse 12 free online developer tools. No login required, all run in your browser.',
    url: `${baseUrl}/tools`,
    type: 'website',
    siteName: 'DevToolbox',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: 'DevToolbox Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Developer Tools — DevToolbox',
    description: 'Browse 12 free online developer tools. No login required.',
    images: [`${baseUrl}/og-image.png`],
  },
  alternates: { canonical: `${baseUrl}/tools` },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
