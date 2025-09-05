'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { AspectRatio, Box, HStack, VStack } from '@chakra-ui/react';

import {
  SliderItem,
  SliderModal,
  SliderNavigation
} from 'components/SliderContent';
import NoImagesFallback from 'components/SliderContent/components/SliderItem/NoImagesFallback';
import SliderLoader from 'components/SliderContent/components/SliderItem/SliderLoader';

interface SliderBlockProps {
  sliders: string[];
}

const SliderBlock = ({ sliders }: SliderBlockProps) => {
  const swiperRef = useRef<SwiperType>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSliderReady, setIsSliderReady] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialIndex, setModalInitialIndex] = useState(0);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setCurrentIndex(swiper.realIndex);
  }, []);

  const onNextSlide = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, []);

  const onPrevSlide = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, []);

  const handleSwiperReady = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
    setIsSliderReady(true);
  }, []);

  const handleSliderItemClick = useCallback((index: number) => {
    setModalInitialIndex(index);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const hasImages = sliders && sliders.length > 0;

  const slides = useMemo(
    () =>
      sliders.map((slide, index) => (
        <SwiperSlide key={`${slide}-${index}`} style={{ width: '100%' }}>
          <SliderItem
            src={slide}
            isFirst={index === 0}
            onClick={() => handleSliderItemClick(index)}
          />
        </SwiperSlide>
      )),
    [sliders, handleSliderItemClick]
  );

  const navigationDots = useMemo(
    () =>
      sliders.map((_, index) => (
        <Box
          key={index}
          w='8px'
          h='8px'
          borderRadius='full'
          bg={index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)'}
          cursor='pointer'
          transition='all 0.3s ease'
          _hover={{
            bg: index === currentIndex ? 'white' : 'rgba(255,255,255,0.8)',
            transform: 'scale(1.2)'
          }}
          onClick={() => {
            if (swiperRef.current) {
              swiperRef.current.slideTo(index);
            }
          }}
        />
      )),
    [sliders, currentIndex]
  );

  if (!hasImages) {
    return (
      <AspectRatio ratio={7 / 4} w='full'>
        <NoImagesFallback />
      </AspectRatio>
    );
  }

  return (
    <>
      <AspectRatio ratio={7 / 4} w='full'>
        <VStack
          position='relative'
          w='full'
          h='full'
          borderRadius='2xl'
          overflow='hidden'
          justifyContent='space-between'
          mb={4}
          bg='gray.100'
        >
          {!isSliderReady && <SliderLoader />}

          <Swiper
            slidesPerView={1}
            mousewheel={true}
            keyboard={true}
            loop
            className='mySwiper'
            onSwiper={handleSwiperReady}
            onSlideChange={handleSlideChange}
            style={{
              width: '100%',
              opacity: isSliderReady ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out'
            }}
          >
            {slides}
          </Swiper>

          {isSliderReady && sliders.length > 1 && (
            <SliderNavigation onNext={onNextSlide} onPrev={onPrevSlide} />
          )}

          {isSliderReady && sliders.length > 1 && (
            <Box
              position='absolute'
              bottom={{ base: '10px', md: '10px' }}
              left='50%'
              transform='translateX(-50%)'
              zIndex={30}
            >
              <HStack gap={2}>{navigationDots}</HStack>
            </Box>
          )}
        </VStack>
      </AspectRatio>

      <SliderModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        images={sliders}
        initialIndex={modalInitialIndex}
        aspectRatio={1920 / 1248}
      />
    </>
  );
};

export default SliderBlock;
