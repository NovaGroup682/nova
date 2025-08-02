'use client';

import { GOOGLE_LINK } from 'constant';
import Image from 'next/image';

import { Box, Flex, Stack, Text, VStack } from '@chakra-ui/react';

import { LayoutsPlanType } from 'types';

import { EditProjectButton } from '../EditProjectButton';

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

      <EditProjectButton />
    </Flex>

    <Stack
      w='full'
      gap={4}
      flexDirection={{
        base: 'column',
        md: plans.length === 1 ? 'column' : 'row'
      }}
    >
      {plans.map((plan, idx) => (
        <Stack
          key={plan.img}
          w='full'
          gap={4}
          flexDirection={{
            base: 'column',
            md: 'column'
          }}
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
          <Flex
            w='full'
            gap={{
              base: 2,
              md: 8
            }}
            flexDirection={{
              base: 'column',
              md: idx % 2 ? 'row-reverse' : 'row'
            }}
          >
            <Box
              w='full'
              h={{
                base: 400,
                md: 700
              }}
              position='relative'
            >
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
                      <Box
                        ml={{
                          base: '24px',
                          md: 0
                        }}
                        key={li}
                        as='li'
                        _marker={{ right: 1 }}
                      >
                        {li}
                      </Box>
                    ))}
                  </Box>
                </Flex>
              </Box>
            )}
          </Flex>
        </Stack>
      ))}
    </Stack>
  </VStack>
);

export default ProjectLayouts;
