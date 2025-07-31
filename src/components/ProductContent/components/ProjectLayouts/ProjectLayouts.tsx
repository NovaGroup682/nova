'use client';

import { GOOGLE_LINK } from 'constant';
import Image from 'next/image';

import { Box, Flex, Text, VStack } from '@chakra-ui/react';

import { LayoutsPlanType } from 'types';

interface ProjectLayoutsProps {
  plans: LayoutsPlanType[];
}

const ProjectLayouts = ({ plans }: ProjectLayoutsProps) => (
  <VStack w='full' gap={4}>
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
        <Flex w='full' gap={8} flexDirection={idx % 2 ? 'row-reverse' : 'row'}>
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
          <Box w='full' alignContent='center'>
            <Flex justifyContent={idx % 2 ? 'flex-end' : 'flex-start'}>
              <Box
                as='ul'
                listStyleType='numeric'
                width='auto'
                textAlign='left'
              >
                {Object.values(plan.planWithArea).map((li) => (
                  <Box key='li' as='li' _marker={{ right: 1 }}>
                    {li}
                  </Box>
                ))}
              </Box>
            </Flex>
          </Box>
        </Flex>
      </VStack>
    ))}
  </VStack>
);

export default ProjectLayouts;
