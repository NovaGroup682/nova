'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { AspectRatio, Box, Flex, Text, VStack } from '@chakra-ui/react';

interface CarouselItem {
  label: string;
  description: string;
  src: string;
}

interface ArchitecturalBlockProps {
  title: string;
  src: string;
  text1: string;
  text2: string;
  carousel: CarouselItem[];
}

const ArchitecturalBlock = ({
  title,
  src,
  text1,
  text2,
  carousel
}: ArchitecturalBlockProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollAccumulator = useRef(0);

  useEffect(() => {
    const handleWheelEvent = (e: WheelEvent) => {
      if (isHovered) {
        e.preventDefault();

        scrollAccumulator.current += e.deltaY;

        const scrollThreshold = 140;

        if (Math.abs(scrollAccumulator.current) > scrollThreshold) {
          if (scrollAccumulator.current > 0) {
            setActiveIndex((prev) => (prev + 1) % carousel.length);
          } else {
            setActiveIndex(
              (prev) => (prev - 1 + carousel.length) % carousel.length
            );
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
  }, [isHovered, carousel.length]);

  return (
    <VStack w='full' gap={8}>
      <Text
        fontSize={{ base: '24px', md: '32px' }}
        w='full'
        fontWeight='bold'
        color='black'
        textAlign='left'
      >
        {title}
      </Text>
      <Flex
        w='full'
        gap={8}
        flexDirection={{
          base: 'column',
          md: 'row'
        }}
        alignItems='center'
      >
        <VStack
          w='full'
          h='full'
          p={4}
          justifyContent='center'
          alignItems='center'
        >
          <Text
            fontSize={{ base: '20px', md: '22px' }}
            color='gray.600'
            opacity={0.8}
            lineHeight='1.6'
            textAlign={{
              base: 'center',
              md: 'right'
            }}
          >
            {text1}
          </Text>

          <Text
            fontSize={{ base: '20px', md: '22px' }}
            color='gray.600'
            opacity={0.8}
            lineHeight='1.6'
            textAlign={{
              base: 'center',
              md: 'right'
            }}
          >
            {text2}
          </Text>
        </VStack>
        <AspectRatio
          ratio={1}
          w='full'
          position='relative'
          maxH='50vh'
          borderRadius='12px'
          overflow='hidden'
        >
          <Image
            src={src}
            alt={title}
            fill
            priority
            style={{
              objectFit: 'cover',
              transition: 'opacity 0.3s ease',
              filter: isImageLoading ? 'blur(10px)' : 'none'
            }}
            sizes='(max-width: 450px) 400px, 1400px'
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
        </AspectRatio>
      </Flex>

      <Flex
        w='full'
        gap={8}
        flexDirection={{
          base: 'column',
          md: 'row'
        }}
      >
        {/* left */}
        <Box
          minW={{
            base: 'auto',
            md: '420px'
          }}
          w={{
            base: 'full',
            md: '35%'
          }}
          bg='black'
          p={8}
          position='relative'
          borderRadius='12px'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <VStack gap={6} align='flex-start' h='full'>
            <Box
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
              <VStack gap={2} align='center' pb={4} justifyContent='center'>
                {carousel.map((item, index) => (
                  <Box
                    key={index}
                    w='full'
                    p={4}
                    cursor='pointer'
                    transition='all 0.3s ease'
                    onClick={() => setActiveIndex(index)}
                    _hover={{
                      '& p': {
                        color: index === activeIndex ? 'white' : 'gray.500'
                      }
                    }}
                  >
                    <Text
                      fontSize={{
                        base: '16px',
                        md: index === activeIndex ? '24px' : '18px'
                      }}
                      fontWeight='bold'
                      color='white'
                      textShadow={
                        index === activeIndex
                          ? '1px 1px 14px rgba(255, 255, 255, 0.75)'
                          : 'none'
                      }
                      transition='all 0.3s ease'
                    >
                      {item.label}
                    </Text>
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
        >
          <Flex position='relative' w='full' flex={1} flexDirection='column'>
            <Image
              src={carousel[activeIndex]?.src}
              alt={carousel[activeIndex]?.label}
              fill
              priority
              style={{
                objectFit: 'none',
                transition: 'opacity 0.3s ease',
                filter: isImageLoading ? 'blur(10px)' : 'none'
              }}
              sizes='(max-width: 450px) 300px, 720px'
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
          </Flex>
          <Text
            fontSize={{ base: '16px', md: '18px' }}
            color='black'
            opacity={0.9}
            textAlign='center'
            pt={2}
          >
            {carousel[activeIndex]?.description}
          </Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default ArchitecturalBlock;
