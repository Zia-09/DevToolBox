export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'git-commands-every-developer-must-know-2026',
    title: 'Git Commands Every Developer Must Know in 2026',
    excerpt: 'Master the essential Git commands that will streamline your workflow and make you a more efficient developer in 2026. From basics to advanced techniques.',
    date: '2026-01-15',
    readTime: '8 min read',
    category: 'Git',
    author: 'DevToolbox Team',
    content: `### Introduction to Modern Git Workflows
Git remains the absolute standard for version control in 2026. Understanding the fundamentals is great, but mastering advanced commands will save you time and headaches.

### 1. Interactive Staging
Stage specific files or even individual lines:
\`\`\`bash
git add -p
\`\`\`

### 2. Time Traveling (Reflog)
Accidentally deleted a local branch or reset too far? Git reflog tracks all actions:
\`\`\`bash
git reflog
git checkout HEAD@{index}
\`\`\`

### 3. Cleaning Up (Interactive Rebase)
Combine, edit, or delete commits before merging:
\`\`\`bash
git rebase -i HEAD~3
\`\`\`

### Conclusion
Integrating these commands into your routine will make you a more effective developer.`
  },
  {
    id: '2',
    slug: 'css-flexbox-complete-guide',
    title: 'CSS Flexbox Complete Guide with Examples',
    excerpt: 'A comprehensive guide to CSS Flexbox with practical examples. Learn how to create flexible layouts that work across all devices.',
    date: '2026-01-10',
    readTime: '12 min read',
    category: 'CSS',
    author: 'DevToolbox Team',
    content: `### Why Flexbox is Essential
Flexbox is one-dimensional layout logic designed to make aligning items easy and responsive.

### Flex Container Properties
- **display: flex**: Initiates the flex context.
- **flex-direction**: Controls main axis (row, row-reverse, column, column-reverse).
- **justify-content**: Aligns items along main axis (flex-start, center, space-between).

### Flex Item Properties
- **flex-grow**: Determines allocation of remaining space.
- **flex-shrink**: Determines how items shrink when space is tight.`
  },
  {
    id: '3',
    slug: 'flutter-vs-react-native-2026',
    title: 'Flutter vs React Native in 2026',
    excerpt: 'An in-depth comparison of the two most popular cross-platform frameworks in 2026. Which one should you choose for your next project?',
    date: '2026-01-05',
    readTime: '10 min read',
    category: 'Flutter',
    author: 'DevToolbox Team',
    content: `### Cross-Platform App Development in 2026
Choosing between Flutter (Dart) and React Native (JavaScript/TypeScript) is a key decision for new mobile builds.

### Flutter (Dart)
- **Pros**: Outstanding performance, pixel-perfect rendering, robust ecosystem.
- **Cons**: Large bundle sizes, learns a new language.

### React Native
- **Pros**: Fast-refresh, code sharing with web, utilizes standard JavaScript.
- **Cons**: Native bridging overhead.`
  },
  {
    id: '4',
    slug: 'developer-tools-that-save-hours',
    title: '10 Developer Tools That Save Hours Every Week',
    excerpt: 'Discover the tools that professional developers use to boost productivity. These utilities can save you hours of repetitive work.',
    date: '2025-12-28',
    readTime: '6 min read',
    category: 'Productivity',
    author: 'DevToolbox Team',
    content: `### Double Your Productivity
Great developers build great habits and use great tools. Here are top tools to optimize:
- **JSON Formatter**: Quick parsing & formatting.
- **Git Builder**: Wizard-based command generation.
- **Diff Checker**: Instantly compare configuration files.`
  },
  {
    id: '5',
    slug: 'clean-git-commit-messages',
    title: 'How to Write Clean Git Commit Messages',
    excerpt: 'Learn the best practices for writing clear, informative commit messages. Your future self and teammates will thank you.',
    date: '2025-12-20',
    readTime: '5 min read',
    category: 'Git',
    author: 'DevToolbox Team',
    content: `### The Golden Rules of Commits
1. Keep the subject line under 50 characters.
2. Use imperative mood ("Fix bug" instead of "Fixed bug").
3. Leave a blank line before the body description.`
  },
  {
    id: '6',
    slug: 'css-grid-vs-flexbox',
    title: 'CSS Grid vs Flexbox — When to Use Which',
    excerpt: 'Both Grid and Flexbox are powerful. Learn when to reach for each one and how they can work together in your layouts.',
    date: '2025-12-15',
    readTime: '7 min read',
    category: 'CSS',
    author: 'DevToolbox Team',
    content: `### CSS Layout Grid vs Flexbox
Grid is 2-dimensional (columns and rows), while Flexbox is 1-dimensional (single flow). Use Grid for layouts and Flexbox for linear alignment.`
  }
];

export const blogCategories = ['All', 'Git', 'CSS', 'Flutter', 'Productivity'];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === 'All') return blogPosts;
  return blogPosts.filter(post => post.category === category);
}
