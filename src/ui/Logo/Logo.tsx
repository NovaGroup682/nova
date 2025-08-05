import LogoIcon from '@assets/logo.svg';
import { paths } from 'constant';
import Link from 'next/link';

import { Box } from '@chakra-ui/react';

const Logo = () => (
  <Link
    href={paths.main}
    style={{
      alignContent: 'center',
      outline: 'none',
      cursor: 'pointer'
    }}
    onFocus={(e) => {
      e.target.style.outline = 'none';
      e.target.style.outlineOffset = '0';
    }}
    onBlur={(e) => {
      e.target.style.outline = 'none';
    }}
    onMouseEnter={(e) => {
      const svg = e.currentTarget.querySelector('svg');
      if (svg) {
        svg.style.transition = 'fill 0.4s ease-in-out';
        svg.style.fill = '#A0AEC0';
      }
    }}
    onMouseLeave={(e) => {
      const svg = e.currentTarget.querySelector('svg');
      if (svg) {
        svg.style.transition = 'fill 0.4s ease-in-out';
        svg.style.fill = 'white';
      }
    }}
  >
    <Box
      width={{ base: '159px', lg: '209px' }}
      height={{ base: '56px', lg: '66px' }}
      position='relative'
    >
      <LogoIcon fill='white' />
    </Box>
  </Link>
);

export default Logo;
