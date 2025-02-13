'use client';
import { ReactNode, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
// mb just redirect to some special page and don`t control error in this way
export default function ErrorLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  //err handling
  const params = useSearchParams();
  const error = params.get('error');
  console.log('PARAMS', params.toString());
  useEffect(() => {
    if (error) {
      toast.error(decodeURIComponent(error));

      const newParams = new URLSearchParams(params.toString());
      newParams.delete('error');
      const strParams =
        newParams.toString().length > 0 ? `?${newParams.toString()}` : '';
      const newUrl = `${window.location.pathname}${strParams}`;
      window.history.replaceState(null, '', newUrl);
    }
  }, [error]);
  return <>{children}</>;
}
