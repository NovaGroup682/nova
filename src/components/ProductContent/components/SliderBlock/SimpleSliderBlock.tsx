'use client';

import { useEffect, useState } from 'react';
import { PROJECT_ASPECT_RATIO } from 'constant';
import Image from 'next/image';

import { AspectRatio, Box, Spinner, Text, VStack } from '@chakra-ui/react';

import { getSafeImageUrl } from 'helpers';

interface SimpleSliderBlockProps {
  sliders: string[];
}

const SimpleSliderBlock = ({ sliders }: SimpleSliderBlockProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState('');
  const maxRetries = 3;
  const retryDelay = 2000;

  const hasImages = sliders && sliders.length > 0;

  useEffect(() => {
    if (hasImages) {
      const imageSrc = getSafeImageUrl(sliders[0]);
      setIsImageLoading(true);
      setHasError(false);
      setRetryCount(0);
      setCurrentSrc(imageSrc);
    }
  }, [sliders, hasImages]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);

    if (retryCount < maxRetries) {
      const newRetryCount = retryCount + 1;
      setRetryCount(newRetryCount);

      setTimeout(() => {
        setIsImageLoading(true);
        const imageSrc = getSafeImageUrl(sliders[0]);
        const separator = imageSrc.includes('?') ? '&' : '?';
        setCurrentSrc(
          `${imageSrc}${separator}_retry=${newRetryCount}&_t=${Date.now()}`
        );
      }, retryDelay);
    } else {
      setHasError(true);
      console.warn(
        `Failed to load image after ${maxRetries} retries:`,
        sliders[0]
      );
    }
  };

  if (!hasImages) {
    return (
      <AspectRatio ratio={PROJECT_ASPECT_RATIO} w='full'>
        <VStack
          position='relative'
          w='full'
          h='full'
          borderRadius='2xl'
          overflow='hidden'
          justifyContent='center'
          alignItems='center'
          bg='gray.100'
          mb={4}
        >
          <Text fontSize='lg' color='gray.500' fontWeight='medium'>
            Изображения не найдены
          </Text>
          <Text fontSize='sm' color='gray.400'>
            Для этого проекта пока нет изображений
          </Text>
        </VStack>
      </AspectRatio>
    );
  }

  return (
    <AspectRatio ratio={PROJECT_ASPECT_RATIO} w='full'>
      <Box
        position='relative'
        w='full'
        h='full'
        borderRadius='2xl'
        overflow='hidden'
        mb={4}
        boxShadow={{
          base: 'inset 0px -90px 40px -20px rgba(0, 0, 0, 0.42)',
          md: 'inset 0px -140px 40px -20px rgba(0, 0, 0, 0.42)'
        }}
      >
        <>
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
          {!hasError && currentSrc && (
            <Image
              src={currentSrc}
              alt='Project image'
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: isImageLoading ? 0 : 1,
                transition: 'opacity 0.3s ease-in-out'
              }}
              sizes='(max-width: 450px) 470px, (max-width: 900px) 700px, 100%'
              priority
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

          {sliders.length > 1 && !hasError && (
            <Box
              position='absolute'
              top='10px'
              right='10px'
              bg='rgba(0, 0, 0, 0.7)'
              color='white'
              px={2}
              py={1}
              borderRadius='md'
              fontSize='sm'
              zIndex={3}
            >
              +{sliders.length - 1} фото
            </Box>
          )}
        </>
      </Box>
    </AspectRatio>
  );
};

export default SimpleSliderBlock;
