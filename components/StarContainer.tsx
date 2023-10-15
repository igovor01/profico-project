import { FaStar } from "react-icons/fa";

interface StarContainerProps {
  rating: number;
}

export const StarContainer = ({ rating }: StarContainerProps) => {
  return (
    <div className="card-star-container  flex cursor-pointer mt-2.5">
      {[...Array(5)].map((star, index) => {
        return (
          <label key={index}>
            <FaStar
              className={
                "cursor-pointer " +
                (index + 1 <= rating ? "fill-yellow-500" : "fill-slate-300")
              }
            />
          </label>
        );
      })}
    </div>
  );
};
