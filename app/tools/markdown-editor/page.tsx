import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/lib/metadata';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import MarkdownEditorTool from '@/components/tools/MarkdownEditorTool';

const tool = getToolBySlug('markdown-editor');
if (!tool) notFound();

export const metadata = generateToolMetadata(tool!);

export default function MarkdownEditorPage() {
  return (
    <ToolPageLayout tool={tool!}>
      <MarkdownEditorTool />
    </ToolPageLayout>
  );
}
