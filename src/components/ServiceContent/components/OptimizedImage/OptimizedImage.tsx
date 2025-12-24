'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { AspectRatio, Box, Spinner } from '@chakra-ui/react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  ratio?: number;
  priority?: boolean;
  sizes?: string;
  maxRetries?: number;
  retryDelay?: number;
  borderRadius?: string;
  maxH?: string;
  minW?: string;
  maxW?: string;
  display?: Record<string, string>;
}

const OptimizedImage = ({
  src,
  alt,
  ratio = 2 / 3,
  priority = false,
  sizes = '(max-width: 450px) 400px, (max-width: 768px) 768px, (max-width: 1200px) 1200px',
  maxRetries = 3,
  retryDelay = 2000,
  borderRadius = '12px',
  maxH = '75vh',
  minW = '40%',
  maxW = '400px',
  display
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    // Сброс состояния при изменении src
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
    setCurrentSrc(src);
  }, [src]);

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);

    if (retryCount < maxRetries) {
      // Повторная попытка загрузки
      const newRetryCount = retryCount + 1;
      setRetryCount(newRetryCount);

      setTimeout(() => {
        setIsLoading(true);
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

  const blurDataURL =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

  return (
    <AspectRatio
      ratio={ratio}
      w='full'
      position='relative'
      maxH={maxH}
      minW={minW}
      borderRadius={borderRadius}
      overflow='hidden'
      display={display}
      maxW={maxW}
    >
      <Box position='relative' w='full' h='full'>
        {/* Индикатор загрузки */}
        {isLoading && !hasError && (
          <Box
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
            zIndex={2}
            textAlign='center'
          >
            <Spinner size='xl' color='gray.600' />
          </Box>
        )}

        {/* Фон во время загрузки */}
        {isLoading && (
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
            <br />
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
            alt={alt}
            fill
            priority={priority}
            style={{
              objectFit: 'cover',
              transition: 'opacity 0.3s ease',
              opacity: isLoading ? 0 : 1
            }}
            sizes={sizes}
            placeholder='blur'
            blurDataURL={blurDataURL}
            onLoad={handleImageLoad}
            onError={handleImageError}
            unoptimized={false}
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
  );
};

export default OptimizedImage;
