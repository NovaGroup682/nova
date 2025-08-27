import config from 'config';
import projects from 'constant/projects';
import { MetadataRoute } from 'next';

interface SitemapItem {
  url: string;
  lastModified: Date;
  changeFrequency:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority: number;
}

export function generateSitemap(): SitemapItem[] {
  const baseUrl = config.metadata.domen;
  const currentDate = new Date();

  const staticPages: SitemapItem[] = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/design`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/contacts`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ];

  const projectPages: SitemapItem[] = projects.map((project) => {
    let priority = 0.7;

    if (project.areaType === 'xl') {
      priority = 0.9;
    } else if (project.areaType === 'l') {
      priority = 0.8;
    } else if (project.areaType === 'm') {
      priority = 0.7;
    }

    return {
      url: `${baseUrl}/project/${project.id}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority
    };
  });

  const filterPages: SitemapItem[] = [
    {
      url: `${baseUrl}/projects/size/m`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/projects/size/l`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/projects/size/xl`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${baseUrl}/projects/floor/1`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/projects/floor/2`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/projects/size/m/floor/1`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/projects/size/m/floor/2`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6
    },
    {
      url: `${baseUrl}/projects/size/l/floor/1`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/projects/size/l/floor/2`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/projects/size/xl/floor/1`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${baseUrl}/projects/size/xl/floor/2`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7
    }
  ];

  return [...staticPages, ...projectPages, ...filterPages];
}

export default function sitemap(): MetadataRoute.Sitemap {
  return generateSitemap();
}
