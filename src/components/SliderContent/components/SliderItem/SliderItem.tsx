import { GOOGLE_LINK } from 'constant';
import Image from 'next/image';

import { AspectRatio } from '@chakra-ui/react';

interface SliderItemProps {
  src: string;
  onClick: () => void;
}

const SliderItem = ({ src, onClick }: SliderItemProps) => (
  <AspectRatio
    ratio={7 / 4}
    w='full'
    boxShadow='inset 0px -140px 40px -20px rgba(0, 0, 0, 0.42)'
    cursor='pointer'
    position='relative'
    onClick={onClick}
  >
    <Image
      src={GOOGLE_LINK + src}
      alt='Background'
      fill
      style={{
        objectFit: 'cover',
        objectPosition: 'center',
        zIndex: -1
      }}
      priority
      sizes='(max-width: 450px) 400px, 1200px'
      quality={75}
    />
  </AspectRatio>
);

export default SliderItem;
