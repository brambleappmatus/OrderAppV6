'use client';

import React, { useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import RescueInfoModal from './RescueInfoModal';

export default function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showRescueInfoModal, setShowRescueInfoModal] = useState(false);

  return (
    <div className="relative">
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
        title="Settings"
      >
        <Cog6ToothIcon className="h-6 w-6 text-gray-600 dark:text-zinc-300" />
      </button>

      {/* Settings Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-lg shadow-lg z-50 py-1 border border-gray-200 dark:border-zinc-700">
            <button
              onClick={() => {
                setShowRescueInfoModal(true);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700/50"
            >
              Edit Rescue Info
            </button>
          </div>
        </>
      )}

      {/* Modals */}
      {showRescueInfoModal && (
        <RescueInfoModal onClose={() => setShowRescueInfoModal(false)} />
      )}
    </div>
  );
}