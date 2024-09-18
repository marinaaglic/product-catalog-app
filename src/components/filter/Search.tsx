import { useState } from "react";
import Input from "../reusable/Input";

interface SearchProps {
  onSearchProduct: (name: string) => void;
}

export default function Search({ onSearchProduct }: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (!value) {
      onSearchProduct(value);
    }
  };
  return (
    <div>
      <Input
        type="text"
        id="search-value"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
}
