'use client';
import { useState, useEffect, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { getToolBySlug } from '@/lib/tools-data';

export default function RegexTesterTool() {
  const [regex, setRegex] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('Contact us at support@devtoolbox.io or info@example.com for help.');

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
    <div className="py-4">
      <div className="grid grid-cols-1 gap-6">
        {/* Pattern & Flags */}
        <div className="bg-card rounded-xl border border-border p-6 space-y-4">
          <h2 className="font-semibold text-lg">Regular Expression Configuration</h2>
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <label htmlFor="regex-pattern-input" className="text-xs font-semibold text-muted-foreground block">
                Pattern
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-muted-foreground font-mono" aria-hidden="true">/</span>
                <Input
                  id="regex-pattern-input"
                  value={regex}
                  onChange={(e) => setRegex(e.target.value)}
                  className="pl-6 font-mono text-sm"
                  placeholder="[a-z]+"
                />
              </div>
            </div>
            <div className="w-28 space-y-2">
              <label htmlFor="regex-flags-input" className="text-xs font-semibold text-muted-foreground block">
                Flags
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-muted-foreground font-mono" aria-hidden="true">/</span>
                <Input
                  id="regex-flags-input"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value.replace(/[^gimy]/g, ''))}
                  className="pl-6 font-mono text-sm text-center"
                  placeholder="g"
                />
              </div>
            </div>
          </div>
          {error && (
            <div
              className="p-3 text-xs bg-destructive/10 text-destructive border border-destructive/20 rounded-lg font-mono"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </div>
          )}
        </div>

        {/* Test Text & Highlighted Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="regex-test-string" className="font-semibold text-sm">Test String</label>
            <Textarea
              id="regex-test-string"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to test your regular expression against..."
              className="min-h-[250px] font-mono text-sm bg-card resize-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label id="regex-match-results-label" className="font-semibold text-sm">Match Results</label>
              <span className="text-xs text-muted-foreground bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono font-medium" aria-live="polite">
                {matches.length} {matches.length === 1 ? 'match' : 'matches'}
              </span>
            </div>
            <div
              id="regex-match-results-preview"
              tabIndex={0}
              aria-labelledby="regex-match-results-label"
              className="min-h-[250px] p-3 rounded-lg border border-border bg-muted/30 font-mono text-sm overflow-auto whitespace-pre-wrap leading-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              dangerouslySetInnerHTML={{ __html: highlightedText || '<span class="text-muted-foreground">No matches found.</span>' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
