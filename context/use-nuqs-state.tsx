"use client";

import { useQueryState } from "nuqs";
import React, { createContext, useContext } from "react";

interface NuqsContextType {
  sortOption: string;
  setSortOption: (value: string | null) => Promise<URLSearchParams>;
  minPrice: string;
  maxPrice: string;
  setMinPrice: (value: string) => Promise<URLSearchParams>;
  setMaxPrice: (value: string) => Promise<URLSearchParams>;
  onClearPrice: () => void;
  onSortClear: () => void;
}

const NuqsContextProvider = createContext<NuqsContextType | null>(null);

function NuqsContext({ children }: { children: React.ReactNode }) {
  const [sortOption, setSortOption] = useQueryState("sort", {
    defaultValue: "all",
  });

  const [minPrice, setMinPrice] = useQueryState("minPrice", {
    defaultValue: "",
  });

  const [maxPrice, setMaxPrice] = useQueryState("maxPrice", {
    defaultValue: "",
  });

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
