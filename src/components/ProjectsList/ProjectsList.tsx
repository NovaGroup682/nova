'use client';

import { memo, useMemo } from 'react';

import { SimpleGrid } from '@chakra-ui/react';

import { ProjectItemType, ProjectSearchKeys } from 'types';

import { ProductItem } from './components';

interface ProjectsListProps {
  projects: ProjectItemType[];
  filters: Record<ProjectSearchKeys, string>;
}

const ProjectsList = ({ projects, filters }: ProjectsListProps) => {
  const list = useMemo(
    () =>
      projects
        .filter((project) => !filters.area || project.areaType === filters.area)
        .filter(
          (project) =>
            !(filters.floors ?? []).length ||
            filters.floors.includes(String(project.floor))
        )
        .filter((project) => {
          // Filter by project name (case-insensitive partial match)
          if (!filters.projectName) return true;
          return project.name
            .toLowerCase()
            .includes(filters.projectName.toLowerCase());
        }),
    [projects, filters]
  );

  return (
    <SimpleGrid
      columns={{
        base: 1,
        md: 2,
        lg: 3
      }}
      gap={2}
      w='full'
      mt={4}
    >
      {list.map((project) => (
        <ProductItem project={project} key={project.id} />
      ))}
    </SimpleGrid>
  );
};

export default memo(ProjectsList);
