"use client";

import { parseAsInteger, useQueryState } from "nuqs";
import React, { createContext, useContext } from "react";

interface NuqsContextType {
  sortOption: string;
  setSortOption: (value: string | null) => Promise<URLSearchParams>;
  minPrice: number;
  maxPrice: number;
  setMinPrice: (value: number) => Promise<URLSearchParams>;
  setMaxPrice: (value: number) => Promise<URLSearchParams>;
  onClearPrice: () => void;
  onSortClear: () => void;
}

const NuqsContextProvider = createContext<NuqsContextType | null>(null);

function NuqsContext({ children }: { children: React.ReactNode }) {
  const [sortOption, setSortOption] = useQueryState("sort", {
    defaultValue: "all",
  });

  const [minPrice, setMinPrice] = useQueryState(
    "minPrice",
    parseAsInteger.withDefault(0)
  );

  const [maxPrice, setMaxPrice] = useQueryState(
    "maxPrice",
    parseAsInteger.withDefault(0)
  );

  const onClearPrice = () => {
    setMaxPrice(null);
    setMinPrice(null);
  };

  const onSortClear = () => {
    setMaxPrice(null);
    setMinPrice(null);
  };

  return (
    <NuqsContextProvider.Provider
      value={{
        sortOption,
        setSortOption,
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice,
        onClearPrice,
        onSortClear,
      }}
    >
      {children}
    </NuqsContextProvider.Provider>
  );
}

export function useNuqsContext() {
  const context = useContext(NuqsContextProvider);
  if (context === null)
    throw new Error("context was used outside of it's scope");
  return context;
}

export default NuqsContext;
