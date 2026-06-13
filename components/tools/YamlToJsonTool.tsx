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
  const tool = getToolBySlug('yaml-to-json');

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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <RefreshCw className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold">{tool?.name}</h1>
      </div>
      <p className="text-muted-foreground mb-8">{tool?.description}</p>

      {/* Direction Toggle bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm">
            {direction === 'yaml-to-json' ? 'YAML ➜ JSON' : 'JSON ➜ YAML'}
          </span>
          <button
            onClick={toggleDirection}
            className="p-1.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
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
        >
          {copied ? '✓ Copied!' : 'Copy Result'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input area */}
        <div className="space-y-2">
          <label className="font-semibold text-sm">
            {direction === 'yaml-to-json' ? 'YAML Input' : 'JSON Input'}
          </label>
          <Textarea
            value={yamlInput}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={direction === 'yaml-to-json' ? 'Paste your YAML code here...' : 'Paste your JSON code here...'}
            className="min-h-[400px] font-mono text-sm bg-card resize-none"
            spellCheck={false}
          />
        </div>

        {/* Output area */}
        <div className="space-y-2">
          <label className="font-semibold text-sm">
            {direction === 'yaml-to-json' ? 'JSON Output' : 'YAML Output'}
          </label>
          {error && (
            <div className="p-3 text-xs bg-destructive/10 text-destructive border border-destructive/20 rounded-lg font-mono mb-2 overflow-auto max-h-[80px]">
              {error}
            </div>
          )}
          <Textarea
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
