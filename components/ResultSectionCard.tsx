import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import BookInfo from "@/types/interfaces/BookInfo";

interface ResultSectionCardProps {
  result: BookInfo;
}

export const ResultSectionCard = ({ result }: ResultSectionCardProps) => {
  return (
    <Link
      href={`/book/${result.id}`}
      className="p-5 text-start hover:bg-slate-200 flex flex-row py-4 relative w-full"
    >
      <Image
        src={result.thumbnail}
        width={100}
        height={130}
        alt="book image"
        className="pr-4 drop-shadow-xl basis-1/4"
      />
      <div className="basis-3/4">
        <p className="text-sm font-medium block">{result.title}</p>
        <p className="text-sm block">
          by{" "}
          {result.authors.map((author, index) => {
            return (index ? ", " : "") + author;
          })}
        </p>
        <p className="text-sm block">published: {result.publishedDate}</p>
        <p className="text-sm block">{result.textSnippet}</p>
      </div>
    </Link>
  );
};
