'use client';

import { useState } from 'react';
import Video from '@assets/icons/video.svg';
import Xmark from '@assets/icons/xmark.svg';
import Image from 'next/image';

import { Box, BoxProps } from '@chakra-ui/react';

import { useIsTouchDevice, useScreenHeight } from 'hooks';

import { FadeContent } from 'components/FadeContent';

interface ImagePopupButtonProps extends BoxProps {
  src: string;
  onOpen: () => void;
  isVideo?: boolean;
  customWidth: {
    base: string | number;
    sm: string | number;
    hovered: string | number;
    md: string | number;
  };
  customHeight: {
    base: string | number;
    sm: string | number;
    hovered: string | number;
    md: string | number;
  };
}

const ImagePopupButton = ({
  src,
  onOpen,
  isVideo,
  customWidth,
  customHeight,
  ...styles
}: ImagePopupButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isTouch } = useIsTouchDevice();
  const { isSmallScreen } = useScreenHeight();

  const rotate = isVideo ? 'rotate(0deg)' : 'rotate(45deg)';

  return (
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
        right={0}
        bottom={70}
        w={{
          base: customWidth.base,
          md: isSmallScreen
            ? customWidth.sm
            : isHovered && !isTouch
              ? customWidth.hovered
              : customWidth.md
        }}
        h={{
          base: customHeight.base,
          md: isSmallScreen
            ? customHeight.sm
            : isHovered && !isTouch
              ? customHeight.hovered
              : customHeight.md
        }}
        style={{
          transition: isTouch ? 'none' : 'width 0.3s ease, height 0.3s ease'
        }}
        zIndex={isHovered ? 99 : 1}
        {...styles}
      >
        <Box position='relative' w='full' h='full'>
          <Box
            position='absolute'
            right={{
              base: 15,
              md: isVideo ? -15 : -25
            }}
            bottom={{
              base: 15,
              md: isVideo ? -15 : -25
            }}
            bg='white'
            borderRadius='50%'
            width={{
              base: '70px',
              md: isVideo ? '75px' : '100px'
            }}
            height={{
              base: '70px',
              md: isVideo ? '75px' : '100px'
            }}
            alignContent='center'
            cursor='pointer'
            transform={isTouch && isVideo ? rotate : `scale(1) ${rotate}`}
            transition={isTouch ? 'none' : 'transform 0.3s ease'}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            _hover={{
              transform: isTouch ? 'none' : `scale(1.2) ${rotate}`
            }}
            onClick={onOpen}
          >
            {isVideo ? (
              <Video
                fill='gray.500'
                width='50px'
                height='50px'
                style={{
                  margin: '0 auto'
                }}
              />
            ) : (
              <Xmark
                fill='gray.500'
                width='50px'
                height='50px'
                style={{
                  margin: '0 auto'
                }}
              />
            )}
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
          sizes='(max-width: 450px) 400px, 1200px'
          quality={75}
        />
      </Box>
    </FadeContent>
  );
};

export default ImagePopupButton;
