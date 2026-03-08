import { useEffect, useState } from "react";

/**
 * Custom hook to debounce a value.
 * It waits for the specified delay before updating the returned value.
 *
 * @param value - The value you want to debounce
 * @param delay - Delay time in milliseconds (e.g., 1500ms)
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}