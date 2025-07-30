import projects from 'constant/projects';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { ProjectSearchKeys } from 'types';

import { ProjectsFilter, ProjectsList } from 'components';

const ProjectsPage = async ({
  searchParams
}: {
  searchParams: Promise<Record<ProjectSearchKeys, string>>;
}) => {
  const filters = await searchParams;

  return (
    <VStack
      gap={0}
      w='full'
      position='relative'
      justifyContent='flex-start'
      alignItems='center'
      flex={1}
    >
      <VStack
        gap={4}
        w='full'
        maxW='1440px'
        px={{ base: '16px', sm: '32px', md: '60px', lg: '80px' }}
        py={{ base: '16px', sm: '32px', md: '40px', lg: '60px' }}
      >
        <Flex w='full' justifyContent='space-between'>
          <Text
            as='h2'
            fontSize={{
              base: '20px',
              md: '34px'
            }}
            lineHeight={{
              base: '30px',
              md: '52px'
            }}
          >
            Проекты современных каменных домов
          </Text>
          <Box />
        </Flex>
        <ProjectsFilter />
        <ProjectsList projects={projects} filters={filters} />
      </VStack>
    </VStack>
  );
};

export default ProjectsPage;
