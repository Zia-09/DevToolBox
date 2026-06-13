import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service policy for using the free web utility tools at DevToolbox.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-tool-box-eight.vercel.app'}/terms-of-service`,
  },
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen pt-8 pb-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 group transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <FileText className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Terms of Service</h1>
        </div>

        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-7 space-y-6">
          <p className="text-lg text-foreground/80">
            Last Updated: June 13, 2026
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using DevToolbox, you accept and agree to be bound by the terms and provisions of this agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. Permitted Use</h2>
            <p>
              These tools are provided free of charge for personal and commercial developer workflows. You may use them to format, validate, generate, and convert configurations and layouts.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. Disclaimer of Warranties</h2>
            <p>
              DevToolbox is provided "as is" and "as available", without warranty of any kind. We do not guarantee that the tools will be completely error-free or run without interruption.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
