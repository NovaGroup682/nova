import { BASE_HORIZONTAL_PADINGS, maxWidth } from 'constant';
import projects from 'constant/projects';

import { Flex, Show, Text, VStack } from '@chakra-ui/react';

import { formatCurrency } from 'helpers';

import { ProjectItemType, ProjectItemVariantType } from 'types';

import {
  ContactSection,
  EstimateDownloadButton,
  ProjectLayouts
} from 'components';
import { SliderBlockWrapper } from 'components/ProductContent/components/SliderBlock';

const findProjectById = (id: string): ProjectItemType | null =>
  projects.find((item) => String(item.id) === id) || null;

export const generateMetadata = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const project = findProjectById(id);

  if (!project) {
    return {
      title: 'Проект не найден | Nova Group',
      description: 'Запрашиваемый проект не найден.'
    };
  }

  return {
    title: `${project.name} - Проект дома | Nova Group`,
    description: `Проект дома ${project.name}. Площадь: ${project.variants[0]?.area}м². Цена: ${formatCurrency(project.projectPrice)}.`,
    keywords: `проект дома, ${project.name}, строительство, архитектура, ${project.variants[0]?.area}м²`
  };
};

export const generateStaticParams = async () =>
  projects.map((project) => ({
    id: String(project.id)
  }));

const ProjectPageContent = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const project = findProjectById(id);

  if (!project) {
    return (
      <VStack
        gap={4}
        w='full'
        maxW={maxWidth}
        px={BASE_HORIZONTAL_PADINGS}
        py={{ base: '16px', sm: '32px', md: '40px', lg: '60px' }}
        justifyContent='center'
        minH='50vh'
      >
        <Text
          as='h1'
          fontSize={{
            base: '24px',
            md: '34px'
          }}
          textAlign='center'
          color='gray.500'
        >
          Проект не найден
        </Text>
        <Text
          fontSize={{
            base: '16px',
            md: '18px'
          }}
          textAlign='center'
          color='gray.400'
        >
          Запрашиваемый проект не существует или был удален.
        </Text>
      </VStack>
    );
  }

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
            {project.name}
          </Text>

          <Text
            fontWeight={400}
            fontSize={{
              base: '18px',
              md: '24px'
            }}
          >
            <Text as='span' color='gray.500' pr={2}>
              цена проекта
            </Text>
            {formatCurrency(project.projectPrice)}
          </Text>
        </Flex>

        <SliderBlockWrapper sliders={project.sliders} />

        {project.variants.map(
          (variant: ProjectItemVariantType, idx: number) => (
            <ProjectLayouts
              key={`variant-${idx + 1}`}
              label={project.variants.length > 1 ? `Вариант ${idx + 1}` : ''}
              area={variant.area}
              plans={variant.layouts}
            />
          )
        )}
        {/* Temporary removed */}
        {/* <ProjectConfigurationsTable
          prices={Object.values(project?.implementationCost ?? '') ?? []}
        /> */}
      </VStack>

      <Show when={project?.estimateFileLink}>
        <EstimateDownloadButton project={project} />
      </Show>
      <ContactSection />
    </VStack>
  );
};

const ProjectPage = async ({ params }: { params: Promise<{ id: string }> }) => (
  <ProjectPageContent params={params} />
);

export default ProjectPage;
