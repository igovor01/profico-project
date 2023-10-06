import React, { useEffect, useState } from "react";
import { ResultSectionCard } from "./ResultSectionCard";
import BookInfo from "@/types/interfaces/BookInfo";
import axios from "axios";

interface ResultSectionProps {
  searchValue: string;
}

export const ResultSection = ({ searchValue }: ResultSectionProps) => {
  const [results, setResults] = useState<BookInfo[]>([]);
  const key = process.env.NEXT_PUBLIC_BOOK_API_KEY as string;

  const fetchSearchedBooks = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchValue}&key=${key}&maxResults=40`
      );
      console.log(response.data.items);
      const items = response.data?.items || [];
      const bookData: BookInfo[] = items
        .filter((item: any) => {
          return (
            item &&
            item.volumeInfo.title &&
            item.volumeInfo.authors &&
            item.volumeInfo.title.toLowerCase().includes(searchValue)
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
            authors: book?.volumeInfo?.authors || "",
            publishedDate: book?.volumeInfo?.publishedDate || "",
            textSnippet: book?.searchInfo?.textSnippet || "",
            thumbnail: imgSrc,
          };
        });
      console.log(bookData[0]);

      setResults(bookData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchSearchedBooks();
  }, [searchValue]);

  return (
    <section
      id="resultSection"
      className="search flex  flex-col justify-center items-center"
    >
      <h1 className="my-6 text-xl font-medium">
        Search results for{" "}
        <span className="italic">&quot;{searchValue}&quot;</span>
      </h1>
      <div className="w-full px-16">
        {results.map((result, id) => {
          return <ResultSectionCard key={id} result={result} />;
        })}
      </div>
    </section>
  );
};
