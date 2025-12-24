'use client';

import { useCallback, useMemo } from 'react';
import { ValueChangeDetails } from '@zag-js/select';

import {
  createListCollection,
  Portal,
  Select as ChakraSelect
} from '@chakra-ui/react';

import { ProjectSize } from 'types';

interface ProjectsFilterProps {
  onSelect: (type: string | ProjectSize | undefined) => void;
  list: {
    label: string;
    value: string | ProjectSize;
  }[];
  value: ProjectSize | string;
}

const Select = ({ list, onSelect, value }: ProjectsFilterProps) => {
  const collection = useMemo(
    () => createListCollection({ items: list }),
    [list]
  );

  const onChange = useCallback(
    (a: ValueChangeDetails) => {
      const selectedValue = a.value[0];
      onSelect(selectedValue);
    },
    [onSelect]
  );

  return (
    <ChakraSelect.Root
      collection={collection}
      width='full'
      maxW={{
        base: 'auto',
        md: '320px'
      }}
      onValueChange={onChange}
      value={value ? [value] : []}
    >
      <ChakraSelect.HiddenSelect />
      <ChakraSelect.Label fontSize={16}>Площадь, м&#178;</ChakraSelect.Label>
      <ChakraSelect.Control>
        <ChakraSelect.Trigger>
          <ChakraSelect.ValueText placeholder='Площадь, м&#178;' />
        </ChakraSelect.Trigger>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.ClearTrigger />
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
        <ChakraSelect.IndicatorGroup>
          <ChakraSelect.Indicator />
        </ChakraSelect.IndicatorGroup>
      </ChakraSelect.Control>
      <Portal>
        <ChakraSelect.Positioner>
          <ChakraSelect.Content>
            {collection.items.map((item) => (
              <ChakraSelect.Item item={item} key={item.value}>
                {item.label} м&#178;
                <ChakraSelect.ItemIndicator />
              </ChakraSelect.Item>
            ))}
          </ChakraSelect.Content>
        </ChakraSelect.Positioner>
      </Portal>
    </ChakraSelect.Root>
  );
};

export default Select;
