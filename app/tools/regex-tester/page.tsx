import { tools } from '@/lib/tools-data';
import RegexTesterTool from '@/components/tools/RegexTesterTool';

const tool = tools.find(t => t.slug === 'regex-tester');

export const metadata = {
  title: `${tool?.name} — DevToolbox`,
  description: tool?.description,
  openGraph: {
    title: `${tool?.name} — DevToolbox`,
    description: tool?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/regex-tester`,
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/regex-tester`,
  },
};

export default function RegexTesterPage() {
  return <RegexTesterTool />;
}
