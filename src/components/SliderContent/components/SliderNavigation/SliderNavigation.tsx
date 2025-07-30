import { Flex, IconButton } from '@chakra-ui/react';

import { renderIcon } from 'helpers';

interface SliderNavigationProps {
  list: string[];
  currentSlide: number;
  onClick: (num: number) => void;
}

const SliderNavigation = ({
  list,
  currentSlide,
  onClick
}: SliderNavigationProps) => (
  <Flex
    position='absolute'
    w='full'
    zIndex={10}
    justifyContent='center'
    top={{
      base: '16px',
      md: '32px'
    }}
  >
    <Flex
      position='absolute'
      borderRadius='xl'
      bg='gray.500'
      gap={4}
      px={4}
      py={0}
    >
      {list.map((item, idx) => (
        <IconButton
          key={`slider-btn-${item}`}
          position='relative'
          onClick={() => onClick(idx)}
          minW='auto'
          aria-label='Search database'
          variant='outline'
          size='lg'
          border='none'
          transform={currentSlide === idx ? 'scale(1.5)' : 'inherit'}
          transition='transform 0.3s ease'
          _hover={{
            bg: 'none',
            '& svg, & p': {
              opacity: 0.5
            }
          }}
          _focus={{
            outlineWidth: 0
          }}
        >
          {renderIcon(idx)}
        </IconButton>
      ))}
    </Flex>
  </Flex>
);

export default SliderNavigation;
