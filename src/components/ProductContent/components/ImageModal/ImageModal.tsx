'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Box } from '@chakra-ui/react';

import { Modal } from 'ui';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  imageAlt: string;
}

const ImageModal = ({
  isOpen,
  onClose,
  imageSrc,
  imageAlt
}: ImageModalProps) => {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsZoomed(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxW='auto'
      bg='transparent'
      boxShadow='none'
      w={{
        base: '100vw',
        md: isZoomed ? 'full' : 'auto'
      }}
      h={{
        base: '100vh',
        md: isZoomed ? 'full' : 'auto'
      }}
      overflow='scroll'
      overflowY='scroll'
      borderRadius={0}
    >
      <Box
        position='relative'
        w={{
          base: 'full',
          md: isZoomed ? '700px' : '600px'
        }}
        h={{
          base: 'full',
          md: isZoomed ? '950px' : '750px'
        }}
        transform={isZoomed ? 'scale(1.5)' : 'scale(1)'}
        transition='all 0.3s ease-out'
        display='flex'
        alignItems='center'
        justifyContent='center'
        cursor={isZoomed ? 'zoom-out' : 'zoom-in'}
        onClick={handleImageClick}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{
            // paddingTop: isZoomed ? '150px' : 0,
            objectFit: 'contain',
            pointerEvents: 'none'
          }}
          priority
          sizes='90vw'
          quality={90}
        />
      </Box>
    </Modal>
  );
};

export default ImageModal;
