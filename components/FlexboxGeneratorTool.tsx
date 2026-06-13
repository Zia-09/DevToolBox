'use client';

import { useState, useEffect, useMemo } from 'react';
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
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';

const FLEX_DIRECTIONS = [
  { value: 'row', label: 'Row →' },
  { value: 'row-reverse', label: '← Row Reverse' },
  { value: 'column', label: 'Column ↓' },
  { value: 'column-reverse', label: '↑ Column Reverse' },
];

const JUSTIFY_CONTENT = [
  { value: 'flex-start', label: 'Flex Start' },
  { value: 'center', label: 'Center' },
  { value: 'flex-end', label: 'Flex End' },
  { value: 'space-between', label: 'Space Between' },
  { value: 'space-around', label: 'Space Around' },
  { value: 'space-evenly', label: 'Space Evenly' },
];

const ALIGN_ITEMS = [
  { value: 'flex-start', label: 'Flex Start' },
  { value: 'center', label: 'Center' },
  { value: 'flex-end', label: 'Flex End' },
  { value: 'stretch', label: 'Stretch' },
  { value: 'baseline', label: 'Baseline' },
];

const FLEX_WRAP = [
  { value: 'nowrap', label: 'No Wrap' },
  { value: 'wrap', label: 'Wrap' },
  { value: 'wrap-reverse', label: 'Wrap Reverse' },
];

const BOX_COLORS = [
  '#3B82F6', '#10B981', '#F59E0B',
  '#EF4444', '#8B5CF6', '#EC4899',
  '#06B6D4', '#84CC16',
];

interface Settings {
  flexDirection: string;
  justifyContent: string;
  alignItems: string;
  flexWrap: string;
  gap: number;
  count: number;
}

