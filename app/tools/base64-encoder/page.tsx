import { notFound } from 'next/navigation';
import { getToolBySlug } from '@/lib/tools-data';
import { generateToolMetadata } from '@/lib/metadata';
import { ToolPageLayout } from '@/components/ToolPageLayout';
import Base64Tool from '@/components/tools/Base64Tool';

const tool = getToolBySlug('base64-encoder');
if (!tool) notFound();

export const metadata = generateToolMetadata(tool!);

export default function Base64EncoderPage() {
  return (
    <ToolPageLayout tool={tool!}>
      <Base64Tool />
    </ToolPageLayout>
  );
}
