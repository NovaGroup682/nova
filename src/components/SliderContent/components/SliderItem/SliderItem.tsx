import Image from 'next/image';

import { AspectRatio } from '@chakra-ui/react';

import { getGoogleDriveDirectLink } from 'helpers';

interface SliderItemProps {
  src: string;
  onClick?: () => void;
}

const SliderItem = ({ src, onClick }: SliderItemProps) => (
  <AspectRatio
    ratio={7 / 4}
    w='full'
    boxShadow={{
      base: 'inset 0px -90px 40px -20px rgba(0, 0, 0, 0.42)',
      md: 'inset 0px -140px 40px -20px rgba(0, 0, 0, 0.42)'
    }}
    cursor='pointer'
    position='relative'
    onClick={onClick}
  >
    <Image
      src={getGoogleDriveDirectLink(src)}
      alt='Background'
      fill
      style={{
        objectFit: 'cover',
        objectPosition: 'center',
        zIndex: -1
      }}
      priority
      sizes='(max-width: 450px) 400px, (max-width: 900px) 900px, 1200px'
      quality={75}
    />
  </AspectRatio>
);

export default SliderItem;
