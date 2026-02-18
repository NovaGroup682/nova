import { cache } from 'react';
import { PROJECTS_JSON_URL } from 'constant';
import { unstable_cache } from 'next/cache';

import { ProjectItemType, ProjectSize } from 'types';

const isValidAreaType = (v: string): v is ProjectSize =>
  Object.values(ProjectSize).includes(v as ProjectSize);

const FETCH_CACHE_TAG = 'projects';
/** 0 = всегда свежие данные с PROJECTS_JSON_URL; для кэша на 1 час укажите 3600 */
const REVALIDATE_SECONDS = 60;

async function fetchProjectsFromSource(): Promise<ProjectItemType[]> {
  const res = await fetch(PROJECTS_JSON_URL, {
    cache: 'no-store',
    headers: { Accept: 'application/json' }
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch projects: ${res.status} ${res.statusText}`
    );
  }

  const raw = (await res.json()) as unknown;

  if (!Array.isArray(raw)) {
    throw new Error('Projects response is not an array');
  }

  return raw.map((item: Record<string, unknown>) => {
    const areaType = item.areaType;
    return {
      ...item,
      areaType:
        typeof areaType === 'string' && isValidAreaType(areaType)
          ? areaType
          : ProjectSize.m
    } as ProjectItemType;
  });
}

const getCachedProjects = unstable_cache(
  fetchProjectsFromSource,
  [FETCH_CACHE_TAG],
  { revalidate: REVALIDATE_SECONDS, tags: [FETCH_CACHE_TAG] }
);

export const getProjects = cache(getCachedProjects);
