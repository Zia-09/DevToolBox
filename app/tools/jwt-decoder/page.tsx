import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/lib/metadata';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import JwtDecoderTool from '@/components/tools/JwtDecoderTool';

const tool = getToolBySlug('jwt-decoder');
if (!tool) notFound();

export const metadata = generateToolMetadata(tool!);

export default function JwtDecoderPage() {
  return (
    <ToolPageLayout tool={tool!}>
      <JwtDecoderTool />
    </ToolPageLayout>
  );
}
