'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';

export default function LegalLinks() {
  const { translations } = useStore();

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-800 dark:text-zinc-100 mb-4">
        {translations.footer.legal.title}
      </h3>
      <ul className="space-y-3">
        <li>
          <Link 
            href="/legal/terms"
            className="text-sm text-gray-600 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200"
          >
            {translations.footer.legal.terms}
          </Link>
        </li>
        <li>
          <Link 
            href="/legal/privacy"
            className="text-sm text-gray-600 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200"
          >
            {translations.footer.legal.privacy}
          </Link>
        </li>
        <li>
          <Link 
            href="/legal/shipping"
            className="text-sm text-gray-600 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200"
          >
            {translations.footer.legal.shipping}
          </Link>
        </li>
        <li>
          <Link 
            href="/legal/returns"
            className="text-sm text-gray-600 dark:text-zinc-400 hover:text-gray-800 dark:hover:text-zinc-200"
          >
            {translations.footer.legal.returns}
          </Link>
        </li>
      </ul>
    </div>
  );
}