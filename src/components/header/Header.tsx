import { FaShoppingCart } from "react-icons/fa";
import Search from "../filterAndSort/Search";
import CategoryFilter from "../filterAndSort/CategoryFilter";
import Sort from "../filterAndSort/Sort";
import PriceRangeFilter from "../filterAndSort/PriceRangeFilter";
import "../../styles/_header.scss";
import Button from "../reusable/Button";

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
    <div className="header-wrapper">
      <div className="filter-sort-div">
        <Search onSearchProduct={setSearchProduct} />
        <CategoryFilter onCategoryChange={setSelectedCategory} />
        <Sort onSortingOptionChange={setSortOption} />
        <PriceRangeFilter
          onMinPriceChange={setMinPrice}
          onMaxPriceChange={setMaxPrice}
        />
      </div>
      <div className="button-div">
        {isAuthenticated ? (
          <Button onClick={logout} className="btn-logout">
            Logout
          </Button>
        ) : (
          <a href="/login" className="login-link">
            Login
          </a>
        )}
        <FaShoppingCart
          onClick={() => setOpenModal(true)}
          className="cart-icon"
        />
      </div>
    </div>
  );
}
