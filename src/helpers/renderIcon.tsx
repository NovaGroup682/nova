import Square1 from '@assets/icons/square-1.svg';
import Square2 from '@assets/icons/square-2.svg';
import Square3 from '@assets/icons/square-3.svg';
import Square4 from '@assets/icons/square-4.svg';

const renderIcon = (num: number) => {
  const Icon = [Square1, Square2, Square3, Square4][num];

  return <Icon fill='white' />;
};

export default renderIcon;
