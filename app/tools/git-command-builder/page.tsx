import { tools } from '@/lib/tools-data';
import GitCommandBuilderTool from '@/components/GitCommandBuilderTool';

const tool = tools.find(t => t.slug === 'git-command-builder');

export const metadata = {
  title: `${tool?.name} — DevToolbox`,
  description: tool?.description,
  openGraph: {
    title: `${tool?.name} — DevToolbox`,
    description: tool?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/git-command-builder`,
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/git-command-builder`,
  },
};

export default function GitCommandBuilderPage() {
  return <GitCommandBuilderTool />;
}
