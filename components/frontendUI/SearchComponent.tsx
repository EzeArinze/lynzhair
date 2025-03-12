import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchComponentProps {
  className?: string;
  parentClassName?: string;
  isMenuOpen?: (open: boolean) => void;
}

function SearchComponent({
  className,
  parentClassName,
  isMenuOpen,
}: SearchComponentProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query) return;

    const params = new URLSearchParams(searchParams);
    params.set("query", query);
    router.push(`/commerce/search-result?${params.toString()}`);

    isMenuOpen?.(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={parentClassName}>
        <Input
          type="search"
          placeholder="Search for hair..."
          className={className}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="absolute right-3 top-2.5">
          <Search className="text-muted-foreground h-4 w-4" />
        </button>
      </div>
    </form>
  );
}

export default SearchComponent;
