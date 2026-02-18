'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import {
  AspectRatio,
  Box,
  Flex,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';

import { getGoogleDriveDirectLink } from 'helpers';

import { SliderModal } from 'components/SliderContent';
import { EditProjectButton } from '../EditProjectButton';
import { EditProjectModal } from '../EditProjectModal';

interface ProjectLayoutsProps {
  label: string;
  area: number;
  plans: string[];
}

const ProjectLayouts = ({ label, area, plans }: ProjectLayoutsProps) => {
  const { open: isOpen, onOpen, onClose } = useDisclosure();

  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    index: number;
  } | null>(null);

  const [imageStates, setImageStates] = useState<
    Record<
      number,
      {
        isLoading: boolean;
        hasError: boolean;
        retryCount: number;
        currentSrc: string;
      }
    >
  >({});

  const maxRetries = 3;
  const retryDelay = 2000;

  const imageUrls = useMemo(
    () => plans.map((plan) => getGoogleDriveDirectLink(plan)),
    [plans]
  );

  useEffect(() => {
    setImageStates((prev) => {
      const newStates = { ...prev };
      let hasChanges = false;

      plans.forEach((plan, index) => {
        if (!newStates[index]) {
          newStates[index] = {
            isLoading: true,
            hasError: false,
            retryCount: 0,
            currentSrc: getGoogleDriveDirectLink(plan)
          };
          hasChanges = true;
        }
      });

      return hasChanges ? newStates : prev;
    });
  }, [plans]);

  const handleImageLoad = (index: number) => {
    setImageStates((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        isLoading: false,
        hasError: false
      }
    }));
  };

  const handleImageError = (index: number, src: string) => {
    const state = imageStates[index];
    if (!state) return;

    if (state.retryCount < maxRetries) {
      const newRetryCount = state.retryCount + 1;
      setImageStates((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          isLoading: false,
          retryCount: newRetryCount
        }
      }));

      setTimeout(() => {
        setImageStates((prev) => ({
          ...prev,
          [index]: {
            ...prev[index],
            isLoading: true,
            currentSrc: `${src}${src.includes('?') ? '&' : '?'}_retry=${newRetryCount}&_t=${Date.now()}`
          }
        }));
      }, retryDelay);
    } else {
      setImageStates((prev) => ({
        ...prev,
        [index]: {
          ...prev[index],
          isLoading: false,
          hasError: true
        }
      }));
      console.warn(
        `Failed to load plan image after ${maxRetries} retries:`,
        src
      );
    }
  };

  const handleImageClick = useCallback(
    (imageSrc: string, imageAlt: string, index: number) => {
      setSelectedImage({ src: imageSrc, alt: imageAlt, index });
    },
    []
  );

  const handleCloseImageModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  return (
    <VStack w='full' gap={2}>
      <Text
        w='full'
        textAlign='left'
        fontSize={{
          base: 16,
          md: 24
        }}
      >
        {label}
      </Text>
      <Flex
        w='full'
        justifyContent='space-between'
        alignItems='center'
        flexDir={{
          base: 'column',
          md: 'row'
        }}
        gap={{
          base: 2,
          md: 4
        }}
        my={{
          base: 0,
          md: 4
        }}
      >
        <Flex
          alignItems='center'
          gap={4}
          justifyContent={{
            base: 'flex-start',
            md: 'flex-start'
          }}
          w={{
            base: 'full',
            md: 'auto'
          }}
        >
          <Text
            fontSize={{
              base: 14,
              md: 18
            }}
            color='gray.500'
          >
            {`Общая площадь ${area} м`}&#178;
          </Text>
        </Flex>
      </Flex>

      <Stack
        w='full'
        gap={4}
        flexDirection={{
          base: 'column',
          md: plans.length === 1 ? 'column' : 'row'
        }}
        maxW={{
          base: 'full',
          md: plans.length === 1 ? '50%' : 'full'
        }}
      >
        {plans.map((plan, idx) => (
          <Stack
            key={plan}
            w='full'
            gap={4}
            flexDirection='column'
            justifyContent='center'
          >
            <Text
              fontWeight={400}
              fontSize={{
                base: '18px',
                md: '24px'
              }}
              textAlign='center'
              mt={{
                base: 2,
                md: 0
              }}
            >
              {`План ${idx % 2 ? 'второго' : 'первого'} этажа`}
            </Text>
            <AspectRatio
              position='relative'
              ratio={4 / 5}
              maxH='75vh'
              cursor='pointer'
              onClick={() =>
                handleImageClick(
                  getGoogleDriveDirectLink(plan),
                  `План ${idx % 2 ? 'второго' : 'первого'} этажа`,
                  idx
                )
              }
              transition='transform 0.3s ease'
              _hover={{
                transform: 'scale(1.02)'
              }}
            >
              {(() => {
                const imageState = imageStates[idx] || {
                  isLoading: true,
                  hasError: false,
                  retryCount: 0,
                  currentSrc: getGoogleDriveDirectLink(plan)
                };

                return (
                  <>
                    {imageState.isLoading && !imageState.hasError && (
                      <Box
                        position='absolute'
                        top='50%'
                        left='50%'
                        transform='translate(-50%, -50%)'
                        zIndex={2}
                      >
                        <Spinner size='xl' color='gray.600' />
                      </Box>
                    )}

                    {imageState.hasError && (
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
                        Не удалось загрузить план
                        {imageState.retryCount > 0 && (
                          <Box mt={2} fontSize='xs' color='gray.400'>
                            Попыток: {imageState.retryCount}/{maxRetries}
                          </Box>
                        )}
                      </Box>
                    )}

                    {!imageState.hasError && imageState.currentSrc && (
                      <Image
                        src={imageState.currentSrc}
                        alt='Background'
                        fill
                        style={{
                          objectFit: 'contain',
                          objectPosition: 'center',
                          opacity: imageState.isLoading ? 0 : 1,
                          transition: 'opacity 0.3s ease-in-out'
                        }}
                        priority
                        sizes='(max-width: 450px) 400px, 1200px'
                        quality={100}
                        placeholder='blur'
                        blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                        onLoad={() => handleImageLoad(idx)}
                        onError={() =>
                          handleImageError(idx, getGoogleDriveDirectLink(plan))
                        }
                      />
                    )}

                    {imageState.hasError && (
                      <Box
                        position='absolute'
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg='gray.100'
                        zIndex={1}
                      />
                    )}
                  </>
                );
              })()}
            </AspectRatio>
          </Stack>
        ))}
      </Stack>

      <EditProjectButton onClick={onOpen} />

      {selectedImage && (
        <SliderModal
          isOpen={!!selectedImage}
          onClose={handleCloseImageModal}
          images={imageUrls}
          initialIndex={selectedImage.index}
          aspectRatio={4 / 5}
        />
      )}
      <EditProjectModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default ProjectLayouts;
