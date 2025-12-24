'use client';

import { useEffect, useState } from 'react';
import CloseIcon from '@assets/icons/circle-xmark.svg';
import Image from 'next/image';

import {
  AspectRatio,
  Box,
  Flex,
  IconButton,
  Spinner,
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
  const [hasError, setHasError] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const maxRetries = 3;
  const retryDelay = 2000;

  useEffect(() => {
    // Сброс состояния при изменении src
    setIsImageLoading(true);
    setHasError(false);
    setRetryCount(0);
    setCurrentSrc(src);
  }, [src]);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);

    if (retryCount < maxRetries) {
      // Повторная попытка загрузки
      const newRetryCount = retryCount + 1;
      setRetryCount(newRetryCount);

      setTimeout(() => {
        setIsImageLoading(true);
        // Добавляем timestamp для обхода кеша браузера
        const separator = src.includes('?') ? '&' : '?';
        setCurrentSrc(
          `${src}${separator}_retry=${newRetryCount}&_t=${Date.now()}`
        );
      }, retryDelay);
    } else {
      setHasError(true);
      console.warn(`Failed to load image after ${maxRetries} retries:`, src);
    }
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
          justifyContent='center'
          alignItems='center'
          gap={{
            base: 4,
            md: 6
          }}
        >
          <Text
            fontSize={{ base: '18px', md: '28px' }}
            color='gray.600'
            opacity={0.8}
            lineHeight={{
              base: '1.4',
              md: '1.6'
            }}
            textAlign={{
              base: 'center',
              md: 'left'
            }}
            letterSpacing='1px'
          >
            {text1}
          </Text>

          <Text
            fontSize={{ base: '18px', md: '28px' }}
            color='gray.600'
            opacity={0.8}
            lineHeight={{
              base: '1.4',
              md: '1.6'
            }}
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
          <Box position='relative' w='full' h='full'>
            {/* Индикатор загрузки */}
            {isImageLoading && !hasError && (
              <Box
                position='absolute'
                top='50%'
                left='50%'
                transform='translate(-50%, -50%)'
                zIndex={2}
              >
                <Spinner size='xl' color='gray.600' />
              </Box>
            )}

            {/* Фон во время загрузки */}
            {isImageLoading && (
              <Box
                position='absolute'
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg='gray.100'
                zIndex={0}
              />
            )}

            {/* Сообщение об ошибке */}
            {hasError && (
              <Box
                position='absolute'
                top='50%'
                left='50%'
                transform='translate(-50%, -50%)'
                zIndex={2}
                textAlign='center'
                color='gray.500'
                fontSize='sm'
                px={4}
              >
                Не удалось загрузить изображение
                {retryCount > 0 && (
                  <Box mt={2} fontSize='xs' color='gray.400'>
                    Попыток: {retryCount}/{maxRetries}
                  </Box>
                )}
              </Box>
            )}

            {/* Изображение */}
            {!hasError && (
              <Image
                src={currentSrc}
                alt={title}
                fill
                priority
                style={{
                  objectFit: 'cover',
                  transition: 'opacity 0.3s ease',
                  filter: isImageLoading ? 'blur(10px)' : 'none',
                  opacity: isImageLoading ? 0 : 1
                }}
                sizes='(max-width: 450px) 400px, 600px'
                placeholder='blur'
                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}

            {/* Фон при ошибке */}
            {hasError && (
              <Box
                position='absolute'
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg='gray.100'
                zIndex={1}
              />
            )}
          </Box>
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
          isDark
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
