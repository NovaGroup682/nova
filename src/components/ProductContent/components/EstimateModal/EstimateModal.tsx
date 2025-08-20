'use client';

import { useState } from 'react';
import Image from 'next/image';

import { AspectRatio, Text } from '@chakra-ui/react';

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

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} minH={500}>
      <AspectRatio ratio={7 / 4} w='full'>
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
