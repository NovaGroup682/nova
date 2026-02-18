'use client';

import { useEffect, useState } from 'react';
import { PROJECT_ASPECT_RATIO } from 'constant';
import Image from 'next/image';

import { AspectRatio, Box, Spinner, Text } from '@chakra-ui/react';

import { getGoogleDriveDirectLink } from 'helpers';

import { ProjectItemType } from 'types';
import content from 'content';

import { Modal } from 'ui';
import { DownloadButton } from '../DownloadButton';

interface EstimateModalProps {
  project: ProjectItemType;
  isOpen: boolean;
  onClose: () => void;
}

const EstimateModal = ({ project, isOpen, onClose }: EstimateModalProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState('');
  const maxRetries = 3;
  const retryDelay = 2000;

  useEffect(() => {
    if (isOpen && project.sliders[0]) {
      const imageSrc = getGoogleDriveDirectLink(project.sliders[0]);
      setIsImageLoading(true);
      setHasError(false);
      setRetryCount(0);
      setCurrentSrc(imageSrc);
    }
  }, [isOpen, project.sliders]);

  const handleImageLoad = () => {
    setIsImageLoading(false);
    setHasError(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);

    if (retryCount < maxRetries) {
      const newRetryCount = retryCount + 1;
      setRetryCount(newRetryCount);

      setTimeout(() => {
        setIsImageLoading(true);
        const imageSrc = getGoogleDriveDirectLink(project.sliders[0]);
        const separator = imageSrc.includes('?') ? '&' : '?';
        setCurrentSrc(
          `${imageSrc}${separator}_retry=${newRetryCount}&_t=${Date.now()}`
        );
      }, retryDelay);
    } else {
      setHasError(true);
      console.warn(
        `Failed to load image after ${maxRetries} retries:`,
        project.sliders[0]
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} minH={500}>
      <AspectRatio ratio={PROJECT_ASPECT_RATIO} w='full' position='relative'>
        <>
          {isImageLoading && !hasError && (
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

          {isImageLoading && (
            <Box
              position='absolute'
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg='gray.100'
              zIndex={0}
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
              {retryCount > 0 && (
                <Box mt={2} fontSize='xs' color='gray.400'>
                  Попыток: {retryCount}/{maxRetries}
                </Box>
              )}
            </Box>
          )}

          {!hasError && currentSrc && (
            <Image
              sizes='(max-width: 450px) 270px, (max-width: 900px) 500px, 700px'
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                filter: isImageLoading ? 'blur(10px)' : 'none',
                transition: 'filter 0.3s ease-in-out, opacity 0.3s ease-in-out',
                opacity: isImageLoading ? 0 : 1
              }}
              fill
              src={currentSrc}
              alt='contact cover'
              onLoad={handleImageLoad}
              onError={handleImageError}
              placeholder='blur'
              blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
            />
          )}

          {hasError && (
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
      </AspectRatio>

      <Text
        textAlign='center'
        fontSize={{
          base: 16,
          md: 20
        }}
        px={4}
      >
        {content.projectDetails.estimateModal.text}
      </Text>

      <DownloadButton
        fileId={project?.estimateFileLink ?? ''}
        fileName='project-documentation.pdf'
      />
    </Modal>
  );
};

export default EstimateModal;
