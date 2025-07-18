'use client';

import React, { useState } from 'react';
import Xmark from '@assets/icons/xmark.svg';
import Image from 'next/image';

import { Box, useDisclosure } from '@chakra-ui/react';

import { useIsTouchDevice } from 'hooks';

import content from 'content';

import { MainDescriptionModal } from './components';

const MainProjectDescription = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { open, onOpen, onClose } = useDisclosure();

  const { isTouch } = useIsTouchDevice();

  return (
    <>
      <Box
        position='absolute'
        right={{
          base: 0,
          md: '120px'
        }}
        bottom={70}
        w={{
          base: 'full',
          md: isHovered && !isTouch ? 550 : 450
        }}
        h={{
          base: 240,
          md: isHovered && !isTouch ? 370 : 300
        }}
        style={{
          transition: isTouch ? 'none' : 'width 0.3s ease, height 0.3s ease'
        }}
        zIndex={isHovered ? 10 : 1}
      >
        <Box position='relative' w='full' h='full'>
          <Box
            position='absolute'
            right={{
              base: 15,
              md: -25
            }}
            bottom={{
              base: 15,
              md: -25
            }}
            bg='white'
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
            transform={isTouch ? 'rotate(45deg)' : 'scale(1) rotate(45deg)'}
            transition={isTouch ? 'none' : 'transform 0.3s ease'}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            _hover={{
              transform: isTouch ? 'none' : 'scale(1.2) rotate(45deg)'
            }}
            onClick={onOpen}
          >
            <Xmark
              fill='gray.500'
              width='50px'
              height='50px'
              style={{
                margin: '0 auto'
              }}
            />
          </Box>
        </Box>
        <Image
          src={content.main.mainPopupBg}
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

      <MainDescriptionModal isOpen={open} onClose={onClose} />
    </>
  );
};

export default MainProjectDescription;
