'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { InformationCircleIcon, XMarkIcon, HomeIcon } from '@heroicons/react/24/outline';

export default function FloatingFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const { translations } = useStore();

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-white dark:bg-zinc-800 text-gray-800 dark:text-zinc-200 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all z-40 border border-gray-200 dark:border-zinc-700"
        aria-label="Show Information"
      >
        <InformationCircleIcon className="h-6 w-6" />
      </button>

      {/* Popup Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="fixed bottom-20 right-4 w-72 bg-white dark:bg-zinc-800 rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-zinc-700 flex justify-between items-center">
              <h3 className="font-medium text-gray-800 dark:text-zinc-100">
                {translations.footer.legal.title}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-700 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500 dark:text-zinc-400" />
              </button>
            </div>
            
            <nav className="p-2">
              <Link 
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors"
              >
                <HomeIcon className="h-4 w-4 mr-2" />
                {translations.shop.backToShop}
              </Link>
              <Link 
                href="/company"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors"
              >
                {translations.footer.company.title}
              </Link>
              <Link 
                href="/legal/terms"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors"
              >
                {translations.footer.legal.terms}
              </Link>
              <Link 
                href="/legal/privacy"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors"
              >
                {translations.footer.legal.privacy}
              </Link>
              <Link 
                href="/legal/shipping"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors"
              >
                {translations.footer.legal.shipping}
              </Link>
              <Link 
                href="/legal/returns"
                onClick={() => setIsOpen(false)}
                className="flex items-center px-3 py-2 text-sm text-gray-600 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700/50 rounded-lg transition-colors"
              >
                {translations.footer.legal.returns}
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}