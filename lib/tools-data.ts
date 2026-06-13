export interface ToolFaq {
  question: string;
  answer: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  icon: string;
  category: string;
  tags: string[];
  keywords: string[];
  faqs: ToolFaq[];
  isNew?: boolean;
  isPopular?: boolean;
  hasPage?: boolean;
  relatedTools?: string[];
}

export const tools: Tool[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, validate, and beautify JSON data with syntax highlighting and error detection.',
    longDescription: 'The DevToolbox JSON Formatter instantly formats, validates, and beautifies raw or minified JSON data. Paste your JSON to get clean, indented output with syntax highlighting and error detection. All processing runs locally in your browser — no data is ever sent to a server.',
    icon: 'Braces',
    category: 'Formatters',
    tags: ['json', 'format', 'validate', 'beautify'],
    keywords: ['json formatter', 'json beautifier', 'json validator online', 'format json online', 'pretty print json', 'json minifier', 'json parser free'],
    faqs: [
      { question: 'What is a JSON formatter?', answer: 'A JSON formatter takes raw or minified JSON text and reformats it with proper indentation and line breaks, making it easy to read and debug.' },
      { question: 'Is my data safe when I use this JSON formatter?', answer: 'Yes. All formatting happens in your browser using JavaScript. No data is ever sent to our servers.' },
      { question: 'Can this tool validate JSON syntax?', answer: 'Yes. The formatter detects syntax errors such as missing commas, unclosed brackets, or invalid values and highlights the problem.' },
      { question: 'What is JSON minification?', answer: 'Minification removes all whitespace and line breaks to produce the smallest possible JSON string — useful for reducing API payload sizes.' },
    ],
    isPopular: true,
    hasPage: true,
    relatedTools: ['yaml-to-json', 'diff-checker', 'base64-encoder'],
  },
  {
    id: 'css-flexbox-generator',
    name: 'CSS Flexbox Generator',
    slug: 'css-flexbox-generator',
    description: 'Generate CSS flexbox layouts visually with real-time preview and code output.',
    longDescription: 'Build CSS flexbox layouts interactively without memorizing syntax. Adjust container properties like flex-direction, justify-content, align-items, and flex-wrap through a visual editor, see a live preview, and copy the generated CSS code instantly.',
    icon: 'Layout',
    category: 'Generators',
    tags: ['css', 'flexbox', 'layout', 'generator'],
    keywords: ['css flexbox generator', 'flexbox playground', 'flexbox code generator', 'css layout tool online', 'flexbox builder', 'css flexbox tutorial'],
    faqs: [
      { question: 'What is CSS Flexbox?', answer: 'CSS Flexbox is a one-dimensional layout model that arranges items in rows or columns with powerful alignment and distribution controls.' },
      { question: 'How do I use the flexbox generator?', answer: 'Select your container and item properties using the controls, preview the layout in real time, then copy the generated CSS into your project.' },
      { question: 'Is the generated CSS cross-browser compatible?', answer: 'Yes. The output uses standard flexbox properties supported by all modern browsers including Chrome, Firefox, Safari, and Edge.' },
      { question: 'What is the difference between justify-content and align-items?', answer: 'justify-content aligns items along the main axis (horizontal by default), while align-items aligns them along the cross axis (vertical by default).' },
    ],
    isPopular: true,
    hasPage: true,
    relatedTools: ['css-grid-generator', 'color-converter'],
  },
  {
    id: 'git-command-builder',
    name: 'Git Command Builder',
    slug: 'git-command-builder',
    description: 'Build git commands with a step-by-step wizard. Never forget a git command again.',
    longDescription: 'Stop memorizing git flags. The DevToolbox Git Command Builder guides you through constructing any git command — commit, push, pull, merge, rebase, stash, and more — with a step-by-step wizard that explains each option, then copies the exact command to your clipboard.',
    icon: 'GitBranch',
    category: 'Builders',
    tags: ['git', 'command', 'version control', 'cli'],
    keywords: ['git command builder', 'git command generator', 'git commands cheat sheet', 'git command reference online', 'learn git commands', 'git wizard tool'],
    faqs: [
      { question: 'What git commands does this builder support?', answer: 'It supports common workflows: init, clone, commit, push, pull, branch, merge, rebase, stash, cherry-pick, tag, and more.' },
      { question: 'Do I need git installed to use this tool?', answer: 'No. This is a reference tool running entirely in your browser. You need git installed locally to actually run the generated commands.' },
      { question: 'Is this good for learning git?', answer: 'Yes. The wizard explains what each flag does, making it an excellent interactive learning resource for beginners.' },
      { question: 'What is the difference between git merge and git rebase?', answer: 'git merge creates a merge commit preserving full history. git rebase moves your commits on top of another branch for a clean linear history.' },
    ],
    isPopular: true,
    isNew: true,
    hasPage: true,
    relatedTools: ['diff-checker', 'markdown-editor'],
  },
  {
    id: 'base64-encoder',
    name: 'Base64 Encoder/Decoder',
    slug: 'base64-encoder',
    description: 'Encode and decode text to and from Base64 format instantly.',
    longDescription: 'Convert text to Base64 and back instantly. Base64 encoding is used throughout web development for embedding data in APIs, encoding authentication tokens, and handling binary data in JSON. All processing is local and private — nothing leaves your browser.',
    icon: 'Binary',
    category: 'Converters',
    tags: ['base64', 'encode', 'decode', 'converter'],
    keywords: ['base64 encoder decoder', 'base64 converter online', 'encode text to base64', 'decode base64 string', 'base64 to text', 'base64 online tool free'],
    faqs: [
      { question: 'What is Base64 encoding?', answer: 'Base64 converts binary data into a text format using 64 printable ASCII characters, commonly used to embed data in HTML, CSS, JSON, and email.' },
      { question: 'Is Base64 the same as encryption?', answer: 'No. Base64 is an encoding scheme, not encryption. Anyone can decode it without a key. Never use it to secure sensitive data.' },
      { question: 'When should I use Base64?', answer: 'Use Base64 when embedding binary data (images, files) in text formats like JSON or XML, or for basic HTTP authentication headers.' },
      { question: 'Why does Base64 output end with "=="?', answer: 'Base64 pads output with = characters to ensure the total length is a multiple of 4. The number of padding characters indicates how many bytes were added.' },
    ],
    hasPage: true,
    relatedTools: ['jwt-decoder', 'json-formatter'],
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    slug: 'color-converter',
    description: 'Convert colors between HEX, RGB, HSL, and other formats.',
    longDescription: 'Instantly convert color values between HEX, RGB, RGBA, HSL, and HSLA formats with a live color preview. Essential for web designers and frontend developers working across different design tools and CSS codebases that use different color notations.',
    icon: 'Palette',
    category: 'Converters',
    tags: ['color', 'hex', 'rgb', 'hsl', 'converter'],
    keywords: ['color converter online', 'hex to rgb converter', 'rgb to hex', 'hsl color converter', 'hex color tool', 'css color format converter', 'rgba to hex'],
    faqs: [
      { question: 'What color formats does this converter support?', answer: 'The tool supports HEX (#RRGGBB), RGB (r, g, b), RGBA, HSL (h, s%, l%), and HSLA color formats.' },
      { question: 'What is the difference between HEX and RGB?', answer: 'HEX is a base-16 representation of an RGB color — they describe the same color using different notation. #3B82F6 is the same as rgb(59, 130, 246).' },
      { question: 'What is HSL color and when is it useful?', answer: 'HSL (Hue, Saturation, Lightness) is more intuitive for designers — you can create color variations by adjusting lightness without recalculating all three channels.' },
      { question: 'Can I use HSL in CSS custom properties?', answer: 'Yes. HSL is ideal for CSS variables because you can easily create tints and shades by changing the lightness percentage.' },
    ],
    hasPage: true,
    relatedTools: ['css-flexbox-generator', 'css-grid-generator'],
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    slug: 'regex-tester',
    description: 'Test regular expressions with real-time matching and explanation.',
    longDescription: 'Write, test, and debug JavaScript regular expressions in real-time. Enter your regex pattern and test string to instantly see all matches highlighted, capture groups identified, and flags applied — with zero latency since everything runs in your browser.',
    icon: 'SearchCode',
    category: 'Testers',
    tags: ['regex', 'regular expression', 'test', 'pattern'],
    keywords: ['regex tester online', 'regular expression tester', 'javascript regex checker', 'regex validator free', 'test regex online', 'regex debugger'],
    faqs: [
      { question: 'What is a regular expression (regex)?', answer: 'A regular expression is a pattern used to match character combinations in strings, used for validation, search-and-replace, and text parsing.' },
      { question: 'What regex engine does this use?', answer: "This tester uses JavaScript's built-in RegExp engine (ECMAScript spec), compatible with Node.js, browsers, and most modern environments." },
      { question: 'What flags are supported?', answer: 'Supported flags: g (global — find all matches), i (case-insensitive), m (multiline), s (dotAll), and u (unicode).' },
      { question: 'How do I capture groups?', answer: 'Wrap part of your pattern in parentheses: (\\w+). Named groups use (?<name>\\w+). The tester shows each capture group separately.' },
    ],
    isNew: true,
    hasPage: true,
    relatedTools: ['diff-checker', 'json-formatter'],
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    slug: 'uuid-generator',
    description: 'Generate unique UUIDs and GUIDs for your projects.',
    longDescription: 'Generate cryptographically random Version 4 UUIDs (Universally Unique Identifiers) instantly. Create single or bulk UUIDs, choose your format, and copy to clipboard in one click — perfect for database primary keys, session IDs, API tokens, and unique identifiers.',
    icon: 'Fingerprint',
    category: 'Generators',
    tags: ['uuid', 'guid', 'generator', 'unique id'],
    keywords: ['uuid generator online', 'guid generator free', 'generate uuid v4', 'random uuid online', 'unique id generator', 'bulk uuid generator'],
    faqs: [
      { question: 'What is a UUID?', answer: 'A UUID (Universally Unique Identifier) is a 128-bit identifier with a negligible probability of duplication, formatted as 8-4-4-4-12 hexadecimal digits.' },
      { question: 'What is UUID v4?', answer: 'UUID v4 is randomly generated using a cryptographically secure random number generator, making it the most common UUID type for general use.' },
      { question: 'Are generated UUIDs truly unique?', answer: 'Yes. The probability of generating a duplicate UUID v4 is astronomically small — roughly 1 in 5.3 × 10^36.' },
      { question: 'Can I use UUIDs as database primary keys?', answer: 'Yes. UUIDs are widely used as primary keys because they can be generated client-side without a database round-trip and are globally unique.' },
    ],
    hasPage: true,
    relatedTools: ['base64-encoder', 'jwt-decoder'],
  },
  {
    id: 'yaml-to-json',
    name: 'YAML to JSON',
    slug: 'yaml-to-json',
    description: 'Convert YAML configuration files to JSON format easily.',
    longDescription: 'Convert YAML configuration files to JSON and back with a single click. Paste your YAML — from Kubernetes configs, CI/CD pipelines, or Docker Compose files — and get clean, formatted JSON output instantly. Supports multi-document YAML and all standard YAML types.',
    icon: 'FileCode',
    category: 'Converters',
    tags: ['yaml', 'json', 'convert', 'config'],
    keywords: ['yaml to json converter', 'yaml to json online', 'convert yaml to json', 'yaml parser online', 'json to yaml', 'yaml converter free'],
    faqs: [
      { question: 'What is YAML?', answer: 'YAML (YAML Ain\'t Markup Language) is a human-readable data serialization format commonly used for configuration files in DevOps tools like Kubernetes, Docker, and GitHub Actions.' },
      { question: 'What is the difference between YAML and JSON?', answer: 'YAML uses indentation and is more readable for humans. JSON uses brackets and quotes and is more universally supported by APIs. Both can represent the same data.' },
      { question: 'Can I convert JSON back to YAML?', answer: 'Yes. The tool supports bidirectional conversion — paste JSON to get YAML, or paste YAML to get JSON.' },
      { question: 'Does it support multi-document YAML?', answer: 'Yes. YAML files with multiple documents separated by --- are supported.' },
    ],
    hasPage: true,
    relatedTools: ['json-formatter', 'diff-checker'],
  },
  {
    id: 'css-grid-generator',
    name: 'CSS Grid Generator',
    slug: 'css-grid-generator',
    description: 'Generate CSS Grid layouts with a visual editor and live preview.',
    longDescription: 'Design CSS Grid layouts interactively with a visual drag-and-drop editor. Set columns, rows, gaps, and template areas, then get production-ready CSS grid code you can paste directly into your stylesheet — no grid memorization required.',
    icon: 'Grid3x3',
    category: 'Generators',
    tags: ['css', 'grid', 'layout', 'generator'],
    keywords: ['css grid generator', 'css grid builder online', 'grid layout generator', 'css grid template', 'css grid tool', 'css grid code generator'],
    faqs: [
      { question: 'What is CSS Grid?', answer: 'CSS Grid is a two-dimensional layout system that lets you design complex web layouts using rows and columns simultaneously — more powerful than Flexbox for page-level structure.' },
      { question: 'When should I use Grid vs Flexbox?', answer: 'Use Grid for two-dimensional layouts (rows AND columns). Use Flexbox for one-dimensional layouts (row OR column). They work well together.' },
      { question: 'Is the generated code cross-browser compatible?', answer: 'Yes. CSS Grid is supported by all modern browsers. The generator produces standard properties without vendor prefixes.' },
      { question: 'What is grid-template-areas?', answer: 'grid-template-areas lets you name sections of your grid layout visually using strings, making complex layouts very readable and maintainable.' },
    ],
    hasPage: true,
    relatedTools: ['css-flexbox-generator', 'color-converter'],
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    slug: 'markdown-editor',
    description: 'Write and preview Markdown with live rendering and export options.',
    longDescription: 'A fast, distraction-free online Markdown editor with live side-by-side preview. Write GitHub-flavored Markdown and instantly see rendered HTML output. Export your document or copy the rendered HTML — perfect for README files, documentation, and blog posts.',
    icon: 'FileText',
    category: 'Editors',
    tags: ['markdown', 'editor', 'preview', 'md'],
    keywords: ['markdown editor online', 'markdown preview online', 'live markdown editor', 'github markdown editor', 'markdown to html', 'md editor free'],
    faqs: [
      { question: 'What is Markdown?', answer: 'Markdown is a lightweight markup language using plain text formatting syntax that converts to HTML. It is the standard format for README files, documentation, and many blogging platforms.' },
      { question: 'Does this support GitHub Flavored Markdown?', answer: 'Yes. The editor supports GFM including tables, task lists, strikethrough, fenced code blocks, and syntax highlighting.' },
      { question: 'Can I export the output?', answer: 'Yes. You can copy the rendered HTML or the raw Markdown source with a single click.' },
      { question: 'Does the editor save my work?', answer: 'Your work is saved in your browser\'s local storage, so it persists between page refreshes (but not across different devices).' },
    ],
    isPopular: true,
    hasPage: true,
    relatedTools: ['diff-checker', 'git-command-builder'],
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    slug: 'jwt-decoder',
    description: 'Decode and inspect JSON Web Tokens to view header and payload.',
    longDescription: 'Decode and inspect any JSON Web Token (JWT) instantly. Paste your JWT to see the decoded header, payload claims, expiry time, and token structure — all parsed locally in your browser. Essential for debugging authentication flows and understanding token contents.',
    icon: 'Key',
    category: 'Testers',
    tags: ['jwt', 'token', 'decode', 'auth'],
    keywords: ['jwt decoder online', 'jwt token viewer', 'decode jwt token', 'jwt inspector', 'json web token decoder', 'jwt debugger free'],
    faqs: [
      { question: 'What is a JWT?', answer: 'A JSON Web Token (JWT) is a compact, URL-safe token format used for authentication and information exchange. It consists of three Base64-encoded parts: header, payload, and signature.' },
      { question: 'Is this tool safe to paste my JWT into?', answer: 'Yes. Decoding happens entirely in your browser — no token data is transmitted to any server. However, never share production JWTs publicly.' },
      { question: 'Can this tool verify the JWT signature?', answer: 'No. Signature verification requires the secret key or public key, which should never be shared with client-side tools. This tool only decodes the header and payload.' },
      { question: 'What are common JWT claims?', answer: 'Common claims include: iss (issuer), sub (subject), aud (audience), exp (expiry), iat (issued at), and nbf (not before).' },
    ],
    hasPage: true,
    relatedTools: ['base64-encoder', 'regex-tester'],
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    slug: 'diff-checker',
    description: 'Compare two texts or code snippets and highlight the differences.',
    longDescription: 'The DevToolbox Diff Checker compares two text documents or code snippets side-by-side, highlighting additions, deletions, and changes with color coding. Useful for reviewing code changes, comparing configuration files, or spotting differences between document versions.',
    icon: 'GitCompare',
    category: 'Testers',
    tags: ['diff', 'compare', 'text', 'code'],
    keywords: ['diff checker online', 'text diff tool', 'compare two files online', 'code diff viewer', 'file difference checker', 'text comparison tool free'],
    faqs: [
      { question: 'What is a diff checker?', answer: 'A diff checker compares two pieces of text and shows which lines were added, removed, or changed — similar to how git diff works in version control.' },
      { question: 'What algorithm is used for comparison?', answer: 'The tool uses the standard Myers diff algorithm, the same algorithm used by git, to compute the minimal edit distance between the two texts.' },
      { question: 'Can I compare code files?', answer: 'Yes. Paste any text including code (JavaScript, Python, JSON, YAML, HTML, CSS) and the diff checker will highlight all differences.' },
      { question: 'Is my code stored anywhere?', answer: 'No. All comparison happens locally in your browser. No text is sent to any server.' },
    ],
    hasPage: true,
    relatedTools: ['json-formatter', 'yaml-to-json', 'regex-tester'],
  },
];

export const categories = ['All', 'Formatters', 'Generators', 'Builders', 'Testers', 'Converters', 'Editors'];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  if (category === 'All') return tools;
  return tools.filter((tool) => tool.category === category);
}

export function getPopularTools(): Tool[] {
  return tools.filter((tool) => tool.isPopular);
}

export function getNewTools(): Tool[] {
  return tools.filter((tool) => tool.isNew);
}

export function getRelatedTools(slugs: string[]): Tool[] {
  return slugs.map((slug) => tools.find((t) => t.slug === slug)).filter((t): t is Tool => !!t);
}

export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase();
  return tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      tool.keywords.some((kw) => kw.toLowerCase().includes(lowerQuery))
  );
}
