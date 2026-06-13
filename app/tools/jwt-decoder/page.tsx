import { tools } from '@/lib/tools-data';
import JwtDecoderTool from '@/components/tools/JwtDecoderTool';

const tool = tools.find(t => t.slug === 'jwt-decoder');

export const metadata = {
  title: `${tool?.name} — DevToolbox`,
  description: tool?.description,
  openGraph: {
    title: `${tool?.name} — DevToolbox`,
    description: tool?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/jwt-decoder`,
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/jwt-decoder`,
  },
};

export default function JwtDecoderPage() {
  return <JwtDecoderTool />;
}
