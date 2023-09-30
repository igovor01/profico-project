import { BookItems } from "@/config/BookItems";
import BookCurrentElement from "./BookCurrentElement";

function CurrentlyReadingAside() {
  return (
    <aside className="flex flex-col w-1/4  items-start h-screen p-4 overflow-hidden">
      <span className="text-center text-md text-gray-800">
        CURRENTLY READING
      </span>
      <div className="whitespace-no-wrap overflow-hidden">
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
