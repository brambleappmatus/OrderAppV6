'use client';

import React from 'react';
import { useStore } from '@/store/useStore';

export default function CompanyPage() {
  const { translations } = useStore();

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-6">
        {translations.footer.company.title}
      </h1>
      
      <div className="space-y-6 text-gray-600 dark:text-zinc-300">
        <div>
          <h2 className="font-semibold mb-2">Operator</h2>
          <p>
            Matúš Staňo<br />
            Horný Ohaj 42<br />
            Vráble 95201<br />
            Slovakia
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Contact</h2>
          <p>
            Email: ahoj@snackshack.sk
          </p>
        </div>

        <div>
          <h2 className="font-semibold mb-2">Registration</h2>
          <p>
            Company ID: 51829754
          </p>
        </div>
      </div>
    </div>
  );
}