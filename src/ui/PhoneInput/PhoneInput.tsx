'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';

import { Input, InputProps } from '@chakra-ui/react';

interface PhoneInputProps extends Omit<InputProps, 'onChange'> {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ onChange, value, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState('+7');
    const inputRef = useRef<HTMLInputElement>(null);

    const formatPhoneNumber = (input: string): string => {
      const numbers = input.replace(/\D/g, '');

      let cleanNumbers = numbers;
      if (numbers.startsWith('8')) {
        cleanNumbers = '7' + numbers.slice(1);
      }

      if (cleanNumbers.length > 0 && !cleanNumbers.startsWith('7')) {
        cleanNumbers = '7' + cleanNumbers;
      }

      cleanNumbers = cleanNumbers.slice(0, 11);

      if (cleanNumbers.length === 0) {
        return '+7';
      } else if (cleanNumbers.length <= 1) {
        return '+7';
      } else if (cleanNumbers.length <= 4) {
        return `+7 (${cleanNumbers.slice(1)}`;
      } else if (cleanNumbers.length <= 7) {
        return `+7 (${cleanNumbers.slice(1, 4)}) ${cleanNumbers.slice(4)}`;
      } else if (cleanNumbers.length <= 9) {
        return `+7 (${cleanNumbers.slice(1, 4)}) ${cleanNumbers.slice(4, 7)}-${cleanNumbers.slice(7)}`;
      } else {
        return `+7 (${cleanNumbers.slice(1, 4)}) ${cleanNumbers.slice(4, 7)}-${cleanNumbers.slice(7, 9)}-${cleanNumbers.slice(9)}`;
      }
    };

    const getCleanPhoneNumber = (formatted: string): string => {
      const numbers = formatted.replace(/\D/g, '');
      if (numbers.startsWith('8')) {
        return '+7' + numbers.slice(1);
      } else if (numbers.startsWith('7')) {
        return '+' + numbers;
      } else if (numbers.length > 0) {
        return '+7' + numbers;
      }
      return '+7';
    };

    useEffect(() => {
      if (value === undefined || value === '') {
        const syntheticEvent = {
          target: { value: '+7' },
          currentTarget: { value: '+7' }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange?.(syntheticEvent);
      }
    }, [onChange, value]);

    useEffect(() => {
      if (value !== undefined) {
        const cleanValue = value.replace(/\D/g, '');
        if (cleanValue.length > 0) {
          setDisplayValue(formatPhoneNumber(cleanValue));
        } else {
          setDisplayValue('+7');
        }
      }
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const formatted = formatPhoneNumber(inputValue);
      const cleanNumber = getCleanPhoneNumber(formatted);

      setDisplayValue(formatted);

      // Создаем новое событие с отформатированным значением
      const newEvent = {
        ...event,
        target: {
          ...event.target,
          value: cleanNumber
        }
      };

      onChange?.(newEvent);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        event.key === 'Backspace' ||
        event.key === 'Delete' ||
        event.key === 'ArrowLeft' ||
        event.key === 'ArrowRight' ||
        event.key === 'Tab' ||
        event.key === 'Enter' ||
        event.ctrlKey ||
        event.metaKey
      ) {
        return;
      }

      if (!/\d/.test(event.key)) {
        event.preventDefault();
      }
    };

    const setCursorPosition = (position: number) => {
      setTimeout(() => {
        const input = inputRef.current;
        if (input) {
          input.setSelectionRange(position, position);
        }
      }, 0);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      if (displayValue === '+7' || displayValue === '') {
        setDisplayValue('+7 (');
        setCursorPosition(4);
      }

      if (props.onFocus) {
        props.onFocus(event);
      }
    };

    return (
      <Input
        {...props}
        ref={(node) => {
          inputRef.current = node;
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        value={displayValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        placeholder='+7 (___) ___-__-__'
        maxLength={18}
      />
    );
  }
);

PhoneInput.displayName = 'PhoneInput';

export { PhoneInput };
