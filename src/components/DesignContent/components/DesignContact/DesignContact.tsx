'use client';

import { Box, Button, useDisclosure } from '@chakra-ui/react';

import content from 'content';

import { ContactModal } from 'components/ContactBlock/components';

const DesignContact = () => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w='full' textAlign='center'>
      <Button
        w={{
          base: 'full',
          md: 300
        }}
        px={{
          base: '16px',
          md: '32px'
        }}
        py={{
          base: '16px',
          md: '24px'
        }}
        borderRadius='10px'
        fontFamily='body'
        colorScheme='blue'
        bg='#2d2d2d'
        m='0 auto'
        onClick={onOpen}
        _hover={{
          bg: 'gray.600',
          color: 'white'
        }}
      >
        {content.common.call}
      </Button>

      <ContactModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default DesignContact;
