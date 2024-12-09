'use client';

import React from 'react';

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-6">
        Complaint Policy
      </h1>
      <div className="prose dark:prose-invert">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100 mt-8 mb-4">
          Product Complaints
        </h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-zinc-300 space-y-2">
          <li>If a customer discovers a defect in a product (e.g., damaged packaging, poor quality), they can report the issue via email: ahoj@snackshack.sk.</li>
          <li>Complaints are only accepted for unopened products.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100 mt-8 mb-4">
          Complaint Procedure
        </h2>
        <p className="text-gray-600 dark:text-zinc-300 mb-4">
          The complaint must include:
        </p>
        <ul className="list-disc pl-6 text-gray-600 dark:text-zinc-300 space-y-2">
          <li>Product name.</li>
          <li>Purchase time (available in the application's order history).</li>
          <li>Complaints will be resolved within 14 days.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100 mt-8 mb-4">
          Refunds
        </h2>
        <p className="text-gray-600 dark:text-zinc-300">
          If the complaint is justified, the amount for the product will be refunded to the customer's account.
        </p>
      </div>
    </div>
  );
}