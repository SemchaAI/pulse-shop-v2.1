import { useState, useCallback } from 'react';

export function useSet<T>(initialSet: Iterable<T> = []) {
  const [set, setSet] = useState(() => new Set(initialSet));

  const add = useCallback((value: T) => {
    setSet((prevSet) => new Set(prevSet).add(value));
  }, []);

  const remove = useCallback((value: T) => {
    setSet((prevSet) => {
      const newSet = new Set(prevSet);
      newSet.delete(value);
      return newSet;
    });
  }, []);

  const toggle = useCallback((value: T) => {
    setSet((prevSet) => {
      const newSet = new Set(prevSet);
      if (newSet.has(value)) {
        newSet.delete(value);
      } else {
        newSet.add(value);
      }
      return newSet;
    });
  }, []);

  const has = useCallback((value: T) => set.has(value), [set]);

  const reset = useCallback(() => {
    setSet(new Set(initialSet));
  }, [initialSet]);

  return [set, { add, remove, toggle, has, reset }] as const;
}
