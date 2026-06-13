import { tools } from '@/lib/tools-data';
import DiffCheckerTool from '@/components/tools/DiffCheckerTool';

const tool = tools.find(t => t.slug === 'diff-checker');

export const metadata = {
  title: `${tool?.name} — DevToolbox`,
  description: tool?.description,
  openGraph: {
    title: `${tool?.name} — DevToolbox`,
    description: tool?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/diff-checker`,
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/diff-checker`,
  },
};

export default function DiffCheckerPage() {
  return <DiffCheckerTool />;
}
