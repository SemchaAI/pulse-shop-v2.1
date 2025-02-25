'use client';
import { toastOptions } from '@/utils/consts/toastConfig';
import { Toaster } from 'react-hot-toast';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/redux/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/utils';
import dynamic from 'next/dynamic';

const ToastProvider = dynamic(
  () =>
    import('@/components/features/toast/ToastProvider').then(
      (mod) => mod.ToastProvider
    ),
  {
    ssr: false,
  }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        {children}
      </QueryClientProvider>
      <Toaster
        position="top-left"
        toastOptions={toastOptions}
      />
    </ReduxProvider>
  );
}
