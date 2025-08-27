'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import SearchIcon from '@assets/icons/magnifying-glass.svg';
import { useRouter, useSearchParams } from 'next/navigation';

import { Center, HStack, Input } from '@chakra-ui/react';

import { hasValueChanged } from 'helpers';

import { ProjectSearchKeys } from 'types';

const SearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentProjectName = useMemo(
    () => searchParams.get(ProjectSearchKeys.projectName) || '',
    [searchParams]
  );

  const [searchValue, setSearchValue] = useState(currentProjectName);

  useEffect(() => {
    setSearchValue(currentProjectName);
  }, [currentProjectName]);

  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const updateUrlWithDebounce = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams);
        const currentValue =
          searchParams.get(ProjectSearchKeys.projectName) || '';
        const newValue = value.trim();

        if (!hasValueChanged(currentValue, newValue)) {
          return;
        }

        if (newValue) {
          params.set(ProjectSearchKeys.projectName, newValue);
        } else {
          params.delete(ProjectSearchKeys.projectName);
        }

        router.push(`?${params.toString()}`, { scroll: false });
      }, 500);
    },
    [searchParams, router]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      updateUrlWithDebounce(value);
    },
    [updateUrlWithDebounce]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        setSearchValue('');
        updateUrlWithDebounce('');
      }
    },
    [updateUrlWithDebounce]
  );

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

  return (
    <HStack
      gap={0}
      align='center'
      position='relative'
      w={{ base: 'full', md: 'auto' }}
    >
      <Center
        aria-label='Search'
        width='25px'
        height='25px'
        position='absolute'
        right={0}
        zIndex={2}
        transition='all 0.3s ease-in-out'
        bg='transparent'
        _active={{ bg: 'transparent' }}
        display='flex'
        minW='auto'
        mr={3}
      >
        <SearchIcon fill='gray.400' />
      </Center>

      <Input
        ref={inputRef}
        placeholder='Поиск по номеру проекта'
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        border='1px solid'
        _focus={{
          borderColor: 'gray.500',
          boxShadow: '0 0 0 1px blue.500'
        }}
        _hover={{
          borderColor: 'gray.400'
        }}
        transition='all 0.3s ease-in-out'
        width={{
          base: 'full',
          md: '270px'
        }}
        transform='translateX(0)'
        overflow='hidden'
        pl='8px'
        pr='40px'
      />
    </HStack>
  );
};

export default SearchInput;
