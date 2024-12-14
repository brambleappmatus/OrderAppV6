import React from 'react';
import { motion } from 'framer-motion';
import { textVariants } from '../animations';
import { RescueInfo } from '@/types/rescue';
import Image from 'next/image';

interface RescueScreenProps {
  rescueInfo: RescueInfo | null;
}

export default function RescueScreen({ rescueInfo }: RescueScreenProps) {
  if (!rescueInfo) return null;

  return (
    <motion.div
      key="rescue"
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
          className="text-[48px] font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text mb-6"
          variants={textVariants}
        >
          {rescueInfo.title}
        </motion.h2>

        {rescueInfo.image_url && (
          <motion.div 
            className="relative w-72 h-72 mx-auto mb-6"
            variants={textVariants}
          >
            <Image
              src={rescueInfo.image_url}
              alt={rescueInfo.title}
              fill
              className="object-cover rounded-2xl"
              unoptimized
            />
          </motion.div>
        )}

        <motion.p 
          className="text-[20px] leading-relaxed font-medium text-blue-300/90 max-w-3xl mx-auto"
          variants={textVariants}
        >
          {rescueInfo.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}