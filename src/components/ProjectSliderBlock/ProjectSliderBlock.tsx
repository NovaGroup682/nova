'use client';

import { useMemo, useRef, useState } from 'react';
import Bath from '@assets/icons/bath.svg';
import Bed from '@assets/icons/bed-front.svg';
import { paths } from 'constant';
import projects from 'constant/projects';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import {
  AspectRatio,
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Link,
  Text
} from '@chakra-ui/react';

import content from 'content';

import { SliderItem, SliderNavigation } from 'components/SliderContent';

const ProjectSliderBlock = () => {
  const swiperRef = useRef<SwiperType>(null);
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const sliders = useMemo(
    () =>
      projects.filter((project) =>
        content.main.projectsSliders.includes(project.id)
      ),
    []
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

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.realIndex);
  };

  const onSliderClick = (id: string) => () =>
    router.push(`${paths.project}/${id}`);

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
    <AspectRatio
      display='flex'
      flexDirection='column'
      ratio={7 / 4}
      mt={8}
      mb={{ base: 4, md: 8 }}
      h='full'
      w='full'
      borderRadius='2xl'
      overflow='hidden'
      justifyContent='space-between'
    >
      <Box w='full' position='relative'>
        <Swiper
          slidesPerView={1}
          mousewheel={true}
          keyboard={true}
          loop
          allowTouchMove={true}
          className='mySwiper'
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          style={{ width: '100%' }}
        >
          {sliders.map((slide) => (
            <SwiperSlide key={slide.id} style={{ width: '100%' }}>
              <SliderItem
                src={slide.sliders[0]}
                onClick={onSliderClick(slide.id)}
              />
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
        <Grid
          templateColumns={{
            base: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)'
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
            colSpan={{ base: 1, md: 1 }}
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
                <Bed fill='white' />
              </Box>
              <Text color='white' fontSize={24} mx={3} fontWeight={600}>
                {sliders[currentIndex].beds}
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
                {sliders[currentIndex].baths}
              </Text>
            </Flex>
          </GridItem>
          <GridItem
            colSpan={1}
            margin='0 auto'
            display={{ base: 'none', md: 'grid' }}
          >
            {projectBtn()}
          </GridItem>

          <GridItem
            colSpan={{ base: 1, md: 1 }}
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
              {sliders[currentIndex].name}
            </Text>
          </GridItem>
        </Grid>
        {sliders.length > 1 && (
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
      </Box>
    </AspectRatio>
  );
};

export default ProjectSliderBlock;
