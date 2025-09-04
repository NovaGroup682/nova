'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { Box, Flex, Spinner } from '@chakra-ui/react';

import { getSafeImageUrl } from 'helpers';

import { Modal } from 'ui';
import { SliderNavigation } from '../SliderNavigation';

interface SliderModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

const SliderModal = ({
  isOpen,
  onClose,
  images = [],
  initialIndex = 0
}: SliderModalProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartRef = useRef<number | null>(null);
  const touchEndRef = useRef<number | null>(null);
  const mouseStartRef = useRef<number | null>(null);
  const mouseEndRef = useRef<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const hasMultipleImages = images.length > 1;
  const currentImageSrc = images[currentIndex];

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

  // Минимальное расстояние для свайпа
  const minSwipeDistance = 50;

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (isZoomed) return; // Не обрабатываем свайпы в режиме зума
      touchEndRef.current = null;
      touchStartRef.current = e.targetTouches[0].clientX;
    },
    [isZoomed]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isZoomed) return; // Не обрабатываем свайпы в режиме зума
      touchEndRef.current = e.targetTouches[0].clientX;
    },
    [isZoomed]
  );

  const onTouchEnd = useCallback(() => {
    if (isZoomed || !touchStartRef.current || !touchEndRef.current) return;

    const distance = touchStartRef.current - touchEndRef.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasMultipleImages) {
      handleNext();
    }
    if (isRightSwipe && hasMultipleImages) {
      handlePrevious();
    }
  }, [isZoomed, hasMultipleImages, handleNext, handlePrevious]);

  // Обработчики мыши для десктопа
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (isZoomed) return; // Не обрабатываем drag в режиме зума
      setIsDragging(true);
      mouseEndRef.current = null;
      mouseStartRef.current = e.clientX;
    },
    [isZoomed]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || isZoomed) return;
      mouseEndRef.current = e.clientX;
    },
    [isDragging, isZoomed]
  );

  const onMouseUp = useCallback(() => {
    if (
      !isDragging ||
      isZoomed ||
      !mouseStartRef.current ||
      !mouseEndRef.current
    ) {
      setIsDragging(false);
      return;
    }

    const distance = mouseStartRef.current - mouseEndRef.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && hasMultipleImages) {
      handleNext();
    }
    if (isRightSwipe && hasMultipleImages) {
      handlePrevious();
    }

    setIsDragging(false);
  }, [isDragging, isZoomed, hasMultipleImages, handleNext, handlePrevious]);

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
  }, [isOpen, onClose, hasMultipleImages, handleNext, handlePrevious]);

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

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const getImageSrc = () => {
    try {
      return getSafeImageUrl(currentImageSrc);
    } catch (error) {
      console.error('Error processing image URL:', error);
      return currentImageSrc;
    }
  };

  if (!isOpen || images.length === 0) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isDark
      maxW='auto'
      bg='transparent'
      boxShadow='none'
      aspectRatio={7 / 4}
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
      className='slider-modal-container'
    >
      <Box
        position='relative'
        aspectRatio={7 / 4}
        h={{
          base: '100%',
          md: '95vh'
        }}
        transform={isZoomed ? 'scale(2)' : 'scale(1)'}
        transition='all 0.3s ease-in-out'
        display='flex'
        alignItems='center'
        justifyContent='center'
        cursor={isZoomed ? 'zoom-out' : isDragging ? 'grabbing' : 'zoom-in'}
        onClick={handleImageClick}
        onTouchStart={isZoomed ? handleTouchStart : onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
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
          src={getImageSrc()}
          alt={`Slide ${currentIndex + 1}`}
          fill
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            pointerEvents: 'none',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
          priority
          sizes='100vw'
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

export default SliderModal;
