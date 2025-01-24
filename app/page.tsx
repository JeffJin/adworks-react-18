'use client'

import Image from 'next/image';
import clsx from 'clsx';
import { useState, useCallback } from 'react';
import {lusitana} from "@/app/ui/fonts";
import AdworksLogo from "@/app/ui/common/adworks-logo";

export default function Home() {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState('');

  const validateEmail = (val: string) => {

    if (val.length < 4) {
      setIsValidEmail(false);
      setEmail('is invalid');
    } else {
      setIsValidEmail(true);
      setEmail(val);
    }
  }

  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <AdworksLogo/>
        <div className="text-blue-300 text-lg">
          Your email address {email}
        </div>
        <p className={`${lusitana.className}`}>Navigate to your browser, open dev tools and select the body element. You should see Inter and Inte</p>
        <input
          className={clsx(
            'peer block w-full rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500',
            {
              'text-amber-500': !isValidEmail,
              'text-pink-500': isValidEmail,
            }
          )}
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email address"
          required
          onChange={(e) => validateEmail(e.target.value) }
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
