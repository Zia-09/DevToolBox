'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Braces,
  Copy,
  Download,
  Trash2,
  Check,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  AlignLeft,
  Minimize2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getToolBySlug } from '@/lib/tools-data';
import { copyToClipboard, formatBytes } from '@/lib/utils';
import { analytics } from '@/lib/analytics';
import { toast } from 'sonner';

function JsonTreeView({ data }: { data: unknown }) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (path: string) => {
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderNode = (key: string | undefined, value: unknown, path: string, depth: number): React.ReactNode => {
    const isExpanded = expanded[path] ?? (depth < 2);
    const indentStyle = { marginLeft: `${depth * 16}px` };

    if (value === null) {
      return (
        <div key={path} style={indentStyle} className="font-mono text-sm py-0.5">
          {key !== undefined && <><span className="json-key">{key}</span>: </>}
          <span className="json-null">null</span>
        </div>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <div key={path} style={indentStyle} className="font-mono text-sm py-0.5">
          {key !== undefined && <><span className="json-key">{key}</span>: </>}
          <span className="json-boolean">{value.toString()}</span>
        </div>
      );
    }

    if (typeof value === 'number') {
      return (
        <div key={path} style={indentStyle} className="font-mono text-sm py-0.5">
          {key !== undefined && <><span className="json-key">{key}</span>: </>}
          <span className="json-number">{value}</span>
        </div>
      );
    }

    if (typeof value === 'string') {
      return (
        <div key={path} style={indentStyle} className="font-mono text-sm py-0.5">
          {key !== undefined && <><span className="json-key">{key}</span>: </>}
          <span className="json-string">"{value}"</span>
        </div>
      );
    }

    if (Array.isArray(value)) {
      return (
        <div key={path}>
          <div style={indentStyle} className="font-mono text-sm py-0.5 flex items-center gap-1">
            <button onClick={() => toggleExpand(path)} className="hover:bg-accent rounded p-0.5">
              {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </button>
            {key !== undefined && <><span className="json-key">{key}</span>: </>}
            <span className="text-muted-foreground">[{value.length}{!isExpanded && '...'}]</span>
          </div>
          {isExpanded && (
            <>
              {value.map((item, idx) => renderNode(undefined, item, `${path}[${idx}]`, depth + 1))}
              <div style={indentStyle} className="font-mono text-sm text-muted-foreground">]</div>
            </>
          )}
        </div>
      );
    }

    if (typeof value === 'object') {
      const entries = Object.entries(value as Record<string, unknown>);
      return (
        <div key={path}>
          <div style={indentStyle} className="font-mono text-sm py-0.5 flex items-center gap-1">
            <button onClick={() => toggleExpand(path)} className="hover:bg-accent rounded p-0.5">
              {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
            </button>
            {key !== undefined && <><span className="json-key">{key}</span>: </>}
            <span className="text-muted-foreground">{'{'}</span>
            {!isExpanded && <span className="text-muted-foreground">...{entries.length} keys{'}'}</span>}
            {isExpanded && entries.length === 0 && <span className="text-muted-foreground">{'}'}</span>}
          </div>
          {isExpanded && entries.length > 0 && (
            <>
              {entries.map(([k, v]) => renderNode(k, v, `${path}.${k}`, depth + 1))}
              <div style={indentStyle} className="font-mono text-sm text-muted-foreground">{'}'}</div>
            </>
          )}
        </div>
      );
    }

    return null;
  };

  return <div className="py-2">{renderNode(undefined, data, 'root', 0)}</div>;
}

function syntaxHighlight(json: string): string {
  return json
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(?=\s*:))/g, '<span class="json-key">$1</span>')
    .replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(?!\s*:))/g, '<span class="json-string">$1</span>')
    .replace(/\b(true|false)\b/g, '<span class="json-boolean">$1</span>')
    .replace(/\bnull\b/g, '<span class="json-null">null</span>')
    .replace(/\b(\d+\.?\d*)\b/g, '<span class="json-number">$1</span>');
}

