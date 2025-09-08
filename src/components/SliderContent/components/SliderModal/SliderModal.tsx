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
  const [isZoomed, setIsZoomed] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const isMobile = useBreakpointValue({ base: true, lg: false }) ?? true;

  const hasMultipleImages = images.length > 1;

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setCurrentIndex(swiper.activeIndex);
  }, []);

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

  const handleImageError = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

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
      setLoadedImages(new Set()); // Сбрасываем загруженные изображения
      setIsZoomed(false); // Сбрасываем состояние зума
      setHasDragged(false); // Сбрасываем состояние drag
      document.body.style.overflow = 'hidden';

      // Инициализируем Swiper с правильным индексом
      if (swiper && swiper.activeIndex !== initialIndex) {
        swiper.slideTo(initialIndex, 0);
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex, swiper]);

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

      // Предотвращаем закрытие модала при прокрутке колесиком
      e.stopPropagation();
    };

    if (isOpen) {
      document.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      document.removeEventListener('wheel', handleWheel);
    };
  }, [isOpen]);

  const getImageSrc = (imageSrc: string) => {
    try {
      return getSafeImageUrl(imageSrc);
    } catch (error) {
      console.error('Error processing image URL:', error);
      return imageSrc;
    }
  };

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
                  {!isImageLoaded && isCurrentSlide && (
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
                    src={getImageSrc(imageSrc)}
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
                    onError={() => handleImageError(index)}
                    onClick={handleImageClick}
                  />
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

      {/* Компонент зума */}
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
