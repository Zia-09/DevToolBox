import Link from 'next/link';
import { Code } from 'lucide-react';

const footerLinks = {
  Tools: [
    { href: '/tools/json-formatter', label: 'JSON Formatter' },
    { href: '/tools/css-flexbox-generator', label: 'Flexbox Generator' },
    { href: '/tools/git-command-builder', label: 'Git Builder' },
    { href: '/tools', label: 'All Tools' },
  ],
  Resources: [
    { href: '/blog', label: 'Blog' },
    { href: '/about', label: 'About' },
  ],
  Legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms-of-service', label: 'Terms of Service' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 text-foreground">
              <Code className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">DevToolbox</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Developer tools that actually save time. Fast, free, and no login required.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-foreground mb-4">{category}</h3>
              <ul className="space-y-2">
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
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © 2026 DevToolbox. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
