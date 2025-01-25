import type { Metadata } from 'next';
import { Inter, Nunito } from 'next/font/google';

import { Footer, Header } from '@/components/widgets';
import { Providers } from './providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pulse shop v2',
  description: 'Pulse shop with tailwind css',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} ${nunito.variable} antialiased grid grid-rows-[auto,1fr,auto] min-h-screen bg-background text-text-primary`}
      >
        <Providers>
          <Header />
          <main className="flex flex-col overflow-hidden">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
