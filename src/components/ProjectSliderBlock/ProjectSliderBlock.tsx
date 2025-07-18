'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Bath from '@assets/icons/bath.svg';
import Bed from '@assets/icons/bed-front.svg';
import House from '@assets/icons/house-blank.svg';
import Square from '@assets/icons/square-dashed.svg';
import { paths } from 'constant';
import Image from 'next/image';
import NextLink from 'next/link';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  Box,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Link,
  Text,
  VStack
} from '@chakra-ui/react';

import content from 'content';

const ProjectSliderBlock = () => {
  const swiperRef = useRef<SwiperType>(null);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const idsList = useMemo(
    () =>
      content.main.projectsSlider.map((item, idx) => ({
        id: item.id,
        index: idx
      })),
    []
  );

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.slideTo) {
      swiperRef.current.slideTo(currentIndex);
    }
  }, [currentIndex]);

  const projectBtn = () => (
    <Link
      href={paths.projects}
      as={NextLink}
      py='16px'
      px={{
        base: '16px',
        md: '24px'
      }}
      borderRadius='10px'
      fontFamily='body'
      bg='white'
      color='black'
      fontWeight='bold'
      _hover={{
        bg: 'gray.700',
        color: 'white',
        textDecoration: 'none'
      }}
      textTransform='uppercase'
      cursor='pointer'
    >
      {content.common.allProjects}
    </Link>
  );

  return (
    <VStack
      my={8}
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
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
        style={{ width: '100%' }}
      >
        {content.main.projectsSlider.map((slide) => (
          <SwiperSlide key={slide.id} style={{ width: '100%' }}>
            <Box
              h={{
                base: 300,
                md: 600,
                lg: 800
              }}
              w='full'
              boxShadow='inset 0px -140px 40px -20px rgba(0, 0, 0, 0.42)'
              // add navigation by click on project to project details
              // onClick={()=>console.log('click', currentIndex)}
              cursor='pointer'
              position='relative'
            >
              <Image
                src={slide.img}
                alt='Background'
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                  zIndex: -1
                }}
                priority
                sizes='(max-width: 450px) 400px, 1200px'
                quality={75}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      <Flex
        position='absolute'
        w='full'
        zIndex={10}
        justifyContent='center'
        top={{
          base: '16px',
          md: '32px'
        }}
      >
        <Flex
          position='absolute'
          borderRadius='xl'
          bg='gray.500'
          gap={4}
          px={4}
          py={0}
        >
          {idsList.map((item) => (
            <IconButton
              key={`slider-btn-${item.index}`}
              position='relative'
              onClick={() => setCurrentIndex(item.index)}
              minW='auto'
              aria-label='Search database'
              variant='outline'
              size='lg'
              border='none'
              transform={currentIndex === item.index ? 'scale(1.5)' : 'inherit'}
              transition='transform 0.3s ease'
              _hover={{
                bg: 'none',
                '& svg, & p': {
                  opacity: 0.5
                }
              }}
              _focus={{
                outlineWidth: 0
              }}
            >
              <House fill='white' />
              <Text
                position='absolute'
                left={0}
                right={0}
                top={currentIndex === item.index ? '11.5px' : '11.25px'}
                fontSize={currentIndex === item.index ? '11px' : '10px'}
                color='white'
                fontWeight={600}
              >
                {item.index + 1}
              </Text>
            </IconButton>
          ))}
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)'
        }}
        position='absolute'
        w='full'
        zIndex={10}
        bottom={{
          base: '16px',
          md: '32px'
        }}
        justifyContent='flex-start'
        px='32px'
        alignItems='center'
        gap={1}
      >
        <GridItem
          colSpan={{ base: 2, md: 1 }}
          textAlign='left'
          userSelect='none'
        >
          <Flex
            w='full'
            justifyContent={{ base: 'center', md: 'flex-start' }}
            alignItems='center'
            gap={1}
          >
            <Box
              width={{
                base: '20px',
                md: '30px',
                lg: '40px'
              }}
              height={{
                base: '20px',
                md: '30px',
                lg: '40px'
              }}
            >
              <Square fill='white' />
            </Box>
            <Text
              color='white'
              fontSize={24}
              mx={3}
              fontWeight={600}
              whiteSpace='nowrap'
            >
              {`${content.main.projectsSlider[currentIndex].square} m2`}
            </Text>
            <Box
              width={{
                base: '20px',
                md: '30px',
                lg: '40px'
              }}
              height={{
                base: '20px',
                md: '30px',
                lg: '40px'
              }}
            >
              <Bed fill='white' />
            </Box>
            <Text color='white' fontSize={24} mx={3} fontWeight={600}>
              {content.main.projectsSlider[currentIndex].beds}
            </Text>
            <Box
              width={{
                base: '20px',
                md: '30px',
                lg: '40px'
              }}
              height={{
                base: '20px',
                md: '30px',
                lg: '40px'
              }}
            >
              <Bath fill='white' />
            </Box>
            <Text color='white' fontSize={24} mx={3} fontWeight={600}>
              {content.main.projectsSlider[currentIndex].baths}
            </Text>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={1}
          margin='0 auto'
          display={{ base: 'none', lg: 'grid' }}
        >
          {projectBtn()}
        </GridItem>

        <GridItem
          colSpan={{ base: 2, md: 1 }}
          textAlign={{ base: 'center', md: 'right' }}
          userSelect='none'
        >
          <Text
            color='white'
            fontSize={{
              base: '18px',
              md: '24px'
            }}
            mx={3}
            fontWeight={600}
            textAlign={{ base: 'center', md: 'right' }}
          >
            {content.main.projectsSlider[currentIndex].name}
          </Text>
        </GridItem>
      </Grid>

      <Flex
        position='absolute'
        w='full'
        zIndex={10}
        bottom='100px'
        justifyContent='center'
        display={{ base: 'grid', lg: 'none' }}
      >
        {projectBtn()}
      </Flex>
    </VStack>
  );
};

export default ProjectSliderBlock;
