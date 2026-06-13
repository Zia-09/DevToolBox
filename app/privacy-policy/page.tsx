import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy commitments and details about data handling for DevToolbox.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://dev-tool-box-eight.vercel.app'}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
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
            <Shield className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
        </div>

        <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-7 space-y-6">
          <p className="text-lg text-foreground/80">
            Last Updated: June 13, 2026
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">1. Introduction</h2>
            <p>
              Welcome to DevToolbox. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we handle your data when you visit our website.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">2. No Personal Data Collection</h2>
            <p>
              DevToolbox is built as a client-side utility helper. We do **not** collect, store, or transmit any code, keys, configuration files, JSON objects, or other data you paste into our tools to any external server. All text processing and formatting happens strictly locally inside your web browser.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">3. LocalStorage</h2>
            <p>
              We utilize your browser’s local storage (`localStorage`) solely to store preferences such as your active theme (dark/light mode) and recently used tools, enhancing your user experience. This data remains on your machine.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">4. Contact Us</h2>
            <p>
              If you have any questions or feedback regarding this Privacy Policy, feel free to contact us via our official email channel.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
