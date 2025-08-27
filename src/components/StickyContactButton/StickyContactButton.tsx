'use client';

import Phone from '@assets/icons/phone-flip.svg';
import { motion } from 'framer-motion';

import { useDisclosure } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';

import ContactsInfoModal from '../ContactsInfoModal';

const StickyContactButton = () => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box position='fixed' bottom='30px' right='30px' zIndex={1000}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Box
            as='button'
            aria-label='Scroll to top'
            onClick={onOpen}
            bg='gray.700'
            color='white'
            borderRadius='full'
            boxShadow='lg'
            _hover={{
              transform: 'translateY(-2px) rotate(90deg)',
              boxShadow: 'xl',
              bg: 'gray.600'
            }}
            _active={{
              transform: 'translateY(0px) rotate(90deg)'
            }}
            width='65px'
            height='65px'
            transform='rotate(90deg)'
            display='flex'
            alignItems='center'
            justifyContent='center'
            cursor='pointer'
            border='none'
            outline='none'
            transition='all 0.3s ease-in-out'
          >
            <Phone fill='white' width='30px' height='30px' />
          </Box>
        </motion.div>
      </Box>

      <ContactsInfoModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default StickyContactButton;
