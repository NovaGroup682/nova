import { maxWidth } from 'constant';
import projects from 'constant/projects';

import { Flex, Text, VStack } from '@chakra-ui/react';

import { ProjectSearchKeys } from 'types';

import { ProjectsFilter, ProjectsList, SearchInput } from 'components';

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
        maxW={maxWidth}
        px={{ base: '16px', sm: '32px', md: '60px', lg: '80px' }}
        pt={{ base: '16px', sm: '32px', md: '40px', lg: '60px' }}
        mb={4}
      >
        <Flex
          w='full'
          justifyContent='space-between'
          alignItems='center'
          flexDir={{
            base: 'column',
            md: 'row'
          }}
          gap={4}
        >
          <Text
            as='h2'
            fontSize={{
              base: '24px',
              md: '34px'
            }}
            lineHeight={{
              base: '30px',
              md: '52px'
            }}
          >
            Проекты современных каменных домов
          </Text>
          <SearchInput />
        </Flex>
        <ProjectsFilter />
      </VStack>
      <ProjectsList projects={projects} filters={filters} />
    </VStack>
  );
};

export default ProjectsPage;
