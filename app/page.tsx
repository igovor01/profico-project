"use client";
import CurrentlyReadingAside from "@/components/CurrentlyReadingAside";
import { ReviewFeed } from "@/components/ReviewFeed";
import { WriteReview } from "@/components/WriteReview";
import { useState } from "react";
import Review from "@/types/interfaces/Review";
import BookInfo from "@/types/interfaces/BookInfo";

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleAddPost = (text: string, rating: number, book: BookInfo) => {
    const newReview = { id: Date.now(), text, rating, book };
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="flex px-60">
      <CurrentlyReadingAside />
      <main className="w-2/3 p-8 ">
        <WriteReview onSubmit={handleAddPost} />
        <ReviewFeed reviews={reviews} />
      </main>
    </div>
  );
}
