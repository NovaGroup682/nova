'use client';

import { useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { VStack } from '@chakra-ui/react';

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

  const handleNavigationClick = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <VStack
      position='relative'
      w='full'
      h={{
        base: 300,
        md: 600,
        lg: 800
      }}
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

      <SliderNavigation
        list={sliders}
        currentSlide={currentIndex}
        onClick={handleNavigationClick}
      />
    </VStack>
  );
};

export default SliderBlock;
