import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarInputContainerProps {
  rating: number;
  setRating: (value: number) => void;
}

export const StarInputContainer = ({
  rating,
  setRating,
}: StarInputContainerProps) => {
  const [hover, setHover] = useState<number>(0);
  return (
    <div className="card-star-container flex">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="starRating"
              value={currentRating}
              onClick={() => setRating(currentRating)}
              className="hidden"
            />
            <FaStar
              className={
                "cursor-pointer " +
                (currentRating <= (hover || rating)
                  ? "fill-yellow-500"
                  : "fill-slate-300")
              }
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};
