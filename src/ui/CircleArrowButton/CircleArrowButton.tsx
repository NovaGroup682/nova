import Arrow from '@assets/icons/arrow-left.svg';

import { Box, BoxProps } from '@chakra-ui/react';

interface CircleArrowButtonProps extends BoxProps {
  onClick: () => void;
  isRight?: boolean;
}

const CircleArrowButton = ({
  onClick,
  isRight = false
}: CircleArrowButtonProps) => (
  <Box
    shadow='lg'
    onClick={onClick}
    position='absolute'
    left={{
      base: isRight ? 'none' : '-120px',
      lg: isRight ? 'none' : '-160px'
    }}
    right={{
      base: isRight ? '-120px' : 'none',
      lg: isRight ? '-160px' : 'none'
    }}
    cursor='pointer'
    top='50%'
    alignContent='center'
    transform={isRight ? 'rotate(180deg)' : 'none'}
    boxShadow='none'
  >
    <Box
      borderRadius='50%'
      bg='white'
      transition='all 0.3s ease'
      _hover={{
        bg: 'gray.600',
        '& svg': {
          fill: 'white'
        }
      }}
      p={3}
    >
      <Arrow
        fill='gray.500'
        width='50px'
        height='50px'
        style={{
          margin: '0 auto'
        }}
      />
    </Box>
  </Box>
);

export default CircleArrowButton;
