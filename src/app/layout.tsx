import React from 'react';
import type { Metadata } from 'next';
import { Inter, Nunito } from 'next/font/google';

import { Footer, Header, HeaderControls } from '@/components/widgets';
import { Providers } from './providers';

import { getCriticalData } from './getCriticalData';

import './globals.css';
// import { getCartDetails } from '@/utils/helpers';

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { cartTotal, favoriteTotal, user } = await getCriticalData();
  // const criticalDataFlatCart = getCartDetails(cart);
  const initialData = {
    cartTotal,
    user,
    favoriteTotal,
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${inter.className} ${nunito.variable} antialiased grid grid-rows-[auto,1fr,auto] min-h-screen bg-background text-text-primary`}
      >
        <Providers criticalData={initialData}>
          <Header>
            {/* // cart={cart}
            // favorite={favorite} */}
            <HeaderControls user={user} />
          </Header>
          <main className="flex flex-col">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
