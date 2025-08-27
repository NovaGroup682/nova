'use client';

import { useState } from 'react';
import Image from 'next/image';

import { AspectRatio, Box, Spinner } from '@chakra-ui/react';

import { getSafeImageUrl } from 'helpers';

import ImageErrorFallback from './ImageErrorFallback';

interface SliderItemProps {
  src: string;
  onClick?: () => void;
}

const SliderItem = ({ src, onClick }: SliderItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const getImageSrc = () => getSafeImageUrl(src);

  return (
    <AspectRatio
      ratio={7 / 4}
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

        {!hasError && (
          <Image
            src={getImageSrc()}
            alt='Background'
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              zIndex: -1,
              opacity: isLoading ? 0 : 1,
              transition: 'opacity 0.3s ease-in-out'
            }}
            priority
            sizes='(max-width: 450px) 400px, (max-width: 900px) 900px, 1200px'
            quality={75}
            onLoad={handleImageLoad}
            onError={handleImageError}
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
