'use client';

import { memo } from 'react';
import Square from '@assets/icons/square-dashed.svg';
import Stairs from '@assets/icons/stairs.svg';
import { GOOGLE_LINK } from 'constant';
import Image from 'next/image';

import {
  Box,
  Collapsible,
  Flex,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';

import { useIsTouchDevice } from 'hooks';

import { ProjectItemType } from 'types';

interface ProductItemProps {
  project: ProjectItemType;
}

const ProductItem = ({ project }: ProductItemProps) => {
  const {
    open: isHovered,
    onOpen: onMouseEnter,
    onClose: onMouseLeave
  } = useDisclosure();
  const { isTouch } = useIsTouchDevice();

  return (
    <VStack
      position='relative'
      w='full'
      h={{
        base: '200px',
        md: '270px'
      }}
      borderRadius='5px'
      overflow='hidden'
      justifyContent={{
        base: 'center',
        md: 'flex-end'
      }}
      transition='all 0.3s ease'
    >
      <Image
        sizes='(max-width: 450px) 400px, 600px'
        style={{
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        fill
        src={GOOGLE_LINK + project.sliders[0]}
        alt='contact cover'
      />

      <VStack
        position='absolute'
        w='full'
        h='full'
        alignItems='center'
        justifyContent='flex-end'
        cursor='pointer'
        boxShadow='initial'
        transition='box-shadow 0.5s ease'
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        _hover={{
          boxShadow: 'inset 0px -100px 40px -20px rgba(0, 0, 0, 0.42)'
        }}
      >
        {!isTouch && (
          <Collapsible.Root unmountOnExit open={isHovered} cursor='default'>
            <Collapsible.Content>
              <Flex
                w='full'
                justifyContent={{ base: 'center', md: 'flex-start' }}
                alignItems='center'
                gap={1}
                pb={10}
              >
                <Text
                  color='white'
                  fontSize={{
                    base: '16px',
                    md: '20px'
                  }}
                  mx={3}
                  pr={3}
                  fontWeight={600}
                  textAlign={{ base: 'center', md: 'right' }}
                >
                  {project.name}
                </Text>

                <Box
                  width={{
                    base: '20px',
                    md: '20px',
                    lg: '20px'
                  }}
                  height={{
                    base: '20px',
                    md: '20px',
                    lg: '20px'
                  }}
                >
                  <Square fill='white' />
                </Box>
                <Text
                  color='white'
                  fontSize={{
                    base: '16px',
                    md: '20px'
                  }}
                  mr={3}
                  fontWeight={600}
                  whiteSpace='nowrap'
                >
                  {`${project.area} м`}&#178;
                </Text>

                <Box
                  width={{
                    base: '20px',
                    md: '20px',
                    lg: '20px'
                  }}
                  height={{
                    base: '20px',
                    md: '20px',
                    lg: '20px'
                  }}
                >
                  <Stairs fill='white' />
                </Box>
                <Text
                  color='white'
                  fontSize={{
                    base: '16px',
                    md: '20px'
                  }}
                  fontWeight={600}
                  whiteSpace='nowrap'
                >
                  {project.floor}
                </Text>
              </Flex>
            </Collapsible.Content>
          </Collapsible.Root>
        )}
      </VStack>
    </VStack>
  );
};

export default memo(ProductItem);
