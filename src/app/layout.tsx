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

type PageProps = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Readonly<PageProps>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} ${nunito.variable} antialiased flex flex-col min-h-screen bg-background text-text-primary`}
      >
        <Providers>
          <Header />
          <main className="flex-1 flex flex-col">
            {/* <Suspense fallback={<div>Loading...</div>}> */}
            {children}
            {/* </Suspense> */}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
