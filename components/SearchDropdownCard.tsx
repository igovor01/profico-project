import Image from "next/image";
import BookInfo from "@/types/interfaces/BookInfo";
import Link from "next/link";

interface BookInfoProps {
  book: BookInfo;
  onClick: (val: BookInfo) => void;
}

export const SearchDropdownCard = ({ book, onClick }: BookInfoProps) => {
  return (
    <Link
      href={`/book/${book.id}`}
      className="w-full py-2.5 px-5 text-start bg-white hover:bg-slate-200 flex flex-row py-4 cursor-pointer relative"
      onClick={() => onClick(book)}
    >
      <Image
        src={book.thumbnail}
        width={100}
        height={130}
        alt="book image"
        className="pr-4 drop-shadow-xl basis-1/6 h-max"
      />
      <div className="basis-5/6">
        <p className="text-lg font-bold block overflow-hidden text-ellipsis m-0 overflow-wrap text-ellipsis">
          {book.title}
        </p>
        <p className="text-sm font-normal block overflow-hidden text-ellipsis mb-1 mt-1 text-slate-500 overflow-wrap text-ellipsis">
          by{" "}
          {book.authors.map((author, index) => {
            return (index ? ", " : "") + author;
          })}
        </p>
      </div>
    </Link>
  );
};
