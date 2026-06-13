'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { GitBranch } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getToolBySlug } from '@/lib/tools-data';
import { trackEvent } from '@/lib/analytics';
import { toast } from 'sonner';

type GitOperation =
  | 'init'
  | 'clone'
  | 'branch'
  | 'switch'
  | 'stage'
  | 'commit'
  | 'push'
  | 'pull'
  | 'merge'
  | 'undo-keep'
  | 'undo-delete'
  | 'stash'
  | 'log'
  | 'delete-branch';

interface GitCommand {
  command: string;
  explanation: string;
}

const gitOperations: { value: GitOperation; label: string }[] = [
  { value: 'init', label: 'Initialize a repository' },
  { value: 'clone', label: 'Clone a repository' },
  { value: 'branch', label: 'Create a new branch' },
  { value: 'switch', label: 'Switch to a branch' },
  { value: 'stage', label: 'Stage files for commit' },
  { value: 'commit', label: 'Commit changes' },
  { value: 'push', label: 'Push to remote' },
  { value: 'pull', label: 'Pull from remote' },
  { value: 'merge', label: 'Merge a branch' },
  { value: 'undo-keep', label: 'Undo last commit (keep changes)' },
  { value: 'undo-delete', label: 'Undo last commit (delete changes)' },
  { value: 'stash', label: 'Stash changes' },
  { value: 'log', label: 'View commit history' },
  { value: 'delete-branch', label: 'Delete a branch' },
];

const gitReference: { command: string; description: string }[] = [
  { command: 'git init', description: 'Initialize a new Git repository' },
  { command: 'git clone [url]', description: 'Clone a repository from a URL' },
  { command: 'git status', description: 'Show working tree status' },
  { command: 'git add .', description: 'Stage all changes' },
  { command: 'git add [file]', description: 'Stage a specific file' },
  { command: 'git commit -m "message"', description: 'Commit staged changes with message' },
  { command: 'git push origin [branch]', description: 'Push commits to remote branch' },
  { command: 'git pull origin [branch]', description: 'Pull latest changes from remote' },
  { command: 'git branch', description: 'List all branches' },
  { command: 'git branch [name]', description: 'Create a new branch' },
  { command: 'git checkout [branch]', description: 'Switch to a branch' },
  { command: 'git checkout -b [name]', description: 'Create and switch to new branch' },
  { command: 'git switch [branch]', description: 'Switch to a branch (modern)' },
  { command: 'git switch -c [name]', description: 'Create and switch to new branch (modern)' },
  { command: 'git merge [branch]', description: 'Merge a branch into current branch' },
  { command: 'git stash', description: 'Stash current changes' },
  { command: 'git stash pop', description: 'Apply and remove stashed changes' },
  { command: 'git stash list', description: 'List all stashes' },
  { command: 'git log --oneline', description: 'Show commit history in one line' },
  { command: 'git log --oneline --graph --all', description: 'Show commit graph' },
  { command: 'git diff', description: 'Show unstaged changes' },
  { command: 'git diff --staged', description: 'Show staged changes' },
  { command: 'git reset HEAD~1', description: 'Undo last commit, keep changes unstaged' },
  { command: 'git reset --hard HEAD~1', description: 'Undo last commit, delete all changes' },
  { command: 'git remote -v', description: 'Show remote repositories' },
  { command: 'git fetch --all', description: 'Fetch all remote changes' },
  { command: 'git branch -d [name]', description: 'Delete a branch (safe)' },
  { command: 'git branch -D [name]', description: 'Force delete a branch' },
];

