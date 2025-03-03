import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface SearchComponentProps {
  className?: string;
  parentClassName?: string;
}

function SearchComponent({ className, parentClassName }: SearchComponentProps) {
  return (
    <div className={parentClassName}>
      <Input
        type="search"
        placeholder="Search for hair..."
        className={className}
      />
      <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
    </div>
  );
}

export default SearchComponent;
