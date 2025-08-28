'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import { Box, Flex, Spinner } from '@chakra-ui/react';

import { SliderNavigation } from 'components/SliderContent';
import { Modal } from 'ui';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
  images?: string[];
  initialIndex?: number;
}

const ImageModal = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt,
  images = [],
  initialIndex = 0
}: ImageModalProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const hasMultipleImages = images.length > 1;
  const currentImageSrc = hasMultipleImages ? images[currentIndex] : imageSrc;
  const currentImageAlt = hasMultipleImages
    ? `${imageAlt} ${currentIndex + 1}`
    : imageAlt;

  const handlePrevious = useCallback(() => {
    if (!hasMultipleImages) return;
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setIsLoading(true);
  }, [hasMultipleImages, images.length]);

  const handleNext = useCallback(() => {
    if (!hasMultipleImages) return;
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setIsLoading(true);
  }, [hasMultipleImages, images.length]);

  useEffect(() => {
    if (isOpen) {
      setIsZoomed(false);
      setIsLoading(true);
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        const modalElement = document.querySelector('[data-modal-content]');
        if (modalElement) {
          modalElement.scrollTo(0, 0);
        }
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (hasMultipleImages) {
        if (e.key === 'ArrowLeft') {
          handlePrevious();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    isOpen,
    onClose,
    hasMultipleImages,
    currentIndex,
    handleNext,
    handlePrevious
  ]);

  useEffect(() => {
    if (!isZoomed) {
      const timer = setTimeout(() => {
        const modalElement = document.querySelector('[data-modal-content]');
        if (modalElement) {
          modalElement.scrollTo(0, 0);
        }
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [isZoomed]);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
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
      overscrollBehaviorY='none'
      borderRadius={0}
      className='image-modal-container'
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
        onTouchStart={handleTouchStart}
        transformOrigin={{
          base: 'left center',
          md: 'top center'
        }}
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
          src={currentImageSrc}
          alt={currentImageAlt}
          fill
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            pointerEvents: 'none',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
          priority
          sizes='1500px'
          quality={100}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {hasMultipleImages && !isZoomed && (
          <>
            <SliderNavigation
              onNext={(e) => {
                if (e) e.stopPropagation();
                handleNext();
              }}
              onPrev={(e) => {
                if (e) e.stopPropagation();
                handlePrevious();
              }}
            />

            <Flex
              position='absolute'
              bottom={4}
              left='50%'
              transform='translateX(-50%)'
              bg='rgba(0, 0, 0, 0.5)'
              color='white'
              px={3}
              py={1}
              borderRadius='full'
              fontSize='sm'
              fontWeight='medium'
              zIndex={2}
            >
              {currentIndex + 1} / {images.length}
            </Flex>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default ImageModal;
