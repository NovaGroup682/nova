'use client';

import { ReactNode, useEffect, useRef } from 'react';
import CloseIcon from '@assets/icons/circle-xmark.svg';

import {
  Box,
  IconButton,
  Portal,
  Show,
  StackProps,
  VStack
} from '@chakra-ui/react';

interface ModalProps extends StackProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  isScrollable?: boolean;
  isDark?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  children,
  isScrollable,
  isDark,
  ...styles
}: ModalProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sliderRef.current &&
        !sliderRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <Show when={isOpen}>
      <Portal>
        <Box
          shadow='lg'
          position='fixed'
          top='0'
          left='0'
          w='100vw'
          h='100vh'
          backdropFilter='blur(0.5rem)'
          bg={isDark ? 'rgba(0, 0, 0, 0.5)' : 'transparent'}
          zIndex='9999'
          display='flex'
          alignItems='center'
          justifyContent='center'
          cursor='pointer'
          animation='fade-in 0.3s ease-out'
          overflowY={isScrollable ? 'scroll' : 'hidden'}
        >
          <VStack
            ref={sliderRef}
            data-modal-content
            bg='white'
            borderRadius='2xl'
            maxW={{
              base: 'auto',
              md: '600px'
            }}
            w={{
              base: '90%',
              md: '80%'
            }}
            boxShadow='lg'
            cursor='default'
            position='relative'
            overflow='hidden'
            justifyContent='center'
            alignItems='center'
            gap={6}
            animation='fade-in 0.3s ease-out'
            {...styles}
          >
            {children}

            <IconButton
              display={{ base: 'flex', md: 'none' }}
              aria-label='Close modal'
              position='fixed'
              right='40px'
              top='40px'
              bg='white'
              color='white'
              _hover={{ bg: 'rgba(255, 255, 255, 0.2)' }}
              onClick={onClose}
              zIndex={10001}
            >
              <CloseIcon fill='gray.400' />
            </IconButton>
          </VStack>
        </Box>
      </Portal>
    </Show>
  );
};

export default Modal;
