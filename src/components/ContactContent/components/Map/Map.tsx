'use client';

import { lazy, Suspense } from 'react';

import { Box, Flex, Skeleton, Text, VStack } from '@chakra-ui/react';

const LazyYandexMap = lazy(() =>
  import('components').then((module) => ({
    default: module.YandexMap
  }))
);

interface MapProps {
  address: string[];
  coordinates: number[];
}

const Map = ({ address, coordinates }: MapProps) => (
  <VStack
    gap={3}
    w='full'
    alignItems='flex-start'
    justifyContent='space-between'
    mt={4}
  >
    <Flex
      w='full'
      justifyContent='space-between'
      flexDirection={{
        base: 'column',
        lg: 'row'
      }}
      gap={2}
    >
      <Text
        fontWeight={400}
        as='h3'
        fontSize={{
          base: '20px',
          md: '24px'
        }}
        lineHeight={{
          base: '20px',
          md: '24px'
        }}
      >
        {address.join(', ')}
      </Text>
      <Text
        fontWeight={400}
        color='gray.200'
        fontSize={{
          base: '16px',
          md: '20px'
        }}
        lineHeight={{
          base: '16px',
          md: '20px'
        }}
      >
        Встречи в офисе по записи!
      </Text>
    </Flex>
    <Box w='full' h={{ base: '250px', md: '350px' }} py={2}>
      <Suspense
        fallback={<Skeleton height='100%' width='100%' borderRadius='8px' />}
      >
        <LazyYandexMap
          address={address}
          coordinates={coordinates}
          height='100%'
          width='100%'
        />
      </Suspense>
    </Box>
  </VStack>
);

export default Map;
