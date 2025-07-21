import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Swiper as SwiperType } from 'swiper';
import { Keyboard, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Box, Flex, Portal, Presence, Show, Text } from '@chakra-ui/react';

import content from 'content';

import { CircleArrowButton } from 'ui';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface MainDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MainDescriptionModal = ({
  isOpen,
  onClose
}: MainDescriptionModalProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sliderRef.current &&
        !sliderRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const count = useMotionValue(currentIndex + 1);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, currentIndex + 1, { duration: 0.6 });
    return () => controls.stop();
  }, [count, currentIndex]);

  return (
    <Show when={isOpen}>
      <Presence
        present={isOpen}
        animationName={{ _open: 'fade-in', _closed: 'fade-out' }}
        animationDuration='moderate'
      >
        <Portal>
          <Box
            shadow='lg'
            position='fixed'
            top='0'
            left='0'
            w='100vw'
            h='100vh'
            backdropFilter='blur(0.5rem)'
            zIndex='9999'
            display='flex'
            alignItems='center'
            justifyContent='center'
            cursor='pointer'
          >
            <Box
              ref={sliderRef}
              bg='white'
              borderRadius='2xl'
              py='32px'
              px='16px'
              maxW={{
                base: 'auto',
                md: '600px'
              }}
              w={{
                base: '90%',
                md: '80%'
              }}
              boxShadow='lg'
              cursor='default'
              position='relative'
            >
              <CircleArrowButton
                onClick={() => swiperRef.current?.slidePrev()}
              />
              <Flex
                w='full'
                alignItems='center'
                pb={{
                  base: 4,
                  md: 8
                }}
                justifyContent='space-between'
                gap={2}
                px='16px'
              >
                {content.main.slider.titles.map((title, idx) => (
                  <Presence
                    key={title}
                    present={currentIndex === idx}
                    animationName={{
                      _open: 'fade-in'
                    }}
                    animationDuration='slower'
                  >
                    <Text
                      fontSize={{
                        base: 22,
                        md: 30
                      }}
                      fontWeight={500}
                      lineHeight={{
                        base: '26px',
                        md: '36px'
                      }}
                      minH='74px'
                    >
                      {title}
                    </Text>
                  </Presence>
                ))}

                <Text
                  as='pre'
                  fontSize={24}
                  fontWeight={500}
                  lineHeight='36px'
                  color='gray.500'
                  minH='74px'
                  alignSelf='center'
                  userSelect='none'
                >
                  <motion.span style={{ display: 'inline-block' }}>
                    {rounded}
                  </motion.span>
                  {`/${content.main.slider.titles.length}`}
                </Text>
              </Flex>
              <Swiper
                slidesPerView={1}
                mousewheel={true}
                keyboard={true}
                loop
                modules={[Mousewheel, Keyboard]}
                className='mySwiper'
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
              >
                {content.main.slider.body.map((item, index) => (
                  <SwiperSlide
                    key={item.text}
                    style={{ width: '100%', padding: '0 8px' }}
                  >
                    <Box
                      w='full'
                      h={{
                        base: '200px',
                        sm: '300px',
                        md: '340px'
                      }}
                      position='relative'
                      overflow='hidden'
                      borderRadius='2xl'
                    >
                      <Image
                        fill
                        sizes='(max-width: 450px) 300px, 480px'
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center',
                          borderRadius: '2xl',
                          overflow: 'hidden'
                        }}
                        src={item.img}
                        alt={`slider-${index}`}
                      />
                    </Box>
                    <Text
                      fontSize={{
                        base: 16,
                        md: 22
                      }}
                      pt={4}
                      color='fg.muted'
                    >
                      {item.text}
                    </Text>
                  </SwiperSlide>
                ))}
              </Swiper>

              <CircleArrowButton
                onClick={() => swiperRef.current?.slideNext()}
                isRight
              />
            </Box>
          </Box>
        </Portal>
      </Presence>
    </Show>
  );
};

export default MainDescriptionModal;
