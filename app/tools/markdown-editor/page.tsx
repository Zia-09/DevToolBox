import { tools } from '@/lib/tools-data';
import MarkdownEditorTool from '@/components/tools/MarkdownEditorTool';

const tool = tools.find(t => t.slug === 'markdown-editor');

export const metadata = {
  title: `${tool?.name} — DevToolbox`,
  description: tool?.description,
  openGraph: {
    title: `${tool?.name} — DevToolbox`,
    description: tool?.description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/markdown-editor`,
    type: 'website',
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tools/markdown-editor`,
  },
};

export default function MarkdownEditorPage() {
  return <MarkdownEditorTool />;
}
