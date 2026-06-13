import Link from 'next/link';
import { Code } from 'lucide-react';
import { tools } from '@/lib/tools-data';

const toolLinks = tools
  .filter((t) => t.hasPage)
  .map((t) => ({ href: `/tools/${t.slug}`, label: t.name }));

const footerSections = {
  Tools: [
    ...toolLinks.slice(0, 6),
    { href: '/tools', label: 'View All Tools →' },
  ],
  'More Tools': [
    ...toolLinks.slice(6),
  ],
  Resources: [
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
    { href: '/tools', label: 'All Tools' },
  ],
  Legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              aria-label="DevToolbox home"
              className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity"
            >
              <Code className="h-6 w-6 text-primary" aria-hidden="true" />
              <span className="font-bold text-xl">DevToolbox</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Free developer tools that save time. Runs entirely in your browser — no login, no tracking.
            </p>
          </div>

          {/* Link sections */}
          {Object.entries(footerSections).map(([section, links]) => (
            <nav key={section} aria-label={`${section} links`}>
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">{section}</h3>
              <ul className="space-y-2" role="list">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevToolbox. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            All tools run locally in your browser. No data is ever sent to our servers.
          </p>
        </div>
      </div>
    </footer>
  );
}
