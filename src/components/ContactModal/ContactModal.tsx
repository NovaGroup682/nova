'use client';

import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Check from '@assets/icons/check.svg';
import { phoneRegExp } from 'constant';
import Image from 'next/image';

import {
  Box,
  Button,
  EmptyState,
  Field,
  Input,
  Stack,
  VStack
} from '@chakra-ui/react';

import { usePrivacyPolicyCookie } from 'hooks';

import content from 'content';

import { Modal } from 'ui';
import { PrivacyPolicyCheckbox } from '../PrivacyPolicyCheckbox';

interface FormValues {
  regionName: string;
  clientName: string;
  phone: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { setAccepted, isAccepted } = usePrivacyPolicyCookie();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      regionName: '',
      clientName: '',
      phone: ''
    }
  });

  const handlePrivacyPolicyChange = (isChecked: boolean) => {
    setAccepted(isChecked);
  };

  const onSubmit = handleSubmit(() => {
    setIsSuccess(true);
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isDark>
      <Box
        w='full'
        position='relative'
        height={{
          base: '150px',
          md: '240px'
        }}
        overflow='hidden'
      >
        <Image
          sizes='(max-width: 450px) 400px, 1000px'
          style={{
            position: 'absolute',
            objectFit: 'cover',
            objectPosition: 'bottom'
          }}
          fill
          src={content.main.contactBlock.contactCover}
          alt='contact cover'
        />
      </Box>

      {isSuccess ? (
        <EmptyState.Root
          size='lg'
          minH={{
            base: 252,
            md: 288
          }}
        >
          <EmptyState.Content gap={4}>
            <EmptyState.Indicator>
              <Check />
            </EmptyState.Indicator>
            <VStack textAlign='center'>
              <EmptyState.Title>
                {content.main.contactBlock.callYouLater}
              </EmptyState.Title>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      ) : (
        <Box
          as='form'
          w='full'
          p={{
            base: '16px',
            md: '32px'
          }}
          onSubmit={onSubmit}
        >
          <Stack gap='4' align='center' w='full'>
            <Field.Root invalid={!!errors.regionName}>
              <Input
                placeholder={content.main.contactBlock.region}
                _placeholder={{
                  color: errors.regionName ? 'red.500' : 'gray.600'
                }}
                {...register('regionName', {
                  required: content.common.requiredField
                })}
                variant='flushed'
              />
            </Field.Root>

            <Field.Root invalid={!!errors.clientName}>
              <Input
                placeholder={content.main.contactBlock.yourName}
                _placeholder={{
                  color: errors.clientName ? 'red.500' : 'gray.600'
                }}
                {...register('clientName', {
                  required: content.common.requiredField
                })}
                variant='flushed'
              />
            </Field.Root>

            <Field.Root invalid={!!errors.phone}>
              <Input
                placeholder={content.main.contactBlock.phone}
                _placeholder={{
                  color: errors.phone ? 'red.500' : 'gray.600'
                }}
                {...register('phone', {
                  required: content.common.requiredField,
                  pattern: {
                    value: phoneRegExp,
                    message: content.main.contactBlock.wrongNumber
                  }
                })}
                variant='flushed'
              />
            </Field.Root>

            <Box w='full' pt={2}>
              <PrivacyPolicyCheckbox
                value={isAccepted}
                onChange={handlePrivacyPolicyChange}
                color='gray.700'
                linkColor='blue.600'
                linkHoverColor='blue.700'
              />
            </Box>

            <Button
              mt={{
                base: 3,
                md: 4
              }}
              px='24px'
              py='16px'
              borderRadius='10px'
              fontFamily='body'
              bg='gray.500'
              color='white'
              fontWeight='bold'
              type='submit'
              disabled={Object.values(errors).length > 0 || !isAccepted}
              _hover={{
                bg: 'gray.700'
              }}
            >
              {content.main.contactBlock.send}
            </Button>
          </Stack>
        </Box>
      )}
    </Modal>
  );
};

export default memo(ContactModal);
