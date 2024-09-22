import { FaShoppingCart } from "react-icons/fa";
import Search from "../filterAndSort/Search";
import CategoryFilter from "../filterAndSort/CategoryFilter";
import Sort from "../filterAndSort/Sort";
import PriceRangeFilter from "../filterAndSort/PriceRangeFilter";

interface HeaderProps {
  setSearchProduct: (search: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortOption: (option: string) => void;
  setMinPrice: (price: number | null) => void;
  setMaxPrice: (price: number | null) => void;
  setOpenModal: (open: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export default function Header({
  setSearchProduct,
  setSelectedCategory,
  setSortOption,
  setMinPrice,
  setMaxPrice,
  setOpenModal,
  logout,
  isAuthenticated,
}: HeaderProps) {
  return (
    <div className="div-filter-sort">
      <Search onSearchProduct={setSearchProduct} />
      <CategoryFilter onCategoryChange={setSelectedCategory} />
      <Sort onSortingOptionChange={setSortOption} />
      <PriceRangeFilter
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
      />
      <FaShoppingCart
        onClick={() => setOpenModal(true)}
        className="cart-icon"
      />
      {isAuthenticated && (
        <button onClick={logout} className="btn-logout">
          Logout{" "}
        </button>
      )}
    </div>
  );
}
