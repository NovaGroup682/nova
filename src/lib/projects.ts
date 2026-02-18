import { cache } from 'react';
import { PROJECTS_JSON_URL } from 'constant';

import { ProjectItemType, ProjectSize } from 'types';

const isValidAreaType = (v: string): v is ProjectSize =>
  Object.values(ProjectSize).includes(v as ProjectSize);

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

export const getProjects = cache(fetchProjectsFromSource);
