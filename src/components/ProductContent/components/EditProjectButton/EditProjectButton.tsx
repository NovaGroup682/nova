import { Button } from '@chakra-ui/react';

interface EditProjectButtonProps {
  onClick?: () => void;
}

const EditProjectButton = ({ onClick }: EditProjectButtonProps) => (
  <Button
    onClick={onClick}
    size='2xl'
    className='pulse-animation'
    color='gray.500'
    borderColor='gray.500'
    _hover={{
      bg: 'gray.600'
    }}
    transition='all 0.3s ease'
    mr={2}
    bg='transparent'
  >
    Внести изменения в проект
  </Button>
);

export default EditProjectButton;
