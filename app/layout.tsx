import './globals.scss';
import StoreProvider from '@/app/store/store-provider';
import { inter } from '@/app/ui/fonts';

export const dynamic = 'force-dynamic';
export const experimental_ppr = true;
export default function RootLayout({
   children,
 }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased md:subpixel-antialiased`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}


export const metadata = {
  title: 'adworks',
  description: 'Media Assets Management',
};
