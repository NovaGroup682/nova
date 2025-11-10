import { MetadataRoute } from 'next';

import config from 'config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/private/']
      }
    ],
    sitemap: `${config.metadata.domen}/sitemap.xml`,
    host: config.metadata.domen
  };
}

