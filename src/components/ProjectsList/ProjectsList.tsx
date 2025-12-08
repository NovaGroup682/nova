'use client';

import { memo, useMemo } from 'react';
import { BASE_HORIZONTAL_PADINGS } from 'constant';
import { useSearchParams } from 'next/navigation';

import { Box, SimpleGrid, Text } from '@chakra-ui/react';

import { ProjectItemType, ProjectSearchKeys } from 'types';

import { ProductItem } from './components';

interface ProjectsListProps {
  projects: ProjectItemType[];
}

const ProjectsList = ({ projects }: ProjectsListProps) => {
  const searchParams = useSearchParams();

  const memoizedFilters = useMemo(() => {
    const filters: Record<ProjectSearchKeys, string> = {
      [ProjectSearchKeys.area]: searchParams.get(ProjectSearchKeys.area) || '',
      [ProjectSearchKeys.floors]:
        searchParams.get(ProjectSearchKeys.floors) || '',
      [ProjectSearchKeys.minPrice]:
        searchParams.get(ProjectSearchKeys.minPrice) || '',
      [ProjectSearchKeys.maxPrice]:
        searchParams.get(ProjectSearchKeys.maxPrice) || '',
      [ProjectSearchKeys.projectName]:
        searchParams.get(ProjectSearchKeys.projectName) || ''
    };
    return filters;
  }, [searchParams]);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        if (memoizedFilters.area && project.areaType !== memoizedFilters.area) {
          return false;
        }

        if (memoizedFilters.floors?.length) {
          const floorsArray = memoizedFilters.floors.split(',').map(Number);
          if (!floorsArray.includes(project.floor)) {
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

  const hasAppliedFilters = useMemo(
    () => Object.values(memoizedFilters).some((value) => value),
    [memoizedFilters]
  );

  return (
    <Box
      w='full'
      h='full'
      flex={1}
      flexDir='column'
      justifyContent='center'
      alignItems='center'
      display='flex'
    >
      {hasAppliedFilters && filteredProjects.length === 0 ? (
        <Box
          px={BASE_HORIZONTAL_PADINGS}
          display='flex'
          flexDir='column'
          flex={1}
          justifyContent='center'
          alignItems='center'
          h='full'
          mb={2}
          color='gray.600'
          fontSize='sm'
        >
          <Text>По заданным фильтрам проекты не найдены</Text>
        </Box>
      ) : (
        memoizedFilters.projectName && (
          <Box
            px={BASE_HORIZONTAL_PADINGS}
            mb={2}
            color='gray.600'
            fontSize='sm'
          >
            Найдено проектов: {resultsCount}
          </Box>
        )
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
