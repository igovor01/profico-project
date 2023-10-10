import React, { useEffect, useState } from "react";
import { ResultSectionCard } from "./ResultSectionCard";
import BookInfo from "@/types/interfaces/BookInfo";
import axios from "axios";
import SearchMode from "@/types/interfaces/SearchMode";
import { MAX_RESULTS, SEARCH_URL } from "@/config/constants";

interface ResultSectionProps {
  searchValue: string;
  searchMode: SearchMode;
}

export const ResultSection = ({
  searchValue,
  searchMode,
}: ResultSectionProps) => {
  const [results, setResults] = useState<BookInfo[]>([]);
  const key = process.env.NEXT_PUBLIC_BOOK_API_KEY as string;

  const fetchSearchedBooks = async () => {
    try {
      const url =
        SEARCH_URL +
        (searchMode.label == "Everything" ? "" : searchMode.modeKeyword + ":") +
        searchValue +
        "&key=" +
        key +
        "&maxResults=" +
        MAX_RESULTS;
      const response = await axios.get(
        url
        //`https://www.googleapis.com/books/v1/volumes?q=${value}&key=${key}&maxResults=${MAX_RESULTS_SEARCH_BAR}`
      );
      console.log(response.data.items);
      const items = response.data?.items || [];
      console.log(items);
      const filteredBookData: BookInfo[] = items
        .filter((item: any) => {
          console.log("okay");
          return (
            item &&
            item.volumeInfo.title &&
            item.volumeInfo.authors &&
            (item.volumeInfo.title.toLowerCase().includes(searchValue) ||
              item.volumeInfo.authors.filter((author: string) =>
                author.toLowerCase().includes(searchValue)
              ))
          );
        })
        .map((book: any) => {
          let imgSrc: string;
          if (book?.volumeInfo?.imageLinks !== undefined) {
            imgSrc = book.volumeInfo.imageLinks.thumbnail;
          } else {
            imgSrc = "/assets/images/pic.jpg";
          }
          return {
            id: book?.id || "",
            title: book?.volumeInfo?.title || "",
            authors: book?.volumeInfo?.authors || ["Unknown"],
            publishedDate: book?.volumeInfo?.publishedDate || "",
            textSnippet: book?.searchInfo?.textSnippet || "",
            thumbnail: imgSrc,
            categories: book?.volumeInfo?.categories || ["Other"],
            pageCount: book?.volumeInfo?.pageCount || null,
          };
        });
      console.log(filteredBookData[0]);

      setResults(filteredBookData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchSearchedBooks();
  }, [searchValue, searchMode]);

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
        {results.map((result, id) => {
          return <ResultSectionCard key={result.id} result={result} />;
        })}
      </div>
    </section>
  );
};
