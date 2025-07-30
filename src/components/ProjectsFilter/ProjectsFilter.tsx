'use client';

import { useCallback, useEffect, useState } from 'react';
import Xmark from '@assets/icons/circle-xmark.svg';
import { paths, PROJECT_FLOORS, PROJECT_SIZES } from 'constant';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Button,
  Flex,
  Group,
  HStack,
  Input,
  Text,
  VStack
} from '@chakra-ui/react';

import {
  formatNumberWithSpaces,
  isMaxPriceValid,
  isMinPriceValid,
  isPriceValid,
  parseFormattedNumber
} from 'helpers';

import { ProjectSearchKeys, ProjectSize } from 'types';

import { Select } from 'ui';

const ProjectsFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [area, setArea] = useState<ProjectSize | string>(
    searchParams.get(ProjectSearchKeys.area) || ''
  );
  const [floors, setFloors] = useState<number[]>(() => {
    const floorsParam = searchParams.get(ProjectSearchKeys.floors);
    return floorsParam ? floorsParam.split(',').map(Number) : [];
  });
  const [minPrice, setMinPrice] = useState<string>(
    searchParams.get(ProjectSearchKeys.minPrice) || ''
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    searchParams.get(ProjectSearchKeys.maxPrice) || ''
  );

  const updateUrlWithDebounce = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const timeoutId = setTimeout(() => {
        const params = new URLSearchParams(searchParams);
        updater(params);
        router.push(`${paths.projects}?${params.toString()}`);
      }, 500); // 500ms delay

      return () => clearTimeout(timeoutId);
    },
    [searchParams, router]
  );

  const handleAreaSelect = (selectedArea: string | ProjectSize) => {
    setArea(selectedArea);

    const params = new URLSearchParams(searchParams);
    if (selectedArea) {
      params.set(ProjectSearchKeys.area, selectedArea.toString());
    } else {
      params.delete(ProjectSearchKeys.area);
    }

    router.push(`${paths.projects}?${params.toString()}`);
  };

  const selectFlorFilter = (floor: number) => () => {
    const isExist = floors.includes(floor);

    let newFloors: number[];
    if (isExist) {
      // If clicking the same floor, clear the selection
      newFloors = [];
    } else {
      // If clicking a different floor, select only that floor
      newFloors = [floor];
    }

    setFloors(newFloors);

    const params = new URLSearchParams(searchParams);
    if (newFloors.length > 0) {
      params.set(ProjectSearchKeys.floors, newFloors.join(','));
    } else {
      params.delete(ProjectSearchKeys.floors);
    }

    router.push(`${paths.projects}?${params.toString()}`);
  };

  const handleMinPriceChange = (value: string) => {
    // Only allow digits and spaces
    const cleanedValue = value.replace(/[^\d\s]/g, '');
    const formattedValue = formatNumberWithSpaces(cleanedValue);
    setMinPrice(formattedValue);
  };

  const handleMaxPriceChange = (value: string) => {
    // Only allow digits and spaces
    const cleanedValue = value.replace(/[^\d\s]/g, '');
    const formattedValue = formatNumberWithSpaces(cleanedValue);
    setMaxPrice(formattedValue);
  };

  const handleResetFilters = () => {
    setArea('');
    setFloors([]);
    setMinPrice('');
    setMaxPrice('');

    const params = new URLSearchParams(searchParams);
    params.delete(ProjectSearchKeys.area);
    params.delete(ProjectSearchKeys.floors);
    params.delete(ProjectSearchKeys.minPrice);
    params.delete(ProjectSearchKeys.maxPrice);

    router.push(`${paths.projects}?${params.toString()}`);
  };

  useEffect(() => {
    const cleanup = updateUrlWithDebounce((params) => {
      if (minPrice) {
        // Always set minPrice if it has a value, regardless of validation
        params.set(ProjectSearchKeys.minPrice, parseFormattedNumber(minPrice));
      } else {
        params.delete(ProjectSearchKeys.minPrice);
      }
    });
    return cleanup;
  }, [minPrice, updateUrlWithDebounce]);

  useEffect(() => {
    const cleanup = updateUrlWithDebounce((params) => {
      if (maxPrice) {
        params.set(ProjectSearchKeys.maxPrice, parseFormattedNumber(maxPrice));
      } else {
        params.delete(ProjectSearchKeys.maxPrice);
      }
    });
    return cleanup;
  }, [maxPrice, updateUrlWithDebounce]);

  const isMinPriceInvalid =
    (minPrice && maxPrice && !isPriceValid(minPrice, maxPrice)) ||
    (minPrice && !isMinPriceValid(minPrice));

  const isMaxPriceInvalid =
    (minPrice && maxPrice && !isPriceValid(minPrice, maxPrice)) ||
    (maxPrice && !isMaxPriceValid(maxPrice));

  return (
    <Flex
      justifyContent='center'
      gap={{
        base: 4,
        md: 10
      }}
      w='full'
      alignItems='flex-end'
      flexDirection={{
        base: 'column',
        md: 'row'
      }}
    >
      <Select list={PROJECT_SIZES} onSelect={handleAreaSelect} value={area} />
      <HStack
        w='full'
        justifyContent={{
          base: 'space-around',
          md: 'flex-start'
        }}
        gap={{
          base: 4,
          md: 10
        }}
        alignItems='flex-end'
      >
        <VStack alignItems='center' gap={1}>
          <Text fontSize={16}>Этажность</Text>
          <Flex gap={2}>
            {PROJECT_FLOORS.map((floor) => (
              <Button
                key={`floor-${floor}`}
                variant={floors.includes(floor) ? 'solid' : 'outline'}
                onClick={selectFlorFilter(floor)}
              >
                {floor}
              </Button>
            ))}
          </Flex>
        </VStack>

        <VStack alignItems='flex-start' gap={1}>
          <Text fontSize={16}>Цена, ₽</Text>
          <Group>
            <Input
              placeholder='1 000 000'
              value={minPrice}
              onChange={(e) => handleMinPriceChange(e.target.value)}
              borderColor={isMinPriceInvalid ? 'red.500' : undefined}
              _focus={{
                borderColor: isMinPriceInvalid ? 'red.500' : undefined,
                boxShadow: isMinPriceInvalid ? '0 0 0 1px red.500' : undefined
              }}
            />
            <Input
              placeholder='25 100 000'
              value={maxPrice}
              onChange={(e) => handleMaxPriceChange(e.target.value)}
              borderColor={isMaxPriceInvalid ? 'red.500' : undefined}
              _focus={{
                borderColor: isMaxPriceInvalid ? 'red.500' : undefined,
                boxShadow: isMaxPriceInvalid ? '0 0 0 1px red.500' : undefined
              }}
            />
          </Group>
        </VStack>
      </HStack>
      {(floors.length || area || minPrice || maxPrice) && (
        <Button variant='ghost' onClick={handleResetFilters}>
          <Text fontSize={16}>Сбросить</Text>
          <Xmark width='30px' height='30px' />
        </Button>
      )}
    </Flex>
  );
};

export default ProjectsFilter;
