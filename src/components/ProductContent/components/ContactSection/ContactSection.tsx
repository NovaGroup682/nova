'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { phoneRegExp } from 'constant';

import {
  Box,
  Button,
  Field,
  Flex,
  Input,
  Stack,
  Text,
  VStack
} from '@chakra-ui/react';

import { usePrivacyPolicyCookie } from 'hooks';

import content from 'content';

import { PrivacyPolicyCheckbox } from '../../../PrivacyPolicyCheckbox';

interface FormValues {
  regionName: string;
  clientName: string;
  phone: string;
}

const ContactSection = () => {
  const [_isSuccess, setIsSuccess] = useState<boolean>(false);
  const { setAccepted, isAccepted } = usePrivacyPolicyCookie();

  const {
    register,
    handleSubmit,
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

  return (
    <VStack
      w='full'
      gap={0}
      bg='gray.400'
      borderBottomWidth='2px'
      borderBottomColor='gray.200'
    >
      <Box
        as='form'
        w='full'
        py={{
          base: '40px',
          md: '60px'
        }}
        px={{
          base: '16px',
          md: '32px'
        }}
        onSubmit={onSubmit}
        maxW={1400}
      >
        <Text
          color='white'
          fontSize={{
            base: 34,
            md: 40
          }}
          pb={8}
        >
          {content.projectDetails.contactTitle}
        </Text>
        <Stack
          gap='4'
          align='center'
          w='full'
          flexDirection={{
            base: 'column',
            lg: 'row'
          }}
          justifyContent='center'
        >
          <Field.Root invalid={!!errors.regionName}>
            <Input
              fontSize={18}
              size={{
                base: 'xl',
                md: '2xl'
              }}
              className='contact-input'
              placeholder={content.main.contactBlock.region}
              _placeholder={{
                color: 'gray.100'
              }}
              {...register('regionName', {
                required: content.common.requiredField
              })}
              variant='outline'
              color='white'
              _focus={{
                borderColor: 'white'
              }}
              _hover={{
                borderColor: 'white'
              }}
              style={{
                borderColor: 'white'
              }}
            />
          </Field.Root>

          <Field.Root invalid={!!errors.clientName}>
            <Input
              fontSize={18}
              size={{
                base: 'xl',
                md: '2xl'
              }}
              className='contact-input'
              placeholder={content.main.contactBlock.yourName}
              _placeholder={{
                color: 'gray.100'
              }}
              {...register('clientName', {
                required: content.common.requiredField
              })}
              variant='outline'
              color='white'
              _focus={{
                borderColor: 'white'
              }}
              _hover={{
                borderColor: 'white'
              }}
              style={{
                borderColor: 'white'
              }}
            />
          </Field.Root>

          <Field.Root invalid={!!errors.phone}>
            <Input
              fontSize={18}
              size={{
                base: 'xl',
                md: '2xl'
              }}
              className='contact-input'
              placeholder={content.main.contactBlock.phone}
              _placeholder={{
                color: 'gray.100'
              }}
              {...register('phone', {
                required: content.common.requiredField,
                pattern: {
                  value: phoneRegExp,
                  message: content.main.contactBlock.wrongNumber
                }
              })}
              variant='outline'
              color='white'
              _focus={{
                borderColor: 'white'
              }}
              _hover={{
                borderColor: 'white'
              }}
              style={{
                borderColor: 'white'
              }}
            />
          </Field.Root>

          <Button
            px='24px'
            py='16px'
            size={{
              base: 'xl',
              md: '2xl'
            }}
            borderRadius='l2'
            fontFamily='body'
            bg='white'
            color='black'
            fontWeight='bold'
            type='submit'
            variant='outline'
            maxW='auto'
            w={{
              base: 'full',
              md: '250px'
            }}
            disabled={Object.values(errors).length > 0 || !isAccepted}
            _hover={{
              bg: 'gray.300',
              color: 'black'
            }}
          >
            {content.main.contactBlock.send}
          </Button>
        </Stack>
        <Flex
          w='full'
          pt={4}
          alignItems='center'
          flexDirection='column'
          position='relative'
        >
          <Box pb={5}>
            <PrivacyPolicyCheckbox
              value={isAccepted}
              onChange={handlePrivacyPolicyChange}
              color='white'
              fontSize={{
                base: 14,
                md: 16
              }}
              linkColor='white'
              linkHoverColor='blue.600'
            />
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
};

export default ContactSection;
