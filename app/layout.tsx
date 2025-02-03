'use client'

import ReduxProvider from '@/app/store/redux-provider';
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.scss";
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={`${inter.className} antialiased md:subpixel-antialiased`}>
          {children}
        </body>
      </html>
    </ReduxProvider>
  );
}
