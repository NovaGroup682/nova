'use client';

import { memo, useEffect, useState } from 'react';
import { paths, PROJECT_ASPECT_RATIO } from 'constant';
import projects from 'constant/projects';
import Image from 'next/image';
import Link from 'next/link';

import {
  AspectRatio,
  Box,
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
  const [hasError, setHasError] = useState(false);
  const imageSrc = getSafeImageUrl(project.sliders[0]);

  const {
    open: isHovered,
    onOpen: onMouseEnter,
    onClose: onMouseLeave
  } = useDisclosure();
  const { isTouch } = useIsTouchDevice();

  useEffect(() => {
    // Сброс состояния при изменении проекта
    setIsImageLoading(true);
    setHasError(false);

    // Проверяем, загружено ли изображение из кеша браузера
    const img = new window.Image();
    let isMounted = true;

    img.onload = () => {
      if (isMounted) {
        setIsImageLoading(false);
      }
    };

    img.onerror = () => {
      // Ошибка будет обработана компонентом Image через onError
    };

    img.src = imageSrc;

    // Если изображение уже загружено (из кеша), onload может не сработать
    if (img.complete && img.naturalWidth > 0) {
      setIsImageLoading(false);
    }

    return () => {
      isMounted = false;
      img.onload = null;
      img.onerror = null;
    };
  }, [project.id, imageSrc]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setHasError(true);
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
          {isImageLoading && !hasError && (
            <Skeleton
              loading
              opacity={0.5}
              position='absolute'
              top={0}
              left={0}
              variant='shine'
              width='full'
              height='full'
              css={{
                '--start-color': 'colors.gray.400',
                '--end-color': 'colors.gray.500'
              }}
              borderRadius='5px'
              zIndex={1}
            />
          )}

          {hasError && (
            <Box
              position='absolute'
              top='50%'
              left='50%'
              transform='translate(-50%, -50%)'
              zIndex={2}
              textAlign='center'
              color='gray.500'
              fontSize='sm'
              px={4}
            >
              Не удалось загрузить изображение
            </Box>
          )}

          {!hasError && (
            <Image
              key={`${project.id}-${imageSrc}`}
              sizes='(max-width: 450px) 470px,  (max-width: 900px) 700px, 100%'
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                filter: isImageLoading ? 'blur(10px)' : 'none',
                transition: 'filter 0.3s ease-in-out, opacity 0.3s ease-in-out',
                opacity: isImageLoading ? 0 : 1
              }}
              fill
              src={imageSrc}
              alt={`${project.name} - проект дома`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading={project.name === projects[0].name ? 'eager' : 'lazy'}
              priority={project.name === projects[0].name}
              placeholder='blur'
              blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
            />
          )}

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
