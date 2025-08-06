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
      isDark
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
      overscrollBehaviorX='none'
      borderRadius={0}
    >
      <Box
        position='relative'
        aspectRatio={12 / 15}
        h={{
          base: 'full',
          md: '95vh'
        }}
        transform={isZoomed ? 'scale(2)' : 'scale(1)'}
        transition='all 0.3s ease-in-out'
        display='flex'
        alignItems='center'
        justifyContent='center'
        cursor={isZoomed ? 'zoom-out' : 'zoom-in'}
        onClick={handleImageClick}
        transformOrigin={{
          base: 'left center',
          md: 'top center'
        }}
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
