import { useState } from "react";
import ProductGrid from "../components/product/ProductGrid";
import { useProductContext } from "../context/ProductContext";
import Search from "../components/filter/Search";
import CategoryFilter from "../components/filter/CategoryFilter";
import Sort from "../components/sort/Sort";
import PriceRangeFilter from "../components/filter/PriceRangeFilter";
import Pagination from "../components/reusable/Pagination";
import { FaShoppingCart } from "react-icons/fa";
import Modal from "../components/reusable/Modal";
import CartItems from "../components/cart/CartItems";
import { useAuth } from "../context/AuthContext";

export default function ProductPage() {
  const { products, loading, totalProducts, currentPage, setCurrentPage } =
    useProductContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { logout, isAuthenticated } = useAuth();

  const productsPerPage = 20;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const filterAndSortProducts = () => {
    let currentProducts = [...products];

    if (selectedCategory) {
      currentProducts = currentProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (minPrice !== null) {
      currentProducts = currentProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice !== null) {
      currentProducts = currentProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    if (searchProduct) {
      currentProducts = currentProducts.filter((product) =>
        product.title.toLowerCase().includes(searchProduct.toLowerCase())
      );
    }

    if (sortOption) {
      currentProducts.sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "title-asc") return a.title.localeCompare(b.title);
        if (sortOption === "title-desc") return b.title.localeCompare(a.title);
        return 0;
      });
    }

    return currentProducts;
  };
  const paginatedProducts = () => {
    const filteredProducts = filterAndSortProducts();
    return filteredProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
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
      <ProductGrid products={paginatedProducts()} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {openModal && (
        <Modal
          title="Your cart"
          buttonText="OK"
          onClose={() => setOpenModal(false)}
          open={openModal}
        >
          <CartItems />
        </Modal>
      )}
    </div>
  );
}
