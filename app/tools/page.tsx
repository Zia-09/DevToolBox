'use client';

import { useState, useMemo } from 'react';
import { tools, categories, searchTools, getToolsByCategory, Tool } from '@/lib/tools-data';
import { SearchBar } from '@/components/SearchBar';
import { ToolCard } from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SortOption = 'popular' | 'newest' | 'az';

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const filteredAndSortedTools = useMemo(() => {
    let result = selectedCategory === 'All'
      ? tools
      : getToolsByCategory(selectedCategory);

    if (searchQuery.trim()) {
      result = searchTools(searchQuery);
    }

    // Sort tools
    switch (sortBy) {
      case 'popular':
        result = [...result].sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return 0;
        });
        break;
      case 'newest':
        result = [...result].sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
      case 'az':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">All Developer Tools</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of {tools.length} free developer tools. All run locally in your browser.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="max-w-xl mx-auto">
            <SearchBar
              onSearch={setSearchQuery}
              placeholder="Search tools..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
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

            {/* Sort options */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-card border border-border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="popular">Popular</option>
                <option value="newest">Newest</option>
                <option value="az">A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedTools.map((tool) => (
            <ToolCard key={tool.id} {...tool} />
          ))}
        </div>

        {filteredAndSortedTools.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">No tools found matching your criteria.</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
