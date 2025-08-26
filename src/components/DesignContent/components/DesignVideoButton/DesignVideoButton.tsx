'use client';

import Video from '@assets/icons/video.svg';
import Image from 'next/image';

import { Box, BoxProps } from '@chakra-ui/react';

import { FadeContent } from 'components/FadeContent';

interface DesignVideoButtonProps extends BoxProps {
  src: string;
  onOpen: () => void;
}

const DesignVideoButton = ({
  src,
  onOpen,
  ...styles
}: DesignVideoButtonProps) => (
  <Box
    cursor='pointer'
    onClick={onOpen}
    position='relative'
    w={{
      base: 'full',
      md: '450px'
    }}
    h={{
      base: '250px',
      md: '300px'
    }}
    transition='all 0.3s ease'
  >
    <FadeContent
      blur={true}
      duration={1000}
      easing='ease-out'
      initialOpacity={0}
      className='main-project-description'
    >
      <Box
        position='absolute'
        userSelect='none'
        bottom={0}
        w={{
          base: 'full',
          md: '450px'
        }}
        h={{
          base: '250px',
          md: '300px'
        }}
        style={{
          transition: 'width 0.3s ease, height 0.3s ease'
        }}
        zIndex={1}
        _hover={{
          zIndex: 99,
          '& img': {
            opacity: 0.9
          },
          '& .buttonContainer': {
            transform: `scale(1.2)`,
            bg: 'gray.200',

            '& svg': {
              fill: 'white'
            }
          }
        }}
        {...styles}
      >
        <Box position='relative' w='full' h='full'>
          <Box
            className='buttonContainer'
            position='absolute'
            right={{
              base: 15,
              md: -25
            }}
            bottom={{
              base: 15,
              md: -25
            }}
            bg='gray.100'
            transition='all 0.3s ease'
            borderRadius='50%'
            width={{
              base: '70px',
              md: '100px'
            }}
            height={{
              base: '70px',
              md: '100px'
            }}
            alignContent='center'
          >
            <Video
              fill='gray.500'
              width='40px'
              height='40px'
              style={{
                margin: '0 auto'
              }}
            />
          </Box>
        </Box>
        <Image
          src={src}
          alt='main popup background'
          fill
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: -1,
            borderRadius: '32px',
            transition: 'all 0.3s ease'
          }}
          priority
          sizes='(max-width: 450px) 300px, 450px'
          quality={75}
        />
      </Box>
    </FadeContent>
  </Box>
);

export default DesignVideoButton;
