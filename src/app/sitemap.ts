import { MetadataRoute } from 'next';

import { generateSitemap } from './sitemap-generator';

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemap();
}
