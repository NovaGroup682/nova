'use client';

import { paths } from 'constant';

import { Flex, Link, Text } from '@chakra-ui/react';

const Breadcrump = ({ name }: { name: string }) => (
  <Flex justifyContent='flex-start' gap={2} w='full'>
    <Link
      href={paths.projects}
      style={{
        // textTransform: 'uppercase',
        cursor: 'pointer',
        color: 'inherit',
        textDecoration: 'none',
        transition: 'color 0.2s ease'
      }}
      onFocus={(e) => {
        e.target.style.outline = 'none';
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#4A5568';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = 'inherit';
      }}
    >
      Проекты и Цены
    </Link>
    <Text>/</Text>
    <Text color='gray.600' cursor='default'>
      {name}
    </Text>
  </Flex>
);

export default Breadcrump;
