'use client';

import { useEffect, useState } from 'react';
import projects from 'constant/projects';

import { Flex, Show, Text, VStack } from '@chakra-ui/react';

import { formatCurrency } from 'helpers';

import { ProjectItemType, ProjectItemVariantType } from 'types';

import {
  EstimateDownloadButton,
  ProjectLayouts,
  SliderBlock
} from 'components';
import { ProjectConfigurationsTable } from 'components/ProductContent/components/ProjectConfigurationsTable';

const ProjectsPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [project, setProject] = useState<ProjectItemType | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      const { id } = await params;
      const foundProject = projects.find((item) => String(item.id) === id);
      setProject(foundProject as ProjectItemType);
    };
    loadProject();
  }, [params]);

  if (!project) {
    return null;
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
            <Text as='span' color='gray.500' pr={2}>
              цена проекта
            </Text>
            {formatCurrency(project?.projectPrice)}
          </Text>
        </Flex>
        <SliderBlock sliders={project.sliders} />

        {project.variants.map(
          (variant: ProjectItemVariantType, idx: number) => (
            <ProjectLayouts
              key={`variant-${idx + 1}`}
              label={project.variants.length > 1 ? `Вариант ${idx + 1}` : ''}
              area={variant.area}
              constructionArea={variant.constructionArea}
              plans={variant.layouts}
            />
          )
        )}

        <ProjectConfigurationsTable
          prices={Object.values(project?.implementationCost ?? '') ?? []}
        />
      </VStack>

      <Show when={project?.estimateFileLink}>
        <EstimateDownloadButton project={project} />
      </Show>
    </VStack>
  );
};

export default ProjectsPage;
