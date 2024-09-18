import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "../../utils/types";
import "../../styles/_productGrid.scss";
import CategoryFilter from "../filter/CategoryFilter";
import Sort from "../sort/Sort";
import PriceRangeFilter from "../filter/PriceRangeFilter";
import { useProductContext } from "../../context/ProductContext";

export default function ProductGrid() {
  const { products, loading } = useProductContext();
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
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
        (products) => products.price <= maxPrice
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
  }, [selectedCategory, sortOption, products, minPrice, maxPrice]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSortOption = (option: string) => {
    setSortOption(option);
  };

  const handleMinPriceChange = (price: number) => {
    setMinPrice(price);
  };

  const handleMaxPriceChange = (price: number) => {
    setMaxPrice(price);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="div-filter-sort">
        <CategoryFilter onCategoryChange={handleCategoryChange} />
        <Sort onSortingOptionChange={handleSortOption} />
        <PriceRangeFilter
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
        />
      </div>
      <div className="grid-product">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
