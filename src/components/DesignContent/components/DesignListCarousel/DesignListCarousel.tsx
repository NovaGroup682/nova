'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { AspectRatio, Box, Text, VStack } from '@chakra-ui/react';

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
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

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
          {list.map((item, index) => (
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
                  <Image
                    src={item.src}
                    alt={item.label}
                    fill
                    priority
                    style={{
                      objectFit: 'contain',
                      objectPosition: 'right',
                      transition: 'opacity 0.3s ease',
                      filter: isImageLoading ? 'blur(10px)' : 'none'
                    }}
                    sizes='(max-width: 450px) 300px, (max-width: 1200px) 720px, 1200px'
                    onLoad={() => setIsImageLoading(false)}
                    onError={() => setIsImageLoading(false)}
                  />
                </AspectRatio>

                {/* Overlay */}
                <Box
                  // p={6}
                  mt={2}
                  color='black'
                  textAlign='center'
                >
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
          ))}
        </Swiper>
      </Box>
    </VStack>
  );
};

export default DesignListCarousel;
