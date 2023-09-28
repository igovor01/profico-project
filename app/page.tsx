"use client";
import CurrentlyReadingAside from "@/components/CurrentlyReadingAside";
import ReviewContainer from "@/components/ReviewContainer";
import { ReviewFeed } from "@/components/ReviewFeed";
import { WriteReview } from "@/components/WriteReview";
import { useState } from "react";

interface Review {
  id: number;
  text: string;
  rating: number;
}

export default function Home() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const handleAddPost = (text: string, rating: number) => {
    const newReview = { id: Date.now(), text, rating };
    setReviews([...reviews, newReview]);
  };
  return (
    <div className="flex px-60">
      <CurrentlyReadingAside />
      <main className="w-3/4 p-8 ">
        <WriteReview onSubmit={handleAddPost} />
        <ReviewFeed reviews={reviews} />
      </main>
    </div>
  );
}
