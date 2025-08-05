'use client';

import { useEffect, useState } from 'react';

import {
  Button as ChakraButton,
  ButtonProps,
  Flex,
  Text,
  useDisclosure
} from '@chakra-ui/react';

import { ProjectItemType } from 'types';

import { EstimateModal } from '../EstimateModal';

const baseStyles = {
  position: 'fixed',
  left: 0,
  right: 0,
  zIndex: 1000,
  transition: 'all 0.3s ease-in-out',
  overflow: 'hidden',
  justifyContent: 'center',
  alignItems: 'center'
};

interface EstimateDownloadButtonProps {
  project: ProjectItemType;
}

const Button = ({ onClick }: ButtonProps) => (
  <ChakraButton
    onClick={onClick}
    size='2xl'
    className='pulse-animation'
    bg='gray.500'
    color='white'
    _hover={{
      bg: 'gray.600'
    }}
    transition='all 0.3s ease'
    mr={2}
  >
    Смета в PDF - скачать
  </ChakraButton>
);

const EstimateDownloadButton = ({ project }: EstimateDownloadButtonProps) => {
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show sticky header when scrolling down more than 100px
      if (currentScrollY > 100) {
        setIsStickyVisible(true);
      } else {
        setIsStickyVisible(false);
      }

      // Check if we're near the footer (within 200px of bottom)
      const distanceFromBottom =
        documentHeight - (currentScrollY + windowHeight);
      if (distanceFromBottom < 200) {
        setIsNearFooter(true);
      } else {
        setIsNearFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Flex
        display={{
          base: 'none',
          md: 'flex'
        }}
        top={0}
        bg='white'
        boxShadow='2xl'
        opacity={isStickyVisible ? 1 : 0}
        visibility={isStickyVisible ? 'visible' : 'hidden'}
        transform={isStickyVisible ? 'translateY(0)' : 'translateY(-100%)'}
        {...baseStyles}
      >
        <Flex
          alignItems='center'
          gap={3}
          w='full'
          maxW='1440px'
          justifyContent='space-between'
          px={{ base: '16px', sm: '32px', md: '60px', lg: '80px' }}
          py={4}
        >
          <Text
            as='h2'
            fontSize={{
              base: '24px',
              md: '34px'
            }}
            lineHeight={{
              base: '30px',
              md: '52px'
            }}
          >
            {project.name}
          </Text>

          <Button onClick={onOpen} />
        </Flex>
      </Flex>

      <Flex
        display={{
          base: 'flex',
          md: 'none'
        }}
        bottom={0}
        opacity={isStickyVisible && !isNearFooter ? 1 : 0}
        visibility={isStickyVisible && !isNearFooter ? 'visible' : 'hidden'}
        transform={
          isStickyVisible && !isNearFooter
            ? 'translateY(0)'
            : 'translateY(100%)'
        }
        {...baseStyles}
      >
        <Flex
          alignItems='center'
          gap={3}
          flexShrink={0}
          bg='#ffffff94'
          w='full'
          py={4}
          justifyContent='center'
        >
          <Button onClick={onOpen} />
        </Flex>
      </Flex>

      <EstimateModal isOpen={isOpen} onClose={onClose} project={project} />
    </>
  );
};

export default EstimateDownloadButton;
