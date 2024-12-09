'use client';

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-6">
        Privacy Policy
      </h1>
      <div className="prose dark:prose-invert">
        <p className="text-gray-600 dark:text-zinc-300 mb-6">
          SnackShack processes customer personal data in compliance with GDPR.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100 mt-8 mb-4">
          Data Collection
        </h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-zinc-300 space-y-2">
          <li>We collect email addresses and payment details for the purpose of processing orders.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100 mt-8 mb-4">
          Data Usage
        </h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-zinc-300 space-y-2">
          <li>Personal data is used exclusively for payment processing and sales statistics.</li>
          <li>The 10% charity contribution to Slobody zvierat will be recorded anonymously.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100 mt-8 mb-4">
          Customer Rights
        </h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-zinc-300 space-y-2">
          <li>Customers have the right to access, modify, or delete their data.</li>
        </ul>
      </div>
    </div>
  );
}