"use client";
import React from "react";

import { useEffect, useState } from "react";
import Image from "next/image";

interface MyComponentProps {
  title: string;
  author: string;
  src: string;
}

function BookCurrentElement({ title, author, src }: MyComponentProps) {
  const [progress, setProgress] = useState(0);
  const [isInputVisible, setInputVisible] = useState(false);

  const toggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value, 10);
    setProgress(newProgress);
  };
  return (
    <div className="flex flex-row py-4 relative">
      <Image
        src={src}
        width={100}
        height={130}
        alt="book image"
        className="pr-4 drop-shadow-xl"
      />
      <div className="flex flex-col space-y-1.5">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-sm">by {author}</p>
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="w-20 h-2.5 bg-gray-300">
            <div
              className="h-full bg-orange-950"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm">{progress}%</p>
        </div>
        <button
          onClick={toggleInput}
          className="bg-transparent hover:bg-orange-950 text-orange-950 hover:text-white border border-orange-950 font-semibold pb-0.5 px-0.5 rounded-md transition duration-300 ease-in-out"
        >
          <span className="text-xs">Update progress</span>
        </button>
        {isInputVisible && (
          <div className="absolute p-2 bg-white border border-orange-950 rounded-md shadow-md space-x-2 text-xs right-4 -bottom-4 z-50">
            Currently
            <input
              type="number"
              value={progress}
              onChange={handleProgressChange}
              className="border border-gray-300 rounded-md mx-2 px-3 py-1 w-14"
              placeholder="Enter a number"
            />
            % done
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCurrentElement;
