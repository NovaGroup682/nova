'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import {
  AspectRatio,
  Box,
  Flex,
  Spinner,
  Text,
  VStack
} from '@chakra-ui/react';

interface CarouselItem {
  label: string;
  description: string;
  src: string;
}

interface DesignAnimatedListProps {
  list: CarouselItem[];
}

const DesignAnimatedList = ({ list }: DesignAnimatedListProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [currentSrc, setCurrentSrc] = useState<string>(list[0]?.src || '');
  const maxRetries = 3;
  const retryDelay = 2000;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollAccumulator = useRef(0);

  useEffect(() => {
    const newSrc = list[activeIndex]?.src;
    if (newSrc && newSrc !== currentSrc) {
      setIsImageLoading(true);
      setHasError(false);
      setRetryCount(0);
      setCurrentSrc(newSrc);
    }
  }, [activeIndex, list, currentSrc]);

  useEffect(() => {
    const handleWheelEvent = (e: WheelEvent) => {
      if (isHovered) {
        e.preventDefault();

        scrollAccumulator.current += e.deltaY;

        const scrollThreshold = 140;

        if (Math.abs(scrollAccumulator.current) > scrollThreshold) {
          if (scrollAccumulator.current > 0) {
            setActiveIndex((prev) => (prev + 1) % list.length);
          } else {
            setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
          }

          scrollAccumulator.current = 0;
        }
      }
    };

    if (isHovered) {
      document.addEventListener('wheel', handleWheelEvent, { passive: false });
    } else {
      document.removeEventListener('wheel', handleWheelEvent);
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.cursor = 'default';
      }

      scrollAccumulator.current = 0;
    }

    return () => {
      document.removeEventListener('wheel', handleWheelEvent);
    };
  }, [isHovered, list.length]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);

    if (retryCount < maxRetries) {
      const newRetryCount = retryCount + 1;
      setRetryCount(newRetryCount);

      setTimeout(() => {
        setIsImageLoading(true);
        const src = list[activeIndex]?.src || '';
        const separator = src.includes('?') ? '&' : '?';
        setCurrentSrc(
          `${src}${separator}_retry=${newRetryCount}&_t=${Date.now()}`
        );
      }, retryDelay);
    } else {
      setHasError(true);
      console.warn(
        `Failed to load image after ${maxRetries} retries:`,
        list[activeIndex]?.src
      );
    }
  };

  return (
    <Flex
      w='full'
      maxH='700px'
      gap={0}
      flexDirection={{
        base: 'column',
        md: 'row'
      }}
      bg='gray.100'
      borderRadius='12px'
      justifyContent='space-between'
    >
      {/* left */}
      <Box
        minW={{
          base: 'auto',
          md: '420px'
        }}
        maxW='500px'
        w={{
          base: 'full',
          md: '50%'
        }}
        minH='500px'
        py={8}
        pl={8}
        position='relative'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <VStack gap={6} align='flex-start' h='full'>
          <Box
            display='flex'
            justifyContent='center'
            ref={scrollContainerRef}
            flex={1}
            overflowY='hidden'
            w='full'
            h='full'
            css={{
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            <VStack gap={4} align='center' justifyContent='center'>
              {list.map((item, index) => (
                <Box
                  key={index}
                  w='full'
                  pl={4}
                  cursor='pointer'
                  transition='all 0.3s ease'
                  onClick={() => setActiveIndex(index)}
                >
                  <Text
                    fontSize={{
                      base: '16px',
                      md: index === activeIndex ? '24px' : '18px'
                    }}
                    fontWeight='bold'
                    color='black'
                    textShadow={
                      index === activeIndex
                        ? '1px 1px 14px rgba(0,0,0, 0.25)'
                        : 'none'
                    }
                    transition='all 0.3s ease'
                    lineHeight='36px'
                    _hover={{
                      color: index === activeIndex ? 'black' : 'gray.200'
                    }}
                  >
                    {item.label}
                  </Text>
                  <Box
                    h={index === activeIndex ? 'auto' : '0px'}
                    maxH={index === activeIndex ? '100px' : '0px'}
                    overflow='hidden'
                    transition='all 1s ease-in-out'
                  >
                    <Text
                      fontSize={{ base: '16px', md: '18px' }}
                      color='gray.600'
                      opacity={index === activeIndex ? 0.9 : 0}
                      textAlign='left'
                      transition='all 1s ease-in-out'
                    >
                      {item.description}
                    </Text>
                  </Box>
                </Box>
              ))}
            </VStack>
          </Box>
        </VStack>
      </Box>

      {/* right */}
      <Flex
        w={{
          base: 'full',
          md: '65%'
        }}
        flexDirection='column'
        justifyContent='center'
        p={8}
      >
        <AspectRatio
          ratio={120 / 86}
          position='relative'
          flexDirection='column'
          borderRadius='12px'
          overflow='hidden'
        >
          <>
            {isImageLoading && !hasError && (
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

            {isImageLoading && (
              <Box
                position='absolute'
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg='gray.100'
                zIndex={0}
              />
            )}

            {hasError && (
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
                {retryCount > 0 && (
                  <Box mt={2} fontSize='xs' color='gray.400'>
                    Попыток: {retryCount}/{maxRetries}
                  </Box>
                )}
              </Box>
            )}

            {!hasError && currentSrc && (
              <Image
                src={currentSrc}
                alt={list[activeIndex]?.label || ''}
                fill
                priority
                style={{
                  objectFit: 'contain',
                  objectPosition: 'right',
                  transition: 'opacity 0.3s ease',
                  filter: isImageLoading ? 'blur(10px)' : 'none',
                  opacity: isImageLoading ? 0 : 1
                }}
                sizes='(max-width: 450px) 300px, (max-width: 1200px) 720px, 1200px'
                placeholder='blur'
                blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
            )}

            {hasError && (
              <Box
                position='absolute'
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg='gray.100'
                zIndex={1}
              />
            )}
          </>
        </AspectRatio>
      </Flex>
    </Flex>
  );
};

export default DesignAnimatedList;
