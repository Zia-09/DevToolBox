'use client';
import { useState, useEffect } from 'react';
import { Fingerprint } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getToolBySlug } from '@/lib/tools-data';
import { toast } from 'sonner';

function generateUUID(): string {
  // Simple RFC 4122 v4 compliant UUID generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidGeneratorTool() {
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [braces, setBraces] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const tool = getToolBySlug('uuid-generator');

  useEffect(() => {
    try {
      const key = 'devtoolbox_recent';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify(['uuid-generator', ...prev.filter((s: string) => s !== 'uuid-generator')].slice(0, 4)));
    } catch {}
    generate();
  }, []);

  const generate = () => {
    const list = Array.from({ length: count }, () => {
      let id = generateUUID();
      if (!hyphens) id = id.replace(/-/g, '');
      if (uppercase) id = id.toUpperCase();
      if (braces) id = `{${id}}`;
      return id;
    });
    setUuids(list);
  };

  const copyAll = async () => {
    const text = uuids.join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('UUIDs copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Fingerprint className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold">{tool?.name}</h1>
      </div>
      <p className="text-muted-foreground mb-8">{tool?.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="md:col-span-1 bg-card rounded-xl border border-border p-6 space-y-6">
          <h2 className="font-semibold text-lg">Configuration</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-full bg-muted/30 border border-border rounded-lg px-3 py-2 text-sm text-center font-mono"
            />
          </div>

          <div className="space-y-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded border-border bg-muted"
              />
              <span className="text-sm font-medium">Uppercase</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
                className="rounded border-border bg-muted"
              />
              <span className="text-sm font-medium">Use Hyphens</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={braces}
                onChange={(e) => setBraces(e.target.checked)}
                className="rounded border-border bg-muted"
              />
              <span className="text-sm font-medium">Wrap in Braces</span>
            </label>
          </div>

          <Button onClick={generate} className="w-full mt-4">
            Generate UUIDs
          </Button>
        </div>

        {/* Output */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg">Results</h2>
            <button
              onClick={copyAll}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg text-white transition-colors duration-200 ${
                copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {copied ? '✓ Copied!' : 'Copy All'}
            </button>
          </div>
          
          <div className="bg-card rounded-xl border border-border p-4">
            <pre className="font-mono text-sm overflow-auto max-h-[350px] leading-7 text-foreground selection:bg-primary/20">
              {uuids.join('\n')}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
