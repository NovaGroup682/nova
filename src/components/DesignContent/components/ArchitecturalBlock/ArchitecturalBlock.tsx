'use client';

import { useState } from 'react';
import CloseIcon from '@assets/icons/circle-xmark.svg';
import Image from 'next/image';

import {
  AspectRatio,
  Box,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
  VStack
} from '@chakra-ui/react';

import { Modal } from 'ui';
import { DesignAnimatedList } from '../DesignAnimatedList';
import { DesignListCarousel } from '../DesignListCarousel';
import { DesignVideoButton } from '../DesignVideoButton';

interface CarouselItem {
  label: string;
  description: string;
  src: string;
}

interface ArchitecturalBlockProps {
  title: string;
  src: string;
  text1: string;
  text2: string;
  preview: string;
  video: string;
  carousel: CarouselItem[];
}

const ArchitecturalBlock = ({
  title,
  src,
  text1,
  text2,
  preview,
  video,
  carousel
}: ArchitecturalBlockProps) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  return (
    <VStack
      w='full'
      gap={{
        base: 4,
        md: 8
      }}
    >
      <Text
        fontSize={{ base: '28px', md: '36px' }}
        w='full'
        fontWeight='bold'
        color='black'
        textAlign={{
          base: 'center',
          md: 'left'
        }}
      >
        {title}
      </Text>
      <Flex
        w='full'
        gap={8}
        flexDirection={{
          base: 'column',
          md: 'row'
        }}
      >
        <VStack
          // h='full'
          justifyContent='center'
          alignItems='center'
          gap={6}
        >
          <Text
            fontSize={{ base: '22px', md: '28px' }}
            color='gray.600'
            opacity={0.8}
            lineHeight='1.6'
            textAlign={{
              base: 'center',
              md: 'left'
            }}
            letterSpacing='1px'
          >
            {text1}
          </Text>

          <Text
            fontSize={{ base: '22px', md: '28px' }}
            color='gray.600'
            opacity={0.8}
            lineHeight='1.6'
            textAlign={{
              base: 'center',
              md: 'left'
            }}
            letterSpacing='1px'
          >
            {text2}
          </Text>

          <Flex
            w='full'
            gap={{
              base: 4,
              md: 8
            }}
            alignItems={{
              base: 'center',
              lg: 'flex-start'
            }}
            justifyContent={{
              base: 'center',
              lg: 'flex-start'
            }}
          >
            <DesignVideoButton src={preview} onOpen={openVideoModal} />
          </Flex>
        </VStack>

        <AspectRatio
          ratio={2 / 3}
          w='full'
          position='relative'
          maxH='75vh'
          minW='40%'
          borderRadius='12px'
          overflow='hidden'
          display={{ base: 'none', md: 'block' }}
        >
          <Image
            src={src}
            alt={title}
            fill
            priority
            style={{
              objectFit: 'cover',
              transition: 'opacity 0.3s ease',
              filter: isImageLoading ? 'blur(10px)' : 'none'
            }}
            sizes='(max-width: 450px) 400px, 600px'
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
        </AspectRatio>
      </Flex>

      {isMobile ? (
        <DesignListCarousel list={carousel} />
      ) : (
        <DesignAnimatedList list={carousel} />
      )}

      {/* Video Modal */}
      {video && (
        <Modal
          isOpen={isVideoModalOpen}
          onClose={closeVideoModal}
          maxW='90vw'
          maxH='80vh'
        >
          <Box position='relative' w='full' h='full'>
            <IconButton
              position='absolute'
              top='-40px'
              right='0'
              bg='white'
              color='black'
              onClick={closeVideoModal}
              aria-label='Close video'
              _hover={{ bg: 'gray.100' }}
            >
              <CloseIcon />
            </IconButton>
            <AspectRatio ratio={16 / 9}>
              <iframe src={video} allowFullScreen style={{ border: 'none' }} />
            </AspectRatio>
          </Box>
        </Modal>
      )}
    </VStack>
  );
};

export default ArchitecturalBlock;
