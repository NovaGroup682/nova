'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

/**
 * Vercel Analytics and SpeedInsights. Loaded via next/dynamic with ssr: false
 * in layout to avoid hydration mismatch and module loading errors.
 */
export const VercelAnalyticsWrapper = () => (
  <>
    <Analytics />
    <SpeedInsights />
  </>
);
