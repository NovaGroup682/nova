import LogoIcon from '@assets/logo.svg';
import { paths } from 'constant';
import Link from 'next/link';

import { Box } from '@chakra-ui/react';

const Logo = () => (
  <Link href={paths.main} style={{ alignContent: 'center' }}>
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
