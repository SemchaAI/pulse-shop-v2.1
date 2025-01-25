'use client';
import { toastOptions } from '@/utils/consts/toastConfig';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxProvider } from 'react-redux';
import { appStore } from '@/redux/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={appStore}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster
        position="top-left"
        toastOptions={toastOptions}
      />
    </ReduxProvider>
  );
}
