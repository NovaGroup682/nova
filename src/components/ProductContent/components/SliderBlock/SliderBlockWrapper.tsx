'use client';

import SliderBlock from './SliderBlock';

interface SliderBlockWrapperProps {
  sliders: string[];
}

const SliderBlockWrapper = ({ sliders }: SliderBlockWrapperProps) => (
  <SliderBlock sliders={sliders} />
);

export default SliderBlockWrapper;
