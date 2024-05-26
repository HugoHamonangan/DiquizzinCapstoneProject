// src/components/PageTransition.tsx
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

const variants = {
  initial: {
    opacity: 0,
    x: '-10vw',
  },
  enter: {
    opacity: 1,
    x: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    x: '1vw',
    transition: {
      duration: 0,
    },
  },
};

type PageTransitionProps = {
  children: ReactNode;
};

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
