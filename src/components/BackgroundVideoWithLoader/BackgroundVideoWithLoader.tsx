'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { Box, BoxProps, Spinner } from '@chakra-ui/react';

interface BackgroundVideoWithLoaderProps extends BoxProps {
  videoSrc: string;
  posterSrc?: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  blurDataURL?: string;
}

const BackgroundVideoWithLoader = ({
  videoSrc,
  posterSrc,
  alt,
  sizes = '100vw',
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
  blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
  ...boxProps
}: BackgroundVideoWithLoaderProps) => {
  const [isImageLoading, setIsImageLoading] = useState(!!posterSrc);
  const [hasImageError, setHasImageError] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
    setShowVideo(true);
    setVideoProgress(100);
  };

  const handleVideoError = () => {
    setVideoLoaded(false);
    setShowVideo(false);
    setVideoProgress(0);
  };

  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
    setShowVideo(true);
    setVideoProgress(100);
  };

  const handleVideoProgress = () => {
    const video = videoRef.current;

    if (video) {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          const progress = (bufferedEnd / duration) * 100;
          setVideoProgress(Math.min(progress, 100));
        }
      } else if (video.readyState >= 1) {
        setVideoProgress(10);
      }
    }
  };

  const handleVideoLoadStart = () => {
    setVideoProgress(5);
  };

  const handleVideoLoadedMetadata = () => {
    setVideoProgress(20);
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
    setHasImageError(true);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video && showVideo) {
      video.play().catch((error) => {
        console.warn('Автовоспроизведение видео заблокировано:', error);
      });
    }
  }, [showVideo]);

  return (
    <Box bg='gray.100' overflow='hidden' position='relative' {...boxProps}>
      {isImageLoading && !hasImageError && !videoLoaded && (
        <Box
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          zIndex={10}
          textAlign='center'
          color='white'
        >
          <Spinner size='xl' mb={2} />
        </Box>
      )}

      {hasImageError && !videoLoaded && (
        <Box
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          zIndex={10}
          color='gray.500'
          fontSize='sm'
          textAlign='center'
        >
          Ошибка загрузки изображения
          <br />
          {posterSrc}
        </Box>
      )}

      {posterSrc && (
        <Image
          src={posterSrc}
          alt={alt}
          fill
          style={{
            objectFit,
            objectPosition,
            opacity: isImageLoading ? 0.75 : 1,
            filter: 'blur(1px)',
            transition: 'opacity 0.5s ease-in-out, filter 0.5s ease-in-out'
          }}
          priority={priority}
          sizes={sizes}
          placeholder='blur'
          blurDataURL={blurDataURL}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}

      {videoSrc && !videoLoaded && (
        <Box
          position='absolute'
          bottom={0}
          left={0}
          width='100%'
          height='14px'
          bg='rgba(255, 255, 255, 0.3)'
          zIndex={2}
        >
          <Box
            height='100%'
            width={`${videoProgress}%`}
            bg='white'
            opacity={0.1}
            transition='width 0.3s ease-in-out'
          />
        </Box>
      )}

      {videoSrc && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload='auto'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit,
            objectPosition,
            opacity: showVideo ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out'
          }}
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          onLoadStart={handleVideoLoadStart}
          onLoadedMetadata={handleVideoLoadedMetadata}
          onProgress={handleVideoProgress}
        />
      )}

      <Box
        position='absolute'
        top={0}
        left={0}
        width='100%'
        height='100%'
        bg='black'
        opacity={0.5}
      />
    </Box>
  );
};

export default BackgroundVideoWithLoader;
