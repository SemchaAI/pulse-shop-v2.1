'use client';
import { useInView } from 'react-intersection-observer';
import type { ReactNode } from 'react';

interface LazyLoadWrapperProps {
  children: ReactNode;
  threshold?: number;
  skeleton?: ReactNode;
  triggerOnce?: boolean;
}

export const LazyLoadWrapper = ({
  children,
  threshold = 0.1,
  skeleton = null,
  triggerOnce = true,
}: LazyLoadWrapperProps) => {
  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
  });

  return <div ref={ref}>{inView ? children : skeleton}</div>;
};
