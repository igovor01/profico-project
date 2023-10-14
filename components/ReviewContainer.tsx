"use client";
import { useState } from "react";
import { FaRegHeart, FaRegComments, FaRegBookmark } from "react-icons/fa";
import Image from "next/image";

import { StarContainer } from "./StarContainer";

interface Review {
  id: number;
  text: string;
  rating: number;
}

export const ReviewContainer = ({ id, text, rating }: Review) => {
  const date: Date = new Date();

  const day: number = date.getDate();
  const month: number = date.getMonth() + 1;
  const year: number = date.getFullYear();
  const hour: number = date.getHours();
  const minute: number = date.getMinutes();

  let currentDate = `${day}.${month}.${year} ${hour}:${minute}`;

  return (
    <article
      className="post-container w-full break-all bg-white rounded-md p-2.5 my-5"
      key={id}
    >
      <div className="user-profile flex items-center">
        <Image
          src="/user-svg.svg"
          alt="user image"
          width={32}
          height={32}
          className="rounded-full mx-5 mt-2"
        />
        <div>
          <div className="flex space-x-1.5">
            <p className="font-semibold">Jane Doe</p>
            <p>reviewed</p>
            <p className="font-semibold">Book Title</p>
          </div>
          <span className="text-sm">{currentDate}</span>
        </div>
      </div>
      <div className="review m-4">
        <StarContainer rating={rating} />
        <p className="post-text my-3.5 text-base">{text}</p>
        <div className="book-details border p-5 flex mt-5">
          <Image
            src="/assets/images/book-1.jpg"
            height={144}
            width={100}
            alt="book image"
            className="post-img mr-5 w-28 h-36 border border-orange-950 "
          />
          <div className="flex flex-col justify-items-start ">
            <p> Book Title</p>
            <p className="text-sm"> by Book Author</p>
            <button className="block my-2 w-36 px-2.5 py-1 rounded-md mr-5 bg-green-700 hover:bg-green-800 text-white hover:text-white transition duration-300 ease-in-out">
              Want to Read
            </button>
            <p>
              Little bit about this book, part of the synopsis.Little bit about
              this book, part of the synopsis.Little bit about this book, part
              of the synopsis.Little bit about this book, part of the
              synopsis.Little bit about this book, part of the synopsis.Little
              bit about this book, part of the synopsis.Little bit about this
              book, part of the synopsis.Little bit about this book, part of the
              synopsis.Little bit about this book, part of the synopsis.Little
              bit about this book, part of the synopsis.
            </p>
          </div>
        </div>
      </div>
      <div className="activity-icons flex items-center justify-start">
        <div className="inline-flex items-center mr-7 text-base">
          <FaRegHeart className="w-4 mr-2.5"></FaRegHeart> <span>0</span>
        </div>
        <div className="inline-flex items-center mr-7 text-base">
          <FaRegComments className="w-4 mr-2.5"></FaRegComments>
          <span>0</span>
        </div>
        <div className="inline-flex items-center mr-7 text-base">
          <FaRegBookmark className="w-4 mr-2.5"></FaRegBookmark>
          <span>0</span>
        </div>
      </div>
    </article>
  );
};

export default ReviewContainer;