export default function JsonFormatterPage() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isTreeView, setIsTreeView] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [parsedJson, setParsedJson] = useState<unknown>(null);
  const [autoFormat, setAutoFormat] = useState(true);
  const startTimeRef = useRef<number>(Date.now());

  const tool = getToolBySlug('json-formatter');

  // Track tool opened and page time
  useEffect(() => {
    if (tool) {
      analytics.toolOpened(tool.name, tool.slug);
    }

    // Track recently used
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

  // Real-time validation and formatting
  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      setIsValid(true);
      setParsedJson(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      setParsedJson(parsed);
      setError(null);
      setIsValid(true);

      if (autoFormat) {
        const formatted = JSON.stringify(parsed, null, 2);
        setOutput(formatted);
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Invalid JSON';
      setError(errorMessage);
      setIsValid(false);
      setParsedJson(null);
      setOutput('');
    }
  }, [input, autoFormat]);

  const stats = useMemo(() => {
    const charCount = output.length || input.length;
    const lineCount = (output || input).split('\n').length;
    const sizeBytes = new Blob([output || input]).size;

    return {
      charCount,
      lineCount,
      sizeBytes: formatBytes(sizeBytes),
    };
  }, [input, output]);

  const handleFormat = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setParsedJson(parsed);
      setError(null);
      setIsValid(true);
      toast.success('JSON formatted successfully');
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Invalid JSON';
      setError(errorMessage);
      setIsValid(false);
      toast.error('Invalid JSON: ' + errorMessage);
    }
  }, [input]);

  const handleMinify = useCallback(() => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setParsedJson(parsed);
      setError(null);
      setIsValid(true);
      toast.success('JSON minified successfully');
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Invalid JSON';
      setError(errorMessage);
      setIsValid(false);
      toast.error('Invalid JSON: ' + errorMessage);
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
    setIsValid(true);
    setParsedJson(null);
    toast.info('Cleared');
  }, []);

  const handleCopy = useCallback(async () => {
    if (!output) return;
    const success = await copyToClipboard(output);
    if (success) {
      setCopied(true);
      if (tool) {
        analytics.copyClicked(tool.name, 'output');
      }
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy');
    }
  }, [output, tool]);

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

  const lineNumbers = useMemo(() => {
    return output.split('\n').map((_, i) => i + 1);
  }, [output]);

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {tool && (
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Braces className="h-5 w-5" />
              </div>
            )}
            <h1 className="text-3xl font-bold">{tool?.name || 'JSON Formatter'}</h1>
          </div>
          <p className="text-muted-foreground">{tool?.description}</p>
        </div>

        {/* Main Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Input</h2>
              <div className="flex gap-2">
                <Button
                  variant={autoFormat ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setAutoFormat(!autoFormat)}
                >
                  Auto Format: {autoFormat ? 'On' : 'Off'}
                </Button>
              </div>
            </div>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="min-h-[400px] font-mono text-sm bg-card resize-none"
            />
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="font-semibold">Output</h2>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handleFormat}>
                  <AlignLeft className="h-4 w-4 mr-1" />
                  Format
                </Button>
                <Button variant="secondary" size="sm" onClick={handleMinify}>
                  <Minimize2 className="h-4 w-4 mr-1" />
                  Minify
                </Button>
                <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!output}>
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button variant="secondary" size="sm" onClick={handleDownload} disabled={!output}>
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
                <Button variant="secondary" size="sm" onClick={handleClear}>
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear
                </Button>
              </div>
            </div>

            {/* Status Banner */}
            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive border border-destructive/20">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}
            {isValid && output && !error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">Valid JSON</span>
              </div>
            )}

            {/* Output Content */}
            <div className="min-h-[400px] bg-card rounded-lg border border-border overflow-hidden">
              <div className="flex items-center justify-between p-2 border-b border-border bg-muted/30">
                <Button
                  variant={isTreeView ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setIsTreeView(true)}
                >
                  Tree View
                </Button>
                <Button
                  variant={!isTreeView ? 'default' : 'secondary'}
                  size="sm"
                  onClick={() => setIsTreeView(false)}
                >
                  Code View
                </Button>
              </div>
              {isTreeView && parsedJson ? (
                <div className="p-4 overflow-auto max-h-[350px]">
                  <JsonTreeView data={parsedJson} />
                </div>
              ) : (
                <div className="flex h-full">
                  {/* Line numbers */}
                  {output && (
                    <div className="flex-shrink-0 py-4 px-2 bg-muted/30 text-right select-none border-r border-border overflow-auto max-h-[350px]">
                      {lineNumbers.map((num) => (
                        <div key={num} className="text-xs text-muted-foreground leading-6 font-mono">
                          {num}
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Output content */}
                  <div className="flex-1 overflow-auto p-4 max-h-[350px]">
                    {output ? (
                      <pre
                        className="text-sm font-mono whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: syntaxHighlight(output.replace(/</g, '&lt;').replace(/>/g, '&gt;')) }}
                      />
                    ) : (
                      <pre className="text-sm text-muted-foreground">Output will appear here...</pre>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
          <span>{stats.charCount.toLocaleString()} characters</span>
          <span>{stats.lineCount.toLocaleString()} lines</span>
          <span>{stats.sizeBytes}</span>
        </div>
      </div>
    </main>
  );
}
