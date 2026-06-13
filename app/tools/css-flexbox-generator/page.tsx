import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/lib/metadata';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import FlexboxGeneratorTool from '@/components/FlexboxGeneratorTool';

const tool = getToolBySlug('css-flexbox-generator');
if (!tool) notFound();

export const metadata = generateToolMetadata(tool!);

export default function CssFlexboxGeneratorPage() {
  return (
    <ToolPageLayout tool={tool!}>
      <FlexboxGeneratorTool />
    </ToolPageLayout>
  );
}
