import { Metadata } from 'next';
import { Tool, getToolBySlug } from './tools-data';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtoolbox.io';

export function generateToolMetadata(slug: string): Metadata {
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found',
    };
  }

  return {
    title: tool.name,
    description: tool.description,
    openGraph: {
      title: `${tool.name} — DevToolbox`,
      description: tool.description,
      url: `${baseUrl}/tools/${tool.slug}`,
      type: 'website',
      siteName: 'DevToolbox',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} - DevToolbox`,
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
      canonical: `${baseUrl}/tools/${tool.slug}`,
    },
  };
}

export function generateToolSchema(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    url: `${baseUrl}/tools/${tool.slug}`,
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
