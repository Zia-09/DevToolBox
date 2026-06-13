import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, Clock, Share2, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBlogPostBySlug, blogPosts } from '@/lib/blog-data';
import { formatDate } from '@/lib/utils';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all blog posts for fast routing and static generation
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};
  
  return {
    title: `${post.title} — DevToolbox Blog`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — DevToolbox Blog`,
      description: post.excerpt,
      type: 'article',
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-8 pb-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 group transition-colors"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="space-y-6">
          <div className="space-y-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              {post.title}
            </h1>
            
            {/* Meta stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pt-2 border-b border-border/60 pb-6">
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose dark:prose-invert max-w-none pt-4 text-foreground/90 leading-7 space-y-6">
            {post.content.split('\n\n').map((block, idx) => {
              if (block.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-xl font-bold text-foreground mt-8 mb-4">
                    {block.replace('### ', '')}
                  </h3>
                );
              }
              if (block.startsWith('- ')) {
                return (
                  <ul key={idx} className="list-disc pl-6 space-y-2 my-4">
                    {block.split('\n').map((li, liIdx) => (
                      <li key={liIdx}>{li.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              if (block.startsWith('1. ') || block.startsWith('2. ') || block.startsWith('3. ')) {
                return (
                  <ol key={idx} className="list-decimal pl-6 space-y-2 my-4">
                    {block.split('\n').map((li, liIdx) => (
                      <li key={liIdx}>{li.substring(3)}</li>
                    ))}
                  </ol>
                );
              }
              if (block.includes('```')) {
                const lines = block.split('\n');
                const code = lines.slice(1, -1).join('\n');
                return (
                  <pre key={idx} className="p-4 rounded-lg bg-muted border border-border/80 font-mono text-sm overflow-x-auto my-4 text-muted-foreground">
                    <code>{code}</code>
                  </pre>
                );
              }
              return (
                <p key={idx} className="text-base my-4">
                  {block}
                </p>
              );
            })}
          </div>

          {/* Social Share Controls */}
          <div className="border-t border-border pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-sm font-semibold text-muted-foreground">Share this article:</span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="flex items-center gap-1.5">
                <Twitter className="h-4 w-4" />
                <span>Twitter</span>
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1.5">
                <Facebook className="h-4 w-4" />
                <span>Facebook</span>
              </Button>
              <Button size="sm" variant="outline" className="flex items-center gap-1.5">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </Button>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
