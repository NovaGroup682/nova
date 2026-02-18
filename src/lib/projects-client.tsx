'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import type { ProjectItemType } from 'types';

type ProjectsState = {
  data: ProjectItemType[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

const ProjectsContext = createContext<ProjectsState | null>(null);

const API_PROJECTS = '/api/projects';

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ProjectItemType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(API_PROJECTS);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = (await res.json()) as ProjectItemType[];
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e : new Error('Failed to fetch projects'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const value = useMemo<ProjectsState>(
    () => ({ data, isLoading, error, refetch: fetchProjects }),
    [data, isLoading, error, fetchProjects]
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};

export function useProjects(): ProjectsState {
  const ctx = useContext(ProjectsContext);
  if (!ctx) {
    throw new Error('error fetch projects');
  }
  return ctx;
}
