import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/lib/metadata';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import YamlToJsonTool from '@/components/tools/YamlToJsonTool';

const tool = getToolBySlug('yaml-to-json');
if (!tool) notFound();

export const metadata = generateToolMetadata(tool!);

export default function YamlToJsonPage() {
  return (
    <ToolPageLayout tool={tool!}>
      <YamlToJsonTool />
    </ToolPageLayout>
  );
}
