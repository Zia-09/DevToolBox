'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, ArrowRight } from 'lucide-react';
import { Tool, getRelatedTools } from '@/lib/tools-data';
import { generateToolSchema, generateBreadcrumbSchema, generateFaqSchema } from '@/lib/metadata';
import { ToolCard } from '@/components/ToolCard';
import { analytics } from '@/lib/analytics';
import { cn } from '@/lib/utils';

interface ToolPageLayoutProps {
  tool: Tool;
  children: React.ReactNode;
}

function FaqItem({ question, answer, toolName }: { question: string; answer: string; toolName: string }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => {
      if (!prev) analytics.faqExpanded(toolName, question);
      return !prev;
    });
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={handleToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-foreground hover:bg-accent/50 transition-colors"
      >
        <span>{question}</span>
        <ChevronDown
          className={cn('h-4 w-4 text-muted-foreground transition-transform flex-shrink-0 ml-3', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3 animate-fade-in">
          {answer}
        </div>
      )}
    </div>
  );
}

export function ToolPageLayout({ tool, children }: ToolPageLayoutProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-tool-box-eight.vercel.app';
  const relatedTools = getRelatedTools(tool.relatedTools || []);

  // Track tool opened
  useEffect(() => {
    analytics.toolOpened(tool.name, tool.slug);
  }, [tool.name, tool.slug]);

  const breadcrumbItems = [
    { name: 'Home', url: baseUrl },
    { name: 'Tools', url: `${baseUrl}/tools` },
    { name: tool.name, url: `${baseUrl}/tools/${tool.slug}` },
  ];

  const toolSchema = generateToolSchema(tool);
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);
  const faqSchema = generateFaqSchema(tool.faqs);

  return (
    <>
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="min-h-screen pt-6 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center flex-wrap gap-1 text-sm text-muted-foreground" role="list">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li>
                <Link href="/tools" className="hover:text-primary transition-colors">Tools</Link>
              </li>
              <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
              <li>
                <span className="text-foreground font-medium" aria-current="page">{tool.name}</span>
              </li>
            </ol>
          </nav>

          {/* Tool header */}
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">{tool.name}</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{tool.longDescription || tool.description}</p>
          </header>

          {/* The actual tool UI */}
          <section aria-label={`${tool.name} tool`}>
            {children}
          </section>

          {/* Keyword-rich content section */}
          <section className="mt-16 pt-12 border-t border-border" aria-labelledby="about-heading">
            <h2 id="about-heading" className="text-2xl font-bold mb-4">About the {tool.name}</h2>
            <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground leading-7 space-y-3">
              <p>{tool.longDescription}</p>
              <p>
                DevToolbox provides this <strong>{tool.name.toLowerCase()}</strong> as a free, browser-based utility.
                All processing happens locally — your data never leaves your device. No account required.
              </p>
              {tool.keywords.length > 0 && (
                <p className="text-xs text-muted-foreground/70">
                  Related searches: {tool.keywords.join(' · ')}
                </p>
              )}
            </div>
          </section>

          {/* FAQ Section */}
          {tool.faqs.length > 0 && (
            <section className="mt-12" aria-labelledby="faq-heading">
              <h2 id="faq-heading" className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                {tool.faqs.map((faq, i) => (
                  <FaqItem key={i} question={faq.question} answer={faq.answer} toolName={tool.name} />
                ))}
              </div>
            </section>
          )}

          {/* Related tools */}
          {relatedTools.length > 0 && (
            <section className="mt-12" aria-labelledby="related-heading">
              <div className="flex items-center justify-between mb-6">
                <h2 id="related-heading" className="text-2xl font-bold">Related Tools</h2>
                <Link
                  href="/tools"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  View all tools <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTools.map((t) => (
                  <ToolCard key={t.id} {...t} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
