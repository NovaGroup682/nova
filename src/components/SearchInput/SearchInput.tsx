'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import SearchIcon from '@assets/icons/magnifying-glass.svg';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Center,
  Flex,
  HStack,
  IconButton,
  Input,
  useBreakpointValue
} from '@chakra-ui/react';

import { ProjectSearchKeys } from 'types';

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchInput = ({
  placeholder = 'Поиск по имени',
  onSearch
}: SearchInputProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchValue, setSearchValue] = useState(
    searchParams.get(ProjectSearchKeys.projectName) || ''
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const updateUrlWithDebounce = useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const timeoutId = setTimeout(() => {
        const params = new URLSearchParams(searchParams);
        updater(params);
        router.push(`?${params.toString()}`);
      }, 500);

      return () => clearTimeout(timeoutId);
    },
    [searchParams, router]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSearchValue('');
      onSearch?.('');
    }
  };

  // Debounced effect for searchValue
  useEffect(() => {
    const cleanup = updateUrlWithDebounce((params) => {
      if (searchValue) {
        params.set(ProjectSearchKeys.projectName, searchValue);
      } else {
        params.delete(ProjectSearchKeys.projectName);
      }
    });
    return cleanup;
  }, [searchValue, updateUrlWithDebounce]);

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
        <SearchIcon />
      </Center>

      <Input
        ref={inputRef}
        placeholder={placeholder}
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
