'use client';

import { memo, useState } from 'react';
import { GOOGLE_LINK, paths } from 'constant';
import Image from 'next/image';
import Link from 'next/link';

import {
  Collapsible,
  Flex,
  Skeleton,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';

import { useIsTouchDevice } from 'hooks';

import { formatCurrency } from 'helpers';

import { ProjectItemType } from 'types';

interface ProductItemProps {
  project: ProjectItemType;
}

const ProductItem = ({ project }: ProductItemProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const {
    open: isHovered,
    onOpen: onMouseEnter,
    onClose: onMouseLeave
  } = useDisclosure();
  const { isTouch } = useIsTouchDevice();

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
  };

  return (
    <Link href={`${paths.project}/${project.id}`}>
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
        {isImageLoading && (
          <Skeleton
            position='absolute'
            top={0}
            left={0}
            w='full'
            h='full'
            borderRadius='5px'
            bg='gray.100'
          />
        )}

        <Image
          sizes='(max-width: 450px) 270px, 400px'
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            filter: isImageLoading ? 'blur(10px)' : 'none',
            transition: 'filter 0.3s ease-in-out'
          }}
          fill
          src={GOOGLE_LINK + project.sliders[0]}
          alt='contact cover'
          onLoad={handleImageLoad}
          onError={handleImageError}
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
                    {`${project.variants[0].area} м`}&#178;
                  </Text>

                  <Text
                    color='white'
                    fontSize={{
                      base: '16px',
                      md: '20px'
                    }}
                    fontWeight={600}
                    whiteSpace='nowrap'
                  >
                    {formatCurrency(project.implementationCost.shell)}
                  </Text>
                </Flex>
              </Collapsible.Content>
            </Collapsible.Root>
          )}
        </VStack>
      </VStack>
    </Link>
  );
};

export default memo(ProductItem);
