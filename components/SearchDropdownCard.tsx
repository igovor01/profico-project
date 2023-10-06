import Image from "next/image";
import BookInfo from "@/types/interfaces/BookInfo";

interface SearchDropdownCardProps {
  result: BookInfo;
}

export const SearchDropdownCard = ({ result }: SearchDropdownCardProps) => {
  return (
    <div className="py-2.5 px-5 text-start hover:bg-slate-200 flex flex-row py-4 relative">
      <Image
        src={result.thumbnail}
        width={100}
        height={130}
        alt="book image"
        className="pr-4 drop-shadow-xl basis-1/4"
      />
      <div className="basis-3/4">
        <p className="text-sm font-medium block">{result.title}</p>
        <p className="text-sm block">
          by{" "}
          {result.authors.map((author, index) => {
            return (index ? ", " : "") + author;
          })}
        </p>
      </div>
    </div>
  );
};
