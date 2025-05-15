"use client";
import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedValue(value.toLowerCase()),
      delay
    );
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
