import Image from "next/image";
import BookInfo from "@/types/interfaces/BookInfo";

interface SearchDropdownCardProps {
  result: BookInfo;
}

export const SearchDropdownCard = ({ result }: SearchDropdownCardProps) => {
  return (
    <div className="py-2.5 px-5 text-start bg-orange-200 hover:bg-slate-200 flex flex-row py-4 cursor-pointer relative">
      <Image
        src={result.thumbnail}
        width={100}
        height={130}
        alt="book image"
        className="pr-4 drop-shadow-xl"
      />
      <div className="">
        <p className="text-lg font-bold block overflow-hidden text-ellipsis m-0 overflow-wrap text-ellipsis">
          {result.title}
        </p>
        <p className="text-sm font-normal block overflow-hidden text-ellipsis mb-1 mt-1 text-slate-500 overflow-wrap text-ellipsis">
          by{" "}
          {result.authors.map((author, index) => {
            return (index ? ", " : "") + author;
          })}
        </p>
      </div>
    </div>
  );
};
