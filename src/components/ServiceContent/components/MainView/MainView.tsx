'use client';

import { useState } from 'react';
import Image from 'next/image';

import { AspectRatio, Flex, VStack } from '@chakra-ui/react';

import { BlurText } from 'components/BlurText';

interface MainViewProps {
  title: string;
  description: string;
  src: string;
}

const MainView = ({ title, description, src }: MainViewProps) => {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  return (
    <Flex w='full' justifyContent='space-around' alignItems='center'>
      <VStack>
        <BlurText
          zIndex={2}
          as='h1'
          fontSize={{
            base: '26px',
            sm: '32px',
            md: '42px',
            lg: '56px',
            xl: '72px'
          }}
          textAlign='left'
          fontWeight={400}
          color='black'
          whiteSpace='pre-line'
          cursor='default'
          userSelect='none'
          text={title}
          delay={150}
          animateBy='words'
          direction='top'
          className='text-2xl mb-8'
          letterSpacing={{
            base: 0,
            md: '4px'
          }}
        />

        <BlurText
          zIndex={2}
          as='h1'
          fontSize={{
            base: '26px',
            sm: '32px',
            md: '42px',
            lg: '56px',
            xl: '72px'
          }}
          textAlign='left'
          fontWeight={400}
          color='black'
          whiteSpace='pre-line'
          cursor='default'
          userSelect='none'
          text={description}
          delay={150}
          animateBy='words'
          direction='top'
          className='text-2xl mb-8'
          letterSpacing={{
            base: 0,
            md: '4px'
          }}
        />
      </VStack>

      <AspectRatio
        ratio={2 / 3}
        w='full'
        position='relative'
        maxH='75vh'
        minW='40%'
        borderRadius='12px'
        overflow='hidden'
        display={{ base: 'none', md: 'block' }}
        maxW='400px'
      >
        <Image
          src={src}
          alt='Услуги главная'
          fill
          priority
          style={{
            objectFit: 'cover',
            transition: 'opacity 0.3s ease',
            filter: isImageLoading ? 'blur(10px)' : 'none'
          }}
          sizes='(max-width: 450px) 400px, 700px'
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
        />
      </AspectRatio>
    </Flex>
  );
};

export default MainView;
