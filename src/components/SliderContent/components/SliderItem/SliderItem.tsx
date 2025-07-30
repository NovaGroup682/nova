import { GOOGLE_LINK } from 'constant';
import Image from 'next/image';

import { Box } from '@chakra-ui/react';

interface SliderItemProps {
  src: string;
  // onClick: (num: number) => void;
}

const SliderItem = ({ src }: SliderItemProps) => (
  <Box
    h={{
      base: 300,
      md: 600,
      lg: 800
    }}
    w='full'
    boxShadow='inset 0px -140px 40px -20px rgba(0, 0, 0, 0.42)'
    // onClick={onClick}
    cursor='pointer'
    position='relative'
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
  </Box>
);

export default SliderItem;
