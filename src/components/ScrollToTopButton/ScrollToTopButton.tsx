'use client';

import { useEffect, useState } from 'react';
import Arrow from '@assets/icons/arrow-left.svg';
import { AnimatePresence, motion } from 'framer-motion';

import { Box } from '@chakra-ui/react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show button when user scrolls down 100vh
      setIsVisible(scrollPosition > windowHeight);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Box position='fixed' bottom='106px' right='30px' zIndex={1000}>
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
              onClick={scrollToTop}
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
              <Arrow fill='white' width='40px' height='40px' />
            </Box>
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
