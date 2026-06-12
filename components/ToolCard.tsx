'use client';

import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  variant?: 'default' | 'compact';
}

function getIconComponent(iconName: string): LucideIcon {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  return icons[iconName] || LucideIcons.Code;
}

export function ToolCard({
  name,
  slug,
  description,
  icon,
  tags,
  isNew,
  isPopular,
  variant = 'default',
}: ToolCardProps) {
  const IconComponent = getIconComponent(icon);

  if (variant === 'compact') {
    return (
      <Link
        href={`/tools/${slug}`}
        className="group flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-accent/50 transition-all"
      >
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <IconComponent className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-foreground truncate">{name}</h3>
            {isNew && (
              <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                New
              </Badge>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="group relative flex flex-col p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      {(isNew || isPopular) && (
        <div className="absolute top-4 right-4 flex gap-2">
          {isNew && (
            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs">
              New
            </Badge>
          )}
          {isPopular && (
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 text-xs">
              Popular
            </Badge>
          )}
        </div>
      )}

      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-foreground mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{description}</p>
        </div>
      </div>

      <div className="mt-auto">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link href={`/tools/${slug}`}>
          <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            Open Tool
          </Button>
        </Link>
      </div>
    </div>
  );
}
