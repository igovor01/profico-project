import { FaSearch, FaChevronDown } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import BookInfo from "@/types/interfaces/BookInfo";
import { SEARCH_URL, MAX_RESULTS_SEARCH_BAR } from "@/config/constants";

interface SearchBarProps {
  setSearchValue: (value: string) => void;
  setResults: (arr: BookInfo[]) => void;
  toggleResultSection: () => void;
}

export const SearchBarSimple = ({
  setSearchValue,
  setResults,
  toggleResultSection,
}: SearchBarProps) => {
  const [input, setInput] = useState("");
  const [isOpen, toggleOpen] = useState(false);
  const key = process.env.NEXT_PUBLIC_BOOK_API_KEY as string;

  const handleSearchClick = () => {
    setInput("");
    setResults([]);
    setSearchValue(input);
    toggleResultSection();
  };

  const handleChange = (value: string) => {
    setInput(value);
    if (value != "") {
      fetchSearchedBooks(value);
    } else {
      setResults([]);
    }
  };

  const fetchSearchedBooks = async (value: string) => {
    try {
      const url =
        SEARCH_URL +
        value +
        "&key=" +
        key +
        "&maxResults=" +
        MAX_RESULTS_SEARCH_BAR;

      const response = await axios.get(url);
      const items = response.data?.items || [];

      const filteredBookData: BookInfo[] = items
        .filter((item: any) => {
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
          let imgSrc: string;
          if (book?.volumeInfo?.imageLinks != undefined) {
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

      setResults(filteredBookData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-96 p-2 text-violet-900 flex bg-white min-w-max items-center rounded-full block justify-center">
      <input
        type="text"
        value={input}
        placeholder="Search anything..."
        className="p-4 w-full text-base font-medium border-none outline-none placeholder:italic placeholder:text-violet-200"
        onChange={(e) => handleChange(e.target.value)}
      />
      <FaSearch
        className="text-xl cursor-pointer"
        onClick={handleSearchClick}
      />
    </div>
  );
};
