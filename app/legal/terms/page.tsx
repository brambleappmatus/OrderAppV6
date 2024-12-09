'use client';

import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-zinc-100 mb-6">
        General Terms and Conditions
      </h1>
      <div className="prose dark:prose-invert">
        <p className="text-gray-600 dark:text-zinc-300 mb-6">
          <strong>Operator:</strong> Matúš Staňo<br />
          <strong>Company ID:</strong> 51829754<br />
          <strong>Address:</strong> Horný Ohaj 42, Vráble 95201
        </p>

        <p className="text-gray-600 dark:text-zinc-300 mb-6">
          These terms and conditions govern the rights and obligations between the operator of SnackShack and its customers.
        </p>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100 mt-8 mb-4">
          1. Operation and Sales
        </h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-zinc-300 space-y-2">
          <li>SnackShack is a self-service snack shop located in office spaces.</li>
          <li>Snacks are freely available on shelves. Customers select products using an application available on tablets or their own mobile devices.</li>
          <li>Payment for products is mandatory upon selection and is processed through an online payment gateway.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100 mt-8 mb-4">
          2. Contribution to Charity
        </h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-zinc-300 space-y-2">
          <li>SnackShack donates 10% of its profits from every sale to the Slobody zvierat charity, which supports the rescue and protection of animals.</li>
          <li>Information on the current amount donated to charity will be available on the website or in the application.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100 mt-8 mb-4">
          3. Payment Terms
        </h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-zinc-300 space-y-2">
          <li>Payments are accepted in EUR and CZK via the Comgate payment gateway.</li>
          <li>Product prices are inclusive of VAT.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-zinc-100 mt-8 mb-4">
          4. Complaints and Refunds
        </h2>
        <ul className="list-disc pl-6 text-gray-600 dark:text-zinc-300 space-y-2">
          <li>Complaints can be reported via email to ahoj@snackshack.sk.</li>
          <li>Refunds for unconsumed products may be issued in case of erroneous payment.</li>
        </ul>
      </div>
    </div>
  );
}