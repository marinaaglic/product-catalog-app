import { useState, useEffect } from "react";
import { fetchProducts } from "../../utils/api/api";
import ProductCard from "./ProductCard";
import { Product } from "../../utils/types";
import "../../styles/_productGrid.scss";
import Filter from "../filter/Filter";
import Sort from "../sort/Sort";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>("");

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      if (data) {
        setProducts(data.products);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    let currentProducts = [...products];

    if (selectedCategory) {
      currentProducts = currentProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (sortOption) {
      currentProducts.sort((a, b) => {
        if (sortOption === "price-asc") {
          return a.price - b.price;
        } else if (sortOption === "price-desc") {
          return b.price - a.price;
        } else if (sortOption === "title-asc") {
          return a.title.localeCompare(b.title);
        } else if (sortOption === "title-desc") {
          return b.title.localeCompare(a.title);
        }
        return 0;
      });
    }
    setFilteredProducts(currentProducts);
  }, [selectedCategory, sortOption, products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortOption = (option: string) => {
    setSortOption(option);
  };

  if (!products) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="div-filter-sort">
        <Filter onCategoryChange={handleCategoryChange} />
        <Sort onSortingOptionChange={handleSortOption} />
      </div>
      <div className="grid-product">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
