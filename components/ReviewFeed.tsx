import ReviewContainer from "./ReviewContainer";

interface Review {
  id: number;
  text: string;
  rating: number;
}

interface ReviewFeedProps {
  reviews: Review[];
}
export const ReviewFeed: React.FC<ReviewFeedProps> = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review, index) => (
        <ReviewContainer key={index} review={review} />
      ))}
    </div>
  );
};
