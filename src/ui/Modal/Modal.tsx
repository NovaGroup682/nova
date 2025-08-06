'use client';

import { ReactNode, useEffect, useRef } from 'react';

import { Box, Portal, Show, StackProps, VStack } from '@chakra-ui/react';

interface ModalProps extends StackProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children, ...styles }: ModalProps) => {
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
          zIndex='9999'
          display='flex'
          alignItems='center'
          justifyContent='center'
          cursor='pointer'
          animation='fade-in 0.3s ease-out'
        >
          <VStack
            ref={sliderRef}
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
          </VStack>
        </Box>
      </Portal>
    </Show>
  );
};

export default Modal;
