'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Layout, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getToolBySlug } from '@/lib/tools-data';
import { copyToClipboard } from '@/lib/utils';
import { analytics } from '@/lib/analytics';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const justifyContentOptions = [
  { value: 'flex-start', label: 'Flex Start' },
  { value: 'center', label: 'Center' },
  { value: 'flex-end', label: 'Flex End' },
  { value: 'space-between', label: 'Space Between' },
  { value: 'space-around', label: 'Space Around' },
  { value: 'space-evenly', label: 'Space Evenly' },
];

const alignItemsOptions = [
  { value: 'flex-start', label: 'Flex Start' },
  { value: 'center', label: 'Center' },
  { value: 'flex-end', label: 'Flex End' },
  { value: 'stretch', label: 'Stretch' },
  { value: 'baseline', label: 'Baseline' },
];

const flexDirectionOptions = [
  { value: 'row', label: 'Row' },
  { value: 'row-reverse', label: 'Row Reverse' },
  { value: 'column', label: 'Column' },
  { value: 'column-reverse', label: 'Column Reverse' },
];

const flexWrapOptions = [
  { value: 'nowrap', label: 'No Wrap' },
  { value: 'wrap', label: 'Wrap' },
  { value: 'wrap-reverse', label: 'Wrap Reverse' },
];

const childBoxColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-purple-500',
  'bg-cyan-500',
  'bg-orange-500',
  'bg-pink-500',
];

export default function FlexboxGeneratorPage() {
  const [flexDirection, setFlexDirection] = useState('row');
  const [justifyContent, setJustifyContent] = useState('flex-start');
  const [alignItems, setAlignItems] = useState('stretch');
  const [flexWrap, setFlexWrap] = useState('nowrap');
  const [gap, setGap] = useState(10);
  const [childCount, setChildCount] = useState(4);
  const [copied, setCopied] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const tool = getToolBySlug('css-flexbox-generator');

  useEffect(() => {
    if (tool) {
      analytics.toolOpened(tool.name, tool.slug);
    }

    const recent = JSON.parse(localStorage.getItem('devtoolbox_recent') || '[]');
    if (tool && !recent.includes(tool.id)) {
      const updated = [tool.id, ...recent.filter((id: string) => id !== tool.id)].slice(0, 4);
      localStorage.setItem('devtoolbox_recent', JSON.stringify(updated));
    }

    return () => {
      if (tool) {
        const seconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        if (seconds >= 3) {
          analytics.toolPageTime(tool.name, seconds);
        }
      }
    };
  }, [tool]);

  const containerStyles = useMemo(() => ({
    display: 'flex',
    flexDirection: flexDirection as React.CSSProperties['flexDirection'],
    justifyContent: justifyContent as React.CSSProperties['justifyContent'],
    alignItems: alignItems as React.CSSProperties['alignItems'],
    flexWrap: flexWrap as React.CSSProperties['flexWrap'],
    gap: `${gap}px`,
  }), [flexDirection, justifyContent, alignItems, flexWrap, gap]);

  const generatedCss = useMemo(() => {
    return `.container {
  display: flex;
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gap}px;
}`;
  }, [flexDirection, justifyContent, alignItems, flexWrap, gap]);

  const handleCopy = useCallback(async () => {
    const success = await copyToClipboard(generatedCss);
    if (success) {
      setCopied(true);
      if (tool) {
        analytics.copyClicked(tool.name, 'generated-css');
      }
      toast.success('CSS copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy');
    }
  }, [generatedCss, tool]);

  // Get inline CSS for the preview
  const previewInlineCss = `display: flex;
flex-direction: ${flexDirection};
justify-content: ${justifyContent};
align-items: ${alignItems};
flex-wrap: ${flexWrap};
gap: ${gap}px;`;

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {tool && (
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Layout className="h-5 w-5" />
              </div>
            )}
            <h1 className="text-3xl font-bold">{tool?.name || 'CSS Flexbox Generator'}</h1>
          </div>
          <p className="text-muted-foreground">{tool?.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Panel */}
          <div className="space-y-6 p-6 bg-card rounded-xl border border-border">
            <h2 className="font-semibold text-lg">Controls</h2>

            {/* Flex Direction */}
            <div className="space-y-2">
              <Label htmlFor="flex-direction">Flex Direction</Label>
              <Select value={flexDirection} onValueChange={setFlexDirection}>
                <SelectTrigger id="flex-direction">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {flexDirectionOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Justify Content */}
            <div className="space-y-2">
              <Label htmlFor="justify-content">Justify Content</Label>
              <Select value={justifyContent} onValueChange={setJustifyContent}>
                <SelectTrigger id="justify-content">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {justifyContentOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Align Items */}
            <div className="space-y-2">
              <Label htmlFor="align-items">Align Items</Label>
              <Select value={alignItems} onValueChange={setAlignItems}>
                <SelectTrigger id="align-items">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {alignItemsOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Flex Wrap */}
            <div className="space-y-2">
              <Label htmlFor="flex-wrap">Flex Wrap</Label>
              <Select value={flexWrap} onValueChange={setFlexWrap}>
                <SelectTrigger id="flex-wrap">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {flexWrapOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Gap */}
            <div className="space-y-2">
              <Label>Gap: {gap}px</Label>
              <Slider
                value={[gap]}
                onValueChange={(val) => setGap(val[0])}
                min={0}
                max={40}
                step={1}
              />
            </div>

            {/* Child Count */}
            <div className="space-y-2">
              <Label>Child Boxes: {childCount}</Label>
              <Slider
                value={[childCount]}
                onValueChange={(val) => setChildCount(val[0])}
                min={1}
                max={8}
                step={1}
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-semibold text-lg">Live Preview</h2>
            <div className="min-h-[400px] bg-muted/30 rounded-xl border border-border p-4 overflow-auto">
              <div
                style={containerStyles}
                className="h-full min-h-[300px] bg-card rounded-lg border border-border p-4"
              >
                {Array.from({ length: childCount }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center justify-center font-bold text-white rounded-lg min-w-[60px] min-h-[60px] transition-all duration-200',
                      childBoxColors[i % childBoxColors.length]
                    )}
                    style={{ width: '80px', height: flexDirection.includes('column') ? '40px' : '80px' }}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Generated CSS Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">Generated CSS</h2>
              <Button variant="secondary" size="sm" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <pre className="p-4 text-sm font-mono overflow-auto max-h-[400px]">
                <code>{generatedCss}</code>
              </pre>
            </div>

            {/* Preview CSS */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm">Inline Style (for quick copy)</h3>
              <div className="bg-card rounded-lg border border-border p-3">
                <code className="text-xs font-mono text-muted-foreground break-all">{previewInlineCss}</code>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={async () => {
                  const success = await copyToClipboard(previewInlineCss);
                  if (success) {
                    toast.success('Inline CSS copied!');
                    if (tool) analytics.copyClicked(tool.name, 'inline-css');
                  }
                }}
              >
                <Copy className="h-4 w-4 mr-1" /> Copy Inline
              </Button>
            </div>

            {/* Quick Reference */}
            <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
              <h3 className="font-medium mb-2">Quick Reference</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><code className="text-primary">flex-direction</code>: Main axis direction</li>
                <li><code className="text-primary">justify-content</code>: Align on main axis</li>
                <li><code className="text-primary">align-items</code>: Align on cross axis</li>
                <li><code className="text-primary">flex-wrap</code>: Wrap behavior</li>
                <li><code className="text-primary">gap</code>: Space between items</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
