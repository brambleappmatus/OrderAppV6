import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDonationExamples } from '@/hooks/useDonationExamples';
import { useDonationAmount } from '@/hooks/useDonationAmount';
import { useFacts } from '@/hooks/useFacts';
import { useRescueInfo } from '@/hooks/useRescueInfo';
import WelcomeScreen from './screens/WelcomeScreen';
import DonationScreen from './screens/DonationScreen';
import FactScreen from './screens/FactScreen';
import RescueScreen from './screens/RescueScreen';

type ScreenType = 'hello' | 'donations' | 'facts' | 'rescue';

export default function ScreensaverContent() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('hello');
  const { randomExample, fetchRandomExample } = useDonationExamples();
  const { refreshAmount } = useDonationAmount();
  const { randomFact, fetchRandomFact } = useFacts();
  const { rescueInfo, refreshRescueInfo } = useRescueInfo();

  useEffect(() => {
    let mounted = true;
    let timers: NodeJS.Timeout[] = [];

    // Separate async function for data fetching
    const fetchData = async () => {
      if (!mounted) return;
      
      try {
        await Promise.all([
          fetchRandomExample(),
          refreshAmount(),
          fetchRandomFact(),
          refreshRescueInfo()
        ]);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    // Function to handle screen cycling
    const cycleScreens = () => {
      if (!mounted) return;

      setCurrentScreen('hello');

      // Clear any existing timers
      timers.forEach(timer => clearTimeout(timer));
      timers = [];

      // Schedule new timers
      timers.push(
        setTimeout(async () => {
          if (!mounted) return;
          try {
            await Promise.all([fetchRandomExample(), refreshAmount()]);
            setCurrentScreen('donations');
          } catch (error) {
            console.error('Error updating donation data:', error);
          }
        }, 5000),

        setTimeout(async () => {
          if (!mounted) return;
          try {
            await fetchRandomFact();
            setCurrentScreen('facts');
          } catch (error) {
            console.error('Error updating fact data:', error);
          }
        }, 10000),

        setTimeout(async () => {
          if (!mounted) return;
          try {
            await refreshRescueInfo();
            setCurrentScreen('rescue');
          } catch (error) {
            console.error('Error updating rescue info:', error);
          }
        }, 15000),

        setTimeout(() => {
          if (mounted) {
            fetchData();
            cycleScreens();
          }
        }, 25000)
      );
    };

    // Initial setup
    fetchData();
    cycleScreens();

    // Cleanup function
    return () => {
      mounted = false;
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [fetchRandomExample, fetchRandomFact, refreshAmount, refreshRescueInfo]);

  return (
    <div className="relative h-full flex flex-col items-center justify-center overflow-hidden pointer-events-none">
      <AnimatePresence mode="wait">
        {currentScreen === 'hello' && <WelcomeScreen />}
        {currentScreen === 'donations' && <DonationScreen randomExample={randomExample} />}
        {currentScreen === 'facts' && <FactScreen randomFact={randomFact} />}
        {currentScreen === 'rescue' && <RescueScreen rescueInfo={rescueInfo} />}
      </AnimatePresence>
    </div>
  );
}