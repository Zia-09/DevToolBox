interface EventParams {
  [key: string]: string | number | boolean;
}

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: EventParams) => void;
    plausible?: (eventName: string, options?: { props?: EventParams }) => void;
  }
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (gaId && window.gtag) {
    window.gtag('event', eventName, params);
  }

  // Plausible Analytics
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (plausibleDomain && window.plausible) {
    window.plausible(eventName, { props: params });
  }
}

// Predefined event trackers
export const analytics = {
  toolOpened: (toolName: string, toolSlug: string) => {
    trackEvent('tool_opened', { tool_name: toolName, tool_slug: toolSlug });
  },

  copyClicked: (toolName: string, element: string) => {
    trackEvent('copy_clicked', { tool_name: toolName, element });
  },

  searchUsed: (query: string) => {
    trackEvent('search_used', { query });
  },

  themeToggled: (newTheme: string) => {
    trackEvent('theme_toggled', { new_theme: newTheme });
  },

  toolPageTime: (toolName: string, seconds: number) => {
    trackEvent('tool_page_time', { tool_name: toolName, seconds });
  },
};

export default analytics;
