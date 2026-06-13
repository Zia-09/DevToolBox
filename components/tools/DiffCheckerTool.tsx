'use client';
import { useState, useEffect, useMemo } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { getToolBySlug } from '@/lib/tools-data';
import * as Diff from 'diff';

export default function DiffCheckerTool() {
  const [original, setOriginal] = useState('const user = {\n  name: "John Doe",\n  age: 30,\n  role: "admin"\n};');
  const [modified, setModified] = useState('const user = {\n  name: "Jane Doe",\n  age: 31,\n  role: "admin",\n  active: true\n};');

  useEffect(() => {
    try {
      const key = 'devtoolbox_recent';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify(['diff-checker', ...prev.filter((s: string) => s !== 'diff-checker')].slice(0, 4)));
    } catch {}
  }, []);

  const diffResult = useMemo(() => {
    const diff = Diff.diffLines(original, modified);
    let additions = 0;
    let deletions = 0;
    
    diff.forEach(part => {
      if (part.added) additions += part.value.split('\n').length - 1 || 1;
      if (part.removed) deletions += part.value.split('\n').length - 1 || 1;
    });

    return { diff, additions, deletions };
  }, [original, modified]);

  return (
    <div className="py-4">
      {/* Info Stats Bar */}
      <div className="flex gap-4 mb-6 text-sm font-semibold" aria-live="polite">
        <span className="text-green-500 bg-green-500/10 px-3 py-1 rounded-full">
          +{diffResult.additions} additions
        </span>
        <span className="text-red-500 bg-red-500/10 px-3 py-1 rounded-full">
          -{diffResult.deletions} deletions
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input area */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="diff-original-input" className="font-semibold text-sm">Original Text</label>
            <Textarea
              id="diff-original-input"
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              className="min-h-[220px] font-mono text-sm bg-card resize-none"
              spellCheck={false}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="diff-modified-input" className="font-semibold text-sm">Modified Text</label>
            <Textarea
              id="diff-modified-input"
              value={modified}
              onChange={(e) => setModified(e.target.value)}
              className="min-h-[220px] font-mono text-sm bg-card resize-none"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output Compare Pane */}
        <div className="space-y-2">
          <label id="comparison-output-label" className="font-semibold text-sm">Comparison Output</label>
          <div
            tabIndex={0}
            aria-labelledby="comparison-output-label"
            className="min-h-[460px] max-h-[500px] border border-border rounded-lg bg-muted/30 p-4 font-mono text-xs overflow-auto leading-6 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {diffResult.diff.map((part, index) => {
              const colorClass = part.added 
                ? 'bg-green-500/20 text-green-200 border-l-4 border-green-500 pl-2 block' 
                : part.removed 
                  ? 'bg-red-500/20 text-red-200 border-l-4 border-red-500 pl-2 block line-through' 
                  : 'text-foreground/80 pl-3 block';
              return (
                <span key={index} className={colorClass}>
                  {part.value}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
