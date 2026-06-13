import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/lib/metadata';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import GitCommandBuilderTool from '@/components/GitCommandBuilderTool';

const tool = getToolBySlug('git-command-builder');
if (!tool) notFound();

export const metadata = generateToolMetadata(tool!);

export default function GitCommandBuilderPage() {
  return (
    <ToolPageLayout tool={tool!}>
      <GitCommandBuilderTool />
    </ToolPageLayout>
  );
}
