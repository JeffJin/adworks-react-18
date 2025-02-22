import './globals.scss';
import StoreProvider from '@/app/store/store-provider';

export const dynamic = 'force-dynamic';
export const experimental_ppr = true;
export default function RootLayout({
   children,
 }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-full bg-gray-50">
      <body className="h-full">
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
