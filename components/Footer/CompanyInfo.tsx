'use client';

import React from 'react';
import { useStore } from '@/store/useStore';

export default function CompanyInfo() {
  const { translations } = useStore();

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-800 dark:text-zinc-100 mb-4">
        {translations.footer.company.title}
      </h3>
      <div className="space-y-3">
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          SnackShack s.r.o.
        </p>
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          Hlavná 123
          <br />
          841 01 Bratislava
          <br />
          Slovakia
        </p>
        <p className="text-sm text-gray-600 dark:text-zinc-400">
          IČO: 12345678
          <br />
          DIČ: SK2023456789
        </p>
      </div>
    </div>
  );
}