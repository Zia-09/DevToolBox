import { tools } from '@/lib/tools-data';
import FlexboxGeneratorTool from '@/components/FlexboxGeneratorTool';

const tool = tools.find(t => t.slug === 'css-flexbox-generator');

export const metadata = {
  title: `${tool?.name} — DevToolbox`,
  description: tool?.description,
  openGraph: {
    title: `${tool?.name} — DevToolbox`,
    description: tool?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/css-flexbox-generator`,
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/css-flexbox-generator`,
  },
};

export default function FlexboxGeneratorPage() {
  return <FlexboxGeneratorTool />;
}
