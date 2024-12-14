'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { textVariants } from '../animations';
import { Fact } from '@/types/facts';
import WakeMessage from '../WakeMessage';

interface FactScreenProps {
  randomFact: Fact | null;
}

export default function FactScreen({ randomFact }: FactScreenProps) {
  return (
    <motion.div
      key="facts"
      className="absolute inset-0 flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="text-center max-w-4xl mx-auto"
        variants={textVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.h2 
          className="text-[60px] font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-8"
          variants={textVariants}
        >
          Did You Know
        </motion.h2>
        {randomFact && (
          <motion.p 
            className="text-[24px] leading-tight font-medium text-blue-300/90 max-w-3xl mx-auto"
            variants={textVariants}
          >
            {randomFact.fact_text} 🐾
          </motion.p>
        )}
      </motion.div>

      <WakeMessage />
    </motion.div>
  );
}