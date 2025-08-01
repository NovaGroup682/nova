'use client';

import Arrow from '@assets/icons/arrow-left.svg';
import { GOOGLE_LINK } from 'constant';
import colors from 'constant/colors';
import Image from 'next/image';

import { Box, Flex, Stack, Text, VStack } from '@chakra-ui/react';

import { LayoutsPlanType } from 'types';

interface ProjectLayoutsProps {
  label: string;
  area: number;
  constructionArea: number;
  plans: LayoutsPlanType[];
}

const ProjectLayouts = ({
  label,
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
      gap={4}
      my={4}
    >
      <Flex alignItems='center' gap={4}>
        <Text fontSize={16}>{`Общая площадь ${area} м`}&#178;</Text>
        <Text fontSize={16}>
          {`Строительная площадь ${constructionArea} м`}&#178;
        </Text>
      </Flex>

      <Flex
        fontSize={16}
        alignItems='center'
        color='gray.500'
        gap={2}
        cursor='pointer'
      >
        <Arrow fill={colors.gray[500].value} width={15} height={15} />
        Внести изменения в проект
      </Flex>
    </Flex>

    <Stack
      w='full'
      gap={4}
      flexDirection={plans.length === 1 ? 'column' : 'row'}
    >
      {plans.map((plan, idx) => (
        <VStack key={plan.img} w='full' gap={4}>
          <Text
            fontWeight={400}
            fontSize={{
              base: '18px',
              md: '24px'
            }}
          >
            {`План ${idx % 2 ? 'второго' : 'первого'} этажа`}
          </Text>
          <Flex
            w='full'
            gap={8}
            flexDirection={idx % 2 ? 'row-reverse' : 'row'}
          >
            <Box w='full' h={700} position='relative'>
              <Image
                src={GOOGLE_LINK + plan.img}
                alt='Background'
                fill
                style={{
                  objectFit: 'contain',
                  objectPosition: idx % 2 ? 'right' : 'left'
                }}
                priority
                sizes='(max-width: 450px) 400px, 1200px'
                quality={75}
              />
            </Box>
            {plans.length === 1 && (
              <Box w='full' alignContent='center'>
                <Flex justifyContent={idx % 2 ? 'flex-end' : 'flex-start'}>
                  <Box
                    as='ul'
                    listStyleType='numeric'
                    width='auto'
                    textAlign='left'
                  >
                    {Object.values(plan.planWithArea).map((li) => (
                      <Box key={li} as='li' _marker={{ right: 1 }}>
                        {li}
                      </Box>
                    ))}
                  </Box>
                </Flex>
              </Box>
            )}
          </Flex>
        </VStack>
      ))}
    </Stack>
  </VStack>
);

export default ProjectLayouts;
