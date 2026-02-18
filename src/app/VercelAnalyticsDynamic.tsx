'use client';

import dynamic from 'next/dynamic';

const VercelAnalyticsWrapper = dynamic(
  () =>
    import('./VercelAnalyticsWrapper').then(
      (mod) => mod.VercelAnalyticsWrapper
    ),
  { ssr: false }
);

export const VercelAnalyticsDynamic = () => <VercelAnalyticsWrapper />;
