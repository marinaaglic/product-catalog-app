import { useState } from "react";
import ProductGrid from "../components/product/ProductGrid";
import { useProductContext } from "../context/ProductContext";
import Pagination from "../components/reusable/Pagination";
import Modal from "../components/reusable/Modal";
import CartItems from "../components/cart/CartItems";
import { useUserContext } from "../context/UserContext";
import Header from "../components/header/Header";

export default function ProductPage() {
  const { products, loading, currentPage, setCurrentPage, totalProducts } =
    useProductContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [searchProduct, setSearchProduct] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { logout, isAuthenticated } = useUserContext();

  const filterAndSortProducts = () => {
    let currentProducts = [...products];

    if (selectedCategory) {
      currentProducts = currentProducts.filter(
        (product) => product.category === selectedCategory
      );
      setCurrentPage(1);
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
  const filteredProducts = filterAndSortProducts();
  const productsPerPage = 20;
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header
        setSearchProduct={setSearchProduct}
        setSelectedCategory={setSelectedCategory}
        setSortOption={setSortOption}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setOpenModal={setOpenModal}
        logout={logout}
        isAuthenticated={isAuthenticated}
      />

      <ProductGrid products={filteredProducts} />
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
