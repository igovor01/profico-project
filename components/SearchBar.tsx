import { FaSearch, FaChevronDown } from "react-icons/fa";
import React, { useState } from "react";
import axios from "axios";
import BookInfo from "@/types/interfaces/BookInfo";
import { SEARCH_URL, MAX_RESULTS_SEARCH_BAR } from "@/config/constants";
import { SearchModeList } from "@/config/SearchModeList";
import SearchMode from "@/types/interfaces/SearchMode";

interface SearchBarProps {
  setSearchValue: (value: string) => void;
  setResults: (arr: BookInfo[]) => void;
  toggleResultSection: () => void;
  setCurrentSearchMode: (value: SearchMode) => void;
}

export const SearchBar = ({
  setSearchValue,
  setResults,
  toggleResultSection,
  setCurrentSearchMode,
}: SearchBarProps) => {
  const [input, setInput] = useState("");
  const [isOpen, toggleOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<SearchMode>({
    modeKeyword: "",
    label: "Everything",
  });
  const key = process.env.NEXT_PUBLIC_BOOK_API_KEY as string;

  const handleSearchClick = () => {
    setInput("");
    setCurrentSearchMode(searchMode);
    setResults([]);
    setSearchValue(input);
    toggleResultSection();
  };

  const fetchSearchedBooks = async (value: string) => {
    try {
      const url =
        SEARCH_URL +
        (searchMode.label == "Everything" ? "" : searchMode.modeKeyword + ":") +
        value +
        "&key=" +
        key +
        "&maxResults=" +
        MAX_RESULTS_SEARCH_BAR;
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

  const handleChange = (value: string) => {
    setInput(value);
    if (value != "") {
      fetchSearchedBooks(value);
    } else {
      setResults([]);
    }
  };

  function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  const changeSearchMode = (value: SearchMode) => {
    setSearchMode(value);
    toggleOpen(!isOpen);
  };

  return (
    <div className="w-fit flex bg-white min-w-max items-center rounded-full block">
      <div className="relative w-72 rounded-full border border-white bg-violet-900 shadow-orange-950 cursor-pointer z-10">
        <div
          onClick={() => toggleOpen(!isOpen)}
          className="flex items-center justify-between text-base font-medium text-white py-4 px-6"
        >
          <span>{capitalizeFirstLetter(searchMode.label)}</span>
          <FaChevronDown
            className={
              isOpen
                ? "rotate-180 transition-all duration-500"
                : "transition-all duration-500"
            }
          />
        </div>
        <ul
          className={
            "absolute top-16 left-0 w-full rounded-2xl bg-white text-left overflow-hidden " +
            (isOpen
              ? "max-h-72 transition-all duration-500"
              : "max-h-0 transition-all duration-500")
          }
        >
          {SearchModeList.map((item) => (
            <li
              key={item.modeKeyword}
              onClick={() => changeSearchMode(item)}
              className="text-sm font-medium py-4 pl-6 cursor-pointer hover:ml-2 hover:text-orange-500 transition-all ease-in duration-200 "
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center pr-4 w-full text-violet-900">
        <input
          type="text"
          value={input}
          placeholder={
            searchMode.label == "Everything"
              ? "Search anything..."
              : `Search for ${searchMode.label}...`
          }
          className="p-4 w-full text-base font-medium border-none outline-none placeholder:italic placeholder:text-violet-200"
          onChange={(e) => handleChange(e.target.value)}
        />
        <FaSearch
          className="text-xl cursor-pointer"
          onClick={handleSearchClick}
        />
      </div>
    </div>
    /* <div className="search flex items-center justify-center bg-white rounded-md w-full">
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
    </div>*/
  );
};
