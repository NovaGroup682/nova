import { useEffect, useRef, useState } from 'react';
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
  Portal,
  Presence,
  Show,
  Stack,
  VStack
} from '@chakra-ui/react';

import content from 'content';

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
  const sliderRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({ mode: 'onTouched' });

  const onSubmit = handleSubmit(() => {
    setIsSuccess(true);
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sliderRef.current &&
        !sliderRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Show when={isOpen}>
      <Presence
        present={isOpen}
        animationName={{ _open: 'fade-in', _closed: 'fade-out' }}
        animationDuration='moderate'
      >
        <Portal>
          <Box
            shadow='lg'
            position='fixed'
            top='0'
            left='0'
            w='100vw'
            h='100vh'
            backdropFilter='blur(0.5rem)'
            zIndex='9999'
            display='flex'
            alignItems='center'
            justifyContent='center'
            cursor='pointer'
          >
            <Box
              ref={sliderRef}
              bg='white'
              borderRadius='2xl'
              maxW={{
                base: 'auto',
                md: '600px'
              }}
              w={{
                base: '90%',
                md: '80%'
              }}
              boxShadow='lg'
              cursor='default'
              position='relative'
              overflow='hidden'
            >
              <Box
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
                      disabled={Object.values(errors).length > 0}
                      _hover={{
                        bg: 'gray.700'
                      }}
                    >
                      {content.main.contactBlock.send}
                    </Button>
                  </Stack>
                </Box>
              )}
            </Box>
          </Box>
        </Portal>
      </Presence>
    </Show>
  );
};

export default ContactModal;
