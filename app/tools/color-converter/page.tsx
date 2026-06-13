import { tools } from '@/lib/tools-data';
import ColorConverterTool from '@/components/tools/ColorConverterTool';

const tool = tools.find(t => t.slug === 'color-converter');

export const metadata = {
  title: `${tool?.name} — DevToolbox`,
  description: tool?.description,
  openGraph: {
    title: `${tool?.name} — DevToolbox`,
    description: tool?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/color-converter`,
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/color-converter`,
  },
};

export default function ColorConverterPage() {
  return <ColorConverterTool />;
}
