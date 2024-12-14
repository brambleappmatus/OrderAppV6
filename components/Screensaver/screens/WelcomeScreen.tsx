'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { textVariants } from '../animations';
import WakeMessage from '../WakeMessage';

export default function WelcomeScreen() {
  return (
    <motion.div
      key="hello"
      className="absolute inset-0 flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.h1 
        className="text-[120px] font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text select-none"
        variants={textVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        hello
      </motion.h1>
      
      <WakeMessage />
    </motion.div>
  );
}