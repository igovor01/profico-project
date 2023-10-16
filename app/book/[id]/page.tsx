"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Image from "next/image";
import BookInfoComplete from "@/types/interfaces/BookInfoComplete";
import Link from "next/link";

const emptyBookDetails: BookInfoComplete = {
  id: "",
  title: "",
  authors: ["Unknown"],
  publishedDate: "",
  textSnippet: "",
  thumbnail: "",
  categories: ["Other"],
  pageCount: 0,
  description: "",
  googleBooksLink: "",
};

const Book = () => {
  const { id } = useParams();
  const key = process.env.NEXT_PUBLIC_BOOK_API_KEY as string;
  const [bookDetails, setBookDetails] =
    useState<BookInfoComplete>(emptyBookDetails);

  const fetchBookInfo = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}?key=${key}`
      );
      const book: any = response.data;
      console.log(book);
      const bookObject: BookInfoComplete = {
        id: book?.id || "",
        title: book?.volumeInfo?.title || "",
        authors: book?.volumeInfo?.authors || ["Unknown"],
        publishedDate: book?.volumeInfo?.publishedDate || "",
        textSnippet: book?.searchInfo?.textSnippet || "",
        thumbnail:
          book?.volumeInfo?.imageLinks?.extraLarge ||
          book?.volumeInfo?.imageLinks?.large ||
          book?.volumeInfo?.imageLinks?.medium ||
          book?.volumeInfo?.imageLinks?.small ||
          book?.volumeInfo?.imageLinks?.thumbnail ||
          "/assets/images/pic.jpg",
        categories: book?.volumeInfo?.categories || ["Other"],
        pageCount: book?.volumeInfo?.pageCount || null,
        description: book?.volumeInfo?.description || "",
        googleBooksLink: book?.previewLink || "",
      };
      setBookDetails(bookObject);
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
    <div className="bg-gradient-to-b from-orange-200 to-amber-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="w-[350px] h-auto mx-auto rounded-lg bg-gray-300 mb-4">
              <Image
                width={500}
                height={500}
                className="w-full h-full object-cover"
                src={bookDetails.thumbnail}
                alt="Book Image"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold mb-2">{bookDetails.title}</h2>
            <p className="text-gray-600 text-sm mb-4">
              by{" "}
              {bookDetails.authors &&
                bookDetails.authors.map((author, index) => {
                  return (index ? ", " : "") + author;
                })}
            </p>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700">Pages: </span>
                <span className="text-gray-600">{bookDetails.pageCount}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Published: </span>
                <span className="text-gray-600">
                  {bookDetails.publishedDate}
                </span>
              </div>
            </div>
            <div>
              <span className="font-bold text-gray-700">Book Description:</span>
              <p className="text-gray-600 text-sm mt-2">
                {bookDetails.description}
              </p>
            </div>
            <div className="flex -mx-2 mb-4 mt-5 ">
              <div className="w-1/2 px-2">
                <button className="w-[250px] bg-green-700 text-white py-2 px-4 rounded-md font-bold hover:bg-gray-800">
                  Want to Read
                </button>
              </div>
              <div className="w-1/2 px-2">
                <Link href={bookDetails.googleBooksLink}>
                  <button className="w-[250px] bg-gray-400 text-gray-800 py-2 px-4 rounded-md font-bold hover:bg-gray-300">
                    View on Google Books
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
