'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';

export default function Footer() {
  const { translations } = useStore();

  return (
    <footer className="bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto py-3 px-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 dark:text-zinc-400">
            <Link 
              href="/company"
              className="hover:text-gray-700 dark:hover:text-zinc-300"
            >
              {translations.footer.company.title}
            </Link>
            <Link 
              href="/legal/terms"
              className="hover:text-gray-700 dark:hover:text-zinc-300"
            >
              {translations.footer.legal.terms}
            </Link>
            <Link 
              href="/legal/privacy"
              className="hover:text-gray-700 dark:hover:text-zinc-300"
            >
              {translations.footer.legal.privacy}
            </Link>
            <Link 
              href="/legal/shipping"
              className="hover:text-gray-700 dark:hover:text-zinc-300"
            >
              {translations.footer.legal.shipping}
            </Link>
            <Link 
              href="/legal/returns"
              className="hover:text-gray-700 dark:hover:text-zinc-300"
            >
              {translations.footer.legal.returns}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}