import { tools } from '@/lib/tools-data';
import YamlToJsonTool from '@/components/tools/YamlToJsonTool';

const tool = tools.find(t => t.slug === 'yaml-to-json');

export const metadata = {
  title: `${tool?.name} — DevToolbox`,
  description: tool?.description,
  openGraph: {
    title: `${tool?.name} — DevToolbox`,
    description: tool?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/yaml-to-json`,
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/yaml-to-json`,
  },
};

export default function YamlToJsonPage() {
  return <YamlToJsonTool />;
}
