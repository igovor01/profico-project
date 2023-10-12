import React, { useState } from "react";
import { SearchDropdownCard } from "./SearchDropdownCard";
import BookInfo from "@/types/interfaces/BookInfo";

interface SearchDropdownProps {
  results: BookInfo[];
}

export const SearchDropdown = ({ results }: SearchDropdownProps) => {
  return (
    <div className="w-full max-w-xl bg-white flex flex-col shadow-sm rounded-md mt-4 max-h-80 overflow-y-scroll absolute">
      {results.map((result) => {
        return <SearchDropdownCard key={result.id} {...result} />;
      })}
    </div>
  );
};
