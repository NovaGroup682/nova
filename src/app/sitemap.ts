import { MetadataRoute } from 'next';

import { generateSitemap } from './sitemap-generator';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemap();
}
