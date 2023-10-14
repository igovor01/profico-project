import ReviewContainer from "./ReviewContainer";
import Review from "@/types/interfaces/Review";

interface ReviewFeedProps {
  reviews: Review[];
}
export const ReviewFeed: React.FC<ReviewFeedProps> = ({ reviews }) => {
  return (
    <>
      {reviews.map((review, index) => (
        <ReviewContainer key={index} {...review} />
      ))}
    </>
  );
};
