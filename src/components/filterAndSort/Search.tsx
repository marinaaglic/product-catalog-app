import { useState } from "react";
import Input from "../reusable/Input";
import { searchProducts } from "../../utils/api/api";
import { Product } from "../../utils/types/product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

interface SearchProps {
  onSearchProduct: (products: Product[]) => void;
}

export default function Search({ onSearchProduct }: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim()) {
      try {
        const result = await searchProducts(value);
        if (result) {
          onSearchProduct(result.products);
        } else {
          onSearchProduct([]);
        }
      } catch (error) {
        toast.error(
          "An error occurred while searching for products. Please try again."
        );
      }
    } else {
      onSearchProduct([]);
    }
  };
  return (
    <div>
      <ToastContainer />
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
