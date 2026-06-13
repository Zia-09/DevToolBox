import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/lib/metadata';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import CssGridGeneratorTool from '@/components/tools/CssGridGeneratorTool';

const tool = getToolBySlug('css-grid-generator');
if (!tool) notFound();

export const metadata = generateToolMetadata(tool!);

export default function CssGridGeneratorPage() {
  return (
    <ToolPageLayout tool={tool!}>
      <CssGridGeneratorTool />
    </ToolPageLayout>
  );
}
