'use client';
import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { getToolBySlug } from '@/lib/tools-data';
import { toast } from 'sonner';
import yaml from 'js-yaml';

export default function YamlToJsonTool() {
  const [yamlInput, setYamlInput] = useState('title: DevToolbox\nversion: 1.0.0\nfeatures:\n  - JSON Formatter\n  - CSS Flexbox Generator\n  - Git Command Builder\nactive: true');
  const [jsonOutput, setJsonOutput] = useState('');
  const [direction, setDirection] = useState<'yaml-to-json' | 'json-to-yaml'>('yaml-to-json');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const key = 'devtoolbox_recent';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify(['yaml-to-json', ...prev.filter((s: string) => s !== 'yaml-to-json')].slice(0, 4)));
    } catch {}
    convert(yamlInput, direction);
  }, []);

  const convert = (inputStr: string, mode: 'yaml-to-json' | 'json-to-yaml') => {
    setError(null);
    if (!inputStr.trim()) {
      setJsonOutput('');
      return;
    }
    try {
      if (mode === 'yaml-to-json') {
        const parsed = yaml.load(inputStr);
        setJsonOutput(JSON.stringify(parsed, null, 2));
      } else {
        const parsed = JSON.parse(inputStr);
        setJsonOutput(yaml.dump(parsed, { indent: 2 }));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Conversion Error');
    }
  };

  const handleInputChange = (val: string) => {
    setYamlInput(val);
    convert(val, direction);
  };

  const toggleDirection = () => {
    const nextDir = direction === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json';
    setDirection(nextDir);
    setYamlInput(jsonOutput);
    convert(jsonOutput, nextDir);
  };

  const copyResult = async () => {
    if (!jsonOutput) return;
    await navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    toast.success('Result copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-4">
      {/* Direction Toggle bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm" aria-live="polite">
            Current mode: {direction === 'yaml-to-json' ? 'YAML ➜ JSON' : 'JSON ➜ YAML'}
          </span>
          <button
            onClick={toggleDirection}
            className="p-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            aria-label={`Swap conversion direction. Currently ${direction === 'yaml-to-json' ? 'YAML to JSON' : 'JSON to YAML'}`}
            title="Swap Conversion Direction"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={copyResult}
          disabled={!jsonOutput}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg text-white transition-colors duration-200 ${
            copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          } disabled:opacity-40`}
          aria-label="Copy conversion result to clipboard"
        >
          {copied ? '✓ Copied!' : 'Copy Result'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input area */}
        <div className="space-y-2">
          <label htmlFor="yaml-text-input" className="font-semibold text-sm">
            {direction === 'yaml-to-json' ? 'YAML Input' : 'JSON Input'}
          </label>
          <Textarea
            id="yaml-text-input"
            value={yamlInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={direction === 'yaml-to-json' ? 'Paste your YAML code here...' : 'Paste your JSON code here...'}
            className="min-h-[400px] font-mono text-sm bg-card resize-none"
            spellCheck={false}
          />
        </div>

        {/* Output area */}
        <div className="space-y-2">
          <label htmlFor="json-text-output" className="font-semibold text-sm">
            {direction === 'yaml-to-json' ? 'JSON Output' : 'YAML Output'}
          </label>
          {error && (
            <div
              className="p-3 text-xs bg-destructive/10 text-destructive border border-destructive/20 rounded-lg font-mono mb-2 overflow-auto max-h-[80px]"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}
          <Textarea
            id="json-text-output"
            value={jsonOutput}
            readOnly
            placeholder="Result will automatically render here..."
            className="min-h-[400px] font-mono text-sm bg-muted/30 resize-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
