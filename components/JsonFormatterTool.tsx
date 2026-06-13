'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Download,
  Trash2,
  AlertCircle,
  CheckCircle,
  AlignLeft,
  Minimize2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatBytes } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';

// ─── Tree View ────────────────────────────────────────────────────────────────

function TreeNode({ data, depth = 0 }: { data: unknown; depth?: number }) {
  const [open, setOpen] = useState(depth < 2); // auto-collapse deep nodes
  const indent = depth * 16;

  if (data === null)
    return <span style={{ marginLeft: indent }} className="text-gray-400 font-mono text-sm">null</span>;
  if (typeof data === 'boolean')
    return <span style={{ marginLeft: indent }} className="text-red-400 font-mono text-sm">{String(data)}</span>;
  if (typeof data === 'number')
    return <span style={{ marginLeft: indent }} className="text-orange-400 font-mono text-sm">{data}</span>;
  if (typeof data === 'string')
    return <span style={{ marginLeft: indent }} className="text-green-400 font-mono text-sm">"{data}"</span>;

  const isArr = Array.isArray(data);
  const entries = Object.entries(data as object);
  const openBracket = isArr ? '[' : '{';
  const closeBracket = isArr ? ']' : '}';

  return (
    <div style={{ marginLeft: indent }} className="font-mono text-sm">
      <button
        onClick={() => setOpen(o => !o)}
        className="text-blue-400 hover:text-blue-200 mr-1 select-none"
        aria-label={open ? 'Collapse' : 'Expand'}
      >
        {open ? '▼' : '▶'}
      </button>
      <span className="text-gray-400">{openBracket}</span>
      {!open && (
        <span 
          className="text-gray-500 cursor-pointer" 
          onClick={() => setOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setOpen(true); }}
        >
          {' '}{entries.length} {isArr ? 'items' : 'keys'}{' '}
        </span>
      )}
      <span className="text-gray-400">{!open ? closeBracket : ''}</span>

      {open && (
        <>
          <div>
            {entries.map(([k, v], i) => (
              <div key={k} className="flex items-start gap-1">
                {!isArr && (
                  <span className="text-blue-300 shrink-0" style={{ marginLeft: 16 }}>
                    "{k}":{' '}
                  </span>
                )}
                <TreeNode data={v} depth={isArr ? depth + 1 : depth + 1} />
                {i < entries.length - 1 && <span className="text-gray-500">,</span>}
              </div>
            ))}
          </div>
          <span className="text-gray-400">{closeBracket}</span>
        </>
      )}
    </div>
  );
}

// ─── Syntax Highlighting ──────────────────────────────────────────────────────

