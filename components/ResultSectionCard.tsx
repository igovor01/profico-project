import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BookInfo from "@/types/interfaces/BookInfo";

interface ResultSectionCardProps {
  result: BookInfo;
}

export const ResultSectionCard = ({ result }: ResultSectionCardProps) => {
  return (
    <article className="flex m-4 p-8 rounded-3xl flex-1 bg-gradient-to-b from-orange-100 to-white">
      <Link href={`/book/${result.id}`}>
        <Image
          src={result.thumbnail}
          width={100}
          height={130}
          alt="book image"
          className="mr-8 rounded-md shadow-md hover:shadow-lg hover:-translate-y-16 hover:scale-110 transition-all duration-200 -translate-y-14"
        />
      </Link>
      <div className="basis-3/4">
        <Link href={`/book/${result.id}`}>
          <p className="text-xl font-black block overflow-hidden text-ellipsis m-0">
            {result.title}
          </p>
        </Link>
        <p className="text-sm font-normal block overflow-hidden text-ellipsis mb-1 mt-1 text-slate-500">
          by{" "}
          {result.authors &&
            result.authors.map((author, index) => {
              return (index ? ", " : "") + author;
            })}
        </p>
        <p className="text-xs font-light block overflow-hidden text-ellipsis mt-1 text-slate-500">
          {result.pageCount} pages • published: {result.publishedDate}
        </p>
        <button className="block my-2 w-36 px-2.5 py-1 rounded-md mr-5 bg-green-700 hover:bg-green-800 text-white hover:text-white transition duration-300 ease-in-out">
          Want to Read
        </button>

        <div className="mt-3 mb-4">
          {result.categories &&
            result.categories.map((author) => {
              return (
                <div
                  key={author}
                  className="inline-flex py-1.5 px-4 bg-orange-200 rounded-full text-center font-semibold text-xs mr-0.5 mt-1"
                >
                  {author}
                </div>
              );
            })}
        </div>
      </div>
    </article>
  );
};
