import { useState } from "react";
import BookInfo from "@/types/interfaces/BookInfo";
import { SearchBarSimple } from "./SearchBarSimple";
import { SearchDropdown } from "./SearchDropdown";

interface SearchElementsProps {
  onClick: (val: BookInfo) => void;
}

const SearchElements = ({ onClick }: SearchElementsProps) => {
  const [results, setResults] = useState<BookInfo[]>([]);
  const [isResultSectionVisible, setResultSectionVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const toggleResultSection = () => {
    if (!isResultSectionVisible) {
      setResultSectionVisible(!isResultSectionVisible);
    }
  };

  return (
    <section className="h-96 w-96">
      <SearchBarSimple
        setSearchValue={setSearchValue}
        setResults={setResults}
        toggleResultSection={toggleResultSection}
      />
      {results && <SearchDropdown onClick={onClick} results={results} />}
    </section>
  );
};

export default SearchElements;
