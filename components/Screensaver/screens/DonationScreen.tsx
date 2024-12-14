'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { textVariants } from '../animations';
import { useDonationAmount } from '@/hooks/useDonationAmount';
import { DonationExample } from '@/types/donations';

interface DonationScreenProps {
  randomExample: DonationExample | null;
}

export default function DonationScreen({ randomExample }: DonationScreenProps) {
  const { amount } = useDonationAmount();

  return (
    <motion.div
      key="donations"
      className="absolute inset-0 flex flex-col items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="text-center"
        variants={textVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <motion.h2 
          className="text-2xl font-medium text-blue-300/90 mb-3"
          variants={textVariants}
        >
          Monthly Donations
        </motion.h2>
        <motion.div 
          className="text-[160px] leading-none font-bold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text mb-4"
          variants={textVariants}
        >
          €{amount.toFixed(2)}
        </motion.div>
        <motion.p 
          className="text-purple-300/90 text-xl"
          variants={textVariants}
        >
          collected this month
        </motion.p>
      </motion.div>

      {randomExample && (
        <motion.div 
          className="absolute bottom-32 left-0 right-0 text-center px-8"
          variants={textVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ delay: 0.3 }}
        >
          <p className="text-purple-200/90 text-2xl font-medium max-w-2xl mx-auto">
            {randomExample.example_text}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}