"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookInfo from "@/types/interfaces/BookInfo";
import axios from "axios";
import React from "react";

const Book = () => {
  const router = useRouter();
  const { id } = useParams();
  console.log(id);
  const key = process.env.NEXT_PUBLIC_BOOK_API_KEY as string;
  const [bookInfo, setBookInfo] = useState<any>({});
  useEffect(() => {
    // Fetch book information based on the 'id' from an API, database, or local data
    // Replace this with your actual data retrieval logic
    const fetchBookInfo = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}?key=${key}`
        );
        console.log(response.data);
        console.log(response.data.volumeInfo.title);
        const book: BookInfo = response.data;
        let imgSrc: string;
        /*if (book?.volumeInfo?.imageLinks !== undefined) {
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

        //setResults(bookData);*/
      } catch (error) {
        console.error("Error fetching book information:", error);
      }
    };

    if (id) {
      fetchBookInfo();
    }
  }, [id]);

  if (!id) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{id}</h1>
      <p>{id}</p>
      {/* Add other book details as needed */}
    </div>
  );
};

export default Book;
