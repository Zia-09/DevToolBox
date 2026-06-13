'use client';
import { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import { getToolBySlug } from '@/lib/tools-data';
import { toast } from 'sonner';

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}
function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}
function hslToHex(h: number, s: number, l: number) {
  l /= 100; s /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1))));
  };
  return `#${[f(0), f(8), f(4)].map(x => x.toString(16).padStart(2, '0')).join('')}`;
}
function isValidHex(h: string) { return /^#[0-9A-Fa-f]{6}$/.test(h); }

export default function ColorConverterTool() {
  const [hex, setHex] = useState('#3B82F6');
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const tool = getToolBySlug('color-converter');

  useEffect(() => {
    try {
      const key = 'devtoolbox_recent';
      const prev: string[] = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify(['color-converter', ...prev.filter(s => s !== 'color-converter')].slice(0, 4)));
    } catch {}
  }, []);

  const updateFromHex = (h: string) => {
    setHex(h);
    if (!isValidHex(h)) return;
    const r = hexToRgb(h);
    setRgb(r);
    setHsl(rgbToHsl(r.r, r.g, r.b));
  };
  const updateFromRgb = (key: 'r'|'g'|'b', val: number) => {
    const n = { ...rgb, [key]: Math.max(0, Math.min(255, val)) };
    setRgb(n);
    const h = `#${[n.r, n.g, n.b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    setHex(h); setHsl(rgbToHsl(n.r, n.g, n.b));
  };
  const updateFromHsl = (key: 'h'|'s'|'l', val: number) => {
    const n = { ...hsl, [key]: val };
    setHsl(n);
    const h = hslToHex(n.h, n.s, n.l);
    setHex(h); setRgb(hexToRgb(h));
  };

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success('Copied: ' + text);
  };

  const CopyBtn = ({ text }: { text: string }) => (
    <button onClick={() => copy(text)}
      className="text-xs px-2 py-1 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors">
      Copy
    </button>
  );

  const presets = ['#EF4444','#F97316','#EAB308','#22C55E','#3B82F6','#8B5CF6','#EC4899','#14B8A6','#000000','#FFFFFF'];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary"><Palette className="h-5 w-5" /></div>
        <h1 className="text-3xl font-bold">{tool?.name}</h1>
      </div>
      <p className="text-muted-foreground mb-8">{tool?.description}</p>

      {/* Color Preview */}
      <div className="h-32 rounded-xl mb-6 border border-border shadow-lg transition-colors duration-200"
        style={{ background: isValidHex(hex) ? hex : '#3B82F6' }} />

      {/* Presets */}
      <div className="flex gap-2 flex-wrap mb-6">
        {presets.map(p => (
          <button key={p} onClick={() => updateFromHex(p)}
            className="w-8 h-8 rounded-lg border-2 border-border hover:scale-110 transition-transform shadow"
            style={{ background: p }} title={p} />
        ))}
      </div>

      {/* Formats */}
      <div className="space-y-4">
        {/* HEX */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-2">
            <label className="font-semibold">HEX</label>
            <CopyBtn text={hex} />
          </div>
          <div className="flex gap-3 items-center">
            <input type="color" value={isValidHex(hex) ? hex : '#3B82F6'} onChange={e => updateFromHex(e.target.value)}
              className="w-12 h-10 rounded cursor-pointer border-0 bg-transparent" />
            <input value={hex} onChange={e => updateFromHex(e.target.value)}
              className="flex-1 font-mono bg-muted/30 border border-border rounded-lg px-3 py-2 text-sm uppercase" />
          </div>
        </div>

        {/* RGB */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="font-semibold">RGB</label>
            <CopyBtn text={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} />
          </div>
          <div className="font-mono text-sm text-muted-foreground mb-3">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
          {(['r','g','b'] as const).map(k => (
            <div key={k} className="flex items-center gap-3 mb-2">
              <span className="w-4 font-bold uppercase text-xs">{k}</span>
              <input type="range" min={0} max={255} value={rgb[k]} onChange={e => updateFromRgb(k, +e.target.value)} className="flex-1" />
              <input type="number" min={0} max={255} value={rgb[k]} onChange={e => updateFromRgb(k, +e.target.value)}
                className="w-16 text-center text-sm bg-muted/30 border border-border rounded px-2 py-1" />
            </div>
          ))}
        </div>

        {/* HSL */}
        <div className="bg-card rounded-xl border border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="font-semibold">HSL</label>
            <CopyBtn text={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} />
          </div>
          <div className="font-mono text-sm text-muted-foreground mb-3">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
          {[{k:'h',max:360,label:'H°'},{k:'s',max:100,label:'S%'},{k:'l',max:100,label:'L%'}].map(({k,max,label}) => (
            <div key={k} className="flex items-center gap-3 mb-2">
              <span className="w-6 text-xs font-bold">{label}</span>
              <input type="range" min={0} max={max} value={hsl[k as 'h'|'s'|'l']} onChange={e => updateFromHsl(k as 'h'|'s'|'l', +e.target.value)} className="flex-1" />
              <input type="number" min={0} max={max} value={hsl[k as 'h'|'s'|'l']} onChange={e => updateFromHsl(k as 'h'|'s'|'l', +e.target.value)}
                className="w-16 text-center text-sm bg-muted/30 border border-border rounded px-2 py-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
