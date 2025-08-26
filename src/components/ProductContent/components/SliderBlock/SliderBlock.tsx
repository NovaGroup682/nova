'use client';

import { useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { AspectRatio, Box, HStack, VStack } from '@chakra-ui/react';

import { SliderItem, SliderNavigation } from 'components/SliderContent';

interface SliderBlockProps {
  sliders: string[];
}

const SliderBlock = ({ sliders }: SliderBlockProps) => {
  const swiperRef = useRef<SwiperType>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.realIndex);
  };

  const onNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const onPrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <AspectRatio ratio={7 / 4} w='full'>
      <VStack
        position='relative'
        w='full'
        h='full'
        borderRadius='2xl'
        overflow='hidden'
        justifyContent='space-between'
        mb={4}
      >
        <Swiper
          slidesPerView={1}
          mousewheel={true}
          keyboard={true}
          loop
          className='mySwiper'
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          style={{ width: '100%' }}
        >
          {sliders.map((slide) => (
            <SwiperSlide key={slide} style={{ width: '100%' }}>
              <SliderItem src={slide} />
            </SwiperSlide>
          ))}
        </Swiper>

        <SliderNavigation onNext={onNextSlide} onPrev={onPrevSlide} />

        <Box
          position='absolute'
          bottom={{ base: '10px', md: '0px' }}
          left='50%'
          transform='translateX(-50%)'
          display={{ base: 'flex', md: 'none' }}
          zIndex={30}
        >
          <HStack gap={2}>
            {sliders.map((_, index) => (
              <Box
                key={index}
                w='8px'
                h='8px'
                borderRadius='full'
                bg={index === currentIndex ? 'white' : 'rgba(255,255,255,0.5)'}
                cursor='pointer'
                transition='all 0.3s ease'
                _hover={{
                  bg:
                    index === currentIndex ? 'white' : 'rgba(255,255,255,0.8)',
                  transform: 'scale(1.2)'
                }}
                onClick={() => {
                  if (swiperRef.current) {
                    swiperRef.current.slideTo(index);
                  }
                }}
              />
            ))}
          </HStack>
        </Box>
      </VStack>
    </AspectRatio>
  );
};

export default SliderBlock;
