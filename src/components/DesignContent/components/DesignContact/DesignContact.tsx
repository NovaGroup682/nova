'use client';

import { Box, useDisclosure } from '@chakra-ui/react';

import content from 'content';

import { ContactModal } from 'components/ContactModal';
import { NavigationActionButton } from 'ui';

const DesignContact = () => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w='full' textAlign='center'>
      <NavigationActionButton
        onClick={onOpen}
        label={content.common.call}
        my={{ base: 4, md: 0 }}
      />

      <ContactModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default DesignContact;
