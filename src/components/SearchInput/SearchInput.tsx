'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import SearchIcon from '@assets/icons/magnifying-glass.svg';
import { useRouter, useSearchParams } from 'next/navigation';

import {
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
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState(
    searchParams.get(ProjectSearchKeys.projectName) || ''
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const isMobile = useBreakpointValue({ base: true, md: false });
  const shouldAlwaysBeOpen = isMobile;

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

  const handleIconClick = () => {
    if (!shouldAlwaysBeOpen) {
      setIsExpanded(true);
    }
  };

  const handleInputBlur = () => {
    if (!shouldAlwaysBeOpen && !searchValue.trim()) {
      setIsExpanded(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch?.(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!shouldAlwaysBeOpen && e.key === 'Escape') {
      setSearchValue('');
      setIsExpanded(false);
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

  useEffect(() => {
    if (shouldAlwaysBeOpen) {
      setIsExpanded(true);
    }
  }, [shouldAlwaysBeOpen]);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <HStack
      gap={0}
      align='center'
      position='relative'
      w={{ base: 'full', md: 'auto' }}
    >
      <IconButton
        aria-label='Search'
        variant='ghost'
        size='2xl'
        onClick={handleIconClick}
        position='absolute'
        right={0}
        zIndex={2}
        _hover={{ bg: 'transparent' }}
        transition='all 0.3s ease-in-out'
        bg='transparent'
        _active={{ bg: 'transparent' }}
        display={shouldAlwaysBeOpen ? 'none' : 'flex'}
        minW='auto'
        pr={2}
      >
        <SearchIcon />
      </IconButton>
      <Input
        ref={inputRef}
        placeholder={placeholder}
        value={searchValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
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
          md: isExpanded ? '270px' : '0px'
        }}
        opacity={isExpanded ? 1 : 0}
        transform={isExpanded ? 'translateX(0)' : 'translateX(100%)'}
        overflow='hidden'
        pl='8px'
        pr={isExpanded ? '0px' : '0px'}
      />
    </HStack>
  );
};

export default SearchInput;
