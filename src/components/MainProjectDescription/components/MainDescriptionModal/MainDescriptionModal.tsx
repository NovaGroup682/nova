import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Swiper as SwiperType } from 'swiper';
import { Keyboard, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  Box,
  Flex,
  Portal,
  Presence,
  Show,
  Text,
  VStack
} from '@chakra-ui/react';

import content from 'content';

import { SplitText } from 'components/SplitText';
import { CircleArrowButton } from 'ui';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface MainDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const autoPlayInterval = 7500;

const MainDescriptionModal = ({
  isOpen,
  onClose
}: MainDescriptionModalProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const [slideStartTime, setSlideStartTime] = useState<number>(Date.now());
  const isManualNavigation = useRef<boolean>(false);

  const slidesCount = content.main.slider.titles.length;

  const handlePrevClick = () => {
    isManualNavigation.current = true;
    swiperRef.current?.slidePrev();
  };

  const handleNextClick = () => {
    isManualNavigation.current = true;
    swiperRef.current?.slideNext();
  };

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

  useEffect(() => {
    if (!isOpen) return;

    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        if (swiperRef.current) {
          swiperRef.current.slideNext();
        }
      }, autoPlayInterval);
    };

    const stopAutoPlay = () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
        autoPlayRef.current = null;
      }
    };

    const handleUserInteraction = () => {
      stopAutoPlay();
      setTimeout(startAutoPlay, 3000);
    };

    const swiperElement = sliderRef.current?.querySelector('.swiper');
    if (swiperElement) {
      swiperElement.addEventListener('touchstart', handleUserInteraction);
      swiperElement.addEventListener('mousedown', handleUserInteraction);
      swiperElement.addEventListener('keydown', handleUserInteraction);
    }

    startAutoPlay();

    return () => {
      stopAutoPlay();
      if (swiperElement) {
        swiperElement.removeEventListener('touchstart', handleUserInteraction);
        swiperElement.removeEventListener('mousedown', handleUserInteraction);
        swiperElement.removeEventListener('keydown', handleUserInteraction);
      }
    };
  }, [isOpen]);

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
              <Flex
                position='absolute'
                top='-32px'
                left={0}
                right={0}
                margin='0 auto'
                w='90%'
                justifyContent='center'
                gap={2}
              >
                {Array.from({ length: slidesCount }).map((_, index) => (
                  <Box
                    key={index}
                    position='relative'
                    w='full'
                    h='4px'
                    bg='gray.200'
                    borderRadius='full'
                    overflow='hidden'
                  >
                    {currentIndex === index && (
                      <motion.div
                        key={`progress-${currentIndex}-${slideStartTime}`}
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{
                          duration: autoPlayInterval / 1000,
                          ease: 'linear'
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          height: '100%',
                          backgroundColor: 'white',
                          borderRadius: 'inherit'
                        }}
                      />
                    )}
                    {currentIndex > index && (
                      <Box
                        position='absolute'
                        top={0}
                        left={0}
                        w='full'
                        h='full'
                        bg='white'
                        borderRadius='inherit'
                      />
                    )}
                  </Box>
                ))}
              </Flex>

              <CircleArrowButton onClick={handlePrevClick} />
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
                    <SplitText
                      fontSize={{
                        base: 22,
                        md: 30
                      }}
                      splitType='words'
                      delay={30}
                      fontWeight={500}
                      lineHeight={{
                        base: '26px',
                        md: '36px'
                      }}
                      minH='74px'
                      textAlign='left'
                      text={title}
                    />
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
                onSlideChange={(swiper) => {
                  setCurrentIndex(swiper.realIndex);
                  if (isManualNavigation.current) {
                    setSlideStartTime(Date.now());
                    isManualNavigation.current = false;
                  }

                  if (autoPlayRef.current) {
                    clearInterval(autoPlayRef.current);
                    autoPlayRef.current = setInterval(() => {
                      if (swiperRef.current) {
                        swiperRef.current.slideNext();
                      }
                    }, autoPlayInterval);
                  }
                }}
                onTouchStart={() => {
                  isManualNavigation.current = true;
                }}
              >
                {content.main.slider.body.map((item, index) => (
                  <SwiperSlide
                    key={item.text}
                    style={{ width: '100%', padding: '0 8px' }}
                  >
                    <Flex
                      w='full'
                      h={{
                        base: index === 3 ? 'auto' : '200px',
                        sm: '300px',
                        md: '340px'
                      }}
                      position='relative'
                      overflow='hidden'
                      borderRadius='2xl'
                      bg='#f1f1f1'
                      flexDirection={{
                        base: 'column',
                        md: 'row'
                      }}
                      p={{
                        base: 4,
                        md: 0
                      }}
                    >
                      {index === 3 ? (
                        <>
                          <VStack
                            w={{
                              base: 'full',
                              md: '50%'
                            }}
                            alignItems={{
                              base: 'flex-start',
                              md: 'center'
                            }}
                            justifyContent='center'
                          >
                            <Text
                              color='black'
                              fontSize={{
                                base: 20,
                                md: 24
                              }}
                            >
                              Потому что это:
                            </Text>
                          </VStack>
                          <VStack
                            w={{
                              base: 'full',
                              md: '50%'
                            }}
                            as='ul'
                            listStyleType='disc'
                            listStylePosition='outside'
                            color='gray.500'
                            alignItems='flex-start'
                            justifyContent='center'
                            gap={{
                              base: 0,
                              md: 1
                            }}
                            pl={{
                              base: 6,
                              md: 0
                            }}
                          >
                            {[
                              'Надёжные',
                              'Долговечные',
                              'Энергоэффективные',
                              'Хорошая шумоизоляция',
                              'Пожаробезопасные',
                              'Экологичные',
                              'Ликвидные'
                            ].map((item) => (
                              <Box as='li' key={item}>
                                <Text
                                  color='gray.500'
                                  textAlign='left'
                                  fontSize={{
                                    base: 16,
                                    md: 20
                                  }}
                                >
                                  {item}
                                </Text>
                              </Box>
                            ))}
                          </VStack>
                        </>
                      ) : (
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
                      )}
                    </Flex>
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

              <CircleArrowButton onClick={handleNextClick} isRight />
            </Box>
          </Box>
        </Portal>
      </Presence>
    </Show>
  );
};

export default MainDescriptionModal;
