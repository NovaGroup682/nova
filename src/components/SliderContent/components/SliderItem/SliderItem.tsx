'use client';

import { useCallback, useEffect, useState } from 'react';
import { PROJECT_ASPECT_RATIO } from 'constant';
import Image from 'next/image';

import { AspectRatio, Box, Spinner } from '@chakra-ui/react';

import { getSafeImageUrl } from 'helpers';

import ImageErrorFallback from './ImageErrorFallback';

interface SliderItemProps {
  src: string;
  onClick?: () => void;
  isFirst?: boolean;
}

const SliderItem = ({ src, onClick, isFirst = false }: SliderItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState('');
  const maxRetries = 3;
  const retryDelay = 2000;

  const getImageSrc = useCallback(() => {
    try {
      return getSafeImageUrl(src);
    } catch (error) {
      console.error('Error processing image URL:', error);
      return src;
    }
  }, [src]);

  useEffect(() => {
    // Инициализация src при монтировании или изменении
    const imageSrc = getImageSrc();
    setIsLoading(true);
    setHasError(false);
    setRetryCount(0);
    setCurrentSrc(imageSrc);
  }, [src, getImageSrc]);

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
        const imageSrc = getImageSrc();
        // Добавляем timestamp для обхода кеша браузера
        const separator = imageSrc.includes('?') ? '&' : '?';
        setCurrentSrc(
          `${imageSrc}${separator}_retry=${newRetryCount}&_t=${Date.now()}`
        );
      }, retryDelay);
    } else {
      setHasError(true);
      console.warn(`Failed to load image after ${maxRetries} retries:`, src);
    }
  };

  return (
    <AspectRatio
      ratio={PROJECT_ASPECT_RATIO}
      w='full'
      // boxShadow={{
      //   base: 'inset 0px -90px 40px -20px rgba(0, 0, 0, 0.42)',
      //   md: 'inset 0px -140px 40px -20px rgba(0, 0, 0, 0.42)'
      // }}
      cursor='pointer'
      position='relative'
      onClick={onClick}
    >
      <>
        {isLoading && (
          <Box position='absolute' top='50%' left='50%' zIndex={1}>
            <Spinner color='gray.600' size='xl' />
          </Box>
        )}

        {hasError && <ImageErrorFallback />}

        {!hasError && currentSrc && (
          <Image
            src={currentSrc}
            alt='Background'
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: -1,
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out'
            }}
            priority={isFirst}
            sizes='(max-width: 450px) 400px, (max-width: 900px) 1000px, 1500px'
            onLoad={handleImageLoad}
            onError={handleImageError}
            placeholder='blur'
            blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
          />
        )}

        {hasError && (
          <Box
            position='absolute'
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg='gray.100'
            zIndex={-2}
          />
        )}
      </>
    </AspectRatio>
  );
};

export default SliderItem;
