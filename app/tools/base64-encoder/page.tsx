import { tools } from '@/lib/tools-data';
import Base64Tool from '@/components/tools/Base64Tool';

const tool = tools.find(t => t.slug === 'base64-encoder');

export const metadata = {
  title: `${tool?.name} — DevToolbox`,
  description: tool?.description,
  openGraph: {
    title: `${tool?.name} — DevToolbox`,
    description: tool?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/base64-encoder`,
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/base64-encoder`,
  },
};

export default function Base64EncoderPage() {
  return <Base64Tool />;
}
