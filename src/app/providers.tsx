'use client';
import { toastOptions } from '@/utils/consts/toastConfig';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxProvider } from 'react-redux';
import { makeStore } from '@/redux/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils';
import { CriticalData } from '@/models/cart';

export function Providers({
  children,
  criticalData,
}: {
  children: React.ReactNode;
  criticalData: CriticalData;
}) {
  const store = makeStore(criticalData);
  console.log('initInitInit');
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster
        position="top-left"
        toastOptions={toastOptions}
      />
    </ReduxProvider>
  );
}
