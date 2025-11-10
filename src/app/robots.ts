import config from 'config';
import { MetadataRoute } from 'next';

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
