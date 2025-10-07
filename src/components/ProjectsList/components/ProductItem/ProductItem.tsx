'use client';

import { memo, useState } from 'react';
import { paths, PROJECT_ASPECT_RATIO } from 'constant';
import projects from 'constant/projects';
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

import { getSafeImageUrl } from 'helpers';

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
    console.warn('Failed to load project image:', project.sliders[0]);
  };

  return (
    <Link href={`${paths.project}/${project.id}`}>
      <AspectRatio ratio={PROJECT_ASPECT_RATIO}>
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
            sizes='(max-width: 450px) 470px,  (max-width: 900px) 700px, 100%'
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
              filter: isImageLoading ? 'blur(10px)' : 'none',
              transition: 'filter 0.3s ease-in-out'
            }}
            fill
            src={getSafeImageUrl(project.sliders[0])}
            alt={`${project.name} - проект дома`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading={project.name === projects[0].name ? 'eager' : 'lazy'}
            priority={project.name === projects[0].name}
            placeholder='blur'
            blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
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

                    {/* temporary removed */}
                    {/* <Text
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
                    </Text> */}
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