function syntaxHighlight(raw: string): string {
  // Escape HTML entities first
  const escaped = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Single-pass token replacement
  return escaped.replace(
    /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      if (/^"/.test(match)) {
        return match.endsWith(':')
          ? `<span class="json-key">${match}</span>`
          : `<span class="json-string">${match}</span>`;
      }
      if (match === 'true' || match === 'false') return `<span class="json-boolean">${match}</span>`;
      if (match === 'null') return `<span class="json-null">${match}</span>`;
      return `<span class="json-number">${match}</span>`;
    }
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function JsonFormatterTool() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isTreeView, setIsTreeView] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [parsedJson, setParsedJson] = useState<unknown>(null);
  const [autoFormat, setAutoFormat] = useState(true);

  // Track recently used
  useEffect(() => {
    try {
      const SLUG = 'json-formatter';
      const key = 'devtoolbox_recent';
      const prev: string[] = JSON.parse(localStorage.getItem(key) || '[]');
      const next = [SLUG, ...prev.filter(s => s !== SLUG)].slice(0, 4);
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
  }, []);

  // Real-time validation & auto-format
  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      setIsValid(false);
      setParsedJson(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      setParsedJson(parsed);
      setError(null);
      setIsValid(true);
      if (autoFormat) {
        setOutput(JSON.stringify(parsed, null, 2));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid JSON');
      setIsValid(false);
      setParsedJson(null);
      setOutput('');
    }
  }, [input, autoFormat]);

  const stats = useMemo(() => {
    const src = output || input;
    return {
      chars: src.length.toLocaleString(),
      lines: src.split('\n').length.toLocaleString(),
      size: formatBytes(new Blob([src]).size),
    };
  }, [input, output]);

  const lineNumbers = useMemo(
    () => output.split('\n').map((_, i) => i + 1),
    [output]
  );

  const handleFormat = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setParsedJson(parsed);
      setError(null);
      setIsValid(true);
      toast.success('JSON formatted');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(msg);
      setIsValid(false);
      toast.error('Invalid JSON: ' + msg);
    }
  }, [input]);

  const handleMinify = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setParsedJson(parsed);
      setError(null);
      setIsValid(true);
      toast.success('JSON minified');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Invalid JSON';
      setError(msg);
      setIsValid(false);
      toast.error('Invalid JSON: ' + msg);
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
    setIsValid(false);
    setParsedJson(null);
    toast.info('Cleared');
  }, []);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formatted-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('File downloaded');
  }, [output]);

  const copy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      trackEvent('copy_clicked', { tool_name: 'json-formatter' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Copy failed — check browser permissions');
    }
  };

  return (
    <div className="py-4">
      {/* Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Input ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="json-input" className="font-semibold text-base">Input</Label>
            <Button
              variant={autoFormat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setAutoFormat(v => !v)}
              aria-label={`Toggle auto formatting: currently ${autoFormat ? 'enabled' : 'disabled'}`}
            >
              Auto Format: {autoFormat ? 'On' : 'Off'}
            </Button>
          </div>
          <Textarea
            id="json-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={'Paste your JSON here…\n\nExample: {"name":"DevToolbox","version":"1.0"}'}
            className="min-h-[420px] font-mono text-sm bg-card resize-none leading-6 text-foreground"
            spellCheck={false}
          />
        </div>

        {/* ── Output ── */}
        <div className="space-y-3">
          {/* Toolbar */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <Label htmlFor="json-output-container" className="font-semibold text-base">Output</Label>
            <div className="flex flex-wrap gap-2 items-center">
              <Button variant="secondary" size="sm" onClick={handleFormat} disabled={!input.trim()}>
                <AlignLeft className="h-4 w-4 mr-1" /> Format
              </Button>
              <Button variant="secondary" size="sm" onClick={handleMinify} disabled={!input.trim()}>
                <Minimize2 className="h-4 w-4 mr-1" /> Minify
              </Button>
              <button
                onClick={() => copy(output)}
                disabled={!output}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg text-white transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
                  copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                }`}
                aria-label="Copy formatted JSON output"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
              <Button variant="secondary" size="sm" onClick={handleDownload} disabled={!output}>
                <Download className="h-4 w-4 mr-1" /> Download
              </Button>
              <Button variant="secondary" size="sm" onClick={handleClear} aria-label="Clear input and output">
                <Trash2 className="h-4 w-4 mr-1" /> Clear
              </Button>
            </div>
          </div>

          {/* Status */}
          {error && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 text-destructive border border-destructive/20" role="alert">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm font-mono break-all">{error}</span>
            </div>
          )}
          {isValid && output && !error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20" role="status">
              <CheckCircle className="h-4 w-4 flex-shrink-0" />
              <span className="text-sm">Valid JSON</span>
            </div>
          )}

          {/* Output pane */}
          <div id="json-output-container" className="min-h-[420px] bg-card rounded-lg border border-border overflow-hidden flex flex-col">
            {/* View toggle */}
            <div className="flex items-center gap-2 p-2 border-b border-border bg-muted/30">
              <Button
                variant={!isTreeView ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setIsTreeView(false)}
                aria-label="Switch output to code view"
              >
                Code View
              </Button>
              <Button
                variant={isTreeView ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setIsTreeView(true)}
                disabled={!parsedJson}
                aria-label="Switch output to tree view"
              >
                Tree View
              </Button>
            </div>

            {/* Content */}
            {isTreeView && parsedJson ? (
              <div className="flex-1 overflow-auto p-4" tabIndex={0} aria-label="JSON Tree View Representation">
                <TreeNode data={parsedJson} />
              </div>
            ) : (
              <div className="flex flex-1 overflow-hidden">
                {/* Line numbers */}
                {output && (
                  <div className="flex-shrink-0 py-4 px-3 bg-muted/20 text-right select-none border-r border-border overflow-auto" aria-hidden="true">
                    {lineNumbers.map(n => (
                      <div key={n} className="text-xs text-muted-foreground leading-6 font-mono">
                        {n}
                      </div>
                    ))}
                  </div>
                )}
                {/* Code */}
                <div className="flex-1 overflow-auto p-4" tabIndex={0} aria-label="JSON Code View Output">
                  {output ? (
                    <pre
                      className="text-sm font-mono whitespace-pre leading-6"
                      dangerouslySetInnerHTML={{ __html: syntaxHighlight(output) }}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Output will appear here…
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground" role="status" aria-label="Output metrics">
        <span>{stats.chars} chars</span>
        <span>{stats.lines} lines</span>
        <span>{stats.size}</span>
        {isValid && <span className="text-green-500">✓ Valid JSON</span>}
      </div>
    </div>
  );
}
