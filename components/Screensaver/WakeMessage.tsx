'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function WakeMessage() {
  return (
    <motion.div 
      className="absolute bottom-32 left-0 right-0 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <motion.p 
        className="text-blue-300/90 text-2xl font-medium tracking-wide"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Tap to wake screen 🐾
      </motion.p>
      <motion.p 
        className="text-purple-300/80 text-xl font-medium tracking-wide mt-2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        and save shelter pets 🏠
      </motion.p>
    </motion.div>
  );
}