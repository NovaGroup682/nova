import projects from 'constant/projects';

import { Button, Flex, Text, VStack } from '@chakra-ui/react';

import { ProjectLayouts, SliderBlock } from 'components';

const ProjectsPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const project = projects.find((item) => String(item.id) === id);

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
        <Flex
          w='full'
          justifyContent='space-between'
          alignItems='flex-end'
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
            {project?.name ?? ''}
          </Text>

          <Text
            fontWeight={400}
            fontSize={{
              base: '18px',
              md: '24px'
            }}
          >
            {`цена проекта  ${project?.projectPrice ?? ''} ₽`}
          </Text>
        </Flex>
        <SliderBlock sliders={project?.sliders ?? []} />

        <Flex
          w='full'
          justifyContent='space-between'
          alignItems='center'
          flexDir={{
            base: 'column',
            md: 'row'
          }}
          gap={4}
          my={4}
        >
          <Text
            fontWeight={400}
            fontSize={{
              base: '18px',
              md: '24px'
            }}
          >
            {`Общая площадь ${project?.area} м`}&#178;
          </Text>
          <Text
            fontWeight={400}
            fontSize={{
              base: '18px',
              md: '24px'
            }}
          >
            {`Строительная площадь ${project?.constructionArea} м`}&#178;
          </Text>

          <Button size='2xl' px={12}>
            Внести изменения в проект
          </Button>
        </Flex>

        <ProjectLayouts plans={project?.layouts ?? []} />
      </VStack>
    </VStack>
  );
};

export default ProjectsPage;
