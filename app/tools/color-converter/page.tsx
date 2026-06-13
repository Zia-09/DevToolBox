import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/lib/metadata';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import ColorConverterTool from '@/components/tools/ColorConverterTool';

const tool = getToolBySlug('color-converter');
if (!tool) notFound();

export const metadata = generateToolMetadata(tool!);

export default function ColorConverterPage() {
  return (
    <ToolPageLayout tool={tool!}>
      <ColorConverterTool />
    </ToolPageLayout>
  );
}
