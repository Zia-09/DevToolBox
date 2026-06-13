'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { blogPosts, blogCategories, getBlogPostsByCategory } from '@/lib/blog-data';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { AdSlot } from '@/components/AdSlot';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : getBlogPostsByCategory(selectedCategory);

  return (
    <main className="min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Blog</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tutorials, guides, and tips for developers. Learn something new every day.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {blogCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'transition-all',
                selectedCategory === category && 'bg-primary text-primary-foreground'
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col h-full p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary w-fit">
                {post.category}
              </span>
              <h2 className="font-semibold text-xl mt-4 mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
              <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>{formatDate(post.date)}</span>
                <span>{post.readTime}</span>
              </div>
              <span className="text-primary text-sm font-medium group-hover:underline">
                Read More
              </span>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No posts found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
}