function ReferenceRow({ 
  command, 
  description 
}: { 
  command: string; 
  description: string; 
}) {
  const [copied, setCopied] = useState(false);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      trackEvent('copy_clicked', {
        tool_name: 'git-command-builder'
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <tr className="hover:bg-muted/20 transition-colors">
      <td className="px-6 py-3">
        <code className="text-sm font-mono text-primary">{command}</code>
      </td>
      <td className="px-6 py-3 text-sm text-muted-foreground">{description}</td>
      <td className="px-6 py-3 text-right">
        <button
          onClick={() => copy(command)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg text-white transition-colors duration-200 ${
            copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </td>
    </tr>
  );
}

export default function GitCommandBuilderTool() {
  const [operation, setOperation] = useState<GitOperation>('init');
  const [branchName, setBranchName] = useState('');
  const [commitMessage, setCommitMessage] = useState('');
  const [remoteUrl, setRemoteUrl] = useState('');
  const [remoteName, setRemoteName] = useState('origin');
  const [copied, setCopied] = useState(false);

  const tool = getToolBySlug('git-command-builder');

  // Recently used tools tracking
  useEffect(() => {
    try {
      const SLUG = 'git-command-builder'; 
      const key = 'devtoolbox_recent';
      const prev = JSON.parse(
        localStorage.getItem(key) || '[]'
      );
      const next = [
        SLUG,
        ...prev.filter(
          (s: string) => s !== SLUG
        )
      ].slice(0, 4);
      localStorage.setItem(
        key, JSON.stringify(next)
      );
    } catch {}
  }, []);

  const generateCommand = useCallback((): GitCommand => {
    switch (operation) {
      case 'init':
        return {
          command: 'git init',
          explanation: 'This creates a new Git repository in the current directory. It initializes a .git folder that tracks all version control information.',
        };
      case 'clone':
        return {
          command: remoteUrl ? `git clone ${remoteUrl}` : 'git clone [url]',
          explanation: 'This clones a remote repository to your local machine. Replace [url] with the repository URL (e.g., from GitHub, GitLab, or Bitbucket).',
        };
      case 'branch':
        return {
          command: branchName ? `git branch "${branchName}"` : 'git branch [branch-name]',
          explanation: 'This creates a new branch with the specified name. The branch will be created from your current HEAD position.',
        };
      case 'switch':
        return {
          command: branchName ? `git checkout "${branchName}"` : 'git checkout [branch-name]',
          explanation: 'This switches to an existing branch. All uncommitted changes will be moved to the new branch.',
        };
      case 'stage':
        return {
          command: 'git add .',
          explanation: 'This stages all modified and new files in the current directory and all subdirectories. Use "git add [filename]" to stage specific files.',
        };
      case 'commit':
        return {
          command: commitMessage ? `git commit -m "${commitMessage}"` : 'git commit -m "[message]"',
          explanation: 'This commits all staged changes with a descriptive message. A good commit message explains what and why, not how.',
        };
      case 'push':
        return {
          command: branchName ? `git push ${remoteName} "${branchName}"` : `git push ${remoteName} [branch-name]`,
          explanation: `This pushes your local commits to the remote repository named "${remoteName}". The branch must already exist on the remote, or use -u flag on first push.`,
        };
      case 'pull':
        return {
          command: branchName ? `git pull ${remoteName} "${branchName}"` : `git pull ${remoteName} [branch-name]`,
          explanation: `This fetches changes from the remote "${remoteName}" and merges them into your current branch. It\u2019s equivalent to git fetch followed by git merge.`,
        };
      case 'merge':
        return {
          command: branchName ? `git merge "${branchName}"` : 'git merge [branch-name]',
          explanation: 'This merges the specified branch into your current branch. Resolve any conflicts that arise before committing the merge.',
        };
      case 'undo-keep':
        return {
          command: 'git reset HEAD~1',
          explanation: 'This undoes the last commit but keeps all changes in the working directory as unstaged. They can be modified and committed again.',
        };
      case 'undo-delete':
        return {
          command: 'git reset --hard HEAD~1',
          explanation: 'WARNING: This completely removes the last commit and deletes all associated changes. Use with caution - changes cannot be recovered.',
        };
      case 'stash':
        return {
          command: 'git stash',
          explanation: 'This temporarily stores your uncommitted changes in a stash. Use "git stash pop" or "git stash apply" to reapply them later.',
        };
      case 'log':
        return {
          command: 'git log --oneline --graph --all',
          explanation: 'This shows a visual graph of all commits across all branches, with each commit on a single line. Remove flags for more detail.',
        };
      case 'delete-branch':
        return {
          command: branchName ? `git branch -d "${branchName}"` : 'git branch -d [branch-name]',
          explanation: 'This deletes the specified branch. Use -D instead of -d to force delete an unmerged branch.',
        };
      default:
        return { command: '', explanation: '' };
    }
  }, [operation, branchName, commitMessage, remoteUrl, remoteName]);

  const { command, explanation } = useMemo(() => generateCommand(), [generateCommand]);

  const copy = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      trackEvent('copy_clicked', {
        tool_name: 'git-command-builder'
      });
      toast.success('Command copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Copy failed');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          {tool && (
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <GitBranch className="h-5 w-5" />
            </div>
          )}
          <h1 className="text-3xl font-bold">{tool?.name || 'Git Command Builder'}</h1>
        </div>
        <p className="text-muted-foreground">{tool?.description}</p>
      </div>

      {/* Step-based Wizard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Steps Panel */}
        <div className="space-y-6 p-6 bg-card rounded-xl border border-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
              1
            </div>
            <h2 className="font-semibold">What do you want to do?</h2>
          </div>

          <Select value={operation} onValueChange={(v) => setOperation(v as GitOperation)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an operation" />
            </SelectTrigger>
            <SelectContent>
              {gitOperations.map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Context-aware inputs */}
          <div className="space-y-4">
            {(operation === 'branch' || operation === 'switch' || operation === 'merge' || operation === 'push' || operation === 'pull' || operation === 'delete-branch') && (
              <div className="space-y-2">
                <Label htmlFor="branch-name">Branch Name</Label>
                <Input
                  id="branch-name"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="feature/my-new-feature"
                />
              </div>
            )}

            {operation === 'commit' && (
              <div className="space-y-2">
                <Label htmlFor="commit-message">Commit Message</Label>
                <Textarea
                  id="commit-message"
                  value={commitMessage}
                  onChange={(e) => setCommitMessage(e.target.value)}
                  placeholder="Add user authentication feature"
                  className="resize-none"
                  rows={3}
                />
              </div>
            )}

            {operation === 'clone' && (
              <div className="space-y-2">
                <Label htmlFor="remote-url">Repository URL</Label>
                <Input
                  id="remote-url"
                  value={remoteUrl}
                  onChange={(e) => setRemoteUrl(e.target.value)}
                  placeholder="https://github.com/user/repo.git"
                />
              </div>
            )}

            {(operation === 'push' || operation === 'pull') && (
              <div className="space-y-2">
                <Label htmlFor="remote-name">Remote Name</Label>
                <Input
                  id="remote-name"
                  value={remoteName}
                  onChange={(e) => setRemoteName(e.target.value)}
                  placeholder="origin"
                />
              </div>
            )}
          </div>
        </div>

        {/* Generated Command Panel */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
              2
            </div>
            <h2 className="font-semibold">Generated Command</h2>
          </div>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 bg-muted/30 flex items-center justify-between gap-4">
              <code className="text-sm font-mono text-primary break-all">{command}</code>
              <button
                onClick={() => copy(command)}
                disabled={!command}
                className={`flex-shrink-0 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg text-white transition-colors duration-200 ${
                  copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
            <div className="p-4 border-t border-border">
              <h3 className="text-sm font-medium mb-2">What this does:</h3>
              <p className="text-sm text-muted-foreground">{explanation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Git Reference Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Git Command Reference</h2>
          <p className="text-sm text-muted-foreground mt-1">
            A quick reference for common Git commands
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="text-left px-6 py-3 text-sm font-medium">Command</th>
                <th className="text-left px-6 py-3 text-sm font-medium">Description</th>
                <th className="w-32 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {gitReference.map((item, index) => (
                <ReferenceRow
                  key={index}
                  command={item.command}
                  description={item.description}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