export default function FlexboxGeneratorTool() {
  const [settings, setSettings] = useState<Settings>({
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexWrap: 'nowrap',
    gap: 8,
    count: 4,
  });

  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedInline, setCopiedInline] = useState(false);

  // Track recently used
  useEffect(() => {
    try {
      const SLUG = 'css-flexbox-generator';
      const key = 'devtoolbox_recent';
      const prev: string[] = JSON.parse(localStorage.getItem(key) || '[]');
      const next = [SLUG, ...prev.filter(s => s !== SLUG)].slice(0, 4);
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
  }, []);

  const set = (key: keyof Settings, val: string | number) =>
    setSettings(prev => ({ ...prev, [key]: val }));

  const cssCode = useMemo(() => `.container {
  display: flex;
  flex-direction: ${settings.flexDirection};
  justify-content: ${settings.justifyContent};
  align-items: ${settings.alignItems};
  flex-wrap: ${settings.flexWrap};
  gap: ${settings.gap}px;
}`, [settings]);

  const inlineCss = useMemo(
    () =>
      `display:flex; flex-direction:${settings.flexDirection}; justify-content:${settings.justifyContent}; align-items:${settings.alignItems}; flex-wrap:${settings.flexWrap}; gap:${settings.gap}px;`,
    [settings]
  );

  const copyCss = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopiedCss(true);
      trackEvent('copy_clicked', { tool_name: 'css-flexbox-generator', type: 'css' });
      toast.success('CSS copied!');
      setTimeout(() => setCopiedCss(false), 2000);
    } catch {
      toast.error('Copy failed');
    }
  };

  const copyInline = async () => {
    try {
      await navigator.clipboard.writeText(inlineCss);
      setCopiedInline(true);
      trackEvent('copy_clicked', { tool_name: 'css-flexbox-generator', type: 'inline' });
      toast.success('Inline style copied!');
      setTimeout(() => setCopiedInline(false), 2000);
    } catch {
      toast.error('Copy failed');
    }
  };

  const previewStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: settings.flexDirection as React.CSSProperties['flexDirection'],
    justifyContent: settings.justifyContent,
    alignItems: settings.alignItems,
    flexWrap: settings.flexWrap as React.CSSProperties['flexWrap'],
    gap: `${settings.gap}px`,
    minHeight: '200px',
    width: '100%',
    padding: '12px',
  };

  return (
    <div className="py-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Controls ── */}
        <div className="space-y-5 p-6 bg-card rounded-xl border border-border">
          <h2 className="font-semibold text-lg">Controls</h2>

          <div className="space-y-2">
            <Label htmlFor="flex-dir-select">Flex Direction</Label>
            <Select value={settings.flexDirection} onValueChange={v => set('flexDirection', v)}>
              <SelectTrigger id="flex-dir-select" aria-label="Select flex direction">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FLEX_DIRECTIONS.map(o => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="justify-select">Justify Content</Label>
            <Select value={settings.justifyContent} onValueChange={v => set('justifyContent', v)}>
              <SelectTrigger id="justify-select" aria-label="Select justify content">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {JUSTIFY_CONTENT.map(o => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="align-select">Align Items</Label>
            <Select value={settings.alignItems} onValueChange={v => set('alignItems', v)}>
              <SelectTrigger id="align-select" aria-label="Select align items">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALIGN_ITEMS.map(o => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wrap-select">Flex Wrap</Label>
            <Select value={settings.flexWrap} onValueChange={v => set('flexWrap', v)}>
              <SelectTrigger id="wrap-select" aria-label="Select flex wrap">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {FLEX_WRAP.map(o => (
                  <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="gap-slider">Gap</Label>
              <span className="text-sm text-muted-foreground font-mono">{settings.gap}px</span>
            </div>
            <Slider
              id="gap-slider"
              value={[settings.gap]}
              onValueChange={([v]) => set('gap', v)}
              min={0} max={48} step={2}
              aria-label="Flex container gap slider"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label htmlFor="count-slider">Child Boxes</Label>
              <span className="text-sm text-muted-foreground font-mono">{settings.count}</span>
            </div>
            <Slider
              id="count-slider"
              value={[settings.count]}
              onValueChange={([v]) => set('count', v)}
              min={1} max={8} step={1}
              aria-label="Child boxes count slider"
            />
          </div>
        </div>

        {/* ── Live Preview ── */}
        <div className="space-y-4">
          <h2 className="font-semibold text-lg">Live Preview</h2>
          <div className="rounded-xl border border-border bg-muted/20 overflow-auto min-h-[300px] p-4 flex items-center justify-center">
            <div style={previewStyle} role="region" aria-label="Flexbox container preview">
              {Array.from({ length: settings.count }, (_, i) => (
                <div
                  key={i}
                  style={{
                    width: 56,
                    height: 56,
                    background: BOX_COLORS[i % BOX_COLORS.length],
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 16,
                    flexShrink: 0,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  }}
                  aria-label={`Box ${i + 1}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Reference */}
          <div className="p-4 bg-card rounded-lg border border-border text-sm">
            <p className="font-medium mb-2 text-muted-foreground uppercase tracking-wider text-xs">Quick Reference</p>
            <dl className="space-y-1">
              {[
                ['flex-direction', 'Main axis direction'],
                ['justify-content', 'Align on main axis'],
                ['align-items', 'Align on cross axis'],
                ['flex-wrap', 'Multi-line behavior'],
                ['gap', 'Space between items'],
              ].map(([prop, desc]) => (
                <div key={prop} className="flex gap-2">
                  <dt><code className="text-primary text-xs">{prop}</code></dt>
                  <dd className="text-muted-foreground text-xs">— {desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* ── Generated CSS ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-lg">Generated CSS</h2>
            <button
              onClick={copyCss}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg text-white transition-colors duration-200 ${
                copiedCss ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              aria-label="Copy CSS code"
            >
              {copiedCss ? '✓ Copied!' : 'Copy CSS'}
            </button>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <pre className="p-4 text-sm font-mono overflow-auto text-foreground leading-6" tabIndex={0} aria-label="Generated CSS code block">{cssCode}</pre>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Inline Style</p>
              <button
                onClick={copyInline}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg text-white transition-colors duration-200 ${
                  copiedInline ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                aria-label="Copy inline CSS code"
              >
                {copiedInline ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <div className="bg-card rounded-lg border border-border p-3">
              <code className="text-xs font-mono text-muted-foreground break-all leading-5" tabIndex={0} aria-label="Generated inline CSS code block">
                {inlineCss}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
