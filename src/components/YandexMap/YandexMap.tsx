'use client';

import { useEffect, useState } from 'react';
import {
  FullscreenControl,
  GeolocationControl,
  Map,
  Placemark,
  YMaps,
  ZoomControl
} from '@pbe/react-yandex-maps';

import { Box, Text } from '@chakra-ui/react';

interface YandexMapProps {
  address: string[];
  coordinates: number[];
  height?: string;
  width?: string;
}

const YandexMap = ({
  address,
  coordinates,
  height = '300px',
  width = '100%'
}: YandexMapProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (hasError) {
    return (
      <Box
        height={height}
        width={width}
        borderRadius='8px'
        overflow='hidden'
        boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
        display='flex'
        alignItems='center'
        justifyContent='center'
        bg='gray.100'
      >
        <Text color='gray.600' textAlign='center' px={4}>
          Карта временно недоступна
          <br />
          <Text as='span' fontSize='sm'>
            {address.join(', ')}
          </Text>
        </Text>
      </Box>
    );
  }

  return (
    <Box
      height={height}
      width={width}
      borderRadius='8px'
      overflow='hidden'
      boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
      position='relative'
    >
      <YMaps
        query={{
          apikey: undefined,
          load: 'package.full'
        }}
      >
        <Map
          defaultState={{
            center: coordinates,
            zoom: 15
          }}
          width='100%'
          height='100%'
          options={{
            suppressMapOpenBlock: true
          }}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        >
          <Placemark
            geometry={coordinates}
            properties={{
              balloonContent: address.join(', ')
            }}
            options={{
              preset: 'islands#redDotIcon'
            }}
          />
          <ZoomControl />
          <FullscreenControl />
          <GeolocationControl />
        </Map>
      </YMaps>
    </Box>
  );
};

export default YandexMap;
