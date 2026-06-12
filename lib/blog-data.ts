export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'git-commands-every-developer-must-know-2025',
    title: 'Git Commands Every Developer Must Know in 2025',
    excerpt: 'Master the essential Git commands that will streamline your workflow and make you a more efficient developer. From basics to advanced techniques.',
    date: '2025-01-15',
    readTime: '8 min read',
    category: 'Git',
    author: 'DevToolbox Team',
  },
  {
    id: '2',
    slug: 'css-flexbox-complete-guide',
    title: 'CSS Flexbox Complete Guide with Examples',
    excerpt: 'A comprehensive guide to CSS Flexbox with practical examples. Learn how to create flexible layouts that work across all devices.',
    date: '2025-01-10',
    readTime: '12 min read',
    category: 'CSS',
    author: 'DevToolbox Team',
  },
  {
    id: '3',
    slug: 'flutter-vs-react-native-2025',
    title: 'Flutter vs React Native in 2025',
    excerpt: 'An in-depth comparison of the two most popular cross-platform frameworks. Which one should you choose for your next project?',
    date: '2025-01-05',
    readTime: '10 min read',
    category: 'Flutter',
    author: 'DevToolbox Team',
  },
  {
    id: '4',
    slug: 'developer-tools-that-save-hours',
    title: '10 Developer Tools That Save Hours Every Week',
    excerpt: 'Discover the tools that professional developers use to boost productivity. These utilities can save you hours of repetitive work.',
    date: '2024-12-28',
    readTime: '6 min read',
    category: 'Productivity',
    author: 'DevToolbox Team',
  },
  {
    id: '5',
    slug: 'clean-git-commit-messages',
    title: 'How to Write Clean Git Commit Messages',
    excerpt: 'Learn the best practices for writing clear, informative commit messages. Your future self and teammates will thank you.',
    date: '2024-12-20',
    readTime: '5 min read',
    category: 'Git',
    author: 'DevToolbox Team',
  },
  {
    id: '6',
    slug: 'css-grid-vs-flexbox',
    title: 'CSS Grid vs Flexbox — When to Use Which',
    excerpt: 'Both Grid and Flexbox are powerful. Learn when to reach for each one and how they can work together in your layouts.',
    date: '2024-12-15',
    readTime: '7 min read',
    category: 'CSS',
    author: 'DevToolbox Team',
  },
];

export const blogCategories = ['All', 'Git', 'CSS', 'Flutter', 'Productivity'];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  if (category === 'All') return blogPosts;
  return blogPosts.filter(post => post.category === category);
}
