"use client";

import React, { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ResultSection } from "@/components/ResultSection";
import { SearchDropdown } from "@/components/SearchDropdown";
import BookInfo from "@/types/interfaces/BookInfo";
import SearchMode from "@/types/interfaces/SearchMode";
import Image from "next/image";

export default function Search() {
  const [results, setResults] = useState<BookInfo[]>([]);
  const [isResultSectionVisible, setResultSectionVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchMode, setSearchMode] = useState<SearchMode>({
    modeKeyword: "",
    label: "Everything",
  });

  const toggleResultSection = () => {
    if (!isResultSectionVisible) {
      setResultSectionVisible(!isResultSectionVisible);
    }
  };

  const doNothing = (book: BookInfo) => {};

  return (
    <>
      <section className="w-full h-fit flex flex-col lg:flex-row items-center justify-around relative bg-gradient-to-l from-amber-800 to-orange-950 py-7">
        <h1 className="relative text-white text-4xl text-center lg:text-start ml-9 mt-9 italic">
          &quot; That&apos;s the thing about books. <br /> They let you travel
          without moving your feet.&quot;
        </h1>
        <div className="w-max top-2.5 right-36 text-center flex flex-col items-center mr-20 mt-9">
          <h2 className="text-white text-2xl lg:text-3xl mt-5 mb-4">
            Find Your Book
          </h2>
          <section>
            <SearchBar
              setSearchValue={setSearchValue}
              setResults={setResults}
              toggleResultSection={toggleResultSection}
              setCurrentSearchMode={setSearchMode}
            />
            {results && (
              <SearchDropdown results={results} onClick={doNothing} />
            )}
          </section>

          <div className="mt-6">
            <Image
              height={450}
              width={450}
              alt="header picture"
              src="/assets/pixeltrue-seo.svg"
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
      {isResultSectionVisible && (
        <ResultSection searchValue={searchValue} searchMode={searchMode} />
      )}
    </>
  );
}
