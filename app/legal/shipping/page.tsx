'use client';

import React from 'react';

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-6">
        Technical Operations
      </h1>
      <div className="prose dark:prose-invert">
        <ul className="list-disc pl-6 text-gray-600 dark:text-zinc-300 space-y-2">
          <li>SnackShack operates through a cloud application built on the React/Next.js platform.</li>
          <li>Payments are secured through HTTPS encryption and the Comgate payment gateway.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100 mt-8 mb-4">
          Access Methods
        </h2>
        <p className="text-gray-600 dark:text-zinc-300 mb-4">
          Customers can use the application via:
        </p>
        <ul className="list-disc pl-6 text-gray-600 dark:text-zinc-300 space-y-2">
          <li>Tablets available on-site.</li>
          <li>Mobile devices by scanning a QR code.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100 mt-8 mb-4">
          Charitable Activity
        </h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-zinc-300 space-y-2">
          <li>SnackShack donates 10% of all revenue to support Slobody zvierat.</li>
          <li>Current information on contributions will be published in the application under the "Charity" section.</li>
        </ul>
      </div>
    </div>
  );
}