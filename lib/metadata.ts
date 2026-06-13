import type { Metadata } from 'next';
import { Tool } from './tools-data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-tool-box-eight.vercel.app';

export function generateToolMetadata(tool: Tool): Metadata {
  const title = `${tool.name} — Free Online Tool | DevToolbox`;
  const description = tool.longDescription || tool.description;
  const url = `${baseUrl}/tools/${tool.slug}`;

  return {
    title,
    description,
    keywords: tool.keywords,
    openGraph: {
      title: `${tool.name} — DevToolbox`,
      description,
      url,
      type: 'website',
      siteName: 'DevToolbox',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} — Free Online Developer Tool`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} — DevToolbox`,
      description: tool.description,
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
      },
    },
  };
}

export function generateToolSchema(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.longDescription || tool.description,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: tool.category,
    operatingSystem: 'Web Browser',
    url: `${baseUrl}/tools/${tool.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    keywords: tool.keywords.join(', '),
    publisher: {
      '@type': 'Organization',
      name: 'DevToolbox',
      url: baseUrl,
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
