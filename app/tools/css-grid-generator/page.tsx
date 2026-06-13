import { tools } from '@/lib/tools-data';
import CssGridGeneratorTool from '@/components/tools/CssGridGeneratorTool';

const tool = tools.find(t => t.slug === 'css-grid-generator');

export const metadata = {
  title: `${tool?.name} — DevToolbox`,
  description: tool?.description,
  openGraph: {
    title: `${tool?.name} — DevToolbox`,
    description: tool?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/css-grid-generator`,
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/css-grid-generator`,
  },
};

export default function CssGridGeneratorPage() {
  return <CssGridGeneratorTool />;
}
