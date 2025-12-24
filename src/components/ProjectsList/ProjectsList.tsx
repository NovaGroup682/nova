'use client';

import { memo, useMemo } from 'react';
import { BASE_HORIZONTAL_PADINGS } from 'constant';

import { Box, SimpleGrid } from '@chakra-ui/react';

import { ProjectItemType, ProjectSearchKeys } from 'types';

import { ProductItem } from './components';

interface ProjectsListProps {
  projects: ProjectItemType[];
  filters: Record<ProjectSearchKeys, string>;
}

const ProjectsList = ({ projects, filters }: ProjectsListProps) => {
  const memoizedFilters = useMemo(() => filters, [filters]);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        if (memoizedFilters.area && project.areaType !== memoizedFilters.area) {
          return false;
        }

        if (memoizedFilters.floors?.length) {
          const projectFloor = String(project.floor);
          if (!memoizedFilters.floors.includes(projectFloor)) {
            return false;
          }
        }

        if (memoizedFilters.projectName) {
          const projectName = project.name.toLowerCase();
          const searchName = memoizedFilters.projectName.toLowerCase();
          if (!projectName.includes(searchName)) {
            return false;
          }
        }

        const shellPrice = project.implementationCost.shell;
        const minPrice = memoizedFilters.minPrice
          ? Number(memoizedFilters.minPrice)
          : null;
        const maxPrice = memoizedFilters.maxPrice
          ? Number(memoizedFilters.maxPrice)
          : null;

        if (minPrice !== null && shellPrice < minPrice) {
          return false;
        }

        if (maxPrice !== null && shellPrice > maxPrice) {
          return false;
        }

        return true;
      }),
    [projects, memoizedFilters]
  );

  const projectItems = useMemo(
    () =>
      filteredProjects.map((project) => (
        <ProductItem project={project} key={project.id} />
      )),
    [filteredProjects]
  );

  const resultsCount = filteredProjects.length;

  const hasActiveFilters = useMemo(
    () =>
      Object.values(filters).some(
        (value) =>
          value !== undefined && value !== null && String(value).trim() !== ''
      ),
    [filters]
  );

  return (
    <Box w='full'>
      {hasActiveFilters && (
        <Box px={BASE_HORIZONTAL_PADINGS} mb={2} color='gray.600' fontSize='sm'>
          Найдено проектов: {resultsCount}
        </Box>
      )}

      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3
        }}
        gap={2}
        w='full'
        mt={4}
        px='10px'
        pb={{ base: '16px', sm: '32px', md: '40px', lg: '60px' }}
      >
        {projectItems}
      </SimpleGrid>
    </Box>
  );
};

export default memo(ProjectsList);
