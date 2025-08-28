'use client';

import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';

import {
  AspectRatio,
  Flex,
  Stack,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';

import { getGoogleDriveDirectLink } from 'helpers';

import { EditProjectButton } from '../EditProjectButton';
import { EditProjectModal } from '../EditProjectModal';
import { ImageModal } from '../ImageModal';

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

  const imageUrls = useMemo(
    () => plans.map((plan) => getGoogleDriveDirectLink(plan)),
    [plans]
  );

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
              <Image
                src={getGoogleDriveDirectLink(plan)}
                alt='Background'
                fill
                style={{
                  objectFit: 'contain',
                  objectPosition: idx % 2 ? 'center' : 'center'
                }}
                priority
                sizes='(max-width: 450px) 400px, 1200px'
                quality={75}
              />
            </AspectRatio>
          </Stack>
        ))}
      </Stack>

      <EditProjectButton onClick={onOpen} />

      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={handleCloseImageModal}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
          images={imageUrls}
          initialIndex={selectedImage.index}
        />
      )}
      <EditProjectModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};

export default ProjectLayouts;
