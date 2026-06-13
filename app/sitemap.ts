import { tools } from '@/lib/tools-data';
export default function sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://devtoolbox.io';
  return [
    { url: base, priority: 1.0 },
    { 
      url: `${base}/tools`, 
      priority: 0.9 
    },
    { 
      url: `${base}/blog`, 
      priority: 0.7 
    },
    { 
      url: `${base}/about`, 
      priority: 0.5 
    },
    ...tools.map(t => ({
      url: `${base}/tools/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  ];
}
