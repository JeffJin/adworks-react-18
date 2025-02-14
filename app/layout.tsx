'use client';

import ReduxProvider from '@/app/store/redux-provider';
import './globals.scss';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased md:subpixel-antialiased`}>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
