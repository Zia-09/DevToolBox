'use client';
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { getToolBySlug } from '@/lib/tools-data';
import { toast } from 'sonner';

export default function Base64Tool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

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
    <div className="py-4">
      {/* Mode Toggle */}
      <div className="flex gap-2 mb-6" role="group" aria-label="Base64 operation mode">
        {(['encode', 'decode'] as const).map(m => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            aria-pressed={mode === m}
            className={`px-5 py-2 rounded-lg font-medium transition-colors capitalize ${mode === m ? 'bg-primary text-primary-foreground' : 'bg-card border border-border text-muted-foreground hover:border-primary/50'}`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="base64-text-input" className="font-semibold text-sm">
            {mode === 'encode' ? 'Plain Text Input' : 'Base64 Input'}
          </label>
          <Textarea
            id="base64-text-input"
            value={input}
            onChange={e => handleInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Type or paste text to encode…' : 'Paste Base64 string to decode…'}
            className="min-h-[300px] font-mono text-sm bg-card resize-none"
            spellCheck={false}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="base64-text-output" className="font-semibold text-sm">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text Output'}
            </label>
            <div className="flex gap-2">
              <button
                onClick={swap}
                className="px-3 py-1 text-xs rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80"
                aria-label="Swap input with output"
              >
                ⇅ Swap
              </button>
              <button
                onClick={copy}
                disabled={!output}
                className={`px-3 py-1 text-xs rounded-lg text-white transition-colors ${copied ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} disabled:opacity-40`}
                aria-label="Copy output text to clipboard"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
              <button
                onClick={clear}
                className="px-3 py-1 text-xs rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80"
                aria-label="Clear inputs and outputs"
              >
                Clear
              </button>
            </div>
          </div>
          {error && (
            <div
              className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm border border-destructive/20"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}
          <Textarea
            id="base64-text-output"
            value={output}
            readOnly
            placeholder="Output appears here…"
            className="min-h-[300px] font-mono text-sm bg-muted/30 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
