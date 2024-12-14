'use client';

import React, { useState } from 'react';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import ScreensaverContent from './ScreensaverContent';
import ScreensaverBackground from './ScreensaverBackground';

export default function Screensaver() {
  const [isActive, setIsActive] = useState(false);
  
  useInactivityTimer({
    onInactive: () => setIsActive(true),
    onActive: () => setIsActive(false),
    timeout: 80000 // 80 seconds
  });

  if (!isActive) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#080B1D] z-[200]"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsActive(false);
      }}
      style={{ isolation: 'isolate' }}
    >
      <div className="absolute inset-0">
        <ScreensaverBackground />
        <ScreensaverContent />
      </div>
    </div>
  );
}