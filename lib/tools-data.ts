export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  category: string;
  tags: string[];
  isNew?: boolean;
  isPopular?: boolean;
}

export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, validate, and beautify JSON data with syntax highlighting and error detection.',
    icon: 'Braces',
    category: 'Formatters',
    tags: ['json', 'format', 'validate', 'beautify'],
    isPopular: true,
  },
  {
    id: 'css-flexbox-generator',
    name: 'CSS Flexbox Generator',
    slug: 'css-flexbox-generator',
    description: 'Generate CSS flexbox layouts visually with real-time preview and code output.',
    icon: 'Layout',
    category: 'Generators',
    tags: ['css', 'flexbox', 'layout', 'generator'],
    isPopular: true,
  },
  {
    id: 'git-command-builder',
    name: 'Git Command Builder',
    slug: 'git-command-builder',
    description: 'Build git commands with a step-by-step wizard. Never forget a git command again.',
    icon: 'GitBranch',
    category: 'Builders',
    tags: ['git', 'command', 'version control', 'cli'],
    isPopular: true,
    isNew: true,
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    slug: 'base64-encoder',
    description: 'Encode and decode text to and from Base64 format instantly.',
    icon: 'Binary',
    category: 'Converters',
    tags: ['base64', 'encode', 'decode', 'converter'],
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    slug: 'color-converter',
    description: 'Convert colors between HEX, RGB, HSL, and other formats.',
    icon: 'Palette',
    category: 'Converters',
    tags: ['color', 'hex', 'rgb', 'hsl', 'converter'],
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    slug: 'regex-tester',
    description: 'Test regular expressions with real-time matching and explanation.',
    icon: 'SearchCode',
    category: 'Testers',
    tags: ['regex', 'regular expression', 'test', 'pattern'],
    isNew: true,
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    slug: 'uuid-generator',
    description: 'Generate unique UUIDs and GUIDs for your projects.',
    icon: 'Fingerprint',
    category: 'Generators',
    tags: ['uuid', 'guid', 'generator', 'unique id'],
  },
  {
    id: 'yaml-to-json',
    name: 'YAML to JSON',
    slug: 'yaml-to-json',
    description: 'Convert YAML configuration files to JSON format easily.',
    icon: 'FileCode',
    category: 'Converters',
    tags: ['yaml', 'json', 'convert', 'config'],
  },
  {
    id: 'css-grid-generator',
    name: 'CSS Grid Generator',
    slug: 'css-grid-generator',
    description: 'Generate CSS Grid layouts with a visual editor and live preview.',
    icon: 'Grid3x3',
    category: 'Generators',
    tags: ['css', 'grid', 'layout', 'generator'],
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    slug: 'markdown-editor',
    description: 'Write and preview Markdown with live rendering and export options.',
    icon: 'FileText',
    category: 'Editors',
    tags: ['markdown', 'editor', 'preview', 'md'],
    isPopular: true,
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Decode and inspect JSON Web Tokens to view header and payload.',
    icon: 'Key',
    category: 'Testers',
    tags: ['jwt', 'token', 'decode', 'auth'],
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    slug: 'diff-checker',
    description: 'Compare two texts or code snippets and highlight the differences.',
    icon: 'GitCompare',
    category: 'Testers',
    tags: ['diff', 'compare', 'text', 'code'],
  },
];

export const categories = ['All', 'Formatters', 'Generators', 'Builders', 'Testers', 'Converters', 'Editors'];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  if (category === 'All') return tools;
  return tools.filter(tool => tool.category === category);
}

export function getPopularTools(): Tool[] {
  return tools.filter(tool => tool.isPopular);
}

export function getNewTools(): Tool[] {
  return tools.filter(tool => tool.isNew);
}

export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase();
  return tools.filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.description.toLowerCase().includes(lowerQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}
