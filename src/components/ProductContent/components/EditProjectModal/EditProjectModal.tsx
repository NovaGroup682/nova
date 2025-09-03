'use client';

import { Box, Link, Text } from '@chakra-ui/react';

import content from 'content';

import SocialLinksBlock from 'components/SocialLinksBlock';
import { Modal } from 'ui';

interface EditProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProjectModal = ({ isOpen, onClose }: EditProjectModalProps) => (
  <Modal
    isDark
    isOpen={isOpen}
    onClose={onClose}
    py={6}
    maxW={{
      md: 'auto',
      lg: '1000px'
    }}
    w={{
      base: 'full',
      md: '80%'
    }}
    mx={4}
    gap={2}
  >
    <Text
      w='full'
      textAlign='left'
      fontSize={{
        base: 16,
        md: 20
      }}
      px={{
        base: 4,
        md: 8
      }}
    >
      {content.projectDetails.editModal.questionTitle}
    </Text>
    <Text
      as='h3'
      w='full'
      textAlign='left'
      fontSize={{
        base: 14,
        md: 16
      }}
      px={{
        base: 4,
        md: 8
      }}
      fontWeight='normal'
      color='gray.500'
      pb={4}
    >
      {content.projectDetails.editModal.answerTitle}
    </Text>
    <Text
      as='h3'
      w='full'
      textAlign='left'
      fontSize={{
        base: 16,
        md: 20
      }}
      lineHeight='14px'
      px={{
        base: 4,
        md: 8
      }}
      whiteSpace='pre-line'
    >
      {content.projectDetails.editModal.toChangeTitle}
    </Text>

    <Box
      as='ul'
      listStyleType='circle'
      w='full'
      px={{
        base: 4,
        md: 8
      }}
      pb={4}
      ml={10}
    >
      {content.projectDetails.editModal.changeVariants.map((li) => (
        <Text
          key={li}
          as='li'
          fontSize={{
            base: 14,
            md: 16
          }}
          textAlign='left'
          color='gray.500'
        >
          {li}
        </Text>
      ))}
    </Box>

    <Text
      w='full'
      textAlign='left'
      fontSize={{
        base: 14,
        md: 16
      }}
      px={{
        base: 4,
        md: 8
      }}
      pb={4}
      fontStyle='italic'
    >
      {content.projectDetails.editModal.description}
    </Text>

    <Box
      position='relative'
      display='inline-block'
      height='24px'
      _hover={{
        '& .underline': {
          transform: 'scaleX(1)'
        }
      }}
      _active={{
        '& .menu-text': {
          color: 'gray.400'
        },
        '& .underline': {
          bg: 'gray.400'
        }
      }}
      mb={4}
    >
      <Link
        href={`tel:${content.contacts.salesDepartmentPhone}`}
        fontSize={{
          base: '12px',
          md: '14px'
        }}
        w='full'
        py='16px'
        borderRadius='10px'
        position='relative'
        bg='transparent'
        _focus={{ outlineWidth: 0 }}
        _hover={{ textDecoration: 'none' }}
      >
        <Text
          className='menu-text'
          textTransform='uppercase'
          fontSize='16px'
          color='black'
          userSelect='none'
          lineHeight='16px'
          _active={{ color: 'red.500' }}
        >
          {content.contacts.salesDepartmentPhone}
        </Text>
      </Link>
      <Box
        className='underline'
        position='absolute'
        bottom='-10px'
        left={0}
        right={0}
        height='2px'
        bg='black'
        transform='scaleX(0)'
        transformOrigin='left'
        transition='transform 0.5s ease'
      />
    </Box>

    <SocialLinksBlock />
  </Modal>
);

export default EditProjectModal;
