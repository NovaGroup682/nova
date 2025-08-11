'use client';

import {
  FullscreenControl,
  GeolocationControl,
  Map,
  Placemark,
  YMaps,
  ZoomControl
} from '@pbe/react-yandex-maps';

import { Box } from '@chakra-ui/react';

import content from 'content';

interface YandexMapProps {
  address: string;
  height?: string;
  width?: string;
}

const YandexMap = ({
  address,
  height = '300px',
  width = '100%'
}: YandexMapProps) => (
  <Box
    height={height}
    width={width}
    borderRadius='8px'
    overflow='hidden'
    boxShadow='0 4px 6px rgba(0, 0, 0, 0.1)'
  >
    <YMaps>
      <Map
        defaultState={{
          center: content.contacts.coordinates,
          zoom: 15
        }}
        width='100%'
        height='100%'
        options={{
          suppressMapOpenBlock: true
        }}
      >
        <Placemark
          geometry={content.contacts.coordinates}
          properties={{
            balloonContent: address
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

export default YandexMap;
