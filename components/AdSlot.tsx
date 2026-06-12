'use client';

interface AdSlotProps {
  slot: 'hero-banner' | 'sidebar' | 'between-posts' | 'footer-banner';
  className?: string;
}

const slotDimensions: Record<string, { width: string; height: string }> = {
  'hero-banner': { width: '100%', height: '90px' },
  'sidebar': { width: '300px', height: '250px' },
  'between-posts': { width: '100%', height: '90px' },
  'footer-banner': { width: '100%', height: '90px' },
};

export function AdSlot({ slot, className }: AdSlotProps) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  // If no AdSense ID is configured, render nothing
  if (!adsenseId) {
    return null;
  }

  const { width, height } = slotDimensions[slot];

  return (
    <div
      className={`flex items-center justify-center bg-muted/30 border border-border rounded-lg ${className}`}
      style={{ width, height, minHeight: height }}
    >
      <ins
        className="adsbygoogle"
        data-ad-client={`ca-${adsenseId}`}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
