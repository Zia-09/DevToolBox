'use client';
import { useState, useEffect } from 'react';
import { FileEdit } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { getToolBySlug } from '@/lib/tools-data';
import { toast } from 'sonner';
import { marked } from 'marked';

export default function MarkdownEditorTool() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is a live **Markdown** editor.\n\n## Features:\n- Real-time preview\n- HTML export\n- Download markdown file\n\n```javascript\nconst hello = "world";\nconsole.log(hello);\n```');
  const [htmlOutput, setHtmlOutput] = useState('');
  const [copiedHtml, setCopiedHtml] = useState(false);
  
  const tool = getToolBySlug('markdown-editor');

  useEffect(() => {
    try {
      const key = 'devtoolbox_recent';
      const prev = JSON.parse(localStorage.getItem(key) || '[]');
      localStorage.setItem(key, JSON.stringify(['markdown-editor', ...prev.filter((s: string) => s !== 'markdown-editor')].slice(0, 4)));
    } catch {}
  }, []);

  useEffect(() => {
    const renderMarkdown = async () => {
      try {
        const parsed = await marked.parse(markdown);
        setHtmlOutput(parsed);
      } catch (err) {
        setHtmlOutput('<p class="text-destructive">Failed to parse markdown.</p>');
      }
    };
    renderMarkdown();
  }, [markdown]);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(htmlOutput);
    setCopiedHtml(true);
    toast.success('HTML output copied to clipboard!');
    setTimeout(() => setCopiedHtml(false), 2000);
  };

  const downloadFile = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = 'document.md';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Markdown file downloaded!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <FileEdit className="h-5 w-5" />
        </div>
        <h1 className="text-3xl font-bold">{tool?.name}</h1>
      </div>
      <p className="text-muted-foreground mb-8">{tool?.description}</p>

      {/* Editor toolbar */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={copyHtml}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg text-white transition-colors duration-200 ${
            copiedHtml ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {copiedHtml ? '✓ Copied HTML!' : 'Copy HTML'}
        </button>
        <button
          onClick={downloadFile}
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
        >
          Download .md File
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Editor input */}
        <div className="space-y-2">
          <label className="font-semibold text-sm">Markdown Source</label>
          <Textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Type your markdown here..."
            className="min-h-[450px] font-mono text-sm bg-card resize-none"
            spellCheck={true}
          />
        </div>

        {/* Live Preview */}
        <div className="space-y-2">
          <label className="font-semibold text-sm">Live Preview</label>
          <div className="min-h-[450px] p-6 rounded-lg border border-border bg-muted/30 overflow-auto prose dark:prose-invert max-w-none text-foreground prose-sm md:prose-base leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: htmlOutput }} />
          </div>
        </div>
      </div>
    </div>
  );
}
