'use client';

import { Box, Text, useDisclosure, VStack } from '@chakra-ui/react';

import content from 'content';

import { ContactModal } from 'components/ContactModal';
import { NavigationActionButton } from 'ui';

const ContactUs = () => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  return (
    <VStack
      position='relative'
      w='full'
      justifyContent={{
        base: 'center',
        md: 'flex-end'
      }}
      transition='all 0.3s ease'
    >
      <VStack
        w='full'
        h='full'
        alignItems='center'
        justifyContent='flex-end'
        py={{ base: '16px', md: '32px' }}
      >
        <Box padding='4' mb={{ base: 0, md: 2 }}>
          <Text
            fontWeight={600}
            color='black'
            fontSize={{
              base: 16,
              md: 24
            }}
            whiteSpace='pre-line'
            textAlign='center'
          >
            {content.main.contactBlock.helpText}
          </Text>
        </Box>

        <NavigationActionButton onClick={onOpen} label={content.common.call} />
      </VStack>

      <ContactModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default ContactUs;
