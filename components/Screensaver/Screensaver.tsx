'use client';

import React, { useState } from 'react';
import { useInactivityTimer } from '@/hooks/useInactivityTimer';
import { useIsMobile } from '@/hooks/useIsMobile';
import ScreensaverContent from './ScreensaverContent';
import ScreensaverBackground from './ScreensaverBackground';

export default function Screensaver() {
  const [isActive, setIsActive] = useState(false);
  const isMobile = useIsMobile();
  
  useInactivityTimer({
    onInactive: () => !isMobile && setIsActive(true),
    onActive: () => setIsActive(false),
    timeout: 80000 // 80 seconds
  });

  if (!isActive) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#080B1D] z-[200] cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsActive(false);
      }}
      style={{ isolation: 'isolate' }}
    >
      <div className="absolute inset-0" onClick={(e) => e.stopPropagation()}>
        <ScreensaverBackground />
        <ScreensaverContent />
      </div>
    </div>
  );
}