import { tools } from '@/lib/tools-data';
import JsonFormatterTool from '@/components/JsonFormatterTool';

const tool = tools.find(t => t.slug === 'json-formatter');

export const metadata = {
  title: `${tool?.name} — DevToolbox`,
  description: tool?.description,
  openGraph: {
    title: `${tool?.name} — DevToolbox`,
    description: tool?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/json-formatter`,
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/json-formatter`,
  },
};

export default function JsonFormatterPage() {
  return <JsonFormatterTool />;
}
