'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Box, BoxProps, Spinner } from '@chakra-ui/react';

interface BackgroundImageWithLoaderProps extends BoxProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  blurDataURL?: string;
  maxRetries?: number;
  retryDelay?: number;
}

const BackgroundImageWithLoader = ({
  src,
  alt,
  sizes = '100vw',
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
  blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
  maxRetries = 3,
  retryDelay = 2000,
  ...boxProps
}: BackgroundImageWithLoaderProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setIsImageLoading(true);
    setHasError(false);
    setRetryCount(0);
    setCurrentSrc(src);
  }, [src]);

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
    <Box bg='gray.100' overflow='hidden' {...boxProps}>
      {isImageLoading && !hasError && (
        <Box
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          zIndex={10}
          textAlign='center'
          color='white'
        >
          <Spinner size='xl' mb={2} />
        </Box>
      )}

      {hasError && (
        <Box
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          zIndex={10}
          color='gray.500'
          fontSize='sm'
          textAlign='center'
        >
          Ошибка загрузки изображения
          <br />
          {src}
        </Box>
      )}

      {!hasError && (
        <Image
          src={currentSrc}
          alt={alt}
          fill
          style={{
            objectFit,
            objectPosition,
            opacity: isImageLoading ? 0.75 : 1,
            filter: isImageLoading ? 'blur(10px)' : 'blur(0px)',
            transition: 'opacity 0.5s ease-in-out, filter 0.5s ease-in-out'
          }}
          priority={priority}
          sizes={sizes}
          placeholder='blur'
          blurDataURL={blurDataURL}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
    </Box>
  );
};

export default BackgroundImageWithLoader;
