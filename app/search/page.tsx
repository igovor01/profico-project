"use client";

import React, { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ResultSection } from "@/components/ResultSection";
import { SearchDropdown } from "@/components/SearchDropdown";
import BookInfo from "@/types/interfaces/BookInfo";

import Image from "next/image";
export default function Search() {
  const [results, setResults] = useState<BookInfo[]>([]);
  const [isResultSectionVisible, setResultSectionVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleResultSection = () => {
    if (!isResultSectionVisible)
      setResultSectionVisible(!isResultSectionVisible);
  };

  return (
    <>
      <section className="header w-full h-4/5 bg-amber-800 shadow-md shadow-orange-50 flex items-center relative">
        <div className="row1">
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-amber-800 to-orange-950 "></span>
          <h1 className="relative text-white text-4xl text-center ml-9 ">
            Here comes a really nice <br /> book quote that I will later update.
          </h1>
        </div>
        <div className="row2 absolute top-2.5 right-36 text-center">
          <h2 className="text-white text-4xl mt-5 mb-3.5">Find Your Book</h2>
          <div className="absolute">
            <SearchBar
              setSearchValue={setSearchValue}
              setResults={setResults}
              toggleResultSection={toggleResultSection}
            />
            {results && <SearchDropdown results={results} />}
          </div>

          <div className="mt-6">
            <Image
              height={450}
              width={450}
              alt="header picture"
              src="/assets/pixeltrue-seo.svg"
              className=""
            />
            <p className="text-sm italic">
              Illustration by{" "}
              <a href="https://icons8.com/illustrations/author/ARh4OKrFtdfC">
                Pixeltrue
              </a>{" "}
              from <a href="https://icons8.com/illustrations">Ouch!</a>
            </p>
          </div>
        </div>
      </section>
      {isResultSectionVisible && <ResultSection searchValue={searchValue} />}
    </>
  );
}
