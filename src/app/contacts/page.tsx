'use client';

import { VStack } from '@chakra-ui/react';

import content from 'content';

import { ContactContent } from 'components/ContactContent';

const Contacts = () => (
  <VStack
    gap={0}
    w='full'
    position='relative'
    justifyContent='flex-start'
    alignItems='center'
    flex={1}
  >
    <ContactContent {...content.contacts} />
  </VStack>
);

export default Contacts;
