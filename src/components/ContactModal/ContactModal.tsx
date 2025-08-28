'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Check from '@assets/icons/check.svg';
import { phoneRegExp } from 'constant';
import { paths } from 'constant';
import Image from 'next/image';

import {
  Box,
  Button,
  EmptyState,
  Field,
  Input,
  Link,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';

import content from 'content';

import { Modal } from 'ui';

interface FormValues {
  regionName: string;
  clientName: string;
  phone: string;
  privacyPolicy: boolean;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      privacyPolicy: false
    }
  });

  const privacyPolicyAccepted = watch('privacyPolicy');

  const onSubmit = handleSubmit(() => {
    setIsSuccess(true);
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
              <Box display='flex' alignItems='center' gap={2}>
                <input
                  type='checkbox'
                  {...register('privacyPolicy', {
                    required:
                      'Необходимо согласие с политикой конфиденциальности'
                  })}
                  style={{ marginTop: '2px' }}
                />
                <Text fontSize='sm' color='gray.700'>
                  Нажимая кнопку {content.main.contactBlock.send}, я соглашаюсь
                  с{' '}
                  <Link
                    href={paths.policy}
                    color='blue.600'
                    textDecoration='underline'
                    _hover={{ color: 'blue.700' }}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    политикой конфиденциальности
                  </Link>
                </Text>
              </Box>
              {errors.privacyPolicy && (
                <Text fontSize='xs' color='red.500' mt={1} pl={5}>
                  {errors.privacyPolicy.message}
                </Text>
              )}
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
              disabled={
                Object.values(errors).length > 0 || !privacyPolicyAccepted
              }
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

export default ContactModal;
