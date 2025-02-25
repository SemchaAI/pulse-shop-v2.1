'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

export const ToastProvider = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const message = searchParams.get('toastMessage');
    console.log('ToastProvider message', message);
    if (message) {
      toast.error(decodeURIComponent(message), { duration: 3000 });
      const url = new URL(window.location.href);
      url.searchParams.delete('toastMessage');
      window.history.replaceState({}, '', url.toString());
    }
  }, [pathname, searchParams]);

  return null;
};
