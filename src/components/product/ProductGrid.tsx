import { useState, useEffect } from "react";
import { fetchProducts } from "../../utils/api/api";
import ProductCard from "./ProductCard";
import { Product } from "../../utils/types";
import "../../styles/_productGrid.scss";
import Filter from "../filter/Filter";

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

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
    if (selectedCategory) {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (!products) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Filter onCategoryChange={handleCategoryChange} />
      <div className="grid-product">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
