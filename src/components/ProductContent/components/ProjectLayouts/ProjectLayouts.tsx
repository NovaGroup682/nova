'use client';

import { GOOGLE_LINK } from 'constant';
import Image from 'next/image';

import { AspectRatio, Flex, Stack, Text, VStack } from '@chakra-ui/react';

import { LayoutsPlanType } from 'types';

import { EditProjectButton } from '../EditProjectButton';

interface ProjectLayoutsProps {
  label: string;
  openModal: () => void;
  area: number;
  constructionArea: number;
  plans: LayoutsPlanType[];
}

const ProjectLayouts = ({
  label,
  openModal,
  area,
  constructionArea,
  plans
}: ProjectLayoutsProps) => (
  <VStack w='full' gap={2}>
    <Text
      w='full'
      textAlign='left'
      fontSize={{
        base: 16,
        md: 24
      }}
    >
      {label}
    </Text>
    <Flex
      w='full'
      justifyContent='space-between'
      alignItems='center'
      flexDir={{
        base: 'column',
        md: 'row'
      }}
      gap={{
        base: 2,
        md: 4
      }}
      my={{
        base: 0,
        md: 4
      }}
    >
      <Flex
        alignItems='center'
        gap={4}
        justifyContent={{
          base: 'flex-start',
          md: 'flex-start'
        }}
        w={{
          base: 'full',
          md: 'auto'
        }}
      >
        <Text
          fontSize={{
            base: 14,
            md: 16
          }}
          color='gray.500'
        >
          {`Общая площадь ${area} м`}&#178;
        </Text>
        <Text
          fontSize={{
            base: 14,
            md: 16
          }}
          color='gray.500'
        >
          {`Строительная площадь ${constructionArea} м`}&#178;
        </Text>
      </Flex>

      <EditProjectButton onClick={openModal} />
    </Flex>

    <Stack
      w='full'
      gap={4}
      flexDirection={{
        base: 'column',
        md: plans.length === 1 ? 'column' : 'row'
      }}
      maxW={{
        base: 'full',
        md: plans.length === 1 ? '50%' : 'full'
      }}
    >
      {plans.map((plan, idx) => (
        <Stack
          key={plan.img}
          w='full'
          gap={4}
          flexDirection='column'
          justifyContent='center'
        >
          <Text
            fontWeight={400}
            fontSize={{
              base: '18px',
              md: '24px'
            }}
            textAlign='center'
            mt={{
              base: 2,
              md: 0
            }}
          >
            {`План ${idx % 2 ? 'второго' : 'первого'} этажа`}
          </Text>
          <AspectRatio position='relative' ratio={4 / 5}>
            <Image
              src={GOOGLE_LINK + plan.img}
              alt='Background'
              fill
              style={{
                objectFit: 'contain',
                objectPosition: idx % 2 ? 'center' : 'center'
              }}
              priority
              sizes='(max-width: 450px) 400px, 1200px'
              quality={75}
            />
          </AspectRatio>
        </Stack>
      ))}
    </Stack>
  </VStack>
);

export default ProjectLayouts;
