'use client';

import { Box, useDisclosure } from '@chakra-ui/react';

import content from 'content';

import { ContactModal } from 'components/ContactBlock/components';
import { NavigationActionButton } from 'ui';

const DesignContact = () => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w='full' textAlign='center'>
      <NavigationActionButton onClick={onOpen} label={content.common.call} />

      <ContactModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default DesignContact;
