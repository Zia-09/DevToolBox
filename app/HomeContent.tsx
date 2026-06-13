'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Zap, Shield, Copy, Wifi, ArrowRight, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchBar } from '@/components/SearchBar';
import { ToolCard } from '@/components/ToolCard';
import { AdSlot } from '@/components/AdSlot';
import { tools, searchTools, getPopularTools, Tool } from '@/lib/tools-data';
import { blogPosts } from '@/lib/blog-data';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

const features = [
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'No waiting. All tools run instantly in your browser.',
  },
  {
    icon: Shield,
    title: 'No AI Needed',
    description: 'Simple, deterministic tools that just work.',
  },
  {
    icon: Copy,
    title: 'One-Click Copy',
    description: 'Copy any output to your clipboard instantly.',
  },
  {
    icon: Wifi,
    title: 'Works Offline',
    description: 'No internet required after the first load.',
  },
];

export function HomeContent() {
  const [filteredTools, setFilteredTools] = useState<Tool[]>(tools);
  const [recent, setRecent] = useState<string[]>([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    try {
      setRecent(JSON.parse(
        localStorage.getItem('devtoolbox_recent') || '[]'
      ));
    } catch {}
  }, []);

  const recentTools = useMemo(() => {
    return recent
      .map(slug => tools.find(t => t.slug === slug))
      .filter((t): t is Tool => !!t);
  }, [recent]);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredTools(tools);
    } else {
      setFilteredTools(searchTools(query));
    }
  };

  const popularTools = getPopularTools().slice(0, 3);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Thanks for subscribing!');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Developer Tools That Actually{' '}
            <span className="text-primary">Save Time</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Fast, free, no login required. Everything runs right in your browser.
          </p>
          <div className="max-w-xl mx-auto">
            <SearchBar onSearch={handleSearch} placeholder="Search tools by name or tag..." />
          </div>
        </div>
      </section>

      {/* Hero Ad Slot */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <AdSlot slot="hero-banner" />
      </div>

      {/* Recently Used Tools */}
      {recent.length > 0 && (
        <section className="py-8 px-4 sm:px-6 lg:px-8" aria-label="Recently used tools">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
              <h2 className="text-xl font-semibold">Jump back in</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentTools.map((tool) => (
                <ToolCard key={tool.id} variant="compact" {...tool} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Tools */}
      <section className="py-12 px-4 sm:px-6 lg:px-8" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 id="featured-heading" className="text-2xl font-bold">Featured Tools</h2>
            <Link href="/tools">
              <Button variant="ghost" className="text-primary hover:text-primary">
                View all tools <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
        </div>
      </section>

      {/* All Tools Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card/30" aria-labelledby="all-tools-heading">
        <div className="max-w-7xl mx-auto">
          <h2 id="all-tools-heading" className="text-2xl font-bold mb-8">All Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} {...tool} />
            ))}
          </div>
          {filteredTools.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No tools found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Why DevToolbox */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="why-heading">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 id="why-heading" className="text-3xl font-bold mb-4">Why DevToolbox?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built by developers, for developers. No bloat, no signup, just tools that work.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4" aria-hidden="true">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/30" aria-labelledby="blog-heading">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 id="blog-heading" className="text-2xl font-bold">Latest from the Blog</h2>
            <Link href="/blog">
              <Button variant="ghost" className="text-primary hover:text-primary">
                View all posts <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <article
                key={post.id}
                className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
              >
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {post.category}
                </span>
                <h3 className="font-semibold text-lg mt-3 mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block mt-3 text-primary text-sm font-medium hover:underline"
                >
                  Read More
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" aria-labelledby="newsletter-heading">
        <div className="max-w-xl mx-auto text-center">
          <h2 id="newsletter-heading" className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Get notified when we add new tools or publish new articles.
          </p>
          <form className="flex gap-3" onSubmit={handleNewsletterSubmit}>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1"
              required
              aria-label="Email address for newsletter"
            />
            <Button type="submit">
              <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
              Subscribe
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-3">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer Ad Slot */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <AdSlot slot="footer-banner" />
      </div>
    </div>
  );
}
