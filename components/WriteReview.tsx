"use client";
import React, { useState } from "react";
import Image from "next/image";
import { StarInputContainer } from "./StarInputContainer";
import Modal from "./Modal";
import SearchElements from "./SearchElements";
import BookInfo from "@/types/interfaces/BookInfo";
import useAuth from "@/hooks/useAuth";

export interface WriteReviewProps {
  onSubmit: (text: string, rating: number, book: BookInfo) => void;
}

export const WriteReview: React.FC<WriteReviewProps> = ({ onSubmit }) => {
  const [text, setText] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [showModal, setShowModal] = useState<Boolean>(false);
  const [selectedBook, setSelectedBook] = useState<BookInfo>();

  const { user } = useAuth();
  const imgSrc = user ? user.avatar : "/user-svg.svg";

  const handleBookSelected = (book: BookInfo) => {
    setSelectedBook(book);
    setShowModal(false);
  };

  const emptySelectedBook: BookInfo = {
    id: "",
    title: "",
    authors: [],
    publishedDate: "",
    textSnippet: "",
    thumbnail: "",
    categories: [],
    pageCount: 0,
  };

  const handleAddPost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedBook?.id && text && rating) {
      onSubmit(text, rating, selectedBook);
      setText("");
      setRating(0);
      setSelectedBook(emptySelectedBook);
    } else {
      return false;
    }
  };
  return (
    <>
      <form
        onSubmit={handleAddPost}
        className="w-full bg-white rounded-md p-5 shadow-xl "
      >
        <div className="user-profile flex items-center">
          <Image
            src={imgSrc}
            alt="user image"
            width={32}
            height={32}
            className="rounded-full mx-2 mt-2"
          />
          <div>
            <p className="font-semibold">{user?.name}</p>
            <StarInputContainer rating={rating} setRating={setRating} />
          </div>
        </div>

        <div className="post-input-container pl-5 pt-5 flex mt-5">
          <div className="bg-orange-50 mr-5 w-32 h-36 border border-orange-950 flex items-center justify-center">
            {selectedBook?.id ? (
              <Image
                height={144}
                width={128}
                alt="book-thumbnail"
                src={selectedBook.thumbnail}
                className="h-full"
              />
            ) : (
              <span
                className="text-sm text-center cursor-pointer p-5"
                onClick={() => setShowModal(true)}
              >
                Choose a book
              </span>
            )}
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
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <SearchElements onClick={handleBookSelected} />
      </Modal>
    </>
  );
};
