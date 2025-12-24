'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { AspectRatio, Box, Spinner, Text, VStack } from '@chakra-ui/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface CarouselItem {
  label: string;
  description: string;
  src: string;
}

interface DesignListCarouselProps {
  list: CarouselItem[];
}

const DesignListCarousel = ({ list = [] }: DesignListCarouselProps) => {
  // Отслеживаем состояние загрузки для каждого слайда отдельно
  const [imageStates, setImageStates] = useState<
    Record<
      number,
      {
        isLoading: boolean;
        hasError: boolean;
        retryCount: number;
        currentSrc: string;
      }
    >
  >({});

  const maxRetries = 3;
  const retryDelay = 2000;

  // Инициализируем состояние для всех изображений при монтировании или изменении списка
  useEffect(() => {
    setImageStates((prev) => {
      const newStates = { ...prev };
      let hasChanges = false;

      list.forEach((item, index) => {
        if (!newStates[index]) {
          newStates[index] = {
            isLoading: true,
            hasError: false,
            retryCount: 0,
            currentSrc: item.src
          };
          hasChanges = true;
        }
      });

      return hasChanges ? newStates : prev;
    });
  }, [list]);

  const handleImageLoad = (index: number) => {
    setImageStates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        isLoading: false,
        hasError: false
      }
    }));
  };

  const handleImageError = (index: number, src: string) => {
    const state = imageStates[index];
    if (!state) return;

    if (state.retryCount < maxRetries) {
      // Повторная попытка загрузки
      const newRetryCount = state.retryCount + 1;
      setImageStates((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          isLoading: false,
          retryCount: newRetryCount
        }
      }));

      setTimeout(() => {
        setImageStates((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            isLoading: true,
            currentSrc: `${src}${src.includes('?') ? '&' : '?'}_retry=${newRetryCount}&_t=${Date.now()}`
          }
        }));
      }, retryDelay);
    } else {
      setImageStates((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          isLoading: false,
          hasError: true
        }
      }));
      console.warn(`Failed to load image after ${maxRetries} retries:`, src);
    }
  };

  return (
    <VStack w='full' gap={8}>
      <Box w='full' position='relative'>
        <Swiper
          spaceBetween='16px'
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          modules={[Pagination]}
          style={{
            borderRadius: '16px',
            overflow: 'hidden'
          }}
        >
          {list.map((item, index) => {
            const imageState = imageStates[index] || {
              isLoading: true,
              hasError: false,
              retryCount: 0,
              currentSrc: item.src
            };

            return (
              <SwiperSlide key={index}>
                <Box
                  minH={{
                    base: 450,
                    md: 400
                  }}
                  px={2}
                  pt={4}
                  bg='gray.100'
                  borderRadius='12px'
                >
                  <AspectRatio
                    ratio={120 / 86}
                    position='relative'
                    flexDirection='column'
                    borderRadius='12px'
                    overflow='hidden'
                  >
                    <>
                      {/* Индикатор загрузки */}
                      {imageState.isLoading && !imageState.hasError && (
                        <Box
                          position='absolute'
                          top='50%'
                          left='50%'
                          transform='translate(-50%, -50%)'
                          zIndex={2}
                        >
                          <Spinner size='xl' color='gray.600' />
                        </Box>
                      )}

                      {/* Сообщение об ошибке */}
                      {imageState.hasError && (
                        <Box
                          position='absolute'
                          top='50%'
                          left='50%'
                          transform='translate(-50%, -50%)'
                          zIndex={2}
                          textAlign='center'
                          color='gray.500'
                          fontSize='sm'
                          px={4}
                        >
                          Не удалось загрузить изображение
                          {imageState.retryCount > 0 && (
                            <Box mt={2} fontSize='xs' color='gray.400'>
                              Попыток: {imageState.retryCount}/{maxRetries}
                            </Box>
                          )}
                        </Box>
                      )}

                      {/* Изображение */}
                      {!imageState.hasError && imageState.currentSrc && (
                        <Image
                          src={imageState.currentSrc}
                          alt={item.label}
                          fill
                          priority={index === 0}
                          style={{
                            objectFit: 'contain',
                            objectPosition: 'right',
                            transition: 'opacity 0.3s ease',
                            filter: imageState.isLoading
                              ? 'blur(10px)'
                              : 'none',
                            opacity: imageState.isLoading ? 0 : 1
                          }}
                          sizes='(max-width: 450px) 300px, (max-width: 1200px) 720px, 1200px'
                          placeholder='blur'
                          blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                          onLoad={() => handleImageLoad(index)}
                          onError={() => handleImageError(index, item.src)}
                        />
                      )}
                    </>
                  </AspectRatio>

                  <Box mt={2} color='black' textAlign='center'>
                    <Text
                      fontSize={{ base: '24px', md: '28px' }}
                      fontWeight='bold'
                      mb={2}
                    >
                      {item.label}
                    </Text>
                    <Text
                      fontSize={{ base: '16px', md: '18px' }}
                      color='gray.600'
                    >
                      {item.description}
                    </Text>
                  </Box>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
    </VStack>
  );
};

export default DesignListCarousel;
