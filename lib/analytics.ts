'use client';

export function trackEvent(
  name: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', name, params);
    (window as any).plausible?.(name, { props: params });
  } catch {}
}

export const analytics = {
  toolOpened(toolName: string, toolSlug: string) {
    trackEvent('tool_opened', { tool_name: toolName, tool_slug: toolSlug });
  },
  searchUsed(query: string) {
    trackEvent('search_used', { query });
  },
  themeToggled(theme: string) {
    trackEvent('theme_toggled', { theme });
  },
  copyClicked(toolName: string, element: string) {
    trackEvent('copy_clicked', { tool_name: toolName, element });
  },
  faqExpanded(toolName: string, question: string) {
    trackEvent('faq_expanded', { tool_name: toolName, question });
  },
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: object) => void;
  }
}
