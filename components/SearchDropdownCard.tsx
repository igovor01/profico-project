import Image from "next/image";
import BookInfo from "@/types/interfaces/BookInfo";


export const SearchDropdownCard = ({ thumbnail, title, authors }: BookInfo) => {
  
  return (
    <div className="w-full py-2.5 px-5 text-start bg-white hover:bg-slate-200 flex flex-row py-4 cursor-pointer relative">
      <Image
        src={thumbnail}
        width={100}
        height={130}
        alt="book image"
        className="pr-4 drop-shadow-xl basis-1/6 h-max"
      />
      <div className="basis-5/6">
        <p className="text-lg font-bold block overflow-hidden text-ellipsis m-0 overflow-wrap text-ellipsis">
          {title}
        </p>
        <p className="text-sm font-normal block overflow-hidden text-ellipsis mb-1 mt-1 text-slate-500 overflow-wrap text-ellipsis">
          by{" "}
          {authors.map((author, index) => {
            return (index ? ", " : "") + author;
          })}
        </p>
      </div>
    </div>
  );
};
