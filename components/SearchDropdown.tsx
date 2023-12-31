import React, { useState } from "react";
import { SearchDropdownCard } from "./SearchDropdownCard";
import BookInfo from "@/types/interfaces/BookInfo";

interface SearchDropdownProps {
  results: BookInfo[];
  onClick: (val: BookInfo) => void;
}

export const SearchDropdown = ({ results, onClick }: SearchDropdownProps) => {
  return (
    <div className="w-full max-w-xl bg-white flex flex-col shadow-sm rounded-md mt-4 max-h-80 overflow-y-scroll absolute">
      {results.map((result) => (
        <SearchDropdownCard key={result.id} book={result} onClick={onClick} />
      ))}
    </div>
  );
};
