'use client';

import React from 'react';
import { paths } from 'constant';

import { Box, Link, Text, type TextProps } from '@chakra-ui/react';

import content from 'content';

interface PrivacyPolicyCheckboxProps
  extends Pick<TextProps, 'fontSize' | 'color'> {
  value: boolean;
  onChange: (checked: boolean) => void;
  linkColor?: string;
  linkHoverColor?: string;
}

const PrivacyPolicyCheckbox = ({
  value,
  onChange,
  color = 'gray.700',
  fontSize = 14,
  linkColor = 'blue.600',
  linkHoverColor = 'blue.700'
}: PrivacyPolicyCheckboxProps) => (
  <Box display='flex' alignItems='center' gap={2}>
    <input
      type='checkbox'
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
      style={{ marginTop: '2px' }}
    />
    <Text fontSize={fontSize} color={color}>
      Нажимая кнопку {content.main.contactBlock.send}, я соглашаюсь с{' '}
      <Link
        transition='color 0.3s ease'
        href={paths.policy}
        color={linkColor}
        textDecoration='underline'
        _hover={{ color: linkHoverColor }}
        target='_blank'
        rel='noopener noreferrer'
      >
        политикой конфиденциальности
      </Link>
    </Text>
  </Box>
);

export default PrivacyPolicyCheckbox;
