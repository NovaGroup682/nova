'use client';

import { ReactNode, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

interface AnimatedBlockProps {
  children: ReactNode;
  delay?: number;
}

const AnimatedBlock = ({ children, delay = 0 }: AnimatedBlockProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      transition={{ duration: 0.7, delay }}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 }
      }}
      style={{
        width: '100%'
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBlock;
