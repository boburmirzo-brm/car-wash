import { useState, useEffect } from 'react';

export const useDebounce = (value: string, delay:number=500) => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  return debouncedValue;
};
