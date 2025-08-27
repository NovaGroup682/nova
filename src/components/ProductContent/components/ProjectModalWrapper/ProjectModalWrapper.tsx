'use client';

import React from 'react';

import { useDisclosure } from '@chakra-ui/react';

import { EditProjectModal } from '../EditProjectModal';

interface ProjectModalWrapperProps {
  children: React.ReactNode;
}

const ProjectModalWrapper = ({ children }: ProjectModalWrapperProps) => {
  const { open, onOpen, onClose } = useDisclosure();

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        openModal: onOpen
      } as React.JSX.IntrinsicAttributes);
    }
    return child;
  });

  return (
    <>
      {childrenWithProps}
      <EditProjectModal isOpen={open} onClose={onClose} />
    </>
  );
};

export default ProjectModalWrapper;
