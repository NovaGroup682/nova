import { BASE_HORIZONTAL_PADINGS, maxWidth } from 'constant';
import projects from 'constant/projects';

import { Flex, Text, VStack } from '@chakra-ui/react';

import { ProjectSearchKeys } from 'types';

import { ProjectsFilter, ProjectsList, SearchInput } from 'components';

export const metadata = {
  title: 'Проекты современных каменных домов | Nova Group',
  description:
    'Каталог проектов современных каменных домов. Выберите подходящий проект для строительства вашего дома.',
  keywords: 'проекты домов, каменные дома, строительство, архитектура',
  openGraph: {
    title: 'Проекты домов | Nova Group',
    description:
      'Каталог проектов современных каменных домов от Nova Group. Типовые решения с продуманной планировкой и понятным бюджетом.',
    type: 'website',
    url: 'https://ngnova.ru/projects',
    siteName: 'Nova Group',
    images: [
      {
        url: '/assets/images/main_page/main.jpg',
        width: 1200,
        height: 630,
        alt: 'Проекты домов Nova Group - Современные каменные дома',
        type: 'image/jpeg'
      }
    ],
    locale: 'ru_RU',
    countryName: 'Russia'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Проекты домов | Nova Group',
    description: 'Каталог проектов современных каменных домов от Nova Group',
    images: ['/assets/images/main_page/main.jpg']
  }
};

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
        px={BASE_HORIZONTAL_PADINGS}
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
            as='h1'
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
