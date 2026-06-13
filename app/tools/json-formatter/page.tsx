import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/lib/metadata';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import JsonFormatterTool from '@/components/JsonFormatterTool';

const tool = getToolBySlug('json-formatter');
if (!tool) notFound();

export const metadata = generateToolMetadata(tool!);

export default function JsonFormatterPage() {
  return (
    <ToolPageLayout tool={tool!}>
      <JsonFormatterTool />
    </ToolPageLayout>
  );
}
