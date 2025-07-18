'use client';

import config from 'config';

import { Text, TextProps } from '@chakra-ui/react';

const { copyrightLabel } = config;

const CopyrightText = ({ ...props }: TextProps) => (
  <Text
    {...props}
    userSelect='none'
  >{`© ${new Date().getFullYear()} ${copyrightLabel}`}</Text>
);

export default CopyrightText;
