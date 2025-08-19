'use client';

import Video from '@assets/icons/video.svg';
import Image from 'next/image';

import { Box, BoxProps, Text } from '@chakra-ui/react';

import { useIsTouchDevice } from 'hooks';

import { FadeContent } from 'components/FadeContent';

interface DesignVideoButtonProps extends BoxProps {
  src: string;
  onOpen: () => void;
}

const DesignVideoButton = ({
  src,
  onOpen,
  ...styles
}: DesignVideoButtonProps) => {
  const { isTouch } = useIsTouchDevice();

  return (
    <Box
      position='relative'
      w={{
        base: 'full',
        md: '300px'
      }}
      h={{
        base: '250px',
        md: '300px'
      }}
      mt={{
        base: '16px',
        md: 0
      }}
      css={{
        '& p': {
          top: {
            base: '-290px',
            md: 0
          },
          left: {
            base: 0,
            md: 'auto'
          },
          right: {
            base: 0,
            md: '-350px'
          }
        }
      }}
      _hover={{
        '& p': {
          right: '-350px'
        },
        w: {
          md: '450px'
        }
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
            md: '300px'
          }}
          h={{
            base: '250px',
            md: '200px'
          }}
          style={{
            transition: isTouch ? 'none' : 'width 0.3s ease, height 0.3s ease'
          }}
          zIndex={1}
          _hover={{
            zIndex: 99,
            h: {
              md: isTouch ? '300px' : '300px'
            },
            w: {
              md: isTouch ? '300px' : '450px'
            },
            '& .buttonContainer': {
              transform: isTouch ? 'none' : `scale(1.2)`
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
              _hover={{
                bg: 'gray.200'
              }}
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
              cursor='pointer'
              onClick={onOpen}
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
              borderRadius: '32px'
            }}
            priority
            sizes='(max-width: 450px) 300px, 450px'
            quality={75}
          />
        </Box>
      </FadeContent>

      <Text
        position='absolute'
        alignSelf='center'
        textAlign={{
          base: 'center',
          md: 'left'
        }}
        bottom={0}
        pt={{
          base: 0,
          md: '100px'
        }}
      >
        Посмотрите короткое видео о разделе
      </Text>
    </Box>
  );
};

export default DesignVideoButton;
