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
          {children}
      </body>
    </html>
  );
}


export const metadata = {
  title: 'adworks',
  description: 'Media Assets Management',
};
