import Arrow from '@assets/icons/arrow-left.svg';
import colors from 'constant/colors';

import { Flex } from '@chakra-ui/react';

interface EditProjectButtonProps {
  onClick?: () => void;
}

const EditProjectButton = ({ onClick }: EditProjectButtonProps) => (
  <Flex
    fontSize={16}
    alignItems='center'
    color='gray.500'
    gap={2}
    cursor='pointer'
    onClick={onClick}
    _hover={{
      color: 'gray.600'
    }}
    transition='color 0.2s ease-in-out'
  >
    <Arrow
      fill={colors.gray[500].value}
      width={20}
      height={20}
      className='bouncingArrow'
      style={{
        transform: 'rotate(180deg)'
      }}
    />
    Внести изменения в проект
  </Flex>
);

export default EditProjectButton;
