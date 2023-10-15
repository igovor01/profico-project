import { BookItems } from "@/config/BookItems";
import BookCurrentElement from "./BookCurrentElement";

function CurrentlyReadingAside() {
  return (
    <aside className="flex flex-col w-1/3 items-start p-4 overflow-hidden bg-white h-fit mt-9 rounded-md shadow-xl">
      <span className="text-center text-md text-gray-800 m-0.5">
        CURRENTLY READING
      </span>
      <div className="whitespace-no-wrap overflow-hidden m-0.5">
        {BookItems.map((book, index) => (
          <BookCurrentElement
            key={index}
            title={book.title}
            author={book.author}
            src={book.src}
          />
        ))}
      </div>
    </aside>
  );
}

export default CurrentlyReadingAside;
