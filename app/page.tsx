import type { Metadata } from 'next';
import { HomeContent } from './HomeContent';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-tool-box-eight.vercel.app';

export const metadata: Metadata = {
  title: 'DevToolbox — Free Online Developer Tools (No Login)',
  description:
    'Free online developer tools: JSON formatter, CSS flexbox/grid generators, git command builder, regex tester, UUID generator, and more. Privacy-first, runs entirely in your browser.',
  alternates: {
    canonical: baseUrl,
  },
};

export default function HomePage() {
  return <HomeContent />;
}
