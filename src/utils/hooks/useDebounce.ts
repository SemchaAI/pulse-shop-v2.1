'use client';
import { type DependencyList, useEffect } from 'react';
import useTimeout from './useTimeoutFn';

export default function useDebounce(
  callback: () => void,
  delay: number,
  dependencies: DependencyList
) {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...dependencies, reset]);
  useEffect(clear, []);
}
