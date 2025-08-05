'use client';

import { useState } from 'react';
import { GOOGLE_LINK } from 'constant';
import Image from 'next/image';

import { AspectRatio, Text } from '@chakra-ui/react';

import { ProjectItemType } from 'types';

import { Modal } from 'ui';

interface EditProjectModalProps {
  project: ProjectItemType;
  isOpen: boolean;
  onClose: () => void;
}

const EditProjectModal = ({
  project,
  isOpen,
  onClose
}: EditProjectModalProps) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const handleImageError = () => {
    setIsImageLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      minH={500}
      maxW='auto'
      w={{
        base: 'full',
        md: '80%'
      }}
      mx={4}
    >
      <AspectRatio ratio={7 / 4} w='full'>
        <Image
          sizes='(max-width: 450px) 270px, (max-width: 900px) 500px, 700px'
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            filter: isImageLoading ? 'blur(10px)' : 'none',
            transition: 'filter 0.3s ease-in-out'
          }}
          fill
          src={GOOGLE_LINK + project.sliders[0]}
          alt='contact cover'
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </AspectRatio>

      <Text
        textAlign='center'
        fontSize={{
          base: 14,
          md: 16
        }}
        px={4}
      >
        Можно ли внести изменения в проект? Да, при покупке типового проекта вы
        можете внести изменения. Сначала согласуем перечень корректировок с
        архитектором, затем рассчитываем стоимость — она прибавляется к базовой
        цене проекта. Также уточняем сроки выдачи обновлённой документации.
      </Text>
      <Text
        textAlign='left'
        fontSize={{
          base: 14,
          md: 16
        }}
        lineHeight='14px'
        px={4}
        py={2}
        whiteSpace='pre-line'
      >
        {`
        Что можно изменить:
          \n— адаптация наружных стен под регион строительства 
          \n— замена фасадных материалов — незначительные изменения планировки 
          \n— добавление или перенос окна, проёма и т.п.
        `}
      </Text>

      <Text
        textAlign='center'
        fontSize={{
          base: 14,
          md: 16
        }}
        px={4}
        pb={2}
        fontStyle='italic'
      >
        Наши проекты изначально сбалансированы по архитектуре, логике
        планировки, стоимости реализации и адаптированы под стандартный участок.
        Мы рекомендуем использовать их в базовой версии — так вы получаете
        оптимальный результат без существенного увеличения бюджета на
        реализацию. Глобальные изменения могут повлиять на целостность концепции
        и потребуют серьёзной переработки. В таких случаях мы предлагаем
        индивидуальное проектирование.
      </Text>
    </Modal>
  );
};

export default EditProjectModal;
