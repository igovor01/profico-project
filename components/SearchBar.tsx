import { FaSearch } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import BookInfo from "@/types/interfaces/BookInfo";
import Link from "next/link";

interface SearchBarProps {
  setSearchValue: (value: string) => void;
  setResults: (arr: BookInfo[]) => void;
  toggleResultSection: () => void;
}

export const SearchBar = ({
  setSearchValue,
  setResults,
  toggleResultSection,
}: SearchBarProps) => {
  const [input, setInput] = useState("");
  const key = process.env.NEXT_PUBLIC_BOOK_API_KEY as string;

  const handleSearchClick = () => {
    setInput("");
    setResults([]);
    setSearchValue(input);
    toggleResultSection();
  };

  const fetchSearchedBooks = async (value: string) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${value}&key=${key}&maxResults=10`
      );
      console.log(response.data.items);
      const items = response.data?.items || [];
      console.log(items);
      const bookData: BookInfo[] = items
        .filter((item: any) => {
          console.log("okay");
          return (
            item &&
            item.volumeInfo.title &&
            item.volumeInfo.authors &&
            (item.volumeInfo.title.toLowerCase().includes(value) ||
              item.volumeInfo.authors.filter((author: string) =>
                author.toLowerCase().includes(value)
              ))
          );
        })
        .map((book: any) => {
          console.log("okay2");
          let imgSrc: string;
          if (book?.volumeInfo?.imageLinks != undefined) {
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

  const handleChange = (value: string) => {
    setInput(value);
    if (value != "") {
      fetchSearchedBooks(value);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search flex items-center justify-center bg-white rounded-md w-full">
      <input
        type="text"
        placeholder="Enter Your Book Name"
        className="outline-none border-none w-80 h-9 py-0 px-2.5 text-base font-bold"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Link href="#searchResults">
        <button
          className="outline-none border-none h-9 py-0 px-2.5 bg-white"
          onClick={handleSearchClick}
        >
          <FaSearch />
        </button>
      </Link>
    </div>
  );
};
