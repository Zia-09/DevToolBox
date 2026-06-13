'use client';
import { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { getToolBySlug } from '@/lib/tools-data';
import { toast } from 'sonner';

export default function JwtDecoderTool() {
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE4MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copiedHeader, setCopiedHeader] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const tool = getToolBySlug('jwt-decoder');

  useEffect(() => {
    try {
      const key = 'devtoolbox_recent';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify(['jwt-decoder', ...prev.filter((s: string) => s !== 'jwt-decoder')].slice(0, 4)));
    } catch {}
    decodeToken(token);
  }, []);

  const decodeToken = (jwt: string) => {
    setError(null);
    setHeader('');
    setPayload('');
    if (!jwt.trim()) return;

    const parts = jwt.split('.');
    if (parts.length !== 3) {
      setError('Invalid JWT structure. A JWT must consist of three parts separated by dots.');
      return;
    }

    try {
      // Decode Header (part 0)
      const decodedHeader = atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'));
      setHeader(JSON.stringify(JSON.parse(decodedHeader), null, 2));

      // Decode Payload (part 1)
      const decodedPayload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
      setPayload(JSON.stringify(JSON.parse(decodedPayload), null, 2));
    } catch (e) {
      setError('Failed to base64 decode JWT token. Please check validity.');
    }
  };

  const handleInputChange = (val: string) => {
    setToken(val);
    decodeToken(val);
  };

  const copySection = async (text: string, type: 'header' | 'payload') => {
    await navigator.clipboard.writeText(text);
    if (type === 'header') {
      setCopiedHeader(true);
      toast.success('Header copied!');
      setTimeout(() => setCopiedHeader(false), 2000);
    } else {
      setCopiedPayload(true);
      toast.success('Payload copied!');
      setTimeout(() => setCopiedPayload(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold">{tool?.name}</h1>
      </div>
      <p className="text-muted-foreground mb-8">{tool?.description}</p>

      <div className="space-y-6">
        {/* Token Input */}
        <div className="space-y-2">
          <label className="font-semibold text-sm">Paste Token</label>
          <Textarea
            value={token}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1Ni..."
            className="font-mono text-sm min-h-[120px] bg-card resize-none break-all"
            spellCheck={false}
          />
        </div>

        {error && (
          <div className="p-3 text-xs bg-destructive/10 text-destructive border border-destructive/20 rounded-lg font-mono">
            {error}
          </div>
        )}

        {/* Header & Payload Output */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-sm text-red-400">Header: Algorithm & Token Type</label>
              <button
                onClick={() => copySection(header, 'header')}
                disabled={!header}
                className={`text-xs px-2 py-1 rounded text-white transition-colors ${
                  copiedHeader ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                } disabled:opacity-40`}
              >
                {copiedHeader ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 rounded-lg border border-border bg-muted/30 font-mono text-xs min-h-[220px] overflow-auto">
              {header || <span className="text-muted-foreground">Header will render here...</span>}
            </pre>
          </div>

          {/* Payload */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-sm text-blue-400">Payload: Data / Claims</label>
              <button
                onClick={() => copySection(payload, 'payload')}
                disabled={!payload}
                className={`text-xs px-2 py-1 rounded text-white transition-colors ${
                  copiedPayload ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
                } disabled:opacity-40`}
              >
                {copiedPayload ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-4 rounded-lg border border-border bg-muted/30 font-mono text-xs min-h-[220px] overflow-auto">
              {payload || <span className="text-muted-foreground">Payload will render here...</span>}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
