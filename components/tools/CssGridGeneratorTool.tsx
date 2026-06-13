'use client';
import { useState, useEffect } from 'react';
import { Grid } from 'lucide-react';
import { getToolBySlug } from '@/lib/tools-data';
import { toast } from 'sonner';

export default function CssGridGeneratorTool() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [columnGap, setColumnGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  
  const tool = getToolBySlug('css-grid-generator');

  useEffect(() => {
    try {
      const key = 'devtoolbox_recent';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify(['css-grid-generator', ...prev.filter((s: string) => s !== 'css-grid-generator')].slice(0, 4)));
    } catch {}
  }, []);

  const totalItems = columns * rows;

  const cssCode = `display: grid;
grid-template-columns: repeat(${columns}, 1fr);
grid-template-rows: repeat(${rows}, 1fr);
column-gap: ${columnGap}px;
row-gap: ${rowGap}px;`;

  const htmlCode = `<div className="grid-container">
${Array.from({ length: totalItems }, (_, i) => `  <div className="grid-item">${i + 1}</div>`).join('\n')}
</div>`;

  const copyText = async (text: string, type: 'css' | 'html') => {
    await navigator.clipboard.writeText(text);
    if (type === 'css') {
      setCopiedCss(true);
      toast.success('CSS rules copied!');
      setTimeout(() => setCopiedCss(false), 2000);
    } else {
      setCopiedHtml(true);
      toast.success('HTML structure copied!');
      setTimeout(() => setCopiedHtml(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Grid className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold">{tool?.name}</h1>
      </div>
      <p className="text-muted-foreground mb-8">{tool?.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 bg-card rounded-xl border border-border p-6 space-y-6">
          <h2 className="font-semibold text-lg">Grid Settings</h2>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Columns ({columns})</span>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              value={columns}
              onChange={(e) => setColumns(+e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Rows ({rows})</span>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              value={rows}
              onChange={(e) => setRows(+e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Column Gap ({columnGap}px)</span>
            </div>
            <input
              type="range"
              min={0}
              max={80}
              value={columnGap}
              onChange={(e) => setColumnGap(+e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Row Gap ({rowGap}px)</span>
            </div>
            <input
              type="range"
              min={0}
              max={80}
              value={rowGap}
              onChange={(e) => setRowGap(+e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-semibold text-lg mb-4">Live Preview</h2>
            <div
              className="bg-muted/20 border border-border rounded-lg p-4 min-h-[300px]"
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                columnGap: `${columnGap}px`,
                rowGap: `${rowGap}px`,
              }}
            >
              {Array.from({ length: totalItems }).map((_, index) => (
                <div
                  key={index}
                  className="bg-primary/10 border border-primary/20 hover:border-primary/50 text-primary rounded-lg flex items-center justify-center p-4 font-mono text-sm font-semibold transition-colors min-h-[50px]"
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Generated Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-sm">CSS rules</label>
                <button
                  onClick={() => copyText(cssCode, 'css')}
                  className={`text-xs px-2 py-1 rounded text-white transition-colors ${
                    copiedCss ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {copiedCss ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-3 bg-muted/30 border border-border rounded-lg font-mono text-xs overflow-auto h-[120px]">
                {cssCode}
              </pre>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-sm">HTML structure</label>
                <button
                  onClick={() => copyText(htmlCode, 'html')}
                  className={`text-xs px-2 py-1 rounded text-white transition-colors ${
                    copiedHtml ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {copiedHtml ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="p-3 bg-muted/30 border border-border rounded-lg font-mono text-xs overflow-auto h-[120px]">
                {htmlCode}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
