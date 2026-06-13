import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/lib/metadata';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import DiffCheckerTool from '@/components/tools/DiffCheckerTool';

const tool = getToolBySlug('diff-checker');
if (!tool) notFound();

export const metadata = generateToolMetadata(tool!);

export default function DiffCheckerPage() {
  return (
    <ToolPageLayout tool={tool!}>
      <DiffCheckerTool />
    </ToolPageLayout>
  );
}
