"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StarInputContainer } from "./StarInputContainer";

export interface WriteReviewProps {
  onSubmit: (text: string, rating: number) => void;
}

export const WriteReview: React.FC<WriteReviewProps> = ({ onSubmit }) => {
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);

  const handleAddPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(text, rating);
    setText("");
    setRating(0);
  };
  return (
    <form onSubmit={handleAddPost} className="w-full bg-white rounded-md p-2.5">
      <div className="user-profile flex items-center">
        <Image
          src="/user-svg.svg"
          alt="user image"
          width={32}
          height={32}
          className="rounded-full mx-5 mt-2"
        />
        <div>
          <p className="font-semibold">Jane Doe</p>
          <StarInputContainer rating={rating} setRating={setRating} />
        </div>
      </div>

      <div className="post-input-container pl-5 pt-5 flex mt-5">
        <div className="bg-orange-50 p-5 mr-5 w-28 h-36 border border-orange-950 flex items-center justify-center">
          <a href="#" className="text-sm text-center">
            Choose a book
          </a>
        </div>
        <textarea
          rows={3}
          placeholder="What did you think about this book?"
          name="postContent"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full border-b-2 outline-none mb-0 mx-5 resize-none focus:border-orange-950 transition duration-300 ease-in-out"
        ></textarea>
        <span className="error-message"></span>
      </div>
      <button
        type="submit"
        className="add-post-button block ml-auto mr-0 mt-2.5 px-2.5 py-1 border border-orange-950 rounded-md mr-5 bg-transparent hover:bg-orange-950 text-orange-950 hover:text-white transition duration-300 ease-in-out"
      >
        Post review
      </button>
    </form>
  );
};
