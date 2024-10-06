import { useState } from "react";
import Input from "../reusable/Input";
import { searchProducts } from "../../utils/api/api";
import { Product } from "../../utils/types/product";

interface SearchProps {
  onSearchProduct: (products: Product[]) => void;
}

export default function Search({ onSearchProduct }: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim()) {
      const result = await searchProducts(value);
      if (result) {
        onSearchProduct(result.products);
      } else {
        onSearchProduct([]);
      }
    } else {
      onSearchProduct([]);
    }
  };
  return (
    <div>
      <Input
        type="text"
        id="search-value"
        variant="search-input"
        placeholder="Search"
        value={searchValue}
        onChange={handleSearch}
      />
    </div>
  );
}
