'use client';

import { memo, useState } from 'react';
import { paths } from 'constant';
import Image from 'next/image';
import Link from 'next/link';

import {
  AspectRatio,
  Collapsible,
  Flex,
  Skeleton,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';

import { useIsTouchDevice } from 'hooks';

import { formatCurrency, getGoogleDriveDirectLink } from 'helpers';

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
      <AspectRatio ratio={7 / 4}>
        <VStack
          position='relative'
          w='full'
          h='full'
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
            />
          )}

          <Image
            sizes='(max-width: 450px) 270px, (max-width: 900px) 500px, 700px'
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              filter: isImageLoading ? 'blur(10px)' : 'none',
              transition: 'filter 0.3s ease-in-out'
            }}
            fill
            src={getGoogleDriveDirectLink(project.sliders[0])}
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
                    pb={6}
                  >
                    <Text
                      color='white'
                      fontSize={{
                        base: '16px',
                        md: '20px'
                      }}
                      mx={3}
                      pr={3}
                      fontWeight='light'
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
                      fontWeight='light'
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
                      fontWeight='light'
                      whiteSpace='nowrap'
                    >
                      {project.implementationCost.shell === 0
                        ? 'по запросу'
                        : formatCurrency(project.implementationCost.shell)}
                    </Text>
                  </Flex>
                </Collapsible.Content>
              </Collapsible.Root>
            )}
          </VStack>
        </VStack>
      </AspectRatio>
    </Link>
  );
};

export default memo(ProductItem);
