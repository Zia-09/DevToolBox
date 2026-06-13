import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtoolbox.io';

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'DevToolbox',
  url: baseUrl,
  description: 'Free developer tools that run in your browser. No login required.',
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/tools?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DevToolbox',
  url: baseUrl,
  logo: `${baseUrl}/icons/icon-512x512.png`,
  description: 'Free, privacy-first developer tools that run entirely in your browser.',
  sameAs: [],
};

export const viewport = {
  themeColor: '#3B82F6',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'DevToolbox — Free Developer Tools That Save Time',
    template: '%s | DevToolbox',
  },
  description:
    'Free online developer tools — JSON formatter, CSS flexbox generator, git command builder, regex tester, UUID generator, and more. No login, runs in your browser.',
  keywords: [
    'developer tools online',
    'free dev tools',
    'json formatter',
    'css generator',
    'git command builder',
    'regex tester',
    'web development tools',
    'coding utilities',
  ],
  authors: [{ name: 'DevToolbox' }],
  creator: 'DevToolbox',
  publisher: 'DevToolbox',
  category: 'Technology',
  verification: {
    google: 'Le378wzedv9A8VPZVXVJVkcXwksof6LtQjHJ0bDxIUc',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'DevToolbox',
    title: 'DevToolbox — Free Developer Tools That Save Time',
    description:
      'Free online developer tools that run in your browser. JSON formatter, CSS flexbox generator, git command builder, and 9 more tools. No login required.',
    images: [{ url: `${baseUrl}/og-image.png`, width: 1200, height: 630, alt: 'DevToolbox - Free Developer Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevToolbox — Free Developer Tools That Save Time',
    description: 'Free online developer tools. JSON formatter, CSS generator, UUID generator, and more. No login required.',
    images: [`${baseUrl}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/manifest.json',
  alternates: { canonical: baseUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Theme initializer — runs before paint to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('devtoolbox_theme');if(t==='dark'||!t){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

        {/* Google AdSense */}
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        {/* Google Analytics 4 */}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}',{page_path:window.location.pathname});`}
            </Script>
          </>
        )}

        {/* Plausible Analytics */}
        {plausibleDomain && (
          <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />
        )}
      </head>
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        {/* Accessibility: skip to main content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:font-medium"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="pt-16 min-h-screen">
          {children}
        </main>
        <Footer />
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
