import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/lib/metadata';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import RegexTesterTool from '@/components/tools/RegexTesterTool';

const tool = getToolBySlug('regex-tester');
if (!tool) notFound();

export const metadata = generateToolMetadata(tool!);

export default function RegexTesterPage() {
  return (
    <ToolPageLayout tool={tool!}>
      <RegexTesterTool />
    </ToolPageLayout>
  );
}
