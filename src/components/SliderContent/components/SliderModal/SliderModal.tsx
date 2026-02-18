'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import { Keyboard, Navigation, Zoom } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Box, Flex, Spinner, useBreakpointValue } from '@chakra-ui/react';

import { getSafeImageUrl } from 'helpers';

import { Modal } from 'ui';
import { ImageZoom } from '../ImageZoom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';

interface SliderModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
  aspectRatio: number;
}

const SliderModal = ({
  isOpen,
  onClose,
  images = [],
  initialIndex = 0,
  aspectRatio
}: SliderModalProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [imageErrors, setImageErrors] = useState<
    Record<
      number,
      {
        hasError: boolean;
        retryCount: number;
        currentSrc: string;
      }
    >
  >({});
  const [isZoomed, setIsZoomed] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? true;
  const maxRetries = 3;
  const retryDelay = 2000;

  const hasMultipleImages = images.length > 1;

  const getImageSrc = useCallback((imageSrc: string) => {
    try {
      return getSafeImageUrl(imageSrc);
    } catch (error) {
      console.error('Error processing image URL:', error);
      return imageSrc;
    }
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setCurrentIndex(swiper.activeIndex);
  }, []);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
    setImageErrors((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        hasError: false
      }
    }));
  }, []);

  const handleImageError = useCallback(
    (index: number, imageSrc: string) => {
      setLoadedImages((prev) => new Set(prev).add(index));

      const errorState = imageErrors[index] || {
        hasError: false,
        retryCount: 0,
        currentSrc: imageSrc
      };

      if (errorState.retryCount < maxRetries) {
        const newRetryCount = errorState.retryCount + 1;
        const processedSrc = getImageSrc(imageSrc);
        const separator = processedSrc.includes('?') ? '&' : '?';
        const newSrc = `${processedSrc}${separator}_retry=${newRetryCount}&_t=${Date.now()}`;

        setImageErrors((prev) => ({
          ...prev,
          [index]: {
            hasError: false,
            retryCount: newRetryCount,
            currentSrc: newSrc
          }
        }));

        setTimeout(() => {
          setLoadedImages((prev) => {
            const newSet = new Set(prev);
            newSet.delete(index);
            return newSet;
          });
        }, retryDelay);
      } else {
        setImageErrors((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            hasError: true
          }
        }));
        console.warn(
          `Failed to load slide image after ${maxRetries} retries:`,
          imageSrc
        );
      }
    },
    [imageErrors, maxRetries, retryDelay, getImageSrc]
  );

  const handleImageClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!hasDragged) {
        setIsZoomed(true);
      }
    },
    [hasDragged]
  );

  const handleZoomClose = useCallback(() => {
    setIsZoomed(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setLoadedImages(new Set());
      setImageErrors({});
      setIsZoomed(false);
      setHasDragged(false);
      document.body.style.overflow = 'hidden';

      const initialErrors: typeof imageErrors = {};
      images.forEach((imageSrc, index) => {
        initialErrors[index] = {
          hasError: false,
          retryCount: 0,
          currentSrc: getImageSrc(imageSrc)
        };
      });
      setImageErrors(initialErrors);

      if (swiper && swiper.activeIndex !== initialIndex) {
        swiper.slideTo(initialIndex, 0);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex, swiper, images, getImageSrc]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (hasMultipleImages && swiper && !isZoomed) {
        if (e.key === 'ArrowLeft') {
          swiper.slidePrev();
        } else if (e.key === 'ArrowRight') {
          swiper.slideNext();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, hasMultipleImages, swiper, isZoomed]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isOpen) return;

      e.stopPropagation();
    };

    if (isOpen) {
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  return (
    <Modal
      isCloseBtnShow
      isOpen={isOpen}
      onClose={onClose}
      isDark
      maxW={aspectRatio === 1920 / 1248 ? 'fit-content' : 'auto'}
      bg='transparent'
      boxShadow='none'
      aspectRatio={aspectRatio}
      h={{
        base: '95vh',
        md: '95vh'
      }}
      w='100vw'
      overflow='hidden'
      borderRadius={0}
      className='slider-modal-container'
    >
      <Box
        position='relative'
        h={{
          base: '100%',
          md: '95vh'
        }}
        w='100%'
      >
        <Swiper
          modules={[Navigation, Keyboard, Zoom]}
          navigation={hasMultipleImages}
          keyboard={{
            enabled: true
          }}
          zoom={{
            maxRatio: 2,
            minRatio: 1
          }}
          spaceBetween={8}
          initialSlide={initialIndex}
          onSwiper={setSwiper}
          onSlideChange={handleSlideChange}
          onTouchStart={() => setHasDragged(false)}
          onTouchMove={() => setHasDragged(true)}
          onTouchEnd={() => setHasDragged(false)}
          onSliderMove={() => setHasDragged(true)}
          className='swiper-modal'
          style={{
            height: '100%',
            width: '100%',
            maxWidth: '100vw'
          }}
        >
          {images.map((imageSrc, index) => {
            const isImageLoaded = loadedImages.has(index);
            const isCurrentSlide = index === currentIndex;
            const errorState = imageErrors[index] || {
              hasError: false,
              retryCount: 0,
              currentSrc: getImageSrc(imageSrc)
            };
            const displaySrc = errorState.currentSrc || getImageSrc(imageSrc);

            return (
              <SwiperSlide key={index} style={{ width: '100%' }}>
                <Box
                  position='relative'
                  w='100%'
                  h='100%'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'
                >
                  {!isImageLoaded && isCurrentSlide && !errorState.hasError && (
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

                  {errorState.hasError && (
                    <Box
                      position='absolute'
                      top='50%'
                      left='50%'
                      transform='translate(-50%, -50%)'
                      zIndex={1}
                      textAlign='center'
                      color='white'
                      fontSize='sm'
                      px={4}
                    >
                      Не удалось загрузить изображение
                      {errorState.retryCount > 0 && (
                        <Box mt={2} fontSize='xs' opacity={0.8}>
                          Попыток: {errorState.retryCount}/{maxRetries}
                        </Box>
                      )}
                    </Box>
                  )}

                  {!errorState.hasError && (
                    <Image
                      src={displaySrc}
                      alt={`Slide ${index + 1}`}
                      width={1920}
                      height={Math.round(1920 / aspectRatio)}
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center',
                        opacity: isImageLoaded ? 1 : 0,
                        transition: 'opacity 0.3s ease-in-out',
                        cursor: 'zoom-in',
                        width: '100%',
                        height: '100%'
                      }}
                      priority={index === initialIndex}
                      sizes='100vw'
                      quality={100}
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageError(index, imageSrc)}
                      onClick={handleImageClick}
                      placeholder='blur'
                      blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                    />
                  )}
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {hasMultipleImages && (
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
            zIndex={10}
          >
            {currentIndex + 1} / {images.length}
          </Flex>
        )}
      </Box>

      <ImageZoom
        isOpen={isZoomed}
        onClose={handleZoomClose}
        imageSrc={images[currentIndex]}
        alt={`Zoomed slide ${currentIndex + 1}`}
        isMobile={isMobile}
      />
    </Modal>
  );
};

export default SliderModal;
