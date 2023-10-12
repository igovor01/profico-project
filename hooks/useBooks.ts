import { useEffect, useState } from "react";
import { SEARCH_URL } from "@/config/constants";
import SearchMode from "@/types/interfaces/SearchMode";
import BookInfo from "@/types/interfaces/BookInfo";
import axios from "axios";

const key = process.env.NEXT_PUBLIC_BOOK_API_KEY as string;

const useBooks = (
  searchMode: SearchMode,
  searchValue: string,
  maxResults: number
) => {
  const [books, setBooks] = useState<BookInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const url =
    SEARCH_URL +
    (searchMode.label == "Everything" ? "" : searchMode.modeKeyword + ":") +
    searchValue +
    "&key=" +
    key +
    "&maxResults=" +
    maxResults;

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(url);
      if (!response) {
        throw new Error("Something went wrong while fetching books");
      }
      const data = response.data;
      const items = data?.items || [];
      const filteredBookData: BookInfo[] = items
        .filter((item: any) => {
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

      setBooks(filteredBookData);
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [searchMode, searchValue]);

  return { books, isLoading, error };
};

export default useBooks;
