'use client';
import { useState, useEffect } from 'react';
import { Binary } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { getToolBySlug } from '@/lib/tools-data';
import { toast } from 'sonner';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const tool = getToolBySlug('base64-encoder');

  useEffect(() => {
    try {
      const key = 'devtoolbox_recent';
      const prev: string[] = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify(['base64-encoder', ...prev.filter(s => s !== 'base64-encoder')].slice(0, 4)));
    } catch {}
  }, []);

  const process = (val = input, m = mode) => {
    setError('');
    if (!val.trim()) { setOutput(''); return; }
    try {
      if (m === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(val))));
      } else {
        setOutput(decodeURIComponent(escape(atob(val.trim()))));
      }
    } catch {
      setError(m === 'encode' ? 'Encoding error' : 'Invalid Base64 string');
      setOutput('');
    }
  };

  const handleInput = (val: string) => { setInput(val); process(val, mode); };
  const switchMode = (m: 'encode' | 'decode') => { setMode(m); process(input, m); };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true); toast.success('Copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const clear = () => { setInput(''); setOutput(''); setError(''); };
  const swap = () => { setInput(output); process(output, mode); };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary"><Binary className="h-5 w-5" /></div>
        <h1 className="text-3xl font-bold">{tool?.name}</h1>
      </div>
      <p className="text-muted-foreground mb-8">{tool?.description}</p>

      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6">
        {(['encode', 'decode'] as const).map(m => (
          <button key={m} onClick={() => switchMode(m)}
            className={`px-5 py-2 rounded-lg font-medium transition-colors capitalize ${mode === m ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:border-primary/50'}`}>
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-semibold">{mode === 'encode' ? 'Plain Text' : 'Base64 Input'}</label>
          <Textarea value={input} onChange={e => handleInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Type or paste text to encode…' : 'Paste Base64 string to decode…'}
            className="min-h-[300px] font-mono text-sm bg-card resize-none" spellCheck={false} />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="font-semibold">{mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}</label>
            <div className="flex gap-2">
              <button onClick={swap} className="px-3 py-1 text-xs rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80">⇅ Swap</button>
              <button onClick={copy} disabled={!output}
                className={`px-3 py-1 text-xs rounded-lg text-white transition-colors ${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} disabled:opacity-40`}>
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
              <button onClick={clear} className="px-3 py-1 text-xs rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80">Clear</button>
            </div>
          </div>
          {error && <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20">{error}</div>}
          <Textarea value={output} readOnly placeholder="Output appears here…"
            className="min-h-[300px] font-mono text-sm bg-muted/30 resize-none" />
        </div>
      </div>
    </div>
  );
}
