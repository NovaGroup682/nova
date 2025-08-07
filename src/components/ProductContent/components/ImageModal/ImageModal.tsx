'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Box, Spinner } from '@chakra-ui/react';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsZoomed(false);
      setIsLoading(true);
      document.body.style.overflow = 'hidden';

      // Reset scroll position when modal opens
      setTimeout(() => {
        const modalElement = document.querySelector('[data-modal-content]');
        if (modalElement) {
          modalElement.scrollTo(0, 0);
        }
        // Force scroll reset for mobile browsers
        window.scrollTo(0, 0);
      }, 100);
    } else {
      document.body.style.overflow = 'unset';
      // Reset scroll when modal closes
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
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

  // Handle scroll reset when zoom state changes
  useEffect(() => {
    if (!isZoomed) {
      // Reset scroll when zooming out
      const timer = setTimeout(() => {
        const modalElement = document.querySelector('[data-modal-content]');
        if (modalElement) {
          modalElement.scrollTo(0, 0);
        }
        // Force scroll reset for mobile browsers
        window.scrollTo(0, 0);
        document.body.scrollTo(0, 0);
      }, 350); // Wait for transition to complete

      return () => clearTimeout(timer);
    }
  }, [isZoomed]);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent default touch behavior that might interfere with zoom
    e.preventDefault();
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
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
      aspectRatio={12 / 15}
      h={{
        base: isZoomed ? 'full' : 'auto',
        md: '95vh'
      }}
      w={{
        base: '100vw',
        md: isZoomed ? 'full' : 'auto'
      }}
      overflow='scroll'
      overscrollBehaviorX='none'
      overscrollBehaviorY='none'
      borderRadius={0}
      className='image-modal-container'
    >
      <Box
        position='relative'
        aspectRatio={12 / 15}
        h={{
          base: 'auto',
          md: '95vh'
        }}
        w={{
          base: '100vw',
          md: 'auto'
        }}
        transform={isZoomed ? 'scale(2)' : 'scale(1)'}
        transition='all 0.3s ease-in-out'
        display='flex'
        alignItems='center'
        justifyContent='center'
        cursor={isZoomed ? 'zoom-out' : 'zoom-in'}
        onClick={handleImageClick}
        onTouchStart={handleTouchStart}
        transformOrigin={{
          base: 'left center',
          md: 'top center'
        }}
      >
        {isLoading && (
          <Box
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
            zIndex={1}
          >
            <Spinner color='white' size='xl' />
          </Box>
        )}

        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          style={{
            objectFit: 'contain',
            objectPosition: 'center',
            pointerEvents: 'none',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
          priority
          sizes='90vw'
          quality={90}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </Box>
    </Modal>
  );
};

export default ImageModal;
