import React, { useEffect, useState } from "react";
import { ResultSectionCard } from "./ResultSectionCard";
import BookInfo from "@/types/interfaces/BookInfo";
import axios from "axios";
import SearchMode from "@/types/interfaces/SearchMode";
import { MAX_RESULTS } from "@/config/constants";
import useBooks from "@/hooks/useBooks";

interface ResultSectionProps {
  searchValue: string;
  searchMode: SearchMode;
}

export const ResultSection = ({
  searchValue,
  searchMode,
}: ResultSectionProps) => {
  
  const { books, isLoading, error } = useBooks(
    searchMode,
    searchValue,
    MAX_RESULTS
  );

  return (
    <section
      id="resultSection"
      className="container mx-auto max-w-3xl mt-2 mb-4 md:my-6 break-words"
    >
      <h1 className="font-bold sm:w-10/12 mb-6 text-base md:text-lg text-center">
        Search results for{" "}
        <span>
          {searchMode.label == "Everything" ? "" : searchMode.label + ": "}
        </span>
        <span className="italic">&quot;{searchValue}&quot;</span>
      </h1>
      <div className="w-full py-8 px-4">
        {!isLoading ? (
          books.map((book) => (
            <ResultSectionCard key={book.id} {...book} />
          ))
        ) : (
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </section>
  );
};
