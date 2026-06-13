'use client';

import Link from 'next/link';
import {
  Braces, Layout, GitBranch, Binary, Palette, SearchCode,
  Fingerprint, FileCode, Grid3x3, FileText, Key, GitCompare, Code,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Explicit icon map — avoids importing the entire lucide-react namespace (massive bundle)
const iconMap: Record<string, LucideIcon> = {
  Braces, Layout, GitBranch, Binary, Palette, SearchCode,
  Fingerprint, FileCode, Grid3x3, FileText, Key, GitCompare, Code,
};

function getIconComponent(iconName: string): LucideIcon {
  return iconMap[iconName] || Code;
}

interface ToolCardProps {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: string;
  tags: string[];
  isNew?: boolean;
  isPopular?: boolean;
  hasPage?: boolean;
  variant?: 'default' | 'compact';
}

export function ToolCard({
  name,
  slug,
  description,
  icon,
  tags,
  isNew,
  isPopular,
  hasPage = false,
  variant = 'default',
}: ToolCardProps) {
  const IconComponent = getIconComponent(icon);

  if (variant === 'compact') {
    if (!hasPage) {
      return (
        <div
          className="group flex items-center gap-3 p-3 rounded-lg bg-card border border-border opacity-60 cursor-not-allowed"
          aria-label={`${name} — coming soon`}
        >
          <div className="p-2 rounded-lg bg-muted text-muted-foreground">
            <IconComponent className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-foreground truncate text-sm">{name}</span>
              <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">Soon</Badge>
            </div>
          </div>
        </div>
      );
    }
    return (
      <Link
        href={`/tools/${slug}`}
        aria-label={`Open ${name} tool`}
        className="group flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent/50 transition-all"
      >
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <IconComponent className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground truncate text-sm">{name}</span>
            {isNew && (
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">New</Badge>
            )}
          </div>
        </div>
      </Link>
    );
  }

  const cardContent = (
    <div
      className={cn(
        'group relative flex flex-col h-full p-6 rounded-xl bg-card border border-border transition-all duration-300',
        hasPage
          ? 'hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 cursor-pointer'
          : 'opacity-70 cursor-not-allowed'
      )}
    >
      {/* Badges */}
      <div className="absolute top-4 right-4 flex gap-2" aria-hidden="true">
        {!hasPage && (
          <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">Coming Soon</Badge>
        )}
        {isNew && hasPage && (
          <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">New</Badge>
        )}
        {isPopular && hasPage && (
          <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 text-xs">Popular</Badge>
        )}
      </div>

      <div className="flex items-start gap-4">
        <div
          className={cn(
            'p-3 rounded-xl transition-colors',
            hasPage
              ? 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          )}
          aria-hidden="true"
        >
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 mb-4" aria-label="Tags">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
        {hasPage ? (
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" aria-label={`Open ${name}`}>
            Open Tool
          </Button>
        ) : (
          <Button disabled className="w-full opacity-50 cursor-not-allowed" variant="secondary" aria-label={`${name} — coming soon`}>
            Coming Soon
          </Button>
        )}
      </div>
    </div>
  );

  if (hasPage) {
    return (
      <Link href={`/tools/${slug}`} className="block h-full" aria-label={`Open ${name} — ${description}`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
