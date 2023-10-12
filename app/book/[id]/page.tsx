"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BookInfo from "@/types/interfaces/BookInfo";
import axios from "axios";
import React from "react";

const Book = () => {
  const { id } = useParams();
  const key = process.env.NEXT_PUBLIC_BOOK_API_KEY as string;
  const [bookInfo, setBookInfo] = useState<any>({});
  const fetchBookInfo = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${key}`
      );
      const bookData: BookInfo = response.data;
    } catch (error) {
      console.error("Error fetching book information:", error);
    }
  };

  useEffect(() => {
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
      {/* In progress */}
    </div>
  );
};

export default Book;
