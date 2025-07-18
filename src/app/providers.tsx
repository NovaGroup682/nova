'use client';

import { ReactNode } from 'react';

import { ChakraProvider, VStack } from '@chakra-ui/react';

import theme from 'styles/theme';

const Providers = ({ children }: { children: ReactNode }) => (
  <ChakraProvider value={theme}>
    <VStack
      position='relative'
      zIndex={1}
      minH='100vh'
      maxW='full'
      w='full'
      gap={0}
      p={0}
      m={0}
      justifyContent='space-between'
      overflowX='hidden'
    >
      {children}
    </VStack>
  </ChakraProvider>
);

export default Providers;
