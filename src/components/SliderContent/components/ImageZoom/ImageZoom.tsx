'use client';

import { useCallback, useEffect, useState } from 'react';
import CloseIcon from '@assets/icons/circle-xmark.svg';
import Image from 'next/image';

import { Box, IconButton } from '@chakra-ui/react';

import { getSafeImageUrl } from 'helpers';

interface ImageZoomProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  alt: string;
  isMobile: boolean;
}

const ImageZoom = ({
  isOpen,
  onClose,
  imageSrc,
  alt,
  isMobile
}: ImageZoomProps) => {
  const [zoomLevel, setZoomLevel] = useState(isMobile ? 3 : 2);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setZoomLevel(isMobile ? 3 : 2);
      setPanX(0);
      setPanY(0);
      setHasDragged(false);
    }
  }, [isOpen, isMobile]);

  const handleZoomClose = useCallback(() => {
    onClose();
    setPanX(0);
    setPanY(0);
    setHasDragged(false);
  }, [onClose]);

  const handleZoomToggle = useCallback(() => {
    handleZoomClose();
  }, [handleZoomClose]);

  const handleImageClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!hasDragged) {
        handleZoomClose();
      }
    },
    [handleZoomClose, hasDragged]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true);
      setHasDragged(false);
      setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
    },
    [panX, panY]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isDragging) {
        setHasDragged(true);

        const newPanX = e.clientX - dragStart.x;
        const newPanY = e.clientY - dragStart.y;

        if (isMobile) {
          const maxPanX = window.innerWidth * (zoomLevel - 1);
          const maxPanY = window.innerHeight * (zoomLevel - 1);

          setPanX(Math.max(-maxPanX, Math.min(maxPanX, newPanX)));
          setPanY(Math.max(-maxPanY, Math.min(maxPanY, newPanY)));
        } else {
          const maxPanX = ((zoomLevel - 1) * window.innerWidth) / 2;
          const maxPanY = ((zoomLevel - 1) * window.innerHeight) / 2;

          setPanX(Math.max(-maxPanX, Math.min(maxPanX, newPanX)));
          setPanY(Math.max(-maxPanY, Math.min(maxPanY, newPanY)));
        }
      }
    },
    [isDragging, dragStart, zoomLevel, isMobile]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 1) {
        setIsDragging(true);
        setHasDragged(false);
        setDragStart({
          x: e.touches[0].clientX - panX,
          y: e.touches[0].clientY - panY
        });
      }
    },
    [panX, panY]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        e.preventDefault();
        setHasDragged(true);

        const newPanX = e.touches[0].clientX - dragStart.x;
        const newPanY = e.touches[0].clientY - dragStart.y;

        if (isMobile) {
          const maxPanX = window.innerWidth * (zoomLevel - 1);
          const maxPanY = window.innerHeight * (zoomLevel - 1);

          setPanX(Math.max(-maxPanX, Math.min(maxPanX, newPanX)));
          setPanY(Math.max(-maxPanY, Math.min(maxPanY, newPanY)));
        } else {
          const maxPanX = ((zoomLevel - 1) * window.innerWidth) / 2;
          const maxPanY = ((zoomLevel - 1) * window.innerHeight) / 2;

          setPanX(Math.max(-maxPanX, Math.min(maxPanX, newPanX)));
          setPanY(Math.max(-maxPanY, Math.min(maxPanY, newPanY)));
        }
      }
    },
    [isDragging, dragStart, zoomLevel, isMobile]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        handleZoomClose();
      }
    };

    const handleWheelEvent = (e: WheelEvent) => {
      if (isOpen) {
        e.preventDefault();
        e.stopPropagation();
        handleZoomToggle();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    if (isOpen) {
      document.addEventListener('wheel', handleWheelEvent, { passive: false });
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', handleWheelEvent);
    };
  }, [isOpen, handleZoomClose, handleZoomToggle]);

  const getImageSrc = (src: string) => {
    try {
      return getSafeImageUrl(src);
    } catch (error) {
      console.error('Error processing image URL:', error);
      return src;
    }
  };

  if (!isOpen) return null;

  return (
    <Box
      position='fixed'
      top={0}
      left={0}
      right={0}
      bottom={0}
      bg='rgba(0, 0, 0, 0.95)'
      zIndex={10000}
      display='flex'
      alignItems='center'
      justifyContent='center'
      onClick={handleZoomClose}
      cursor='zoom-out'
      w='100vw'
      h='100vh'
      overflow='hidden'
    >
      <IconButton
        aria-label='Close zoom'
        position='fixed'
        right='40px'
        top='40px'
        bg='white'
        color='gray.400'
        _hover={{ bg: 'rgba(255, 255, 255, 0.9)' }}
        onClick={handleZoomClose}
        zIndex={10001}
      >
        <CloseIcon fill='currentColor' />
      </IconButton>

      <Box
        position='relative'
        w='100vw'
        h='100vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
        onClick={(e) => e.stopPropagation()}
        cursor={isDragging ? 'grabbing' : 'grab'}
        onWheel={handleZoomToggle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Box
          position='relative'
          w='100%'
          h='100%'
          display='flex'
          alignItems='center'
          justifyContent='center'
          transform={`scale(${zoomLevel}) translate(${panX / zoomLevel}px, ${panY / zoomLevel}px)`}
          transition={isDragging ? 'none' : 'transform 0.1s ease-out'}
          transformOrigin='center center'
          style={
            {
              '--image-height': isMobile && zoomLevel > 1 ? '100vh' : 'auto',
              '--object-fit': 'contain'
            } as React.CSSProperties
          }
        >
          <Image
            src={getImageSrc(imageSrc)}
            alt={alt}
            fill
            style={{
              objectFit: 'contain',
              objectPosition: 'center',
              userSelect: 'none',
              pointerEvents: 'auto',
              cursor: 'pointer'
            }}
            draggable={false}
            onClick={handleImageClick}
            sizes='100vw'
            priority
          />
        </Box>

        <Box
          position='absolute'
          top={4}
          left={4}
          bg='rgba(0, 0, 0, 0.7)'
          color='white'
          px={3}
          py={1}
          borderRadius='md'
          fontSize='sm'
          fontWeight='medium'
          zIndex={1}
        >
          {Math.round(zoomLevel * 100)}%
        </Box>
      </Box>
    </Box>
  );
};

export default ImageZoom;
