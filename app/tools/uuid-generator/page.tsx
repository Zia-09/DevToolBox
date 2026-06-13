import { tools } from '@/lib/tools-data';
import UuidGeneratorTool from '@/components/tools/UuidGeneratorTool';

const tool = tools.find(t => t.slug === 'uuid-generator');

export const metadata = {
  title: `${tool?.name} — DevToolbox`,
  description: tool?.description,
  openGraph: {
    title: `${tool?.name} — DevToolbox`,
    description: tool?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/uuid-generator`,
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/uuid-generator`,
  },
};

export default function UuidGeneratorPage() {
  return <UuidGeneratorTool />;
}
