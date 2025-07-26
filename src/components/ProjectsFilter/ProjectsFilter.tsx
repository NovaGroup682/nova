'use client';

import { useState } from 'react';
import { paths, PROJECT_SIZES } from 'constant';
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

import { ProjectSize } from 'types';

import { Select } from 'ui';

const ProjectsFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [area, setArea] = useState<ProjectSize | string>(
    searchParams.get('area') || ''
  );
  // const [floor, setFloor] = useState<ProjectSize | string>(1 | 2);

  const handleAreaSelect = (selectedArea: string | ProjectSize) => {
    setArea(selectedArea);

    const params = new URLSearchParams(searchParams);
    if (selectedArea) {
      params.set('area', selectedArea.toString());
    } else {
      params.delete('area');
    }

    router.push(`${paths.projects}?${params.toString()}`);
  };

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
      >
        <VStack alignItems='center' gap={1}>
          <Text fontSize={16}>Этажность</Text>
          <Flex gap={2}>
            <Button variant='outline'>1</Button>
            <Button variant='outline'>2</Button>
          </Flex>
        </VStack>

        <VStack alignItems='flex-start' gap={1}>
          <Text fontSize={16}>Цена, ₽</Text>
          <Group>
            <Input placeholder='3 250 000' />
            <Input placeholder='25 100 000' />
          </Group>
        </VStack>
      </HStack>
    </Flex>
  );
};

export default ProjectsFilter;
