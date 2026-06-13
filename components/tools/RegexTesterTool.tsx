'use client';
import { useState, useEffect, useMemo } from 'react';
import { SearchCode } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { getToolBySlug } from '@/lib/tools-data';
import { toast } from 'sonner';

export default function RegexTesterTool() {
  const [regex, setRegex] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Contact us at support@devtoolbox.io or info@example.com for help.');
  const tool = getToolBySlug('regex-tester');

  useEffect(() => {
    try {
      const key = 'devtoolbox_recent';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify(['regex-tester', ...prev.filter((s: string) => s !== 'regex-tester')].slice(0, 4)));
    } catch {}
  }, []);

  const { matches, error } = useMemo(() => {
    if (!regex) return { matches: [], error: null };
    try {
      const re = new RegExp(regex, flags.includes('g') ? flags : flags + 'g');
      const found: RegExpExecArray[] = [];
      let match;
      re.lastIndex = 0;
      
      if (flags.includes('g')) {
        while ((match = re.exec(text)) !== null) {
          found.push(match);
          if (match.index === re.lastIndex) re.lastIndex++; // Prevent infinite loop
        }
      } else {
        match = re.exec(text);
        if (match) found.push(match);
      }
      return { matches: found, error: null };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : 'Invalid Regular Expression' };
    }
  }, [regex, flags, text]);

  const highlightedText = useMemo(() => {
    if (error || matches.length === 0) return text;
    let result = '';
    let lastIndex = 0;
    matches.forEach((match, index) => {
      const start = match.index;
      const end = start + match[0].length;
      result += text.slice(lastIndex, start);
      result += `<span class="bg-yellow-500/30 text-yellow-200 border-b border-yellow-500 font-bold px-0.5 rounded" title="Match ${index + 1}: ${match[0]}">${text.slice(start, end)}</span>`;
      lastIndex = end;
    });
    result += text.slice(lastIndex);
    return result;
  }, [text, matches, error]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <SearchCode className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold">{tool?.name}</h1>
      </div>
      <p className="text-muted-foreground mb-8">{tool?.description}</p>

      <div className="grid grid-cols-1 gap-6">
        {/* Pattern & Flags */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-lg">Regular Expression</h2>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <span className="text-xs text-muted-foreground">Pattern</span>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-muted-foreground font-mono">/</span>
                <Input
                  value={regex}
                  onChange={(e) => setRegex(e.target.value)}
                  className="pl-6 font-mono text-sm"
                  placeholder="[a-z]+"
                />
              </div>
            </div>
            <div className="w-24 space-y-2">
              <span className="text-xs text-muted-foreground">Flags</span>
              <div className="relative flex items-center">
                <span className="absolute left-2 text-muted-foreground font-mono">/</span>
                <Input
                  value={flags}
                  onChange={(e) => setFlags(e.target.value.replace(/[^gimy]/g, ''))}
                  className="pl-4 font-mono text-sm text-center"
                  placeholder="g"
                />
              </div>
            </div>
          </div>
          {error && (
            <div className="p-3 text-xs bg-destructive/10 text-destructive border border-destructive/20 rounded-lg font-mono">
              {error}
            </div>
          )}
        </div>

        {/* Test Text & Highlighted Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="font-semibold">Test String</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to test your regular expression against..."
              className="min-h-[250px] font-mono text-sm bg-card resize-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold">Match Results</label>
              <span className="text-xs text-muted-foreground bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono font-medium">
                {matches.length} {matches.length === 1 ? 'match' : 'matches'}
              </span>
            </div>
            <div
              className="min-h-[250px] p-3 rounded-lg border border-border bg-muted/30 font-mono text-sm overflow-auto whitespace-pre-wrap leading-6"
              dangerouslySetInnerHTML={{ __html: highlightedText || '<span class="text-muted-foreground">No matches found.</span>' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
