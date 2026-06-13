import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/lib/metadata';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import UuidGeneratorTool from '@/components/tools/UuidGeneratorTool';

const tool = getToolBySlug('uuid-generator');
if (!tool) notFound();

export const metadata = generateToolMetadata(tool!);

export default function UuidGeneratorPage() {
  return (
    <ToolPageLayout tool={tool!}>
      <UuidGeneratorTool />
    </ToolPageLayout>
  );
}
