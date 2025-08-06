'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Box, Spinner } from '@chakra-ui/react';

import { Modal } from 'ui';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

const ImageModal = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt
}: ImageModalProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsZoomed(false);
      setIsLoading(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isDark
      maxW='auto'
      bg='transparent'
      boxShadow='none'
      aspectRatio={12 / 15}
      h={{
        base: isZoomed ? 'full' : 'auto',
        md: '95vh'
      }}
      w={{
        base: '100vw',
        md: isZoomed ? 'full' : 'auto'
      }}
      overflow='scroll'
      overscrollBehaviorX='none'
      borderRadius={0}
    >
      <Box
        position='relative'
        aspectRatio={12 / 15}
        h={{
          base: 'auto',
          md: '95vh'
        }}
        w={{
          base: '100vw',
          md: 'auto'
        }}
        transform={isZoomed ? 'scale(2)' : 'scale(1)'}
        transition='all 0.3s ease-in-out'
        display='flex'
        alignItems='center'
        justifyContent='center'
        cursor={isZoomed ? 'zoom-out' : 'zoom-in'}
        onClick={handleImageClick}
        transformOrigin='center'
      >
        {isLoading && (
          <Box
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
            zIndex={1}
          >
            <Spinner color='white' size='xl' />
          </Box>
        )}

        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            pointerEvents: 'none',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
          priority
          sizes='90vw'
          quality={90}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </Box>
    </Modal>
  );
};

export default ImageModal;
