'use client';

import AngleLeft from '@assets/icons/angle-left.svg';
import AngleRight from '@assets/icons/angle-right.svg';

import { Box, useBreakpointValue } from '@chakra-ui/react';

interface SliderNavigationProps {
  onNext: (e?: React.MouseEvent) => void;
  onPrev: (e?: React.MouseEvent) => void;
}

const SliderNavigation = ({ onNext, onPrev }: SliderNavigationProps) => {
  const isVisible = useBreakpointValue({ base: false, md: true });

  return isVisible ? (
    <>
      <Box
        position='absolute'
        left={0}
        top={0}
        bottom={0}
        opacity={0}
        w={{
          base: '100px',
          md: '220px'
        }}
        display={{
          base: 'none',
          md: 'flex'
        }}
        alignItems='center'
        justifyContent='flex-start'
        zIndex={20}
        pl={4}
        _hover={{
          opacity: 1,
          background: 'linear-gradient(to right, rgba(0,0,0,0.3), transparent)'
        }}
        transition='all 0.3s ease'
        cursor='pointer'
        onClick={(e) => {
          e.stopPropagation();
          onPrev(e);
        }}
      >
        <AngleLeft width={60} height={60} fill='white' />
      </Box>

      <Box
        position='absolute'
        right={0}
        top={0}
        bottom={0}
        w={{
          base: '100px',
          md: '220px'
        }}
        display='flex'
        alignItems='center'
        justifyContent='flex-end'
        pr={4}
        zIndex={20}
        opacity={0}
        _hover={{
          opacity: 1,
          background: 'linear-gradient(to left, rgba(0,0,0,0.3), transparent)'
        }}
        transition='all 0.3s ease'
        cursor='pointer'
        onClick={(e) => {
          e.stopPropagation();
          onNext(e);
        }}
      >
        <AngleRight fill='white' width={60} height={60} />
      </Box>
    </>
  ) : null;
};

export default SliderNavigation;
