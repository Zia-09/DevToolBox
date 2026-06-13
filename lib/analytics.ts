declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (
      event: string, 
      opts?: object
    ) => void;
  }
}

export function trackEvent(
  name: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  try {
    window.gtag?.('event', name, params);
    window.plausible?.(
      name, { props: params }
    );
  } catch {}
}

export const analytics = {
  searchUsed(query: string) {
    trackEvent('search_used', { query });
  },
  themeToggled(theme: string) {
    trackEvent('theme_toggled', { theme });
  },
  copyClicked(toolName: string, element: string) {
    trackEvent('copy_clicked', { tool_name: toolName, element });
  }
};
